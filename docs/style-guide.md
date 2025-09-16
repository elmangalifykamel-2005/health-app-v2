# دليل التصميم (Style Guide) لتطبيق "صحتك بالدنيا"

## نظرة عامة

يوفر هذا المستند إرشادات شاملة للتصميم والأسلوب المستخدم في تطبيق "صحتك بالدنيا". الالتزام بهذه الإرشادات ضروري للحفاظ على تجربة مستخدم متسقة ومتماسكة عبر جميع أجزاء التطبيق.

## نظام الألوان

### الألوان الأساسية

- **اللون الأساسي (Primary)**: `#4CAF50` - أخضر فاتح يرمز إلى الصحة والحيوية
- **اللون الثانوي (Secondary)**: `#2196F3` - أزرق يرمز إلى الثقة والهدوء
- **لون التأكيد (Accent)**: `#FF9800` - برتقالي يرمز إلى النشاط والحماس

### الألوان الوظيفية

- **نجاح (Success)**: `#4CAF50` - أخضر
- **معلومات (Info)**: `#2196F3` - أزرق
- **تحذير (Warning)**: `#FF9800` - برتقالي
- **خطأ (Error)**: `#F44336` - أحمر

### تدرجات الرمادي

- **أبيض**: `#FFFFFF`
- **رمادي فاتح جداً**: `#F5F5F5`
- **رمادي فاتح**: `#E0E0E0`
- **رمادي متوسط**: `#9E9E9E`
- **رمادي داكن**: `#616161`
- **أسود**: `#212121`

### سمات التطبيق

#### السمة الفاتحة (Light Theme)

- **خلفية التطبيق**: `#F5F5F5`
- **خلفية البطاقات**: `#FFFFFF`
- **لون النص الأساسي**: `#212121`
- **لون النص الثانوي**: `#616161`

#### السمة الداكنة (Dark Theme)

- **خلفية التطبيق**: `#212121`
- **خلفية البطاقات**: `#424242`
- **لون النص الأساسي**: `#FFFFFF`
- **لون النص الثانوي**: `#E0E0E0`

## الخطوط

### عائلات الخطوط

- **الخط الأساسي**: `'Almarai', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` - للنصوص العامة والواجهة
- **خط العناوين**: `'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` - للعناوين وعناصر البارزة
- **خط البيانات**: `'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` - للبيانات والأرقام

### أحجام الخطوط

- **كبير جداً (XLarge)**: `2rem` (32px) - للعناوين الرئيسية
- **كبير (Large)**: `1.5rem` (24px) - للعناوين الفرعية
- **متوسط (Medium)**: `1.25rem` (20px) - للعناوين الصغيرة
- **عادي (Regular)**: `1rem` (16px) - للنص العادي
- **صغير (Small)**: `0.875rem` (14px) - للنص الثانوي
- **صغير جداً (XSmall)**: `0.75rem` (12px) - للملاحظات والتذييلات

### أوزان الخطوط

- **خفيف (Light)**: `300`
- **عادي (Regular)**: `400`
- **متوسط (Medium)**: `500`
- **ثقيل (Bold)**: `700`

## الفراغات والمسافات

### نظام الهوامش والحشو

يعتمد التطبيق على نظام قياس من 8px:

- **صغير جداً (XSmall)**: `4px`
- **صغير (Small)**: `8px`
- **عادي (Regular)**: `16px`
- **متوسط (Medium)**: `24px`
- **كبير (Large)**: `32px`
- **كبير جداً (XLarge)**: `48px`
- **ضخم (XXLarge)**: `64px`

### الشبكة (Grid)

- **عدد الأعمدة**: 12 عمود
- **المسافة بين الأعمدة**: `16px`
- **الهامش الخارجي**: `16px` (للشاشات الصغيرة)، `32px` (للشاشات المتوسطة)، `64px` (للشاشات الكبيرة)

## العناصر المرئية

### البطاقات (Cards)

- **الظل**: `0 2px 4px rgba(0, 0, 0, 0.1)`
- **نصف القطر**: `8px`
- **الحشو الداخلي**: `16px`
- **لون الحدود**: `transparent` (عادة) أو `#E0E0E0` (للتأكيد)
- **سمك الحدود**: `1px`

### الأزرار (Buttons)

#### الأساسية (Primary)

