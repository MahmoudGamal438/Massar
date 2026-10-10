import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';

@Component({
  selector: 'app-level-page',
  imports: [RouterLink, ProgressBarComponent],
  templateUrl: './level.page.html',
  styleUrl: './level.page.scss',
})
export class LevelPage {
  private readonly route = inject(ActivatedRoute);
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);
  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('levelId') ?? '')), {
    initialValue: '',
  });
  readonly level = computed(() => this.content.getLevel(this.id()));
}
