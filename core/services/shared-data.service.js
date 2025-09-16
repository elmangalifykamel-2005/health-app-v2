/**
 * خدمة إدارة المعلومات المشتركة
 * تدير البيانات المرجعية والثوابت والوظائف المشتركة في التطبيق
 */

class SharedDataService {
    constructor() {
        // البيانات المرجعية للتطبيق
        this.referenceData = {
            // الأنواع المختلفة للقياسات
            measurementTypes: {
                weight: {
                    id: 'weight',
                    name: 'الوزن',
                    icon: 'fa-weight',
                    unit: 'kg',
                    unitName: 'كيلوغرام',
                    decimalPlaces: 1,
                    normalRange: {
                        min: 40,
                        max: 120
                    },
                    color: '#4CAF50'
                },
                bloodPressure: {
                    id: 'bloodPressure',
                    name: 'ضغط الدم',
                    icon: 'fa-heart',
                    unit: 'mmHg',
                    unitName: 'ملم زئبقي',
                    isCompound: true, // يتكون من قيمتين (الانقباضي والانبساطي)
                    components: ['systolic', 'diastolic'],
                    labels: ['الانقباضي', 'الانبساطي'],
                    normalRange: {
                        systolic: {
                            min: 90,
                            max: 120
                        },
                        diastolic: {
                            min: 60,
                            max: 80
                        }
                    },
                    color: '#F44336'
                },
                bloodSugar: {
                    id: 'bloodSugar',
                    name: 'سكر الدم',
                    icon: 'fa-tint',
                    unit: 'mg/dL',
                    unitName: 'مليغرام/ديسيلتر',
                    decimalPlaces: 0,
                    normalRange: {
                        fasting: {
                            min: 70,
                            max: 100
                        },
                        afterMeal: {
                            min: 70,
                            max: 140
                        }
                    },
                    color: '#2196F3'
                },
                heartRate: {
                    id: 'heartRate',
                    name: 'معدل ضربات القلب',
                    icon: 'fa-heartbeat',
                    unit: 'bpm',
                    unitName: 'نبضة/دقيقة',
                    decimalPlaces: 0,
                    normalRange: {
                        min: 60,
                        max: 100
                    },
                    color: '#E91E63'
                },
                temperature: {
                    id: 'temperature',
                    name: 'درجة الحرارة',
                    icon: 'fa-thermometer-half',
                    unit: '°C',
                    unitName: 'درجة مئوية',
                    decimalPlaces: 1,
                    normalRange: {
                        min: 36.1,
                        max: 37.2
                    },
                    color: '#FF9800'
                },
                cholesterol: {
                    id: 'cholesterol',
                    name: 'الكولسترول',
                    icon: 'fa-vial',
                    unit: 'mg/dL',
                    unitName: 'مليغرام/ديسيلتر',
                    decimalPlaces: 0,
                    isCompound: true,
                    components: ['total', 'ldl', 'hdl', 'triglycerides'],
                    labels: ['الكلي', 'الضار', 'النافع', 'الدهون الثلاثية'],
                    normalRange: {
                        total: {
                            min: 0,
                            max: 200
                        },
                        ldl: {
                            min: 0,
                            max: 100
                        },
                        hdl: {
                            min: 40,
                            max: 100
                        },
                        triglycerides: {
                            min: 0,
                            max: 150
                        }
                    },
                    color: '#9C27B0'
                }
            },
            
            // فئات الوزن باستخدام مؤشر كتلة الجسم (BMI)
            bmiCategories: [
                { range: [0, 16], label: 'نقص حاد في الوزن', color: '#d32f2f' },
                { range: [16, 18.5], label: 'نقص في الوزن', color: '#ff9800' },
                { range: [18.5, 25], label: 'وزن طبيعي', color: '#4caf50' },
                { range: [25, 30], label: 'زيادة في الوزن', color: '#ff9800' },
                { range: [30, 35], label: 'سمنة درجة أولى', color: '#f44336' },
                { range: [35, 40], label: 'سمنة درجة ثانية', color: '#d32f2f' },
                { range: [40, 100], label: 'سمنة مفرطة', color: '#b71c1c' }
            ],
            
            // فئات ضغط الدم
            bloodPressureCategories: [
                { 
                    label: 'منخفض', 
                    systolic: { min: 0, max: 90 },
                    diastolic: { min: 0, max: 60 },
                    color: '#2196F3',
                    advice: 'يجب استشارة الطبيب إذا ظهرت أعراض مثل الدوخة أو الإغماء'
                },
                { 
                    label: 'طبيعي', 
                    systolic: { min: 90, max: 120 },
                    diastolic: { min: 60, max: 80 },
                    color: '#4CAF50',
                    advice: 'حافظ على نمط حياة صحي مع ممارسة الرياضة بانتظام'
                },
                { 
                    label: 'مرتفع', 
                    systolic: { min: 120, max: 130 },
                    diastolic: { min: 80, max: 85 },
                    color: '#FFEB3B',
                    advice: 'مراقبة النظام الغذائي وتقليل الملح والتوتر'
                },
                { 
                    label: 'المرحلة الأولى من ارتفاع ضغط الدم', 
                    systolic: { min: 130, max: 140 },
                    diastolic: { min: 85, max: 90 },
                    color: '#FF9800',
                    advice: 'استشارة الطبيب لتقييم الحالة ووضع خطة علاجية'
                },
                { 
                    label: 'المرحلة الثانية من ارتفاع ضغط الدم', 
                    systolic: { min: 140, max: 180 },
                    diastolic: { min: 90, max: 120 },
                    color: '#F44336',
                    advice: 'يجب زيارة الطبيب في أقرب وقت للعلاج والمتابعة'
                },
                { 
                    label: 'أزمة ارتفاع ضغط الدم', 
                    systolic: { min: 180, max: 300 },
                    diastolic: { min: 120, max: 200 },
                    color: '#B71C1C',
                    advice: 'حالة طارئة تتطلب رعاية طبية فورية'
                }
            ],
            
            // فئات سكر الدم
            bloodSugarCategories: [
                {
                    label: 'منخفض',
                    fasting: { min: 0, max: 70 },
                    afterMeal: { min: 0, max: 70 },
                    color: '#2196F3',
                    advice: 'تناول مصدر سريع للسكر مثل العصير أو الحلوى واستشر الطبيب إذا تكررت الحالة'
                },
                {
                    label: 'طبيعي',
                    fasting: { min: 70, max: 100 },
                    afterMeal: { min: 70, max: 140 },
                    color: '#4CAF50',
                    advice: 'حافظ على نظامك الغذائي المتوازن ومارس الرياضة بانتظام'
                },
                {
                    label: 'مرتفع (مقدمات السكري)',
                    fasting: { min: 100, max: 126 },
                    afterMeal: { min: 140, max: 200 },
                    color: '#FF9800',
                    advice: 'اتباع نظام غذائي صحي وممارسة الرياضة وزيارة الطبيب للمتابعة'
                },
                {
                    label: 'مرتفع جداً (سكري)',
                    fasting: { min: 126, max: 500 },
                    afterMeal: { min: 200, max: 500 },
                    color: '#F44336',
                    advice: 'استشارة الطبيب لوضع خطة علاجية ومتابعة دقيقة للحالة'
                }
            ],
            
            // مستويات الكوليسترول
            cholesterolCategories: {
                total: [
                    { range: [0, 200], label: 'مستوى مثالي', color: '#4CAF50' },
                    { range: [200, 240], label: 'مستوى حدودي مرتفع', color: '#FF9800' },
                    { range: [240, 600], label: 'مستوى مرتفع', color: '#F44336' }
                ],
                ldl: [
                    { range: [0, 100], label: 'مستوى مثالي', color: '#4CAF50' },
                    { range: [100, 130], label: 'مستوى قريب من المثالي', color: '#8BC34A' },
                    { range: [130, 160], label: 'مستوى حدودي مرتفع', color: '#FFEB3B' },
                    { range: [160, 190], label: 'مستوى مرتفع', color: '#FF9800' },
                    { range: [190, 500], label: 'مستوى مرتفع جداً', color: '#F44336' }
                ],
                hdl: [
                    { range: [0, 40], label: 'مستوى منخفض', color: '#F44336' },
                    { range: [40, 60], label: 'مستوى مقبول', color: '#FFEB3B' },
                    { range: [60, 200], label: 'مستوى مثالي', color: '#4CAF50' }
                ],
                triglycerides: [
                    { range: [0, 150], label: 'مستوى طبيعي', color: '#4CAF50' },
                    { range: [150, 200], label: 'مستوى حدودي مرتفع', color: '#FFEB3B' },
                    { range: [200, 500], label: 'مستوى مرتفع', color: '#FF9800' },
                    { range: [500, 1000], label: 'مستوى مرتفع جداً', color: '#F44336' }
                ]
            },
            
            // تصنيفات معدل ضربات القلب
            heartRateCategories: [
                { range: [0, 60], label: 'بطء القلب', color: '#2196F3', advice: 'قد يكون طبيعياً للرياضيين، استشر الطبيب إذا ظهرت أعراض' },
                { range: [60, 100], label: 'معدل طبيعي', color: '#4CAF50', advice: 'معدل صحي، استمر بالمحافظة على نمط حياة نشط' },
                { range: [100, 120], label: 'معدل مرتفع قليلاً', color: '#FFEB3B', advice: 'قد يكون بسبب النشاط البدني أو التوتر، راقب الحالة' },
                { range: [120, 200], label: 'تسارع القلب', color: '#FF9800', advice: 'استشر الطبيب إذا استمر المعدل مرتفعاً أثناء الراحة' }
            ],
            
            // أنواع الطعام وتصنيفاتها الغذائية
            foodCategories: [
                { id: 'protein', name: 'البروتينات', color: '#F44336', icon: 'fa-drumstick-bite' },
                { id: 'carbs', name: 'النشويات', color: '#FF9800', icon: 'fa-bread-slice' },
                { id: 'fruits', name: 'الفواكه', color: '#FFEB3B', icon: 'fa-apple-alt' },
                { id: 'vegetables', name: 'الخضروات', color: '#4CAF50', icon: 'fa-carrot' },
                { id: 'dairy', name: 'منتجات الألبان', color: '#2196F3', icon: 'fa-cheese' },
                { id: 'fats', name: 'الدهون', color: '#9C27B0', icon: 'fa-oil-can' },
                { id: 'drinks', name: 'المشروبات', color: '#03A9F4', icon: 'fa-glass-water' },
                { id: 'sweets', name: 'الحلويات', color: '#E91E63', icon: 'fa-candy-cane' }
            ],
            
            // الفيتامينات والمعادن ومصادرها
            nutrientsInfo: {
                vitamins: [
                    {
                        id: 'vitA',
                        name: 'فيتامين أ',
                        description: 'مهم للرؤية وصحة الجلد والمناعة',
                        sources: ['الجزر', 'السبانخ', 'البطاطا الحلوة', 'كبد', 'البيض'],
                        deficiencySymptoms: ['ضعف الرؤية الليلية', 'جفاف الجلد', 'ضعف المناعة']
                    },
                    {
                        id: 'vitC',
                        name: 'فيتامين ج',
                        description: 'مضاد للأكسدة ومهم للمناعة وإنتاج الكولاجين',
                        sources: ['البرتقال', 'الليمون', 'الفراولة', 'الفلفل', 'البروكلي'],
                        deficiencySymptoms: ['نزيف اللثة', 'بطء التئام الجروح', 'ضعف المناعة']
                    },
                    {
                        id: 'vitD',
                        name: 'فيتامين د',
                        description: 'ضروري لصحة العظام وامتصاص الكالسيوم',
                        sources: ['أشعة الشمس', 'الأسماك الدهنية', 'صفار البيض', 'الحليب المدعم'],
                        deficiencySymptoms: ['ضعف العظام', 'آلام العضلات', 'التعب المزمن']
                    }
                ],
                minerals: [
                    {
                        id: 'calcium',
                        name: 'الكالسيوم',
                        description: 'ضروري لصحة العظام والأسنان وعمل العضلات',
                        sources: ['الحليب', 'الزبادي', 'الجبن', 'السردين', 'السبانخ'],
                        deficiencySymptoms: ['هشاشة العظام', 'تشنج العضلات', 'خدر في الأطراف']
                    },
                    {
                        id: 'iron',
                        name: 'الحديد',
                        description: 'ضروري لإنتاج خلايا الدم الحمراء ونقل الأكسجين',
                        sources: ['اللحوم الحمراء', 'الكبد', 'العدس', 'السبانخ', 'المكسرات'],
                        deficiencySymptoms: ['فقر الدم', 'التعب المستمر', 'ضعف التركيز']
                    },
                    {
                        id: 'potassium',
                        name: 'البوتاسيوم',
                        description: 'ينظم ضغط الدم وعمل العضلات والأعصاب',
                        sources: ['الموز', 'البطاطا', 'الأفوكادو', 'المشمش', 'السبانخ'],
                        deficiencySymptoms: ['تشنج العضلات', 'ضعف العضلات', 'عدم انتظام ضربات القلب']
                    }
                ]
            },
            
            // أنواع الأدوية الشائعة وتصنيفاتها
            medicationCategories: [
                { id: 'antibiotic', name: 'المضادات الحيوية', color: '#F44336', icon: 'fa-capsules' },
                { id: 'painRelief', name: 'مسكنات الألم', color: '#FF9800', icon: 'fa-pills' },
                { id: 'antihistamine', name: 'مضادات الهستامين', color: '#4CAF50', icon: 'fa-prescription-bottle' },
                { id: 'antihypertensive', name: 'أدوية ضغط الدم', color: '#2196F3', icon: 'fa-heart' },
                { id: 'antidiabetic', name: 'أدوية السكري', color: '#9C27B0', icon: 'fa-syringe' },
                { id: 'supplement', name: 'المكملات الغذائية', color: '#FFEB3B', icon: 'fa-tablets' },
                { id: 'other', name: 'أخرى', color: '#607D8B', icon: 'fa-prescription' }
            ],
            
            // أنواع التمارين الرياضية وفوائدها
            exerciseTypes: [
                {
                    id: 'cardio',
                    name: 'تمارين القلب والأوعية الدموية',
                    examples: ['المشي', 'الجري', 'السباحة', 'ركوب الدراجة'],
                    benefits: ['تحسين صحة القلب', 'خفض ضغط الدم', 'زيادة التحمل', 'حرق السعرات الحرارية']
                },
                {
                    id: 'strength',
                    name: 'تمارين القوة',
                    examples: ['رفع الأثقال', 'تمارين المقاومة', 'تمارين الوزن'],
                    benefits: ['بناء العضلات', 'زيادة التمثيل الغذائي', 'تقوية العظام', 'تحسين الثبات']
                },
                {
                    id: 'flexibility',
                    name: 'تمارين المرونة',
                    examples: ['اليوغا', 'التمدد', 'بيلاتيس'],
                    benefits: ['زيادة المرونة', 'تحسين نطاق الحركة', 'تقليل خطر الإصابة', 'تقليل التوتر']
                },
                {
                    id: 'balance',
                    name: 'تمارين التوازن',
                    examples: ['الوقوف على قدم واحدة', 'تاي تشي', 'تمارين الاستقرار'],
                    benefits: ['تحسين التوازن', 'منع السقوط', 'تحسين التنسيق', 'زيادة الوعي الجسدي']
                }
            ],
            
            // أنواع الأعشاب الطبية وفوائدها
            herbs: [
                {
                    id: 'chamomile',
                    name: 'البابونج',
                    benefits: ['تهدئة الأعصاب', 'تخفيف اضطرابات الهضم', 'المساعدة على النوم'],
                    usage: 'شاي (ملعقة صغيرة من الزهور المجففة في كوب ماء ساخن)',
                    caution: 'تجنب أثناء الحمل وعند الحساسية من نباتات الأقحوان'
                },
                {
                    id: 'mint',
                    name: 'النعناع',
                    benefits: ['تخفيف آلام المعدة', 'تحسين الهضم', 'تخفيف الصداع'],
                    usage: 'شاي أو زيت للاستنشاق',
                    caution: 'تجنب الجرعات العالية مع أدوية الضغط'
                },
                {
                    id: 'ginger',
                    name: 'الزنجبيل',
                    benefits: ['مضاد للغثيان', 'مضاد للالتهاب', 'يعزز الهضم'],
                    usage: 'شاي أو إضافته للطعام',
                    caution: 'تجنب مع أدوية سيولة الدم وحالات المرارة'
                }
            ]
        };
    }

