// بيانات التغذية الشاملة - نظام موحد
// Comprehensive Nutrition Data - Unified System

// استيراد النظام الموحد
// Import unified system
import { i18n } from '../../../core/i18n/i18n.js';
import { formatDate, formatNumber } from '../../../shared/utils/formatters.js';

// بيانات الأطعمة الشاملة مع المعلومات الغذائية
// Comprehensive food data with nutritional information
const foodsDatabase = [
    {
        id: 1,
        nameAr: "الأرز البني",
        nameEn: "Brown Rice",
        category: "grains",
        calories: 111,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        fiber: 1.8,
        sugar: 0.4,
        sodium: 5,
        glycemicIndex: 50,
        vitamins: {
            B1: 0.1,
            B3: 2.3,
            B6: 0.1,
            folate: 8
        },
        minerals: {
            iron: 0.4,
            magnesium: 43,
            phosphorus: 83,
            potassium: 43,
            zinc: 0.6
        },
        benefits: [
            "مصدر جيد للألياف",
            "يساعد في التحكم بالسكر",
            "غني بالمغنيسيوم",
            "يدعم صحة القلب"
        ],
        allergens: [],
        dietaryRestrictions: ["gluten-free", "vegan", "vegetarian"],
        cookingMethods: ["boiling", "steaming", "rice-cooker"],
        storageInstructions: "يحفظ في مكان بارد وجاف",
        shelfLife: "12 شهر",
        origin: "آسيا",
        season: "all-year",
        sustainabilityScore: 8,
        image: "brown-rice.jpg",
        barcode: "1234567890123",
        fdcId: "168880"
    },
    {
        id: 2,
        nameAr: "السلمون المشوي",
        nameEn: "Grilled Salmon",
        category: "fish",
        calories: 206,
        protein: 22,
        carbs: 0,
        fat: 12,
        fiber: 0,
        sugar: 0,
        sodium: 59,
        glycemicIndex: 0,
        vitamins: {
            D: 11,
            B12: 2.8,
            B6: 0.6,
            niacin: 8.5
        },
        minerals: {
            selenium: 36.5,
            phosphorus: 200,
            potassium: 363,
            magnesium: 27
        },
        omega3: 1.8,
        benefits: [
            "غني بأوميغا 3",
            "يدعم صحة القلب",
            "مصدر ممتاز للبروتين",
            "يحسن وظائف المخ"
        ],
        allergens: ["fish"],
        dietaryRestrictions: ["keto", "paleo", "low-carb"],
        cookingMethods: ["grilling", "baking", "pan-frying"],
        storageInstructions: "يحفظ مبرداً لمدة 2-3 أيام",
        shelfLife: "3 أيام مبرد",
        origin: "المحيط الأطلسي",
        season: "all-year",
        sustainabilityScore: 6,
        image: "grilled-salmon.jpg",
        fdcId: "175167"
    },
    {
        id: 3,
        nameAr: "الأفوكادو",
        nameEn: "Avocado",
        category: "fruits",
        calories: 160,
        protein: 2,
        carbs: 9,
        fat: 15,
        fiber: 7,
        sugar: 0.7,
        sodium: 7,
        glycemicIndex: 15,
        vitamins: {
            K: 21,
            folate: 81,
            C: 10,
            E: 2.1
        },
        minerals: {
            potassium: 485,
            magnesium: 29,
            phosphorus: 52
        },
        benefits: [
            "غني بالدهون الصحية",
            "يدعم صحة القلب",
            "مصدر جيد للألياف",
            "يساعد في امتصاص الفيتامينات"
        ],
        allergens: [],
        dietaryRestrictions: ["keto", "paleo", "vegan", "vegetarian", "low-carb"],
        cookingMethods: ["raw", "grilling", "baking"],
        storageInstructions: "ينضج في درجة حرارة الغرفة",
        shelfLife: "5-7 أيام",
        origin: "المكسيك",
        season: "all-year",
        sustainabilityScore: 7,
        image: "avocado.jpg",
        fdcId: "171705"
    }
    // المزيد من الأطعمة...
];

