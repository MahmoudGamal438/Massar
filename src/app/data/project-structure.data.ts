export interface StructureNode {
  id: string;
  name: string;
  kind: 'dir' | 'file';
  why: string;
  details: string;
  typical?: string;
  language?: string;
  exampleExplain?: string;
  usage?: string[];
  children?: StructureNode[];
}

export const projectStructureIntro = {
  title: 'هيكل المشروع',
  kicker: 'من الصفر حتى هيكل فريق حقيقي',
  lead:
    'هذا الهيكل هو ما تستخدمه فرق Angular الاحترافية في مشاريع standalone حديثة. ليس شجرة CLI عارية، وليس نسخة من هذه المنصة التعليمية. اقرأه ملفًا بملف حتى تفهم أين تضع الكود ولماذا.',
  principles: [
    'المجلد يعبر عن مسؤولية لا عن تقنية: core للبنية، features للميزات، shared لما يُعاد استخدامه.',
    'الميزة تملك صفحتها وخدماتها وقوالبها. لا تضع منطق المنتجات داخل مجلد المستخدم.',
    'الملفات الجذرية (package.json وangular.json وtsconfig) تدير البناء لا الواجهة.',
    'لا تضع أسرارًا في المستودع. environment يصف الإعدادات العامة فقط.',
    'الاختبار يعيش بجانب الشيفرة أو تحت مسار واضح. الاسم يوضح ماذا يُختبر.',
  ],
};

export const structureLifecycle = [
  {
    title: '1. المتصفح يطلب index.html',
    text: 'الخادم يعيد الغلاف: lang وdir وapp-root وملفات JS/CSS المشار إليها. لا منطق Angular بعد.',
  },
  {
    title: '2. main.ts يقلع التطبيق',
    text: 'bootstrapApplication يركّب AppComponent داخل app-root باستخدام مزودي app.config.ts (توجيه، HTTP، Zone).',
  },
  {
    title: '3. الموجّه يطابق العنوان',
    text: 'app.routes.ts يختار الصفحة. المسارات الكسولة تحمّل chunk عند أول زيارة. الحارس قد يمنع الدخول.',
  },
  {
    title: '4. الشل يرسم الإطار',
    text: 'الهيدر والفوتر ثابتان. router-outlet يعرض ابن المسار: الرئيسية أو الكتالوج أو الدرس.',
  },
  {
    title: '5. الصفحة تطلب بياناتها',
    text: 'الخدمة في features أو core تستدعي HttpClient. الـ interceptor يضيف الرأس ويعالج الخطأ مرة واحدة.',
  },
  {
    title: '6. العرض يتحدث',
    text: 'الإشارات أو الملاحظات تدفع التغيير إلى القالب. حالات loading وempty وerror جزء من الصفحة لا من الشل.',
  },
];

export const structureCli = [
  { cmd: 'ng new shop-app --defaults', meaning: 'ينشئ الشجرة الافتراضية: src وangular.json وpackage.json.' },
  { cmd: 'ng serve --host 0.0.0.0 --port 4200', meaning: 'خادم تطوير مع إعادة بناء عند الحفظ.' },
  { cmd: 'ng generate component features/cart/cart-page --standalone', meaning: 'يضيف مكوّن صفحة داخل الميزة دون وحدة NgModule.' },
  { cmd: 'ng generate service core/services/api', meaning: 'خدمة جذر. انقلها يدويًا إن كانت تخص ميزة واحدة.' },
  { cmd: 'ng generate interceptor core/interceptors/auth', meaning: 'دالة اعتراض تُسجَّل في app.config.ts.' },
  { cmd: 'ng build --configuration=production', meaning: 'يخرج dist مع hashing وتحسين. هذا ما يُنشر.' },
  { cmd: 'ng test', meaning: 'Karma + Jasmine على ملفات spec. يحتاج متصفحًا في البيئة.' },
];

export const structureMistakes = [
  {
    bad: 'كل الصفحات والخدمات في مجلد app/ مسطّح بلا core/features/shared',
    good: 'ثلاثة مستويات واضحة حتى يجد الزميل الملف في ثوانٍ',
  },
  {
    bad: 'استيراد صفحة الكتالوج داخل صفحة السلة مباشرة لمشاركة دالة',
    good: 'انقل الدالة إلى خدمة الكتالوج أو نموذج مشترك',
  },
  {
    bad: 'مفتاح API في environment.ts داخل مستودع عام',
    good: 'الواجهة لا تخفي أسرارًا؛ المفتاح على الخادم أو عند البناء من متغير بيئة غير مرفوع',
  },
  {
    bad: 'تعديل ملفات داخل dist أو node_modules',
    good: 'عدّل المصدر وأعد البناء؛ الحزم تُرقَّع عبر أدوات رسمية',
  },
  {
    bad: 'SharedModule يستورد نصف التطبيق',
    good: 'مكوّن standalone صغير يُدرج في imports للصفحة التي تحتاجه',
  },
];

