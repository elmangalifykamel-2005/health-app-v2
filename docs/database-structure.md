# هيكل قاعدة البيانات لتطبيق "صحتك بالدنيا"

## نظرة عامة

يعتمد التطبيق على Firebase Firestore كقاعدة بيانات NoSQL لتخزين بيانات المستخدمين والمحتوى. تم تصميم هيكل البيانات بطريقة تمنع التكرار وتسهل الوصول إلى البيانات بكفاءة.

## المجموعات الرئيسية

### 1. users
تحتوي على معلومات المستخدمين الأساسية ومعلومات الملف الشخصي.

```
users/
  {userId}/
    profile: {
      displayName: string,
      email: string,
      photoURL: string,
      dateOfBirth: timestamp,
      gender: string,
      height: number,
      weight: number,
      createdAt: timestamp,
      updatedAt: timestamp
    }
```

### 2. healthData
تحتوي على جميع البيانات الصحية للمستخدمين مقسمة إلى مجموعات فرعية.

```
healthData/
  {userId}/
    measurements/
      {measurementId}: {
        type: string,           // 'weight', 'bloodPressure', 'bloodSugar', etc.
        value: number,
        unit: string,
        timestamp: timestamp,
        notes: string
      }
    
    medicalTests/
      {testId}: {
        name: string,
        date: timestamp,
        results: {},            // كائن يحتوي على نتائج التحليل
        normalRange: {},        // المعدل الطبيعي
        labName: string,
        doctorName: string,
        notes: string,
        fileURL: string         // رابط لملف التحليل إن وجد
      }
    
    medications/
      {medicationId}: {
        name: string,
        dosage: string,
        frequency: string,
        startDate: timestamp,
        endDate: timestamp,
        prescribedBy: string,
        reason: string,
        active: boolean,
        notes: string
      }
    
    allergies/
      {allergyId}: {
        name: string,
        severity: string,       // 'mild', 'moderate', 'severe'
        symptoms: array,
        diagnosis: timestamp,
        notes: string
      }
    
    conditions/
      {conditionId}: {
        name: string,
        diagnosisDate: timestamp,
        status: string,         // 'active', 'managed', 'resolved'
        treatedBy: string,
        treatments: array,
        notes: string
      }
    
    surgeries/
      {surgeryId}: {
        procedure: string,
        date: timestamp,
        hospital: string,
        surgeon: string,
        reason: string,
        outcome: string,
        notes: string
      }
    
    vaccinations/
      {vaccinationId}: {
        name: string,
        date: timestamp,
        dueDate: timestamp,     // للجرعات التالية
        location: string,
        batchNumber: string,
        notes: string
      }
    
    familyHistory/
      {conditionId}: {
        condition: string,
        relation: string,       // 'mother', 'father', 'sibling', etc.
        ageOfOnset: number,
        notes: string
      }
    
    lifestyle/
      habits: {
        smoking: {
          status: string,       // 'never', 'former', 'current'
          frequency: string,
          quitDate: timestamp,
          notes: string
        },
        alcohol: {
          status: string,
          frequency: string,
          notes: string
        },
        exercise: {
          frequency: string,
          type: array,
          duration: number,
          notes: string
        },
        diet: {
          preferences: array,
          restrictions: array,
          notes: string
        }
      }
```

### 3. nutritionData
تخزين بيانات التغذية والسعرات الحرارية.

```
nutritionData/
  {userId}/
    dailyLogs/
      {date}: {
        totalCalories: number,
        totalProtein: number,
        totalCarbs: number,
        totalFat: number,
        meals: [
          {
            name: string,
            time: timestamp,
            items: [
              {
                name: string,
                portion: number,
                unit: string,
                calories: number,
                protein: number,
                carbs: number,
                fat: number
              }
            ]
          }
        ],
        water: number,          // كمية الماء بالملليلتر
        notes: string
      }
    
    goals: {
      calorieGoal: number,
      proteinGoal: number,
      carbsGoal: number,
      fatGoal: number,
      waterGoal: number,
      updatedAt: timestamp
    }
    
    favorites: [
      {
        name: string,
        portion: number,
        unit: string,
        calories: number,
        protein: number,
        carbs: number,
        fat: number
      }
    ]
```

### 4. sleepData
تخزين بيانات النوم والإحصائيات.

```
sleepData/
  {userId}/
    logs/
      {date}: {
        bedTime: timestamp,
        wakeTime: timestamp,
        duration: number,       // بالدقائق
        quality: number,        // تقييم من 1-10
        interruptions: number,
        notes: string
      }
    
    assessment: {
      lastAssessment: timestamp,
      score: number,
      issues: array,
      recommendations: array
    }
    
    goals: {
      targetBedTime: string,
      targetWakeTime: string,
      targetDuration: number,
      updatedAt: timestamp
    }
```

