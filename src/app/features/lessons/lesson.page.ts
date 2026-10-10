import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { CodeBlockComponent } from '../../shared/components/code-block.component';

@Component({
  selector: 'app-lesson-page',
  imports: [RouterLink, FormsModule, CodeBlockComponent],
  templateUrl: './lesson.page.html',
  styleUrl: './lesson.page.scss',
})
export class LessonPage {
  private readonly route = inject(ActivatedRoute);
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);
  readonly answers = signal<Record<string, number>>({});
  readonly quizResult = signal<{ score: number; total: number; passed: boolean } | null>(null);
  readonly note = signal('');

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('lessonId') ?? '')), {
    initialValue: '',
  });

  readonly lesson = computed(() => this.content.getLessonById(this.id()));

  private readonly syncLesson = effect(() => {
    const lesson = this.lesson();
    if (!lesson) {
      return;
    }
    untracked(() => {
      this.progress.openLesson(lesson.id);
      this.note.set(this.progress.progress().notes[lesson.id] ?? '');
    });
    this.quizResult.set(null);
    this.answers.set({});
  });

  readonly level = computed(() => {
    const lesson = this.lesson();
    return lesson ? this.content.getLevel(lesson.levelId) : undefined;
  });

  readonly levelLessons = computed(() => {
    const lesson = this.lesson();
    return lesson ? this.content.getLessonsByLevel(lesson.levelId) : [];
  });

  readonly adjacent = computed(() => this.content.getAdjacentLessons(this.id()));
  readonly exercise = computed(() => {
    const id = this.lesson()?.exerciseId;
    return id ? this.content.getExercise(id) : undefined;
  });
  readonly quiz = computed(() => {
    const id = this.lesson()?.quizId;
    return id ? this.content.getQuiz(id) : undefined;
  });

  splitBody(body: string): string[] {
    return body
      .split(/\n\n+/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  selectAnswer(questionId: string, optionIndex: number): void {
    this.answers.update((current) => ({ ...current, [questionId]: optionIndex }));
  }

  saveNote(): void {
    const lesson = this.lesson();
    if (lesson) {
      this.progress.saveNote(lesson.id, this.note());
    }
  }

  submitQuiz(event: Event): void {
    event.preventDefault();
    const quiz = this.quiz();
    const lesson = this.lesson();
    if (!quiz || !lesson) {
      return;
    }
    let score = 0;
    for (const question of quiz.questions) {
      if (this.answers()[question.id] === question.correctIndex) {
        score += 1;
      }
    }
    const total = quiz.questions.length;
    const percent = total ? Math.round((score / total) * 100) : 0;
    const passed = percent >= quiz.passPercent;
    const result = { score, total, passed };
    this.quizResult.set(result);
    this.progress.recordQuiz({
      quizId: quiz.id,
      score,
      total,
      passed,
      at: new Date().toISOString(),
    });
  }
}
