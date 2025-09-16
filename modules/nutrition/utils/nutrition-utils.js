// وظائف مساعدة لتطبيق التغذية - نظام موحد
// Helper functions for Nutrition App - Unified System

// استيراد النظام الموحد
// Import unified system
import { i18n } from '../../../core/i18n/i18n.js';
import { formatDate, formatNumber } from '../../../shared/utils/formatters.js';

// فئة الوظائف المساعدة للتغذية
// Nutrition utilities class
class NutritionUtils {
    constructor() {
        this.currentLanguage = 'ar';
    }

    // تنسيق عرض معلومات الطعام
    // Format food information display
    formatFoodInfo(food, language = 'ar') {
        const name = language === 'ar' ? food.nameAr : food.nameEn;
        const category = this.getCategoryName(food.category, language);
        
        return {
            name,
            category,
            calories: `${food.calories} ${language === 'ar' ? 'سعر حراري' : 'kcal'}`,
            protein: `${food.protein}${language === 'ar' ? 'جم' : 'g'}`,
            carbs: `${food.carbs}${language === 'ar' ? 'جم' : 'g'}`,
            fat: `${food.fat}${language === 'ar' ? 'جم' : 'g'}`,
            fiber: `${food.fiber}${language === 'ar' ? 'جم' : 'g'}`,
            glycemicIndex: food.glycemicIndex,
            benefits: food.benefits || []
        };
    }

