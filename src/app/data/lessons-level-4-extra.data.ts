import { Lesson } from '../core/models/content.models';
import { code, makeLesson, sec, term } from './lesson-factory';

export const lessonsLevel4Extra: Lesson[] = [
  makeLesson(
    'l4-annotations',
    'm4-ts',
    'level-4',
    2,
    'التوضيحات والاستنتاج',
    'TypeScript يستنتج كثيرًا. وضّح النوع عند الحدود: مدخلات الدوال واستجابات API.',
    14,
    [
      'تكتب نوع معامل',
      'تترك الاستنتاج عندما يكون واضحًا',
      'تفعّل التفكير بـ strict كعادة',
    ],
    [
      sec(
        's1',
        'متى تكتب النوع؟',
        'const count = 3 يستنتج number. function label(lesson: LessonSummary) يحتاج النوع لأن المدخل يأتي من الخارج.',
        {
          code: code(
            'typescript',
            `function minutesLabel(minutes: number): string {
  return minutes + ' د';
}`,
          ),
        },
      ),
      sec(
        's2',
        'strict',
        'الوضع الصارم يمنع null صامت وany متسلل. لا تعطّله لتسكيت خطأ؛ أصلح النوع.',
      ),
    ],
    {
      terms: [
        term('Type inference', 'استنتاج النوع', 'المترجم يخمن النوع من القيمة.'),
        term('Strict mode', 'الوضع الصارم', 'مجموعة فحوصات أشد في TypeScript.'),
      ],
      quizId: 'q-l4-ann',
    },
  ),
  makeLesson(
    'l4-unions',
    'm4-ts',
    'level-4',
    3,
    'الاتحاد والتقاطع والأنواع الحرفية',
    'difficulty: "easy" | "medium" | "hard" يمنع قيمًا عشوائية. narrowing يضيّق الاتحاد داخل الشرط.',
    16,
    [
      'تعرّف اتحادًا حرفيًا',
      'تستخدم in أو typeof للتضييق',
      'تعرف التقاطع للمزج بحذر',
    ],
    [
      sec(
        's1',
        'حرفي',
        'النوع الحرفي قيمة محددة كنص. الاتحاد بينها يوثّق الحالات الممكنة كما في Difficulty في هذه المنصة.',
        {
          code: code(
            'typescript',
            `type Difficulty = 'easy' | 'medium' | 'hard';
function label(d: Difficulty): string {
  if (d === 'hard') {
    return 'صعب';
  }
  return 'مناسب للبداية';
}`,
          ),
        },
      ),
      sec(
        's2',
        'تقاطع',
        'A & B يعني الكائن يحقق الاثنين. مفيد للامتداد. لا تبنِ تقاطعات مستحيلة.',
      ),
    ],
    {
      terms: [
        term('Union', 'اتحاد', 'قيمة يمكن أن تكون أحد عدة أنواع.'),
        term('Narrowing', 'تضييق', 'إثبات أن القيمة من فرع معيّن من الاتحاد.'),
      ],
      exerciseId: 'ex-l4-union',
      quizId: 'q-l4-union',
    },
  ),
  makeLesson(
    'l4-generics',
    'm4-ts',
    'level-4',
    4,
    'Generics: نفس الشكل بأنواع مختلفة',
    'دالة أو واجهة تعمل على نوع يحدده المستدعي. شائعة في HttpClient وArrays.',
    16,
    [
      'تكتب دالة generic بسيطة',
      'تربط قيدًا مبدئيًا إن لزم',
      'تقرأ ApiResponse<T> كعقد',
    ],
    [
      sec(
        's1',
        'مثال',
        'function first<T>(items: T[]): T | undefined يحافظ على نوع العناصر بدل any.',
        {
          code: code(
            'typescript',
            `function first<T>(items: T[]): T | undefined {
  return items[0];
}
const title = first(['مسار', 'درس']);`,
          ),
        },
      ),
      sec(
        's2',
        'في Angular',
        'http.get<Lesson[]>("/api/lessons") يخبرك أن الناتج المفترض مصفوفة دروس. يبقى التحقق وقت التشغيل مسؤوليتك إن الخادم كذب.',
      ),
    ],
    {
      terms: [
        term('Generic', 'نوع عام', 'معلمة نوع تُملأ عند الاستخدام.'),
        term('Utility type', 'نوع مساعد', 'مثل Partial وPick يشتق أنواعًا من أخرى.'),
      ],
      quizId: 'q-l4-gen',
    },
  ),
  makeLesson(
    'l4-utilities',
    'm4-adv',
    'level-4',
    5,
    'Utility Types والتعامل مع API',
    'Partial للنماذج غير المكتملة. Pick لاختيار حقول العرض. Record لخرائط المعرّفات.',
    14,
    [
      'تستخدم Partial في نموذج تعديل',
      'تستخدم Record للمفاتيح',
      'تصمم نوع استجابة API بسيط',
    ],
    [
      sec(
        's1',
        'الاشتقاق',
        'type LessonPatch = Partial<Lesson> يجعل كل الحقول اختيارية للتحديث الجزئي. Record<string, QuizAttempt> هو شكل quizResults في التقدم.',
      ),
      sec(
        's2',
        'حدود',
        'Omit وPick يقللان التكرار لكن الإفراط يُصعّب القراءة. سمّ النوع الناتج.',
      ),
    ],
    {
      terms: [
        term('Partial', 'جزئي', 'يجعل خصائص النوع اختيارية.'),
        term('Record', 'سجل', 'كائن مفاتيحه من نوع وقيمه من نوع.'),
      ],
      quizId: 'q-l4-util',
    },
  ),
  makeLesson(
    'l4-classes',
    'm4-adv',
    'level-4',
    6,
    'الكلاسات والمعدّلات في السياق الحديث',
    'Angular يستخدم فئات للمكوّنات والخدمات. افهم public وprivate دون بناء أهرام وراثة.',
    14,
    [
      'تقرأ فئة مكوّن كحاوية حالة',
      'تستخدم private للحقول الداخلية',
      'لا تفرض OOP ثقيلًا حيث يكفي كائن ودوال',
    ],
    [
      sec(
        's1',
        'المكوّن فئة',
        'الحقول خصائص تُعرض في القالب. الدوال أحداث. هذا يكفي لمعظم الشاشات.',
      ),
      sec(
        's2',
        'الخدمات',
        'providedIn root وinject أوضح من new Service() يدويًا. تجنّب الحالة المشتركة القابلة للتلف بلا قواعد.',
      ),
    ],
    {
      terms: [
        term('Class', 'فئة', 'قالب لإنشاء كائنات لها حالة وسلوك.'),
        term('Access modifier', 'معدّل وصول', 'public أو private أو protected في TypeScript.'),
      ],
      quizId: 'q-l4-class',
    },
  ),
];
