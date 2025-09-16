/**
 * خدمة إدارة إعدادات التطبيق
 * تدير تخزين واسترجاع إعدادات التطبيق والمستخدم
 */

import firebaseService from './firebase.service.js';
import authService from './auth.service.js';

class AppSettingsService {
    constructor() {
        // الإعدادات الافتراضية
        this.defaultSettings = {
            // إعدادات واجهة المستخدم
            ui: {
                theme: 'light', // light, dark
                fontSize: 'medium', // small, medium, large
                language: 'ar', // ar, en
                animations: true,
                sidebar: {
                    expanded: true
                }
            },
            
            // إعدادات الإشعارات
            notifications: {
                enabled: true,
                sound: true,
                reminders: true,
                measurements: true,
                updates: true
            },
            
            // الوحدات المستخدمة للقياس
            units: {
                weight: 'kg', // kg, lb
                height: 'cm', // cm, inch
                temperature: 'celsius', // celsius, fahrenheit
                bloodGlucose: 'mg_dl', // mg_dl, mmol_l
                bloodPressure: 'mmHg' // mmHg, kPa
            },
            
            // إعدادات الخصوصية
            privacy: {
                shareAnonymousData: false,
                allowDataAnalytics: false
            },
            
            // إعدادات أخرى
            other: {
                autoSyncInterval: 30 // بالدقائق
            }
        };
        
        // الإعدادات الحالية (تُحمل من التخزين المحلي أو من القيم الافتراضية)
        this.settings = this._loadLocalSettings();
        
        // معرف المستخدم الحالي
        this.currentUserId = null;
        
        // الاستماع لتغييرات حالة المصادقة
        authService.addAuthStateListener((user) => {
            const previousUserId = this.currentUserId;
            this.currentUserId = user ? user.uid : null;
            
            // إذا تغير المستخدم، أعد تحميل الإعدادات
            if (previousUserId !== this.currentUserId && this.currentUserId) {
                this._loadUserSettings();
            }
        });
        
        // تحميل الإعدادات من القاعدة إذا كان المستخدم مسجلاً
        if (authService.isAuthenticated()) {
            this._loadUserSettings();
        }
    }

    /**
     * تحميل الإعدادات المحلية من التخزين المحلي
     * @returns {Object} الإعدادات المحملة
     * @private
     */
    _loadLocalSettings() {
        try {
            const storedSettings = localStorage.getItem('appSettings');
            if (storedSettings) {
                // دمج الإعدادات المخزنة مع الإعدادات الافتراضية
                return this._mergeSettings(JSON.parse(storedSettings), this.defaultSettings);
            }
        } catch (error) {
            console.error('خطأ في تحميل الإعدادات المحلية:', error);
        }
        
        return { ...this.defaultSettings };
    }

