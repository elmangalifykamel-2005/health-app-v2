/**
 * ملف الوظائف المشتركة بين جميع أجزاء التطبيق
 */

// استيراد ملف الإعدادات
document.write('<script src="config/app-config.js"></script>');

/**
 * وظائف إدارة اللغة
 */
const languageService = {
    // الحصول على اللغة الحالية
    getCurrentLanguage: function() {
        return localStorage.getItem(APP_CONFIG.storage.language) || APP_CONFIG.languages.ar;
    },
    
    // تعيين اللغة
    setLanguage: function(lang) {
        if (lang === APP_CONFIG.languages.ar || lang === APP_CONFIG.languages.en) {
            localStorage.setItem(APP_CONFIG.storage.language, lang);
            return true;
        }
        return false;
    },
    
    // تبديل اللغة
    toggleLanguage: function() {
        const currentLang = this.getCurrentLanguage();
        const newLang = currentLang === APP_CONFIG.languages.ar ? APP_CONFIG.languages.en : APP_CONFIG.languages.ar;
        this.setLanguage(newLang);
        return newLang;
    },
    
    // تطبيق إعدادات اللغة على الصفحة
    applyLanguageSettings: function() {
        const currentLang = this.getCurrentLanguage();
        document.documentElement.lang = currentLang;
        document.body.dir = currentLang === APP_CONFIG.languages.ar ? 'rtl' : 'ltr';
        return currentLang;
    }
};

/**
 * وظائف إدارة المستخدم
 */
const userService = {
    // تسجيل خروج المستخدم
    logout: function() {
        console.log('🚪 تسجيل خروج المستخدم...');
        
        try {
            // استخدام Firebase مباشرة لتجنب المشاكل
            firebase.auth().signOut()
                .then(() => {
                    console.log('✅ تم تسجيل الخروج بنجاح من Firebase');
                    
                    // عدم حذف اللغة المفضلة عند تسجيل الخروج
                    // localStorage.removeItem(APP_CONFIG.storage.language);
                    
                    // توجيه المستخدم للصفحة الرئيسية
                    window.location.href = APP_CONFIG.paths.pages.index;
                })
                .catch(error => {
                    console.error('❌ خطأ في تسجيل الخروج من Firebase:', error);
                    // حتى لو فشل الخروج من Firebase، نقوم بالخروج محلياً
                    window.location.href = APP_CONFIG.paths.pages.index;
                });
        } catch (error) {
            console.error('❌ خطأ أثناء محاولة تسجيل الخروج:', error);
            // إذا لم تكن خدمة Firebase متاحة
            window.location.href = APP_CONFIG.paths.pages.index;
        }
    },
    
    // الحصول على بيانات المستخدم (مع دعم Firebase)
    getUserData: async function(collection, document) {
        if (window.firebaseService) {
            return await firebaseService.data.get(collection, document);
        } else {
            // Fallback للتخزين المحلي
            const dataKey = `${APP_CONFIG.storage.userData}_${collection}_${document}`;
            const userData = localStorage.getItem(dataKey);
            return userData ? JSON.parse(userData) : null;
        }
    },
    
    // حفظ بيانات المستخدم (مع دعم Firebase)
    saveUserData: async function(collection, document, data) {
        if (window.firebaseService) {
            return await firebaseService.data.save(collection, document, data);
        } else {
            // Fallback للتخزين المحلي
            const dataKey = `${APP_CONFIG.storage.userData}_${collection}_${document}`;
            localStorage.setItem(dataKey, JSON.stringify(data));
            return true;
        }
    },
    
    // الحصول على بيانات المستخدم العامة (للتوافق مع الكود القديم)
    getProfileData: function() {
        const userData = localStorage.getItem(APP_CONFIG.storage.userData);
        return userData ? JSON.parse(userData) : null;
    },
    
    // حفظ بيانات المستخدم العامة (للتوافق مع الكود القديم)
    saveProfileData: function(data) {
        localStorage.setItem(APP_CONFIG.storage.userData, JSON.stringify(data));
        // أيضاً حفظ في Firebase إذا كان متاحاً
        if (window.firebaseService) {
            firebaseService.data.save(APP_CONFIG.firebase.collections.profile, 'userData', data);
        }
    },
    
    // التحقق مما إذا كان المستخدم قد أدخل المعلومات الأساسية أو تخطاها
    hasBasicInfo: async function() {
        if (window.firebaseService) {
            const data = await firebaseService.data.get(
                APP_CONFIG.firebase.collections.medical,
                APP_CONFIG.firebase.documents.basicInfo
            );
            // إذا كان هناك خاصية skipped=true اعتبر البيانات غير مكتملة
            if (data && data.skipped === true) return false;
            // تحقق من جميع الحقول المطلوبة
            if (data && data.fullName && data.birthDate && data.height && data.weight && data.waist && data.bloodType) {
                return true;
            }
            return false;
        } else {
            const basicInfoStr = localStorage.getItem(APP_CONFIG.storage.basicInfo);
            if (basicInfoStr !== null) {
                try {
                    const basicInfo = JSON.parse(basicInfoStr);
                    if (basicInfo.skipped === true) {
                        return false;
                    }
                    if (basicInfo.fullName && basicInfo.birthDate && basicInfo.height && basicInfo.weight && basicInfo.waist && basicInfo.bloodType) {
                        return true;
                    }
                    return false;
                } catch (e) {
                    return false;
                }
            }
            return false;
        }
    },
    
    // الحصول على معرف المستخدم الحالي
    getCurrentUserId: function() {
        if (window.firebaseService) {
            return firebaseService.getUserId();
        } else {
            let userId = localStorage.getItem(APP_CONFIG.storage.userId);
            if (!userId) {
                userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem(APP_CONFIG.storage.userId, userId);
            }
            return userId;
        }
    }
};

