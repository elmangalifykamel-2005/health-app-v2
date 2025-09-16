/**
 * خدمة التنقل بين صفحات التطبيق
 * تدير عملية تحميل المكونات وتغيير الصفحات بطريقة مركزية
 */

import authService from './auth.service.js';

class NavigationService {
    constructor() {
        // الصفحة الحالية
        this.currentPage = null;
        
        // القائمة الرئيسية
        this.mainMenuItems = [
            { id: 'dashboard', title: 'الصفحة الرئيسية', icon: 'fa-home', requiresAuth: true },
            { id: 'health-state', title: 'الحالة الصحية', icon: 'fa-heartbeat', requiresAuth: true },
            { id: 'medical-file', title: 'الملف الطبي', icon: 'fa-file-medical', requiresAuth: true },
            { id: 'nutrition', title: 'التغذية', icon: 'fa-utensils', requiresAuth: true },
            { id: 'calories', title: 'السعرات الحرارية', icon: 'fa-fire', requiresAuth: true },
            { id: 'sleep', title: 'النوم', icon: 'fa-moon', requiresAuth: true },
            { id: 'mental-health', title: 'الصحة النفسية', icon: 'fa-brain', requiresAuth: true },
            { id: 'herbs', title: 'الأعشاب الطبيعية', icon: 'fa-leaf', requiresAuth: true },
            { id: 'studies', title: 'الدراسات والأبحاث', icon: 'fa-book', requiresAuth: true },
            { id: 'about', title: 'عن التطبيق', icon: 'fa-info-circle', requiresAuth: false }
        ];
        
        // مسارات الوحدات (المسار إلى الصفحة الرئيسية لكل وحدة)
        this.modulePaths = {
            'dashboard': 'main.html',
            'health-state': 'modules/health-state/healthstate.html',
            'medical-file': 'modules/medical-file/medical-profile.html',
            'nutrition': 'modules/nutrition/index.html',
            'calories': 'modules/calories/calories.html',
            'sleep': 'modules/sleep/index.html',
            'mental-health': 'modules/mental-health/mental-health.html',
            'herbs': 'modules/herbs/herbs.html',
            'studies': 'modules/studies/studies.html',
            'about': 'modules/about/about-me.html',
            'login': 'login.html',
            'logout': 'login.html'
        };
        
        // تسجيل معالجات الأحداث
        this._setupEventListeners();
    }

