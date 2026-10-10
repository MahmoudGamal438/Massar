# المعمارية التقنية

- Angular 19، TypeScript strict، standalone، Router مع lazy `loadComponent`
- حالة التقدم: Signals + localStorage
- المحتوى: ملفات بيانات TypeScript يمكن استبدالها بـ API لاحقًا عبر الخدمة نفسها
- لا مفاتيح في الواجهة
- `allowedHosts`: `.monkeycode-ai.live` لخادم التطوير

## هيكل مختصر

`core/` خدمات ونماذج وتخطيط. `shared/` مكوّنات عرض. `features/` صفحات. `data/` المنهج.

## تنازلات

بيانات محلية. بلا SSR. بلا تشغيل كود مستخدم. Angular 19 بدل 22 بسبب قيد Node.
