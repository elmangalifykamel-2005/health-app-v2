/**
 * إصلاح أزرار التنقل في الصفحات المختلفة
 * Fix navigation buttons across different pages
 * 
 * هذا السكريبت يضيف أزرار التنقل الموحدة إلى الصفحات التي لا تحتوي عليها
 * This script adds unified navigation buttons to pages that don't have them
 */

// تعديل صفحة nutrition/index.html
function fixNutritionIndexPage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إصلاح زر العودة في الشريط الجانبي
        const backToMainBtn = document.getElementById('back-to-main');
        if (backToMainBtn) {
            backToMainBtn.onclick = function() {
                if (window.navigationService && typeof navigationService.navigateTo === 'function') {
                    navigationService.navigateTo(getPagePath('main'));
                } else {
                    window.location.href = "../../../main.html";
                }
            };
            console.log('✅ تم إصلاح زر العودة في صفحة التغذية');
        }
    });
}

// تعديل صفحة mental-health.html
function fixMentalHealthPage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة أزرار التنقل إلى الحاوية الرئيسية
        const container = document.querySelector('.container');
        if (!container) return;
        
        // إنشاء عنصر أزرار التنقل
        const navButtons = document.createElement('div');
        navButtons.className = 'navigation-buttons';
        navButtons.style.cssText = 'display: flex; gap: 10px; margin-bottom: 20px;';
        
        // إضافة زر العودة للرئيسية
        const homeButton = document.createElement('button');
        homeButton.className = 'back-btn';
        homeButton.innerHTML = '<i class="fas fa-home"></i> العودة للرئيسية';
        homeButton.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #8e24aa; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;';
        homeButton.onclick = function() {
            if (window.navigationService && typeof navigationService.navigateTo === 'function') {
                navigationService.navigateTo(getPagePath('main'));
            } else {
                window.location.href = "../../main.html";
            }
        };
        
        // إضافة زر الرجوع
        const backButton = document.createElement('button');
        backButton.className = 'history-back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-right"></i> رجوع';
        backButton.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #e0e0e0; color: #333; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;';
        backButton.onclick = function() {
            window.history.back();
        };
        
        // إضافة الأزرار إلى العنصر
        navButtons.appendChild(homeButton);
        navButtons.appendChild(backButton);
        
        // إضافة العنصر إلى بداية الحاوية
        const firstChild = container.firstChild;
        if (firstChild) {
            container.insertBefore(navButtons, firstChild);
        } else {
            container.appendChild(navButtons);
        }
        
        console.log('✅ تمت إضافة أزرار التنقل إلى صفحة الصحة النفسية');
    });
}

// تعديل صفحة about-me.html
function fixAboutMePage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة زر العودة إلى الرأس
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        // إنشاء زر العودة
        const backButton = document.createElement('button');
        backButton.className = 'back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
        backButton.style.cssText = 'background: rgba(255, 255, 255, 0.2); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 16px;';
        backButton.onclick = function() {
            if (window.navigationService && typeof navigationService.navigateTo === 'function') {
                navigationService.navigateTo(getPagePath('main'));
            } else {
                window.location.href = "../../main.html";
            }
        };
        
        // إضافة تأثيرات التحويم
        backButton.addEventListener('mouseover', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        backButton.addEventListener('mouseout', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        // البحث عن مجموعة الأزرار المناسبة لإضافة زر العودة
        const btnGroup = document.querySelector('.btn-group-ar');
        if (btnGroup) {
            btnGroup.insertBefore(backButton, btnGroup.firstChild);
        } else {
            header.insertBefore(backButton, header.firstChild);
        }
        
        console.log('✅ تمت إضافة زر العودة إلى صفحة نبذة عني');
    });
}