    /**
     * الحصول على معلومات نوع قياس معين
     * @param {string} type - نوع القياس (مثل weight، bloodPressure، bloodSugar)
     * @returns {Object|null} معلومات نوع القياس أو null إذا لم يتم العثور عليه
     */
    getMeasurementTypeInfo(type) {
        return this.referenceData.measurementTypes[type] || null;
    }

    /**
     * الحصول على جميع أنواع القياسات
     * @returns {Object} جميع أنواع القياسات
     */
    getAllMeasurementTypes() {
        return this.referenceData.measurementTypes;
    }

    /**
     * حساب فئة مؤشر كتلة الجسم (BMI)
     * @param {number} bmi - قيمة مؤشر كتلة الجسم
     * @returns {Object} فئة مؤشر كتلة الجسم (التصنيف واللون)
     */
    getBmiCategory(bmi) {
        const categories = this.referenceData.bmiCategories;
        
        for (const category of categories) {
            const [min, max] = category.range;
            if (bmi >= min && bmi < max) {
                return {
                    label: category.label,
                    color: category.color
                };
            }
        }
        
        return {
            label: 'غير معروف',
            color: '#757575'
        };
    }

    /**
     * حساب مؤشر كتلة الجسم (BMI)
     * @param {number} weight - الوزن بالكيلوغرام
     * @param {number} height - الطول بالسنتيمتر
     * @returns {number} قيمة مؤشر كتلة الجسم
     */
    calculateBmi(weight, height) {
        // تحويل الطول من سنتيمتر إلى متر
        const heightInMeters = height / 100;
        
        // حساب مؤشر كتلة الجسم: الوزن (كغ) / (الطول (م))^2
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // تقريب النتيجة إلى رقم عشري واحد
        return Math.round(bmi * 10) / 10;
    }