- **الخلفية**: اللون الأساسي (`#4CAF50`)
- **لون النص**: أبيض (`#FFFFFF`)
- **التأثير عند المرور (Hover)**: تغميق بنسبة 10%
- **الحشو**: `8px 16px`
- **نصف القطر**: `4px`

#### الثانوية (Secondary)

- **الخلفية**: شفاف
- **لون النص**: اللون الأساسي (`#4CAF50`)
- **الحدود**: `1px solid #4CAF50`
- **التأثير عند المرور (Hover)**: خلفية مع شفافية للون الأساسي
- **الحشو**: `8px 16px`
- **نصف القطر**: `4px`

#### المسطحة (Text Button)

- **الخلفية**: شفاف
- **لون النص**: اللون الأساسي (`#4CAF50`)
- **التأثير عند المرور (Hover)**: خلفية مع شفافية للون الأساسي
- **الحشو**: `8px`
- **نصف القطر**: `4px`

#### العائمة (Floating Action Button)

- **الخلفية**: لون التأكيد (`#FF9800`)
- **لون الأيقونة**: أبيض (`#FFFFFF`)
- **الحجم**: `56px x 56px`
- **نصف القطر**: `28px`
- **الظل**: `0 6px 10px rgba(0, 0, 0, 0.2)`

### حقول الإدخال (Input Fields)

- **ارتفاع**: `48px`
- **نصف قطر الحدود**: `4px`
- **لون الحدود**: `#E0E0E0`
- **لون الحدود عند التركيز**: اللون الأساسي (`#4CAF50`)
- **لون النص**: `#212121`
- **حشو داخلي**: `8px 16px`
- **لون الخلفية**: `#FFFFFF` (للسمة الفاتحة)، `#333333` (للسمة الداكنة)

### القوائم (Lists)

- **ارتفاع العنصر**: `48px`
- **الحشو الداخلي للعنصر**: `0 16px`
- **لون الحدود بين العناصر**: `#E0E0E0`
- **لون خلفية العنصر النشط**: `rgba(76, 175, 80, 0.1)`
- **لون نص العنصر النشط**: اللون الأساسي (`#4CAF50`)

### الرموز والأيقونات

- **مجموعة الأيقونات**: Material Design Icons
- **حجم الأيقونات الأساسي**: `24px`
- **حجم الأيقونات الصغيرة**: `16px`
- **حجم الأيقونات الكبيرة**: `32px`
- **لون الأيقونات**: يتوافق مع لون النص في السياق

## تصميم التفاعلات

### الانتقالات (Transitions)

- **المدة الأساسية**: `300ms`
- **التوقيت**: `cubic-bezier(0.4, 0, 0.2, 1)` (معيار Material Design)

### التأثيرات (Effects)

- **تأثير النقر**: تموج دائري (Ripple effect)
- **تأثير التمرير**: سلس وبطيء (Smooth scroll)
- **تأثير التحميل**: دوران دائري (Circular progress)

### الردود (Feedback)

- **النجاح**: رسائل خضراء مع أيقونة ✓
- **الخطأ**: رسائل حمراء مع أيقونة ✕
- **جاري التحميل**: مؤشر تقدم دائري أو شريطي

## صور توضيحية

### الرسوم والأيقونات

- **الأسلوب**: مسطح (Flat design) مع ألوان داكنة وزاهية
- **الأشكال**: مستديرة ولينة
- **السمك**: متوسط

### الصور الفوتوغرافية

- **الأسلوب**: واقعية، ذات جودة عالية
- **المحتوى**: أشخاص يمارسون أنشطة صحية، أطعمة صحية، صور طبية احترافية
- **التصفية**: خفيفة، بدون تأثيرات مبالغ فيها

## تخطيط الواجهة (Layout)

### تخطيط الصفحة الرئيسية

- **الشريط العلوي**: ثابت مع لون الخلفية الأساسي
- **الشريط الجانبي**: قابل للطي (للأجهزة المحمولة) وثابت (للشاشات الكبيرة)
- **المحتوى الرئيسي**: مساحة مرنة مع هوامش متناسقة
- **الشريط السفلي**: ثابت للتنقل السريع (في الأجهزة المحمولة)

### تخطيط صفحات الوحدات

