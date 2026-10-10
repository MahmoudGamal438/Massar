import { Injectable } from '@angular/core';
import { allLessons } from '../../data/catalog';
import { exercises } from '../../data/exercises.data';
import { glossary } from '../../data/glossary.data';
import { learningPath, levels, modules } from '../../data/levels.data';
import { projects } from '../../data/projects.data';
import { quizzes } from '../../data/quizzes.data';
import {
  Exercise,
  GlossaryTerm,
  LearningPath,
  Lesson,
  Level,
  Module,
  Project,
  Quiz,
} from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly path: LearningPath = learningPath;

  getLevels(): Level[] {
    return [...levels].sort((a, b) => a.order - b.order);
  }

  getLevel(id: string): Level | undefined {
    return levels.find((level) => level.id === id);
  }

  getModules(levelId: string): Module[] {
    return modules
      .filter((module) => module.levelId === levelId)
      .sort((a, b) => a.order - b.order);
  }

  getLessons(): Lesson[] {
    return [...allLessons];
  }

  getLessonsByLevel(levelId: string): Lesson[] {
    return allLessons
      .filter((lesson) => lesson.levelId === levelId)
      .sort((a, b) => a.order - b.order);
  }

  getLessonsByModule(moduleId: string): Lesson[] {
    return allLessons
      .filter((lesson) => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  getLessonById(id: string): Lesson | undefined {
    return allLessons.find((lesson) => lesson.id === id);
  }

  getFirstLesson(): Lesson | undefined {
    return this.getLessonsByLevel('level-0')[0];
  }

  getAdjacentLessons(lessonId: string): { prev: Lesson | null; next: Lesson | null } {
    const ordered = this.orderedLessons();
    const index = ordered.findIndex((lesson) => lesson.id === lessonId);
    if (index < 0) {
      return { prev: null, next: null };
    }
    return {
      prev: ordered[index - 1] ?? null,
      next: ordered[index + 1] ?? null,
    };
  }

  orderedLessons(): Lesson[] {
    const levelOrder = new Map(levels.map((level) => [level.id, level.order]));
    return [...allLessons].sort((a, b) => {
      const levelDiff = (levelOrder.get(a.levelId) ?? 0) - (levelOrder.get(b.levelId) ?? 0);
      if (levelDiff !== 0) {
        return levelDiff;
      }
      return a.order - b.order;
    });
  }

  getExercise(id: string): Exercise | undefined {
    return exercises.find((item) => item.id === id);
  }

  getExercises(): Exercise[] {
    return [...exercises];
  }

  getExercisesByLevel(levelId: string): Exercise[] {
    return exercises.filter((item) => item.levelId === levelId);
  }

  getQuizzes(): Quiz[] {
    return [...quizzes];
  }

  validateCatalog(): string[] {
    const issues: string[] = [];
    const lessonIds = allLessons.map((lesson) => lesson.id);
    if (new Set(lessonIds).size !== lessonIds.length) {
      issues.push('معرّفات دروس مكررة');
    }
    const moduleIds = new Set(modules.map((module) => module.id));
    const levelIds = new Set(levels.map((level) => level.id));
    for (const lesson of allLessons) {
      if (!lesson.title.trim()) {
        issues.push('درس بلا عنوان: ' + lesson.id);
      }
      if (!moduleIds.has(lesson.moduleId)) {
        issues.push('وحدة ناقصة للدرس ' + lesson.id);
      }
      if (!levelIds.has(lesson.levelId)) {
        issues.push('مستوى ناقص للدرس ' + lesson.id);
      }
      if (lesson.exerciseId && !this.getExercise(lesson.exerciseId)) {
        issues.push('تمرين مفقود: ' + lesson.exerciseId);
      }
      if (lesson.quizId && !this.getQuiz(lesson.quizId)) {
        issues.push('اختبار مفقود: ' + lesson.quizId);
      }
      for (const prev of lesson.prerequisites) {
        if (!this.getLessonById(prev)) {
          issues.push('متطلب غير موجود في ' + lesson.id + ': ' + prev);
        }
      }
    }
    for (const quiz of quizzes) {
      if (quiz.questions.length === 0) {
        issues.push('اختبار بلا أسئلة: ' + quiz.id);
      }
      for (const question of quiz.questions) {
        if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
          issues.push('إجابة خارج النطاق في ' + quiz.id);
        }
      }
    }
    return issues;
  }

  getQuiz(id: string): Quiz | undefined {
    return quizzes.find((item) => item.id === id);
  }

  getProjects(): Project[] {
    return projects;
  }

  getProjectsByLevel(levelId: string): Project[] {
    return projects.filter((item) => item.levelId === levelId);
  }

  getGlossary(): GlossaryTerm[] {
    return [...glossary].sort((a, b) => a.en.localeCompare(b.en));
  }

  getTerm(id: string): GlossaryTerm | undefined {
    return glossary.find((item) => item.id === id);
  }

  search(query: string): {
    lessons: Lesson[];
    terms: GlossaryTerm[];
    exercises: Exercise[];
    projects: Project[];
  } {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { lessons: [], terms: [], exercises: [], projects: [] };
    }
    const hit = (value: string) => value.toLowerCase().includes(q);
    return {
      lessons: allLessons.filter(
        (lesson) =>
          hit(lesson.title) ||
          hit(lesson.summary) ||
          lesson.objectives.some(hit) ||
          lesson.sections.some((section) => hit(section.title) || hit(section.body ?? '')),
      ),
      terms: glossary.filter(
        (term) => hit(term.en) || hit(term.ar) || hit(term.definition),
      ),
      exercises: exercises.filter(
        (item) => hit(item.title) || hit(item.prompt) || item.concepts.some(hit),
      ),
      projects: projects.filter(
        (item) => hit(item.title) || hit(item.problem) || item.skills.some(hit),
      ),
    };
  }
}