/**
 * وظائف واجهة المستخدم المشتركة
 */
const uiService = {
    // إظهار تنبيه للمستخدم
    showAlert: function(message, type = 'info', duration = 2500) {
        let alertDiv = document.createElement('div');
        alertDiv.innerText = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '50%';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translate(-50%, -50%)';
        alertDiv.style.background = '#fff';
        alertDiv.style.padding = '24px 32px';
        alertDiv.style.borderRadius = '16px';
        alertDiv.style.boxShadow = '0 4px 24px #0002';
        alertDiv.style.zIndex = '99999';
        alertDiv.style.textAlign = 'center';
        
        // تعيين لون النص حسب نوع التنبيه
        switch (type) {
            case 'error':
                alertDiv.style.color = '#f44336';
                break;
            case 'success':
                alertDiv.style.color = '#4CAF50';
                break;
            case 'warning':
                alertDiv.style.color = '#ff9800';
                break;
            default:
                alertDiv.style.color = '#2196F3';
        }
        
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), duration);
    },
    
    // تحميل مكون خارجي إلى عنصر معين
    loadComponent: function(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (element) {
            fetch(componentPath)
                .then(response => response.text())
                .then(html => {
                    element.innerHTML = html;
                    // تنفيذ أي سكربت في المكون
                    Array.from(element.querySelectorAll('script')).forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                })
                .catch(error => {
                    console.error("خطأ في تحميل المكون:", error);
                    element.innerHTML = `<p>خطأ في تحميل المكون</p>`;
                });
        }
    }
};

/**
 * وظائف التنقل والروابط
 */
const navigationService = {
    // الانتقال إلى صفحة معينة مع الحفاظ على معلومات اللغة
    navigateTo: function(path) {
        window.location.href = path;
    },
    
    // الحصول على معلمات URL
    getUrlParams: function() {
        const params = {};
        new URLSearchParams(window.location.search).forEach((value, key) => {
            params[key] = value;
        });
        return params;
    },
    
    // الانتقال إلى مكون معين داخل التطبيق
    navigateToModule: function(moduleName, file) {
        const path = getModulePath(moduleName, file);
        if (path) {
            this.navigateTo(path);
        }
    }
};

// كشف الخدمات للاستخدام العام
window.languageService = languageService;
window.userService = userService;
window.uiService = uiService;
window.navigationService = navigationService;
window.sharedFunctions = {
    hasBasicInfo: languageService.hasBasicInfo || userService.hasBasicInfo || (typeof hasBasicInfo !== 'undefined' ? hasBasicInfo : undefined)
};