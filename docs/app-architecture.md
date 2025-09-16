# هيكل تطبيق "صحتك بالدنيا"

## نظرة عامة على الهيكل

تم تصميم تطبيق "صحتك بالدنيا" باستخدام نمط هندسة البرمجيات المعروف باسم "Service-Oriented Architecture" (هندسة موجهة للخدمات). يعتمد التطبيق على مجموعة من الخدمات المركزية التي توفر الوظائف الأساسية لجميع أجزاء التطبيق.

## هيكل المجلدات

```
healthy-app/
├── index.html              # صفحة البداية
├── login.html              # صفحة تسجيل الدخول
├── main.html               # الصفحة الرئيسية للتطبيق
├── sidebar.html            # قالب الشريط الجانبي
├── firebase-config.js      # تهيئة Firebase
├── core/                   # النواة المركزية للتطبيق
│   ├── services/           # الخدمات المركزية
│   │   ├── firebase.service.js
│   │   ├── auth.service.js
│   │   ├── health-data.service.js
│   │   ├── navigation.service.js
│   │   ├── app-settings.service.js
│   │   └── shared-data.service.js
│   ├── models/             # نماذج البيانات
│   │   ├── user.model.js
│   │   ├── health-data.model.js
│   │   └── ...
│   ├── utils/              # أدوات مساعدة
│   │   ├── date-formatter.js
│   │   ├── validation.js
│   │   └── ...
│   └── styles/             # أنماط مشتركة
│       └── main.css
├── modules/                # وحدات التطبيق المختلفة
│   ├── about/
│   ├── calories/
│   ├── health-state/
│   ├── healthy-recepies/
│   ├── herbs/
│   ├── medical-file/
│   ├── mental-health/
│   ├── nutrition/
│   ├── sleep/
│   └── studies/
├── config/                 # ملفات التكوين
├── docs/                   # التوثيق
└── photo/                  # الصور والموارد
```

## الخدمات المركزية

### 1. خدمة Firebase (firebase.service.js)
توفر واجهة موحدة للتعامل مع Firebase وقاعدة البيانات.

- `initializeFirebase()`: تهيئة الاتصال بـ Firebase
- `getCollection(collectionName)`: الحصول على مجموعة من قاعدة البيانات
- `getDocument(collectionName, docId)`: الحصول على مستند محدد
- `setDocument(collectionName, docId, data)`: إنشاء أو تحديث مستند
- `updateDocument(collectionName, docId, data)`: تحديث مستند موجود
- `deleteDocument(collectionName, docId)`: حذف مستند
- `addDocument(collectionName, data)`: إضافة مستند جديد وإنشاء معرف تلقائي

### 2. خدمة المصادقة (auth.service.js)
تدير كل ما يتعلق بتسجيل الدخول وإدارة المستخدمين.

- `login(email, password)`: تسجيل الدخول
- `register(email, password, userData)`: تسجيل مستخدم جديد
- `logout()`: تسجيل الخروج
- `getCurrentUser()`: الحصول على المستخدم الحالي
- `isLoggedIn()`: التحقق من حالة تسجيل الدخول
- `sendPasswordReset(email)`: إرسال رسالة إعادة تعيين كلمة المرور
- `updateProfile(userData)`: تحديث معلومات الملف الشخصي

### 3. خدمة البيانات الصحية (health-data.service.js)
تدير كل البيانات الصحية للمستخدم وتوفر واجهة موحدة للوصول إليها.

- `getMeasurements(type, period)`: الحصول على القياسات حسب النوع والفترة
- `addMeasurement(data)`: إضافة قياس جديد
- `getMedicalTests()`: الحصول على التحاليل الطبية
- `addMedicalTest(data)`: إضافة تحليل طبي جديد
- `getMedications(active)`: الحصول على الأدوية (الحالية أو الكل)
- وغيرها من الوظائف للتعامل مع البيانات الصحية المختلفة

### 4. خدمة التنقل (navigation.service.js)
تدير التنقل بين صفحات وأقسام التطبيق.

