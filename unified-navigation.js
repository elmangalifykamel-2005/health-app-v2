/**
 * تطبيق موحد لأزرار التنقل في جميع أنحاء التطبيق
 * ملف لتنفيذ جميع تحسينات التنقل في التطبيق بصورة مركزية
 */

// استدعاء الملفات المطلوبة
document.write('<script src="config/navigation-helpers.js"></script>');
document.write('<script src="config/modal-helpers.js"></script>');

document.addEventListener('DOMContentLoaded', function() {
    // تطبيق أزرار التنقل الموحدة على صفحات التطبيق
    if (typeof addUnifiedNavigationButtons === 'function') {
        // التحقق من نوع الصفحة الحالية
        const isMainPage = window.location.pathname.includes('main.html');
        const isLoginPage = window.location.pathname.includes('login.html');
        
        // تجاهل الصفحات الرئيسية التي لا تحتاج أزرار تنقل (مثل صفحة تسجيل الدخول أو الصفحة الرئيسية)
        if (!isMainPage && !isLoginPage) {
            addUnifiedNavigationButtons('.container');
            console.log('✅ تم تطبيق أزرار التنقل الموحدة على الصفحة الحالية');
        } else {
            console.log('ℹ️ تم تجاهل إضافة أزرار التنقل (صفحة رئيسية/تسجيل دخول)');
        }
    }
    
    // تطبيق أزرار الإغلاق على النوافذ المنبثقة
    if (typeof addCloseButtonToModal === 'function') {
        // التحقق ما إذا كانت الصفحة هي نافذة منبثقة (ليست صفحة رئيسية)
        const isModal = window.location.pathname.includes('modal.html');
        const hasModalContainer = document.querySelector('.modal-box');
        
        if (isModal || hasModalContainer) {
            addCloseButtonToModal('.modal-box');
            console.log('✅ تم إضافة زر الإغلاق للنافذة المنبثقة');
        }
    }
    
    // تحسين أزرار العودة الموجودة حاليًا وتوحيدها
    const improveExistingButtons = function() {
        const backButtons = document.querySelectorAll('.back-btn, [id*="back"], [id*="Back"], button:contains("رجوع"), button:contains("العودة")');
        
        backButtons.forEach(button => {
            // تجاهل الأزرار التي تم إضافتها من قبل نظام التنقل الموحد
            if (button.closest('.navigation-buttons')) {
                return;
            }
            
            // تحسين مظهر الزر
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.gap = '8px';
            button.style.transition = 'all 0.2s ease';
            
            // إضافة أيقونة إذا لم تكن موجودة
            if (!button.querySelector('.fas')) {
                button.innerHTML = '<i class="fas fa-arrow-right"></i> ' + button.textContent;
            }
            
            // إضافة تأثير التحويم
            button.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            
            button.addEventListener('mouseout', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    };
    
    // محاولة تحسين الأزرار الموجودة بعد تحميل الصفحة
    setTimeout(improveExistingButtons, 500);
});

// تنبيه مطور: هذا الملف يجب أن يستدعى في جميع صفحات التطبيق لتوحيد مظهر وسلوك أزرار التنقل
console.log('🔄 تم تحميل نظام التنقل الموحد');