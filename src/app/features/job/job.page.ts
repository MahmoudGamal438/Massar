import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-job-page',
  imports: [RouterLink],
  templateUrl: './job.page.html',
  styleUrl: './job.page.scss',
})
export class JobPage {
  readonly content = inject(ContentService);
}
