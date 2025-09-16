// تطبيق التغذية الرئيسي - نظام موحد
// Main Nutrition App - Unified System

// استيراد النظام الموحد والمكونات
// Import unified system and components
import { i18n } from '../../core/i18n/i18n.js';
import { NutritionDataManager } from './data/nutrition-data.js';
import { NutritionUtils } from './utils/nutrition-utils.js';

// فئة تطبيق التغذية الرئيسي
// Main Nutrition App class
class NutritionApp {
    constructor() {
        this.dataManager = new NutritionDataManager();
        this.utils = new NutritionUtils();
        this.currentView = 'dashboard';
        this.currentLanguage = 'ar';
        this.filters = {
            search: '',
            category: 'all',
            diet: 'all',
            maxCalories: null,
            minProtein: null,
            sortBy: 'name',
            sortOrder: 'asc'
        };
        this.favorites = new Set();
        this.mealPlan = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: []
        };
        this.currentModal = null;
    }

    // تهيئة التطبيق
    // Initialize app
    async init() {
        try {
            console.log('تهيئة تطبيق التغذية...');
            
            // تحميل البيانات
            await this.loadData();
            
            // إعداد واجهة المستخدم
            this.setupUI();
            
            // إعداد مستمعي الأحداث
            this.setupEventListeners();
            
            // تحميل المفضلة والخطة الغذائية
            this.loadUserData();
            
            // عرض لوحة التحكم
            this.showView('dashboard');
            
            // التكامل مع النظام الموحد
            this.integrateWithUnifiedSystem();
            
            console.log('تم تهيئة تطبيق التغذية بنجاح');
        } catch (error) {
            console.error('خطأ في تهيئة تطبيق التغذية:', error);
            this.showError('فشل في تحميل التطبيق');
        }
    }

    // تحميل البيانات
    // Load data
    async loadData() {
        // البيانات محملة مسبقاً في DataManager
        // Data is pre-loaded in DataManager
        
        // يمكن إضافة تحميل من Firebase هنا
        // Can add Firebase loading here
        if (window.firebase && window.firebase.firestore) {
            try {
                const db = window.firebase.firestore();
                
                // تحميل الأطعمة المخصصة
                const customFoods = await db.collection('nutrition_foods').get();
                customFoods.forEach(doc => {
                    this.dataManager.foods.push({ id: doc.id, ...doc.data() });
                });
                
                // تحميل الوصفات المخصصة
                const customRecipes = await db.collection('nutrition_recipes').get();
                customRecipes.forEach(doc => {
                    this.dataManager.recipes.push({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.warn('تعذر تحميل البيانات المخصصة:', error);
            }
        }
    }

    // إعداد واجهة المستخدم
    // Setup UI
    setupUI() {
        const container = document.getElementById('nutritionApp');
        if (!container) {
            console.error('لم يتم العثور على حاوي التطبيق');
            return;
        }

        container.innerHTML = `
            <div class="nutrition-app">
                <!-- شريط التنقل -->
                <nav class="nutrition-nav">
                    <div class="nav-brand">
                        <i class="fas fa-utensils"></i>
                        <span data-i18n="nutrition.title">دليل التغذية</span>
                    </div>
                    
                    <div class="nav-menu">
                        <button class="nav-item ${this.currentView === 'dashboard' ? 'active' : ''}" 
                                data-view="dashboard" data-i18n="nutrition.dashboard">لوحة التحكم</button>
                        <button class="nav-item ${this.currentView === 'foods' ? 'active' : ''}" 
                                data-view="foods" data-i18n="nutrition.foods">الأطعمة</button>
                        <button class="nav-item ${this.currentView === 'recipes' ? 'active' : ''}" 
                                data-view="recipes" data-i18n="nutrition.recipes">الوصفات</button>
                        <button class="nav-item ${this.currentView === 'meal-plan' ? 'active' : ''}" 
                                data-view="meal-plan" data-i18n="nutrition.meal_plan">خطة الوجبات</button>
                        <button class="nav-item ${this.currentView === 'favorites' ? 'active' : ''}" 
                                data-view="favorites" data-i18n="nutrition.favorites">المفضلة</button>
                        <button class="nav-item ${this.currentView === 'statistics' ? 'active' : ''}" 
                                data-view="statistics" data-i18n="nutrition.statistics">الإحصائيات</button>
                    </div>
                    
                    <div class="nav-controls">
                        <button class="language-toggle" onclick="nutritionApp.toggleLanguage()">
                            <i class="fas fa-language"></i>
                            <span>${this.currentLanguage === 'ar' ? 'EN' : 'عر'}</span>
                        </button>
                        <button class="settings-btn" onclick="nutritionApp.showSettings()">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </nav>
                
                <!-- المحتوى الرئيسي -->
                <main class="nutrition-main">
                    <div id="nutritionContent" class="nutrition-content">
                        <!-- سيتم تحميل المحتوى هنا -->
                    </div>
                </main>
                
                <!-- النوافذ المنبثقة -->
                <div id="nutritionModals" class="nutrition-modals">
                    <!-- النوافذ المنبثقة ستظهر هنا -->
                </div>
                
                <!-- شاشة التحميل -->
                <div id="nutritionLoading" class="loading-overlay" style="display: none;">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <span data-i18n="common.loading">جاري التحميل...</span>
                    </div>
                </div>
            </div>
        `;
    }

    // إعداد مستمعي الأحداث
    // Setup event listeners
    setupEventListeners() {
        // التنقل
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item')) {
                const view = e.target.getAttribute('data-view');
                this.showView(view);
            }
        });

        // البحث والفلترة
        document.addEventListener('input', (e) => {
            if (e.target.matches('#nutritionSearch')) {
                this.filters.search = e.target.value;
                this.debounceSearch();
            }
            if (e.target.matches('.filter-input')) {
                const filterType = e.target.getAttribute('data-filter');
                this.filters[filterType] = e.target.value || null;
                this.applyFilters();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.matches('.filter-select')) {
                const filterType = e.target.getAttribute('data-filter');
                this.filters[filterType] = e.target.value;
                this.applyFilters();
            }
            if (e.target.matches('input[type="checkbox"]')) {
                this.updateAllergenFilters();
            }
        });

        // إغلاق النوافذ المنبثقة
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-overlay') || e.target.matches('.close-btn')) {
                this.closeModal();
            }
        });

        // اختصارات لوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('nutritionSearch');
                if (searchInput) searchInput.focus();
            }
        });
    }

    // عرض طريقة عرض معينة
    // Show specific view
    showView(viewName) {
        this.currentView = viewName;
        
        // تحديث التنقل
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === viewName);
        });
        
        // عرض المحتوى
        const content = document.getElementById('nutritionContent');
        if (!content) return;
        
        switch (viewName) {
            case 'dashboard':
                this.showDashboard();
                break;
            case 'foods':
                this.showFoods();
                break;
            case 'recipes':
                this.showRecipes();
                break;
            case 'meal-plan':
                this.showMealPlan();
                break;
            case 'favorites':
                this.showFavorites();
                break;
            case 'statistics':
                this.showStatistics();
                break;
            default:
                this.showDashboard();
        }
    }

    // عرض لوحة التحكم
    // Show dashboard
    showDashboard() {
        const stats = this.dataManager.getNutritionStats();
        const recentFoods = this.dataManager.foods.slice(0, 6);
        const popularRecipes = this.dataManager.recipes
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4);
        
        const content = `
            <div class="dashboard-view">
                <div class="dashboard-header">
                    <h1 data-i18n="nutrition.welcome">مرحباً بك في دليل التغذية</h1>
                    <p data-i18n="nutrition.dashboard_desc">اكتشف الأطعمة الصحية وخطط وجباتك</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${stats.totalFoods}</h3>
                            <p data-i18n="nutrition.total_foods">إجمالي الأطعمة</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${stats.totalRecipes}</h3>
                            <p data-i18n="nutrition.total_recipes">إجمالي الوصفات</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${stats.avgCalories}</h3>
                            <p data-i18n="nutrition.avg_calories">متوسط السعرات</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-dumbbell"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${stats.highProteinFoods}</h3>
                            <p data-i18n="nutrition.high_protein">أطعمة عالية البروتين</p>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-sections">
                    <section class="recent-foods">
                        <div class="section-header">
                            <h2 data-i18n="nutrition.recent_foods">أطعمة مميزة</h2>
                            <button class="view-all-btn" onclick="nutritionApp.showView('foods')">
                                <span data-i18n="common.view_all">عرض الكل</span>
                                <i class="fas fa-arrow-left"></i>
                            </button>
                        </div>
                        <div class="foods-grid">
                            ${recentFoods.map(food => this.utils.createFoodCard(food, this.currentLanguage)).join('')}
                        </div>
                    </section>
                    
                    <section class="popular-recipes">
                        <div class="section-header">
                            <h2 data-i18n="nutrition.popular_recipes">وصفات شائعة</h2>
                            <button class="view-all-btn" onclick="nutritionApp.showView('recipes')">
                                <span data-i18n="common.view_all">عرض الكل</span>
                                <i class="fas fa-arrow-left"></i>
                            </button>
                        </div>
                        <div class="recipes-grid">
                            ${popularRecipes.map(recipe => this.utils.createRecipeCard(recipe, this.currentLanguage)).join('')}
                        </div>
                    </section>
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
    }

    // عرض الأطعمة
    // Show foods
    showFoods() {
        const filterOptions = this.utils.generateFilterOptions(this.dataManager.foods, this.currentLanguage);
        
        const content = `
            <div class="foods-view">
                <div class="view-header">
                    <h1 data-i18n="nutrition.foods_title">دليل الأطعمة</h1>
                    <div class="view-actions">
                        <button class="btn-primary" onclick="nutritionApp.showAddFoodModal()">
                            <i class="fas fa-plus"></i>
                            <span data-i18n="nutrition.add_food">إضافة طعام</span>
                        </button>
                    </div>
                </div>
                
                <div class="filters-section">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <i class="fas fa-search"></i>
                            <input type="text" id="nutritionSearch" 
                                   placeholder="${this.currentLanguage === 'ar' ? 'ابحث عن طعام...' : 'Search for food...'}" 
                                   value="${this.filters.search}">
                        </div>
                    </div>
                    
                    <div class="filters-grid">
                        <select class="filter-select" data-filter="category">
                            <option value="all">${this.currentLanguage === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                            ${filterOptions.categories.map(cat => 
                                `<option value="${cat.value}" ${this.filters.category === cat.value ? 'selected' : ''}>
                                    ${cat.label}
                                </option>`
                            ).join('')}
                        </select>
                        
                        <select class="filter-select" data-filter="diet">
                            <option value="all">${this.currentLanguage === 'ar' ? 'جميع الحميات' : 'All Diets'}</option>
                            ${filterOptions.diets.map(diet => 
                                `<option value="${diet.value}" ${this.filters.diet === diet.value ? 'selected' : ''}>
                                    ${diet.label}
                                </option>`
                            ).join('')}
                        </select>
                        
                        <select class="filter-select" data-filter="sortBy">
                            <option value="name" ${this.filters.sortBy === 'name' ? 'selected' : ''}>
                                ${this.currentLanguage === 'ar' ? 'الاسم' : 'Name'}
                            </option>
                            <option value="calories" ${this.filters.sortBy === 'calories' ? 'selected' : ''}>
                                ${this.currentLanguage === 'ar' ? 'السعرات' : 'Calories'}
                            </option>
                            <option value="protein" ${this.filters.sortBy === 'protein' ? 'selected' : ''}>
                                ${this.currentLanguage === 'ar' ? 'البروتين' : 'Protein'}
                            </option>
                        </select>
                        
                        <button class="filter-toggle-btn" onclick="nutritionApp.toggleAdvancedFilters()">
                            <i class="fas fa-sliders-h"></i>
                            <span data-i18n="nutrition.advanced_filters">فلاتر متقدمة</span>
                        </button>
                    </div>
                    
                    <div id="advancedFilters" class="advanced-filters" style="display: none;">
                        <div class="filter-group">
                            <label data-i18n="nutrition.max_calories">الحد الأقصى للسعرات:</label>
                            <input type="number" class="filter-input" data-filter="maxCalories" 
                                   value="${this.filters.maxCalories || ''}" placeholder="مثال: 200">
                        </div>
                        
                        <div class="filter-group">
                            <label data-i18n="nutrition.min_protein">الحد الأدنى للبروتين:</label>
                            <input type="number" class="filter-input" data-filter="minProtein" 
                                   value="${this.filters.minProtein || ''}" placeholder="مثال: 10">
                        </div>
                        
                        <div class="filter-group">
                            <label data-i18n="nutrition.exclude_allergens">استبعاد مسببات الحساسية:</label>
                            <div class="allergens-checkboxes">
                                ${filterOptions.allergens.map(allergen => `
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="${allergen.value}" 
                                               ${(this.filters.excludeAllergens || []).includes(allergen.value) ? 'checked' : ''}>
                                        <span>${allergen.label}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                </div>
                
                <div id="foodsResults" class="foods-results">
                    ${this.renderFoodsGrid()}
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
    }

    // عرض الوصفات
    // Show recipes
    showRecipes() {
        const filterOptions = this.utils.generateRecipeFilterOptions(this.dataManager.recipes, this.currentLanguage);
        
        const content = `
            <div class="recipes-view">
                <div class="view-header">
                    <h1 data-i18n="nutrition.recipes_title">الوصفات الصحية</h1>
                    <div class="view-actions">
                        <button class="btn-primary" onclick="nutritionApp.showAddRecipeModal()">
                            <i class="fas fa-plus"></i>
                            <span data-i18n="nutrition.add_recipe">إضافة وصفة</span>
                        </button>
                    </div>
                </div>
                
                <div class="filters-section">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <i class="fas fa-search"></i>
                            <input type="text" id="recipesSearch" 
                                   placeholder="${this.currentLanguage === 'ar' ? 'ابحث عن وصفة...' : 'Search for recipe...'}">
                        </div>
                    </div>
                    
                    <div class="filters-grid">
                        <select class="filter-select" data-filter="cuisine">
                            <option value="all">${this.currentLanguage === 'ar' ? 'جميع المطابخ' : 'All Cuisines'}</option>
                            ${filterOptions.cuisines.map(cuisine => 
                                `<option value="${cuisine.value}">${cuisine.label}</option>`
                            ).join('')}
                        </select>
                        
                        <select class="filter-select" data-filter="difficulty">
                            <option value="all">${this.currentLanguage === 'ar' ? 'جميع المستويات' : 'All Levels'}</option>
                            ${filterOptions.difficulties.map(diff => 
                                `<option value="${diff.value}">${diff.label}</option>`
                            ).join('')}
                        </select>
                        
                        <select class="filter-select" data-filter="cookingTime">
                            <option value="all">${this.currentLanguage === 'ar' ? 'جميع الأوقات' : 'All Times'}</option>
                            <option value="quick">${this.currentLanguage === 'ar' ? 'سريع (أقل من 30 دقيقة)' : 'Quick (Under 30 min)'}</option>
                            <option value="medium">${this.currentLanguage === 'ar' ? 'متوسط (30-60 دقيقة)' : 'Medium (30-60 min)'}</option>
                            <option value="long">${this.currentLanguage === 'ar' ? 'طويل (أكثر من ساعة)' : 'Long (Over 1 hour)'}</option>
                        </select>
                    </div>
                </div>
                
                <div id="recipesResults" class="recipes-results">
                    ${this.renderRecipesGrid()}
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
    }

    // عرض خطة الوجبات
    // Show meal plan
    showMealPlan() {
        const content = `
            <div class="meal-plan-view">
                <div class="view-header">
                    <h1 data-i18n="nutrition.meal_plan_title">خطة الوجبات</h1>
                    <div class="view-actions">
                        <button class="btn-primary" onclick="nutritionApp.generateMealPlan()">
                            <i class="fas fa-magic"></i>
                            <span data-i18n="nutrition.generate_plan">إنشاء خطة تلقائية</span>
                        </button>
                        <button class="btn-secondary" onclick="nutritionApp.saveMealPlan()">
                            <i class="fas fa-save"></i>
                            <span data-i18n="nutrition.save_plan">حفظ الخطة</span>
                        </button>
                    </div>
                </div>
                
                <div class="meal-plan-grid">
                    <div class="meal-section">
                        <div class="meal-header">
                            <h3 data-i18n="nutrition.breakfast">الإفطار</h3>
                            <button class="add-meal-btn" onclick="nutritionApp.showAddMealModal('breakfast')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="meal-items" id="breakfastItems">
                            ${this.renderMealItems('breakfast')}
                        </div>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-header">
                            <h3 data-i18n="nutrition.lunch">الغداء</h3>
                            <button class="add-meal-btn" onclick="nutritionApp.showAddMealModal('lunch')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="meal-items" id="lunchItems">
                            ${this.renderMealItems('lunch')}
                        </div>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-header">
                            <h3 data-i18n="nutrition.dinner">العشاء</h3>
                            <button class="add-meal-btn" onclick="nutritionApp.showAddMealModal('dinner')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="meal-items" id="dinnerItems">
                            ${this.renderMealItems('dinner')}
                        </div>
                    </div>
                    
                    <div class="meal-section">
                        <div class="meal-header">
                            <h3 data-i18n="nutrition.snacks">الوجبات الخفيفة</h3>
                            <button class="add-meal-btn" onclick="nutritionApp.showAddMealModal('snacks')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="meal-items" id="snacksItems">
                            ${this.renderMealItems('snacks')}
                        </div>
                    </div>
                </div>
                
                <div class="meal-plan-summary">
                    <h3 data-i18n="nutrition.daily_summary">ملخص اليوم</h3>
                    <div class="nutrition-summary">
                        ${this.renderNutritionSummary()}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
    }

    // عرض المفضلة
    // Show favorites
    showFavorites() {
        const favoriteFoods = this.dataManager.foods.filter(food => this.favorites.has(food.id));
        const favoriteRecipes = this.dataManager.recipes.filter(recipe => this.favorites.has(recipe.id));
        
        const content = `
            <div class="favorites-view">
                <div class="view-header">
                    <h1 data-i18n="nutrition.favorites_title">المفضلة</h1>
                    <div class="view-actions">
                        <button class="btn-secondary" onclick="nutritionApp.clearFavorites()">
                            <i class="fas fa-trash"></i>
                            <span data-i18n="nutrition.clear_favorites">مسح الكل</span>
                        </button>
                    </div>
                </div>
                
                <div class="favorites-tabs">
                    <button class="tab-btn active" data-tab="foods">
                        <i class="fas fa-utensils"></i>
                        <span data-i18n="nutrition.favorite_foods">الأطعمة المفضلة</span>
                        <span class="count">(${favoriteFoods.length})</span>
                    </button>
                    <button class="tab-btn" data-tab="recipes">
                        <i class="fas fa-book-open"></i>
                        <span data-i18n="nutrition.favorite_recipes">الوصفات المفضلة</span>
                        <span class="count">(${favoriteRecipes.length})</span>
                    </button>
                </div>
                
                <div class="favorites-content">
                    <div class="tab-content active" id="favoriteFoods">
                        ${favoriteFoods.length > 0 ? 
                            `<div class="foods-grid">
                                ${favoriteFoods.map(food => this.utils.createFoodCard(food, this.currentLanguage)).join('')}
                            </div>` :
                            `<div class="empty-state">
                                <i class="fas fa-heart"></i>
                                <h3 data-i18n="nutrition.no_favorite_foods">لا توجد أطعمة مفضلة</h3>
                                <p data-i18n="nutrition.add_favorite_foods_desc">ابدأ بإضافة أطعمة إلى المفضلة</p>
                            </div>`
                        }
                    </div>
                    
                    <div class="tab-content" id="favoriteRecipes">
                        ${favoriteRecipes.length > 0 ? 
                            `<div class="recipes-grid">
                                ${favoriteRecipes.map(recipe => this.utils.createRecipeCard(recipe, this.currentLanguage)).join('')}
                            </div>` :
                            `<div class="empty-state">
                                <i class="fas fa-heart"></i>
                                <h3 data-i18n="nutrition.no_favorite_recipes">لا توجد وصفات مفضلة</h3>
                                <p data-i18n="nutrition.add_favorite_recipes_desc">ابدأ بإضافة وصفات إلى المفضلة</p>
                            </div>`
                        }
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
        
        // إعداد التبويبات
        this.setupFavoritesTabs();
    }

    // عرض الإحصائيات
    // Show statistics
    showStatistics() {
        const stats = this.dataManager.getNutritionStats();
        const chartData = this.utils.generateChartData(this.dataManager.foods, this.dataManager.recipes);
        
        const content = `
            <div class="statistics-view">
                <div class="view-header">
                    <h1 data-i18n="nutrition.statistics_title">إحصائيات التغذية</h1>
                    <div class="view-actions">
                        <button class="btn-secondary" onclick="nutritionApp.exportStatistics()">
                            <i class="fas fa-download"></i>
                            <span data-i18n="nutrition.export_stats">تصدير الإحصائيات</span>
                        </button>
                    </div>
                </div>
                
                <div class="stats-overview">
                    <div class="stat-card">
                        <h3>${stats.totalFoods}</h3>
                        <p data-i18n="nutrition.total_foods">إجمالي الأطعمة</p>
                    </div>
                    <div class="stat-card">
                        <h3>${stats.totalRecipes}</h3>
                        <p data-i18n="nutrition.total_recipes">إجمالي الوصفات</p>
                    </div>
                    <div class="stat-card">
                        <h3>${stats.avgCalories}</h3>
                        <p data-i18n="nutrition.avg_calories">متوسط السعرات</p>
                    </div>
                    <div class="stat-card">
                        <h3>${stats.highProteinFoods}</h3>
                        <p data-i18n="nutrition.high_protein">أطعمة عالية البروتين</p>
                    </div>
                </div>
                
                <div class="charts-grid">
                    <div class="chart-container">
                        <h3 data-i18n="nutrition.categories_distribution">توزيع الفئات</h3>
                        <canvas id="categoriesChart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3 data-i18n="nutrition.nutrition_breakdown">تحليل العناصر الغذائية</h3>
                        <canvas id="nutritionChart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3 data-i18n="nutrition.calories_distribution">توزيع السعرات الحرارية</h3>
                        <canvas id="caloriesChart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3 data-i18n="nutrition.diet_types">أنواع الحميات</h3>
                        <canvas id="dietChart"></canvas>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('nutritionContent').innerHTML = content;
        
        // رسم المخططات
        this.renderCharts(chartData);
    }

    // تطبيق الفلاتر
    // Apply filters
    applyFilters() {
        if (this.currentView === 'foods') {
            const resultsContainer = document.getElementById('foodsResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = this.renderFoodsGrid();
            }
        } else if (this.currentView === 'recipes') {
            const resultsContainer = document.getElementById('recipesResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = this.renderRecipesGrid();
            }
        }
    }

    // البحث مع التأخير
    // Debounced search
    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    // عرض شبكة الأطعمة
    // Render foods grid
    renderFoodsGrid() {
        const filteredFoods = this.dataManager.filterFoods(this.filters);
        
        if (filteredFoods.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3 data-i18n="nutrition.no_foods_found">لم يتم العثور على أطعمة</h3>
                    <p data-i18n="nutrition.try_different_filters">جرب فلاتر مختلفة</p>
                </div>
            `;
        }
        
        return `
            <div class="foods-grid">
                ${filteredFoods.map(food => this.utils.createFoodCard(food, this.currentLanguage)).join('')}
            </div>
        `;
    }

    // عرض شبكة الوصفات
    // Render recipes grid
    renderRecipesGrid() {
        const filteredRecipes = this.dataManager.filterRecipes(this.filters);
        
        if (filteredRecipes.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3 data-i18n="nutrition.no_recipes_found">لم يتم العثور على وصفات</h3>
                    <p data-i18n="nutrition.try_different_filters">جرب فلاتر مختلفة</p>
                </div>
            `;
        }
        
        return `
            <div class="recipes-grid">
                ${filteredRecipes.map(recipe => this.utils.createRecipeCard(recipe, this.currentLanguage)).join('')}
            </div>
        `;
    }

    // عرض عناصر الوجبة
    // Render meal items
    renderMealItems(mealType) {
        const items = this.mealPlan[mealType] || [];
        
        if (items.length === 0) {
            return `
                <div class="empty-meal">
                    <i class="fas fa-plus-circle"></i>
                    <p data-i18n="nutrition.add_meal_items">أضف عناصر للوجبة</p>
                </div>
            `;
        }
        
        return items.map(item => `
            <div class="meal-item">
                <div class="meal-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.calories} سعرة حرارية</p>
                </div>
                <button class="remove-meal-btn" onclick="nutritionApp.removeMealItem('${mealType}', '${item.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // عرض ملخص التغذية
    // Render nutrition summary
    renderNutritionSummary() {
        const totalNutrition = this.calculateDailyNutrition();
        
        return `
            <div class="nutrition-bars">
                <div class="nutrition-bar">
                    <label>السعرات الحرارية</label>
                    <div class="bar">
                        <div class="fill" style="width: ${Math.min(100, (totalNutrition.calories / 2000) * 100)}%"></div>
                    </div>
                    <span>${totalNutrition.calories} / 2000</span>
                </div>
                
                <div class="nutrition-bar">
                    <label>البروتين</label>
                    <div class="bar">
                        <div class="fill" style="width: ${Math.min(100, (totalNutrition.protein / 150) * 100)}%"></div>
                    </div>
                    <span>${totalNutrition.protein}g / 150g</span>
                </div>
                
                <div class="nutrition-bar">
                    <label>الكربوهيدرات</label>
                    <div class="bar">
                        <div class="fill" style="width: ${Math.min(100, (totalNutrition.carbs / 300) * 100)}%"></div>
                    </div>
                    <span>${totalNutrition.carbs}g / 300g</span>
                </div>
                
                <div class="nutrition-bar">
                    <label>الدهون</label>
                    <div class="bar">
                        <div class="fill" style="width: ${Math.min(100, (totalNutrition.fat / 65) * 100)}%"></div>
                    </div>
                    <span>${totalNutrition.fat}g / 65g</span>
                </div>
            </div>
        `;
    }

    // حساب التغذية اليومية
    // Calculate daily nutrition
    calculateDailyNutrition() {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        
        Object.values(this.mealPlan).forEach(meal => {
            meal.forEach(item => {
                totalCalories += item.calories || 0;
                totalProtein += item.protein || 0;
                totalCarbs += item.carbs || 0;
                totalFat += item.fat || 0;
            });
        });
        
        return {
            calories: Math.round(totalCalories),
            protein: Math.round(totalProtein),
            carbs: Math.round(totalCarbs),
            fat: Math.round(totalFat)
        };
    }

    // تبديل اللغة
    // Toggle language
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        
        // تحديث النص في شريط التنقل
        const langBtn = document.querySelector('.language-toggle span');
        if (langBtn) {
            langBtn.textContent = this.currentLanguage === 'ar' ? 'EN' : 'عر';
        }
        
        // إعادة عرض المحتوى الحالي
        this.showView(this.currentView);
        
        // تحديث النظام الموحد للغات
        if (window.i18n) {
            window.i18n.setLanguage(this.currentLanguage);
        }
    }

    // تبديل الفلاتر المتقدمة
    // Toggle advanced filters
    toggleAdvancedFilters() {
        const advancedFilters = document.getElementById('advancedFilters');
        if (advancedFilters) {
            const isVisible = advancedFilters.style.display !== 'none';
            advancedFilters.style.display = isVisible ? 'none' : 'block';
        }
    }

    // تحديث فلاتر مسببات الحساسية
    // Update allergen filters
    updateAllergenFilters() {
        const checkboxes = document.querySelectorAll('.allergens-checkboxes input[type="checkbox"]');
        this.filters.excludeAllergens = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        this.applyFilters();
    }

    // إعداد تبويبات المفضلة
    // Setup favorites tabs
    setupFavoritesTabs() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.tab-btn')) {
                const tabName = e.target.getAttribute('data-tab');
                
                // تحديث الأزرار
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // تحديث المحتوى
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`favorite${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`)
                    .classList.add('active');
            }
        });
    }

    // رسم المخططات
    // Render charts
    renderCharts(chartData) {
        // التأكد من وجود Chart.js
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js غير محمل');
            return;
        }
        
        // مخطط الفئات
        const categoriesCtx = document.getElementById('categoriesChart');
        if (categoriesCtx) {
            new Chart(categoriesCtx, {
                type: 'doughnut',
                data: chartData.categories,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
        
        // مخطط التغذية
        const nutritionCtx = document.getElementById('nutritionChart');
        if (nutritionCtx) {
            new Chart(nutritionCtx, {
                type: 'bar',
                data: chartData.nutrition,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // مخطط السعرات
        const caloriesCtx = document.getElementById('caloriesChart');
        if (caloriesCtx) {
            new Chart(caloriesCtx, {
                type: 'line',
                data: chartData.calories,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // مخطط الحميات
        const dietCtx = document.getElementById('dietChart');
        if (dietCtx) {
            new Chart(dietCtx, {
                type: 'pie',
                data: chartData.diets,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // تحميل بيانات المستخدم
    // Load user data
    loadUserData() {
        try {
            const savedFavorites = localStorage.getItem('nutrition_favorites');
            if (savedFavorites) {
                this.favorites = new Set(JSON.parse(savedFavorites));
            }
            
            const savedMealPlan = localStorage.getItem('nutrition_meal_plan');
            if (savedMealPlan) {
                this.mealPlan = JSON.parse(savedMealPlan);
            }
        } catch (error) {
            console.warn('تعذر تحميل بيانات المستخدم:', error);
        }
    }

    // حفظ بيانات المستخدم
    // Save user data
    saveUserData() {
        try {
            localStorage.setItem('nutrition_favorites', JSON.stringify(Array.from(this.favorites)));
            localStorage.setItem('nutrition_meal_plan', JSON.stringify(this.mealPlan));
        } catch (error) {
            console.warn('تعذر حفظ بيانات المستخدم:', error);
        }
    }

    // التكامل مع النظام الموحد
    // Integrate with unified system
    integrateWithUnifiedSystem() {
        // التكامل مع نظام اللغات
        if (window.i18n) {
            this.currentLanguage = window.i18n.getCurrentLanguage() || 'ar';
        }
        
        // التكامل مع نظام التوجيه
        if (window.router) {
            window.router.addRoute('/nutrition', () => this.init());
            window.router.addRoute('/nutrition/:view', (params) => {
                this.init().then(() => this.showView(params.view));
            });
        }
        
        // التكامل مع نظام الإشعارات
        if (window.notifications) {
            // يمكن إضافة إشعارات للتذكير بالوجبات
        }
    }

    // عرض خطأ
    // Show error
    showError(message) {
        console.error(message);
        
        // يمكن إضافة عرض رسالة خطأ للمستخدم
        if (window.notifications) {
            window.notifications.showError(message);
        }
    }

    // إظهار شاشة التحميل
    // Show loading
    showLoading() {
        const loading = document.getElementById('nutritionLoading');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    // إخفاء شاشة التحميل
    // Hide loading
    hideLoading() {
        const loading = document.getElementById('nutritionLoading');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    // إغلاق النافذة المنبثقة
    // Close modal
    closeModal() {
        const modals = document.getElementById('nutritionModals');
        if (modals) {
            modals.innerHTML = '';
        }
        this.currentModal = null;
    }

    // تنظيف الموارد
    // Cleanup resources
    destroy() {
        // حفظ البيانات
        this.saveUserData();
        
        // تنظيف مستمعي الأحداث
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('input', this.handleInput);
        document.removeEventListener('change', this.handleChange);
        document.removeEventListener('keydown', this.handleKeydown);
        
        // مسح المحتوى
        const container = document.getElementById('nutritionApp');
        if (container) {
            container.innerHTML = '';
        }
    }
}

// تصدير الفئة
// Export class
export { NutritionApp };

// إنشاء مثيل عام للاستخدام
// Create global instance for use
if (typeof window !== 'undefined') {
    window.NutritionApp = NutritionApp;
    window.nutritionApp = new NutritionApp();
}