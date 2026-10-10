import { Quiz } from '../core/models/content.models';
import { extraQuizzes } from './curriculum-extra.data';

export const quizzes: Quiz[] = [
  {
    id: 'q-l0-computer',
    title: 'العتاد والبرامج',
    lessonId: 'l0-computer',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'نظام التشغيل أقرب إلى:',
        options: [
          'قطعة عتاد مثل الشاشة',
          'برنامج يدير الموارد والملفات ويشغّل برامج أخرى',
          'امتداد ملف .exe فقط',
        ],
        correctIndex: 1,
        explanation: 'نظام التشغيل برمجيات، حتى لو لا غنى عنه لتشغيل العتاد.',
      },
      {
        id: 'q2',
        prompt: 'المسار Path هو:',
        options: [
          'اسم الملف فقط',
          'عنوان الملف أو المجلد على القرص',
          'محتوى الملف',
        ],
        correctIndex: 1,
        explanation: 'الاسم جزء من المسار. المحتوى شيء منفصل.',
      },
    ],
  },
  {
    id: 'q-l0-files',
    title: 'الملفات والامتدادات',
    lessonId: 'l0-files',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'امتداد الملف يساعد على:',
        options: [
          'تخمين نوع الملف وطريقة فتحه',
          'تشفير المحتوى تلقائيًا',
          'جعل الملف أخف',
        ],
        correctIndex: 0,
        explanation: 'الامتداد تلميح للنوع. المحتوى الفعلي قد يختلف إن أُسيء تسمية الملف.',
      },
      {
        id: 'q2',
        prompt: 'إخفاء الامتدادات قد يسبب:',
        options: [
          'تسريع الحفظ',
          'ملف باسم page.html.txt وأنت تظنه HTML',
          'منع إنشاء مجلدات',
        ],
        correctIndex: 1,
        explanation: 'هذا خطأ شائع جدًا مع المبتدئين.',
      },
    ],
  },
  {
    id: 'q-l0-browser',
    title: 'المتصفح',
    lessonId: 'l0-browser',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'أدوات المطوّر DevTools تُستخدم أساسًا لـ:',
        options: [
          'تثبيت نظام التشغيل',
          'فحص الصفحة والشبكة وأخطاء JavaScript',
          'تصميم شعار الموقع',
        ],
        correctIndex: 1,
        explanation: 'Elements وConsole وNetwork أدوات يومية لمطور الواجهة.',
      },
    ],
  },
  {
    id: 'q-l0-vscode',
    title: 'VS Code',
    lessonId: 'l0-vscode',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'أفضل طريقة لفتح مشروع:',
        options: [
          'ملف واحد فقط من سطح المكتب',
          'Open Folder على جذر المشروع',
          'نسخ الكود في المتصفح',
        ],
        correctIndex: 1,
        explanation: 'مساحة العمل هي المجلد الجذر.',
      },
    ],
  },
  {
    id: 'q-l0-terminal',
    title: 'سطر الأوامر',
    lessonId: 'l0-terminal',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'الأمر cd يستخدم لـ:',
        options: ['حذف مجلد', 'تغيير المجلد الحالي', 'عرض إصدار Node'],
        correctIndex: 1,
        explanation: 'change directory.',
      },
      {
        id: 'q2',
        prompt: 'إذا فشل أمر، أول خطوة:',
        options: [
          'إعادة تشغيل الجهاز فورًا',
          'قراءة رسالة الخطأ والتحقق من المجلد الحالي',
          'حذف مجلد Windows',
        ],
        correctIndex: 1,
        explanation: 'المجلد الغلط سبب شائع للفشل.',
      },
    ],
  },
  {
    id: 'q-l0-node',
    title: 'Node وnpm',
    lessonId: 'l0-node',
    levelId: 'level-0',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'Node.js تسمح بـ:',
        options: [
          'تشغيل JavaScript خارج المتصفح على جهازك',
          'استبدال HTML بالكامل',
          'تصميم CSS فقط',
        ],
        correctIndex: 0,
        explanation: 'أدوات Angular تعمل عبر Node.',
      },
    ],
  },
  {
    id: 'q-l1-code',
    title: 'مفهوم البرنامج',
    lessonId: 'l1-what-is-code',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'شبه الكود مفيد لأنه:',
        options: [
          'يستبدل Git',
          'يوضح الخطوات قبل الالتزام بصيغة لغة',
          'يشغّل الصفحة في المتصفح',
        ],
        correctIndex: 1,
        explanation: 'التفكير أولًا يقلل الكود العشوائي.',
      },
    ],
  },
  {
    id: 'q-l1-vars',
    title: 'المتغيرات',
    lessonId: 'l1-variables',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'const تعني غالبًا:',
        options: [
          'لا يمكن إعادة إسناد المتغير',
          'القيمة تُحذف بعد ثانية',
          'المتغير يجب أن يكون عددًا',
        ],
        correctIndex: 0,
        explanation: 'الكائنات داخل const يمكن أن تتغير خصائصها، لكن إعادة الإسناد ممنوعة.',
      },
      {
        id: 'q2',
        prompt: '"12" + 1 في JavaScript غالبًا تعطي:',
        options: ['13', '"121"', 'خطأ فوري دائمًا'],
        correctIndex: 1,
        explanation: '+ مع نص يقوم بالدمج.',
      },
    ],
  },
  {
    id: 'q-l1-if',
    title: 'الشروط',
    lessonId: 'l1-conditions',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'للمقارنة الصارمة نفضّل:',
        options: ['=', '===', '++'],
        correctIndex: 1,
        explanation: '= إسناد. === مقارنة نوع وقيمة.',
      },
    ],
  },
  {
    id: 'q-l1-loops',
    title: 'الحلقات',
    lessonId: 'l1-loops',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'خطر الحلقة اللانهائية أنها:',
        options: [
          'تحسّن الأداء دائمًا',
          'قد تجمّد التبويب لأن شرط التوقف لا يتحقق',
          'تحذف Git',
        ],
        correctIndex: 1,
        explanation: 'شرط التوقف مسؤولية الكاتب.',
      },
    ],
  },
  {
    id: 'q-l1-fn',
    title: 'الدوال',
    lessonId: 'l1-functions',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'من غير return الدالة في JavaScript ترجع:',
        options: ['0', 'undefined', 'اسم الدالة'],
        correctIndex: 1,
        explanation: 'الرجوع الصريح يوضح العقد.',
      },
    ],
  },
  {
    id: 'q-l1-git',
    title: 'Git',
    lessonId: 'l1-git',
    levelId: 'level-1',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'git commit يفعل:',
        options: [
          'يحفظ لقطة للملفات المحدَّدة مع رسالة',
          'ينشر الموقع للعالم مباشرة',
          'يثبت npm',
        ],
        correctIndex: 0,
        explanation: 'النشر خطوة منفصلة.',
      },
    ],
  },
  {
    id: 'q-l2-html',
    title: 'HTML',
    lessonId: 'l2-html-structure',
    levelId: 'level-2',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'HTML أقرب إلى:',
        options: ['لغة برمجة تحسب وتتفرع', 'لغة توصيف تصف معنى أجزاء الصفحة', 'بديل عن CSS'],
        correctIndex: 1,
        explanation: 'المنطق لـ JavaScript والشكل لـ CSS. HTML يصف المعنى.',
      },
      {
        id: 'q2',
        prompt: 'العنصر الفارغ Void مثل img:',
        options: ['يحتاج وسم إغلاق </img>', 'وسم واحد بلا محتوى HTML داخله', 'يعيش داخل head فقط'],
        correctIndex: 1,
        explanation: 'لا تكتب </img> ولا </br>.',
      },
      {
        id: 'q3',
        prompt: 'lang="ar" dir="rtl" توضعان عادة على:',
        options: ['كل فقرة على حدة إلزامًا', 'عنصر html الجذر', 'ملف CSS'],
        correctIndex: 1,
        explanation: 'الجذر يعلن لغة المستند واتجاهه لكل الصفحة.',
      },
      {
        id: 'q4',
        prompt: 'charset utf-8 مهم لأن:',
        options: ['يصفّر حجم الصورة', 'يمنع تهجين الحروف العربية', 'يشغّل Angular'],
        correctIndex: 1,
        explanation: 'ضعه في head قبل ظهور النص.',
      },
    ],
  },
  {
    id: 'q-l2-box',
    title: 'نموذج الصندوق',
    lessonId: 'l2-css-box',
    levelId: 'level-2',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'padding هو:',
        options: ['فراغ خارج الإطار', 'فراغ داخل الإطار حول المحتوى', 'اسم ملف'],
        correctIndex: 1,
        explanation: 'margin هو الخارجي.',
      },
    ],
  },
  {
    id: 'q-l2-flex',
    title: 'Flexbox',
    lessonId: 'l2-flex',
    levelId: 'level-2',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'Flexbox الأنسب عندما:',
        options: [
          'العناصر في اتجاه رئيسي واحد',
          'تحتاج قاعدة بيانات',
          'تستبدل HTML',
        ],
        correctIndex: 0,
        explanation: 'Grid أقوى للشبكات ثنائية البعد.',
      },
    ],
  },
  {
    id: 'q-l3-array',
    title: 'المصفوفات',
    lessonId: 'l3-arrays',
    levelId: 'level-3',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'filter ترجع:',
        options: ['أول عنصر فقط دائمًا', 'مصفوفة جديدة تحقق الشرط', 'تحذف الملف'],
        correctIndex: 1,
        explanation: 'ولا تعدّل الأصل في الاستخدام العادي.',
      },
    ],
  },
  {
    id: 'q-l3-async',
    title: 'غير المتزامن',
    lessonId: 'l3-async',
    levelId: 'level-3',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'await تُستخدم داخل:',
        options: ['دالة async', 'ملف CSS', 'اسم المجلد فقط'],
        correctIndex: 0,
        explanation: 'هذه قاعدة اللغة.',
      },
    ],
  },
  {
    id: 'q-l4-iface',
    title: 'Interface',
    lessonId: 'l4-interfaces',
    levelId: 'level-4',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'الحقل الاختيارى في TypeScript يُعلَن غالبًا بـ:',
        options: ['#', '?', '!!'],
        correctIndex: 1,
        explanation: 'title?: string',
      },
    ],
  },
  {
    id: 'q-l5-what',
    title: 'ما Angular',
    lessonId: 'l5-what-angular',
    levelId: 'level-5',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'Angular يناسب أكثر:',
        options: [
          'تطبيق واجهة متعدد الصفحات يحتاج بنية واضحة',
          'استبدال نظام التشغيل',
          'ملفات الصور فقط',
        ],
        correctIndex: 0,
        explanation: 'الصفحات التسويقية الثابتة قد لا تحتاجه.',
      },
    ],
  },
  {
    id: 'q-l5-comp',
    title: 'المكوّنات',
    lessonId: 'l5-components',
    levelId: 'level-5',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: '{{ title }} في القالب تعني:',
        options: [
          'تعليق HTML',
          'عرض قيمة title من فئة المكوّن',
          'ملف CSS',
        ],
        correctIndex: 1,
        explanation: 'Interpolation.',
      },
    ],
  },
  {
    id: 'q-l5-di',
    title: 'الخدمات',
    lessonId: 'l5-services',
    levelId: 'level-5',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'نضع منطق الدروس المشترك في خدمة حتى:',
        options: [
          'لا نكرر مصدر البيانات في كل صفحة',
          'نعطّل TypeScript',
          'نمنع RTL',
        ],
        correctIndex: 0,
        explanation: 'مصدر واحد يسهّل الصيانة.',
      },
    ],
  },
  {
    id: 'q-l5-router',
    title: 'التوجيه',
    lessonId: 'l5-routing',
    levelId: 'level-5',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'معامل المسار مثل :lessonId يسمح بـ:',
        options: [
          'صفحة درس ديناميكية حسب المعرّف',
          'تثبيت Node',
          'إخفاء الأخطاء',
        ],
        correctIndex: 0,
        explanation: 'رابط واحد وقالب واحد لكثير من الدروس.',
      },
    ],
  },
  {
    id: 'q-l6-arch',
    title: 'المعمارية',
    lessonId: 'l6-architecture',
    levelId: 'level-6',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'التحميل الكسول يعني:',
        options: [
          'تحميل جزء من التطبيق عند زيارة الميزة',
          'حذف الاختبارات',
          'إيقاف المتصفح',
        ],
        correctIndex: 0,
        explanation: 'يقلل الحجم الأولي.',
      },
    ],
  },
  {
    id: 'q-l7-libs',
    title: 'المكتبات',
    lessonId: 'l7-choose-lib',
    levelId: 'level-7',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'قبل تثبيت مكتبة UI اسأل عن:',
        options: [
          'RTL والحجم والصيانة لا الشهرة وحدها',
          'لون شعار الشركة المصنعة فقط',
          'هل الاسم قصير',
        ],
        correctIndex: 0,
        explanation: 'القرار تقني وصيانى.',
      },
    ],
  },
  {
    id: 'q-l8-brief',
    title: 'المتطلبات',
    lessonId: 'l8-project-brief',
    levelId: 'level-8',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'معيار القبول الجيد:',
        options: [
          'غامض مثل اجعلها جميلة',
          'قابل للتحقق مثل يظهر الدرس مكتملًا بعد الاختبار',
          'يخفي الأخطاء عمدًا',
        ],
        correctIndex: 1,
        explanation: 'الوضوح يحمي التنفيذ والمراجعة.',
      },
    ],
  },
  {
    id: 'q-l9-prompt',
    title: 'الذكاء الاصطناعي',
    lessonId: 'l9-prompts',
    levelId: 'level-9',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'بعد كود من نموذج لغوي يجب:',
        options: [
          'دمجه دون قراءة',
          'مراجعته واختباره وعدم إرسال الأسرار',
          'تعطيل TypeScript',
        ],
        correctIndex: 1,
        explanation: 'النماذج تخطئ وتختلق واجهات.',
      },
    ],
  },
  {
    id: 'q-l10-job',
    title: 'المقابلة',
    lessonId: 'l10-interview',
    levelId: 'level-10',
    passPercent: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'إكمال المسار التعليمي:',
        options: [
          'يضمن وظيفة فورًا',
          'يساعد على الاستعداد ولا يضمن التوظيف',
          'يغني عن المشاريع',
        ],
        correctIndex: 1,
        explanation: 'هذا التزام صريح في تصميم المنتج.',
      },
    ],
  },
  ...extraQuizzes,
];