    /**
     * حفظ الإعدادات في التخزين المحلي
     * @private
     */
    _saveLocalSettings() {
        try {
            localStorage.setItem('appSettings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('خطأ في حفظ الإعدادات المحلية:', error);
        }
    }

    /**
     * تحميل إعدادات المستخدم من Firestore
     * @private
     */
    async _loadUserSettings() {
        if (!this.currentUserId) return;
        
        try {
            const userSettings = await firebaseService.getDocument('userSettings', this.currentUserId);
            
            if (userSettings) {
                // دمج الإعدادات المخزنة مع الإعدادات الحالية
                this.settings = this._mergeSettings(userSettings, this.settings);
                
                // حفظ الإعدادات المحدثة محليًا
                this._saveLocalSettings();
            } else {
                // إذا لم تكن هناك إعدادات مخزنة، قم بتخزين الإعدادات الحالية
                await this._saveUserSettings();
            }
        } catch (error) {
            console.error('خطأ في تحميل إعدادات المستخدم:', error);
        }
    }

    /**
     * حفظ إعدادات المستخدم في Firestore
     * @private
     */
    async _saveUserSettings() {
        if (!this.currentUserId) return;
        
        try {
            // حفظ الإعدادات في قاعدة البيانات
            await firebaseService.setDocument('userSettings', this.currentUserId, this.settings);
        } catch (error) {
            console.error('خطأ في حفظ إعدادات المستخدم:', error);
        }
    }

    /**
     * دمج الإعدادات الجديدة مع الإعدادات القديمة
     * @param {Object} source - الإعدادات الجديدة
     * @param {Object} target - الإعدادات القديمة
     * @returns {Object} الإعدادات المدمجة
     * @private
     */
    _mergeSettings(source, target) {
        const result = { ...target };
        
        // دمج الإعدادات بشكل متكرر
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (
                    source[key] !== null &&
                    typeof source[key] === 'object' &&
                    !Array.isArray(source[key]) &&
                    target.hasOwnProperty(key)
                ) {
                    // إذا كان الحقل كائنًا، قم بدمجه بشكل متكرر
                    result[key] = this._mergeSettings(source[key], target[key]);
                } else {
                    // خلاف ذلك، استخدم القيمة الجديدة
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }

    /**
     * الحصول على قيمة إعداد
     * @param {string} path - مسار الإعداد (مثل 'ui.theme', 'notifications.enabled')
     * @param {*} defaultValue - القيمة الافتراضية إذا لم يتم العثور على الإعداد
     * @returns {*} قيمة الإعداد
     */
    getSetting(path, defaultValue = null) {
        try {
            // تقسيم المسار إلى أجزاء
            const parts = path.split('.');
            let value = this.settings;
            
            // التنقل خلال الكائن باستخدام أجزاء المسار
            for (const part of parts) {
                if (value === undefined || value === null || !value.hasOwnProperty(part)) {
                    return defaultValue;
                }
                value = value[part];
            }
            
            return value;
        } catch (error) {
            console.error(`خطأ في الحصول على الإعداد: ${path}`, error);
            return defaultValue;
        }
    }

    /**
     * تعيين قيمة إعداد
     * @param {string} path - مسار الإعداد (مثل 'ui.theme', 'notifications.enabled')
     * @param {*} value - القيمة الجديدة
     * @param {boolean} saveToCloud - ما إذا كان يجب حفظ التغييرات في السحابة
     * @returns {boolean} نجاح العملية
     */
    async setSetting(path, value, saveToCloud = true) {
        try {
            // تقسيم المسار إلى أجزاء
            const parts = path.split('.');
            
            // الجزء الأخير هو اسم الإعداد
            const settingName = parts.pop();
            
            // الوصول إلى الكائن الذي يحتوي على الإعداد
            let settingObj = this.settings;
            for (const part of parts) {
                // إنشاء الكائن إذا لم يكن موجودًا
                if (!settingObj[part]) {
                    settingObj[part] = {};
                }
                settingObj = settingObj[part];
            }
            
            // تعيين القيمة
            settingObj[settingName] = value;
            
            // حفظ الإعدادات محليًا
            this._saveLocalSettings();
            
            // حفظ الإعدادات في السحابة إذا كان مطلوبًا وكان المستخدم مسجلاً
            if (saveToCloud && this.currentUserId) {
                await this._saveUserSettings();
            }
            
            // إرسال حدث تغيير الإعدادات
            this._dispatchSettingChangeEvent(path, value);
            
            return true;
        } catch (error) {
            console.error(`خطأ في تعيين الإعداد: ${path}`, error);
            return false;
        }
    }

    /**
     * إعادة تعيين الإعدادات إلى القيم الافتراضية
     * @param {string} section - قسم الإعدادات المراد إعادة تعيينه (اختياري، إذا لم يتم تحديده، سيتم إعادة تعيين جميع الإعدادات)
     * @returns {boolean} نجاح العملية
     */
    async resetSettings(section = null) {
        try {
            if (section && this.defaultSettings[section]) {
                // إعادة تعيين قسم محدد
                this.settings[section] = { ...this.defaultSettings[section] };
            } else {
                // إعادة تعيين جميع الإعدادات
                this.settings = { ...this.defaultSettings };
            }
            
            // حفظ الإعدادات المحدثة
            this._saveLocalSettings();
            
            // حفظ الإعدادات في السحابة إذا كان المستخدم مسجلاً
            if (this.currentUserId) {
                await this._saveUserSettings();
            }
            
            // إرسال حدث إعادة تعيين الإعدادات
            this._dispatchSettingsResetEvent(section);
            
            return true;
        } catch (error) {
            console.error('خطأ في إعادة تعيين الإعدادات:', error);
            return false;
        }
    }

    /**
     * الاستماع لتغييرات الإعدادات
     * @param {Function} callback - دالة رد الاتصال التي ستستدعى عند تغيير الإعدادات
     * @param {string} path - مسار الإعداد المراد مراقبته (اختياري، إذا لم يتم تحديده، ستتم مراقبة جميع الإعدادات)
     * @returns {Function} دالة لإلغاء المراقبة
     */
    onSettingChange(callback, path = null) {
        const eventName = path ? `setting-change:${path}` : 'setting-change';
        
        // إنشاء معالج الحدث
        const handler = (event) => {
            callback(event.detail.path, event.detail.value, event.detail.oldValue);
        };
        
        // تسجيل معالج الحدث
        window.addEventListener(eventName, handler);
        
        // إرجاع دالة لإلغاء المراقبة
        return () => {
            window.removeEventListener(eventName, handler);
        };
    }

    /**
     * إرسال حدث تغيير الإعداد
     * @param {string} path - مسار الإعداد
     * @param {*} value - القيمة الجديدة
     * @private
     */
    _dispatchSettingChangeEvent(path, value) {
        // الحصول على القيمة القديمة
        const oldValue = this._getOldSettingValue(path, value);
        
        // إرسال حدث لكل المستمعين لهذا الإعداد المحدد
        window.dispatchEvent(
            new CustomEvent(`setting-change:${path}`, {
                detail: { path, value, oldValue }
            })
        );
        
        // إرسال حدث عام لجميع المستمعين
        window.dispatchEvent(
            new CustomEvent('setting-change', {
                detail: { path, value, oldValue }
            })
        );
    }

    /**
     * الحصول على القيمة القديمة للإعداد
     * @param {string} path - مسار الإعداد
     * @param {*} newValue - القيمة الجديدة
     * @returns {*} القيمة القديمة
     * @private
     */
    _getOldSettingValue(path, newValue) {
        try {
            // تخزين الإعدادات الحالية مؤقتًا
            const tempSettings = JSON.parse(localStorage.getItem('appSettings'));
            if (!tempSettings) return null;
            
            // تقسيم المسار إلى أجزاء
            const parts = path.split('.');
            let value = tempSettings;
            
            // التنقل خلال الكائن باستخدام أجزاء المسار
            for (const part of parts) {
                if (value === undefined || value === null || !value.hasOwnProperty(part)) {
                    return null;
                }
                value = value[part];
            }
            
            return value;
        } catch (error) {
            console.error(`خطأ في الحصول على القيمة القديمة للإعداد: ${path}`, error);
            return null;
        }
    }

    /**
     * إرسال حدث إعادة تعيين الإعدادات
     * @param {string|null} section - قسم الإعدادات الذي تمت إعادة تعيينه
     * @private
     */
    _dispatchSettingsResetEvent(section) {
        window.dispatchEvent(
            new CustomEvent('settings-reset', {
                detail: { section }
            })
        );
    }

    /**
     * تطبيق الإعدادات على واجهة المستخدم
     */
    applyUISettings() {
        // تطبيق السمة
        this._applyTheme();
        
        // تطبيق حجم الخط
        this._applyFontSize();
        
        // تطبيق اللغة
        this._applyLanguage();
        
        // تطبيق الرسوم المتحركة
        this._applyAnimations();
    }

    /**
     * تطبيق السمة
     * @private
     */
    _applyTheme() {
        const theme = this.getSetting('ui.theme', 'light');
        document.documentElement.setAttribute('data-theme', theme);
        
        // إضافة أو إزالة فئة الوضع الداكن
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    /**
     * تطبيق حجم الخط
     * @private
     */
    _applyFontSize() {
        const fontSize = this.getSetting('ui.fontSize', 'medium');
        document.documentElement.setAttribute('data-font-size', fontSize);
        
        // إضافة فئة حجم الخط
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add(`font-${fontSize}`);
    }

    /**
     * تطبيق اللغة
     * @private
     */
    _applyLanguage() {
        const language = this.getSetting('ui.language', 'ar');
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }

    /**
     * تطبيق الرسوم المتحركة
     * @private
     */
    _applyAnimations() {
        const animations = this.getSetting('ui.animations', true);
        
        if (animations) {
            document.body.classList.remove('no-animations');
        } else {
            document.body.classList.add('no-animations');
        }
    }
}

// إنشاء نسخة واحدة من خدمة الإعدادات للاستخدام في التطبيق بأكمله
const appSettingsService = new AppSettingsService();

// تصدير الخدمة للاستخدام في وحدات أخرى
export default appSettingsService;

// تعيين الخدمة كمتغير عام للوصول إليها من أي مكان
window.appSettingsService = appSettingsService;