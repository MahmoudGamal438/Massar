import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ProgressService } from '../../core/services/progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ProgressBarComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly content = inject(ContentService);
  readonly progress = inject(ProgressService);
  readonly stats = [
    { value: '11', label: 'مستوى تعليمي' },
    { value: String(this.content.getLessons().length), label: 'درس مكتوب' },
    { value: String(this.content.getExercises().length), label: 'تمرين عملي' },
    { value: String(this.content.getProjects().length), label: 'مشروع للعرض' },
  ];
  readonly tools = [
    { tag: 'خريطة', title: 'مسار مغلق', text: 'كل مستوى يفتح بعد إتقان حقيقي، لا بمجرد فتح الصفحة.', link: '/roadmap' },
    { tag: 'تطبيق', title: 'تمارين وتحديات', text: 'تمرين بعد الدرس واختبار قياس. الحل مشروح ولا يُحتسب بمجرد الفتح.', link: '/exercises' },
    { tag: 'بناء', title: 'مشاريع Portfolio', text: 'مشاريع بمشكلة ومعايير قبول يمكنك عرضها.', link: '/projects' },
    { tag: 'سوق', title: 'استعداد للعمل', text: 'قائمة تحقق ومقابلة. المسار استعداد لا ضمان وظيفة.', link: '/job' },
    { tag: 'بنية', title: 'هيكل المشروع', text: 'شجرة Angular احترافية وشرح كل ملف من الجذر حتى الميزة.', link: '/structure' },
  ];
  readonly skills = [
    'أساسيات الكمبيوتر وسطر الأوامر',
    'JavaScript وTypeScript',
    'HTML وCSS متجاوب',
    'مكونات Angular والتوجيه',
    'خدمات وHTTP وحالات الواجهة',
    'مشاريع قابلة للعرض',
  ];
  readonly faqs = [
    {
      q: 'هل أحتاج خبرة سابقة؟',
      a: 'لا. المستوى صفر يبدأ من الملفات والمتصفح والمحرر. يمكنك تخطي ما تتقنه عبر خريطة المسار.',
    },
    {
      q: 'هل الدروس بالعربية؟',
      a: 'نعم، بأسلوب واضح مع الإبقاء على المصطلح الإنجليزي بجانب شرحه لأن سوق العمل يستخدمه.',
    },
    {
      q: 'أين يُحفظ تقدمي؟',
      a: 'في هذه النسخة الأولية على نفس المتصفح عبر التخزين المحلي. مزامنة الحسابات خطوة لاحقة.',
    },
    {
      q: 'هل إكمال المسار يوظفني؟',
      a: 'يساعدك على الاستعداد: مشاريع، مقابلة، وأسلوب عمل. لا نعد بوظيفة.',
    },
  ];

  startLink(): string[] {
    const last = this.progress.lastLessonId();
    if (last) {
      return ['/learn', last];
    }
    const first = this.content.getFirstLesson();
    return first ? ['/learn', first.id] : ['/roadmap'];
  }

  startLabel(): string {
    return this.progress.lastLessonId() ? 'استكمل التعلم' : 'ابدأ التعلم الآن';
  }
}
