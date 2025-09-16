/**
 * وظيفة مساعدة لتوحيد وتصحيح النوافذ المنبثقة
 * هذا الملف يوفر وظائف مساعدة لإضافة أزرار عودة وإغلاق للنوافذ المنبثقة 
 */

// وظيفة لإضافة زر الإغلاق بشكل ديناميكي للنوافذ المنبثقة
function addCloseButtonToModal(containerSelector = '.modal-box') {
    document.addEventListener('DOMContentLoaded', function() {
        // العثور على حاوية النافذة المنبثقة
        const modalBox = document.querySelector(containerSelector);
        
        if (modalBox) {
            // التحقق ما إذا كان زر الإغلاق موجود بالفعل
            if (!document.querySelector('.modal-navigation')) {
                // إنشاء عنصر شريط التنقل
                const modalNavigation = document.createElement('div');
                modalNavigation.className = 'modal-navigation';
                modalNavigation.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 15px;';
                
                // إنشاء زر الإغلاق
                const closeButton = document.createElement('button');
                closeButton.className = 'close-btn';
                closeButton.innerHTML = '<i class="fas fa-times"></i> إغلاق';
                closeButton.style.cssText = 'display: flex; align-items: center; gap: 5px; background-color: #f44336; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 14px; cursor: pointer; transition: all 0.2s ease;';
                
                // إضافة حدث النقر
                closeButton.onclick = function() {
                    window.close();
                };
                
                // إضافة أنماط التحويم
                closeButton.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#d32f2f';
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                });
                
                closeButton.addEventListener('mouseout', function() {
                    this.style.backgroundColor = '#f44336';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
                
                // إضافة زر الإغلاق إلى شريط التنقل
                modalNavigation.appendChild(closeButton);
                
                // إضافة شريط التنقل كأول عنصر في النافذة المنبثقة
                if (modalBox.firstChild) {
                    modalBox.insertBefore(modalNavigation, modalBox.firstChild);
                } else {
                    modalBox.appendChild(modalNavigation);
                }
                
                console.log('✅ تمت إضافة زر الإغلاق للنافذة المنبثقة');
            }
            
            // إضافة مستمع لمفتاح الهروب ESC لإغلاق النافذة
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') window.close();
            });
        } else {
            console.error('❌ لم يتم العثور على حاوية النافذة المنبثقة:', containerSelector);
        }
    });
}

// تصدير الدالة للاستخدام العام
window.addCloseButtonToModal = addCloseButtonToModal;