### 5. mentalHealthData
بيانات الصحة النفسية والتقييمات.

```
mentalHealthData/
  {userId}/
    assessments/
      {assessmentId}: {
        type: string,           // 'stress', 'anxiety', 'depression', etc.
        date: timestamp,
        score: number,
        responses: {},          // إجابات الاستبيان
        summary: string,
        recommendations: array
      }
    
    journalEntries/
      {entryId}: {
        date: timestamp,
        mood: string,
        content: string,
        tags: array
      }
```

### 6. caloriesData
بيانات حاسبة السعرات الحرارية.

```
caloriesData/
  foods/                        // قاعدة بيانات الأطعمة المشتركة
    {foodId}: {
      name: string,
      category: string,
      calories: number,
      protein: number,
      carbs: number,
      fat: number,
      fiber: number,
      sugar: number,
      servingSize: number,
      servingUnit: string,
      image: string
    }
  
  {userId}/
    customFoods/                // أطعمة أضافها المستخدم
      {foodId}: {
        name: string,
        calories: number,
        protein: number,
        carbs: number,
        fat: number,
        servingSize: number,
        servingUnit: string
      }
```

### 7. recipesData
وصفات الطعام الصحية.

```
recipesData/
  recipes/
    {recipeId}: {
      name: string,
      category: string,
      difficulty: string,
      prepTime: number,
      cookTime: number,
      servings: number,
      calories: number,
      protein: number,
      carbs: number,
      fat: number,
      ingredients: [
        {
          name: string,
          amount: number,
          unit: string
        }
      ],
      steps: array,
      tags: array,
      image: string,
      author: string,
      createdAt: timestamp
    }
  
  {userId}/
    favorites: [                // وصفات مفضلة للمستخدم
      recipeId: string
    ]
    
    userRecipes/                // وصفات أنشأها المستخدم
      {recipeId}: { ... }       // نفس بنية الوصفات العامة
```

### 8. herbsData
معلومات عن الأعشاب الطبية.

```
herbsData/
  herbs/
    {herbId}: {
      name: string,
      scientificName: string,
      benefits: array,
      uses: array,
      sideEffects: array,
      contraindications: array,
      dosage: string,
      image: string
    }
  
  {userId}/
    favorites: [                // أعشاب مفضلة
      herbId: string
    ]
    
    notes/                      // ملاحظات المستخدم على الأعشاب
      {herbId}: {
        content: string,
        effectiveness: number,  // تقييم من 1-5
        updatedAt: timestamp
      }
```

### 9. studiesData
دراسات وأبحاث طبية.

```
studiesData/
  studies/
    {studyId}: {
      title: string,
      authors: array,
      publishedDate: timestamp,
      journal: string,
      abstract: string,
      conclusions: string,
      keywords: array,
      url: string,
      category: string
    }
  
  {userId}/
    favorites: [                // دراسات مفضلة
      studyId: string
    ]
    
    notes/                      // ملاحظات المستخدم على الدراسات
      {studyId}: {
        content: string,
        updatedAt: timestamp
      }
```

### 10. appSettings
إعدادات عامة للتطبيق.

```
appSettings/
  {userId}/
    preferences: {
      language: string,
      theme: string,
      notifications: {
         enabled: boolean,
         types: {
            reminders: boolean,
            tips: boolean,
            updates: boolean
         }
      },
      privacySettings: {
         shareData: boolean,
         anonymousAnalytics: boolean
      },
      lastSync: timestamp
    }
```

## العلاقات بين البيانات

- كل مستخدم له معرف فريد `userId` يستخدم للربط بين جميع مجموعات البيانات.
- البيانات مقسمة حسب الوظيفة لتسهيل الوصول إليها والتعامل معها.
- المعلومات المشتركة (مثل قاعدة بيانات الأطعمة، الوصفات، الأعشاب، الدراسات) متاحة لجميع المستخدمين.
- المعلومات الشخصية منفصلة عن المحتوى العام للحفاظ على الخصوصية وكفاءة النظام.

## قواعد الأمان

- كل مستخدم يمكنه الوصول فقط إلى بياناته الشخصية.
- المحتوى العام (مثل الأطعمة، الوصفات، الأعشاب، الدراسات) قابل للقراءة من قبل جميع المستخدمين المسجلين.
- المسؤولون فقط يمكنهم إضافة أو تعديل المحتوى العام.
- يتم التحقق من صحة جميع البيانات قبل حفظها في قاعدة البيانات.