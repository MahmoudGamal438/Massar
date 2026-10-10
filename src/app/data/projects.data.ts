import { Project } from '../core/models/content.models';
import { extraProjects } from './curriculum-extra.data';

export const projects: Project[] = [
  {
    id: 'p-portfolio',
    levelId: 'level-2',
    title: 'صفحة شخصية',
    difficulty: 'easy',
    problem: 'تحتاج واجهة تعرض من أنت ومهاراتك وروابط أعمالك على الموبايل وسطح المكتب.',
    skills: ['Semantic HTML', 'CSS', 'Responsive'],
    stories: [
      'كزائر أريد قراءة نبذة واضحة خلال ثوان.',
      'كزائر أريد فتح روابط المشاريع في تبويب مفهوم.',
    ],
    requirements: [
      'header وmain وfooter',
      'قائمة مشاريع من ثلاث بطاقات على الأقل',
      'نموذج تواصل له labels',
      'تصميم متجاوب حتى عرض 360px',
    ],
    acceptance: [
      'لا تمرير أفقي غير مقصود على الموبايل',
      'العناوين هرمية',
      'تباين لوني كافٍ للنص الأساسي',
    ],
    extras: ['وضع داكن بسيط', 'صفحة مشروع تفصيلية'],
  },
  {
    id: 'p-todo',
    levelId: 'level-5',
    title: 'إدارة مهام Angular',
    difficulty: 'medium',
    problem: 'متابعة مهام التعلم اليومية مع إكمال وحذف دون فقدان البيانات بعد التحديث في المتصفح.',
    skills: ['Components', 'Signals', 'localStorage', 'Forms'],
    stories: [
      'كمستخدم أضيف مهمة من حقل واضح.',
      'كمستخدم أعلّم المهمة مكتملة وأرشح القائمة.',
    ],
    requirements: [
      'قائمة، إضافة، تبديل اكتمال، حذف',
      'حفظ محلي',
      'حالات فارغة',
      'تحقق من النص الفارغ',
    ],
    acceptance: [
      'المهام تبقى بعد إعادة التحميل',
      'لا تُضاف مهمة بلا عنوان',
      'التنقل بلوحة المفاتيح يعمل على الأزرار',
    ],
    extras: ['تاريخ استحقاق', 'تصنيفات'],
  },
  {
    id: 'p-dashboard',
    levelId: 'level-5',
    title: 'لوحة تقدم المتعلم',
    difficulty: 'medium',
    problem: 'عرض نسبة إكمال المستويات وآخر درس وحالة الاختبارات في شاشة واحدة.',
    skills: ['Routing', 'Services', 'Charts optional'],
    stories: [
      'كمستخدم أستكمل من آخر درس بضغطة.',
      'كمستخدم أرى أي مستوى مقفول ولماذا.',
    ],
    requirements: [
      'شريط تقدم كلي',
      'بطاقات مستويات',
      'رابط استكمال',
      'قائمة نشاط مختصرة',
    ],
    acceptance: [
      'الأرقام تطابق مصدر التقدم نفسه المستخدم في المسار',
      'المستوى المقفول يوضح الشرط',
    ],
    extras: ['أهداف أسبوعية'],
  },
  {
    id: 'p-crud',
    levelId: 'level-6',
    title: 'إدارة بيانات مع API',
    difficulty: 'hard',
    problem: 'قائمة موارد تُجلب من API تجريبية مع إنشاء وتعديل وحذف ومعالجة أخطاء الشبكة.',
    skills: ['HttpClient', 'Reactive Forms', 'Error states'],
    stories: [
      'كمحرر أضيف موردًا وأرى التحديث في القائمة.',
      'كمحرر أفهم سبب فشل الحفظ.',
    ],
    requirements: [
      'قائمة وتفاصيل ونموذج',
      'Loading وError وEmpty',
      'تحقق من الحقول',
    ],
    acceptance: [
      'لا تُعرض بيانات قديمة بعد فشل التحديث دون رسالة',
      'تعطيل زر الحفظ أثناء الإرسال',
    ],
    extras: ['ترقيم صفحات', 'بحث'],
  },
  {
    id: 'p-capstone',
    levelId: 'level-10',
    title: 'المشروع النهائي للعرض',
    difficulty: 'hard',
    problem: 'منتج صغير مكتمل: مصادقة مبسطة أو محاكاة صلاحيات، مسار محمي، README، ونشر.',
    skills: ['Auth flow', 'Guards', 'Deployment', 'Documentation'],
    stories: [
      'كزائر أرى الصفحات العامة فقط.',
      'كمستخدم مسجّل أصل للوحة الخاصة.',
    ],
    requirements: [
      'توثيق تشغيل واضح',
      'مسار محمي',
      'حالات خطأ',
      'معايير وصول أساسية',
    ],
    acceptance: [
      'README يشرح القرار التقني والتنازلات',
      'يمكن لشخص آخر تشغيل المشروع محليًا من الخطوات',
    ],
    extras: ['اختبارات وحدة للخدمة الأساسية'],
  },
  ...extraProjects,
];
