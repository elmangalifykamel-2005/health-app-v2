// منطق التطبيق لصفحة الأعشاب الطبية
class HerbsApp {
    constructor() {
        this.herbs = herbsData;
        this.filteredHerbs = [...this.herbs];
        this.init();
    }

    init() {
        this.renderHerbs();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('herb-search');
        const categoryFilter = document.getElementById('category-filter');
        const evidenceFilter = document.getElementById('evidence-filter');

        searchInput.addEventListener('input', (e) => {
            this.filterHerbs(e.target.value, categoryFilter.value, evidenceFilter.value);
        });

        categoryFilter.addEventListener('change', (e) => {
            this.filterHerbs(searchInput.value, e.target.value, evidenceFilter.value);
        });

        evidenceFilter.addEventListener('change', (e) => {
            this.filterHerbs(searchInput.value, categoryFilter.value, e.target.value);
        });
    }

    filterHerbs(searchTerm, category, evidenceLevel) {
        this.filteredHerbs = this.herbs.filter(herb => {
            const matchesSearch = searchTerm === '' || 
                herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesCategory = category === 'all' || 
                herb.categories.includes(category);
            
            const matchesEvidence = evidenceLevel === 'all' || herb.evidenceLevel === evidenceLevel;
            
            return matchesSearch && matchesCategory && matchesEvidence;
        });
        
        this.renderHerbs();
    }

    renderHerbs() {
        const container = document.getElementById('herbs-list');
        
        if (this.filteredHerbs.length === 0) {
            container.innerHTML = '<p class="no-results">لم يتم العثور على أعشاب تطابق البحث.</p>';
            return;
        }

        container.innerHTML = this.filteredHerbs.map(herb => this.createHerbCard(herb)).join('');
    }

    createHerbCard(herb) {
        const evidenceLevelText = {
            'high': 'عالي',
            'moderate': 'متوسط',
            'low': 'منخفض'
        };

        const categoryText = {
            'digestive': 'الجهاز الهضمي',
            'cardiovascular': 'القلب والأوعية الدموية',
            'immune': 'تقوية المناعة',
            'cognitive': 'الوظائف المعرفية',
            'anti-inflammatory': 'مضاد للالتهابات',
            'liver': 'صحة الكبد',
            'respiratory': 'الجهاز التنفسي',
            'sleep': 'النوم والاسترخاء',
            'stress': 'إدارة التوتر',
            'hormonal': 'التوازن الهرموني',
            'skin': 'صحة الجلد',
            'prostate': 'صحة البروستاتا',
            'diabetes': 'السكري',
            'weight-loss': 'إنقاص الوزن',
            'energy': 'الطاقة والحيوية',
            'nausea': 'الغثيان',
            'anxiety': 'القلق',
            'mental-health': 'الصحة النفسية',
            'mood': 'تحسين المزاج',
            'antioxidant': 'مضادات الأكسدة',
            'neuroprotective': 'حماية الأعصاب',
            'memory': 'تقوية الذاكرة',
            'relaxation': 'الاسترخاء',
            'lactation': 'الرضاعة الطبيعية',
            'wound-healing': 'التئام الجروح'
        };

        const categoryTags = herb.categories.map(cat => 
            `<span class="category-tag category-${cat}">${categoryText[cat] || cat}</span>`
        ).join('');

        return `
            <div class="herb-card" data-herb-id="${herb.id}">
                <div class="herb-header">
                    <h3 class="herb-name">${herb.name}</h3>
                    <p class="scientific-name">${herb.scientificName}</p>
                    <div class="herb-tags">
                        ${categoryTags}
                        <span class="evidence-level evidence-${herb.evidenceLevel}">
                            مستوى الأدلة: ${evidenceLevelText[herb.evidenceLevel]}
                        </span>
                    </div>
                </div>
                
                <div class="herb-content">
                    <div class="section">
                        <h4>المكونات النشطة:</h4>
                        <p>${herb.activeIngredients}</p>
                    </div>
                    
                    <div class="section">
                        <h4>الفوائد الصحية:</h4>
                        <ul>
                            ${herb.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="section">
                        <h4>طريقة الاستخدام:</h4>
                        <p>${herb.usage}</p>
                    </div>
                    
                    <div class="section warnings">
                        <h4>تحذيرات هامة:</h4>
                        <ul>
                            ${herb.warnings.map(warning => `<li>${warning}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="section interactions">
                        <h4>التفاعلات الدوائية:</h4>
                        <p>${herb.interactions}</p>
                    </div>
                    
                    <div class="section references">
                        <h4>المراجع العلمية:</h4>
                        <a href="${herb.references}" target="_blank" rel="noopener noreferrer">
                            اطلع على الدراسات العلمية
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new HerbsApp();
});