    /**
     * إعداد معالجات الأحداث
     * @private
     */
    _setupEventListeners() {
        // الاستماع لأحداث النقر في القائمة الجانبية
        document.addEventListener('DOMContentLoaded', () => {
            // معالجة النقر على عناصر القائمة
            document.addEventListener('click', (event) => {
                const menuItem = event.target.closest('[data-nav-item]');
                if (menuItem) {
                    const moduleId = menuItem.getAttribute('data-nav-item');
                    this.navigateToModule(moduleId);
                    event.preventDefault();
                }
            });
            
            // معالجة أزرار التنقل الخاصة
            const logoutBtn = document.querySelector('#logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        });
    }

    /**
     * تحميل وحدة (صفحة) في منطقة المحتوى
     * @param {string} moduleId - معرّف الوحدة
     * @param {Object} params - معلمات إضافية لتمريرها إلى الوحدة
     * @returns {Promise<boolean>} نجاح التنقل
     */
    async navigateToModule(moduleId, params = {}) {
        try {
            // التحقق من وجود مسار للوحدة المطلوبة
            if (!this.modulePaths[moduleId]) {
                console.error(`الوحدة غير معرفة: ${moduleId}`);
                return false;
            }
            
            // التحقق من المصادقة إذا كانت الوحدة تتطلب ذلك
            const moduleInfo = this.mainMenuItems.find(item => item.id === moduleId);
            if (moduleInfo && moduleInfo.requiresAuth && !authService.isAuthenticated()) {
                console.log('التنقل إلى صفحة تسجيل الدخول لأن المستخدم غير مصادق عليه');
                window.location.href = this.modulePaths['login'];
                return false;
            }
            
            // معالجة الأوامر الخاصة
            if (moduleId === 'logout') {
                return this.logout();
            }
            
            // إذا كنا على نفس الصفحة وفي نفس الوحدة، تحديث المعلمات فقط
            if (moduleId === this.currentPage) {
                this._updatePageParameters(params);
                return true;
            }
            
            // تعيين الصفحة الحالية
            this.currentPage = moduleId;
            
            // تحديد ما إذا كان التنقل يتطلب تغيير الصفحة بالكامل
            if (this._requiresFullPageNavigation(moduleId)) {
                // الانتقال إلى صفحة كاملة جديدة
                this._navigateToFullPage(moduleId, params);
            } else {
                // تحميل المحتوى في منطقة المحتوى الرئيسية
                await this._loadModuleContent(moduleId, params);
                
                // تحديث القائمة الجانبية لعرض العنصر النشط
                this._updateSidebarActiveItem(moduleId);
                
                // تحديث العنوان
                this._updatePageTitle(moduleId);
                
                // حفظ الحالة في localStorage لاسترجاعها لاحقًا
                this._saveNavigationState(moduleId, params);
            }
            
            return true;
        } catch (error) {
            console.error('خطأ في التنقل إلى الوحدة:', error);
            return false;
        }
    }

    /**
     * تسجيل الخروج
     * @returns {Promise<boolean>} نجاح تسجيل الخروج
     */
    async logout() {
        try {
            await authService.signOut();
            window.location.href = this.modulePaths['login'];
            return true;
        } catch (error) {
            console.error('خطأ في تسجيل الخروج:', error);
            return false;
        }
    }

    /**
     * التحقق مما إذا كانت الوحدة تتطلب تغيير الصفحة بالكامل
     * @param {string} moduleId - معرّف الوحدة
     * @returns {boolean} يتطلب تغيير الصفحة بالكامل
     * @private
     */
    _requiresFullPageNavigation(moduleId) {
        // بعض الصفحات تتطلب تحميل صفحة كاملة بدلاً من تحميل المحتوى فقط
        const fullPageModules = ['login', 'logout'];
        return fullPageModules.includes(moduleId);
    }

    /**
     * الانتقال إلى صفحة كاملة
     * @param {string} moduleId - معرّف الوحدة
     * @param {Object} params - معلمات إضافية
     * @private
     */
    _navigateToFullPage(moduleId, params = {}) {
        // بناء عنوان URL مع المعلمات
        let url = this.modulePaths[moduleId];
        
        // إضافة معلمات إلى URL إذا كانت موجودة
        if (Object.keys(params).length > 0) {
            const queryParams = new URLSearchParams();
            for (const [key, value] of Object.entries(params)) {
                queryParams.append(key, value);
            }
            url = `${url}?${queryParams.toString()}`;
        }
        
        // الانتقال إلى الصفحة الجديدة
        window.location.href = url;
    }

    /**
     * تحميل محتوى الوحدة في منطقة المحتوى الرئيسية
     * @param {string} moduleId - معرّف الوحدة
     * @param {Object} params - معلمات إضافية
     * @returns {Promise<void>}
     * @private
     */
    async _loadModuleContent(moduleId, params = {}) {
        try {
            const contentContainer = document.querySelector('#main-content');
            if (!contentContainer) {
                console.error('لم يتم العثور على حاوية المحتوى الرئيسية');
                return;
            }
            
            // عرض مؤشر التحميل
            contentContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
            
            // الحصول على مسار الوحدة
            const modulePath = this.modulePaths[moduleId];
            
            // جلب محتوى الوحدة
            const response = await fetch(modulePath);
            if (!response.ok) {
                throw new Error(`فشل في تحميل المحتوى: ${response.status} ${response.statusText}`);
            }
            
            // استخراج محتوى الصفحة
            const html = await response.text();
            
            // استخراج جزء المحتوى من HTML الكامل
            const content = this._extractContentFromHTML(html);
            
            // تحميل المحتوى في الحاوية
            contentContainer.innerHTML = content;
            
            // تنفيذ أي أكواد JavaScript موجودة في المحتوى
            this._executeScriptsInContent(contentContainer);
            
            // تمرير المعلمات إلى الوحدة المحملة
            if (window.moduleLoaded) {
                window.moduleLoaded(moduleId, params);
            }
        } catch (error) {
            console.error('خطأ في تحميل محتوى الوحدة:', error);
            
            // عرض رسالة خطأ في حاوية المحتوى
            const contentContainer = document.querySelector('#main-content');
            if (contentContainer) {
                contentContainer.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>حدث خطأ أثناء تحميل المحتوى</h3>
                        <p>${error.message}</p>
                        <button onclick="navigationService.navigateToModule('dashboard')">العودة إلى الصفحة الرئيسية</button>
                    </div>
                `;
            }
        }
    }

    /**
     * استخراج المحتوى الرئيسي من صفحة HTML كاملة
     * @param {string} html - صفحة HTML كاملة
     * @returns {string} المحتوى الرئيسي
     * @private
     */
    _extractContentFromHTML(html) {
        // إنشاء عنصر DOM مؤقت لتحليل HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // البحث عن عنصر المحتوى الرئيسي
        const mainContent = tempDiv.querySelector('.main-content') || 
                           tempDiv.querySelector('#main-content') || 
                           tempDiv.querySelector('main') ||
                           tempDiv.querySelector('.content');
        
        // إذا وجدنا عنصر محتوى رئيسي، نستخدمه
        if (mainContent) {
            return mainContent.innerHTML;
        }
        
        // إذا لم نجد عنصر محتوى رئيسي، استخدم body بالكامل مع إزالة العناصر غير المطلوبة
        const body = tempDiv.querySelector('body');
        if (body) {
            // إزالة العناصر التي لا نريد تضمينها (مثل الرأس والتذييل والقائمة الجانبية)
            const elementsToRemove = ['header', 'footer', 'nav', '.sidebar', '#sidebar'];
            elementsToRemove.forEach(selector => {
                const elements = body.querySelectorAll(selector);
                elements.forEach(el => el.remove());
            });
            
            return body.innerHTML;
        }
        
        // إذا لم نجد أي شيء، استخدم HTML بالكامل
        return html;
    }

    /**
     * تنفيذ أي أكواد JavaScript موجودة في المحتوى المحمّل
     * @param {HTMLElement} container - حاوية المحتوى
     * @private
     */
    _executeScriptsInContent(container) {
        // البحث عن جميع العناصر <script> في المحتوى
        const scripts = container.querySelectorAll('script');
        
        // تنفيذ كل نص برمجي
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // نسخ جميع السمات من النص البرمجي القديم
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // نسخ المحتوى
            newScript.textContent = oldScript.textContent;
            
            // استبدال النص البرمجي القديم بالجديد
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    /**
     * تحديث العنصر النشط في القائمة الجانبية
     * @param {string} moduleId - معرّف الوحدة
     * @private
     */
    _updateSidebarActiveItem(moduleId) {
        // إزالة الفئة النشطة من جميع العناصر
        document.querySelectorAll('[data-nav-item]').forEach(item => {
            item.classList.remove('active');
        });
        
        // إضافة الفئة النشطة إلى العنصر الحالي
        const activeItem = document.querySelector(`[data-nav-item="${moduleId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    /**
     * تحديث عنوان الصفحة
     * @param {string} moduleId - معرّف الوحدة
     * @private
     */
    _updatePageTitle(moduleId) {
        // البحث عن عنوان الوحدة
        const moduleInfo = this.mainMenuItems.find(item => item.id === moduleId);
        if (moduleInfo) {
            document.title = `صحتك بالدنيا - ${moduleInfo.title}`;
        }
    }

    /**
     * تحديث معلمات الصفحة الحالية
     * @param {Object} params - المعلمات الجديدة
     * @private
     */
    _updatePageParameters(params) {
        // إذا كانت هناك دالة لتحديث معلمات الصفحة، استدعها
        if (window.updatePageParameters) {
            window.updatePageParameters(params);
        }
    }

    /**
     * حفظ حالة التنقل في التخزين المحلي
     * @param {string} moduleId - معرّف الوحدة
     * @param {Object} params - المعلمات
     * @private
     */
    _saveNavigationState(moduleId, params = {}) {
        const state = {
            moduleId,
            params,
            timestamp: new Date().getTime()
        };
        
        localStorage.setItem('navigationState', JSON.stringify(state));
    }

    /**
     * استرجاع حالة التنقل الأخيرة
     * @returns {Object|null} حالة التنقل الأخيرة أو null
     */
    getLastNavigationState() {
        const stateStr = localStorage.getItem('navigationState');
        if (!stateStr) return null;
        
        try {
            return JSON.parse(stateStr);
        } catch (error) {
            console.error('خطأ في تحليل حالة التنقل:', error);
            return null;
        }
    }

    /**
     * استعادة آخر حالة تنقل (مفيد عند إعادة تحميل الصفحة)
     * @returns {Promise<boolean>} نجاح استعادة الحالة
     */
    async restoreLastNavigation() {
        const state = this.getLastNavigationState();
        if (!state || !state.moduleId) return false;
        
        // التحقق من أن الحالة ليست قديمة جدًا (24 ساعة)
        const now = new Date().getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 ساعة بالمللي ثانية
        
        if (now - state.timestamp > maxAge) {
            // الحالة قديمة جدًا، إعادة التوجيه إلى لوحة المعلومات
            return await this.navigateToModule('dashboard');
        }
        
        // استعادة الحالة
        return await this.navigateToModule(state.moduleId, state.params);
    }

    /**
     * إنشاء روابط القائمة الجانبية ديناميكيًا
     * @param {HTMLElement} container - حاوية القائمة
     */
    createSidebarMenu(container) {
        if (!container) return;
        
        // إنشاء عناصر القائمة
        const menuHtml = this.mainMenuItems.map(item => `
            <li class="sidebar-item" data-nav-item="${item.id}">
                <a href="#" class="sidebar-link">
                    <i class="fas ${item.icon}"></i>
                    <span>${item.title}</span>
                </a>
            </li>
        `).join('');
        
        // إضافة العناصر إلى الحاوية
        container.innerHTML = menuHtml;
        
        // تحديث العنصر النشط
        if (this.currentPage) {
            this._updateSidebarActiveItem(this.currentPage);
        }
    }
}

// إنشاء نسخة واحدة من خدمة التنقل للاستخدام في التطبيق بأكمله
const navigationService = new NavigationService();

// تصدير الخدمة للاستخدام في وحدات أخرى
export default navigationService;

// تعيين الخدمة كمتغير عام للوصول إليها من أي مكان
window.navigationService = navigationService;