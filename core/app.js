/**
 * الملف الرئيسي للتطبيق
 * يقوم بتحميل جميع الخدمات وتهيئة التطبيق
 */

// استيراد الخدمات الأساسية
import firebaseService from './services/firebase.service.js';
import authService from './services/auth.service.js';
import healthDataService from './services/health-data.service.js';
import navigationService from './services/navigation.service.js';
import appSettingsService from './services/app-settings.service.js';
import sharedDataService from './services/shared-data.service.js';

class App {
    constructor() {
        // الإشارة إلى الخدمات
        this.firebaseService = firebaseService;
        this.authService = authService;
        this.healthDataService = healthDataService;
        this.navigationService = navigationService;
        this.appSettingsService = appSettingsService;
        this.sharedDataService = sharedDataService;
        
        // حالة تهيئة التطبيق
        this.isInitialized = false;
    }

    /**
     * تهيئة التطبيق
     * @returns {Promise<boolean>} نجاح التهيئة
     */
    async initialize() {
        try {
            console.log('بدء تهيئة التطبيق...');
            
            // انتظار تهيئة Firebase
            await this._waitForFirebase();
            
            // تطبيق إعدادات واجهة المستخدم
            this.appSettingsService.applyUISettings();
            
            // تهيئة التنقل
            this._setupNavigation();
            
            // تسجيل معالجات الأحداث العامة
            this._setupGlobalEventListeners();
            
            this.isInitialized = true;
            console.log('تم تهيئة التطبيق بنجاح');
            
            // تشغيل دوال التهيئة المحددة على الصفحة الحالية
            this._runPageInitializers();
            
            return true;
        } catch (error) {
            console.error('خطأ في تهيئة التطبيق:', error);
            return false;
        }
    }

