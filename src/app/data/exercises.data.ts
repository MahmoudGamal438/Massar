import { Exercise } from '../core/models/content.models';
import { extraExercises } from './curriculum-extra.data';

export const exercises: Exercise[] = [
  {
    id: 'ex-l0-path',
    lessonId: 'l0-computer',
    levelId: 'level-0',
    title: 'اكتب مسار مجلد التعلم',
    difficulty: 'easy',
    prompt:
      'أنشئ على جهازك مجلدًا للمسار، ثم اكتب المسار الكامل كما يظهر في النظام. صف في جملة الفرق بين اسم المجلد والمسار الكامل.',
    concepts: ['Path', 'Directory'],
    hints: [
      'على Windows غالبًا يبدأ المسار بحرف القرص.',
      'على Linux/macOS يبدأ بشرطة مائلة.',
    ],
    solution:
      'مثال: C:\\\\Users\\\\nada\\\\learning أو /home/nada/learning. الاسم هو الكلمة الأخيرة. المسار هو العنوان الكامل من جذر النظام حتى المجلد.',
    solutionExplanation:
      'الهدف أن تربط ما تراه في الواجهة بما سيطلبه Terminal لاحقًا. لا يوجد مسار واحد صحيح لكل الأجهزة.',
  },
  {
    id: 'ex-l0-files',
    lessonId: 'l0-files',
    levelId: 'level-0',
    title: 'هيكل مجلد من ثلاث طبقات',
    difficulty: 'easy',
    prompt:
      'أنشئ learning/notes وlearning/practice. ضع ملف day-01.txt في notes وملف first-page.html في practice. اكتب الشجرة الناتجة.',
    concepts: ['Directory', 'Extension'],
    hints: ['ابدأ من المجلد الجذر ثم الفرعي ثم الملف.'],
    solution: `learning/
  notes/
    day-01.txt
  practice/
    first-page.html`,
    solutionExplanation: 'الامتداد .txt و.html يوضح نوع الملف للأدوات التي ستفتحه.',
  },
  {
    id: 'ex-l0-devtools',
    lessonId: 'l0-browser',
    levelId: 'level-0',
    title: 'اقرأ خطأ من Console',
    difficulty: 'easy',
    prompt:
      'افتح أي موقع تعليمي، افتح DevTools على Console. إن لم يوجد خطأ، اكتب في الـ Console كلمة غير معرّفة مثل fooBarTest ولاحظ الرسالة. انسخ نوع الخطأ (مثل ReferenceError) واشرح معناها بجملة.',
    concepts: ['DevTools', 'Console'],
    hints: ['F12 أو زر أيمن ثم Inspect.', 'الرسالة تشير غالبًا أن الاسم غير موجود.'],
    solution:
      'ReferenceError يعني أنك استخدمت اسمًا لم يُعرَّف. قراءة السطر الأول من الخطأ أهم من التخمين.',
    solutionExplanation: 'التدريب على قراءة الرسالة يقلل الخوف قبل كتابة أي إطار.',
  },
  {
    id: 'ex-l0-terminal',
    lessonId: 'l0-terminal',
    levelId: 'level-0',
    title: 'ثلاث أوامر تنقل',
    difficulty: 'easy',
    prompt:
      'من مجلد التعلم: اعرض المسار الحالي، أنشئ مجلد sandbox، ادخل إليه، ثم ارجع للمجلد الأب. اكتب الأوامر التي استخدمتها حسب نظامك.',
    concepts: ['Terminal', 'cd'],
    hints: ['pwd أو cd بلا معاملات حسب النظام.', 'cd .. ترجع للأب.'],
    solution: `pwd
mkdir sandbox
cd sandbox
cd ..`,
    solutionExplanation: 'لو الأمر فشل، غالبًا المجلد الحالي ليس ما تظن. أعد عرض المسار.',
  },
  {
    id: 'ex-l1-pseudo',
    lessonId: 'l1-what-is-code',
    levelId: 'level-1',
    title: 'شبه كود لمجموع سلة',
    difficulty: 'easy',
    prompt: 'اكتب شبه كود يحسب مجموع أسعار في قائمة. إن كانت القائمة فارغة اطبع صفرًا.',
    concepts: ['Pseudocode', 'Edge case'],
    hints: ['ابدأ بمجموع صفر.', 'فكر في قائمة طولها صفر قبل الحلقة.'],
    solution: `إذا كانت القائمة فارغة
  اطبع 0
  توقف
ضع المجموع = 0
لكل سعر في القائمة
  المجموع = المجموع + السعر
اطبع المجموع`,
    solutionExplanation: 'الحالة الفارغة تمنع افتراض وجود عنصر أول.',
  },
  {
    id: 'ex-l1-vars',
    lessonId: 'l1-variables',
    levelId: 'level-1',
    title: 'ثلاثة متغيرات لكورس',
    difficulty: 'easy',
    prompt:
      'أعلن اسم مسار ثابت، عدد مقاعد يتغير بعد تسجيل شخص، وقيمة منطقية تدل أن التسجيل مفتوح. اطبع القيم بعد التغيير.',
    concepts: ['const', 'let', 'boolean'],
    hints: ['الاسم const.', 'عدد المقاعد let.'],
    starterCode: `const pathName = '';
let seats = 0;
const open = false;`,
    solution: `const pathName = 'Angular Journey';
let seats = 20;
const open = true;
seats = seats - 1;
console.log(pathName, seats, open);`,
    solutionExplanation: 'إعادة إسناد pathName بعد const ستفشل وهذا مقصود.',
  },
  {
    id: 'ex-l1-if',
    lessonId: 'l1-conditions',
    levelId: 'level-1',
    title: 'نجاح بمعدل 70',
    difficulty: 'easy',
    prompt: 'اكتب شرطًا يطبع ناجح إن كانت الدرجة 70 أو أكثر، وإلا يعيد المحاولة.',
    concepts: ['if', 'comparison'],
    hints: ['استخدم >= وليس =.'],
    solution: `const score = 70;
if (score >= 70) {
  console.log('ناجح');
} else {
  console.log('أعد المحاولة');
}`,
    solutionExplanation: 'المقارنة >= تشمل الحد. الإسناد = خطأ شائع.',
  },
  {
    id: 'ex-l1-loop',
    lessonId: 'l1-loops',
    levelId: 'level-1',
    title: 'اطبع عناوين الدروس',
    difficulty: 'easy',
    prompt: 'لديك مصفوفة عناوين. اطبع كل عنوان في سطر باستخدام for...of.',
    concepts: ['for...of', 'array'],
    hints: ['const title of titles'],
    solution: `const titles = ['ملفات', 'متصفح', 'Terminal'];
for (const title of titles) {
  console.log(title);
}`,
    solutionExplanation: 'for...of يمر على القيم مباشرة دون فهرس إن لم تحتاجه.',
  },
  {
    id: 'ex-l1-fn',
    lessonId: 'l1-functions',
    levelId: 'level-1',
    title: 'دالة دقائق إلى ساعات',
    difficulty: 'medium',
    prompt: 'اكتب دالة minutesToHours(minutes) ترجع ساعات عشرية. مثال: 90 ترجع 1.5.',
    concepts: ['function', 'return'],
    hints: ['اقسم على 60.', 'لا تطبع داخل الدالة إن طُلب منك إرجاع.'],
    solution: `function minutesToHours(minutes) {
  return minutes / 60;
}
console.log(minutesToHours(90));`,
    solutionExplanation: 'الفصل بين الحساب والعرض يسهّل الاختبار لاحقًا.',
  },
  {
    id: 'ex-l2-html',
    lessonId: 'l2-html-structure',
    levelId: 'level-2',
    title: 'صفحة عربية بحد أدنى دلالي',
    difficulty: 'easy',
    prompt:
      'اكتب HTML فيه lang=ar وdir=rtl وعنوان في header وفقرة في main. لا تستخدم div مكان هذه العناصر.',
    concepts: ['semantic HTML', 'RTL'],
    hints: ['header وmain عناصر جاهزة.'],
    solution: `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>تجربة</title>
  </head>
  <body>
    <header><h1>عنوان</h1></header>
    <main><p>محتوى</p></main>
  </body>
</html>`,
    solutionExplanation: 'اللغة والاتجاه جزء من الوصول لا تجميل لاحق.',
  },
  {
    id: 'ex-l2-flex',
    lessonId: 'l2-flex',
    levelId: 'level-2',
    title: 'شريط بأطراف',
    difficulty: 'medium',
    prompt: 'اكتب CSS لعنصر .bar يجعل أبناءه في صف، طرفين متباعدين، مع فجوة 12px.',
    concepts: ['flex', 'justify-content', 'gap'],
    hints: ['display:flex', 'space-between'],
    solution: `.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,
    solutionExplanation: 'gap يحمي العناصر عند التقريب دون هامش على كل طفل.',
  },
  {
    id: 'ex-l3-array',
    lessonId: 'l3-arrays',
    levelId: 'level-3',
    title: 'رشّح الدروس القصيرة',
    difficulty: 'medium',
    prompt:
      'مصفوفة كائنات {title, minutes}. أبقِ ما دقائقه أقل من 15 وأرجع مصفوفة العناوين فقط.',
    concepts: ['filter', 'map'],
    hints: ['filter ثم map.', 'لا تعدّل المصفوفة الأصلية.'],
    solution: `const lessons = [
  { title: 'أ', minutes: 10 },
  { title: 'ب', minutes: 20 },
];
const shortTitles = lessons
  .filter((lesson) => lesson.minutes < 15)
  .map((lesson) => lesson.title);`,
    solutionExplanation: 'السلسلة filter ثم map نمط شائع قبل عرضه في قالب Angular.',
  },
  {
    id: 'ex-l4-iface',
    lessonId: 'l4-interfaces',
    levelId: 'level-4',
    title: 'واجهة تمرين',
    difficulty: 'medium',
    prompt: 'عرّف interface ExercisePreview بالحقول id وtitle وdifficulty من نوع اتحاد "easy" | "medium" | "hard".',
    concepts: ['interface', 'union'],
    hints: ['union بين نصوص حرفية.'],
    solution: `interface ExercisePreview {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}`,
    solutionExplanation: 'الاتحاد يمنع قيمًا عشوائية مثل Easy بأحرف مختلفة.',
  },
  {
    id: 'ex-l5-comp',
    lessonId: 'l5-components',
    levelId: 'level-5',
    title: 'اعرض عنوانًا من الفئة',
    difficulty: 'easy',
    prompt: 'اكتب مكوّن standalone قالبه يعرض خاصية heading باستخدام Interpolation.',
    concepts: ['component', 'interpolation'],
    hints: ['@Component مع standalone: true'],
    solution: `import { Component } from '@angular/core';

@Component({
  selector: 'app-heading',
  standalone: true,
  template: '<h1>{{ heading }}</h1>',
})
export class HeadingComponent {
  heading = 'عنوان من الفئة';
}`,
    solutionExplanation: 'القيمة مصدرها الفئة. القالب لا يخزن البيانات الأساسية.',
  },
  ...extraExercises,
];
