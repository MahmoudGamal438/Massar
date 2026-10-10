import { Injectable, computed, signal } from '@angular/core';
import {
  ActivityItem,
  QuizAttempt,
  UserProgress,
} from '../models/content.models';
import { ContentService } from './content.service';

const STORAGE_KEY = 'masar-progress-v1';

const emptyProgress = (): UserProgress => ({
  completedLessons: [],
  openedLessons: [],
  completedExercises: [],
  quizResults: {},
  bookmarks: [],
  notes: {},
  lastLessonId: null,
  streakDays: 0,
  lastActiveDate: '',
  achievements: [],
});

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<UserProgress>(this.read());

  readonly progress = this.state.asReadonly();

  readonly completedCount = computed(() => this.state().completedLessons.length);

  readonly totalLessons = computed(() => this.content.getLessons().length);

  readonly overallPercent = computed(() => {
    const total = this.totalLessons();
    if (total === 0) {
      return 0;
    }
    return Math.round((this.completedCount() / total) * 100);
  });

  constructor(private readonly content: ContentService) {}

  openLesson(lessonId: string): void {
    this.patch((current) => {
      const opened = current.openedLessons.includes(lessonId)
        ? current.openedLessons
        : [...current.openedLessons, lessonId];
      return {
        ...current,
        openedLessons: opened,
        lastLessonId: lessonId,
        ...this.touchStreak(current),
      };
    });
  }

  completeLesson(lessonId: string): void {
    this.patch((current) => {
      if (current.completedLessons.includes(lessonId)) {
        return { ...current, lastLessonId: lessonId, ...this.touchStreak(current) };
      }
      const achievements = [...current.achievements];
      const nextCount = current.completedLessons.length + 1;
      if (nextCount === 1 && !achievements.includes('first-lesson')) {
        achievements.push('first-lesson');
      }
      if (nextCount === 5 && !achievements.includes('five-lessons')) {
        achievements.push('five-lessons');
      }
      return {
        ...current,
        completedLessons: [...current.completedLessons, lessonId],
        lastLessonId: lessonId,
        achievements,
        ...this.touchStreak(current),
      };
    });
  }

  isLessonComplete(lessonId: string): boolean {
    return this.state().completedLessons.includes(lessonId);
  }

  canCompleteLesson(lessonId: string): boolean {
    const lesson = this.content.getLessonById(lessonId);
    if (!lesson) {
      return false;
    }
    const exerciseDone = lesson.exerciseId
      ? this.state().completedExercises.includes(lesson.exerciseId)
      : true;
    const quiz = lesson.quizId ? this.state().quizResults[lesson.quizId] : undefined;
    const quizDone = lesson.quizId ? Boolean(quiz?.passed) : true;
    return exerciseDone && quizDone;
  }

  completeExercise(exerciseId: string): void {
    this.patch((current) => {
      if (current.completedExercises.includes(exerciseId)) {
        return current;
      }
      return {
        ...current,
        completedExercises: [...current.completedExercises, exerciseId],
        ...this.touchStreak(current),
      };
    });
  }

  recordQuiz(attempt: QuizAttempt): void {
    this.patch((current) => ({
      ...current,
      quizResults: { ...current.quizResults, [attempt.quizId]: attempt },
      ...this.touchStreak(current),
    }));
  }

  toggleBookmark(lessonId: string): void {
    this.patch((current) => {
      const exists = current.bookmarks.includes(lessonId);
      return {
        ...current,
        bookmarks: exists
          ? current.bookmarks.filter((id) => id !== lessonId)
          : [...current.bookmarks, lessonId],
      };
    });
  }

  isBookmarked(lessonId: string): boolean {
    return this.state().bookmarks.includes(lessonId);
  }

  saveNote(lessonId: string, note: string): void {
    this.patch((current) => ({
      ...current,
      notes: { ...current.notes, [lessonId]: note },
    }));
  }

  levelPercent(levelId: string): number {
    const lessons = this.content.getLessonsByLevel(levelId);
    if (lessons.length === 0) {
      return 0;
    }
    const done = lessons.filter((lesson) => this.isLessonComplete(lesson.id)).length;
    return Math.round((done / lessons.length) * 100);
  }

  isLevelUnlocked(levelId: string): boolean {
    const list = this.content.getLevels();
    const target = list.find((level) => level.id === levelId);
    if (!target) {
      return false;
    }
    if (target.order === 0) {
      return true;
    }
    const previous = list.find((level) => level.order === target.order - 1);
    if (!previous) {
      return true;
    }
    return this.levelPercent(previous.id) >= previous.unlockPercent;
  }

  lastLessonId(): string | null {
    return this.state().lastLessonId;
  }

  activity(): ActivityItem[] {
    const current = this.state();
    const items: ActivityItem[] = [];
    for (const id of current.completedLessons.slice(-5).reverse()) {
      const lesson = this.content.getLessonById(id);
      if (lesson) {
        items.push({
          id: 'lesson-' + id,
          type: 'lesson',
          title: 'أكملت: ' + lesson.title,
          at: current.lastActiveDate,
        });
      }
    }
    return items;
  }

  private touchStreak(current: UserProgress): Pick<UserProgress, 'streakDays' | 'lastActiveDate'> {
    const today = new Date().toISOString().slice(0, 10);
    if (current.lastActiveDate === today) {
      return { streakDays: current.streakDays || 1, lastActiveDate: today };
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().slice(0, 10);
    const streakDays = current.lastActiveDate === y ? current.streakDays + 1 : 1;
    return { streakDays, lastActiveDate: today };
  }

  private patch(mutator: (current: UserProgress) => UserProgress): void {
    const next = mutator(this.state());
    this.state.set(next);
    this.write(next);
  }

  private read(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return emptyProgress();
      }
      return { ...emptyProgress(), ...(JSON.parse(raw) as UserProgress) };
    } catch {
      return emptyProgress();
    }
  }

  private write(value: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      return;
    }
  }
}
