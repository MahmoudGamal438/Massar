import { Lesson } from '../core/models/content.models';

export const lessonsLevel3: Lesson[] = [
  {
    id: 'l3-arrays',
    moduleId: 'm3-js',
    levelId: 'level-3',
    order: 1,
    title: 'المصفوفات والدوال الجاهزة',
    summary: 'map وfilter وfind أدوات يومية في واجهات Angular عند تحويل قوائم الدروس.',
    durationMinutes: 28,
    objectives: [
      'تحوّل مصفوفة بـ map',
      'ترشّح بـ filter',
      'تبحث بـ find',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'القائمة في الذاكرة',
        body: 'المصفوفة قائمة مرتبة بفهرس يبدأ من صفر. في منصة التعلم ستحوّل دروسًا إلى عناوين، ترشّح غير المكتمل، وتبحث عن درس بالمعرّف.\n\nmap تبني قائمة جديدة بنفس الطول. filter تبقي ما يطابق شرطًا. find تُرجع أول عنصر أو undefined. لا تعدّل الأصل بهذه الدوال في الاستخدام العادي؛ التحويل النقي أسهل للتتبع في Angular مع Signals.',
        code: {
          language: 'javascript',
          filename: 'arrays.js',
          code: `const scores = [40, 70, 90];
const passed = scores.filter((score) => score >= 70);
const labels = passed.map((score) => 'نجاح ' + score);
const firstHigh = scores.find((score) => score >= 90);

console.log(passed, labels, firstHigh);`,
          explanation: 'filter ترجع مصفوفة جديدة. map تحوّل كل عنصر. find ترجع أول مطابقة أو undefined.',
        },
      },
      {
        id: 's2',
        title: 'لا تعدّل المصدر بلا وعي',
        body: 'map وfilter وfind لا تغيّر المصفوفة الأصلية. push وsplice وsort (بدون نسخة) تغيّر المصدر. إن عرضت القائمة في أكثر من شاشة ثم عدّلتها في واحدة، الأخرى ترى التغيير دون أن تطلبه.\n\nفي Angular مع Signals الأفضل تنتج قوائم جديدة: lessons.update(list => list.filter(...)). التعديل الغامض يصعّب تتبع لماذا اختفى درس من الخريطة.',
      },
    ],
    terms: [
      { en: 'map', ar: 'تحويل', definition: 'إنشاء مصفوفة جديدة من قيم محوّلة.' },
      { en: 'filter', ar: 'ترشيح', definition: 'إبقاء العناصر التي تحقق شرطًا.' },
    ],
    exerciseId: 'ex-l3-array',
    quizId: 'q-l3-array',
  },
  {
    id: 'l3-async',
    moduleId: 'm3-js',
    levelId: 'level-3',
    order: 2,
    title: 'الوقت غير المتزامن: Promise وasync/await',
    summary: 'طلب الشبكة لا يرجع فورًا. تتعلم تنتظر النتيجة وتعالج الفشل.',
    durationMinutes: 20,
    objectives: [
      'تفهم أن الكود لا يتوقف بالضرورة عند الطلب',
      'تستخدم async/await',
      'تلتقط الخطأ بـ try/catch',
    ],
    prerequisites: ['l3-arrays'],
    sections: [
      {
        id: 's1',
        title: 'تشبيه الطابور',
        body: 'تطلب أكلًا وتأخذ رقمًا. لا تجمد في مكانك. عندما يجهز الطلب ينادونك. الـ Promise وعد بنتيجة لاحقًا: تُحل resolve عند النجاح أو تُرفض reject عند الفشل.\n\nJavaScript لا ينتظر الشبكة افتراضيًا. إن استدعيت fetch بلا await يكمل السطر التالي قبل وصول البيانات. لذلك تظهر شاشات فارغة ثم قفز مفاجئ إن لم تعرض حالة تحميل.',
      },
      {
        id: 's2',
        title: 'مثال fetch مبسّط',
        code: {
          language: 'javascript',
          filename: 'async.js',
          code: `async function loadTitle() {
  try {
    const response = await fetch('/api/lesson');
    if (!response.ok) {
      throw new Error('فشل التحميل');
    }
    const data = await response.json();
    console.log(data.title);
  } catch (error) {
    console.error(error);
  }
}`,
          explanation: 'await لا تُستخدم إلا داخل دالة async. تحقق من response.ok قبل json().',
        },
      },
      {
        id: 's3',
        title: 'في Angular',
        body: 'HttpClient في Angular يغلّف الطلبات ويعيد Observable. الفكرة لا تتغير: نجاح، فشل، وحالة تحميل ظاهرة.\n\nثلاث حالات واجهة إلزامية لأي طلب: Loading أثناء الانتظار، Error برسالة مفهومة، Empty إن رجعت قائمة طولها صفر. لا تخلط الفارغ بالفشل.',
      },
    ],
    terms: [
      { en: 'Promise', ar: 'وعد', definition: 'كائن يمثل نتيجة مستقبلية.' },
      { en: 'async/await', ar: 'انتظار غير متزامن', definition: 'صيغة لقراءة الكود غير المتزامن كأنه متتابع.' },
    ],
    quizId: 'q-l3-async',
  },
];