    /**
     * انتظار تهيئة Firebase
     * @returns {Promise<void>}
     * @private
     */
    async _waitForFirebase() {
        let retries = 0;
        const maxRetries = 10;
        
        while (!this.firebaseService.auth && retries < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 500));
            retries++;
        }
        
        if (!this.firebaseService.auth) {
            throw new Error('فشل في تهيئة Firebase');
        }
    }

    /**
     * إعداد التنقل بين الصفحات
     * @private
     */
    _setupNavigation() {
        // إنشاء قائمة التنقل
        document.addEventListener('DOMContentLoaded', () => {
            const sidebarContainer = document.querySelector('#sidebar-menu');
            if (sidebarContainer) {
                this.navigationService.createSidebarMenu(sidebarContainer);
            }
            
            // إذا كنا في الصفحة الرئيسية، تحقق من المصادقة
            if (window.location.pathname.endsWith('/main.html')) {
                this._checkAuthentication();
            }
        });
    }

    /**
     * التحقق من المصادقة للصفحات المحمية
     * @private
     */
    _checkAuthentication() {
        // إضافة مستمع لحالة المصادقة
        this.authService.addAuthStateListener((user) => {
            if (!user) {
                // إذا لم يكن المستخدم مصادقًا عليه وكنا في صفحة محمية، انتقل إلى صفحة تسجيل الدخول
                if (this._isProtectedPage()) {
                    window.location.href = 'login.html';
                }
            } else {
                // إذا كان المستخدم مصادقًا عليه وكنا في صفحة تسجيل الدخول، انتقل إلى الصفحة الرئيسية
                if (window.location.pathname.endsWith('/login.html')) {
                    window.location.href = 'main.html';
                }
            }
        });
    }

    /**
     * تحديد ما إذا كانت الصفحة الحالية محمية (تتطلب المصادقة)
     * @returns {boolean} ما إذا كانت الصفحة محمية
     * @private
     */
    _isProtectedPage() {
        const publicPages = ['/login.html', '/index.html', '/register.html'];
        const currentPath = window.location.pathname;
        
        // تحقق مما إذا كانت الصفحة الحالية ليست من الصفحات العامة
        return !publicPages.some(page => currentPath.endsWith(page));
    }

    /**
     * إعداد معالجات الأحداث العامة
     * @private
     */
    _setupGlobalEventListeners() {
        // معالج أخطاء JavaScript غير المعالجة
        window.addEventListener('error', (event) => {
            console.error('خطأ غير معالج:', event.error);
            
            // عرض إشعار للمستخدم
            this._showErrorNotification('حدث خطأ غير متوقع. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
        });
        
        // معالج رفض الوعود غير المعالج
        window.addEventListener('unhandledrejection', (event) => {
            console.error('رفض وعد غير معالج:', event.reason);
            
            // عرض إشعار للمستخدم
            this._showErrorNotification('فشلت العملية. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
        });
    }

    /**
     * عرض إشعار خطأ للمستخدم
     * @param {string} message - رسالة الخطأ
     * @private
     */
    _showErrorNotification(message) {
        // التحقق من وجود عنصر الإشعارات
        let notificationContainer = document.getElementById('notification-container');
        
        if (!notificationContainer) {
            // إنشاء حاوية الإشعارات إذا لم تكن موجودة
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // إنشاء إشعار جديد
        const notification = document.createElement('div');
        notification.className = 'notification notification-error';
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        // إضافة الإشعار إلى الحاوية
        notificationContainer.appendChild(notification);
        
        // إضافة معالج النقر لإغلاق الإشعار
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // إزالة الإشعار تلقائيًا بعد 5 ثوانٍ
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    /**
     * تشغيل دوال التهيئة المحددة على الصفحة الحالية
     * @private
     */
    _runPageInitializers() {
        // استدعاء دالة تهيئة الصفحة إذا كانت موجودة
        if (typeof window.initializePage === 'function') {
            window.initializePage();
        }
    }

    /**
     * عرض رسالة إشعار للمستخدم
     * @param {string} message - الرسالة
     * @param {string} type - نوع الإشعار (success, info, warning, error)
     * @param {number} duration - مدة العرض بالمللي ثانية (اختياري)
     */
    showNotification(message, type = 'info', duration = 3000) {
        // التحقق من وجود عنصر الإشعارات
        let notificationContainer = document.getElementById('notification-container');
        
        if (!notificationContainer) {
            // إنشاء حاوية الإشعارات إذا لم تكن موجودة
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // تحديد أيقونة الإشعار بناءً على النوع
        let icon;
        switch (type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'warning':
                icon = 'fa-exclamation-triangle';
                break;
            case 'error':
                icon = 'fa-exclamation-circle';
                break;
            case 'info':
            default:
                icon = 'fa-info-circle';
        }
        
        // إنشاء إشعار جديد
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        // إضافة الإشعار إلى الحاوية
        notificationContainer.appendChild(notification);
        
        // إضافة معالج النقر لإغلاق الإشعار
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // إزالة الإشعار تلقائيًا بعد المدة المحددة
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    /**
     * عرض مربع حوار للتأكيد
     * @param {string} message - الرسالة
     * @param {string} confirmText - نص زر التأكيد
     * @param {string} cancelText - نص زر الإلغاء
     * @returns {Promise<boolean>} نتيجة التأكيد (true للتأكيد، false للإلغاء)
     */
    showConfirmDialog(message, confirmText = 'موافق', cancelText = 'إلغاء') {
        return new Promise((resolve) => {
            // إنشاء مربع الحوار
            const dialogOverlay = document.createElement('div');
            dialogOverlay.className = 'dialog-overlay';
            
            const dialog = document.createElement('div');
            dialog.className = 'dialog confirm-dialog';
            dialog.innerHTML = `
                <div class="dialog-content">
                    <div class="dialog-message">${message}</div>
                    <div class="dialog-buttons">
                        <button class="btn btn-cancel">${cancelText}</button>
                        <button class="btn btn-confirm">${confirmText}</button>
                    </div>
                </div>
            `;
            
            dialogOverlay.appendChild(dialog);
            document.body.appendChild(dialogOverlay);
            
            // معالجات الأزرار
            const confirmButton = dialog.querySelector('.btn-confirm');
            const cancelButton = dialog.querySelector('.btn-cancel');
            
            // دالة إغلاق مربع الحوار
            const closeDialog = () => {
                dialogOverlay.classList.add('fade-out');
                setTimeout(() => {
                    dialogOverlay.remove();
                }, 300);
            };
            
            // معالج زر التأكيد
            confirmButton.addEventListener('click', () => {
                closeDialog();
                resolve(true);
            });
            
            // معالج زر الإلغاء
            cancelButton.addEventListener('click', () => {
                closeDialog();
                resolve(false);
            });
            
            // معالج النقر خارج مربع الحوار
            dialogOverlay.addEventListener('click', (event) => {
                if (event.target === dialogOverlay) {
                    closeDialog();
                    resolve(false);
                }
            });
        });
    }
}

// إنشاء نسخة واحدة من التطبيق
const app = new App();

// تصدير التطبيق
export default app;

// تعيين التطبيق كمتغير عام
window.app = app;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async () => {
    await app.initialize();
});