    // إنشاء بطاقة طعام HTML
    // Create food card HTML
    createFoodCard(food, language = 'ar') {
        const info = this.formatFoodInfo(food, language);
        const isRTL = language === 'ar';
        
        return `
            <div class="food-card" data-food-id="${food.id}" data-category="${food.category}">
                <div class="food-card-header">
                    <div class="food-image">
                        ${food.image ? 
                            `<img src="/src/assets/images/foods/${food.image}" alt="${info.name}" loading="lazy">` :
                            `<div class="food-icon"><i class="fas fa-utensils"></i></div>`
                        }
                        <div class="category-badge" style="background-color: ${this.getCategoryColor(food.category)}">
                            <i class="${this.getCategoryIcon(food.category)}"></i>
                            ${info.category}
                        </div>
                    </div>
                    <div class="food-info">
                        <h3 class="food-name">${info.name}</h3>
                        <div class="nutrition-summary">
                            <span class="calories">${info.calories}</span>
                            <span class="macros">
                                <span class="protein">P: ${info.protein}</span>
                                <span class="carbs">C: ${info.carbs}</span>
                                <span class="fat">F: ${info.fat}</span>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="food-card-body">
                    <div class="nutrition-details">
                        <div class="nutrition-item">
                            <span class="label">${language === 'ar' ? 'الألياف:' : 'Fiber:'}</span>
                            <span class="value">${info.fiber}</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="label">${language === 'ar' ? 'المؤشر الجلايسيمي:' : 'Glycemic Index:'}</span>
                            <span class="value gi-${this.getGICategory(food.glycemicIndex)}">${food.glycemicIndex}</span>
                        </div>
                    </div>
                    
                    ${food.benefits && food.benefits.length > 0 ? `
                        <div class="benefits-preview">
                            <h4>${language === 'ar' ? 'الفوائد:' : 'Benefits:'}</h4>
                            <ul>
                                ${food.benefits.slice(0, 2).map(benefit => `<li>${benefit}</li>`).join('')}
                                ${food.benefits.length > 2 ? `<li class="more">+${food.benefits.length - 2} ${language === 'ar' ? 'المزيد' : 'more'}</li>` : ''}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="food-actions">
                        <button class="btn-primary" onclick="nutritionApp.showFoodDetails(${food.id})">
                            <i class="fas fa-info-circle"></i>
                            ${language === 'ar' ? 'التفاصيل' : 'Details'}
                        </button>
                        <button class="btn-secondary" onclick="nutritionApp.addToMealPlan(${food.id})">
                            <i class="fas fa-plus"></i>
                            ${language === 'ar' ? 'إضافة للخطة' : 'Add to Plan'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء نافذة تفاصيل الطعام
    // Create food details modal
    createFoodDetailsModal(food, language = 'ar') {
        const info = this.formatFoodInfo(food, language);
        
        return `
            <div class="modal-overlay" id="foodDetailsModal">
                <div class="modal-content food-details-modal">
                    <div class="modal-header">
                        <h2>${info.name}</h2>
                        <button class="close-btn" onclick="nutritionApp.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="food-details-grid">
                            <div class="food-image-section">
                                ${food.image ? 
                                    `<img src="/src/assets/images/foods/${food.image}" alt="${info.name}">` :
                                    `<div class="placeholder-image"><i class="fas fa-utensils"></i></div>`
                                }
                                <div class="food-meta">
                                    <span class="category">${info.category}</span>
                                    <span class="origin">${food.origin || ''}</span>
                                </div>
                            </div>
                            
                            <div class="nutrition-section">
                                <h3>${language === 'ar' ? 'القيم الغذائية (لكل 100جم)' : 'Nutrition Facts (per 100g)'}</h3>
                                <div class="nutrition-grid">
                                    <div class="nutrition-item major">
                                        <span class="label">${language === 'ar' ? 'السعرات الحرارية' : 'Calories'}</span>
                                        <span class="value">${info.calories}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'البروتين' : 'Protein'}</span>
                                        <span class="value">${info.protein}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'الكربوهيدرات' : 'Carbohydrates'}</span>
                                        <span class="value">${info.carbs}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'الدهون' : 'Fat'}</span>
                                        <span class="value">${info.fat}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'الألياف' : 'Fiber'}</span>
                                        <span class="value">${info.fiber}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'السكر' : 'Sugar'}</span>
                                        <span class="value">${food.sugar}${language === 'ar' ? 'جم' : 'g'}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'الصوديوم' : 'Sodium'}</span>
                                        <span class="value">${food.sodium}${language === 'ar' ? 'ملجم' : 'mg'}</span>
                                    </div>
                                    <div class="nutrition-item">
                                        <span class="label">${language === 'ar' ? 'المؤشر الجلايسيمي' : 'Glycemic Index'}</span>
                                        <span class="value gi-${this.getGICategory(food.glycemicIndex)}">${food.glycemicIndex}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        ${food.vitamins ? `
                            <div class="vitamins-section">
                                <h3>${language === 'ar' ? 'الفيتامينات' : 'Vitamins'}</h3>
                                <div class="vitamins-grid">
                                    ${Object.entries(food.vitamins).map(([vitamin, amount]) => `
                                        <div class="vitamin-item">
                                            <span class="vitamin-name">${language === 'ar' ? 'فيتامين' : 'Vitamin'} ${vitamin}</span>
                                            <span class="vitamin-amount">${amount}${this.getVitaminUnit(vitamin)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${food.minerals ? `
                            <div class="minerals-section">
                                <h3>${language === 'ar' ? 'المعادن' : 'Minerals'}</h3>
                                <div class="minerals-grid">
                                    ${Object.entries(food.minerals).map(([mineral, amount]) => `
                                        <div class="mineral-item">
                                            <span class="mineral-name">${this.getMineralName(mineral, language)}</span>
                                            <span class="mineral-amount">${amount}${this.getMineralUnit(mineral)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${food.benefits && food.benefits.length > 0 ? `
                            <div class="benefits-section">
                                <h3>${language === 'ar' ? 'الفوائد الصحية' : 'Health Benefits'}</h3>
                                <ul class="benefits-list">
                                    ${food.benefits.map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${food.allergens && food.allergens.length > 0 ? `
                            <div class="allergens-section">
                                <h3>${language === 'ar' ? 'مسببات الحساسية' : 'Allergens'}</h3>
                                <div class="allergens-list">
                                    ${food.allergens.map(allergen => `
                                        <span class="allergen-tag">
                                            <i class="fas fa-exclamation-triangle"></i>
                                            ${this.getAllergenName(allergen, language)}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${food.dietaryRestrictions && food.dietaryRestrictions.length > 0 ? `
                            <div class="dietary-section">
                                <h3>${language === 'ar' ? 'مناسب للحميات' : 'Suitable for Diets'}</h3>
                                <div class="dietary-tags">
                                    ${food.dietaryRestrictions.map(diet => `
                                        <span class="diet-tag">
                                            <i class="fas fa-leaf"></i>
                                            ${this.getDietName(diet, language)}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="modal-footer">
                        <button class="btn-primary" onclick="nutritionApp.addToMealPlan(${food.id})">
                            <i class="fas fa-plus"></i>
                            ${language === 'ar' ? 'إضافة للخطة الغذائية' : 'Add to Meal Plan'}
                        </button>
                        <button class="btn-secondary" onclick="nutritionApp.addToFavorites(${food.id})">
                            <i class="fas fa-heart"></i>
                            ${language === 'ar' ? 'إضافة للمفضلة' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء بطاقة وصفة
    // Create recipe card
    createRecipeCard(recipe, language = 'ar') {
        const name = language === 'ar' ? recipe.nameAr : recipe.nameEn;
        const totalTime = recipe.prepTime + recipe.cookTime;
        
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}" data-category="${recipe.category}">
                <div class="recipe-image">
                    ${recipe.image ? 
                        `<img src="/src/assets/images/recipes/${recipe.image}" alt="${name}" loading="lazy">` :
                        `<div class="recipe-placeholder"><i class="fas fa-utensils"></i></div>`
                    }
                    <div class="recipe-badges">
                        <span class="difficulty-badge difficulty-${recipe.difficulty}">
                            ${this.getDifficultyName(recipe.difficulty, language)}
                        </span>
                        <span class="time-badge">
                            <i class="fas fa-clock"></i>
                            ${totalTime} ${language === 'ar' ? 'دقيقة' : 'min'}
                        </span>
                    </div>
                </div>
                
                <div class="recipe-content">
                    <h3 class="recipe-name">${name}</h3>
                    <div class="recipe-meta">
                        <span class="servings">
                            <i class="fas fa-users"></i>
                            ${recipe.servings} ${language === 'ar' ? 'حصص' : 'servings'}
                        </span>
                        <span class="cuisine">
                            <i class="fas fa-globe"></i>
                            ${this.getCuisineName(recipe.cuisine, language)}
                        </span>
                    </div>
                    
                    <div class="recipe-nutrition">
                        <div class="nutrition-item">
                            <span class="label">${language === 'ar' ? 'السعرات:' : 'Calories:'}</span>
                            <span class="value">${recipe.calories}</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="label">P:</span>
                            <span class="value">${recipe.protein}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="label">C:</span>
                            <span class="value">${recipe.carbs}g</span>
                        </div>
                        <div class="nutrition-item">
                            <span class="label">F:</span>
                            <span class="value">${recipe.fat}g</span>
                        </div>
                    </div>
                    
                    ${recipe.tags && recipe.tags.length > 0 ? `
                        <div class="recipe-tags">
                            ${recipe.tags.slice(0, 3).map(tag => `
                                <span class="recipe-tag">${this.getTagName(tag, language)}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="recipe-rating">
                        ${this.createStarRating(recipe.rating || 0)}
                        <span class="rating-text">${recipe.rating || 0} (${recipe.reviews || 0})</span>
                    </div>
                    
                    <div class="recipe-actions">
                        <button class="btn-primary" onclick="nutritionApp.showRecipeDetails(${recipe.id})">
                            <i class="fas fa-eye"></i>
                            ${language === 'ar' ? 'عرض الوصفة' : 'View Recipe'}
                        </button>
                        <button class="btn-secondary" onclick="nutritionApp.addToFavorites(${recipe.id}, 'recipe')">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء تقييم بالنجوم
    // Create star rating
    createStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // نجوم ممتلئة
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // نجمة نصف ممتلئة
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // نجوم فارغة
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return `<div class="star-rating">${starsHTML}</div>`;
    }

    // فلترة وترتيب الأطعمة
    // Filter and sort foods
    filterFoods(foods, filters) {
        let filtered = [...foods];
        
        // فلتر النص
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(food => 
                food.nameAr.toLowerCase().includes(searchTerm) ||
                food.nameEn.toLowerCase().includes(searchTerm) ||
                (food.benefits && food.benefits.some(benefit => 
                    benefit.toLowerCase().includes(searchTerm)
                ))
            );
        }
        
        // فلتر الفئة
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(food => food.category === filters.category);
        }
        
        // فلتر السعرات
        if (filters.maxCalories) {
            filtered = filtered.filter(food => food.calories <= filters.maxCalories);
        }
        
        // فلتر البروتين
        if (filters.minProtein) {
            filtered = filtered.filter(food => food.protein >= filters.minProtein);
        }
        
        // فلتر المؤشر الجلايسيمي
        if (filters.maxGI) {
            filtered = filtered.filter(food => food.glycemicIndex <= filters.maxGI);
        }
        
        // فلتر الحميات الغذائية
        if (filters.diet && filters.diet !== 'all') {
            filtered = filtered.filter(food => 
                food.dietaryRestrictions && food.dietaryRestrictions.includes(filters.diet)
            );
        }
        
        // فلتر مسببات الحساسية
        if (filters.excludeAllergens && filters.excludeAllergens.length > 0) {
            filtered = filtered.filter(food => 
                !food.allergens || !food.allergens.some(allergen => 
                    filters.excludeAllergens.includes(allergen)
                )
            );
        }
        
        // الترتيب
        if (filters.sortBy) {
            filtered.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'name':
                        return a.nameAr.localeCompare(b.nameAr);
                    case 'calories':
                        return filters.sortOrder === 'desc' ? b.calories - a.calories : a.calories - b.calories;
                    case 'protein':
                        return filters.sortOrder === 'desc' ? b.protein - a.protein : a.protein - b.protein;
                    case 'gi':
                        return filters.sortOrder === 'desc' ? b.glycemicIndex - a.glycemicIndex : a.glycemicIndex - b.glycemicIndex;
                    default:
                        return 0;
                }
            });
        }
        
        return filtered;
    }

    // إنشاء خيارات الفلتر
    // Generate filter options
    generateFilterOptions(foods, language = 'ar') {
        const categories = [...new Set(foods.map(food => food.category))];
        const allergens = [...new Set(foods.flatMap(food => food.allergens || []))];
        const diets = [...new Set(foods.flatMap(food => food.dietaryRestrictions || []))];
        
        return {
            categories: categories.map(cat => ({
                value: cat,
                label: this.getCategoryName(cat, language)
            })),
            allergens: allergens.map(allergen => ({
                value: allergen,
                label: this.getAllergenName(allergen, language)
            })),
            diets: diets.map(diet => ({
                value: diet,
                label: this.getDietName(diet, language)
            }))
        };
    }

    // حساب الإحصائيات الغذائية
    // Calculate nutrition statistics
    calculateNutritionStats(foods) {
        if (!foods || foods.length === 0) return null;
        
        const totalFoods = foods.length;
        const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
        const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
        const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
        const totalFat = foods.reduce((sum, food) => sum + food.fat, 0);
        
        return {
            totalFoods,
            avgCalories: Math.round(totalCalories / totalFoods),
            avgProtein: Math.round((totalProtein / totalFoods) * 10) / 10,
            avgCarbs: Math.round((totalCarbs / totalFoods) * 10) / 10,
            avgFat: Math.round((totalFat / totalFoods) * 10) / 10,
            highProteinFoods: foods.filter(food => food.protein > 15).length,
            lowCalorieFoods: foods.filter(food => food.calories < 100).length,
            lowGIFoods: foods.filter(food => food.glycemicIndex < 55).length
        };
    }

    // إنشاء بيانات الرسوم البيانية
    // Generate chart data
    generateChartData(foods, type = 'categories') {
        switch (type) {
            case 'categories':
                const categoryData = {};
                foods.forEach(food => {
                    categoryData[food.category] = (categoryData[food.category] || 0) + 1;
                });
                return {
                    labels: Object.keys(categoryData).map(cat => this.getCategoryName(cat)),
                    data: Object.values(categoryData),
                    colors: Object.keys(categoryData).map(cat => this.getCategoryColor(cat))
                };
                
            case 'macros':
                const avgProtein = foods.reduce((sum, food) => sum + food.protein, 0) / foods.length;
                const avgCarbs = foods.reduce((sum, food) => sum + food.carbs, 0) / foods.length;
                const avgFat = foods.reduce((sum, food) => sum + food.fat, 0) / foods.length;
                
                return {
                    labels: ['البروتين', 'الكربوهيدرات', 'الدهون'],
                    data: [avgProtein, avgCarbs, avgFat],
                    colors: ['#f44336', '#4caf50', '#ff9800']
                };
                
            case 'calories':
                const calorieRanges = {
                    'أقل من 100': foods.filter(f => f.calories < 100).length,
                    '100-200': foods.filter(f => f.calories >= 100 && f.calories < 200).length,
                    '200-300': foods.filter(f => f.calories >= 200 && f.calories < 300).length,
                    'أكثر من 300': foods.filter(f => f.calories >= 300).length
                };
                
                return {
                    labels: Object.keys(calorieRanges),
                    data: Object.values(calorieRanges),
                    colors: ['#4caf50', '#8bc34a', '#ff9800', '#f44336']
                };
                
            default:
                return null;
        }
    }

    // تحديث اللغة
    // Update language
    updateLanguage(language) {
        this.currentLanguage = language;
        
        // تحديث النصوص في الصفحة
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18n.getText(key);
        });
        
        // تحديث اتجاه الصفحة
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }

    // تصدير البيانات
    // Export data
    exportData(data, format = 'json', filename = 'nutrition-data') {
        let content, mimeType;
        
        switch (format) {
            case 'json':
                content = JSON.stringify(data, null, 2);
                mimeType = 'application/json';
                filename += '.json';
                break;
                
            case 'csv':
                if (Array.isArray(data) && data.length > 0) {
                    const headers = Object.keys(data[0]);
                    const csvContent = [
                        headers.join(','),
                        ...data.map(row => headers.map(header => 
                            JSON.stringify(row[header] || '')
                        ).join(','))
                    ].join('\n');
                    content = csvContent;
                    mimeType = 'text/csv';
                    filename += '.csv';
                } else {
                    throw new Error('CSV export requires array data');
                }
                break;
                
            default:
                throw new Error('Unsupported export format');
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // وظائف مساعدة للحصول على الأسماء والألوان
    // Helper functions for names and colors
    getCategoryName(category, language = 'ar') {
        const categories = {
            'grains': { ar: 'الحبوب والنشويات', en: 'Grains & Starches' },
            'proteins': { ar: 'البروتينات', en: 'Proteins' },
            'vegetables': { ar: 'الخضروات', en: 'Vegetables' },
            'fruits': { ar: 'الفواكه', en: 'Fruits' },
            'dairy': { ar: 'منتجات الألبان', en: 'Dairy Products' },
            'fish': { ar: 'الأسماك والمأكولات البحرية', en: 'Fish & Seafood' },
            'nuts': { ar: 'المكسرات والبذور', en: 'Nuts & Seeds' },
            'oils': { ar: 'الزيوت والدهون', en: 'Oils & Fats' }
        };
        return categories[category] ? categories[category][language] : category;
    }

    getCategoryColor(category) {
        const colors = {
            'grains': '#8bc34a',
            'proteins': '#f44336',
            'vegetables': '#4caf50',
            'fruits': '#ff9800',
            'dairy': '#2196f3',
            'fish': '#00bcd4',
            'nuts': '#795548',
            'oils': '#ffc107'
        };
        return colors[category] || '#9e9e9e';
    }

    getCategoryIcon(category) {
        const icons = {
            'grains': 'fas fa-seedling',
            'proteins': 'fas fa-drumstick-bite',
            'vegetables': 'fas fa-carrot',
            'fruits': 'fas fa-apple-alt',
            'dairy': 'fas fa-cheese',
            'fish': 'fas fa-fish',
            'nuts': 'fas fa-acorn',
            'oils': 'fas fa-tint'
        };
        return icons[category] || 'fas fa-utensils';
    }

    getGICategory(gi) {
        if (gi < 55) return 'low';
        if (gi < 70) return 'medium';
        return 'high';
    }

    getDifficultyName(difficulty, language = 'ar') {
        const difficulties = {
            'easy': { ar: 'سهل', en: 'Easy' },
            'medium': { ar: 'متوسط', en: 'Medium' },
            'hard': { ar: 'صعب', en: 'Hard' }
        };
        return difficulties[difficulty] ? difficulties[difficulty][language] : difficulty;
    }

    getCuisineName(cuisine, language = 'ar') {
        const cuisines = {
            'mediterranean': { ar: 'متوسطي', en: 'Mediterranean' },
            'asian': { ar: 'آسيوي', en: 'Asian' },
            'middle-eastern': { ar: 'شرق أوسطي', en: 'Middle Eastern' },
            'international': { ar: 'عالمي', en: 'International' }
        };
        return cuisines[cuisine] ? cuisines[cuisine][language] : cuisine;
    }

    getAllergenName(allergen, language = 'ar') {
        const allergens = {
            'milk': { ar: 'الحليب', en: 'Milk' },
            'eggs': { ar: 'البيض', en: 'Eggs' },
            'fish': { ar: 'السمك', en: 'Fish' },
            'shellfish': { ar: 'المحار', en: 'Shellfish' },
            'nuts': { ar: 'المكسرات', en: 'Tree Nuts' },
            'peanuts': { ar: 'الفول السوداني', en: 'Peanuts' },
            'wheat': { ar: 'القمح', en: 'Wheat' },
            'soy': { ar: 'الصويا', en: 'Soy' }
        };
        return allergens[allergen] ? allergens[allergen][language] : allergen;
    }

    getDietName(diet, language = 'ar') {
        const diets = {
            'vegetarian': { ar: 'نباتي', en: 'Vegetarian' },
            'vegan': { ar: 'نباتي صرف', en: 'Vegan' },
            'gluten-free': { ar: 'خالي من الجلوتين', en: 'Gluten-Free' },
            'keto': { ar: 'كيتو', en: 'Keto' },
            'paleo': { ar: 'باليو', en: 'Paleo' },
            'low-carb': { ar: 'قليل الكربوهيدرات', en: 'Low-Carb' },
            'high-protein': { ar: 'عالي البروتين', en: 'High-Protein' }
        };
        return diets[diet] ? diets[diet][language] : diet;
    }

    getTagName(tag, language = 'ar') {
        const tags = {
            'healthy': { ar: 'صحي', en: 'Healthy' },
            'quick': { ar: 'سريع', en: 'Quick' },
            'easy': { ar: 'سهل', en: 'Easy' },
            'budget': { ar: 'اقتصادي', en: 'Budget-Friendly' },
            'family': { ar: 'عائلي', en: 'Family-Friendly' }
        };
        return tags[tag] ? tags[tag][language] : tag;
    }

    getVitaminUnit(vitamin) {
        const units = {
            'A': 'μg',
            'C': 'mg',
            'D': 'μg',
            'E': 'mg',
            'K': 'μg',
            'B1': 'mg',
            'B2': 'mg',
            'B3': 'mg',
            'B6': 'mg',
            'B12': 'μg',
            'folate': 'μg'
        };
        return units[vitamin] || 'mg';
    }

    getMineralName(mineral, language = 'ar') {
        const minerals = {
            'iron': { ar: 'الحديد', en: 'Iron' },
            'calcium': { ar: 'الكالسيوم', en: 'Calcium' },
            'magnesium': { ar: 'المغنيسيوم', en: 'Magnesium' },
            'phosphorus': { ar: 'الفوسفور', en: 'Phosphorus' },
            'potassium': { ar: 'البوتاسيوم', en: 'Potassium' },
            'sodium': { ar: 'الصوديوم', en: 'Sodium' },
            'zinc': { ar: 'الزنك', en: 'Zinc' },
            'selenium': { ar: 'السيلينيوم', en: 'Selenium' }
        };
        return minerals[mineral] ? minerals[mineral][language] : mineral;
    }

    getMineralUnit(mineral) {
        const units = {
            'iron': 'mg',
            'calcium': 'mg',
            'magnesium': 'mg',
            'phosphorus': 'mg',
            'potassium': 'mg',
            'sodium': 'mg',
            'zinc': 'mg',
            'selenium': 'μg'
        };
        return units[mineral] || 'mg';
    }

    // التكامل مع النظام الموحد
    // Integration with unified system
    integrateWithUnifiedSystem() {
        // تسجيل الأحداث
        if (window.unifiedSystem && window.unifiedSystem.eventBus) {
            window.unifiedSystem.eventBus.on('languageChanged', (language) => {
                this.updateLanguage(language);
            });
        }
        
        // تسجيل الخدمات
        if (window.unifiedSystem && window.unifiedSystem.services) {
            window.unifiedSystem.services.nutrition = this;
        }
    }
}

// تصدير الفئة
// Export class
export { NutritionUtils };

// دعم Node.js
// Node.js support
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NutritionUtils };
}