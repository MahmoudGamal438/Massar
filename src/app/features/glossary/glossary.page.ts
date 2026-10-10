import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlossaryTerm, Lesson } from '../../core/models/content.models';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-glossary-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './glossary.page.html',
  styleUrl: './glossary.page.scss',
})
export class GlossaryPage {
  readonly content = inject(ContentService);
  readonly q = signal('');
  readonly filtered = computed(() => {
    const q = this.q().trim().toLowerCase();
    const all = this.content.getGlossary();
    if (!q) {
      return all;
    }
    return all.filter(
      (term) =>
        term.en.toLowerCase().includes(q) ||
        term.ar.includes(q) ||
         term.definition.includes(q),
    );
  });

  linkedLessons(term: GlossaryTerm): Lesson[] {
    return term.lessonIds
      .map((id) => this.content.getLessonById(id))
      .filter((lesson): lesson is Lesson => Boolean(lesson));
  }
}