// فئات الأطعمة مع الألوان والأيقونات
// Food categories with colors and icons
const foodCategories = {
    "grains": {
        ar: "الحبوب والنشويات",
        en: "Grains & Starches",
        icon: "fas fa-seedling",
        color: "#8bc34a",
        description: {
            ar: "مصادر الطاقة الأساسية والألياف",
            en: "Primary energy sources and fiber"
        }
    },
    "proteins": {
        ar: "البروتينات",
        en: "Proteins",
        icon: "fas fa-drumstick-bite",
        color: "#f44336",
        description: {
            ar: "بناء العضلات وإصلاح الأنسجة",
            en: "Muscle building and tissue repair"
        }
    },
    "vegetables": {
        ar: "الخضروات",
        en: "Vegetables",
        icon: "fas fa-carrot",
        color: "#4caf50",
        description: {
            ar: "الفيتامينات والمعادن والألياف",
            en: "Vitamins, minerals, and fiber"
        }
    },
    "fruits": {
        ar: "الفواكه",
        en: "Fruits",
        icon: "fas fa-apple-alt",
        color: "#ff9800",
        description: {
            ar: "مضادات الأكسدة والفيتامينات الطبيعية",
            en: "Antioxidants and natural vitamins"
        }
    },
    "dairy": {
        ar: "منتجات الألبان",
        en: "Dairy Products",
        icon: "fas fa-cheese",
        color: "#2196f3",
        description: {
            ar: "الكالسيوم والبروتين عالي الجودة",
            en: "Calcium and high-quality protein"
        }
    },
    "fish": {
        ar: "الأسماك والمأكولات البحرية",
        en: "Fish & Seafood",
        icon: "fas fa-fish",
        color: "#00bcd4",
        description: {
            ar: "أوميغا 3 والبروتين الخالي من الدهون",
            en: "Omega-3 and lean protein"
        }
    },
    "nuts": {
        ar: "المكسرات والبذور",
        en: "Nuts & Seeds",
        icon: "fas fa-acorn",
        color: "#795548",
        description: {
            ar: "الدهون الصحية والبروتين النباتي",
            en: "Healthy fats and plant protein"
        }
    },
    "oils": {
        ar: "الزيوت والدهون",
        en: "Oils & Fats",
        icon: "fas fa-tint",
        color: "#ffc107",
        description: {
            ar: "الأحماض الدهنية الأساسية",
            en: "Essential fatty acids"
        }
    }
};

// الوصفات الصحية
// Healthy recipes
const healthyRecipes = [
    {
        id: 1,
        nameAr: "سلطة الكينوا بالخضار",
        nameEn: "Quinoa Vegetable Salad",
        category: "salads",
        cuisine: "mediterranean",
        difficulty: "easy",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        calories: 280,
        protein: 12,
        carbs: 45,
        fat: 8,
        fiber: 6,
        ingredients: [
            { nameAr: "كينوا", nameEn: "Quinoa", amount: 1, unit: "كوب" },
            { nameAr: "خيار", nameEn: "Cucumber", amount: 1, unit: "حبة" },
            { nameAr: "طماطم كرزية", nameEn: "Cherry Tomatoes", amount: 200, unit: "جرام" },
            { nameAr: "بقدونس", nameEn: "Parsley", amount: 0.5, unit: "كوب" },
            { nameAr: "زيت زيتون", nameEn: "Olive Oil", amount: 2, unit: "ملعقة كبيرة" },
            { nameAr: "عصير ليمون", nameEn: "Lemon Juice", amount: 2, unit: "ملعقة كبيرة" }
        ],
        instructions: [
            "اسلقي الكينوا في الماء المغلي لمدة 15 دقيقة",
            "اتركي الكينوا تبرد تماماً",
            "قطعي الخضار إلى قطع صغيرة",
            "اخلطي جميع المكونات مع التتبيلة",
            "قدمي باردة"
        ],
        tags: ["healthy", "vegetarian", "gluten-free", "high-protein"],
        nutritionalHighlights: [
            "بروتين كامل من الكينوا",
            "غني بالألياف",
            "مضادات أكسدة من الخضار",
            "دهون صحية من زيت الزيتون"
        ],
        image: "quinoa-salad.jpg",
        rating: 4.8,
        reviews: 156
    }
    // المزيد من الوصفات...
];

