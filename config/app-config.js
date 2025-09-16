/**
 * ملف الإعدادات المركزية للتطبيق 
 * يتم استخدامه لإدارة المسارات والإعدادات الأساسية
 */

const APP_CONFIG = {
    // مسارات الوحدات الأساسية
    paths: {
        modules: {
            about: "modules/about/",
            calories: "modules/calories/",
            healthState: "modules/health-state/",
            healthyRecipes: "modules/healthy-recepies/",
            herbs: "modules/herbs/",
            medicalFile: "modules/medical-file/",
            mentalHealth: "modules/mental-health/",
            nutrition: "modules/nutrition/",
            sleep: "modules/sleep/",
            studies: "modules/studies/"
        },
        
        // مسارات الصفحات الرئيسية
        pages: {
            main: "main.html",
            login: "login.html",
            index: "index.html",
            consult: "consult.html",
            sidebar: "sidebar.html"
        }
    },
    
    // مفاتيح التخزين المحلي
    storage: {
        language: "hl_language",
        userData: "hl_user_data",
        basicInfo: "basicInfo",
        userId: "app_user_id"
    },
    
    // إعدادات اللغة
    languages: {
        ar: "ar",
        en: "en"
    },
    
    // إعدادات Firebase
    firebase: {
        collections: {
            medical: "medical",
            profile: "profile",
            sleep: "sleep",
            nutrition: "nutrition",
            mentalHealth: "mentalHealth",
            measurements: "measurements",
            healthState: "healthState"
        },
        documents: {
            basicInfo: "basicInfo",
            measurements: "measurements",
            sleepData: "sleepData",
            assessmentData: "assessmentData"
        }
    },
    
    // إعدادات API الخارجية (إذا وجدت)
    api: {
        baseUrl: "",
        endpoints: {}
    }
};

// دالة للحصول على المسار الكامل لوحدة معينة
function getModulePath(moduleName, file = "") {
    if (APP_CONFIG.paths.modules[moduleName]) {
        return APP_CONFIG.paths.modules[moduleName] + file;
    }
    console.error(`المسار غير موجود للوحدة: ${moduleName}`);
    return "";
}

// دالة للحصول على المسار الكامل لصفحة رئيسية
function getPagePath(pageName) {
    if (APP_CONFIG.paths.pages[pageName]) {
        return APP_CONFIG.paths.pages[pageName];
    }
    console.error(`المسار غير موجود للصفحة: ${pageName}`);
    return "";
}

// تصدير الإعدادات والدوال
window.APP_CONFIG = APP_CONFIG;
window.getModulePath = getModulePath;
window.getPagePath = getPagePath;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_CONFIG, getModulePath, getPagePath };
}