- `navigateTo(page, params)`: الانتقال إلى صفحة معينة
- `loadComponent(container, component)`: تحميل مكوّن في حاوية معينة
- `initSidebar()`: تهيئة الشريط الجانبي
- `handleBackNavigation()`: التعامل مع زر الرجوع
- `getQueryParams()`: الحصول على معلمات الـ URL

### 5. خدمة إعدادات التطبيق (app-settings.service.js)
تدير إعدادات وتفضيلات التطبيق والمستخدم.

- `getSettings()`: الحصول على الإعدادات الحالية
- `updateSettings(settings)`: تحديث الإعدادات
- `getTheme()`: الحصول على سمة التطبيق الحالية
- `setTheme(theme)`: تغيير سمة التطبيق
- `getLanguage()`: الحصول على اللغة الحالية
- `setLanguage(lang)`: تغيير لغة التطبيق

### 6. خدمة البيانات المشتركة (shared-data.service.js)
توفر آلية لتبادل البيانات بين مختلف أجزاء التطبيق.

- `setData(key, value)`: تخزين بيانات
- `getData(key)`: استرجاع بيانات
- `clearData(key)`: مسح بيانات
- `subscribe(key, callback)`: الاشتراك للحصول على تحديثات لبيانات معينة
- `unsubscribe(key, callback)`: إلغاء الاشتراك

## نماذج البيانات

تستخدم نماذج البيانات لتمثيل البيانات بشكل موحد في التطبيق. مثال:

```javascript
// user.model.js
class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.displayName = data.displayName || '';
    this.email = data.email || '';
    this.photoURL = data.photoURL || '';
    this.dateOfBirth = data.dateOfBirth || null;
    this.gender = data.gender || '';
    this.height = data.height || 0;
    this.weight = data.weight || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  get age() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
```

## نظام التنقل بين الصفحات

تم تصميم نظام التنقل في التطبيق ليكون سلسًا ومتسقًا بين جميع الأقسام:

### 1. التنقل الرئيسي
- يتم تحميل جميع صفحات الوحدات الأساسية داخل الصفحة الرئيسية `main.html`.
- يستخدم الشريط الجانبي `sidebar.html` للتنقل بين الأقسام الرئيسية.
- تتم إدارة التنقل مركزيًا من خلال `navigation.service.js`.

### 2. تحميل المحتوى
- يتم تحميل محتوى الصفحات بشكل ديناميكي باستخدام تقنية AJAX.
- عند النقر على رابط في الشريط الجانبي، يتم استدعاء `navigation.service.js` لتحميل المحتوى المطلوب.
- يتم تحديث عنوان URL باستخدام تقنية History API للحفاظ على تاريخ التصفح وإمكانية مشاركة الروابط.

### 3. أنواع التنقل
1. **التنقل بين الأقسام الرئيسية**: عبر الشريط الجانبي.
2. **التنقل داخل القسم**: عبر قوائم ثانوية خاصة بكل قسم.
3. **النوافذ المنبثقة**: تستخدم للنماذج والإجراءات القصيرة.

### 4. حفظ حالة التنقل
- يتم حفظ آخر صفحة زارها المستخدم في LocalStorage.
- عند إعادة فتح التطبيق، يتم توجيه المستخدم إلى آخر صفحة قام بزيارتها.
- يمكن للمستخدم العودة للصفحة الرئيسية في أي وقت.

## آلية تحميل الوحدات

تعتمد آلية تحميل الوحدات على مفهوم "Lazy Loading" (التحميل الكسول) لتحسين الأداء:

1. عند بدء التطبيق، يتم تحميل الخدمات الأساسية فقط.
2. عند طلب وحدة معينة، يتم تحميل ملفات JavaScript و CSS الخاصة بها فقط.
3. يتم تخزين الوحدات المحملة مؤقتًا للاستخدام السريع لاحقًا.

مثال على آلية تحميل الوحدات:

