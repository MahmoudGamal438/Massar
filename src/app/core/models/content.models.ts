export type Difficulty = 'easy' | 'medium' | 'hard';

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  method: string[];
  disclaimer: string;
}

export interface Level {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  goals: string[];
  prerequisites: string[];
  skills: string[];
  estimatedHours: number;
  color: string;
  masteryCriteria: string[];
  unlockPercent: number;
}

export interface Module {
  id: string;
  levelId: string;
  order: number;
  title: string;
  description: string;
}

export interface CodeExample {
  language: string;
  filename?: string;
  code: string;
  explanation?: string;
}

export interface LessonStep {
  title: string;
  text: string;
}

export interface LessonTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface LessonCompare {
  badTitle?: string;
  goodTitle?: string;
  bad: string;
  good: string;
  note?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  body?: string;
  bullets?: string[];
  steps?: LessonStep[];
  table?: LessonTable;
  compare?: LessonCompare;
  code?: CodeExample;
  callout?: {
    type: 'tip' | 'warn' | 'note';
    text: string;
  };
}

export interface Term {
  en: string;
  ar: string;
  definition: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  levelId: string;
  order: number;
  title: string;
  summary: string;
  durationMinutes: number;
  objectives: string[];
  prerequisites: string[];
  sections: LessonSection[];
  terms: Term[];
  exerciseId?: string;
  quizId?: string;
}

export interface Exercise {
  id: string;
  lessonId?: string;
  levelId: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  concepts: string[];
  hints: string[];
  starterCode?: string;
  solution: string;
  solutionExplanation: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId?: string;
  levelId: string;
  passPercent: number;
  questions: QuizQuestion[];
}

export interface Project {
  id: string;
  levelId?: string;
  title: string;
  difficulty: Difficulty;
  problem: string;
  skills: string[];
  stories: string[];
  requirements: string[];
  acceptance: string[];
  extras: string[];
}

export interface GlossaryTerm {
  id: string;
  en: string;
  ar: string;
  definition: string;
  lessonIds: string[];
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  passed: boolean;
  at: string;
}

export interface UserProgress {
  completedLessons: string[];
  openedLessons: string[];
  completedExercises: string[];
  quizResults: Record<string, QuizAttempt>;
  bookmarks: string[];
  notes: Record<string, string>;
  lastLessonId: string | null;
  streakDays: number;
  lastActiveDate: string;
  achievements: string[];
}

export interface ActivityItem {
  id: string;
  type: 'lesson' | 'exercise' | 'quiz' | 'bookmark';
  title: string;
  at: string;
}
