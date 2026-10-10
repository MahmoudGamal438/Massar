import { Lesson } from '../core/models/content.models';
import { code, compare, makeLesson, sec, table, term } from './lesson-factory';

export const lessonsJsRef: Lesson[] = [
  makeLesson(
    'l3-strings',
    'm3-js',
    'level-3',
    6,
    'النصوص: قص وقياس وقالب',
    'معظم واجهة المستخدم نص. تتعلم قياسه وقصه وتركيبه دون أخطاء المسافات أو حقن HTML.',
    26,
    [
      'تقيس النص وتقصّه دون كسر العربية',
      'تركّب جملة بقالب بدل جمع + المتكرر',
      'تفرّق بين النص والعرض الآمن في الصفحة',
    ],
    [
      sec(
        's1',
        'الطول والتقليم والبحث',
        'length عدد وحدات UTF-16 لا عدد الحروف المرئية دائمًا. للأحرف المركبة النادرة استخدم أدوات حديثة إن كنت تعدّ حروفًا للمستخدم.\n\ntrim يحذف الفراغات طرفيًا. حقل بحث بلا trim يفشل في مطابقة «Flexbox » بمسافة.\n\nincludes وstartsWith وindexOf تبحث. localeCompare للمقارنة العربية أفضل من > على الحروف.',
        {
          code: code(
            'javascript',
            `const q = '  Flexbox  ';
const needle = q.trim().toLowerCase();
const title = 'Flexbox: اتجاه واحد';
console.log(title.toLowerCase().includes(needle));
console.log(title.slice(0, 7));`,
          ),
        },
      ),
      sec(
        's2',
        'قوالب النص',
        'القالب بين backticks يسمح بأسطر متعددة و${تعبير}. أوضح من title + " — " + minutes + " د".\n\nلا تبنِ HTML من قالب فيه إدخال مستخدم: `<li>${name}</li>` إن كان name وسم سكربت انكسر الأمان. في الصفحة استخدم textContent أو إطارًا يهرّب.\n\nreplace وreplaceAll للاستبدال. التعبير النمطي خطوة لاحقة؛ لا تبدأ كل قص بـ regex.',
        {
          compare: compare(
            `const label = title + ' (' + minutes + ' د)';`,
            `const label = \`\${title} (\${minutes} د)\`;`,
            'القالب يقرأ كجملة واحدة ويقلل نسيان المسافات.',
          ),
        },
      ),
      sec(
        's3',
        'تقسيم وضم',
        'split(",") يقطع. map ثم join لصق قائمة. فراغات بعد الفاصلة تبقى ما لم تُقلم.\n\nNumber("08") يعطي 8. parseInt("08px", 10) يقرأ 8 ويتوقف. دائمًا مرّر الأساس 10 لـ parseInt.\n\nString(undefined) هو "undefined" كنص. لا تعرضه في الواجهة؛ عالج القيمة الفارغة قبل التركيب.',
        {
          table: table(
            ['الأسلوب', 'الناتج تقريبًا'],
            [
              ['trim', 'بدون فراغ طرفي'],
              ['slice(0, n)', 'أول n وحدات'],
              ['includes', 'وجود مقطع'],
              ['split / join', 'قطع ولصق'],
              ['template', 'تركيب قيم'],
            ],
          ),
        },
      ),
    ],
    {
      terms: [
        term('template literal', 'قالب نصي', 'نص backticks يضم قيمًا بـ ${}.'),
        term('trim', 'تقليم', 'حذف الفراغات من طرفي النص.'),
      ],
      prerequisites: ['l3-scope'],
      quizId: 'q-l3-strings',
      exerciseId: 'ex-l3-strings',
    },
  ),
  makeLesson(
    'l3-numbers-dates',
    'm3-js',
    'level-3',
    7,
    'الأعداد والتواريخ: حساب بلا مفاجآت',
    'الحساب عشري تقريبي. التواريخ مناطق زمنية. تتعلم أين تقرّب وأين لا تثق في الساعة المحلية وحدها.',
    28,
    [
      'تكتشف NaN وتمنع قسمة صامتة',
      'تقرّب عرضًا لا بيانات مخزّنة عشوائيًا',
      'تقرأ تاريخ ISO بحذر',
    ],
    [
      sec(
        's1',
        'NaN والصفر',
        'Number("دقيقة") يعطي NaN. أي حساب مع NaN يبقى NaN. افحص Number.isNaN قبل العرض.\n\nNumber.isFinite يرفض Infinity. قسمة على صفر في JS تعطي Infinity لا خطأ.\n\n0.1 + 0.2 !== 0.3 بسبب الثنائية. للأسعار اعمل بالقرش صحيحًا أو مكتبة عشرية لاحقًا. للعرض toFixed(2) يعيد نصًا لا عددًا.',
        {
          code: code(
            'javascript',
            `function minutesOrZero(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));`,
          ),
        },
      ),
      sec(
        's2',
        'Math الشائع',
        'Math.round وfloor وceil. Math.max وmin لاختيار حد. Math.abs للمسافة.\n\nMath.random() بين 0 و1 غير شامل 1. ليس آمنًا للرهانات أو الرموز السرية.\n\n** أس. % باقٍ. الباقي السالب يتبع إشارة المقسوم في JS؛ انتبه في جداول دورية.',
        {
          table: table(
            ['الدالة', 'مثال'],
            [
              ['Math.round(4.5)', 'قد تعطي 5 حسب القاعدة'],
              ['Math.floor(4.9)', '4'],
              ['Math.max(1, 8, 3)', '8'],
              ['Number.isNaN(NaN)', 'true'],
            ],
          ),
        },
      ),
      sec(
        's3',
        'Date',
        'new Date() الآن حسب جهاز المستخدم. new Date("2026-10-06") يُفسَّر كمنتصف ليل UTC في محركات كثيرة فيظهر اليوم السابق محليًا. فضّل المكوّنات أو مكتبة إن كانت الدقيقة مهمة.\n\ngetFullYear وgetMonth: الشهر صفر الأساس. هذا فخ شهير: يناير 0.\n\nللترتيب والخزن استخدم ISO من الخادم إن وجد. لا تبنِ منطق تذكير دروس على ساعة جهاز قد تكون خاطئة.',
        {
          callout: {
            type: 'warn',
            text: 'Date.parse لأشكال عشوائية يختلف بين المتصفحات. التزم بشكل واحد موثّق.',
          },
        },
      ),
    ],
    {
      terms: [
        term('NaN', 'ليس عددًا', 'ناتج عملية عددية غير صالحة.'),
        term('ISO 8601', 'تنسيق تاريخ', 'شكل نصي قياسي للتاريخ والوقت.'),
      ],
      prerequisites: ['l3-strings'],
      quizId: 'q-l3-numbers',
    },
  ),
  makeLesson(
    'l3-errors',
    'm3-js',
    'level-3',
    8,
    'الأخطاء: throw وtry/catch',
    'الفشل جزء من البرنامج. ترمي خطأً واضحًا وتمسكه عند الحدود: شبكة، تحليل JSON، إدخال مستخدم.',
    24,
    [
      'ترمي Error برسالة مفهومة',
      'تمسك الخطأ عند حد الواجهة',
      'لا تبتلع الخطأ بصمت',
    ],
    [
      sec(
        's1',
        'متى ترمي',
        'دالة parseQuiz(json) إن فشل JSON.parse اترك الخطأ أو غلّفه برسالة «تعذر قراءة الاختبار». لا ترجع {} صامتًا فيختبئ العطل.\n\nthrow new Error("...") أفضل من throw "نص" لأن المكدس يُحفظ.\n\nالتحقق المبكر Guard clause يقلل التداخل: إن لم يوجد درس أرجع أو ارمِ قبل الحساب.',
        {
          code: code(
            'javascript',
            `function parseQuiz(text) {
  if (!text) {
    throw new Error('النص فارغ');
  }
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new Error('تعذر قراءة الاختبار', { cause });
  }
}`,
          ),
        },
      ),
      sec(
        's2',
        'try/catch/finally',
        'catch يمسك الأخطاء المتزامنة داخل الكتلة. أخطاء Promise تُمسك بـ catch على الوعد أو try حول await.\n\nfinally يعمل للتنظيف: إغلاق مؤشر تحميل، سواء نجح الطلب أم فشل.\n\ncatch فارغ جريمة صيانة. سجّل أو أظهر. الابتلاع يجعل الدرس «لا يفعل شيئًا» بلا سبب.',
        {
          compare: compare(
            `try { await load(); } catch (e) {}`,
            `try {
  await load();
} catch {
  status = 'error';
}`,
            'الحالة الظاهرة للمستخدم أهم من إخفاء الاستثناء.',
          ),
        },
      ),
      sec(
        's3',
        'أنواع شائعة',
        'TypeError استدعاء غير دالة أو قراءة من undefined. ReferenceError اسم غير معرّف. SyntaxError ملف أو JSON مكسور.\n\nاقرأ السطر الأول من المكدس. أدوات المطوّر تربط الملف. لا تبدأ بتغيير عشوائي في ملف آخر.\n\nفي Angular ستقابل أخطاء قوالب أيضًا. العادة نفسها: اقرأ الرسالة قبل أن تعيد كتابة المكوّن.',
        {
          callout: {
            type: 'tip',
            text: 'رسالة الخطأ للمطور في الطرفية. رسالة المستخدم جملة قصيرة بلا مكدس.',
          },
        },
      ),
    ],
    {
      terms: [
        term('throw', 'رمي', 'إيقاف التنفيذ الحالي باستثناء.'),
        term('stack trace', 'مكدس الاستدعاء', 'سلسلة الدوال حتى موقع الخطأ.'),
      ],
      prerequisites: ['l3-numbers-dates'],
      quizId: 'q-l3-errors',
    },
  ),
  makeLesson(
    'l3-modules',
    'm3-js',
    'level-3',
    9,
    'الوحدات: import وexport',
    'الملف الواحد ينهار. الوحدة تصدّر اسمًا واضحًا وتستورد ما تحتاج. Angular مبني على هذا.',
    24,
    [
      'تصدّر دالة أو ثابتًا بالاسم',
      'تستورد بوحدة ES',
      'تفهم لماذا التصدير الافتراضي يُكثر الالتباس',
    ],
    [
      sec(
        's1',
        'تصدير مسمّى',
        'export function minutesLabel() أو export const levels = []. المستورد يختار الأسماء في أقواس معقوفة.\n\nإعادة التسمية: import { minutesLabel as label }.\n\nملف index يعيد التصدير للتنظيم لا لإخفاء كل شيء في سلة.',
        {
          code: code(
            'javascript',
            `// minutes.js
export function minutesLabel(n) {
  return n + ' د';
}

// lesson.js
import { minutesLabel } from './minutes.js';
console.log(minutesLabel(12));`,
          ),
        },
      ),
      sec(
        's2',
        'الافتراضي والحلقات',
        'export default يسمح باسم مستورد حر. في الفرق يختلف الاسم من ملف لآخر فيصعب البحث. فضّل التصدير المسمّى إلا لمكوّن صفحة شائع في Angular.\n\nالاستيراد دائري: A يستورد B يستورد A. قد تحصل على undefined. قسّم الثوابت إلى ملف ثالث.\n\ntype="module" في script أو حزمة Angular تجعل import يعمل. بدونها المتصفح يرفض.',
        {
          table: table(
            ['الشكل', 'متى'],
            [
              ['export { x }', 'أسماء مستقرة'],
              ['export default', 'مكوّن واحد شهير'],
              ['import * as api', 'مساحة أسماء نادرة'],
              ['import type', 'TypeScript فقط للنوع'],
            ],
          ),
        },
      ),
      sec(
        's3',
        'ما الذي لا تشاركه',
        'لا تصدّر حالة قابلة للكتابة من كل مكان دون قواعد. خدمة Angular أفضل لحالة التقدم من متغير عام.\n\nالمسارات النسبية ./ و../ تتبع الملف. أخطاء «failed to resolve» غالبًا امتداد أو حرف.',
        {
          callout: {
            type: 'note',
            text: 'كتالوج هذه المنصة ملفات TypeScript تصدّر مصفوفات دروس ثم تُجمع في catalog.ts. نفس الفكرة.',
          },
        },
      ),
    ],
    {
      terms: [
        term('ES module', 'وحدة ES', 'ملف يصدّر ويستورد بربط ثابت أثناء التحميل.'),
        term('named export', 'تصدير مسمّى', 'رمز يُستورد باسمه بين أقواس.'),
      ],
      prerequisites: ['l3-errors'],
      quizId: 'q-l3-modules',
    },
  ),
  makeLesson(
    'l3-events-deep',
    'm3-dom',
    'level-3',
    13,
    'الأحداث بعمق: الانتشار والنماذج واللوحة',
    'النقر يصل من الابن إلى الأجداد. الإرسال يعيد تحميل الصفحة إن لم تمنعه. لوحة المفاتيح ليست بعد الفأرة.',
    28,
    [
      'تمنع السلوك الافتراضي حين يلزم',
      'تفهم الفقاعة مقابل الالتقاط',
      'تربط إدخال لوحة بمهمة واضحة',
    ],
    [
      sec(
        's1',
        'الهدف والانتشار',
        'event.target العنصر الذي بدأ الحدث. currentTarget الذي يملك المستمع.\n\nالفقاعة Bubble تصعد من الهدف إلى document. stopPropagation يوقف الصعود. لا تستخدمه إلا إذا فهمت من يستمع فوقك.\n\naddEventListener(type, fn, { once: true }) للمرة الواحدة. { passive: true } للتمرير أداءً؛ لا تمنع الافتراضي حينها.',
        {
          code: code(
            'javascript',
            `form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(data.get('email'));
});`,
          ),
        },
      ),
      sec(
        's2',
        'نماذج ولوحة',
        'بدون preventDefault على submit تُرسل الصفحة وتُفقد الحالة. في تطبيق تعليمي هذا يبدو «اختفاءً غامضًا».\n\nkeydown لـ Enter على حقل بحث. اترك Enter في textarea للسطر الجديد.\n\nclick يُطلق أيضًا من Enter على الزر. لا تضف مستمعي click وkeydown يفعلان العمل مرتين بلا فحص.',
        {
          compare: compare(
            `<a href="#" onclick="doThing()">حفظ</a>`,
            `<button type="button">حفظ</button>`,
            'الرابط للتنقل. الزر للإجراء. href="#" يقفز أعلى الصفحة.',
          ),
        },
      ),
      sec(
        's3',
        'التفويض',
        'مستمع واحد على القائمة بدل مئة على كل عنصر: إن كان النقر من .item فاعمل. العناصر المضافة لاحقًا تُغطى.\n\nفي Angular (click) على الأب مع قالب @for يغني عن التفويض اليدوي غالبًا. تتعلم اليدوي لتفهم الإطار وتصحّح المكتبات.',
        {
          callout: {
            type: 'tip',
            text: 'type="button" داخل نموذج يمنع الإرسال الافتراضي. الزر بلا نوع داخل form يتصرف كـ submit.',
          },
        },
      ),
    ],
    {
      terms: [
        term('preventDefault', 'منع الافتراضي', 'إيقاف سلوك المتصفح الأصلي للحدث.'),
        term('event delegation', 'تفويض الأحداث', 'مستمع على الجد يعالج أحداث الأبناء.'),
      ],
      prerequisites: ['l3-dom'],
      quizId: 'q-l3-events',
      exerciseId: 'ex-l3-events',
    },
  ),
  makeLesson(
    'l3-json-http',
    'm3-dom',
    'level-3',
    14,
    'JSON ورموز HTTP للواجهة',
    'قبل Angular HttpClient تتقن شكل الرسالة: رأس، رمز، جسم. JSON نص له قواعد صارمة.',
    26,
    [
      'تفرّق رموز 2xx و4xx و5xx',
      'تحوّل كائنًا إلى JSON وتعود',
      'لا تفترض أن كل استجابة JSON',
    ],
    [
      sec(
        's1',
        'رموز الحالة',
        '200 نجاح بجسم. 201 إنشاء. 204 نجاح بلا جسم.\n\n400 طلب سيئ. 401 غير مصدّق. 403 ممنوع. 404 غير موجود. 422 تحقق فشل أحيانًا.\n\n500 عطل خادم. 503 غير متاح. الواجهة تعرض رسالة شبكة لا مكدس الخادم.',
        {
          table: table(
            ['الرمز', 'معنى عملي للواجهة'],
            [
              ['200', 'اعرض البيانات'],
              ['401', 'اطلب دخولًا أو جدد جلسة'],
              ['404', 'المورد غير موجود'],
              ['500', 'أعد المحاولة لاحقًا'],
            ],
          ),
        },
      ),
      sec(
        's2',
        'قواعد JSON',
        'المفاتيح بين اقتباس مزدوج. لا تعليقات. لا فاصلة أخيرة في كثير من المحللات.\n\nJSON.stringify يحول. undefined في قيم الكائن تُحذف. Date يصبح نص ISO. دالة تُحذف.\n\nJSON.parse يرمي عند الكسر. غلّفه. لا تحلل HTML صفحة خطأ على أنه JSON.',
        {
          code: code(
            'javascript',
            `const payload = { id: 'l3-json-http', minutes: 26 };
const text = JSON.stringify(payload);
const back = JSON.parse(text);
console.log(back.minutes);`,
          ),
        },
      ),
      sec(
        's3',
        'رؤوس شائعة',
        'Content-Type: application/json يعلن الجسم. Accept ما تتوقع استقباله.\n\nAuthorization لا تضعه في مستودع ولا في درس عام بمفتاح حقيقي.\n\nCORS سياسة خادم. من الواجهة المحلية لعنوان آخر قد يُحجب الطلب. هذا ليس «فشل JSON» بل سياسة شبكة. في هذه المنصة البيانات محلية بلا خادم API.',
        {
          callout: {
            type: 'note',
            text: 'response.ok يعني رمز 200–299. 404 ليس ok حتى لو رجع JSON رسالة.',
          },
        },
      ),
    ],
    {
      terms: [
        term('JSON', 'ترميز كائنات', 'نص لتبادل البيانات بأشكال محدودة.'),
        term('HTTP status', 'رمز HTTP', 'رقم يلخص نتيجة الطلب.'),
      ],
      prerequisites: ['l3-events-deep'],
      quizId: 'q-l3-json',
    },
  ),
  makeLesson(
    'l3-classes-this',
    'm3-js',
    'level-3',
    10,
    'الكلاسات وthis في JavaScript',
    'الصنف قالب كائنات. this يعتمد على الاستدعاء. Angular يستخدم أصنافًا للمكوّنات؛ سوء this يظهر فجأة في المستمعات.',
    26,
    [
      'تعرّف صنفًا بحقول ودوال',
      'تشرح لماذا تفقد this في مستمع',
      'تفضل دوالًا سهمية للحقول أو الربط الصريح',
    ],
    [
      sec(
        's1',
        'صيغة الصنف',
        'class Timer { constructor(n) { this.left = n; } tick() { this.left -= 1; } }\n\nالحقل العام والخاص #secret في لغة حديثة. لا تحاكي الخصوصية بـ _ إلا اصطلاحًا ضعيفًا.\n\nالوراثة extends نادرة في واجهة يومية. فضّل التركيب: كائن يملك خدمة لا أبًا عميقًا.',
        {
          code: code(
            'javascript',
            `class Counter {
  #value = 0;
  inc() {
    this.#value += 1;
    return this.#value;
  }
}
const c = new Counter();
console.log(c.inc());`,
          ),
        },
      ),
      sec(
        's2',
        'فخ this',
        'const tick = counter.tick; tick() يفقد الكائن في الوضع الصارم فيصير this غير المعرّف.\n\nالدالة السهمية لا تملك this خاصًا؛ ترث المحيط. حقل tick = () => { this.left -= 1 } يثبت الكائن.\n\nbind ينشئ نسخة مربوطة. في Angular تكتب المنطق كطرق صف ثم تربط في القالب فلا تُنتزع this.',
        {
          compare: compare(
            `button.addEventListener('click', counter.tick);`,
            `button.addEventListener('click', () => counter.tick());`,
            'السهم يحفظ الكائن. انتزاع الطريقة يفقده.',
          ),
        },
      ),
      sec(
        's3',
        'متى الصنف ومتى الدالة',
        'دالة نقية لحساب نسبة إكمال. صنف أو خدمة لحالة تتغير مع الزمن.\n\nلا تحول كل ملف إلى OOP ثقيل. كتالوج الدروس مصفوفة وكائنات عادية أسهل.\n\nTypeScript لاحقًا يضيف أنواعًا على هذه الأصناف. الفكرة نفسها.',
        {
          callout: {
            type: 'tip',
            text: 'وضع strict في JS يُفعَّل تلقائيًا في الوحدات. لا تعتمد على this == window.',
          },
        },
      ),
    ],
    {
      terms: [
        term('this', 'سياق الاستدعاء', 'مرجع يتحدد عند نداء الدالة لا عند كتابتها غالبًا.'),
        term('class', 'صنف', 'قالب لإنشاء كائنات بسلوك مشترك.'),
      ],
      prerequisites: ['l3-modules'],
      quizId: 'q-l3-classjs',
    },
  ),
];
