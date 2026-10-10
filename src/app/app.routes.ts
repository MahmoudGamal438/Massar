import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
        title: 'مسار أنجولار',
      },
      {
        path: 'roadmap',
        loadComponent: () =>
          import('./features/roadmap/roadmap.page').then((m) => m.RoadmapPage),
        title: 'خريطة المسار',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
        title: 'لوحتي',
      },
      {
        path: 'levels/:levelId',
        loadComponent: () => import('./features/levels/level.page').then((m) => m.LevelPage),
        title: 'المستوى',
      },
      {
        path: 'learn/:lessonId',
        loadComponent: () => import('./features/lessons/lesson.page').then((m) => m.LessonPage),
        title: 'درس',
      },
      {
        path: 'exercises',
        loadComponent: () =>
          import('./features/exercises/exercises.page').then((m) => m.ExercisesPage),
        title: 'التمارين',
      },
      {
        path: 'exercises/:exerciseId',
        loadComponent: () =>
          import('./features/exercises/exercise.page').then((m) => m.ExercisePage),
        title: 'تمرين',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.page').then((m) => m.SettingsPage),
        title: 'الإعدادات',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.page').then((m) => m.ProjectsPage),
        title: 'المشاريع',
      },
      {
        path: 'glossary',
        loadComponent: () =>
          import('./features/glossary/glossary.page').then((m) => m.GlossaryPage),
        title: 'مصطلحات',
      },
      {
        path: 'structure',
        loadComponent: () =>
          import('./features/structure/structure.page').then((m) => m.StructurePage),
        title: 'هيكل المشروع',
      },
      {
        path: 'search',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'ai',
        loadComponent: () => import('./features/ai/ai.page').then((m) => m.AiPage),
        title: 'الذكاء الاصطناعي للمطورين',
      },
      {
        path: 'job',
        loadComponent: () => import('./features/job/job.page').then((m) => m.JobPage),
        title: 'جاهز لسوق العمل',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
        title: 'غير موجود',
      },
    ],
  },
];
