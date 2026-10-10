import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';

@Component({
  selector: 'app-exercises-page',
  imports: [RouterLink],
  templateUrl: './exercises.page.html',
  styleUrl: './exercises.page.scss',
})
export class ExercisesPage {
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);
}