// تعديل صفحة herbs.html
function fixHerbsPage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة زر العودة إلى رأس الصفحة
        const header = document.querySelector('.page-header');
        if (!header) return;
        
        // إنشاء زر العودة
        const backButton = document.createElement('button');
        backButton.className = 'back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-right"></i> رجوع';
        backButton.style.cssText = 'position: absolute; right: 20px; top: 20px; padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 8px;';
        backButton.onclick = function() {
            window.history.back();
        };
        
        // ضبط الموضع النسبي للرأس
        header.style.position = 'relative';
        
        // إضافة زر العودة
        header.appendChild(backButton);
        
        console.log('✅ تمت إضافة زر العودة إلى صفحة الأعشاب');
    });
}

// تعديل صفحة studies.html
function fixStudiesPage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة زر العودة إلى رأس الصفحة
        const header = document.querySelector('.page-header');
        if (!header) return;
        
        // إنشاء زر العودة
        const backButton = document.createElement('button');
        backButton.className = 'back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-right"></i> رجوع';
        backButton.style.cssText = 'position: absolute; right: 20px; top: 20px; padding: 8px 16px; background-color: #1976D2; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 8px;';
        backButton.onclick = function() {
            window.history.back();
        };
        
        // ضبط الموضع النسبي للرأس
        header.style.position = 'relative';
        
        // إضافة زر العودة
        header.appendChild(backButton);
        
        console.log('✅ تمت إضافة زر العودة إلى صفحة الدراسات العلمية');
    });
}