// خطط التغذية
// Nutrition plans
const nutritionPlans = {
    "weight-loss": {
        nameAr: "خطة فقدان الوزن",
        nameEn: "Weight Loss Plan",
        description: {
            ar: "خطة متوازنة لفقدان الوزن الصحي",
            en: "Balanced plan for healthy weight loss"
        },
        dailyCalories: 1500,
        macros: {
            protein: 30,
            carbs: 40,
            fat: 30
        },
        meals: {
            breakfast: { calories: 350, protein: 20, carbs: 35, fat: 15 },
            lunch: { calories: 450, protein: 35, carbs: 40, fat: 20 },
            dinner: { calories: 400, protein: 30, carbs: 30, fat: 25 },
            snacks: { calories: 300, protein: 15, carbs: 35, fat: 15 }
        },
        guidelines: [
            "شرب 8-10 أكواب ماء يومياً",
            "تناول 5 حصص خضار وفواكه",
            "تجنب السكريات المضافة",
            "ممارسة الرياضة 30 دقيقة يومياً"
        ]
    },
    "muscle-gain": {
        nameAr: "خطة بناء العضلات",
        nameEn: "Muscle Building Plan",
        description: {
            ar: "خطة عالية البروتين لبناء العضلات",
            en: "High-protein plan for muscle building"
        },
        dailyCalories: 2500,
        macros: {
            protein: 35,
            carbs: 40,
            fat: 25
        },
        meals: {
            breakfast: { calories: 500, protein: 30, carbs: 50, fat: 20 },
            lunch: { calories: 700, protein: 45, carbs: 60, fat: 25 },
            dinner: { calories: 600, protein: 40, carbs: 45, fat: 25 },
            snacks: { calories: 700, protein: 35, carbs: 70, fat: 20 }
        },
        guidelines: [
            "تناول البروتين كل 3-4 ساعات",
            "شرب 10-12 كوب ماء يومياً",
            "تناول الكربوهيدرات قبل وبعد التمرين",
            "النوم 7-9 ساعات يومياً"
        ]
    }
};

// فئات الحميات الغذائية
// Diet categories
const dietTypes = {
    "mediterranean": {
        nameAr: "حمية البحر المتوسط",
        nameEn: "Mediterranean Diet",
        description: {
            ar: "نمط غذائي صحي يركز على زيت الزيتون والأسماك والخضار",
            en: "Healthy eating pattern focusing on olive oil, fish, and vegetables"
        },
        benefits: [
            "يقلل مخاطر أمراض القلب",
            "يحسن وظائف المخ",
            "مضاد للالتهابات",
            "يدعم طول العمر"
        ],
        allowedFoods: ["olive-oil", "fish", "vegetables", "fruits", "nuts", "whole-grains"],
        restrictedFoods: ["processed-meat", "refined-sugar", "trans-fats"]
    },
    "keto": {
        nameAr: "الحمية الكيتونية",
        nameEn: "Ketogenic Diet",
        description: {
            ar: "حمية عالية الدهون قليلة الكربوهيدرات",
            en: "High-fat, low-carbohydrate diet"
        },
        benefits: [
            "فقدان الوزن السريع",
            "تحسين التركيز",
            "استقرار السكر",
            "زيادة الطاقة"
        ],
        macros: { fat: 70, protein: 25, carbs: 5 },
        allowedFoods: ["meat", "fish", "eggs", "cheese", "oils", "nuts", "low-carb-vegetables"],
        restrictedFoods: ["grains", "sugar", "fruits", "starchy-vegetables"]
    }
};

// مدير بيانات التغذية
// Nutrition Data Manager
class NutritionDataManager {
    constructor() {
        this.foods = foodsDatabase;
        this.recipes = healthyRecipes;
        this.plans = nutritionPlans;
        this.categories = foodCategories;
        this.diets = dietTypes;
        this.currentLanguage = 'ar';
    }