    /**
     * تحديد فئة ضغط الدم
     * @param {number} systolic - الضغط الانقباضي
     * @param {number} diastolic - الضغط الانبساطي
     * @returns {Object} فئة ضغط الدم (التصنيف واللون والنصيحة)
     */
    getBloodPressureCategory(systolic, diastolic) {
        const categories = this.referenceData.bloodPressureCategories;
        
        // تحديد الفئة بناءً على أسوأ حالة (الانقباضي أو الانبساطي)
        for (let i = categories.length - 1; i >= 0; i--) {
            const category = categories[i];
            
            const systolicMatch = systolic >= category.systolic.min && systolic < category.systolic.max;
            const diastolicMatch = diastolic >= category.diastolic.min && diastolic < category.diastolic.max;
            
            if (systolicMatch || diastolicMatch) {
                return {
                    label: category.label,
                    color: category.color,
                    advice: category.advice
                };
            }
        }
        
        return {
            label: 'غير معروف',
            color: '#757575',
            advice: 'يرجى استشارة الطبيب لتقييم الحالة'
        };
    }

    /**
     * تحديد فئة سكر الدم
     * @param {number} value - قيمة سكر الدم
     * @param {string} state - الحالة ('fasting' للصيام أو 'afterMeal' بعد الوجبة)
     * @returns {Object} فئة سكر الدم (التصنيف واللون والنصيحة)
     */
    getBloodSugarCategory(value, state = 'fasting') {
        const categories = this.referenceData.bloodSugarCategories;
        
        for (const category of categories) {
            const range = category[state];
            if (value >= range.min && value < range.max) {
                return {
                    label: category.label,
                    color: category.color,
                    advice: category.advice
                };
            }
        }
        
        return {
            label: 'غير معروف',
            color: '#757575',
            advice: 'يرجى استشارة الطبيب لتقييم الحالة'
        };
    }