// تعديل صفحات الملف الطبي
function fixMedicalFilePage() {
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة أزرار التنقل في بداية الصفحة
        const container = document.querySelector('.container');
        if (!container) return;
        
        // تحقق إذا كانت أزرار التنقل موجودة بالفعل
        if (container.querySelector('.navigation-buttons')) return;
        
        // إنشاء حاوية أزرار التنقل
        const navButtons = document.createElement('div');
        navButtons.className = 'navigation-buttons';
        navButtons.style.cssText = 'display: flex; gap: 10px; margin-bottom: 20px; padding-top: 10px;';
        
        // زر العودة للرئيسية
        const homeButton = document.createElement('button');
        homeButton.className = 'back-to-main-btn';
        homeButton.innerHTML = '<i class="fas fa-home"></i> العودة للرئيسية';
        homeButton.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #388e3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;';
        homeButton.onclick = function() {
            window.location.href = "../../main.html";
        };
        
        // زر الرجوع للخلف
        const backButton = document.createElement('button');
        backButton.className = 'go-back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-right"></i> رجوع';
        backButton.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 10px 15px; background-color: #e0e0e0; color: #333; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;';
        backButton.onclick = function() {
            window.history.back();
        };
        
        // إضافة الأزرار إلى الحاوية
        navButtons.appendChild(homeButton);
        navButtons.appendChild(backButton);
        
        // إضافة الأزرار إلى بداية الصفحة
        container.insertBefore(navButtons, container.firstChild);
        
        // تفعيل أزرار الصفحة الجديدة باستخدام معرفات الهوية
        setupButtonEventListeners();
        
        // إصلاح الأزرار الموجودة داخل النوافذ المنبثقة
        const modalButtons = document.querySelectorAll('.modal .form-actions button');
        modalButtons.forEach(button => {
            if (button.textContent.includes('إلغاء')) {
                button.onclick = function() {
                    const modalId = this.closest('.modal').id;
                    document.getElementById(modalId).style.display = 'none';
                };
            }
            
            if (button.textContent.includes('حفظ')) {
                // تأكد من أن النموذج سيقدم بشكل طبيعي
                button.type = 'submit';
            }
        });
        
        // إضافة مستمعي الأحداث للأزرار حسب المعرفات
        function setupButtonEventListeners() {
            // وظيفة مساعدة لفتح النوافذ المنبثقة
            function openModal(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    console.log('تم فتح النافذة المنبثقة: ' + modalId);
                } else {
                    console.error('لم يتم العثور على العنصر: ' + modalId);
                }
            }
            
            // وظيفة مساعدة لإغلاق النوافذ المنبثقة
            function closeModal(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'none';
                    console.log('تم إغلاق النافذة المنبثقة: ' + modalId);
                } else {
                    console.error('لم يتم العثور على العنصر: ' + modalId);
                }
            }
            
            // وظائف إضافية للتقرير الطبي
            function printReport() {
                console.log('طباعة التقرير...');
                window.print();
            }
            
            function saveReport() {
                console.log('حفظ التقرير...');
                alert('جاري تحويل التقرير إلى PDF...\nستتمكن من تنزيل الملف قريباً.');
                // هنا يمكن إضافة كود لتحويل الصفحة إلى PDF
            }
            
            function shareReport() {
                console.log('مشاركة التقرير...');
                
                if (navigator.share) {
                    navigator.share({
                        title: 'تقريري الطبي - صحتك بالدنيا',
                        text: 'إليك تقريري الطبي من تطبيق صحتك بالدنيا',
                        url: window.location.href,
                    })
                    .then(() => console.log('تمت المشاركة بنجاح'))
                    .catch((error) => console.log('خطأ في المشاركة', error));
                } else {
                    alert('مشاركة التقرير غير متاحة في متصفحك. يمكنك نسخ رابط الصفحة ومشاركته يدوياً.');
                }
            }
            
            // إضافة مستمعي الأحداث للأزرار
            const buttonMappings = [
                // أزرار صفحة الملف الطبي الرئيسية (medical-profile.html)
                { id: 'btn-edit-basic-info', action: () => openModal('basicInfoModal') },
                { id: 'btn-add-allergy', action: () => openModal('allergiesModal') },
                { id: 'btn-add-medication', action: () => openModal('medicationsModal') },
                { id: 'btn-add-condition', action: () => openModal('conditionsModal') },
                { id: 'btn-add-surgery', action: () => openModal('surgeriesModal') },
                { id: 'btn-add-vaccination', action: () => openModal('vaccinationsModal') },
                { id: 'btn-add-family-history', action: () => openModal('familyHistoryModal') },
                { id: 'btn-add-lifestyle', action: () => openModal('lifestyleModal') },
                
                // أزرار إغلاق النوافذ المنبثقة
                { id: 'btn-close-basic-info-modal', action: () => closeModal('basicInfoModal') },
                { id: 'btn-cancel-basic-info', action: () => closeModal('basicInfoModal') },
                { id: 'btn-close-allergies-modal', action: () => closeModal('allergiesModal') },
                { id: 'btn-cancel-allergy', action: () => closeModal('allergiesModal') },
                { id: 'btn-close-medications-modal', action: () => closeModal('medicationsModal') },
                { id: 'btn-cancel-medication', action: () => closeModal('medicationsModal') },
                { id: 'btn-close-conditions-modal', action: () => closeModal('conditionsModal') },
                { id: 'btn-cancel-condition', action: () => closeModal('conditionsModal') },
                { id: 'btn-close-surgeries-modal', action: () => closeModal('surgeriesModal') },
                { id: 'btn-cancel-surgery', action: () => closeModal('surgeriesModal') },
                { id: 'btn-close-vaccinations-modal', action: () => closeModal('vaccinationsModal') },
                { id: 'btn-cancel-vaccination', action: () => closeModal('vaccinationsModal') },
                { id: 'btn-close-family-history-modal', action: () => closeModal('familyHistoryModal') },
                { id: 'btn-cancel-family-history', action: () => closeModal('familyHistoryModal') },
                { id: 'btn-close-lifestyle-modal', action: () => closeModal('lifestyleModal') },
                { id: 'btn-cancel-lifestyle', action: () => closeModal('lifestyleModal') },
                
                // أزرار الرجوع في صفحة التحاليل الطبية وصفحة تحليل التحاليل
                { id: 'btn-go-back', action: () => window.history.back() },
                
                // أزرار صفحة التقرير الطبي (medical-report.html)
                { id: 'btn-print-report', action: printReport },
                { id: 'btn-save-report', action: saveReport },
                { id: 'btn-share-report', action: shareReport },
                
                // أزرار صفحة التحاليل الطبية (medical-tests.html)
                { id: 'btn-export-results', action: () => {
                    if (typeof exportResultsToJSON === 'function') {
                        exportResultsToJSON();
                    } else {
                        console.error('وظيفة exportResultsToJSON غير معرفة');
                    }
                }}
            ];
            
            buttonMappings.forEach(mapping => {
                const button = document.getElementById(mapping.id);
                if (button) {
                    button.addEventListener('click', mapping.action);
                    console.log('تم إضافة مستمع الحدث للزر: ' + mapping.id);
                    
                    // إضافة تأثيرات التفاعل مع الأزرار
                    if (button.classList.contains('btn-add-medical') || 
                        button.classList.contains('btn-action-primary')) {
                        button.classList.add('ripple-effect');
                        
                        button.addEventListener('mousedown', function(e) {
                            const rect = this.getBoundingClientRect();
                            const ripple = document.createElement('span');
                            const size = Math.max(rect.width, rect.height);
                            const x = e.clientX - rect.left - size / 2;
                            const y = e.clientY - rect.top - size / 2;
                            
                            ripple.style.width = ripple.style.height = size + 'px';
                            ripple.style.left = x + 'px';
                            ripple.style.top = y + 'px';
                            ripple.className = 'ripple';
                            
                            this.appendChild(ripple);
                            
                            setTimeout(() => {
                                ripple.remove();
                            }, 600);
                        });
                    }
                } else {
                    console.log('لم يتم العثور على الزر: ' + mapping.id);
                }
            });
            
            // تفعيل إغلاق النوافذ المنبثقة عند النقر خارجها
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.addEventListener('click', function(event) {
                    if (event.target === this) {
                        this.style.display = 'none';
                    }
                });
            });
            
            // إضافة مستمع حدث لجدول التحاليل الطبية لمعالجة أزرار الحذف
            const testsTable = document.querySelector('table.tests-table');
            if (testsTable) {
                testsTable.addEventListener('click', function(event) {
                    // البحث عن أقرب زر للعنصر الذي تم النقر عليه
                    const deleteButton = event.target.closest('button');
                    if (deleteButton) {
                        // استخراج معرف الاختبار من خاصية data-test-id
                        const testId = deleteButton.getAttribute('data-test-id');
                        if (testId && typeof deleteTest === 'function') {
                            deleteTest(parseInt(testId, 10));
                        }
                    }
                });
                
                // إذا كان هناك دالة renderTests، قم بتعديلها لاستخدام السمة data-test-id بدلاً من onclick
                if (typeof renderTests === 'function') {
                    // حفظ المرجع الأصلي للدالة
                    const originalRenderTests = window.renderTests;
                    
                    // استبدال الدالة الأصلية بنسخة معدلة
                    window.renderTests = function(tests) {
                        const tbody = document.querySelector('.tests-table tbody');
                        if (!tbody) return;
                        
                        tbody.innerHTML = '';
                        
                        tests.forEach(test => {
                            let date = new Date(test.date).toLocaleDateString('ar-EG');
                            let type = test.section ? `${test.section} - ${test.type}` : test.type;
                            let result = test.results ? Object.entries(test.results).map(([k,v]) => `${k}: ${v}`).join(', ') : (test.result || '');
                            
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${date}</td>
                                <td>${type}</td>
                                <td>${result}</td>
                                <td>
                                    <button data-test-id="${test.id}" style="background:#f44336;color:#fff;border:none;border-radius:8px;padding:6px 16px;cursor:pointer;">
                                        <i class="fas fa-trash"></i> مسح
                                    </button>
                                </td>
                            `;
                            tbody.appendChild(row);
                        });
                        
                        console.log('✅ تم تحديث جدول التحاليل الطبية باستخدام تفويض الأحداث');
                    };
                }
            }
        }
        
        console.log('✅ تم إصلاح أزرار صفحة الملف الطبي');
    });
}

// تصدير الوظائف للاستخدام العام
window.navigationFixes = {
    fixNutritionIndexPage,
    fixMentalHealthPage,
    fixAboutMePage,
    fixHerbsPage,
    fixStudiesPage,
    fixMedicalFilePage
};