    // البحث في الأطعمة
    searchFoods(query, filters = {}) {
        let results = this.foods;

        // البحث النصي
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(food => 
                food.nameAr.toLowerCase().includes(searchTerm) ||
                food.nameEn.toLowerCase().includes(searchTerm) ||
                food.category.toLowerCase().includes(searchTerm)
            );
        }

        // تطبيق الفلاتر
        if (filters.category) {
            results = results.filter(food => food.category === filters.category);
        }

        if (filters.maxCalories) {
            results = results.filter(food => food.calories <= filters.maxCalories);
        }

        if (filters.minProtein) {
            results = results.filter(food => food.protein >= filters.minProtein);
        }

        if (filters.dietaryRestrictions) {
            results = results.filter(food => 
                filters.dietaryRestrictions.every(restriction => 
                    food.dietaryRestrictions.includes(restriction)
                )
            );
        }

        return results;
    }

    // البحث في الوصفات
    searchRecipes(query, filters = {}) {
        let results = this.recipes;

        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(recipe => 
                recipe.nameAr.toLowerCase().includes(searchTerm) ||
                recipe.nameEn.toLowerCase().includes(searchTerm) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        if (filters.difficulty) {
            results = results.filter(recipe => recipe.difficulty === filters.difficulty);
        }

        if (filters.maxTime) {
            results = results.filter(recipe => 
                (recipe.prepTime + recipe.cookTime) <= filters.maxTime
            );
        }

        if (filters.cuisine) {
            results = results.filter(recipe => recipe.cuisine === filters.cuisine);
        }

        return results;
    }

    // حساب القيم الغذائية للوصفة
    calculateRecipeNutrition(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return null;

        let totalNutrition = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0
        };

        recipe.ingredients.forEach(ingredient => {
            const food = this.foods.find(f => 
                f.nameAr === ingredient.nameAr || f.nameEn === ingredient.nameEn
            );
            
            if (food) {
                const multiplier = ingredient.amount / 100; // assuming 100g base
                totalNutrition.calories += food.calories * multiplier;
                totalNutrition.protein += food.protein * multiplier;
                totalNutrition.carbs += food.carbs * multiplier;
                totalNutrition.fat += food.fat * multiplier;
                totalNutrition.fiber += food.fiber * multiplier;
            }
        });

        // تقسيم على عدد الحصص
        Object.keys(totalNutrition).forEach(key => {
            totalNutrition[key] = Math.round(totalNutrition[key] / recipe.servings * 10) / 10;
        });

        return totalNutrition;
    }

    // إحصائيات التغذية
    getNutritionStats() {
        return {
            totalFoods: this.foods.length,
            totalRecipes: this.recipes.length,
            categoriesCount: Object.keys(this.categories).length,
            avgCaloriesPerFood: Math.round(
                this.foods.reduce((sum, food) => sum + food.calories, 0) / this.foods.length
            ),
            highProteinFoods: this.foods.filter(food => food.protein > 15).length,
            lowCalorieFoods: this.foods.filter(food => food.calories < 100).length,
            vegetarianRecipes: this.recipes.filter(recipe => 
                recipe.tags.includes('vegetarian')
            ).length
        };
    }

    // تحديث اللغة
    setLanguage(language) {
        this.currentLanguage = language;
    }

    // الحصول على النص بناءً على اللغة
    getText(key, data) {
        return this.currentLanguage === 'ar' ? data[key + 'Ar'] || data.ar : data[key + 'En'] || data.en;
    }
}

// تصدير البيانات والمدير
// Export data and manager
export {
    foodsDatabase,
    healthyRecipes,
    nutritionPlans,
    foodCategories,
    dietTypes,
    NutritionDataManager
};

// دعم Node.js
// Node.js support
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        foodsDatabase,
        healthyRecipes,
        nutritionPlans,
        foodCategories,
        dietTypes,
        NutritionDataManager
    };
}