```javascript
// navigation.service.js (جزء من الكود)
async loadModule(moduleName) {
  if (this.loadedModules[moduleName]) {
    return this.loadedModules[moduleName];
  }
  
  try {
    // تحميل ملف JavaScript الرئيسي للوحدة
    const moduleScript = document.createElement('script');
    moduleScript.src = `/modules/${moduleName}/${moduleName}.js`;
    document.body.appendChild(moduleScript);
    
    // انتظار تحميل الملف
    await new Promise(resolve => {
      moduleScript.onload = resolve;
      moduleScript.onerror = () => {
        console.error(`Failed to load module: ${moduleName}`);
        resolve();
      };
    });
    
    // تحميل ملف CSS إن وجد
    const moduleCss = document.createElement('link');
    moduleCss.rel = 'stylesheet';
    moduleCss.href = `/modules/${moduleName}/${moduleName}.css`;
    document.head.appendChild(moduleCss);
    
    // تخزين مرجع للوحدة
    this.loadedModules[moduleName] = window[`${moduleName}Module`];
    
    return this.loadedModules[moduleName];
  } catch (error) {
    console.error(`Error loading module ${moduleName}:`, error);
    throw error;
  }
}
```

## إدارة الحالة العامة

تتم إدارة حالة التطبيق من خلال خدمة البيانات المشتركة (shared-data.service.js) التي توفر نمط "Observer Pattern" (نمط المراقب):

1. تشترك الوحدات في التحديثات على البيانات التي تهتم بها.
2. عند تغيير البيانات، يتم إخطار جميع الوحدات المشتركة.
3. تقوم الوحدات بتحديث واجهتها بناءً على البيانات الجديدة.

مثال على الاشتراك في تحديثات البيانات:

```javascript
// في أحد مكونات التطبيق
constructor() {
  // الاشتراك في تحديثات بيانات المستخدم
  SharedDataService.subscribe('currentUser', this.handleUserUpdate.bind(this));
}

// دالة معالجة التحديثات
handleUserUpdate(userData) {
  // تحديث واجهة المستخدم بناءً على البيانات الجديدة
  this.updateUserInterface(userData);
}

// عند إزالة المكون
destroy() {
  // إلغاء الاشتراك لتجنب تسرب الذاكرة
  SharedDataService.unsubscribe('currentUser', this.handleUserUpdate);
}
```

## القواعد والمبادئ التوجيهية

### 1. مبادئ التصميم
- **مبدأ المسؤولية الواحدة (SRP)**: كل خدمة أو وحدة لها مسؤولية واحدة محددة.
- **مبدأ الفصل بين المخاوف (Separation of Concerns)**: فصل المنطق عن العرض عن البيانات.
- **مبدأ DRY (Don't Repeat Yourself)**: تجنب تكرار الكود وإعادة استخدام المكونات.

### 2. قواعد التسمية
- الملفات: `kebab-case.js` مثل `health-data.service.js`
- الفئات (Classes): `PascalCase` مثل `UserModel`
- الدوال والمتغيرات: `camelCase` مثل `getCurrentUser`
- الثوابت: `UPPER_SNAKE_CASE` مثل `MAX_RETRIES`

### 3. تنظيم الكود
- كل وحدة في مجلد خاص بها
- فصل CSS عن JavaScript
- استخدام التعليقات التوثيقية (JSDoc) للدوال والفئات

## خطة التطوير المستقبلية

1. **تحسينات الأداء**:
   - تحسين عملية تحميل الوحدات
   - تخزين مؤقت للبيانات المستخدمة بشكل متكرر

2. **توسيع وظائف التطبيق**:
   - إضافة المزيد من التحليلات والرسوم البيانية
   - تكامل مع الأجهزة القابلة للارتداء

3. **تحسين تجربة المستخدم**:
   - إضافة وضع عدم الاتصال (Offline Mode)
   - تحسين التوافق مع الأجهزة المختلفة

4. **الأمان والخصوصية**:
   - تحسين آليات المصادقة
   - تشفير البيانات الحساسة محليًا