    /**
     * تحديد فئة الكوليسترول
     * @param {number} value - قيمة الكوليسترول
     * @param {string} type - نوع الكوليسترول ('total', 'ldl', 'hdl', 'triglycerides')
     * @returns {Object} فئة الكوليسترول (التصنيف واللون)
     */
    getCholesterolCategory(value, type) {
        const categories = this.referenceData.cholesterolCategories[type] || [];
        
        for (const category of categories) {
            const [min, max] = category.range;
            if (value >= min && value < max) {
                return {
                    label: category.label,
                    color: category.color
                };
            }
        }
        
        return {
            label: 'غير معروف',
            color: '#757575'
        };
    }

    /**
     * تحديد فئة معدل ضربات القلب
     * @param {number} value - معدل ضربات القلب
     * @returns {Object} فئة معدل ضربات القلب (التصنيف واللون والنصيحة)
     */
    getHeartRateCategory(value) {
        const categories = this.referenceData.heartRateCategories;
        
        for (const category of categories) {
            const [min, max] = category.range;
            if (value >= min && value < max) {
                return {
                    label: category.label,
                    color: category.color,
                    advice: category.advice
                };
            }
        }
        
        return {
            label: 'غير معروف',
            color: '#757575',
            advice: 'يرجى استشارة الطبيب لتقييم الحالة'
        };
    }

