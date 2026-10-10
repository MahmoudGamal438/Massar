import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { CodeBlockComponent } from '../../shared/components/code-block.component';

@Component({
  selector: 'app-exercise-page',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './exercise.page.html',
  styleUrl: './exercise.page.scss',
})
export class ExercisePage {
  private readonly route = inject(ActivatedRoute);
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);
  readonly revealed = signal(false);
  readonly hintCount = signal(0);
  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('exerciseId') ?? '')), {
    initialValue: '',
  });
  readonly exercise = computed(() => this.content.getExercise(this.id()));
  readonly visibleHints = computed(() => this.exercise()?.hints.slice(0, this.hintCount()) ?? []);

  showHint(): void {
    this.hintCount.update((value) => value + 1);
  }

  complete(): void {
    const ex = this.exercise();
    if (ex) {
      this.progress.completeExercise(ex.id);
    }
  }
}
