import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { CodeBlockComponent } from '../../shared/components/code-block.component';

@Component({
  selector: 'app-ai-page',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './ai.page.html',
  styleUrl: './ai.page.scss',
})
export class AiPage {
  readonly content = inject(ContentService);
  readonly goodPrompt =
    'Angular 19 standalone، واجهة عربية RTL. أضف خدمة تقرأ دروسًا من مصفوفة محلية ودالة getLessonById. بدون Backend وبدون مفاتيح. اكتب اختبارًا للدالة.';
}