    /**
     * الحصول على فئات الطعام
     * @returns {Array} فئات الطعام
     */
    getFoodCategories() {
        return this.referenceData.foodCategories;
    }

    /**
     * الحصول على معلومات الفيتامينات والمعادن
     * @returns {Object} معلومات الفيتامينات والمعادن
     */
    getNutrientsInfo() {
        return this.referenceData.nutrientsInfo;
    }

    /**
     * الحصول على فئات الأدوية
     * @returns {Array} فئات الأدوية
     */
    getMedicationCategories() {
        return this.referenceData.medicationCategories;
    }

    /**
     * الحصول على أنواع التمارين الرياضية
     * @returns {Array} أنواع التمارين الرياضية
     */
    getExerciseTypes() {
        return this.referenceData.exerciseTypes;
    }

    /**
     * الحصول على معلومات الأعشاب الطبية
     * @returns {Array} معلومات الأعشاب الطبية
     */
    getHerbs() {
        return this.referenceData.herbs;
    }

    /**
     * تحويل وحدة القياس
     * @param {number} value - القيمة المراد تحويلها
     * @param {string} fromUnit - الوحدة الأصلية
     * @param {string} toUnit - الوحدة المستهدفة
     * @returns {number} القيمة المحولة
     */
    convertUnit(value, fromUnit, toUnit) {
        // نفس الوحدة، لا داعي للتحويل
        if (fromUnit === toUnit) {
            return value;
        }
        
        // تحويل الوزن
        if ((fromUnit === 'kg' && toUnit === 'lb') || (fromUnit === 'كجم' && toUnit === 'رطل')) {
            return value * 2.20462;
        }
        if ((fromUnit === 'lb' && toUnit === 'kg') || (fromUnit === 'رطل' && toUnit === 'كجم')) {
            return value / 2.20462;
        }
        
        // تحويل الطول
        if ((fromUnit === 'cm' && toUnit === 'inch') || (fromUnit === 'سم' && toUnit === 'بوصة')) {
            return value * 0.393701;
        }
        if ((fromUnit === 'inch' && toUnit === 'cm') || (fromUnit === 'بوصة' && toUnit === 'سم')) {
            return value / 0.393701;
        }
        
        // تحويل درجة الحرارة
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            return (value * 9/5) + 32;
        }
        if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            return (value - 32) * 5/9;
        }
        
        // تحويل سكر الدم
        if (fromUnit === 'mg_dl' && toUnit === 'mmol_l') {
            return value * 0.0555;
        }
        if (fromUnit === 'mmol_l' && toUnit === 'mg_dl') {
            return value * 18.0182;
        }
        
        // إذا لم يتم التعرف على التحويل
        console.warn(`التحويل من ${fromUnit} إلى ${toUnit} غير مدعوم`);
        return value;
    }
    
    /**
     * تحويل التاريخ إلى تنسيق مقروء بالعربية
     * @param {Date|string} date - كائن تاريخ أو سلسلة نصية
     * @param {boolean} includeTime - ما إذا كان يجب تضمين الوقت
     * @returns {string} التاريخ بتنسيق مقروء بالعربية
     */
    formatDateArabic(date, includeTime = false) {
        // تحويل السلسلة النصية إلى كائن تاريخ إذا لزم الأمر
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        
        // أسماء الأيام والشهور بالعربية
        const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const arabicMonths = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        
        // بناء التاريخ بالتنسيق العربي
        const day = arabicDays[dateObj.getDay()];
        const month = arabicMonths[dateObj.getMonth()];
        const formattedDate = `${day} ${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;
        
        // إضافة الوقت إذا كان مطلوباً
        if (includeTime) {
            // تنسيق الوقت بنظام 12 ساعة
            let hours = dateObj.getHours();
            const minutes = dateObj.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? 'مساءً' : 'صباحاً';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // تحويل 0 إلى 12
            
            return `${formattedDate} ${hours}:${minutes} ${period}`;
        }
        
        return formattedDate;
    }

    /**
     * حساب الفرق بين تاريخين بتنسيق مقروء
     * @param {Date|string} date1 - التاريخ الأول
     * @param {Date|string} date2 - التاريخ الثاني (اختياري، افتراضيًا الوقت الحالي)
     * @returns {string} الفرق بين التاريخين بتنسيق مقروء
     */
    getDateDifference(date1, date2 = new Date()) {
        // تحويل التواريخ إلى كائنات تاريخ
        const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
        const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
        
        // حساب الفرق بالمللي ثانية
        const diffMs = Math.abs(d2 - d1);
        
        // تحويل إلى وحدات مختلفة
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);
        
        // تحديد التنسيق المناسب
        if (diffYears > 0) {
            return diffYears === 1 ? 'منذ سنة' : `منذ ${diffYears} سنوات`;
        } else if (diffMonths > 0) {
            return diffMonths === 1 ? 'منذ شهر' : `منذ ${diffMonths} أشهر`;
        } else if (diffDays > 0) {
            return diffDays === 1 ? 'منذ يوم' : `منذ ${diffDays} أيام`;
        } else if (diffHours > 0) {
            return diffHours === 1 ? 'منذ ساعة' : `منذ ${diffHours} ساعات`;
        } else if (diffMinutes > 0) {
            return diffMinutes === 1 ? 'منذ دقيقة' : `منذ ${diffMinutes} دقائق`;
        } else {
            return 'الآن';
        }
    }

    /**
     * حساب العمر من تاريخ الميلاد
     * @param {Date|string} birthDate - تاريخ الميلاد
     * @returns {number} العمر بالسنوات
     */
    calculateAge(birthDate) {
        // تحويل التاريخ إلى كائن تاريخ
        const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
        const today = new Date();
        
        // حساب الفرق بالسنوات
        let age = today.getFullYear() - birth.getFullYear();
        
        // التحقق مما إذا لم يحن عيد الميلاد بعد في السنة الحالية
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    /**
     * تحويل العدد إلى كتابة عربية
     * @param {number} num - العدد
     * @returns {string} العدد بتنسيق عربي
     */
    formatNumberArabic(num) {
        // الأرقام العربية
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        
        // تحويل العدد إلى سلسلة نصية ثم استبدال كل رقم
        return num.toString().replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)]);
    }
}

// إنشاء نسخة واحدة من الخدمة للاستخدام في التطبيق بأكمله
const sharedDataService = new SharedDataService();

// تصدير الخدمة للاستخدام في وحدات أخرى
export default sharedDataService;

// تعيين الخدمة كمتغير عام للوصول إليها من أي مكان
window.sharedDataService = sharedDataService;