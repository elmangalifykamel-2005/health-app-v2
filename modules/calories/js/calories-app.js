/**
 * تطبيق دليل السعرات الحرارية
 * يوفر واجهة شاملة لعرض وإدارة بيانات الأطعمة والقيم الغذائية
 */

class CaloriesApp {
    constructor() {
        this.foods = [];
        this.filteredFoods = [];
        this.categories = new Set();
        this.currentLanguage = 'ar';
        this.db = null;
        
        this.init();
    }
    
    /**
     * تهيئة التطبيق
     */
    async init() {
        try {
            // تهيئة Firebase
            this.db = firebase.firestore();
            
            // تحميل اللغة المحفوظة
            this.currentLanguage = localStorage.getItem('hl_language') || 'ar';
            
            // تطبيق اللغة
            this.applyLanguage();
            
            // تحميل البيانات
            await this.loadFoods();
            
            // تهيئة واجهة المستخدم
            this.setupEventListeners();
            this.updateStatistics();
            this.renderTable();
            
            // إخفاء شاشة التحميل
            this.hideLoading();
            
        } catch (error) {
            console.error('خطأ في تهيئة التطبيق:', error);
            this.showToast('حدث خطأ في تحميل التطبيق', 'error');
            this.hideLoading();
        }
    }
    
    /**
     * تحميل بيانات الأطعمة من Firebase
     */
    async loadFoods() {
        try {
            const snapshot = await this.db.collection('foods').get();
            this.foods = [];
            this.categories.clear();
            
            snapshot.forEach(doc => {
                const food = { id: doc.id, ...doc.data() };
                this.foods.push(food);
                
                if (food.category) {
                    this.categories.add(food.category);
                }
            });
            
            this.filteredFoods = [...this.foods];
            this.populateCategoryFilter();
            
        } catch (error) {
            console.error('خطأ في تحميل البيانات:', error);
            this.showToast('فشل في تحميل بيانات الأطعمة', 'error');
        }
    }
    
