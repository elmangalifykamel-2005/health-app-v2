# دليل تطوير الوحدات (Modules Development Guide)

## نظرة عامة

يوفر هذا الدليل إرشادات شاملة حول كيفية إنشاء وتطوير وحدات جديدة لتطبيق "صحتك بالدنيا". يعتمد التطبيق على هيكل موجه للوحدات (Module-based Architecture) يسمح بتطوير وإضافة وحدات جديدة بسهولة.

## مفهوم الوحدات في التطبيق

كل وحدة (Module) في التطبيق عبارة عن مجموعة مستقلة من الملفات والأكواد التي تقدم وظيفة محددة. تتميز الوحدات بأنها:

1. **مستقلة**: يمكن تطويرها واختبارها بشكل منفصل
2. **قابلة لإعادة الاستخدام**: تعتمد على واجهات برمجة موحدة
3. **قابلة للتوسع**: يمكن إضافة ميزات جديدة إليها بسهولة
4. **متكاملة**: تتفاعل مع الوحدات الأخرى عبر الخدمات المركزية

## هيكل الوحدة

يجب أن تتبع كل وحدة الهيكل التالي:

```
modules/
└── [module-name]/                 # اسم الوحدة باللغة الإنجليزية
    ├── index.html                 # الصفحة الرئيسية للوحدة
    ├── [module-name].js           # ملف JavaScript الرئيسي
    ├── [module-name]-data.js      # بيانات الوحدة (اختياري)
    ├── [module-name]-styles.css   # أنماط CSS الخاصة بالوحدة
    ├── components/                # مكونات فرعية (اختياري)
    │   ├── [component-name].js
    │   └── [component-name].html
    ├── assets/                    # موارد الوحدة (اختياري)
    │   ├── images/
    │   └── icons/
    └── sub-pages/                 # صفحات فرعية (اختياري)
        ├── [sub-page-1].html
        └── [sub-page-2].html
```

## إنشاء وحدة جديدة

### الخطوة 1: إنشاء هيكل الملفات

قم بإنشاء مجلد جديد باسم الوحدة في مجلد `modules/`. على سبيل المثال، لإنشاء وحدة "التمارين":

```
modules/
└── exercise/
    ├── index.html
    ├── exercise.js
    ├── exercise-data.js
    ├── exercise-styles.css
    └── sub-pages/
        ├── workout-plans.html
        └── exercise-tracker.html
```

### الخطوة 2: إنشاء الصفحة الرئيسية

قم بإنشاء ملف `index.html` الذي سيكون نقطة الدخول للوحدة:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التمارين الرياضية - صحتك بالدنيا</title>
    <link rel="stylesheet" href="../../core/styles/main.css">
    <link rel="stylesheet" href="./exercise-styles.css">
</head>
<body>
    <div class="module-container">
        <header class="module-header">
            <h1>التمارين الرياضية</h1>
            <p class="module-description">تتبع تمارينك الرياضية وخطط التدريب الخاصة بك</p>
        </header>
        
        <div class="module-navigation">
            <a href="#" class="nav-item active" data-page="main">الرئيسية</a>
            <a href="#" class="nav-item" data-page="workout-plans">خطط التمارين</a>
            <a href="#" class="nav-item" data-page="exercise-tracker">متتبع التمارين</a>
        </div>
        
        <main id="module-content">
            <div class="dashboard">
                <!-- محتوى لوحة المعلومات الرئيسية -->
                <div class="card">
                    <h2>ملخص النشاط</h2>
                    <div id="activity-summary">
                        <!-- سيتم تحميل البيانات ديناميكياً -->
                    </div>
                </div>
                
                <div class="card">
                    <h2>التمارين المقترحة</h2>
                    <div id="suggested-exercises">
                        <!-- سيتم تحميل البيانات ديناميكياً -->
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <!-- استيراد الملفات المطلوبة -->
    <script src="../../core/services/firebase.service.js"></script>
    <script src="../../core/services/auth.service.js"></script>
    <script src="../../core/services/navigation.service.js"></script>
    <script src="../../core/services/shared-data.service.js"></script>
    <script src="./exercise-data.js"></script>
    <script src="./exercise.js"></script>
