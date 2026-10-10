import {
  Lesson,
  LessonCompare,
  LessonSection,
  LessonStep,
  LessonTable,
  Term,
} from '../core/models/content.models';

export function makeLesson(
  id: string,
  moduleId: string,
  levelId: string,
  order: number,
  title: string,
  summary: string,
  durationMinutes: number,
  objectives: string[],
  sections: LessonSection[],
  extra: Partial<Pick<Lesson, 'prerequisites' | 'terms' | 'exerciseId' | 'quizId'>> = {},
): Lesson {
  return {
    id,
    moduleId,
    levelId,
    order,
    title,
    summary,
    durationMinutes,
    objectives,
    sections,
    prerequisites: extra.prerequisites ?? [],
    terms: extra.terms ?? [],
    exerciseId: extra.exerciseId,
    quizId: extra.quizId,
  };
}

export function sec(
  id: string,
  title: string,
  body: string,
  extra: Partial<LessonSection> = {},
): LessonSection {
  return { id, title, body, ...extra };
}

export function term(en: string, ar: string, definition: string): Term {
  return { en, ar, definition };
}

export function code(
  language: string,
  source: string,
  explanation?: string,
  filename?: string,
): LessonSection['code'] {
  return { language, code: source, explanation, filename };
}

export function steps(...items: Array<[string, string]>): LessonStep[] {
  return items.map(([title, text]) => ({ title, text }));
}

export function table(headers: string[], rows: string[][], caption?: string): LessonTable {
  return { headers, rows, caption };
}

export function compare(bad: string, good: string, note?: string): LessonCompare {
  return { bad, good, note, badTitle: 'خطأ شائع', goodTitle: 'الصحيح' };
}