    /**
     * ملء قائمة تصفية المجموعات
     */
    populateCategoryFilter() {
        const categoryFilter = document.getElementById('category-filter');
        const allCategoriesText = this.currentLanguage === 'ar' ? 'كل المجموعات' : 'All Categories';
        
        categoryFilter.innerHTML = `<option value="">${allCategoriesText}</option>`;
        
        Array.from(this.categories).sort().forEach(category => {
            categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }
    
    /**
     * إعداد مستمعي الأحداث
     */
    setupEventListeners() {
        // البحث
        const searchInput = document.getElementById('food-search');
        searchInput.addEventListener('input', () => this.handleSearch());
        
        // تصفية المجموعات
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', () => this.handleSearch());
        
        // البحث المتقدم
        const advancedBtn = document.querySelector('.advanced-search-btn');
        advancedBtn.addEventListener('click', () => this.openAdvancedSearch());
        
        // مسح البحث
        const clearBtn = document.querySelector('.clear-search');
        clearBtn.addEventListener('click', () => this.clearSearch());
        
        // كشف الاتصال
        window.addEventListener('online', () => this.hideOfflineBanner());
        window.addEventListener('offline', () => this.showOfflineBanner());
        
        // إغلاق النوافذ المنبثقة بالضغط على Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    /**
     * معالجة البحث والتصفية
     */
    handleSearch() {
        const searchTerm = document.getElementById('food-search').value.toLowerCase().trim();
        const selectedCategory = document.getElementById('category-filter').value;
        
        this.filteredFoods = this.foods.filter(food => {
            // البحث في الاسم
            const nameMatch = 
                (food.nameAr && food.nameAr.toLowerCase().includes(searchTerm)) ||
                (food.nameEn && food.nameEn.toLowerCase().includes(searchTerm)) ||
                (food.category && food.category.toLowerCase().includes(searchTerm));
            
            // تصفية المجموعة
            const categoryMatch = !selectedCategory || food.category === selectedCategory;
            
            return nameMatch && categoryMatch;
        });
        
        this.renderTable();
    }
    
    /**
     * مسح البحث
     */
    clearSearch() {
        document.getElementById('food-search').value = '';
        document.getElementById('category-filter').value = '';
        this.filteredFoods = [...this.foods];
        this.renderTable();
    }
    
    /**
     * عرض جدول الأطعمة
     */
    renderTable() {
        const tbody = document.getElementById('foods-table-body');
        const noResults = document.getElementById('no-results');
        const tableContainer = document.querySelector('.table-container');
        
        if (this.filteredFoods.length === 0) {
            tableContainer.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        tableContainer.style.display = 'block';
        noResults.style.display = 'none';
        
        tbody.innerHTML = '';
        
        this.filteredFoods.forEach(food => {
            const row = this.createFoodRow(food);
            tbody.appendChild(row);
        });
    }
    
    /**
     * إنشاء صف طعام في الجدول
     */
    createFoodRow(food) {
        const row = document.createElement('tr');
        row.addEventListener('click', () => this.showFoodDetails(food));
        
        // تحديد لون المؤشر الجلايسيمي
        let glycemicClass = 'glycemic-low';
        if (food.glycemicIndex > 60) glycemicClass = 'glycemic-high';
        else if (food.glycemicIndex > 40) glycemicClass = 'glycemic-medium';
        
        row.innerHTML = `
            <td>
                ${food.imageUrl ? 
                    `<img src="${food.imageUrl}" alt="${food.nameAr || food.nameEn}" class="food-image">` :
                    `<div class="food-icon"><i class="fa fa-utensils"></i></div>`
                }
            </td>
            <td>${food.nameEn || '-'}</td>
            <td>${food.nameAr || '-'}</td>
            <td>${food.quantity || '100g'}</td>
            <td><strong>${food.calories || 0}</strong></td>
            <td>${food.protein || 0}g</td>
            <td>${food.carbs || 0}g</td>
            <td>${food.fat || 0}g</td>
            <td>${food.fiber || 0}g</td>
            <td class="${glycemicClass}">${food.glycemicIndex || '-'}</td>
            <td>${food.category || '-'}</td>
        `;
        
        return row;
    }
    
    /**
     * عرض تفاصيل الطعام
     */
    showFoodDetails(food) {
        const modal = document.getElementById('food-details-modal');
        const title = document.getElementById('food-details-title');
        const content = document.getElementById('food-details-content');
        
        title.textContent = food.nameAr || food.nameEn || 'تفاصيل الطعام';
        
        content.innerHTML = `
            <div class="food-details-grid">
                <div class="food-image-section">
                    ${food.imageUrl ? 
                        `<img src="${food.imageUrl}" alt="${food.nameAr || food.nameEn}" class="food-detail-image">` :
                        `<div class="food-detail-icon"><i class="fa fa-utensils"></i></div>`
                    }
                </div>
                
                <div class="food-info-section">
                    <h3>${food.nameAr || food.nameEn}</h3>
                    <p class="food-category">${food.category || 'غير محدد'}</p>
                    
                    <div class="nutrition-grid">
                        <div class="nutrition-item">
                            <span class="nutrition-label">السعرات الحرارية</span>
                            <span class="nutrition-value">${food.calories || 0}</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-label">البروتين</span>
                            <span class="nutrition-value">${food.protein || 0}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-label">الكربوهيدرات</span>
                            <span class="nutrition-value">${food.carbs || 0}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-label">الدهون</span>
                            <span class="nutrition-value">${food.fat || 0}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-label">الألياف</span>
                            <span class="nutrition-value">${food.fiber || 0}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="nutrition-label">المؤشر الجلايسيمي</span>
                            <span class="nutrition-value">${food.glycemicIndex || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }
    
    /**
     * فتح البحث المتقدم
     */
    openAdvancedSearch() {
        const modal = document.getElementById('advanced-search-modal');
        modal.style.display = 'flex';
        
        // التركيز على حقل البحث
        setTimeout(() => {
            document.getElementById('usda-search-input').focus();
        }, 100);
    }
    
    /**
     * إغلاق البحث المتقدم
     */
    closeAdvancedSearch() {
        const modal = document.getElementById('advanced-search-modal');
        modal.style.display = 'none';
        
        // مسح النتائج
        document.getElementById('usda-results').innerHTML = '';
        document.getElementById('usda-search-input').value = '';
    }
    
    /**
     * إغلاق تفاصيل الطعام
     */
    closeFoodDetails() {
        const modal = document.getElementById('food-details-modal');
        modal.style.display = 'none';
    }
    
    /**
     * إغلاق جميع النوافذ المنبثقة
     */
    closeAllModals() {
        this.closeAdvancedSearch();
        this.closeFoodDetails();
    }
    
    /**
     * تحديث الإحصائيات
     */
    updateStatistics() {
        document.getElementById('total-foods').textContent = this.foods.length;
        document.getElementById('total-categories').textContent = this.categories.size;
    }
    
    /**
     * تطبيق اللغة
     */
    applyLanguage() {
        document.body.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
        
        // تحديث نص اللغة الحالية
        const currentLangBtn = document.getElementById('current-lang');
        if (currentLangBtn) {
            currentLangBtn.textContent = this.currentLanguage === 'ar' ? 'EN' : 'عر';
        }
        
        // تحديث placeholder البحث
        const searchInput = document.getElementById('food-search');
        if (searchInput) {
            searchInput.placeholder = this.currentLanguage === 'ar' ? 
                'ابحث عن الطعام أو المجموعة...' : 
                'Search for food or category...';
        }
        
        // إعادة ملء قائمة المجموعات
        this.populateCategoryFilter();
    }
    
    /**
     * تبديل اللغة
     */
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        localStorage.setItem('hl_language', this.currentLanguage);
        this.applyLanguage();
        this.renderTable();
    }
    
    /**
     * العودة للصفحة السابقة
     */
    goBack() {
        if (document.referrer && document.referrer !== window.location.href) {
            window.history.back();
        } else {
            window.location.href = '../../main.html';
        }
    }
    
    /**
     * إظهار رسالة تنبيه
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // إزالة التنبيه بعد 3 ثوان
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    /**
     * إظهار شعار عدم الاتصال
     */
    showOfflineBanner() {
        const banner = document.getElementById('offline-banner');
        banner.style.display = 'flex';
    }
    
    /**
     * إخفاء شعار عدم الاتصال
     */
    hideOfflineBanner() {
        const banner = document.getElementById('offline-banner');
        banner.style.display = 'none';
    }
    
    /**
     * إخفاء شاشة التحميل
     */
    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.style.display = 'none';
    }
}

// الوظائف العامة للوصول من HTML
window.toggleLanguage = () => app.toggleLanguage();
window.goBack = () => app.goBack();
window.clearSearch = () => app.clearSearch();
window.openAdvancedSearch = () => app.openAdvancedSearch();
window.closeAdvancedSearch = () => app.closeAdvancedSearch();
window.closeFoodDetails = () => app.closeFoodDetails();
window.searchUSDA = () => usdaAPI.searchFoods();

// تهيئة التطبيق عند تحميل الصفحة
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new CaloriesApp();
});