import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ContentService } from '../services/content.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly theme = inject(ThemeService);
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);

  readonly q = signal('');
  readonly searchOpen = signal(false);
  readonly menuOpen = signal(false);
  readonly hits = computed(() => {
    const raw = this.content.search(this.q());
    return {
      lessons: raw.lessons.slice(0, 6),
      exercises: raw.exercises.slice(0, 4),
      projects: raw.projects.slice(0, 3),
      terms: raw.terms.slice(0, 4),
    };
  });
  readonly empty = computed(() => {
    const r = this.hits();
    return !r.lessons.length && !r.exercises.length && !r.projects.length && !r.terms.length;
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeAll());
  }

  onQuery(value: string): void {
    this.q.set(value);
    this.searchOpen.set(true);
  }

  closeSearch(): void {
    this.searchOpen.set(false);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  closeAll(): void {
    this.searchOpen.set(false);
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  goFirst(event: Event): void {
    event.preventDefault();
    const r = this.hits();
    const lesson = r.lessons[0];
    const exercise = r.exercises[0];
    const project = r.projects[0];
    if (lesson) {
      void this.router.navigate(['/learn', lesson.id]);
    } else if (exercise) {
      void this.router.navigate(['/exercises', exercise.id]);
    } else if (project) {
      void this.router.navigate(['/projects'], { fragment: project.id });
    } else if (r.terms[0]) {
      void this.router.navigate(['/glossary']);
    }
    this.closeAll();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.find')) {
      this.closeSearch();
    }
    if (!target?.closest('.mid') && !target?.closest('.burger')) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 980) {
      this.closeMenu();
    }
  }
}
