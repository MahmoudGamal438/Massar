import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ProgressService } from '../../core/services/progress.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  readonly theme = inject(ThemeService);
  readonly progress = inject(ProgressService);
}