export const projectTree: StructureNode[] = [
  {
    id: 'root-pkg',
    name: 'package.json',
    kind: 'file',
    why: 'عقد المشروع مع npm: الاسم، السكربتات، والاعتماديات.',
    details:
      'بدون هذا الملف لا يعرف npm كيف يثبت الحزم ولا كيف يشغّل start وbuild وtest. dependencies ما يحتاجه التطبيق في الإنتاج (Angular وrxjs وtslib وzone.js). devDependencies أدوات البناء والاختبار فقط (CLI وKarma وTypeScript). السكربتات الشائعة: start يشغّل خادم التطوير، build يُنتج ملفات dist، test يشغّل Karma. لا ترفع node_modules؛ يُعاد بناؤه من هذا الملف وlockfile.',
    language: 'json',
    typical: `{
  "name": "shop-app",
  "private": true,
  "scripts": {
    "start": "ng serve --host 0.0.0.0 --port 4200",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/core": "^19.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular/cli": "^19.0.0",
    "typescript": "~5.6.0"
  }
}`,
    exampleExplain:
      'name هو اسم الحزمة محليًا. private يمنع النشر العرضي إلى npm. scripts أوامر مختصرة تستدعي ng. dependencies حزم المتصفح/التشغيل. devDependencies أدوات البناء فقط ولا تدخل حزمة الإنتاج بنفس المعنى.',
    usage: [
      'بعد استنساخ المشروع شغّل npm install ليُقرأ هذا الملف ويُملأ node_modules.',
      'npm start يشغّل سكربت start (خادم التطوير). npm run build يبني للإنتاج.',
      'أضف حزمة إنتاج بـ npm install rxjs إن لزم، وحزمة تطوير بـ npm install -D prettier.',
      'لا تحذف dependencies التي يستوردها الكود؛ البناء سيفشل عند أول import.',
    ],
  },
  {
    id: 'root-lock',
    name: 'package-lock.json',
    kind: 'file',
    why: 'يثبّت أرقام الإصدارات الفعلية حتى يبني الزميل والجهاز الآخر نفس الشجرة.',
    details:
      'npm install يقرأ القفل إن وُجد فيعيد نفس الإصدارات. احذفه فقط إذا انكسر عمدًا وبعد اتفاق الفريق. yarn.lock أو pnpm-lock.yaml بدائل حسب مدير الحزم. ضعه في Git دائمًا في التطبيقات.',
    language: 'json',
    typical: `{
  "name": "shop-app",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": { "name": "shop-app" },
    "node_modules/@angular/core": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/@angular/core/-/core-19.2.0.tgz"
    }
  }
}`,
    exampleExplain:
      'lockfileVersion يصف صيغة npm. packages يثبت كل حزمة برقم وإشارة التحميل. أنت لا تكتب هذا الملف يدويًا؛ npm يولّده عند التثبيت.',
    usage: [
      'ارفع الملف مع Git حتى يبني الزميل نفس الشجرة.',
      'بعد تغيير package.json نفّذ npm install ليُحدَّث القفل.',
      'لا تعدّل الأرقام داخله يدويًا؛ استخدم npm update أو تثبيت حزمة محددة.',
      'إن انكسر التثبيت باتفاق الفريق: احذف القفل وأعد npm install ثم راجع الفروقات.',
    ],
  },
  {
    id: 'root-angular',
    name: 'angular.json',
    kind: 'file',
    why: 'إعداد مساحة عمل Angular: المشروع، المدخل، الأنماط، الميزانيات، وخادم التطوير.',
    details:
      'projects يحدد اسم التطبيق وsourceRoot (غالبًا src) وprefix للمكوّنات (app). architect.build يحدد index وbrowser (main.ts) وstyles وassets. configurations.production يفعّل hashing والميزانيات. serve يضبط المنفذ وallowedHosts إن لزم. تغيير ملف هنا يؤثر على البناء كله؛ لا تضع منطق أعمال فيه.',
    language: 'json',
    typical: `{
  "projects": {
    "shop-app": {
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": {
          "options": {
            "browser": "src/main.ts",
            "index": "src/index.html",
            "styles": ["src/styles.scss"]
          }
        },
        "serve": {
          "options": {
            "port": 4200,
            "host": "0.0.0.0"
          }
        }
      }
    }
  }
}`,
    exampleExplain:
      'browser مدخل JavaScript. index صفحة الغلاف. styles الملف العام. serve يضبط أين يستمع خادم التطوير. prefix يصبح بادئة المكوّنات المولَّدة (app-cart).',
    usage: [
      'ng serve يقرأ architect.serve من هنا.',
      'أضف ملف أنماط عام إلى styles إن أردته في كل الصفحات.',
      'اضبط allowedHosts إن دخلت عبر نطاق معاينة خارج localhost.',
      'لا تضع عنوان API أو مفاتيح هنا؛ هذا إعداد بناء لا منطق منتج.',
    ],
  },
  {
    id: 'root-tsconfig',
    name: 'tsconfig.json',
    kind: 'file',
    why: 'إعداد TypeScript الأساسي: strict والمسارات والتجميع.',
    details:
      'الملف الجذر يورَّث إلى tsconfig.app.json وtsconfig.spec.json. فعّل strict وnoImplicitOverride وnoFallthroughCasesInSwitch في المشاريع الجادة. compilerOptions.paths تسمح باستيراد قصير مثل @core/* إن اتفق الفريق. لا تعطل strict لإسكات خطأ؛ أصلح النوع.',
    language: 'json',
    typical: `{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2022",
    "module": "ES2022",
    "skipLibCheck": true
  },
  "angularCompilerOptions": {
    "strictTemplates": true
  }
}`,
    exampleExplain:
      'strict يفعّل فحوصات النوع الصارمة. noImplicitOverride يمنع override بلا كلمة override. strictTemplates يفحص قوالب HTML كأنها TypeScript. skipLibCheck يتجنّب أخطاء أنواع داخل مكتبات الآخرين.',
    usage: [
      'اترك strict مفعّلًا من اليوم الأول؛ تعطيله لاحقًا أصعب.',
      'إن ظهر خطأ نوع، أصلح الواجهة أو القيمة لا تُسكِت المترجم بـ any.',
      'أضف paths فقط بعد اتفاق الفريق على أسماء الاستيراد.',
      'الملفات الأخرى (app وspec) تمتد من هذا الملف ولا تكرر كل الخيارات.',
    ],
  },
  {
    id: 'root-tsapp',
    name: 'tsconfig.app.json',
    kind: 'file',
    why: 'ملفات التطبيق التي تدخل البناء، دون ملفات الاختبار.',
    details:
      'يمتد من tsconfig.json ويحدد files مثل src/main.ts وinclude لـ src/**/*.d.ts. الاختبارات تُستبعد حتى لا تتضخم الحزمة. إن أضفت ملف تمهيد جديد غير main.ts يجب ذكره هنا أو في angular.json.',
    language: 'json',
    typical: `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}`,
    exampleExplain:
      'extends يرث القواعد الصارمة. files يحدد مدخل التطبيق. include يضيف ملفات التصريح. types فارغ حتى لا تدخل أنواع Jasmine إلى حزمة المتصفح.',
    usage: [
      'لا تضف *.spec.ts هنا؛ مكانها tsconfig.spec.json.',
      'إن أنشأت ملف إقلاع ثانيًا أضفه إلى files أو إلى angular.json.',
      'outDir مجلد ترجمة وسيط؛ لا تنشُره ولا تعدّله يدويًا.',
      'ng build يستخدم هذا الملف لا ملف الاختبار.',
    ],
  },
  {
    id: 'root-tsspec',
    name: 'tsconfig.spec.json',
    kind: 'file',
    why: 'إعداد ترجمة ملفات *.spec.ts لاختبارات الوحدة.',
    details:
      'يضيف أنواع Jasmine ويشمل **/*.spec.ts. البناء الإنتاجي لا يستخدمه. إن فشل الاختبار بسبب أنواع ناقصة، أصلح هنا لا في tsconfig.app.json.',
    language: 'json',
    typical: `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}`,
    exampleExplain:
      'types: jasmine يوفّر describe وit وexpect. include يسحب ملفات الاختبار فقط مع التصريحات. البناء الإنتاجي يتجاهل هذا الملف بالكامل.',
    usage: [
      'ضع ملف السلة.spec.ts بجانب السلة.service.ts ليُلتقط تلقائيًا.',
      'إن قال المترجم إن expect غير معرّفة، تأكد أن types يشمل jasmine هنا.',
      'لا تستورد هذا الإعداد في التطبيق؛ ng test وحده يقرؤه.',
      'أصلح أنواع الاختبار هنا إن تعارضت مع أنواع التطبيق.',
    ],
  },
  {
    id: 'root-eslint',
    name: '.editorconfig / eslint / prettier (اختياري)',
    kind: 'file',
    why: 'يوحّد المسافات والاقتباس والتنسيق عبر المحررين.',
    details:
      '.editorconfig يضبط charset والمسافات ونهاية السطر. ESLint يرفض أنماطًا خطرة. Prettier ينسّق بلا نقاش أسلوب. ليست شرط تشغيل Angular، لكنها شرط فرق محترفة حتى لا يختلف الكود من مطور لآخر.',
    language: 'ini',
    typical: `# .editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true`,
    exampleExplain:
      'root = true يمنع وراثة إعداد محرر من مجلد أعلى. indent_size = 2 يوافق أسلوب Angular الافتراضي. end_of_line = lf يوحّد النهايات بين ويندوز ولينكس حتى لا يظهر Git كل الملف متغيرًا.',
    usage: [
      'ضع الملف في جذر المستودع ليقرأه VS Code وWebStorm تلقائيًا.',
      'أضف ESLint بـ ng add @angular-eslint/schematics إن أراد الفريق قواعد TypeScript.',
      'شغّل التنسيق عند الحفظ من المحرر حتى لا يضيع الوقت في مسافات فارغة في المراجعة.',
      'لا تخلط مسافات وتبويب في نفس الملف؛ المحرر يتبع هذا الإعداد.',
    ],
  },
  {
    id: 'root-gitignore',
    name: '.gitignore',
    kind: 'file',
    why: 'يمنع رفع node_modules وdist و.angular والأسرار.',
    details:
      'القائمة الافتراضية من CLI كافية للبداية. أضف .env إن استخدمت مفاتيح محلية، ولا تضع المفتاح في Git أبدًا. /dist و/tmp وcoverage تُولَّد محليًا.',
    language: 'gitignore',
    typical: `/dist
/tmp
/out-tsc
/node_modules
/.angular/cache
/coverage
.env
*.log`,
    exampleExplain:
      'كل سطر مسار يتجاهله Git. / في البداية يعني من جذر المستودع. .env يخفي أسرارًا محلية. cache وcoverage مخرجات أدوات لا تُراجع في الطلبات.',
    usage: [
      'بعد ng new يكون الملف جاهزًا؛ راجع أنه يشمل node_modules وdist.',
      'أضف أسماء ملفات أسرارك (.env وsecrets.json) قبل أول commit يحتويها.',
      'git status يجب ألا يظهر node_modules. إن ظهر فأعد التحقق من القواعد.',
      'لا تتجاهل src أو package-lock.json؛ هذان مصدر المشروع.',
    ],
  },
  {
    id: 'root-readme',
    name: 'README.md',
    kind: 'file',
    why: 'باب المشروع للزميل والمراجع: ماذا يفعل، كيف يُشغَّل، وما خارج النطاق.',
    details:
      'اكتب المشكلة، أمر التثبيت والتشغيل، إصدار Node، وكيف تُبنى للإنتاج. اذكر ما لا يفعله المشروع (لا Backend، لا ضمان توظيف، لا Sandbox) حتى لا يُفهم خطأ. هذا الملف جزء من تقييمك في المقابلة.',
    language: 'markdown',
    typical: `# Shop App

واجهة متجر Angular 19. تحتاج Node 22.

## تشغيل محلي
npm install
npm start

## بناء
npm run build

خارج النطاق: لا خادم منتجات حقيقي، لا بوابة دفع.`,
    exampleExplain:
      'العنوان يصف المنتج لا التقنية فقط. أوامر التشغيل تُنسخ كما هي. فقرة خارج النطاق تمنع سوء الفهم في المراجعة أو المقابلة.',
    usage: [
      'حدّث README عندما يتغير أمر التشغيل أو إصدار Node.',
      'اكتب المتطلبات (Node 22) قبل الخطوات حتى لا يفشل الزميل عند ng.',
      'اربط صفحة هيكل المشروع أو الخريطة إن كان المستودع تعليميًا.',
      'لا تضع توكنات أو عناوين داخلية حساسة في الأمثلة.',
    ],
  },
  {
    id: 'public',
    name: 'public/',
    kind: 'dir',
    why: 'أصول تُنسخ كما هي إلى جذر الموقع: أيقونة، صور ثابتة، robots.txt.',
    details:
      'في Angular الحديث هذا المجلد يقابل الأصول العامة. favicon.ico يظهر في تبويب المتصفح. لا تضع هنا TypeScript. الملفات الكبيرة جدًا تؤخر التحميل؛ اضغط الصور.',
    language: 'text',
    typical: `public/
  favicon.ico
  robots.txt
  images/logo.svg`,
    exampleExplain:
      'المجلد يُنسخ كما هو إلى جذر الموقع بعد البناء. robots.txt يخاطب محركات البحث. الشعار هنا إن كان ثابتًا لا يمر عبر أنبوب البناء.',
    usage: [
      'ضع الصور الثابتة هنا ثم ارجع إليها من HTML بالمسار /images/logo.svg.',
      'لا تستورد ملفًا من public داخل TypeScript كوحدة؛ هذا ليس src.',
      'اضغط PNG/JPEG قبل الرفع؛ الملف يصل للمستخدم بحجمه الكامل.',
      'favicon يُذكر أيضًا من index.html حتى يظهر في التبويب.',
    ],
    children: [
      {
        id: 'public-favicon',
        name: 'favicon.ico',
        kind: 'file',
          why: 'أيقونة التبويب والإشارات المرجعية.',
          details: 'المتصفح يطلبها تلقائيًا. غيابها يظهر طلب 404 في Network دون كسر التطبيق.',
          language: 'html',
          typical: `<link rel="icon" type="image/x-icon" href="favicon.ico" />`,
          exampleExplain:
            'هذا السطر في index.html يخبر المتصفح أين الأيقونة. الملف نفسه ثنائي (ICO أو PNG) وليس نصًا. النوع image/x-icon يناسب الامتداد التقليدي.',
          usage: [
            'ضع الملف في public/favicon.ico أو في مجلد الأصول المذكور في angular.json.',
            'استبدل الأيقونة الافتراضية بشعار منتجك بمقاس واضح (32×32 على الأقل).',
            'بعد البناء افتح التبويب وتأكد أن الأيقونة الجديدة تظهر لا أيقونة Angular.',
            'غياب الملف لا يوقف التطبيق؛ أصلحه حتى لا يظهر 404 في أدوات الشبكة.',
          ],
        },
    ],
  },
  {
    id: 'src',
    name: 'src/',
    kind: 'dir',
    why: 'شيفرة التطبيق كلها تقريبًا: المدخل، الأنماط العامة، ومجلد app.',
    details:
      'كل ما يُترجم إلى JavaScript للمتصفح يبدأ من هنا ما عدا الإعدادات الجذرية. لا تخلط مخرجات dist داخل src.',
    language: 'text',
    typical: `src/
  index.html
  main.ts
  styles.scss
  app/
  environments/`,
    exampleExplain:
      'index الغلاف، main الإقلاع، styles الرموز العامة، app منطق الواجهة، environments قيم تختلف بين التطوير والإنتاج.',
    usage: [
      'اعمل داخل src فقط عندما تكتب ميزات؛ لا تعدّل dist.',
      'أضف صفحة جديدة تحت app/features لا بجانب main.ts.',
      'الأنماط الخاصة بمكوّن تبقى في المكوّن؛ العامة فقط في styles.scss.',
      'إن ضاع الملف من البناء تأكد أنه تحت src وأن tsconfig.app يشمله.',
    ],
    children: [
      {
        id: 'src-index',
        name: 'index.html',
        kind: 'file',
        why: 'صفحة HTML الوحيدة التي يحقن فيها Angular التطبيق.',
        details:
          'تضع lang وdir (ar وrtl في منتج عربي)، العنوان، الوصف، و<link> للأيقونة. <app-root></app-root> نقطة التركيب. <base href="/"> ضروري للتوجيه. لا تبنِ الواجهة كلها هنا؛ هذا غلاف فقط. meta viewport ضروري للموبايل.',
        language: 'html',
        typical: `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>متجر المسار</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,
        exampleExplain:
          'lang وdir يضبطان اللغة والاتجاه لكل الصفحة. base href يجعل روابط التوجيه نسبية من الجذر. app-root يُستبدل بمكوّن الجذر بعد إقلاع main.ts. viewport يمنع تصغير الموبايل بشكل خاطئ.',
        usage: [
          'غيّر title الافتراضي إلى اسم منتجك؛ يظهر في التبويب قبل أن يضبطه الموجّه.',
          'أبقِ app-root فارغًا؛ لا تضع هيدر HTML ثابت هنا إن كان الشل في Angular.',
          'لا تحذف base href وإلا تنكسر المسارات عند التحديث.',
          'أضف وصفًا meta إن كان SEO مهمًا؛ الصفحات الداخلية قد تستبدله لاحقًا.',
        ],
      },
      {
        id: 'src-main',
        name: 'main.ts',
        kind: 'file',
        why: 'نقطة إقلاع المتصفح: يستدعي bootstrapApplication.',
        details:
          'يستورد AppComponent وappConfig ثم bootstrapApplication(AppComponent, appConfig). أي خطأ هنا يمنع ظهور أي صفحة. لا تضع منطق أعمال هنا. polyfills تُحمَّل عبر angular.json (zone.js) قبل هذا الملف.',
        typical: `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));`,
        language: 'ts',
        exampleExplain:
          'bootstrapApplication يركّب AppComponent داخل app-root. appConfig يمرّر المزودين (توجيه، HTTP، Zone). catch يطبع فشل الإقلاع في الطرفية حتى لا تبقى الشاشة بيضاء صامتة.',
        usage: [
          'لا تضف منطق سلة أو منتجات هنا؛ الملف للإقلاع فقط.',
          'إن غيّرت اسم المكوّن الجذر عدّل الاستيراد والاستدعاء معًا.',
          'أخطاء الإقلاع تظهر في Console المتصفح أولًا؛ ابدأ من هنا إن لم يظهر شيء.',
          'polyfills مثل zone.js تُضبط من angular.json ولا تُستورد غالبًا في هذا الملف يدويًا في CLI الحديث.',
        ],
      },
      {
        id: 'src-styles',
        name: 'styles.scss',
        kind: 'file',
        why: 'رموز التصميم العامة: الألوان، الخط، الاتجاه، العناصر الأساسية.',
        details:
          'يُحمَّل مرة لكل التطبيق. ضع فيه :root ومتغيرات الثيم وreset خفيفًا وأنماط a وpre و.container. لا تضع تنسيق مكوّن صفحة هنا إلا إن كان مشتركًا حقًا. في الوضع الداكن غيّر المتغيرات على html[data-theme="dark"] لا بنسخ كل القواعد.',
        language: 'scss',
        typical: `:root {
  --navy: #01152a;
  --ink: #081728;
  --bg: #f4f7fb;
}
html { direction: rtl; }
html[data-theme='dark'] {
  --bg: #01152a;
  --ink: #f7f9fc;
}
.wide { width: 100%; padding-inline: 28px; }`,
        exampleExplain:
          'المتغيرات في :root تجعل تغيير اللون مكانًا واحدًا. data-theme على html يبدّل الوضع دون تكرار كل القواعد. .wide عرض المحتوى. direction على html يضبط RTL لكل التطبيق.',
        usage: [
          'أضف لونًا جديدًا كمتغير ثم استخدمه var(--steel) في المكوّنات.',
          'أنماط الزر العام هنا؛ أنماط بطاقة السلة تبقى في cart.page.ts.',
          'ThemeService يضبط attribute على html فتُطبَّق كتلة الوضع الداكن.',
          'لا تستورد styles.scss داخل مكوّن؛ angular.json يحمّله مرة للتطبيق.',
        ],
      },
      {
        id: 'src-app',
        name: 'app/',
        kind: 'dir',
        why: 'قلب التطبيق: المكوّن الجذر، الإعداد، المسارات، ثم الطبقات الثلاث.',
        details:
          'التقسيم الاحترافي: core ما يُنشأ مرة (خدمات جذر، حراس، تخطيط)، features شاشات المنتج، shared مكوّنات وأنابيب بلا قاعدة أعمال خاصة بميزة.',
        language: 'text',
        typical: `app/
  app.component.ts
  app.config.ts
  app.routes.ts
  core/
  features/
  shared/`,
        exampleExplain:
          'الملفات الثلاثة الأولى إقلاع التطبيق. core إطار يُحمَّل دائمًا. features شاشات تُحمَّل غالبًا كسولًا. shared قطع واجهة بلا قصة منتج.',
        usage: [
          'صفحة جديدة: أنشئ مجلدًا تحت features ثم اربطه في app.routes.ts.',
          'خدمة تُستخدم في ميزتين أو أكثر: core/services.',
          'زر أو أنبوب تاريخ: shared. لا تضع CatalogService في shared.',
          'تجنّب استيراد feature من أخرى؛ مرر عبر مسار أو خدمة core.',
        ],
        children: [
          {
            id: 'app-component',
            name: 'app.component.ts',
            kind: 'file',
            why: 'غلاف الجذر. في التطبيقات الحديثة غالبًا يحتوي router-outlet فقط.',
            details:
              'standalone component. القالب الشائع: <router-outlet />. التخطيط (هيدر/فوتر) يوضع في Shell داخل المسارات حتى لا يظهر في صفحات خاصة إن لزم. لا تحقن كل خدمات المشروع هنا.',
            language: 'ts',
            typical: `@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {}`,
            exampleExplain:
              'selector يطابق وسم app-root في index.html. RouterOutlet يرسم المسار الحالي. المكوّن فارغ من المنطق لأن الشل والصفحات أبناء المسارات.',
            usage: [
              'أبقِ القالب منفذ توجيه فقط إن كان لديك Shell في المسارات.',
              'إن وضعت الهيدر هنا سيظهر حتى في صفحات بلا إطار؛ فضّل الشل.',
              'لا تحقن CatalogService هنا لتمرير البيانات لكل الصفحات.',
              'ng generate يبني هذا الملف عند إنشاء المشروع؛ نادرًا ما تضيف إليه حقولًا.',
            ],
          },
          {
            id: 'app-config',
            name: 'app.config.ts',
            kind: 'file',
            why: 'مزودو التطبيق: التوجيه، HttpClient، اكتشاف التغيير.',
            details:
              'provideRouter(routes) وprovideHttpClient() وprovideZoneChangeDetection. هنا مكان withInMemoryScrolling وwithComponentInputBinding. لا تضع مفاتيح API كنص صريح. إن احتجت interceptor سجّله هنا عبر provideHttpClient(withInterceptors([...])).',
            typical: `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};`,
            language: 'ts',
            exampleExplain:
              'providers قائمة خدمات التطبيق كله. provideRouter يفعّل المسارات. provideHttpClient يفعّل الطلبات. withInterceptors يسجّل تعديل الرؤوس مرة واحدة. eventCoalescing يقلل اكتشاف التغيير المتكرر.',
            usage: [
              'أضف حارسًا أو استراتيجية عنوان من هنا عبر خيارات provideRouter.',
              'سجّل كل interceptor في withInterceptors حسب ترتيب التنفيذ.',
              'لا تضع عنوان API كنص داخل هذا الملف إن كان يتغير بين البيئات؛ استخدم environment.',
              'main.ts يمرّر هذا الكائن إلى bootstrapApplication؛ إن نسيت مزودًا ستفشل الحقن في الصفحات.',
            ],
          },
          {
            id: 'app-routes',
            name: 'app.routes.ts',
            kind: 'file',
            why: 'خريطة العناوين إلى الصفحات.',
            details:
              'كل مسار: path وcomponent أو loadComponent. loadComponent تحميل كسول يقلل الحزمة الأولى. children تحت Shell تعرض الهيدر حول الصفحات. مسار ** للـ 404 يجب أن يكون آخر الأبناء. title يظهر في تبويب المتصفح. لا تخلط معاملات متناقضة في نفس المستوى دون تمييز.',
            language: 'ts',
            typical: `export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
      { path: 'catalog', loadComponent: () => import('./features/catalog/list.page').then((m) => m.CatalogPage) },
      { path: 'catalog/:id', loadComponent: () => import('./features/catalog/detail.page').then((m) => m.DetailPage) },
      { path: '**', loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage) },
    ],
  },
];`,
            exampleExplain:
              'ShellComponent إطار الهيدر. المسار الفارغ هو الرئيسية. loadComponent يؤجّل تحميل الملف حتى الزيارة. :id معامل تفاصيل. ** يلتقط العناوين المجهولة ويجب أن يبقى آخرًا.',
            usage: [
              'أضف مسارًا جديدًا كابن للشل حتى يظهر الهيدر.',
              'استخدم loadComponent للصفحات الثقيلة حتى تصغر الحزمة الأولى.',
              'اربط الحارس في canActivate عندما تحتاج جلسة.',
              'بعد الإضافة اختبر العنوان في المتصفح وتأكد أن 404 ما زال آخر مسار.',
            ],
          },
          {
            id: 'core',
            name: 'core/',
            kind: 'dir',
            why: 'بنية تُحمَّل مرة: تخطيط، خدمات جذر، حراس، نماذج عامة.',
            details:
              'لا تستورد core من feature ثم تعيد استيراد feature من core (اعتماد دائري). الخدمات هنا providedIn: "root". إن كانت الخدمة تخص سلة التسوق فقط فانقلها إلى features/cart.',
            language: 'text',
            typical: `core/
  layout/shell.component.ts
  models/user.model.ts
  services/theme.service.ts
  guards/auth.guard.ts
  interceptors/auth.interceptor.ts`,
            exampleExplain:
              'layout الإطار البصري. models أشكال بلا منطق. services حالة عامة. guards قرار الدخول. interceptors تعديل HTTP. كلها تُنشأ مرة لكل التطبيق.',
            usage: [
              'خدمة تُستخدم في صفحة واحدة فقط لا توضع هنا.',
              'استورد من core إلى feature وليس العكس.',
              'الحارس يُذكر في المسار لا باستدعائه من القالب.',
              'إن ظهر اعتماد دائري انقل النوع المشترك إلى models وافصل الخدمة.',
            ],
            children: [
              {
                id: 'core-layout',
                name: 'layout/shell.component.ts',
                kind: 'file',
                why: 'الهيكل البصري الثابت: هيدر، تنقل، بحث، فوتر، ومنفذ الصفحات.',
                details:
                  'يحتوي router-outlet للأبناء. روابط routerLink وrouterLinkActive. الثيم يُبدَّل من زر هنا عبر ThemeService. في الشاشات الضيقة قائمة هامبرجر. لا تضع استدعاء API للمنتجات داخل الشل؛ الشل إطار فقط.',
                language: 'ts',
                typical: `@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterOutlet],
  template: \`
    <header>
      <a routerLink="/">المتجر</a>
      <a routerLink="/catalog">المنتجات</a>
      <button type="button" (click)="theme.toggle()">الثيم</button>
    </header>
    <main><router-outlet /></main>
  \`,
})
export class ShellComponent {
  readonly theme = inject(ThemeService);
}`,
                exampleExplain:
                  'الهيدر ثابت. routerLink ينتقل دون إعادة تحميل. router-outlet يرسم الصفحة الابن. ThemeService حقن جذر لتبديل data-theme. لا يوجد HttpClient للمنتجات هنا.',
                usage: [
                  'ضع روابط التنقل العامة هنا فقط.',
                  'أضف البحث في الهيدر إن كان عالميًا؛ نتائج الصفحة تبقى في الميزة.',
                  'في الشاشات الضيقة أخفِ الروابط خلف زر قائمة.',
                  'لا تجلب قائمة المنتجات في ngOnInit للشل؛ ذلك يبطئ كل صفحة.',
                ],
              },
              {
                id: 'core-models',
                name: 'models/',
                kind: 'dir',
                why: 'واجهات TypeScript للكيانات المشتركة: User وApiError وPageMeta.',
                details:
                  'ملفات types بلا منطق. تمنع any في الخدمات والصفحات. إن كان النوع يخص ميزة واحدة فقط فضعه بجانب الميزة لا هنا.',
                language: 'ts',
                typical: `export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiError {
  status: number;
  message: string;
}`,
                exampleExplain:
                  'User شكل المستخدم في الجلسة والاستجابة. ApiError شكل الخطأ الموحّد. لا دوال هنا حتى يبقى الملف عقد بيانات يُستورد من أي طبقة.',
                usage: [
                  'أضف حقلًا هنا عندما تتفق الواجهة والخادم على العقد.',
                  'نوع Product إن كان للكتالوج فقط ضعه في features/catalog/models.',
                  'استورد الواجهة في الخدمة والصفحة بدل تكرار الشكل.',
                  'لا تضع قيمًا افتراضية لأسرار أو توكنات في ملف النوع.',
                ],
              },
              {
                id: 'core-services',
                name: 'services/',
                kind: 'dir',
                why: 'خدمات عامة: إعداد الثيم، الجلسة المحلية، عميل API الموحّد.',
                details:
                  'ThemeService يقرأ localStorage ويضبط data-theme. AuthService يخزّن التوكن بأمان نسبي (لا في ملف مصدر). ApiService يلف HttpClient بمسار أساسي ومعالجة خطأ موحّدة. كل خدمة تختبر دالتها العامة في ملف .spec.ts.',
                language: 'ts',
                typical: `@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<'dark' | 'light'>('dark');

  toggle(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.dataset['theme'] = next;
    localStorage.setItem('theme', next);
  }
}`,
                exampleExplain:
                  'providedIn root يجعل الخدمة نسخة واحدة. signal حالة يقرأها الشل. toggle يبدّل القيمة ويكتب على html وlocalStorage حتى تبقى بعد التحديث.',
                usage: [
                  'inject(ThemeService) في الشل أو الإعدادات ثم استدعِ toggle من الزر.',
                  'عند الإقلاع اقرأ localStorage في المنشئ حتى لا يومض الثيم.',
                  'خدمة API عامة تستخدم HttpClient وتُرجع Observable أو Promise موحّد.',
                  'اختبر toggle في theme.service.spec.ts دون تشغيل المتصفح كاملًا إن أمكن.',
                ],
              },
              {
                id: 'core-guards',
                name: 'guards/',
                kind: 'dir',
                why: 'دوال canActivate تمنع دخول مسار دون شرط.',
                details:
                  'authGuard يتحقق من جلسة. unsavedChanges قد يمنع المغادرة. الحارس يعيد boolean أو UrlTree لإعادة التوجيه. لا تضع نداء شبكة ثقيلًا هنا دون حاجة؛ المستخدم ينتظر التنقل.',
                language: 'ts',
                typical: `export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};`,
                exampleExplain:
                  'CanActivateFn دالة لا صنف قديم. إن وُجدت جلسة يُسمح بالمسار. وإلا UrlTree يوجّه إلى الدخول دون أن تبقى الصفحة محمية ظاهرة لحظة.',
                usage: [
                  'أضف canActivate: [authGuard] على مسار الحساب أو الدفع.',
                  'لا تضع رسالة خطأ في الحارس؛ صفحة الدخول تعرض السبب.',
                  'اختبر الحالتين: جلسة موجودة ومفقودة في ملف spec.',
                  'تجنّب طلب شبكة طويل هنا إلا لتجديد توكن ضروري قبل الدخول.',
                ],
              },
              {
                id: 'core-interceptors',
                name: 'interceptors/',
                kind: 'dir',
                why: 'تعديل الطلبات والاستجابات مرة واحدة: رأس Authorization وتوحيد الأخطاء.',
                details:
                  'دالة interceptor حديثة تستقبل HttpRequest وnext.handle. لا تسجّل أجسامًا فيها أسرار. سجّلها في app.config.ts. إن فشل التوكن يمكن تجديد أو توجيه لصفحة الدخول من هنا بحذر دون حلقات.',
                language: 'ts',
                typical: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const clone = token
    ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    : req;
  return next(clone);
};`,
                exampleExplain:
                  'كل طلب HttpClient يمر من هنا. إن وُجد توكن يُنسخ الطلب مع رأس Authorization. next يرسل النسخة. الطلب الأصلي لا يُعدَّل مباشرة لأنه غير قابل للتغيير.',
                usage: [
                  'سجّل الدالة في provideHttpClient(withInterceptors([authInterceptor])).',
                  'لا تلحق التوكن بطلبات أصول خارجية إن لم يلزم.',
                  'عالج 401 بحذر حتى لا تدخل حلقة تجديد لا نهائية.',
                  'لا تطبع التوكن في console.log أثناء التطوير على آلات مشتركة.',
                ],
              },
            ],
          },
          {
            id: 'features',
            name: 'features/',
            kind: 'dir',
            why: 'كل ميزة منتج في مجلد مستقل: صفحات، خدمات، مسارات فرعية.',
            details:
              'مثال احترافي لمتجر أو لوحة: home، catalog، cart، checkout، account، admin. الميزة قد تصدّر routes.ts خاصًا يُحمَّل كسولًا من app.routes.ts. لا تستورد صفحة ميزة من أخرى مباشرة إن أمكن؛ مرر عبر خدمة أو مسار.',
            language: 'text',
            typical: `features/
  home/home.page.ts
  catalog/list.page.ts
  catalog/detail.page.ts
  catalog/catalog.service.ts
  cart/cart.page.ts
  auth/login.page.ts`,
            exampleExplain:
              'كل مجلد ميزة يملك شاشاته وخدمته. الكتالوج لا يستورد السلة مباشرة. التنقل يتم بالمسار: من التفاصيل إلى /cart. هذا يمنع اعتمادًا دائريًا ويسهّل التحميل الكسول.',
            usage: [
              'أنشئ مجلد الميزة ثم الصفحة ثم اربط المسار في app.routes.ts.',
              'ضع الخدمة بجانب الميزة إن لم تُستخدم خارجها.',
              'للحزمة الكسولة صدّر routes.ts من الميزة واستخدم loadChildren.',
              'لا تنقل مكوّن قائمة المنتجات إلى shared لأنه يعرف المنتج.',
            ],
            children: [
              {
                id: 'feat-home',
                name: 'home/home.page.ts',
                kind: 'file',
                why: 'الشاشة الأولى: عرض القيمة ودعوة للفعل.',
                details:
                  'مكوّن صفحة standalone. يجلب بيانات خفيفة عبر خدمة. لا يحمّل كتالوجًا كاملًا إن وُجدت صفحة مخصصة. الروابط إلى الميزات الأخرى عبر routerLink.',
                language: 'ts',
                typical: `@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: \`
    <h1>متجر المسار</h1>
    <p>منتجات مختارة بلا انتظار كتالوج كامل.</p>
    <a routerLink="/catalog">تصفح المنتجات</a>
  \`,
})
export class HomePage {}`,
                exampleExplain:
                  'الصفحة standalone تستورد RouterLink فقط. العنوان والدعوة للفعل ظاهران. الرابط ينقل إلى الكتالوج بدل جلب كل المنتجات هنا.',
                usage: [
                  'اربط المسار الفارغ / بهذه الصفحة في app.routes.ts.',
                  'إن احتجت منتجات مميزة inject خدمة الكتالوج واطلب قائمة قصيرة.',
                  'اعرض حالات التحميل إن كان الطلب غير متزامن.',
                  'لا تضع نموذج دفع أو سلة كاملة في الرئيسية.',
                ],
              },
              {
                id: 'feat-catalog',
                name: 'catalog/',
                kind: 'dir',
                why: 'قائمة المنتجات وتفاصيل المنتج.',
                details:
                  'list.page.ts يعرض شبكة مع حالات loading وempty وerror. detail.page.ts يقرأ :id من المسار. catalog.service.ts ينادي API. models/product.ts شكل الاستجابة. هذا النمط يُكرَّر لأي كيان: دروس، طلبات، مستخدمون.',
                language: 'ts',
                typical: `@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);

  list(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  byId(id: string): Observable<Product> {
    return this.http.get<Product>('/api/products/' + id);
  }
}`,
                exampleExplain:
                  'الخدمة تفصل الشبكة عن الصفحة. list للقائمة وbyId للتفاصيل. المسار /api يمر عبرproxy في التطوير. النوع Product يمنع any في الصفحة.',
                usage: [
                  'في list.page استدعِ list() واعرض loading ثم الشبكة أو empty.',
                  'في detail.page اقرأ id من المسار ثم byId(id).',
                  'أضف المنتج إلى السلة عبر CartService لا عبر نسخ الحالة هنا.',
                  'عند فشل الطلب أظهر رسالة خطأ قابلة لإعادة المحاولة.',
                ],
              },
              {
                id: 'feat-cart',
                name: 'cart/',
                kind: 'dir',
                why: 'حالة السلة وإضافة/حذف البنود.',
                details:
                  'الخدمة تحتفظ بالإشارة (signal) أو سلوك. الصفحة تعرض المجموع والفراغ. لا تخزّن السلة في مكوّن القائمة فقط وإلا ضاعت عند المغادرة.',
                language: 'ts',
                typical: `@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartLine[]>([]);

  add(product: Product): void {
    this.items.update((lines) => [...lines, { product, qty: 1 }]);
  }

  clear(): void {
    this.items.set([]);
  }
}`,
                exampleExplain:
                  'signal يجعل أي صفحة تقرأ items تتحدث تلقائيًا. add لا يطفر المصفوفة القديمة بل يُنتج قائمة جديدة. clear يفرّغ الحالة. الخدمة جذر حتى تبقى السلة بين الصفحات.',
                usage: [
                  'من تفاصيل المنتج استدعِ cart.add(product).',
                  'صفحة السلة تعرض items() والمجموع وحالة الفراغ.',
                  'اختياريًا اكتب إلى localStorage بعد كل تحديث حتى تبقى بعد إعادة التحميل.',
                  'لا تخزّن السلة في list.page؛ مغادرة القائمة ستمسحها.',
                ],
              },
              {
                id: 'feat-auth',
                name: 'auth/',
                kind: 'dir',
                why: 'دخول وتسجيل ونماذج تحقق.',
                details:
                  'login.page وregister.page يستخدمان Reactive Forms. الخدمة ترسل الاعتمادات وتخزّن الجلسة عبر core. لا تضع كلمة المرور في السجلات. بعد النجاح navigate إلى المسار المقصود أو لوحة المستخدم.',
                language: 'ts',
                typical: `readonly form = new FormGroup({
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
});

submit(): void {
  if (this.form.invalid) return;
  this.auth.login(this.form.getRawValue()).subscribe(() => {
    void this.router.navigateByUrl('/account');
  });
}`,
                exampleExplain:
                  'FormGroup يجمع الحقول والتحقق. invalid يمنع الإرسال. getRawValue يعطي القيمة بعد nonNullable. AuthService في core تخزّن الجلسة. التنقل بعد النجاح لا قبل اكتمال الطلب.',
                usage: [
                  'اربط [formGroup] وformControlName في القالب مع رسائل عربية.',
                  'عطّل زر الحفظ أثناء invalid أو أثناء الطلب.',
                  'لا تطبع password في السجل ولا تخزّنه في localStorage كنص واضح إن أمكن.',
                  'الحارس على /account يعتمد على نفس AuthService.',
                ],
              },
            ],
          },
          {
            id: 'shared',
            name: 'shared/',
            kind: 'dir',
            why: 'قطع واجهة بلا قاعدة أعمال خاصة: زر، شريط تقدم، قالب كود، أنبوب تاريخ.',
            details:
              'إن احتاج المكوّن معرفة «ما هو الدرس» فهو ليس shared. shared يُستورد من ميزات عدة. تجنّب SharedModule الضخم في عالم standalone؛ صدّر مكوّنات صغيرة.',
            language: 'text',
            typical: `shared/
  components/button.component.ts
  components/code-block.component.ts
  pipes/date-ar.pipe.ts
  directives/autofocus.directive.ts`,
            exampleExplain:
              'المكوّنات أنماط تفاعل بلا كيان منتج. الأنابيب تحويل عرض نقي. التوجيهات سلوك على عنصر موجود. لا خدمة كتالوج هنا.',
            usage: [
              'قبل وضع ملف هنا اسأل: هل تحتاجه ميزتان دون معرفة المنتج؟',
              'استورد المكوّن في imports للصفحة التي تحتاجه فقط.',
              'لا تجمع كل شيء في SharedModule واحد ضخم.',
              'إن بدأ المكوّن يعرف Product انقله إلى الميزة.',
            ],
            children: [
              {
                id: 'shared-ui',
                name: 'components/button.component.ts',
                kind: 'file',
                why: 'زر موحّد للحالات الأساسية والثانوية والتحميل.',
                details:
                  'مدخلات: variant وdisabled وloading. لا يعرف شيئًا عن المنتجات. إعادة الاستخدام تمنع اختلاف الشكل بين الصفحات.',
                language: 'ts',
                typical: `@Component({
  selector: 'app-button',
  template: \`<button [disabled]="disabled || loading" [class.secondary]="variant === 'secondary'">
    @if (loading) { <span>جاري...</span> } @else { <ng-content /> }
  </button>\`,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
}`,
                exampleExplain:
                  'variant يغيّر الشكل. disabled وloading يمنعان النقر المزدوج. ng-content يعرض نص الزر من الأب. لا يوجد addToCart هنا حتى يبقى الزر عامًا.',
                usage: [
                  'في الصفحة: <app-button [loading]="saving()" (click)="save()">حفظ</app-button> مع تمرير الحدث من الأب.',
                  'أضف الزر إلى imports للمكوّن المستهلك.',
                  'لا تربط الزر بـ CartService داخل shared.',
                  'وحّد الارتفاع واللون مع متغيرات styles.scss.',
                ],
              },
              {
                id: 'shared-pipes',
                name: 'pipes/',
                kind: 'dir',
                why: 'تحويل عرض: تاريخ عربي، اختصار نص، عملة.',
                details:
                  'الأنبوب نقي: نفس الدخل نفس الخرج. لا يضرب API. سجّله في imports للمكوّن الذي يحتاجه.',
                language: 'ts',
                typical: `@Pipe({ name: 'dateAr' })
export class DateArPipe implements PipeTransform {
  transform(value: string | Date): string {
    return new Intl.DateTimeFormat('ar', { dateStyle: 'medium' }).format(new Date(value));
  }
}`,
                exampleExplain:
                  'PipeTransform يعرّف transform. Intl ينسّق التاريخ بالعربية. نفس التاريخ يعطي نفس النص دائمًا. لا قراءة شبكة ولا حالة.',
                usage: [
                  'في القالب: {{ order.createdAt | dateAr }}.',
                  'أضف DateArPipe إلى imports للصفحة.',
                  'لا تستخدم أنبوبًا لفرز قائمة كبيرة معقّدة؛ ذلك منطق خدمة.',
                  'اختبر transform بقيمة ثابتة في spec بدون TestBed ثقيل إن أمكن.',
                ],
              },
              {
                id: 'shared-directives',
                name: 'directives/',
                kind: 'dir',
                why: 'سلوك على عنصر قائم: تركيز تلقائي، منع نقر مزدوج.',
                details:
                  'directive standalone. لا تستخدمها لإخفاء منطق أعمال معقّد؛ ذلك مكانه خدمة.',
                language: 'ts',
                typical: `@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}`,
                exampleExplain:
                  'selector كصفة تُوضع على عنصر موجود. بعد ظهور العنصر يُنقل التركيز إليه. مفيد لحقل البحث أو أول حقل في نموذج. لا منطق سلة.',
                usage: [
                  'في القالب: <input appAutofocus /> بعد استيراد التوجيه.',
                  'لا تستخدمها على كل الحقول؛ التركيز المتعدد يربك لوحة المفاتيح.',
                  'للوصول: لا تسرق التركيز دون سبب واضح للمستخدم.',
                  'سلوك منع النقر المزدوج توجيه آخر يستمع click ويوقف الإرسال المؤقت.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'env',
    name: 'src/environments/ (عند الحاجة)',
    kind: 'dir',
    why: 'قيم تختلف بين التطوير والإنتاج: عنوان API ووضع الإنتاج.',
    details:
      'environment.ts للتطوير وenvironment.production.ts للبناء. لا تضع مفتاحًا سريًا هنا إن كان المستودع عامًا؛ الواجهة لا تُخفي أسرارًا. في Angular الحديث يمكن الاستعاضة بملف إعداد يُستبدل عند النشر. fileReplacements في angular.json يبدّل الملف وقت الإنتاج.',
    language: 'text',
    typical: `src/environments/
  environment.ts
  environment.production.ts`,
    exampleExplain:
      'ملفان بنفس الشكل يختلفان في القيم. البناء يستبدل ملف التطوير بملف الإنتاج عبر angular.json. الخدمات تستورد environment لا عنوانًا مكتوبًا في الصفحة.',
    usage: [
      'أنشئ المجلد فقط إن احتجت قيمًا تختلف بين التطوير والإنتاج.',
      'استورد apiBase من environment في CatalogService.',
      'لا تضع مفتاحًا سريًا؛ أي مستخدم يفتح حزمة JS سيراه.',
      'راجع fileReplacements قبل أول نشر حتى لا يبقى localhost في الإنتاج.',
    ],
    children: [
      {
        id: 'env-dev',
        name: 'environment.ts',
        kind: 'file',
        why: 'production: false وapiBase محلي.',
        details: 'مثال: apiBase: "http://localhost:3001/api". الصفحات تستورد هذا الكائن لا عناوين مكتوبة في القالب.',
        language: 'ts',
        typical: `export const environment = {
  production: false,
  apiBase: '/api',
};`,
        exampleExplain:
          'production false يبقي أدوات التصحيح. apiBase مسار نسبي يمر عبر proxy في التطوير حتى لا تكسر CORS. الصفحات لا تكتب localhost في القالب.',
        usage: [
          'في الخدمة: this.http.get(environment.apiBase + \'/products\').',
          'غيّر apiBase هنا دون لمس عشر صفحات.',
          'لا تخزّن توكن مستخدم في هذا الملف؛ هو إعداد عام لا جلسة.',
          'أبقِ الشكل مطابقًا لملف الإنتاج حتى ينجح الاستبدال.',
        ],
      },
      {
        id: 'env-prod',
        name: 'environment.production.ts',
        kind: 'file',
        why: 'production: true وعنوان الخادم الحقيقي.',
        details: 'يُستخدم عند ng build --configuration=production. راجع أن المسارات https وأنك لا تشير إلى localhost.',
        language: 'ts',
        typical: `export const environment = {
  production: true,
  apiBase: 'https://api.example.com',
};`,
        exampleExplain:
          'production true يخفي رسائل التصحيح الثقيلة. apiBase عنوان الخادم الحقيقي بـ https. نفس أسماء الحقول كما في ملف التطوير حتى لا ينكسر الاستيراد.',
        usage: [
          'اربط الملف في angular.json تحت fileReplacements للتكوين production.',
          'بعد البناء ابحث في dist عن localhost؛ إن وُجد فالاستبدال لم يعمل.',
          'لا تضع سر توقيع JWT هنا حتى لو كان الإنتاج؛ الواجهة مكشوفة.',
          'إن كان reverse proxy يخدم /api من نفس النطاق استخدم apiBase: \'/api\' هنا أيضًا.',
        ],
      },
    ],
  },
  {
    id: 'tests',
    name: '*.spec.ts',
    kind: 'file',
    why: 'اختبار وحدة بجانب الملف أو في مسار موازٍ.',
    details:
      'TestBed يجهّز المكوّن أو الخدمة. اختبر قاعدة لا الواجهة كلها: getById ترجع undefined، الحارس يرفض بلا جلسة. e2e منفصل (Playwright أو Cypress) خارج وحدة Karma. غياب Chrome في البيئة لا يلغي كتابة الاختبار.',
    language: 'ts',
    typical: `describe('CatalogService', () => {
  it('يعيد undefined عندما لا يوجد المعرّف', () => {
    const service = TestBed.inject(CatalogService);
    expect(service.getById('missing')).toBeUndefined();
  });
});`,
    exampleExplain:
      'describe يجمع اختبارات الخدمة. it حالة واحدة باسم عربي واضح. expect يتحقق من القاعدة لا من شكل الزر. هذا أسرع وأثبت من اختبار الواجهة كلها لكل تغيير.',
    usage: [
      'ضع الملف بجانب المصدر: catalog.service.spec.ts.',
      'اختبر المسارات السعيدة والفشل: قائمة فارغة، معرّف ناقص، حارس بلا جلسة.',
      'شغّل ng test محليًا. إن غاب Chrome تبقى الملفات جاهزة لبيئة فيها متصفح.',
      'لا تستبدل اختبار الوحدة بتجربة يدوية فقط عند كل حفظ.',
    ],
  },
  {
    id: 'dist',
    name: 'dist/ (مُولَّد، لا يُعدَّل)',
    kind: 'dir',
    why: 'ناتج ng build: HTML وJS وCSS جاهزة للخادم.',
    details:
      'لا تحرّر هذه الملفات يدويًا. انشر المجلد أو محتواه. hashing في الإنتاج يكسر الكاش عند كل إصدار. أضفه إلى gitignore.',
    language: 'text',
    typical: `dist/shop-app/browser/
  index.html
  main-XXXX.js
  styles-XXXX.css
  favicon.ico`,
    exampleExplain:
      'المجلد ناتج البناء لا المصدر. الأسماء بـ hash تتغير مع كل إصدار حتى يحمّل المتصفح الملف الجديد. index.html يشير إلى هذه الأسماء. أي تعديل يدوي يُمسح في البناء التالي.',
    usage: [
      'شغّل npm run build ثم انشر محتويات browser على الخادم الثابت.',
      'أضف dist إلى .gitignore.',
      'لا تصلّح خطأ واجهة من داخل dist؛ عدّل src وأعد البناء.',
      'الخادم يجب أن يعيد index.html لمسارات SPA حتى لا يظهر 404 عند التحديث.',
    ],
  },
  {
    id: 'node',
    name: 'node_modules/ (مُولَّد)',
    kind: 'dir',
    why: 'الحزم المثبتة من package.json.',
    details:
      'لا تُرفع إلى Git. حجمها كبير. احذفها وأعد npm install إن فسدت التثبيتات. لا تعدّل مكتبة من داخلها؛ استخدم override أو رقعة موثّقة.',
    language: 'text',
    typical: `node_modules/
  @angular/core/
  rxjs/
  .bin/ng`,
    exampleExplain:
      'كل حزمة في package.json تظهر هنا بعد التثبيت. .bin يحتوي أوامر مثل ng. المجلد ضخم ومتكرر في كل آلة لذلك يُستعاد من القفل لا من Git.',
    usage: [
      'npm install يملأ المجلد من package-lock.json.',
      'إن فسدت الحزم احذف المجلد محليًا ثم أعد التثبيت (لا ترفع الحذف كجزء من المستودع).',
      'نفّذ الأوامر عبر npx ng أو npm start لا بتعديل ملفات المكتبة.',
      'ابحث عن الحزمة هنا للتصحيح فقط؛ الرقعة الدائمة تكون upstream أو patch رسمي.',
    ],
  },
  {
    id: 'proxy',
    name: 'proxy.conf.json (اختياري في التطوير)',
    kind: 'file',
    why: 'يمرّر طلبات /api من خادم ng serve إلى الخادم الخلفي لتفادي CORS محليًا.',
    details:
      'في بيئة معاينة بمنفذ واحد هذا شائع: الواجهة على 4200 والخلفية على 3001. يُشار إليه من angular.json تحت serve.options.proxyConfig. لا يُستخدم في الإنتاج؛ هناك يعكس nginx أو الخادم نفسه المسار.',
    language: 'json',
    typical: `{
  "/api": {
    "target": "http://localhost:3001",
    "secure": false,
    "changeOrigin": true
  }
}`,
    exampleExplain:
      'كل طلب يبدأ بـ /api من المتصفح إلى منفذ 4200 يُمرَّر إلى 3001. secure false يناسب http محليًا. changeOrigin يضبط رأس Host للخادم الخلفي. المتصفح يرى أصلًا واحدًا فلا يمنع CORS.',
    usage: [
      'ضع الملف في الجذر وأشر إليه في angular.json: serve.options.proxyConfig.',
      'في الخدمة استخدم مسارًا نسبيًا /api/products لا http://localhost:3001.',
      'أعد تشغيل ng serve بعد تغيير الوكيل.',
      'في الإنتاج لا يعتمد هذا الملف؛ اضبط nginx أو الخادم ليعكس /api.',
    ],
  },
  {
    id: 'karma',
    name: 'karma.conf.js أو إعداد test في angular.json',
    kind: 'file',
    why: 'يشغّل اختبارات الوحدة في متصفح حقيقي أو Headless.',
    details:
      'Angular 19 يضبط الاختبار غالبًا من angular.json. المتصفحات: Chrome أو ChromeHeadless. إن غاب المتصفح تفشل المهمة؛ هذا قيد بيئة لا يلغي كتابة spec.',
    language: 'js',
    typical: `module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};`,
    exampleExplain:
      'frameworks يحدد Jasmine. ChromeHeadless يشغّل بلا نافذة في CI. singleRun يغلق العملية بعد النتيجة حتى لا تعلق المهمة. في Angular 19 قد يعيش هذا الإعداد داخل angular.json بدل ملف منفصل.',
    usage: [
      'ng test يقرأ هذا الإعداد أو قسم test في angular.json.',
      'على جهازك ثبّت Chrome إن فشلت المهمة برسالة CHROME_BIN.',
      'في CI استخدم Headless حتى لا تحتاج واجهة رسومية.',
      'كتابة spec أهم من نجاح التشغيل في بيئة بلا متصفح؛ لا تحذف الاختبارات لذلك.',
    ],
  },
  {
    id: 'vscode',
    name: '.vscode/ (اختياري)',
    kind: 'dir',
    why: 'إعدادات المحرر للفريق: تنسيق عند الحفظ، امتدادات مقترحة.',
    details:
      'extensions.json يقترح ESLint وAngular Language Service. settings.json يفعّل formatOnSave. لا تضع أسرارًا هنا. الملف شخصي إن اختلف الفريق حوله؛ كثير من الفرق يرفعونه لتوحيد التجربة.',
    language: 'json',
    typical: `{
  "recommendations": [
    "angular.ng-template",
    "dbaeumer.vscode-eslint"
  ]
}`,
    exampleExplain:
      'recommendations تظهر اقتراح تثبيت للزميل عند فتح المجلد. Angular Language Service يكمل القوالب. ESLint يظهر أخطاء الأسلوب أثناء الكتابة. هذا ليس تشغيلًا للتطبيق.',
    usage: [
      'ارفع .vscode/extensions.json إن أراد الفريق توحيد المحرر.',
      'أضف formatOnSave في settings.json بحذر حتى لا يعيد تنسيق ملفات لا تخصك.',
      'لا تضع توكن Git أو مفاتيح في هذا المجلد.',
      'إن رفض أحد الأعضاء توحيد المحرر اجعل الملف اختياريًا في الاتفاق لا في الكود.',
    ],
  },
  {
    id: 'docker',
    name: 'Dockerfile (عند النشر بالحاويات)',
    kind: 'file',
    why: 'يبني الواجهة ثم يقدّم الملفات عبر nginx أو خادم ثابت.',
    details:
      'مرحلة build تشغّل npm ci وng build. مرحلة ثانية تنسخ dist إلى nginx. لا تضع أسرار npm في الطبقة النهائية. هذا اختياري؛ الاستضافة الثابتة تكفي لكثير من الواجهات.',
    language: 'dockerfile',
    typical: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/shop-app/browser /usr/share/nginx/html`,
    exampleExplain:
      'مرحلتان: الأولى تثبّت وتبني، الثانية صورة nginx خفيفة تنسخ الملفات الثابتة فقط. npm ci يحترم القفل. الطبقة النهائية بلا node_modules ولا أسرار تثبيت. المسار browser هو مخرج Angular الحديث.',
    usage: [
      'استخدمه إن كان النشر بالحاويات؛ وإلا ارفع dist إلى استضافة ثابتة.',
      'اضبط nginx ليعيد index.html لكل مسار أمامي (try_files).',
      'لا تنسخ .env أسرارًا إلى الصورة النهائية.',
      'ابنِ محليًا أولًا بـ npm run build حتى تتأكد من المسار قبل Docker.',
    ],
  },
]
