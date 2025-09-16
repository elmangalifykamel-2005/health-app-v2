/**
 * نظام التنقل الموحد
 * Unified Navigation System
 * 
 * هذا الملف مسؤول عن إضافة أزرار التنقل الموحدة إلى جميع صفحات التطبيق
 * This file is responsible for adding unified navigation buttons to all pages in the application
 */

// التأكد من تحميل الملفات اللازمة
// Ensure required files are loaded
if (!window.addUnifiedNavigationButtons) {
    console.error('❌ تعذر العثور على دالة addUnifiedNavigationButtons. يرجى التأكد من استدعاء ملف navigation-helpers.js');
    document.write('<script src="../../config/navigation-helpers.js"></script>');
}

// تهيئة نظام التنقل عند تحميل الصفحة
// Initialize navigation system when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // تحديد نوع الصفحة
    // Determine page type
    const pageType = detectPageType();
    
    // تطبيق التنقل المناسب بناءً على نوع الصفحة
    // Apply appropriate navigation based on page type
    applyNavigationByPageType(pageType);
    
    // إصلاح أزرار العودة الموجودة مسبقًا التي لا تعمل
    // Fix existing non-functional back buttons
    fixExistingBackButtons();
    
    console.log(`✅ تم تهيئة نظام التنقل الموحد (نوع الصفحة: ${pageType})`);
});

/**
 * تحديد نوع الصفحة الحالية
 * Detect current page type
 * @returns {string} نوع الصفحة (module, modal, main, other)
 */
function detectPageType() {
    const path = window.location.pathname;
    
    if (path.includes('/modules/')) {
        if (path.includes('-modal.html')) {
            return 'modal';
        } else {
            return 'module';
        }
    } else if (path.includes('/main.html')) {
        return 'main';
    } else {
        return 'other';
    }
}

/**
 * تطبيق التنقل المناسب بناءً على نوع الصفحة
 * Apply appropriate navigation based on page type
 * @param {string} pageType - نوع الصفحة
 */
function applyNavigationByPageType(pageType) {
    switch (pageType) {
        case 'module':
            // إضافة أزرار التنقل الموحدة للوحدات
            addUnifiedNavigationButtons('.container, main, body', ':first-child');
            break;
        
        case 'modal':
            // إضافة زر الإغلاق للنوافذ المنبثقة
            addCloseButtonToModal();
            break;
            
        case 'main':
            // الصفحة الرئيسية لا تحتاج إلى أزرار العودة
            break;
            
        default:
            // إضافة أزرار التنقل الموحدة للصفحات الأخرى
            addUnifiedNavigationButtons();
            break;
    }
}

/**
 * إضافة زر الإغلاق إلى النافذة المنبثقة
 * Add close button to modal
 */
function addCloseButtonToModal() {
    // التحقق من وجود نافذة منبثقة
    const modal = document.querySelector('.modal-content, .modal');
    if (!modal) {
        console.log('⚠️ لم يتم العثور على نافذة منبثقة في الصفحة');
        return;
    }
    
    // التحقق من وجود زر إغلاق بالفعل
    if (modal.querySelector('.modal-close-btn, .close-btn')) {
        console.log('⚠️ زر الإغلاق موجود بالفعل');
        return;
    }
    
    // إنشاء زر الإغلاق
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close-btn';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = 'position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); border: none; color: #333; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px;';
    
    // إضافة سلوك الإغلاق
    closeButton.onclick = function() {
        // محاولة استخدام وظائف الإغلاق القياسية أولاً
        if (window.closeModal && typeof closeModal === 'function') {
            closeModal();
        } else if (window.hideModal && typeof hideModal === 'function') {
            hideModal();
        } else {
            // محاولة الرجوع إلى الصفحة السابقة
            window.history.back();
        }
    };
    
    // إضافة تأثيرات التحويم
    closeButton.addEventListener('mouseover', function() {
        this.style.background = 'rgba(255,255,255,0.3)';
        this.style.transform = 'scale(1.1)';
    });
    
    closeButton.addEventListener('mouseout', function() {
        this.style.background = 'rgba(255,255,255,0.2)';
        this.style.transform = '';
    });
    
    // إضافة الزر إلى النافذة المنبثقة
    modal.style.position = 'relative';
    modal.appendChild(closeButton);
    
    console.log('✅ تمت إضافة زر الإغلاق إلى النافذة المنبثقة');
}

/**
 * إصلاح أزرار العودة الموجودة مسبقًا التي لا تعمل
 * Fix existing non-functional back buttons
 */
function fixExistingBackButtons() {
    // البحث عن جميع أزرار العودة الموجودة
    const allBackButtons = document.querySelectorAll('.back-btn, [id*="back"], [class*="back"], [id*="return"], [class*="return"]');
    
    allBackButtons.forEach(button => {
        // تجاوز الأزرار التي تم إضافتها بواسطة نظام التنقل الموحد
        if (button.hasAttribute('data-unified-nav')) {
            return;
        }
        
        // التحقق مما إذا كان الزر يحتوي بالفعل على معالج أحداث
        const hasClickHandler = (typeof button.onclick === 'function' || 
                               button.getAttribute('onclick') || 
                               button.getAttribute('href'));
        
        if (!hasClickHandler) {
            console.log(`ℹ️ إصلاح زر عودة بدون معالج أحداث: ${button.id || button.className}`);
            
            // إضافة معالج الأحداث للعودة إلى الصفحة الرئيسية
            button.onclick = function() {
                if (window.navigationService && typeof navigationService.navigateTo === 'function') {
                    navigationService.navigateTo(getPagePath('main'));
                } else {
                    window.location.href = "../../main.html";
                }
            };
        }
    });
}

// تصدير الوظائف للاستخدام العام
window.unifiedNavigation = {
    detectPageType,
    applyNavigationByPageType,
    addCloseButtonToModal,
    fixExistingBackButtons
};