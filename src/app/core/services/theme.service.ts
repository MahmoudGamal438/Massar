import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const KEY = 'masar-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.read());

  constructor() {
    this.apply(this.theme());
  }

  toggle(): void {
    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.apply(next);
    localStorage.setItem(KEY, next);
  }

  private read(): Theme {
    const stored = localStorage.getItem(KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return 'dark';
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
