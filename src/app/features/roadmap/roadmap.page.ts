import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';

@Component({
  selector: 'app-roadmap-page',
  imports: [RouterLink, ProgressBarComponent],
  templateUrl: './roadmap.page.html',
  styleUrl: './roadmap.page.scss',
})
export class RoadmapPage {
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);

  previousName(order: number): string {
    const prev = this.content.getLevels().find((level) => level.order === order - 1);
    return prev?.title ?? 'المستوى السابق';
  }

  previousUnlock(order: number): number {
    const prev = this.content.getLevels().find((level) => level.order === order - 1);
    return prev?.unlockPercent ?? 0;
  }
}
