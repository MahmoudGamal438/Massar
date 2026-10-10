import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-projects-page',
  imports: [],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
})
export class ProjectsPage {
  readonly content = inject(ContentService);
  levelTitle(id?: string): string {
    return id ? this.content.getLevel(id)?.title ?? '' : '';
  }
}