</body>
</html>
```

### الخطوة 3: إنشاء ملف JavaScript الرئيسي

قم بإنشاء ملف `[module-name].js` الذي سيحتوي على منطق الوحدة:

```javascript
/**
 * وحدة التمارين الرياضية
 * تمكن المستخدمين من تتبع التمارين الرياضية وإدارة خطط التدريب
 */

// إنشاء نطاق خاص للوحدة لتجنب تلوث النطاق العام
const ExerciseModule = (function() {
    // المتغيرات الخاصة بالوحدة
    let currentUser = null;
    let currentPage = 'main';
    let userExercises = [];
    
    // تهيئة الوحدة
    function init() {
        // التحقق من تسجيل الدخول
        AuthService.getCurrentUser().then(user => {
            if (user) {
                currentUser = user;
                loadUserData();
                setupEventListeners();
            } else {
                // توجيه المستخدم إلى صفحة تسجيل الدخول
                NavigationService.navigateTo('login');
            }
        });
    }
    
    // تحميل بيانات المستخدم
    async function loadUserData() {
        try {
            // تحميل بيانات التمارين للمستخدم
            const exerciseData = await FirebaseService.queryDocuments('exerciseData', [
                ['userId', '==', currentUser.uid],
                ['orderBy', 'timestamp', 'desc']
            ]);
            
            userExercises = exerciseData;
            renderDashboard();
        } catch (error) {
            console.error('خطأ في تحميل بيانات التمارين:', error);
            // عرض رسالة خطأ للمستخدم
        }
    }
    
    // إعداد أحداث النقر
    function setupEventListeners() {
        // التنقل بين صفحات الوحدة
        document.querySelectorAll('.module-navigation .nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                navigateTo(page);
            });
        });
        
        // أحداث أخرى خاصة بالوحدة
    }
    
    // التنقل بين صفحات الوحدة
    function navigateTo(page) {
        if (page === currentPage) return;
        
        // تحديث حالة التنقل
        document.querySelectorAll('.module-navigation .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.module-navigation .nav-item[data-page="${page}"]`).classList.add('active');
        
        currentPage = page;
        
        // تحميل محتوى الصفحة
        if (page === 'main') {
            renderDashboard();
        } else {
            loadSubPage(page);
        }
    }
    
    // تحميل صفحة فرعية
    async function loadSubPage(page) {
        const contentContainer = document.getElementById('module-content');
        
        try {
            // تحميل محتوى الصفحة الفرعية
            const response = await fetch(`./sub-pages/${page}.html`);
            if (!response.ok) throw new Error(`فشل تحميل الصفحة: ${response.status}`);
            
            const html = await response.text();
            contentContainer.innerHTML = html;
            
            // تهيئة الصفحة الفرعية
            switch (page) {
                case 'workout-plans':
                    initWorkoutPlans();
                    break;
                case 'exercise-tracker':
                    initExerciseTracker();
                    break;
            }
        } catch (error) {
            console.error('خطأ في تحميل الصفحة الفرعية:', error);
            contentContainer.innerHTML = `
                <div class="error-message">
                    <h2>خطأ في تحميل الصفحة</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
    
    // عرض لوحة المعلومات الرئيسية
    function renderDashboard() {
        // عرض ملخص النشاط
        const activitySummary = document.getElementById('activity-summary');
        if (activitySummary) {
            const summary = calculateActivitySummary();
            activitySummary.innerHTML = `
                <div class="summary-stats">
                    <div class="stat-item">
                        <span class="stat-value">${summary.weeklyWorkouts}</span>
                        <span class="stat-label">تمارين هذا الأسبوع</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${summary.totalMinutes}</span>
                        <span class="stat-label">دقائق التمارين</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${summary.caloriesBurned}</span>
                        <span class="stat-label">سعرات حرارية</span>
                    </div>
                </div>
                <div id="activity-chart" class="chart-container">
                    <!-- سيتم إضافة الرسم البياني هنا -->
                </div>
            `;
            
            // إنشاء الرسم البياني
            createActivityChart();
        }
        
        // عرض التمارين المقترحة
        const suggestedExercises = document.getElementById('suggested-exercises');
        if (suggestedExercises) {
            const suggestions = getSuggestedExercises();
            suggestedExercises.innerHTML = suggestions.map(exercise => `
                <div class="exercise-item">
                    <div class="exercise-icon"><i class="icon-${exercise.type}"></i></div>
                    <div class="exercise-details">
                        <h3>${exercise.name}</h3>
                        <p>${exercise.description}</p>
                        <div class="exercise-meta">
                            <span>${exercise.duration} دقيقة</span>
                            <span>${exercise.difficulty}</span>
                        </div>
                    </div>
                    <button class="btn-secondary" data-exercise-id="${exercise.id}">بدء</button>
                </div>
            `).join('');
            
            // إضافة أحداث النقر على أزرار التمارين
            suggestedExercises.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', () => {
                    const exerciseId = button.getAttribute('data-exercise-id');
                    startExercise(exerciseId);
                });
            });
        }
    }
    
    // حساب ملخص النشاط
    function calculateActivitySummary() {
        // في الواقع، ستقوم بحساب هذه القيم من بيانات المستخدم
        return {
            weeklyWorkouts: 3,
            totalMinutes: 120,
            caloriesBurned: 450
        };
    }
    
    // إنشاء الرسم البياني للنشاط
    function createActivityChart() {
        // هنا ستستخدم مكتبة رسوم بيانية مثل Chart.js
        // هذه مجرد وظيفة وهمية
        console.log('تم إنشاء الرسم البياني');
    }
    
    // الحصول على التمارين المقترحة
    function getSuggestedExercises() {
        // في الواقع، ستقوم بالحصول على هذه البيانات من الخادم أو من بيانات الوحدة
        return exerciseData.getSuggestedExercises();
    }
    
    // بدء تمرين محدد
    function startExercise(exerciseId) {
        // توجيه المستخدم إلى صفحة التتبع مع معرف التمرين
        navigateTo('exercise-tracker');
        
        // إرسال معلومات التمرين إلى الصفحة الفرعية
        SharedDataService.setData('selectedExercise', exerciseId);
    }
    
    // تهيئة صفحة خطط التدريب
    function initWorkoutPlans() {
        console.log('تم تهيئة صفحة خطط التدريب');
        // هنا يتم وضع الكود الخاص بصفحة خطط التدريب
    }
    
    // تهيئة صفحة متتبع التمارين
    function initExerciseTracker() {
        console.log('تم تهيئة صفحة متتبع التمارين');
        // هنا يتم وضع الكود الخاص بصفحة متتبع التمارين
        
        // التحقق من وجود تمرين محدد
        const selectedExercise = SharedDataService.getData('selectedExercise');
        if (selectedExercise) {
            // تحميل بيانات التمرين المحدد
            loadExerciseDetails(selectedExercise);
        }
    }
    
    // تحميل تفاصيل التمرين
    function loadExerciseDetails(exerciseId) {
        // تحميل تفاصيل التمرين من البيانات
        const exercise = exerciseData.getExerciseById(exerciseId);
        if (exercise) {
            document.getElementById('exercise-name').textContent = exercise.name;
            // تحميل المزيد من التفاصيل
        }
    }
    
    // الواجهة العامة للوحدة
    return {
        init: init,
        navigateTo: navigateTo
    };
})();

// تهيئة الوحدة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    ExerciseModule.init();
});

// تسجيل الوحدة في النظام العام
window.ExerciseModule = ExerciseModule;
```

### الخطوة 4: إنشاء ملف البيانات

قم بإنشاء ملف `[module-name]-data.js` الذي سيحتوي على بيانات الوحدة:

```javascript
/**
 * بيانات وحدة التمارين الرياضية
 * يحتوي على البيانات والوظائف المرتبطة ببيانات التمارين
 */

const exerciseData = (function() {
    // بيانات التمارين المتاحة
    const exercises = [
        {
            id: 'ex1',
            name: 'تمارين اللياقة القلبية',
            type: 'cardio',
            description: 'مجموعة من تمارين اللياقة القلبية لتحسين صحة القلب والأوعية الدموية',
            duration: 30,
            difficulty: 'متوسط',
            caloriesBurn: 250,
            instructions: [
                'ابدأ بالإحماء لمدة 5 دقائق',
                'قم بالجري في المكان لمدة 3 دقائق',
                'قم بتمارين القفز لمدة دقيقتين',
                'استرح لمدة 30 ثانية',
                'كرر التمارين 3 مرات'
            ],
            videoURL: 'https://example.com/cardio-workout'
        },
        {
            id: 'ex2',
            name: 'تمارين القوة',
            type: 'strength',
            description: 'تمارين لبناء العضلات وزيادة القوة العامة للجسم',
            duration: 45,
            difficulty: 'صعب',
            caloriesBurn: 350,
            instructions: [
                'ابدأ بتسخين العضلات لمدة 5 دقائق',
                'قم بتمارين الضغط 3 مجموعات، 15 تكرارًا',
                'قم بتمارين القرفصاء 3 مجموعات، 12 تكرارًا',
                'قم بتمارين البطن 3 مجموعات، 20 تكرارًا',
                'استرح بين كل مجموعة لمدة دقيقة واحدة'
            ],
            videoURL: 'https://example.com/strength-workout'
        },
        {
            id: 'ex3',
            name: 'تمارين المرونة',
            type: 'flexibility',
            description: 'تمارين تمدد لزيادة مرونة الجسم وتقليل الإصابات',
            duration: 20,
            difficulty: 'سهل',
            caloriesBurn: 120,
            instructions: [
                'خذ نفسًا عميقًا وابدأ بوضعية مريحة',
                'قم بتمديد عضلات الساقين لمدة 30 ثانية لكل ساق',
                'قم بتمديد عضلات الظهر برفق',
                'قم بتمديد عضلات الكتفين والرقبة',
                'حافظ على كل وضعية لمدة 30 ثانية على الأقل'
            ],
            videoURL: 'https://example.com/flexibility-workout'
        }
    ];
    
    // خطط التدريب المتاحة
    const workoutPlans = [
        {
            id: 'plan1',
            name: 'خطة اللياقة للمبتدئين',
            description: 'خطة تدريبية مدتها 4 أسابيع للمبتدئين في التمارين الرياضية',
            level: 'مبتدئ',
            duration: '4 أسابيع',
            schedule: {
                week1: [
                    { day: 'الاثنين', exercises: ['ex1'], duration: 20 },
                    { day: 'الأربعاء', exercises: ['ex3'], duration: 15 },
                    { day: 'الجمعة', exercises: ['ex1'], duration: 20 }
                ],
                week2: [
                    { day: 'الاثنين', exercises: ['ex1'], duration: 25 },
                    { day: 'الأربعاء', exercises: ['ex3', 'ex1'], duration: 30 },
                    { day: 'الجمعة', exercises: ['ex1'], duration: 25 }
                ],
                // أسابيع إضافية...
            }
        },
        {
            id: 'plan2',
            name: 'خطة بناء العضلات',
            description: 'خطة تدريبية لبناء العضلات وزيادة القوة',
            level: 'متقدم',
            duration: '8 أسابيع',
            schedule: {
                // جدول التمارين...
            }
        }
    ];
    
    // الحصول على التمارين المقترحة
    function getSuggestedExercises() {
        // في الواقع، ستقوم بتخصيص الاقتراحات بناءً على بيانات المستخدم
        return exercises.slice(0, 3);
    }
    
    // الحصول على تمرين محدد بواسطة المعرف
    function getExerciseById(id) {
        return exercises.find(exercise => exercise.id === id);
    }
    
    // الحصول على خطة تدريب محددة بواسطة المعرف
    function getWorkoutPlanById(id) {
        return workoutPlans.find(plan => plan.id === id);
    }
    
    // الحصول على جميع التمارين
    function getAllExercises() {
        return [...exercises];
    }
    
    // الحصول على جميع خطط التدريب
    function getAllWorkoutPlans() {
        return [...workoutPlans];
    }
    
    // البحث عن تمارين بالاسم أو النوع
    function searchExercises(query) {
        query = query.toLowerCase();
        return exercises.filter(exercise => 
            exercise.name.toLowerCase().includes(query) || 
            exercise.type.toLowerCase().includes(query) ||
            exercise.description.toLowerCase().includes(query)
        );
    }
    
    // الواجهة العامة
    return {
        getSuggestedExercises,
        getExerciseById,
        getWorkoutPlanById,
        getAllExercises,
        getAllWorkoutPlans,
        searchExercises
    };
})();
```

### الخطوة 5: إنشاء ملف الأنماط

قم بإنشاء ملف `[module-name]-styles.css` للأنماط الخاصة بالوحدة:

```css
/**
 * أنماط وحدة التمارين الرياضية
 */

/* هيكل الصفحة */
.module-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
}

.module-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
}

.module-description {
    color: var(--text-secondary);
    font-size: var(--font-size-md);
    max-width: 600px;
    margin: 0 auto;
}

/* التنقل داخل الوحدة */
.module-navigation {
    display: flex;
    background-color: var(--bg-card);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    margin-bottom: var(--spacing-md);
}

.module-navigation .nav-item {
    flex: 1;
    padding: var(--spacing-md);
    text-align: center;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-speed) var(--transition-timing);
}

.module-navigation .nav-item:hover {
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.module-navigation .nav-item.active {
    background-color: var(--color-primary);
    color: var(--color-white);
}

/* لوحة المعلومات */
.dashboard {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
}

@media (min-width: 768px) {
    .dashboard {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ملخص النشاط */
.summary-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
    border-radius: var(--border-radius-sm);
}

.stat-value {
    font-family: var(--font-family-data);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
}

.stat-label {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

.chart-container {
    height: 200px;
    margin-top: var(--spacing-md);
}

/* التمارين المقترحة */
.exercise-item {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-gray-200);
    align-items: center;
}

.exercise-item:last-child {
    border-bottom: none;
}

.exercise-icon {
    width: 48px;
    height: 48px;
    background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
    border-radius: var(--border-radius-circle);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
}

.exercise-details {
    flex: 1;
}

.exercise-details h3 {
    margin: 0 0 var(--spacing-xs);
    font-size: var(--font-size-md);
}

.exercise-details p {
    margin: 0 0 var(--spacing-xs);
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
}

.exercise-meta {
    display: flex;
    gap: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

/* خطط التمرين */
.workout-plan {
    margin-bottom: var(--spacing-lg);
}

.workout-plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.workout-plan-level {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    background-color: var(--color-secondary);
    color: var(--color-white);
}

.workout-schedule {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}

.schedule-day {
    background-color: var(--bg-card);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-sm);
    text-align: center;
    box-shadow: var(--shadow-sm);
}

.schedule-day-name {
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
}

.schedule-exercises {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

/* متتبع التمارين */
.exercise-tracker {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.exercise-timer {
    font-family: var(--font-family-data);
    font-size: var(--font-size-xxl);
    text-align: center;
    margin: var(--spacing-md) 0;
}

.exercise-progress {
    height: 8px;
    background-color: var(--color-gray-200);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    margin: var(--spacing-md) 0;
}

.exercise-progress-bar {
    height: 100%;
    background-color: var(--color-primary);
    width: 0; /* سيتم تحديثه بواسطة JavaScript */
    transition: width 0.5s ease;
}

.exercise-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin: var(--spacing-md) 0;
}

/* الرسائل */
.error-message {
    background-color: color-mix(in srgb, var(--color-error) 10%, transparent);
    color: var(--color-error);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md);
    margin: var(--spacing-md) 0;
    text-align: center;
}
```

### الخطوة 6: إنشاء الصفحات الفرعية

قم بإنشاء الصفحات الفرعية في مجلد `sub-pages/`:

**workout-plans.html**:
```html
<div class="workout-plans-container">
    <h2>خطط التمارين الرياضية</h2>
    <p class="section-description">اختر خطة التمارين المناسبة لأهدافك ومستوى لياقتك</p>
    
    <div class="filter-bar">
        <select id="plan-level-filter">
            <option value="all">جميع المستويات</option>
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">متقدم</option>
        </select>
        
        <select id="plan-duration-filter">
            <option value="all">جميع المدد</option>
            <option value="short">قصير (1-4 أسابيع)</option>
            <option value="medium">متوسط (4-8 أسابيع)</option>
            <option value="long">طويل (8+ أسابيع)</option>
        </select>
        
        <input type="text" id="plan-search" placeholder="البحث عن خطط التمارين...">
    </div>
    
    <div id="workout-plans-list">
        <!-- سيتم تعبئة هذا القسم ديناميكياً -->
    </div>
</div>
```

**exercise-tracker.html**:
```html
<div class="exercise-tracker">
    <h2 id="exercise-name">تتبع التمارين</h2>
    
    <div class="exercise-timer">00:00</div>
    
    <div class="exercise-progress">
        <div class="exercise-progress-bar"></div>
    </div>
    
    <div class="exercise-instructions">
        <h3>التعليمات</h3>
        <ul id="exercise-steps">
            <!-- سيتم تعبئة هذا القسم ديناميكياً -->
        </ul>
    </div>
    
    <div class="exercise-actions">
        <button id="btn-start" class="btn btn-primary">ابدأ</button>
        <button id="btn-pause" class="btn btn-secondary" disabled>إيقاف مؤقت</button>
        <button id="btn-reset" class="btn btn-secondary" disabled>إعادة</button>
    </div>
    
    <div class="exercise-stats">
        <div class="stat-item">
            <span class="stat-label">مدة التمرين</span>
            <span id="exercise-duration" class="stat-value">0</span>
            <span class="stat-unit">دقيقة</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">السعرات الحرارية</span>
            <span id="exercise-calories" class="stat-value">0</span>
            <span class="stat-unit">سعرة</span>
        </div>
    </div>
</div>
```

### الخطوة 7: تسجيل الوحدة في التطبيق الرئيسي

قم بتحديث ملف `sidebar.html` لإضافة رابط للوحدة الجديدة:

```html
<!-- إضافة رابط في الشريط الجانبي -->
<a href="#" class="sidebar-item" data-module="exercise">
    <i class="icon-exercise"></i>
    <span>التمارين الرياضية</span>
</a>
```

## ربط الوحدة بالخدمات المركزية

### التفاعل مع خدمة Firebase

لتخزين واسترجاع بيانات التمارين، استخدم خدمة Firebase:

```javascript
// حفظ سجل تمرين جديد
async function saveExerciseLog(exerciseLog) {
    try {
        const userId = AuthService.getCurrentUser().uid;
        return await FirebaseService.addDocument('exerciseLogs', {
            userId: userId,
            ...exerciseLog,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('خطأ في حفظ سجل التمرين:', error);
        throw error;
    }
}

// استرجاع سجلات التمارين
async function getExerciseLogs(days = 30) {
    try {
        const userId = AuthService.getCurrentUser().uid;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        return await FirebaseService.queryDocuments('exerciseLogs', [
            ['userId', '==', userId],
            ['timestamp', '>=', startDate],
            ['orderBy', 'timestamp', 'desc']
        ]);
    } catch (error) {
        console.error('خطأ في استرجاع سجلات التمارين:', error);
        throw error;
    }
}
```

### التفاعل مع خدمة المصادقة

للتحقق من حالة تسجيل المستخدم:

```javascript
// التحقق من تسجيل الدخول قبل استخدام الوحدة
function checkAuthStatus() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        NavigationService.navigateTo('login', { 
            redirectTo: 'modules/exercise' 
        });
        return false;
    }
    return true;
}
```

### التفاعل مع خدمة البيانات المشتركة

لتبادل البيانات مع الوحدات الأخرى:

```javascript
// مشاركة بيانات نشاط التمارين مع وحدة الصحة العامة
function shareExerciseActivity(activityData) {
    SharedDataService.setData('latestExerciseActivity', activityData);
}

// الاستماع للتغييرات في بيانات الوزن من وحدة القياسات
function listenToWeightChanges() {
    SharedDataService.subscribe('weightMeasurement', (weightData) => {
        // تحديث توصيات التمارين بناءً على الوزن الجديد
        updateExerciseRecommendations(weightData);
    });
}
```

## اختبار الوحدة

### اختبار وظائف الوحدة

قم بإنشاء ملف اختبار بسيط للتأكد من عمل وظائف الوحدة:

```javascript
// اختبار وحدة التمارين
function testExerciseModule() {
    console.group('اختبار وحدة التمارين');
    
    // اختبار استرجاع التمارين
    const exercises = exerciseData.getAllExercises();
    console.log('عدد التمارين المتاحة:', exercises.length);
    console.assert(exercises.length > 0, 'يجب أن تحتوي قائمة التمارين على عناصر');
    
    // اختبار البحث عن تمارين
    const cardioExercises = exerciseData.searchExercises('cardio');
    console.log('عدد تمارين الكارديو:', cardioExercises.length);
    console.assert(cardioExercises.length > 0, 'يجب أن توجد تمارين كارديو');
    
    // اختبار الحصول على تمرين محدد
    const exercise = exerciseData.getExerciseById('ex1');
    console.log('تم العثور على التمرين:', exercise ? exercise.name : 'غير موجود');
    console.assert(exercise, 'يجب العثور على التمرين بالمعرف ex1');
    
    console.groupEnd();
}

// تشغيل الاختبارات
// testExerciseModule();
```

### قائمة تحقق قبل إضافة الوحدة

قبل إضافة الوحدة إلى التطبيق، تأكد من:

1. ✓ تنظيم الملفات حسب الهيكل المحدد
2. ✓ تنفيذ الواجهة البرمجية المطلوبة للوحدة
3. ✓ ربط الوحدة بالخدمات المركزية
4. ✓ اختبار وظائف الوحدة
5. ✓ تطبيق أنماط CSS المتوافقة مع دليل التصميم
6. ✓ التحقق من الاستجابة للشاشات المختلفة
7. ✓ توثيق الوحدة ووظائفها

## أفضل الممارسات لتطوير الوحدات

1. **الالتزام بالهيكل الموحد**: اتبع هيكل الملفات والتسميات المحددة للتطبيق.
2. **الفصل بين المنطق والعرض**: افصل بين منطق التطبيق وواجهة المستخدم.
3. **استخدام النطاق المحمي (IIFE)**: استخدم نمط التعبير الدالي المستدعى ذاتياً لتجنب تلوث النطاق العام.
4. **إعادة استخدام الخدمات المركزية**: استفد من الخدمات المركزية بدلاً من إعادة اختراع العجلة.
5. **الاستجابة للشاشات المختلفة**: تأكد من أن الوحدة تعمل بشكل جيد على جميع أحجام الشاشات.
6. **معالجة الأخطاء**: قم بتنفيذ آليات مناسبة لمعالجة الأخطاء وإبلاغ المستخدم.
7. **أداء وتحميل محسن**: استخدم التحميل الكسول للملفات والمكونات عند الحاجة.
8. **الاختبار**: قم باختبار الوحدة بشكل كامل قبل دمجها في التطبيق.
9. **التوثيق**: وثق الواجهة البرمجية للوحدة والوظائف العامة.
10. **التوافق مع المتصفحات**: تأكد من توافق الوحدة مع المتصفحات المدعومة.

## الاستنتاج

يوفر هيكل الوحدات في تطبيق "صحتك بالدنيا" طريقة مرنة وقابلة للتوسع لإضافة وظائف جديدة. من خلال اتباع هذا الدليل والالتزام بأفضل الممارسات، يمكنك إنشاء وحدات عالية الجودة تتكامل بسلاسة مع باقي التطبيق.