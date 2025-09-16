# توثيق واجهات برمجة التطبيق (API Documentation)

## نظرة عامة

يوفر تطبيق "صحتك بالدنيا" مجموعة من واجهات البرمجة (APIs) من خلال الخدمات المركزية التي تتيح للمطورين التفاعل مع مختلف جوانب التطبيق. هذا المستند يوثق كيفية استخدام هذه الواجهات.

## الخدمات المتاحة

1. [خدمة Firebase](#خدمة-firebase)
2. [خدمة المصادقة](#خدمة-المصادقة)
3. [خدمة البيانات الصحية](#خدمة-البيانات-الصحية)
4. [خدمة التنقل](#خدمة-التنقل)
5. [خدمة إعدادات التطبيق](#خدمة-إعدادات-التطبيق)
6. [خدمة البيانات المشتركة](#خدمة-البيانات-المشتركة)

---

## خدمة Firebase

موقع الملف: `core/services/firebase.service.js`

### الوظائف المتاحة

#### `initializeFirebase()`
تهيئة الاتصال بخدمات Firebase.

```javascript
FirebaseService.initializeFirebase();
```

#### `getCollection(collectionName)`
الحصول على مرجع لمجموعة في Firestore.

```javascript
const usersCollection = FirebaseService.getCollection('users');
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة

**القيمة المُرجعة:**
- مرجع للمجموعة في Firestore

#### `getDocument(collectionName, docId)`
الحصول على مستند محدد من مجموعة.

```javascript
const userDoc = await FirebaseService.getDocument('users', 'user123');
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `docId` (string): معرف المستند

**القيمة المُرجعة:**
- وعد (Promise) يتحقق ببيانات المستند أو `null` إذا لم يوجد

#### `setDocument(collectionName, docId, data)`
إنشاء أو تحديث مستند.

```javascript
await FirebaseService.setDocument('users', 'user123', { name: 'أحمد', email: 'ahmed@example.com' });
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `docId` (string): معرف المستند
- `data` (object): البيانات المراد حفظها

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `updateDocument(collectionName, docId, data)`
تحديث حقول محددة في مستند موجود.

```javascript
await FirebaseService.updateDocument('users', 'user123', { lastLogin: new Date() });
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `docId` (string): معرف المستند
- `data` (object): الحقول المراد تحديثها

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `deleteDocument(collectionName, docId)`
حذف مستند.

```javascript
await FirebaseService.deleteDocument('tempData', 'session123');
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `docId` (string): معرف المستند

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `addDocument(collectionName, data)`
إضافة مستند جديد مع معرف تلقائي.

```javascript
const newDocRef = await FirebaseService.addDocument('measurements', { type: 'weight', value: 75 });
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `data` (object): بيانات المستند

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمرجع للمستند الجديد

#### `queryDocuments(collectionName, queryConstraints)`
البحث عن مستندات باستخدام قيود استعلام.

```javascript
const recentMeasurements = await FirebaseService.queryDocuments('measurements', [
  where('userId', '==', currentUserId),
  where('type', '==', 'bloodPressure'),
  orderBy('timestamp', 'desc'),
  limit(10)
]);
```

**المعلمات:**
- `collectionName` (string): اسم المجموعة
- `queryConstraints` (array): مصفوفة من قيود الاستعلام من Firebase

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمصفوفة من المستندات

---

## خدمة المصادقة

موقع الملف: `core/services/auth.service.js`

### الوظائف المتاحة

#### `login(email, password)`
تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور.

```javascript
try {
  const user = await AuthService.login('user@example.com', 'password123');
  console.log('تم تسجيل الدخول بنجاح:', user);
} catch (error) {
  console.error('خطأ في تسجيل الدخول:', error);
}
```

**المعلمات:**
- `email` (string): البريد الإلكتروني للمستخدم
- `password` (string): كلمة المرور

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمعلومات المستخدم

#### `register(email, password, userData)`
تسجيل مستخدم جديد.

```javascript
try {
  const newUser = await AuthService.register(
    'newuser@example.com',
    'securepass',
    {
      displayName: 'مستخدم جديد',
      gender: 'ذكر',
      dateOfBirth: '1990-01-01'
    }
  );
  console.log('تم التسجيل بنجاح:', newUser);
} catch (error) {
  console.error('خطأ في التسجيل:', error);
}
```

**المعلمات:**
- `email` (string): البريد الإلكتروني للمستخدم
- `password` (string): كلمة المرور
- `userData` (object): بيانات إضافية للمستخدم

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمعلومات المستخدم الجديد

#### `logout()`
تسجيل الخروج من التطبيق.

```javascript
await AuthService.logout();
console.log('تم تسجيل الخروج بنجاح');
```

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `getCurrentUser()`
الحصول على معلومات المستخدم الحالي.

```javascript
const currentUser = AuthService.getCurrentUser();
if (currentUser) {
  console.log('المستخدم الحالي:', currentUser.displayName);
} else {
  console.log('لا يوجد مستخدم مسجل الدخول');
}
```

**القيمة المُرجعة:**
- كائن المستخدم الحالي أو `null` إذا لم يكن هناك مستخدم مسجل الدخول

#### `isLoggedIn()`
التحقق مما إذا كان المستخدم مسجل الدخول.

```javascript
if (AuthService.isLoggedIn()) {
  // المستخدم مسجل الدخول
} else {
  // المستخدم غير مسجل الدخول
  window.location.href = 'login.html';
}
```

**القيمة المُرجعة:**
- قيمة منطقية (boolean) تشير إلى حالة تسجيل الدخول

#### `sendPasswordReset(email)`
إرسال رسالة إعادة تعيين كلمة المرور.

```javascript
try {
  await AuthService.sendPasswordReset('user@example.com');
  console.log('تم إرسال رسالة إعادة تعيين كلمة المرور');
} catch (error) {
  console.error('خطأ في إرسال رسالة إعادة التعيين:', error);
}
```

**المعلمات:**
- `email` (string): البريد الإلكتروني للمستخدم

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `updateProfile(userData)`
تحديث معلومات الملف الشخصي للمستخدم.

```javascript
try {
  await AuthService.updateProfile({
    displayName: 'الاسم الجديد',
    photoURL: 'https://example.com/new-photo.jpg'
  });
  console.log('تم تحديث الملف الشخصي بنجاح');
} catch (error) {
  console.error('خطأ في تحديث الملف الشخصي:', error);
}
```

**المعلمات:**
- `userData` (object): البيانات المراد تحديثها

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

---

## خدمة البيانات الصحية

موقع الملف: `core/services/health-data.service.js`

### الوظائف المتاحة

#### `getMeasurements(type, period)`
الحصول على قياسات صحية حسب النوع والفترة.

```javascript
const weightData = await HealthDataService.getMeasurements('weight', 'month');
```

**المعلمات:**
- `type` (string): نوع القياس ('weight', 'bloodPressure', 'bloodSugar', إلخ)
- `period` (string, اختياري): الفترة الزمنية ('day', 'week', 'month', 'year')

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمصفوفة من القياسات

#### `addMeasurement(data)`
إضافة قياس صحي جديد.

```javascript
await HealthDataService.addMeasurement({
  type: 'bloodPressure',
  systolic: 120,
  diastolic: 80,
  timestamp: new Date(),
  notes: 'بعد التمرين'
});
```

**المعلمات:**
- `data` (object): بيانات القياس

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمعرف القياس الجديد

#### `getMedicalTests()`
الحصول على التحاليل الطبية للمستخدم.

```javascript
const tests = await HealthDataService.getMedicalTests();
```

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمصفوفة من التحاليل الطبية

#### `addMedicalTest(data)`
إضافة تحليل طبي جديد.

```javascript
await HealthDataService.addMedicalTest({
  name: 'تحليل الدم الشامل',
  date: new Date(),
  results: {
    hemoglobin: 14.5,
    whiteBloodCells: 7500,
    // ... نتائج أخرى
  },
  labName: 'معمل التحاليل المركزي',
  doctorName: 'د. محمد علي'
});
```

**المعلمات:**
- `data` (object): بيانات التحليل

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `getMedications(active)`
الحصول على الأدوية الخاصة بالمستخدم.

```javascript
const activeMeds = await HealthDataService.getMedications(true); // فقط الأدوية النشطة
const allMeds = await HealthDataService.getMedications(); // جميع الأدوية
```

**المعلمات:**
- `active` (boolean, اختياري): إذا كانت `true`، يتم استرجاع الأدوية النشطة فقط

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بمصفوفة من الأدوية

#### `addMedication(data)`
إضافة دواء جديد.

```javascript
await HealthDataService.addMedication({
  name: 'باراسيتامول',
  dosage: '500mg',
  frequency: 'مرتين يومياً',
  startDate: new Date(),
  active: true,
  reason: 'خافض للحرارة'
});
```

**المعلمات:**
- `data` (object): بيانات الدواء

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال العملية

#### `getMedicalProfile()`
الحصول على الملف الطبي الكامل للمستخدم.

```javascript
const medicalProfile = await HealthDataService.getMedicalProfile();
```

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بالملف الطبي للمستخدم

---

## خدمة التنقل

موقع الملف: `core/services/navigation.service.js`

### الوظائف المتاحة

#### `navigateTo(page, params)`
الانتقال إلى صفحة معينة في التطبيق.

```javascript
NavigationService.navigateTo('medical-file/medical-tests');
```

مثال مع معلمات:
```javascript
NavigationService.navigateTo('medical-file/medical-tests', { filter: 'recent' });
```

**المعلمات:**
- `page` (string): مسار الصفحة المراد الانتقال إليها
- `params` (object, اختياري): معلمات إضافية للصفحة

#### `loadComponent(container, component)`
تحميل مكوّن في حاوية معينة.

```javascript
NavigationService.loadComponent(
  document.getElementById('main-content'),
  'nutrition/calories-calculator'
);
```

**المعلمات:**
- `container` (HTMLElement): عنصر HTML سيتم تحميل المكوّن فيه
- `component` (string): مسار المكوّن المراد تحميله

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال تحميل المكوّن

#### `initSidebar()`
تهيئة الشريط الجانبي وتفعيل التنقل.

```javascript
NavigationService.initSidebar();
```

#### `handleBackNavigation()`
التعامل مع زر الرجوع.

```javascript
NavigationService.handleBackNavigation();
```

#### `getQueryParams()`
الحصول على معلمات URL الحالي.

```javascript
const params = NavigationService.getQueryParams();
if (params.id) {
  // استخدام معرف العنصر
}
```

**القيمة المُرجعة:**
- كائن يحتوي على معلمات URL

#### `setPageTitle(title)`
تعيين عنوان الصفحة الحالية.

```javascript
NavigationService.setPageTitle('حاسبة السعرات الحرارية');
```

**المعلمات:**
- `title` (string): عنوان الصفحة الجديد

---

## خدمة إعدادات التطبيق

موقع الملف: `core/services/app-settings.service.js`

### الوظائف المتاحة

#### `getSettings()`
الحصول على إعدادات التطبيق الحالية.

```javascript
const settings = await AppSettingsService.getSettings();
console.log('لغة التطبيق:', settings.language);
```

**القيمة المُرجعة:**
- وعد (Promise) يتحقق بكائن الإعدادات

#### `updateSettings(settings)`
تحديث إعدادات التطبيق.

```javascript
await AppSettingsService.updateSettings({
  theme: 'dark',
  notifications: {
    enabled: true,
    reminders: true
  }
});
```

**المعلمات:**
- `settings` (object): الإعدادات المراد تحديثها

**القيمة المُرجعة:**
- وعد (Promise) يتحقق عند اكتمال التحديث

#### `getTheme()`
الحصول على سمة التطبيق الحالية.

```javascript
const theme = AppSettingsService.getTheme();
if (theme === 'dark') {
  // تطبيق الوضع الداكن
}
```

**القيمة المُرجعة:**
- سلسلة نصية تمثل السمة الحالية ('light', 'dark')

#### `setTheme(theme)`
تغيير سمة التطبيق.

```javascript
AppSettingsService.setTheme('dark');
```

**المعلمات:**
- `theme` (string): اسم السمة ('light', 'dark')

#### `getLanguage()`
الحصول على لغة التطبيق الحالية.

```javascript
const language = AppSettingsService.getLanguage();
```

**القيمة المُرجعة:**
- سلسلة نصية تمثل رمز اللغة ('ar', 'en')

#### `setLanguage(lang)`
تغيير لغة التطبيق.

```javascript
AppSettingsService.setLanguage('ar');
```

**المعلمات:**
- `lang` (string): رمز اللغة ('ar', 'en')

---

## خدمة البيانات المشتركة

موقع الملف: `core/services/shared-data.service.js`

### الوظائف المتاحة

#### `setData(key, value)`
تخزين بيانات في الذاكرة المشتركة.

```javascript
SharedDataService.setData('selectedDate', new Date());
```

**المعلمات:**
- `key` (string): المفتاح الذي سيتم استخدامه للوصول إلى البيانات
- `value` (any): القيمة التي سيتم تخزينها

#### `getData(key)`
استرجاع بيانات من الذاكرة المشتركة.

```javascript
const selectedDate = SharedDataService.getData('selectedDate');
```

**المعلمات:**
- `key` (string): مفتاح البيانات

**القيمة المُرجعة:**
- القيمة المخزنة أو `undefined` إذا لم توجد

#### `clearData(key)`
مسح بيانات من الذاكرة المشتركة.

```javascript
SharedDataService.clearData('temporaryData');
```

**المعلمات:**
- `key` (string): مفتاح البيانات المراد مسحها

#### `subscribe(key, callback)`
الاشتراك للحصول على تحديثات عند تغيير بيانات معينة.

```javascript
const handleUserChange = (userData) => {
  console.log('تم تغيير بيانات المستخدم:', userData);
  // تحديث واجهة المستخدم
};

SharedDataService.subscribe('currentUser', handleUserChange);
```

**المعلمات:**
- `key` (string): مفتاح البيانات المراد مراقبتها
- `callback` (function): الدالة التي سيتم استدعاؤها عند تغيير البيانات

**القيمة المُرجعة:**
- معرف الاشتراك (يستخدم لإلغاء الاشتراك لاحقًا)

#### `unsubscribe(key, callback)`
إلغاء الاشتراك من تحديثات البيانات.

```javascript
SharedDataService.unsubscribe('currentUser', handleUserChange);
```

**المعلمات:**
- `key` (string): مفتاح البيانات
- `callback` (function): الدالة التي تم تسجيلها مسبقًا

## أمثلة على الاستخدام

### مثال: تسجيل الدخول وتحميل البيانات الشخصية

```javascript
// تسجيل الدخول
async function loginAndLoadData() {
  try {
    // تسجيل الدخول
    const user = await AuthService.login(email, password);
    
    // تحميل الملف الشخصي
    const medicalProfile = await HealthDataService.getMedicalProfile();
    
    // تخزين البيانات للمشاركة مع بقية التطبيق
    SharedDataService.setData('currentUser', user);
    SharedDataService.setData('medicalProfile', medicalProfile);
    
    // الانتقال إلى الصفحة الرئيسية
    NavigationService.navigateTo('main');
    
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    // عرض رسالة خطأ للمستخدم
  }
}
```

### مثال: إضافة قياس جديد وتحديث الرسم البياني

```javascript
async function addNewMeasurementAndUpdateChart() {
  try {
    // إضافة قياس وزن جديد
    await HealthDataService.addMeasurement({
      type: 'weight',
      value: 75.5,
      timestamp: new Date(),
      notes: 'بعد شهر من الرجيم'
    });
    
    // إعادة تحميل بيانات الوزن للشهر الحالي
    const weightData = await HealthDataService.getMeasurements('weight', 'month');
    
    // تحديث الرسم البياني (على افتراض وجود دالة لتحديث الرسم البياني)
    updateWeightChart(weightData);
    
    // إخطار الأجزاء الأخرى من التطبيق بالتغيير
    SharedDataService.setData('latestWeight', weightData[weightData.length - 1]);
    
  } catch (error) {
    console.error('خطأ في إضافة القياس:', error);
    // عرض رسالة خطأ للمستخدم
  }
}
```

### مثال: تحديث إعدادات التطبيق

```javascript
async function updateAppSettings() {
  try {
    // الحصول على الإعدادات الحالية
    const currentSettings = await AppSettingsService.getSettings();
    
    // تحديث الإعدادات مع الحفاظ على القيم الحالية التي لم تتغير
    await AppSettingsService.updateSettings({
      ...currentSettings,
      theme: 'dark',
      notifications: {
        ...currentSettings.notifications,
        reminders: true
      }
    });
    
    // تطبيق السمة الجديدة
    AppSettingsService.setTheme('dark');
    
    // عرض رسالة نجاح
    showNotification('تم تحديث الإعدادات بنجاح');
    
  } catch (error) {
    console.error('خطأ في تحديث الإعدادات:', error);
    // عرض رسالة خطأ للمستخدم
  }
}
```