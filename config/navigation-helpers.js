/**
 * وظائف لتوحيد تنقل التطبيق
 * يوفر هذا الملف وظائف لتوحيد تصميم وسلوك أزرار التنقل في جميع أنحاء التطبيق
 */

// وظيفة لإضافة أزرار التنقل الموحدة إلى الصفحة
function addUnifiedNavigationButtons(containerSelector = '.container', insertBeforeSelector = ':first-child') {
    document.addEventListener('DOMContentLoaded', function() {
        // البحث عن حاوية المحتوى
        const container = document.querySelector(containerSelector);
        
        if (!container) {
            console.error('❌ لم يتم العثور على حاوية المحتوى:', containerSelector);
            return;
        }
        
        // التحقق مما إذا كانت أزرار التنقل موجودة بالفعل
        if (container.querySelector('.navigation-buttons')) {
            console.log('⚠️ أزرار التنقل موجودة بالفعل في الصفحة');
            return;
        }
        
        // إنشاء عنصر لأزرار التنقل
        const navigationButtons = document.createElement('div');
        navigationButtons.className = 'navigation-buttons';
        navigationButtons.style.cssText = 'display: flex; padding: 15px 0; margin-bottom: 20px; gap: 10px;';
        
        // إنشاء زر العودة إلى الرئيسية
        const homeButton = document.createElement('button');
        homeButton.className = 'back-btn standard-btn';
        homeButton.innerHTML = '<i class="fas fa-arrow-right"></i> العودة للرئيسية';
        homeButton.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); background-color: #388e3c; color: white;';
        homeButton.onclick = function() {
            if (window.navigationService && typeof navigationService.navigateTo === 'function') {
                navigationService.navigateTo(getPagePath('main'));
            } else {
                window.location.href = "../../main.html";
            }
        };
        
        // إنشاء زر العودة للخلف
        const backButton = document.createElement('button');
        backButton.className = 'history-back-btn standard-btn';
        backButton.innerHTML = '<i class="fas fa-chevron-right"></i> رجوع';
        backButton.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); background-color: #f0f0f0; color: #333;';
        backButton.onclick = function() {
            window.history.back();
        };
        
        // إضافة أنماط التحويم
        const addHoverEffect = (button) => {
            button.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            
            button.addEventListener('mouseout', function() {
                this.style.transform = '';
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
        };
        
        addHoverEffect(homeButton);
        addHoverEffect(backButton);
        
        // إضافة الأزرار إلى عنصر التنقل
        navigationButtons.appendChild(homeButton);
        navigationButtons.appendChild(backButton);
        
        // التحقق ما إذا كان يجب إخفاء زر العودة
        if (window.history.length <= 1) {
            backButton.style.display = 'none';
        }
        
        // إضافة عنصر التنقل إلى الحاوية
        const referenceElement = container.querySelector(insertBeforeSelector);
        
        if (referenceElement) {
            container.insertBefore(navigationButtons, referenceElement);
        } else {
            container.appendChild(navigationButtons);
        }
        
        console.log('✅ تمت إضافة أزرار التنقل الموحدة إلى الصفحة');
        
        // ضبط تخصيصات إضافية للتوافق مع الأجهزة المختلفة
        function handleResponsiveness() {
            if (window.innerWidth <= 768) {
                navigationButtons.style.flexDirection = 'row';
                navigationButtons.style.justifyContent = 'space-between';
                
                homeButton.style.flex = '1';
                homeButton.style.justifyContent = 'center';
                homeButton.style.fontSize = '14px';
                
                backButton.style.flex = '1';
                backButton.style.justifyContent = 'center';
                backButton.style.fontSize = '14px';
            } else {
                navigationButtons.style.flexDirection = '';
                navigationButtons.style.justifyContent = '';
                
                homeButton.style.flex = '';
                homeButton.style.justifyContent = '';
                homeButton.style.fontSize = '';
                
                backButton.style.flex = '';
                backButton.style.justifyContent = '';
                backButton.style.fontSize = '';
            }
        }
        
        // تطبيق التخصيصات المستجيبة عند تحميل الصفحة وتغيير حجم النافذة
        handleResponsiveness();
        window.addEventListener('resize', handleResponsiveness);
    });
}

// تصدير الدالة للاستخدام العام
window.addUnifiedNavigationButtons = addUnifiedNavigationButtons;