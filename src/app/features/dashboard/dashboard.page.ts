import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../core/models/content.models';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, ProgressBarComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);

  readonly bookmarks = computed(() =>
    this.progress
      .progress()
      .bookmarks.map((id) => this.content.getLessonById(id))
      .filter((item): item is Lesson => Boolean(item)),
  );

  readonly notes = computed(() =>
    Object.entries(this.progress.progress().notes)
      .filter(([, note]) => note.trim())
      .map(([id, note]) => ({
        id,
        note,
        title: this.content.getLessonById(id)?.title ?? id,
      })),
  );

  readonly quizRows = computed(() =>
    Object.values(this.progress.progress().quizResults).map((result) => {
      const quiz = this.content.getQuiz(result.quizId);
      return {
        id: result.quizId,
        title: quiz?.title ?? result.quizId,
        score: result.score,
        total: result.total,
        passed: result.passed,
      };
    }),
  );

  readonly skills = computed(() => {
    const set = new Set<string>();
    for (const id of this.progress.progress().completedLessons) {
      const lesson = this.content.getLessonById(id);
      const level = lesson ? this.content.getLevel(lesson.levelId) : undefined;
      level?.skills.forEach((skill) => set.add(skill));
    }
    return [...set];
  });

  continueLink(): string[] {
    const last = this.progress.lastLessonId();
    if (last) {
      return ['/learn', last];
    }
    const first = this.content.getFirstLesson();
    return first ? ['/learn', first.id] : ['/roadmap'];
  }

  continueLabel(): string {
    return this.progress.lastLessonId() ? 'استكمل آخر درس' : 'ابدأ الدرس الأول';
  }

  nextTitle(): string {
    const last = this.progress.lastLessonId();
    if (last) {
      const next = this.content.getAdjacentLessons(last).next;
      if (next) {
        return next.title;
      }
    }
    return this.content.getFirstLesson()?.title ?? 'الخريطة';
  }
}
