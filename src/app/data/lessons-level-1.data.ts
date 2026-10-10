import { Lesson } from '../core/models/content.models';

export const lessonsLevel1: Lesson[] = [
  {
    id: 'l1-what-is-code',
    moduleId: 'm1-think',
    levelId: 'level-1',
    order: 1,
    title: 'البرمجة: أوامر مرتبة لمشكلة واضحة',
    summary: 'البرنامج سلسلة تعليمات. قبل الكود لازم تحدد المدخلات والناتج المتوقع.',
    durationMinutes: 14,
    objectives: [
      'تعرّف البرنامج بعباراتك',
      'تفصل المشكلة إلى خطوات',
      'تكتب شبه كود (Pseudocode) بسيط',
    ],
    prerequisites: [],
    sections: [
      {
        id: 's1',
        title: 'إيه هي البرمجة؟',
        body: 'البرمجة كتابة تعليمات دقيقة لحاسوب ينفّذها. الحاسوب لا يخمن نيتك. لو قلت "اطبع الأرقام الزوجية حتى 10" لازم تحدد البداية، وما معنى زوجي، وهل 10 مشمولة.',
      },
      {
        id: 's2',
        title: 'شبه الكود قبل الكود',
        body: 'شبه الكود خطوات بالعربية أو الإنجليزية من غير صيغة لغة معينة:',
        code: {
          language: 'text',
          filename: 'pseudocode.txt',
          code: `ضع المجموع = 0
لكل سعر في قائمة المشتريات
  أضف السعر إلى المجموع
اطبع المجموع`,
          explanation: 'لو الخطوات واضحة، تحويلها لـ JavaScript بعدين أسهل.',
        },
      },
      {
        id: 's3',
        title: 'خطأ شائع',
        body: 'البدء بكتابة كود قبل فهم المطلوب. في الشغل، المطلوب ناقص أحيانًا. اسأل: إيه المدخل؟ إيه الناتج؟ إيه الحالة الغريبة زي قائمة فاضية؟',
      },
    ],
    terms: [
      { en: 'Program', ar: 'برنامج', definition: 'مجموعة تعليمات لتحقيق هدف.' },
      { en: 'Pseudocode', ar: 'شبه الكود', definition: 'خطوات منطقية قبل الالتزام بصيغة لغة.' },
    ],
    exerciseId: 'ex-l1-pseudo',
    quizId: 'q-l1-code',
  },
  {
    id: 'l1-variables',
    moduleId: 'm1-think',
    levelId: 'level-1',
    order: 2,
    title: 'المتغيرات والأنواع المبدئية',
    summary: 'المتغير صندوق له اسم وقيمة. في JavaScript نستخدم let وconst، والأنواع تظهر من القيمة.',
    durationMinutes: 18,
    objectives: [
      'تعلن متغيرًا بـ const أو let',
      'تفرّق بين النص والعدد والمنطق',
      'تفهم ليه الاسم الواضح أهم من الاسم القصير',
    ],
    prerequisites: ['l1-what-is-code'],
    sections: [
      {
        id: 's1',
        title: 'الصندوق والاسم',
        body: 'المتغير (Variable) مكان تخزين بقيمة ممكن تتغير حسب نوع الإعلان. const للقيمة التي لن تُعاد إسنادها. let للقيمة التي قد تتغير. تجنب var في الكود الحديث.',
      },
      {
        id: 's2',
        title: 'مثال',
        code: {
          language: 'javascript',
          filename: 'variables.js',
          code: `const courseName = 'Angular';
let seats = 12;
const isOpen = true;

seats = seats - 1;
console.log(courseName, seats, isOpen);`,
          explanation: 'النصوص بين علامات اقتباس. الأعداد من غير اقتباس. true وfalse قيم منطقية.',
        },
      },
      {
        id: 's3',
        title: 'الناتج المتوقع',
        body: 'السطر الأخير يطبع Angular ثم 11 ثم true في الـ Console. لو كتبت const seats ثم حاولت تغيرها، هتظهر رسالة خطأ. الرسالة دي صديقك مش عدوك.',
      },
      {
        id: 's4',
        title: 'خطأ شائع',
        body: 'خلط النص والعدد: "12" + 1 يعطيك "121" لأن + مع نص يعمل دمجًا. لو حساب، تأكد إن القيمة عدد.',
        callout: {
          type: 'tip',
          text: 'سمّي المتغيرات بما تعنيه: userAge أوضح من x.',
        },
      },
    ],
    terms: [
      { en: 'Variable', ar: 'متغير', definition: 'اسم يشير إلى قيمة في الذاكرة.' },
      { en: 'const', ar: 'ثابت الإسناد', definition: 'إعلان لا يسمح بإعادة إسناد المتغير.' },
      { en: 'boolean', ar: 'منطقي', definition: 'قيمة true أو false.' },
    ],
    exerciseId: 'ex-l1-vars',
    quizId: 'q-l1-vars',
  },
  {
    id: 'l1-conditions',
    moduleId: 'm1-flow',
    levelId: 'level-1',
    order: 3,
    title: 'الشروط: قرارات الكود',
    summary: 'if وelse يخلّوا البرنامج يختار مسار حسب حالة.',
    durationMinutes: 16,
    objectives: [
      'تكتب شرطًا بـ if',
      'تستخدم مقارنة ===',
      'تتعامل مع أكثر من فرع',
    ],
    prerequisites: ['l1-variables'],
    sections: [
      {
        id: 's1',
        title: 'ليه الشرط؟',
        body: 'الدرس يظهر لو المستخدم مسجّل. الزر يتفعل لو النموذج سليم. الشرط تعبير نتيجته صحيحة أو خاطئة.',
      },
      {
        id: 's2',
        title: 'مثال',
        code: {
          language: 'javascript',
          filename: 'conditions.js',
          code: `const score = 72;

if (score >= 70) {
  console.log('نجحت');
} else if (score >= 50) {
  console.log('تحتاج مراجعة');
} else {
  console.log('أعد المحاولة');
}`,
          explanation: '>= تعني أكبر من أو يساوي. استخدم === للمساواة الصارمة بدل == في معظم الحالات.',
        },
      },
      {
        id: 's3',
        title: 'خطأ شائع',
        body: 'كتابة if (score = 70) بالخطأ؛ ده إسناد مش مقارنة، وقد يمر كقيمة صحيحة. المقارنة == أو ===.',
      },
    ],
    terms: [
      { en: 'Condition', ar: 'شرط', definition: 'تعبير يُقيَّم إلى صحيح أو خطأ.' },
      { en: 'Branching', ar: 'تفرع', definition: 'اختيار مسار تنفيذ مختلف.' },
    ],
    exerciseId: 'ex-l1-if',
    quizId: 'q-l1-if',
  },
  {
    id: 'l1-loops',
    moduleId: 'm1-flow',
    levelId: 'level-1',
    order: 4,
    title: 'الحلقات: تكرار بحدود',
    summary: 'الحلقة تكرر عملًا على مجموعة أو حتى يتحقق شرط توقف.',
    durationMinutes: 16,
    objectives: [
      'تستخدم for...of على مصفوفة',
      'تفهم عدّاد for التقليدي',
      'تتجنب الحلقة اللانهائية',
    ],
    prerequisites: ['l1-conditions'],
    sections: [
      {
        id: 's1',
        title: 'متى تتكرر؟',
        body: 'عرض قائمة دروس، جمع أسعار، البحث عن اسم. التكرار اليدوي لـ 200 عنصر غير واقعي.',
      },
      {
        id: 's2',
        title: 'مثال',
        code: {
          language: 'javascript',
          filename: 'loops.js',
          code: `const lessons = ['ملفات', 'متصفح', 'Terminal'];

for (const title of lessons) {
  console.log('درس:', title);
}

for (let i = 0; i < lessons.length; i++) {
  console.log(i + 1, lessons[i]);
}`,
          explanation: 'for...of يمر على القيم. العداد مفيد لو محتاج رقم الترتيب.',
        },
      },
      {
        id: 's3',
        title: 'تحذير',
        body: 'while (true) من غير كسر هتجمّد التبويب. لازم شرط يتغير أو break واضح.',
        callout: {
          type: 'warn',
          text: 'لو الصفحة تجمدت بعد حلقة، أغلق التبويب وراجع شرط التوقف.',
        },
      },
    ],
    terms: [
      { en: 'Loop', ar: 'حلقة', definition: 'تكرار تعليمات حتى يتحقق شرط التوقف.' },
      { en: 'Array', ar: 'مصفوفة', definition: 'قائمة قيم مرتبة.' },
    ],
    exerciseId: 'ex-l1-loop',
    quizId: 'q-l1-loops',
  },
  {
    id: 'l1-functions',
    moduleId: 'm1-flow',
    levelId: 'level-1',
    order: 5,
    title: 'الدوال: كود تعيد استخدامه',
    summary: 'الدالة تغلف مهمة لها اسم ومدخلات وناتج.',
    durationMinutes: 18,
    objectives: [
      'تعرّف دالة بمعامل وقيمة رجوع',
      'تفهم النطاق Scope بشكل مبدئي',
      'تقسّم المسألة إلى دوال صغيرة',
    ],
    prerequisites: ['l1-loops'],
    sections: [
      {
        id: 's1',
        title: 'ليه الدالة؟',
        body: 'لو كتبت نفس حساب الخصم في ثلاثة مواضع، التعديل هيبقى مؤلم والأخطاء هتتكرر. الدالة مكان واحد للحساب.',
      },
      {
        id: 's2',
        title: 'مثال',
        code: {
          language: 'javascript',
          filename: 'functions.js',
          code: `function priceAfterDiscount(price, percent) {
  const discount = price * (percent / 100);
  return price - discount;
}

const finalPrice = priceAfterDiscount(200, 10);
console.log(finalPrice);`,
          explanation: 'return ترجع القيمة لمن استدعى الدالة. من غير return الناتج undefined.',
        },
      },
      {
        id: 's3',
        title: 'النطاق',
        body: 'المتغير المعلن داخل الدالة لا يُرى خارجها. ده يحمي الأسماء من التصادم. لاحقًا في Angular هتشوف فكرة مشابهة في المكوّنات والخدمات.',
      },
    ],
    terms: [
      { en: 'Function', ar: 'دالة', definition: 'كتلة كود قابلة للاستدعاء باسم.' },
      { en: 'Parameter', ar: 'معامل', definition: 'مدخل تعرّفه الدالة.' },
      { en: 'Scope', ar: 'النطاق', definition: 'المنطقة التي يمكن رؤية المتغير منها.' },
    ],
    exerciseId: 'ex-l1-fn',
    quizId: 'q-l1-fn',
  },
  {
    id: 'l1-git',
    moduleId: 'm1-flow',
    levelId: 'level-1',
    order: 6,
    title: 'Git للمبتدئ: تاريخ لمشروعك',
    summary: 'Git يسجّل لقطات للكود. GitHub مكان بعيد لمشاركة النسخ.',
    durationMinutes: 16,
    objectives: [
      'تفهم commit كصورة للمشروع',
      'تعرف أوامر status وadd وcommit',
      'تفرّق بين المحلي والبعيد',
    ],
    prerequisites: ['l1-functions'],
    sections: [
      {
        id: 's1',
        title: 'ليه Git؟',
        body: 'من غير تاريخ، الخوف من التجربة كبير. الـ commit رسالة تشرح ليه التغيير حصل. لو كسرت حاجة، تقدر ترجع. في الفرق، Git هو لغة التعاون.',
      },
      {
        id: 's2',
        title: 'الأوامر الأولى',
        code: {
          language: 'bash',
          filename: 'git-basics',
          code: `git status
git add .
git commit -m "Explain the change in English or Arabic"`,
          explanation: 'status يعرض ما تغيّر. add يحدد ما سيدخل اللقطة. commit يحفظ اللقطة مع رسالة.',
        },
      },
      {
        id: 's3',
        title: 'GitHub',
        body: 'المستودع البعيد نسخة على الإنترنت. push يرسل لقطاتك. clone ينسخ مشروعًا موجودًا. لا ترفع أسرارًا ولا مجلد node_modules.',
        callout: {
          type: 'note',
          text: 'رسائل الـ commit الواضحة عادة للجمهور التقني بالإنجليزية، والعربية مقبولة في مشاريعك التعليمية لو الفريق يفهمها.',
        },
      },
    ],
    terms: [
      { en: 'Commit', ar: 'لقطة', definition: 'حفظ حالة الملفات مع رسالة.' },
      { en: 'Repository', ar: 'مستودع', definition: 'مشروع تحت إدارة Git.' },
    ],
    quizId: 'q-l1-git',
  },
];