- **العنوان**: في الأعلى مع أزرار الإجراءات
- **التبويبات**: أسفل العنوان (إذا كانت هناك تبويبات)
- **المحتوى**: مقسم إلى أقسام وبطاقات
- **الإجراءات الرئيسية**: زر عائم في الزاوية السفلية اليمنى

## قواعد الاستجابة (Responsive Design)

### نقاط التوقف (Breakpoints)

- **الهواتف الصغيرة**: أقل من `600px`
- **الهواتف الكبيرة والأجهزة اللوحية الصغيرة**: `600px` إلى `960px`
- **الأجهزة اللوحية**: `960px` إلى `1280px`
- **أجهزة سطح المكتب**: أكبر من `1280px`

### سلوك العناصر

- **القوائم**: تتحول إلى قوائم منسدلة في الشاشات الصغيرة
- **الأعمدة**: تتقلص وتتمدد حسب حجم الشاشة
- **الصور**: تتكيف مع عرض الحاوية
- **الشريط الجانبي**: يتحول إلى قائمة علوية في الشاشات الصغيرة

## تنفيذ دليل التصميم

### استخدام متغيرات CSS

يتم استخدام متغيرات CSS لتسهيل تطبيق دليل التصميم وتغييره:

```css
:root {
  /* الألوان الأساسية */
  --color-primary: #4CAF50;
  --color-secondary: #2196F3;
  --color-accent: #FF9800;
  
  /* الألوان الوظيفية */
  --color-success: #4CAF50;
  --color-info: #2196F3;
  --color-warning: #FF9800;
  --color-error: #F44336;
  
  /* تدرجات الرمادي */
  --color-white: #FFFFFF;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E0E0E0;
  --color-gray-500: #9E9E9E;
  --color-gray-700: #616161;
  --color-black: #212121;
  
  /* ألوان السمة الفاتحة */
  --bg-app-light: var(--color-gray-100);
  --bg-card-light: var(--color-white);
  --text-primary-light: var(--color-black);
  --text-secondary-light: var(--color-gray-700);
  
  /* ألوان السمة الداكنة */
  --bg-app-dark: var(--color-black);
  --bg-card-dark: #424242;
  --text-primary-dark: var(--color-white);
  --text-secondary-dark: var(--color-gray-200);
  
  /* الخطوط */
  --font-family-base: 'Almarai', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-family-heading: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-family-data: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  /* أحجام الخطوط */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-xxl: 2rem;
  
  /* أوزان الخطوط */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* المسافات */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-xxxl: 64px;
  
  /* القياسات والأبعاد */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-circle: 50%;
  
  /* الظلال */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 6px 10px rgba(0, 0, 0, 0.2);
  
  /* الانتقالات */
  --transition-speed: 300ms;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* تطبيق السمة الداكنة */
[data-theme="dark"] {
  --bg-app: var(--bg-app-dark);
  --bg-card: var(--bg-card-dark);
  --text-primary: var(--text-primary-dark);
  --text-secondary: var(--text-secondary-dark);
}

/* تطبيق السمة الفاتحة (الافتراضية) */
:root, [data-theme="light"] {
  --bg-app: var(--bg-app-light);
  --bg-card: var(--bg-card-light);
  --text-primary: var(--text-primary-light);
  --text-secondary: var(--text-secondary-light);
}
```

### أمثلة على تطبيق دليل التصميم

#### تنسيق الأزرار

```css
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-md);
  transition: all var(--transition-speed) var(--transition-timing);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
}

.btn-primary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 90%, black);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
}
```

#### تنسيق البطاقات

```css
.card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.card-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.card-content {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}
```

#### تنسيق حقول الإدخال

```css
.input-field {
  height: 48px;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-gray-200);
  padding: 0 var(--spacing-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  background-color: var(--bg-card);
  transition: border var(--transition-speed) var(--transition-timing);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
  display: block;
}
```

## ملاحظات تطبيقية

- تأكد من اختبار التصميم على مجموعة متنوعة من الأجهزة وأحجام الشاشة.
- احرص على مراعاة قواعد إمكانية الوصول (Accessibility) في جميع عناصر الواجهة.
- استخدم أدوات مثل Storybook لتوثيق وعرض مكونات واجهة المستخدم.
- قم بتحديث دليل التصميم بشكل دوري مع تطور التطبيق.
- احرص على اتباع هذا الدليل في جميع أجزاء التطبيق للحفاظ على تجربة مستخدم متسقة.