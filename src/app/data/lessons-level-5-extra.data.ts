import { Lesson } from '../core/models/content.models';
import { code, makeLesson, sec, term } from './lesson-factory';

export const lessonsLevel5Extra: Lesson[] = [
  makeLesson(
    'l5-cli',
    'm5-start',
    'level-5',
    5,
    'Angular CLI وبنية المشروع',
    'الأوامر الرسمية تنشئ ملفات متسقة. اقرأ المجلدات قبل إضافة عشوائية.',
    16,
    [
      'تنشئ مشروعًا بـ ng new',
      'تشغّل ng serve',
      'تميّز app.config وroutes وstyles',
    ],
    [
      sec(
        's1',
        'الأوامر',
        'ng new ينشئ الهيكل. ng serve خادم تطوير. ng build حزمة إنتاج. ng generate يولّد مكوّنًا إن أحببت الاتساق.',
      ),
      sec(
        's2',
        'ما الذي تقرأه أولًا؟',
        'src/app/app.routes.ts المسارات. app.config.ts المزودات. angular.json البناء. public الأصول. لا تعدّل node_modules.',
        {
          callout: {
            type: 'note',
            text: 'هذه المنصة Angular 19 متوافق مع Node الحالي. وثّق الإصدار في README أي مشروع تسلّمه.',
          },
        },
      ),
    ],
    {
      terms: [
        term('Angular CLI', 'واجهة أوامر Angular', 'أداة إنشاء وتشغيل وبناء المشاريع.'),
        term('Workspace', 'مساحة العمل', 'المجلد الذي يديره angular.json.'),
      ],
      quizId: 'q-l5-cli',
    },
  ),
  makeLesson(
    'l5-binding',
    'm5-start',
    'level-5',
    6,
    'أنواع الربط في القالب',
    'النص والخاصية والحدث والاتجاهان أدوات مختلفة. استخدم أضيقها يكفي.',
    16,
    [
      'تفرّق بين {{ }} و[prop] و(event)',
      'تعرف متى ngModel مناسب',
      'تستخدم متغير قالب بحذر',
    ],
    [
      sec(
        's1',
        'الخريطة',
        'Interpolation للنص. [disabled]="saving" للخاصية. (click)="save()" للحدث. [(ngModel)] للنماذج البسيطة مع FormsModule.',
        {
          code: code(
            'html',
            `<button [disabled]="saving" (click)="save()">{{ label }}</button>`,
          ),
        },
      ),
      sec(
        's2',
        'التحكم في التدفق',
        '@if و@for في Angular الحديث أوضح من *ngIf في المشاريع الجديدة. هذه المنصة تستخدم الصيغة الجديدة.',
      ),
    ],
    {
      terms: [
        term('Property binding', 'ربط خاصية', 'تمرير قيمة من المكوّن إلى خاصية عنصر.'),
        term('Event binding', 'ربط حدث', 'الاستماع لحدث DOM واستدعاء دالة.'),
      ],
      exerciseId: 'ex-l5-bind',
      quizId: 'q-l5-bind',
      prerequisites: ['l5-components'],
    },
  ),
  makeLesson(
    'l5-signals',
    'm5-data',
    'level-5',
    7,
    'Signals: حالة تُحدّث العرض بدقة',
    'signal يخزن قيمة. computed يشتق. effect للآثار الجانبية بحذر.',
    18,
    [
      'تنشئ signal وتحدّثه',
      'تشتق قيمة بـ computed',
      'لا تضع طلب شبكة داخل computed',
    ],
    [
      sec(
        's1',
        'لماذا؟',
        'تغير قيمة واضحة يعيد حساب ما يعتمد عليها. ProgressService في المنصة يستخدم signal للتقدم.',
        {
          code: code(
            'typescript',
            `const count = signal(0);
const doubled = computed(() => count() * 2);
count.set(2);`,
          ),
        },
      ),
      sec(
        's2',
        'effect',
        'مناسب للكتابة إلى localStorage أو مزامنة عنوان الوثيقة. تجنّب الحلقات: لا تكتب في الإشارة التي يقرأها نفس الأثر دون untracked.',
      ),
    ],
    {
      terms: [
        term('Signal', 'إشارة', 'وعاء حالة يتتبع من يقرأ القيمة.'),
        term('computed', 'مشتق', 'قيمة تُحسب من إشارات أخرى.'),
      ],
      quizId: 'q-l5-signals',
    },
  ),
  makeLesson(
    'l5-lifecycle',
    'm5-data',
    'level-5',
    8,
    'دورة حياة المكوّن والمدخلات',
    'ngOnInit بعد تهيئة المدخلات. ngOnDestroy للتنظيف. المدخلات الحديثة input() خيار في الإصدارات الجديدة.',
    14,
    [
      'تعرف متى تستخدم ngOnInit',
      'تلغي اشتراكًا أو مؤقتًا عند التدمير',
      'تمرر بيانات للأبناء عبر Input',
    ],
    [
      sec(
        's1',
        'التوقيت',
        'المنشئ للحقن. ngOnInit لقراءة مسار أو بدء تحميل. لا تعمل DOM ثقيل في المنشئ.',
      ),
      sec(
        's2',
        'Input وOutput',
        'الأب يمرر درسًا. الابن يُصدر حدث إكمال. أبقِ العقد واضحًا بدل البحث في خدمات لكل تفصيلة عرض.',
      ),
    ],
    {
      terms: [
        term('Lifecycle', 'دورة حياة', 'مراحل إنشاء وتحديث وتدمير المكوّن.'),
        term('Input', 'مدخل', 'قيمة تمر من الأب إلى الابن.'),
      ],
      quizId: 'q-l5-life',
    },
  ),
  makeLesson(
    'l5-forms',
    'm5-forms',
    'level-5',
    9,
    'نماذج القالب والنماذج التفاعلية',
    'Template-driven أسرع للأشكال الصغيرة. Reactive أوضح للتحقق المركب والاختبار.',
    18,
    [
      'تختار أسلوب النموذج حسب التعقيد',
      'تعرض رسالة خطأ مرتبطة بالحقل',
      'تعطّل الإرسال أثناء الحفظ',
    ],
    [
      sec(
        's1',
        'القالب',
        'ngModel مع name مناسب لملاحظة درس. التحقق البسيط required.',
      ),
      sec(
        's2',
        'التفاعلي',
        'FormGroup وFormControl في الفئة. validators.required. القيمة تُقرأ من الكود بسهولة في الاختبار.',
        {
          code: code(
            'typescript',
            `import { FormControl, Validators } from '@angular/forms';
const title = new FormControl('', { validators: [Validators.required] });`,
          ),
        },
      ),
    ],
    {
      terms: [
        term('Reactive Forms', 'نماذج تفاعلية', 'النموذج يُعرَّف في الكود ويُربط بالقالب.'),
        term('Validator', 'المحقق', 'دالة تقرر صلاحية القيمة.'),
      ],
      exerciseId: 'ex-l5-form',
      quizId: 'q-l5-forms',
    },
  ),
  makeLesson(
    'l5-http',
    'm5-forms',
    'level-5',
    10,
    'HttpClient وحالات التحميل والخطأ والفراغ',
    'ثلاث حالات عرض إلزامية لأي قائمة بعيدة: تحميل، خطأ، فارغ.',
    18,
    [
      'تحقن HttpClient',
      'تكتب نوع الاستجابة',
      'تفصل رسالة الشبكة عن قائمة فارغة ناجحة',
    ],
    [
      sec(
        's1',
        'الحقن',
        'provideHttpClient() في الإعداد. الخدمة تستدعي http.get<Lesson[]>(url). في النسخة الأولى من المنصة البيانات محلية؛ نفس عقد الخدمة يسهّل الاستبدال لاحقًا.',
      ),
      sec(
        's2',
        'العرض',
        'loading=true عند البدء. عند الخطأ احفظ الرسالة. عند النجاح إن الطول صفر اعرض empty لا شاشة بيضاء.',
        {
          callout: {
            type: 'tip',
            text: 'لا تُظهر بيانات قديمة بعد فشل التحديث دون تنبيه.',
          },
        },
      ),
    ],
    {
      terms: [
        term('HttpClient', 'عميل HTTP', 'خدمة Angular لإرسال الطلبات.'),
        term('Empty state', 'حالة فارغة', 'نجاح بلا عناصر لعرضها.'),
      ],
      quizId: 'q-l5-http',
    },
  ),
  makeLesson(
    'l5-pipes',
    'm5-forms',
    'level-5',
    11,
    'الأنابيب والتوجيهات وتنظيم المجلدات',
    'Pipe يحول عرضًا. Directive يضيف سلوكًا لعنصر. لا تضع كل شيء في مكوّن واحد عملاق.',
    14,
    [
      'تستخدم date أو percent بحذر للّغة',
      'تعرف أن pipe نقي أفضل',
      'تقسم feature عن shared',
    ],
    [
      sec(
        's1',
        'عرض فقط',
        'الأنبوب لا يغيّر المصدر إن كان نقيًا. للتنسيق العربي تأكد من locale عند الحاجة.',
      ),
      sec(
        's2',
        'التنظيم',
        'features/lessons لصفحة الدرس. shared/code-block لمكوّن معاد. core للخدمات العامة. هذا هيكل المنصة.',
      ),
    ],
    {
      terms: [
        term('Pipe', 'أنبوب', 'محوّل قيمة للعرض في القالب.'),
        term('Directive', 'توجيه', 'سلوك يُطبَّق على عنصر مضيف.'),
      ],
      quizId: 'q-l5-pipes',
    },
  ),
];
