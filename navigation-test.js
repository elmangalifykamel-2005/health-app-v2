/**
 * اختبار الروابط بين الصفحات
 * Navigation Testing Script for صحتك بالدنيا (Healthy Life) Application
 */

// تأكد من توفر الدوال الأساسية للتنقل
console.log("=== اختبار توفر الدوال الأساسية للتنقل ===");

// اختبار وجود APP_CONFIG
if (window.APP_CONFIG) {
    console.log("✅ APP_CONFIG متوفر");
} else {
    console.error("❌ APP_CONFIG غير متوفر");
}

// اختبار وجود getModulePath
if (typeof window.getModulePath === 'function') {
    console.log("✅ getModulePath متوفر");
    
    // اختبار وظيفة getModulePath
    const testPath = getModulePath('healthState', 'healthstate.html');
    console.log("- اختبار المسار:", testPath);
    if (testPath === 'modules/health-state/healthstate.html') {
        console.log("✅ getModulePath يعمل بشكل صحيح");
    } else {
        console.error("❌ getModulePath لا يعمل بشكل صحيح");
        console.error("- المسار المتوقع: modules/health-state/healthstate.html");
        console.error("- المسار الفعلي:", testPath);
    }
} else {
    console.error("❌ getModulePath غير متوفر");
}

// اختبار وجود getPagePath
if (typeof window.getPagePath === 'function') {
    console.log("✅ getPagePath متوفر");
    
    // اختبار وظيفة getPagePath
    const testMainPath = getPagePath('main');
    console.log("- اختبار مسار الصفحة الرئيسية:", testMainPath);
    if (testMainPath === 'main.html') {
        console.log("✅ getPagePath يعمل بشكل صحيح");
    } else {
        console.error("❌ getPagePath لا يعمل بشكل صحيح");
        console.error("- المسار المتوقع: main.html");
        console.error("- المسار الفعلي:", testMainPath);
    }
} else {
    console.error("❌ getPagePath غير متوفر");
}

// اختبار وجود navigationService
if (window.navigationService) {
    console.log("✅ navigationService متوفر");
    console.log("- أساليب التنقل المتاحة:", Object.keys(navigationService).join(', '));
} else {
    console.error("❌ navigationService غير متوفر");
}

// اختبار مسارات الوحدات
console.log("\n=== اختبار مسارات الوحدات ===");
const modulesToCheck = [
    'about', 
    'calories', 
    'healthState', 
    'healthyRecipes', 
    'herbs', 
    'medicalFile', 
    'mentalHealth', 
    'nutrition', 
    'sleep', 
    'studies'
];

modulesToCheck.forEach(module => {
    const path = getModulePath(module);
    if (path) {
        console.log(`✅ مسار وحدة ${module}: ${path}`);
    } else {
        console.error(`❌ مسار وحدة ${module} غير متوفر`);
    }
});

console.log("\n=== اختبار مسارات الصفحات الرئيسية ===");
const pagesToCheck = ['main', 'login', 'index', 'consult', 'sidebar'];

pagesToCheck.forEach(page => {
    const path = getPagePath(page);
    if (path) {
        console.log(`✅ مسار صفحة ${page}: ${path}`);
    } else {
        console.error(`❌ مسار صفحة ${page} غير متوفر`);
    }
});

console.log("\n=== اكتمل اختبار التنقل ===");