export const lessonsLevel4: Lesson[] = [
  {
    id: 'l4-interfaces',
    moduleId: 'm4-ts',
    levelId: 'level-4',
    order: 1,
    title: 'Interface: عقد شكل البيانات',
    summary: 'تعرّف شكل كائن الدرس حتى يرفض المترجم الحقول الناقصة قبل التشغيل.',
    durationMinutes: 16,
    objectives: [
      'تكتب interface لكائن',
      'تستخدم الحقول الاختيارية',
      'تربط النوع بمصفوفة',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'لماذا الأنواع؟',
        body: 'في JavaScript ممكن تمرر كائن ناقص title ويظهر الخطأ في الصفحة بعد أن يضغط المتعلم. TypeScript يوقفك في المحرر قبل التشغيل.\n\nالواجهة عقد: الحقول المطلوبة، أنواعها، وما هو اختياري. ليست فئة تُنشأ في الذاكرة. لا تضع منطقًا داخل interface.\n\nعندما تتغير بيانات الدرس في الكتالوج، يكفي تعديل الواجهة ليكشف المترجم كل المواضع التي نسيت الحقل الجديد.',
        code: {
          language: 'typescript',
          filename: 'lesson.ts',
          code: `interface LessonSummary {
  id: string;
  title: string;
  durationMinutes: number;
  exerciseId?: string;
}

const lesson: LessonSummary = {
  id: 'l4-interfaces',
  title: 'Interface: عقد شكل البيانات',
  durationMinutes: 16,
};

function label(item: LessonSummary): string {
  return item.title + ' — ' + item.durationMinutes + 'د';
}

console.log(label(lesson));`,
          explanation: 'علامة ? تعني الحقل قد يكون غير موجود. المترجم يمنع نسيان title.',
        },
      },
      {
        id: 's2',
        title: 'في Angular',
        body: 'النماذج في هذه المنصة مكتوبة كواجهات TypeScript: Lesson وQuiz وUserProgress. ContentService ترجع Lesson | undefined لا any.\n\nunion يصف بدائل: status: "loading" | "error" | "ready". هذا أوضح من string حر يكتب فيه "lodding" دون أن يلاحظ أحد.\n\ntype مرادف لاسم؛ interface قابلة للدمج. للأشكال العامة للكائنات ابدأ بـ interface كما في هذا الدرس.',
      },
    ],
    terms: [
      { en: 'Interface', ar: 'واجهة نوع', definition: 'وصف لشكل كائن دون تنفيذ.' },
      { en: 'Optional property', ar: 'حقل اختياري', definition: 'حقل قد لا يوجد على الكائن.' },
    ],
    exerciseId: 'ex-l4-iface',
    quizId: 'q-l4-iface',
  },
];

export const lessonsLevel5: Lesson[] = [
  {
    id: 'l5-what-angular',
    moduleId: 'm5-start',
    levelId: 'level-5',
    order: 1,
    title: 'ما هو Angular ومتى تستخدمه؟',
    summary: 'Angular إطار لبناء تطبيقات واجهة كبيرة: مكونات، توجيه، حقن اعتماديات، وأدوات رأيها واضح.',
    durationMinutes: 16,
    objectives: [
      'تضع Angular في سياقه مقابل مكتبة مكوّنات أخف',
      'تعرف CLI كمدخل رسمي',
      'تميّز المكوّن المستقل Standalone',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'إطار وليس ملف سكربت',
        body: 'Angular يناسب تطبيقات لها صفحات متعددة، حالة مشتركة، نماذج، وفرق تحتاج بنية متوقعة. لو المطلوب صفحة تسويق ثابتة، HTML وCSS قد يكفوا. لو هتبني منصة تعلم بمسارات ودروس وتقدم مستخدم، الإطار يوفّر نظامًا.',
      },
      {
        id: 's2',
        title: 'Standalone Components',
        body: 'الإصدارات الحديثة تعتمد مكوّنات مستقلة تعلن imports الخاصة بها بدل NgModules في أغلب الحالات. هذه المنصة مبنية بهذا الأسلوب على Angular 19 لأن بيئة التشغيل الحالية متوافقة معه، بينما Angular 22 يطلب إصدار Node أحدث.',
        callout: {
          type: 'note',
          text: 'المصدر الرسمي للتعلم المستمر: https://angular.dev/ — راجع الإصدار قبل نسخ أي API جديد.',
        },
      },
      {
        id: 's3',
        title: 'أجزاء المشروع التي ستراها',
        body: 'src/app فيه المكوّنات والخدمات. app.routes.ts عرّف المسارات. styles ملفات الشكل العامة. public الأصول الثابتة. فهم المجلدات أهم من حفظ الأوامر.',
      },
    ],
    terms: [
      { en: 'Framework', ar: 'إطار عمل', definition: 'بنية وأدوات تفرض تنظيمًا لبناء التطبيق.' },
      { en: 'Standalone component', ar: 'مكوّن مستقل', definition: 'مكوّن يعلن اعتمادياته دون وحدة NgModule إلزامية.' },
      { en: 'CLI', ar: 'واجهة الأوامر', definition: 'أداة إنشاء وتشغيل وبناء مشروع Angular.' },
    ],
    quizId: 'q-l5-what',
  },
  {
    id: 'l5-components',
    moduleId: 'm5-start',
    levelId: 'level-5',
    order: 2,
    title: 'المكوّن: قالب ومنطق معًا',
    summary: 'المكوّن وحدة شاشة لها TypeScript وقالب وأنماط. البيانات تظهر عبر الربط.',
    durationMinutes: 20,
    objectives: [
      'تقرأ أجزاء @Component',
      'تستخدم Interpolation',
      'تفهم الربط من المكوّن إلى القالب',
    ],
    prerequisites: ['l5-what-angular'],
    sections: [
      {
        id: 's1',
        title: 'التشريح',
        body: 'المكوّن ثلاثة أجزاء معلنة في @Component: selector اسم الوسم الذي تستخدمه في القوالب الأخرى، template أو templateUrl للشكل، styleUrl اختياري. الفئة class تحمل الحالة والدوال.\n\nالقالب ليس HTML ميتًا. {{ title }} يقرأ من الفئة. عندما تتغير القيمة يحدّث Angular العرض. لا تلمس DOM يدويًا في الدرس الأول؛ اترك الربط يعمل.',
        code: {
          language: 'typescript',
          filename: 'lesson-title.component.ts',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson-title',
  template: '<h1>{{ title }}</h1>',
  standalone: true,
})
export class LessonTitleComponent {
  title = 'المكوّن: قالب ومنطق معًا';
}`,
          explanation: '{{ title }} تقرأ القيمة من الفئة وتحدّث العرض عندما تتغير وفق آلية Angular.',
        },
      },
      {
        id: 's2',
        title: 'الربط',
        body: 'أربعة أنماط ربط ستستخدمها يوميًا:\n\nInterpolation {{ name }} للنص الظاهر. Property binding [disabled]="saving()" لخصائص العنصر. Event binding (click)="save()" للأحداث. Two-way [(ngModel)] عندما تريد الحقل والنموذج متزامنين — بعد استيراد FormsModule.\n\nلا تخلط [href] مع routerLink. التنقل داخل التطبيق مسار Angular، والخارجي رابط href.',
      },
    ],
    terms: [
      { en: 'Component', ar: 'مكوّن', definition: 'وحدة واجهة تجمع منطقًا وقالبًا.' },
      { en: 'Interpolation', ar: 'الاستيفاء', definition: 'عرض قيمة من المكوّن داخل القالب.' },
    ],
    exerciseId: 'ex-l5-comp',
    quizId: 'q-l5-comp',
  },
  {
    id: 'l5-services',
    moduleId: 'm5-data',
    levelId: 'level-5',
    order: 3,
    title: 'الخدمات وحقن الاعتماديات',
    summary: 'الخدمة مكان للمنطق المشترك مثل قراءة الدروس وحفظ التقدم، وتُحقن في المكوّنات.',
    durationMinutes: 18,
    objectives: [
      'تعرف متى تنقل الكود من المكوّن إلى خدمة',
      'تفهم providedIn: root',
      'تقرأ بيانات بدل نسخها في كل صفحة',
    ],
    prerequisites: ['l5-components'],
    sections: [
      {
        id: 's1',
        title: 'المكوّن يعرض، الخدمة تعرف',
        body: 'لو كل صفحة نسخت قائمة الدروس، أي تعديل سيُنسى في موضع. ContentService في هذه المنصة تقرأ المستويات والدروس من طبقة بيانات واحدة.\n\nانقل إلى خدمة ما يتكرر أو ما ليس عرضًا: البحث، التحقق من الكتالوج، قراءة اختبار بالمعرّف. اترك في المكوّن ما يخص الشاشة: أي زر مضغوط، أي تلميح ظاهر.\n\nالخدمة ليست «مكانًا لكل شيء». إن صارت ألف سطر بلا محور، قسّم: محتوى، تقدم، ثيم.',
      },
      {
        id: 's2',
        title: 'حقن الاعتماديات',
        body: 'تطلب الخدمة في constructor أو عبر inject(). Angular ينشئ النسخة ويشاركها حسب النطاق. providedIn: "root" يعني نسخة واحدة على مستوى التطبيق ما لم تضبط غير ذلك.',
        code: {
          language: 'typescript',
          filename: 'usage.ts',
          code: `import { inject } from '@angular/core';
import { ContentService } from './content.service';

export class Example {
  private readonly content = inject(ContentService);

  lesson = this.content.getLessonById('l5-services');
}`,
        },
      },
    ],
    terms: [
      { en: 'Service', ar: 'خدمة', definition: 'فئة للمنطق أو البيانات المشتركة.' },
      { en: 'Dependency Injection', ar: 'حقن الاعتماديات', definition: 'توفير الاعتماديات من الإطار بدل إنشائها يدويًا في كل مكان.' },
    ],
    quizId: 'q-l5-di',
  },
  {
    id: 'l5-routing',
    moduleId: 'm5-data',
    levelId: 'level-5',
    order: 4,
    title: 'التوجيه: صفحات بلا إعادة تحميل كاملة',
    summary: 'المسار في شريط العنوان يطابق مكوّنًا. المعاملات تسمح بدرس ديناميكي /lessons/:id.',
    durationMinutes: 16,
    objectives: [
      'تربط مسارًا بمكوّن',
      'تفهم المسار ذي المعامل',
      'تستخدم routerLink بدل href التقليدي داخل التطبيق',
    ],
    prerequisites: ['l5-services'],
    sections: [
      {
        id: 's1',
        title: 'لماذا Router؟',
        body: 'تطبيق الصفحة الواحدة يبدّل العرض حسب العنوان دون إعادة تحميل المستند كاملًا. مشاركة رابط درس معيّن تصبح ممكنة. في هذه المنصة /roadmap و/learn/:lessonId أمثلة حية.\n\napp.routes.ts قائمة مسارات. path: "learn/:lessonId" يضع المعامل في ActivatedRoute. الصفحة تقرأ المعامل وتطلب الدرس من ContentService.\n\nwildcard ** يلتقط العناوين المجهولة ويعرض 404. بدونها يظهر فراغ صامت.',
      },
      {
        id: 's2',
        title: 'routerLink',
        body: 'استخدم routerLink للتنقل الداخلي حتى لا تُعاد تهيئة التطبيق. href="/" يعيد تحميل التطبيق من الصفر فيظهر وميض وتُفقد حالة غير محفوظة.\n\n[routerLink]="[\'/learn\', lesson.id]" يبني المسار من أجزاء آمنة. لا تلصق نص العنوان يدويًا إن كان فيه معرفًا.\n\nrouterLinkActive يضيف صنفًا للرابط الحالي كما في شريط التنقل. الروابط الخارجية تبقى href مع rel="noopener noreferrer" إن فتحت تبويبًا جديدًا.',
      },
    ],
    terms: [
      { en: 'Route', ar: 'مسار', definition: 'عنوان يطابق مكوّنًا.' },
      { en: 'Route parameter', ar: 'معامل مسار', definition: 'جزء متغير من العنوان مثل معرّف الدرس.' },
    ],
    quizId: 'q-l5-router',
  },
];

export const lessonsLevel6plus: Lesson[] = [
  {
    id: 'l6-architecture',
    moduleId: 'm6-arch',
    levelId: 'level-6',
    order: 1,
    title: 'تنظيم المشروع حسب الميزة',
    summary: 'المجلدات حسب الشاشة والقدرة تسهّل العمل الجماعي أكثر من أكوام مكوّنات مسطحة.',
    durationMinutes: 14,
    objectives: [
      'تفرّق بين core وshared وfeatures',
      'تعرف فائدة التحميل الكسول',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'الخريطة',
        body: 'core للخدمات العامة: محتوى، تقدم، ثيم. shared لمكوّنات العرض المعاد استخدامها مثل شريط التقدم. features لمسار التعلم، لوحة التقدم، البحث. كل ميزة تملك صفحاتها.\n\nالتحميل الكسول loadComponent يؤجّل كود الميزة حتى تُزار. لذلك حجم الصفحة الأولى لا يحمل درس HTML بالكامل إن فتح المستخدم الإعدادات فقط.\n\nالبيانات (الكتالوج) ليست ميزة شاشة. تبقى في data/ وتُقرأ عبر خدمة.',
      },
      {
        id: 's2',
        title: 'لا تبالغ',
        body: 'مجلد فارغ ليس معمارية. أنشئ الطبقة عندما يتكرر الكود أو يتضارب الاسم. لا تنسخ هيكل شركة من مقال قبل أن يكون لديك شاشتان تتشاركان مكوّنًا.\n\nقاعدة عملية: إن نسخت قالب بطاقة درس ثلاث مرات، استخرج مكوّنًا في shared. إن بقيت البطاقة في صفحة واحدة، اتركها.\n\nالأسماء أوضح من العمق: features/lessons/lesson.page.ts خير من components/pages/views/lesson.ts.',
      },
    ],
    terms: [
      { en: 'Feature-based structure', ar: 'تنظيم حسب الميزة', definition: 'تجميع الملفات حول قدرة المنتج لا حول نوع الملف فقط.' },
      { en: 'Lazy loading', ar: 'تحميل كسول', definition: 'تحميل جزء من التطبيق عند الحاجة.' },
    ],
    quizId: 'q-l6-arch',
  },
  {
    id: 'l7-choose-lib',
    moduleId: 'm7-libs',
    levelId: 'level-7',
    order: 1,
    title: 'كيف تختار مكتبة واجهة؟',
    summary: 'الشهرة لا تكفي. تزن التوثيق، الحجم، ملاءمة RTL، والصيانة.',
    durationMinutes: 12,
    objectives: [
      'تضع أسئلة قرار قبل npm install',
      'تقارن Material وBootstrap وTailwind باختصار',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'أسئلة القرار',
        body: 'هل الفريق يعرف الأداة؟ هل تدعم العربية واتجاه RTL؟ كم تضيف للحزمة؟ هل تقدر تستبدلها لاحقًا؟ Angular Material مكوّنات جاهزة بنمط Material. Bootstrap منظومة CSS/مكوّنات عامة. Tailwind فئات منخفضة المستوى تسرّع التصميم إن التزم الفريق بنظام.',
      },
      {
        id: 's2',
        title: 'قرار هذه المنصة',
        body: 'النسخة الأولى بلا مكتبة UI ثقيلة حتى تبقى الهوية مستقلة والحزمة أخف. يمكن إضافة مكتبة لاحقًا بعد استقرار المحتوى.',
      },
    ],
    terms: [
      { en: 'Bundle size', ar: 'حجم الحزمة', definition: 'مقدار JavaScript/CSS الذي يحمله المستخدم.' },
    ],
    quizId: 'q-l7-libs',
  },
  {
    id: 'l8-project-brief',
    moduleId: 'm8-proj',
    levelId: 'level-8',
    order: 1,
    title: 'من فكرة إلى متطلبات قابلة للتنفيذ',
    summary: 'قبل المكوّنات: المشكلة، قصص المستخدم، الحالات الفارغة، ومعايير القبول.',
    durationMinutes: 14,
    objectives: [
      'تكتب قصة مستخدم',
      'تعدد حالات Loading وError وEmpty',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'قصة مستخدم',
        body: 'كمتعلم أريد إكمال درس حتى يُحفظ تقدمي حتى أعود لاحقًا من نفس النقطة. معيار القبول: بعد إكمال الاختبار أو التمرين المرتبط، يظهر الدرس مكتملًا في لوحة التقدم ويُحدَّث شريط المستوى.',
      },
      {
        id: 's2',
        title: 'لا تخفِ الفشل',
        body: 'قائمة دروس فارغة رسالة مختلفة عن فشل التحميل. الزر الذي لا يفعل شيئًا أسوأ من رسالة خطأ صادقة.',
      },
    ],
    terms: [
      { en: 'User story', ar: 'قصة مستخدم', definition: 'وصف لقدرة من منظور المستخدم مع فائدة.' },
      { en: 'Acceptance criteria', ar: 'معايير قبول', definition: 'شروط يمكن التحقق منها لاعتبار المهمة منتهية.' },
    ],
    quizId: 'q-l8-brief',
  },
  {
    id: 'l9-prompts',
    moduleId: 'm9-ai',
    levelId: 'level-9',
    order: 1,
    title: 'Prompt ضعيف مقابل Prompt يعمل',
    summary: 'الأداة لا تعرف مشروعك ما لم تشرح السياق والقيود ومعيار النجاح.',
    durationMinutes: 14,
    objectives: [
      'تحسّن طلبًا غامضًا',
      'تتحقق من الكود الناتج',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'ضعيف',
        body: '«اكتب لي Angular للدروس». الناتج غالبًا عام، قد يستخدم NgModule قديم، وقد يخترع مكتبات.',
      },
      {
        id: 's2',
        title: 'محسّن',
        body: '«عندي Angular 19 standalone وRTL عربي. أضف خدمة تقرأ دروسًا من مصفوفة محلية وتعيد الدرس بالمعرّف. لا تستخدم Backend. اكتب اختبارًا للدالة getLessonById. لا تضع مفاتيح API.» بعد الناتج: شغّل الاختبار، اقرأ الكود، تأكد أنه يطابق نماذجك.',
        callout: {
          type: 'warn',
          text: 'لا تلصق أسرارًا ولا مفاتيح في المحادثة. راجع أي كود كأن زميلًا جديدًا كتبه.',
        },
      },
    ],
    terms: [
      { en: 'Prompt', ar: 'طلب للنموذج', definition: 'النص الذي يحدد المهمة والسياق للنموذج اللغوي.' },
    ],
    quizId: 'q-l9-prompt',
  },
  {
    id: 'l10-interview',
    moduleId: 'm10-job',
    levelId: 'level-10',
    order: 1,
    title: 'شرح قرار تقني في مقابلة',
    summary: 'المقابل يهتم ليه اخترت الحل، وما التنازل، وكيف تقيس النجاح.',
    durationMinutes: 12,
    objectives: [
      'تشرح مشروعًا ببنية مشكلة-حل-نتيجة',
      'تفرّق بين ضمان التعلم وضمان الوظيفة',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'قالب مختصر',
        body: 'المشكلة: المتعلم يضيع بين المقالات. الحل: مسار مغلق مع تقدم حقيقي لا يُحتسب بمجرد الفتح. التنازل: بيانات محلية في النسخة الأولى بلا مزامنة أجهزة. القياس: إكمال درس مع تمرين أو اختبار.',
      },
      {
        id: 's2',
        title: 'صدق مهني',
        body: 'إكمال هذا المسار استعداد لا عقد عمل. الشركات تختلف في المطلوب. المشاريع المنشورة ووضوح الشرح أقوى من شهادات بلا دليل.',
      },
    ],
    terms: [
      { en: 'Trade-off', ar: 'تنازل تقني', definition: 'اختيار واعٍ بين بدائل لكل منها ثمن.' },
    ],
    quizId: 'q-l10-job',
  },
];
