// منطق التطبيق لصفحة الأدلة العلمية والدراسات - محدث
class StudiesApp {
    constructor() {
        this.currentLanguage = 'ar';
        this.currentStudies = [];
        this.allStudies = studiesHelpers.getAllStudies();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTopicCards();
        this.displayStudies(this.allStudies);
        this.updateStats();
    }

    setupEventListeners() {
        // تبديل اللغة
        const langAr = document.getElementById('lang-ar');
        const langEn = document.getElementById('lang-en');

        if (langAr) {
            langAr.addEventListener('click', () => this.switchLanguage('ar'));
        }
        if (langEn) {
            langEn.addEventListener('click', () => this.switchLanguage('en'));
        }

        // البحث
        const searchInput = document.getElementById('study-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // التصفية
        const categoryFilter = document.getElementById('category-filter');
        const yearFilter = document.getElementById('year-filter');
        const typeFilter = document.getElementById('type-filter');

        [categoryFilter, yearFilter, typeFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => {
                    this.handleFilters();
                });
            }
        });

        // إعداد أزرار عرض المزيد
        this.setupViewMoreButtons();
        
        // إعداد البحث الخارجي
        this.setupExternalSearch();

        // إغلاق النافذة المنبثقة
        const modal = document.getElementById('study-modal');
        const closeBtn = document.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    setupViewMoreButtons() {
        const viewMoreBtns = document.querySelectorAll('.view-more-btn');
        viewMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const topicCard = e.target.closest('.topic-card');
                if (topicCard) {
                    const topic = topicCard.dataset.topic;
                    this.showTopicDetails(topic);
                }
            });
        });
    }

    setupExternalSearch() {
        const externalSearchBtn = document.querySelector('.external-search-btn');
        if (externalSearchBtn) {
            externalSearchBtn.addEventListener('click', () => {
                this.showSearchOptions();
            });
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.displayStudies(this.allStudies);
            return;
        }
        
        const filteredStudies = studiesHelpers.searchStudies(query);
        this.displayStudies(filteredStudies);
    }

    handleFilters() {
        this.applyFiltersAndDisplay();
    }

    applyFiltersAndDisplay() {
        const category = document.getElementById('category-filter')?.value || 'all';
        const year = document.getElementById('year-filter')?.value || 'all';
        const type = document.getElementById('type-filter')?.value || 'all';
        
        let filteredStudies = this.allStudies;
        
        if (category !== 'all') {
            filteredStudies = studiesHelpers.filterByCategory(filteredStudies, category);
        }
        
        if (year !== 'all') {
            filteredStudies = studiesHelpers.filterByYear(filteredStudies, parseInt(year));
        }
        
        if (type !== 'all') {
            filteredStudies = studiesHelpers.filterByType(filteredStudies, type);
        }
        
        this.displayStudies(filteredStudies);
    }

    displayStudies(studies) {
        this.currentStudies = studies;
        const container = document.querySelector('.studies-grid'); // Changed from getElementById('studies-grid') to querySelector('.studies-grid')
        
        if (!container) {
            console.error('Studies grid container not found');
            return;
        }
        
        if (studies.length === 0) {
            container.innerHTML = '<p class="no-results">لم يتم العثور على دراسات تطابق البحث</p>';
            return;
        }
        
        container.innerHTML = studies.map(study => this.createStudyCard(study)).join('');
        this.attachCardEventListeners();
        this.updateStats(studies);
    }

    createStudyCard(study) {
        return `
            <div class="study-card" data-study-id="${study.id}">
                <div class="study-header">
                    <h3 class="study-title">${study.title}</h3>
                    ${study.titleArabic ? `<h4 class="study-title-arabic">${study.titleArabic}</h4>` : ''}
                    <span class="study-type">${study.type}</span>
                </div>
                <div class="study-content">
                    <p class="study-summary">${study.summary}</p>
                    <div class="study-meta">
                        <span class="study-year"><i class="fas fa-calendar"></i> ${study.year}</span>
                        <span class="study-category"><i class="fas fa-tag"></i> ${study.category}</span>
                    </div>
                </div>
                <div class="study-actions">
                    <button class="btn-primary view-study-btn" data-study-id="${study.id}">
                        <i class="fas fa-eye"></i> عرض التفاصيل
                    </button>
                    ${study.link ? `<a href="${study.link}" target="_blank" class="btn-secondary">
                        <i class="fas fa-external-link-alt"></i> المصدر
                    </a>` : ''}
                </div>
            </div>
        `;
    }

    attachCardEventListeners() {
        const viewBtns = document.querySelectorAll('.view-study-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studyId = e.target.dataset.studyId;
                this.showStudyDetails(studyId);
            });
        });
    }

    showStudyDetails(studyId) {
        const study = studiesHelpers.getStudyById(studyId);
        if (!study) {
            console.error('Study not found:', studyId);
            return;
        }
    
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-body');
        
        if (modalTitle) {
            modalTitle.innerHTML = `
                <div class="title-container">
                    <h3>${study.title}</h3>
                    ${study.titleArabic ? `<h3 class="arabic-title">${study.titleArabic}</h3>` : ''}
                </div>
            `;
        }
        
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="study-details">
                    <div class="study-meta-detailed">
                        <div class="meta-row">
                            <span class="meta-label">النوع:</span>
                            <span class="meta-value">${study.type}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">السنة:</span>
                            <span class="meta-value">${study.year}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">الفئة:</span>
                            <span class="meta-value">${study.category}</span>
                        </div>
                    </div>
                    
                    <div class="study-summary-section">
                        <h4><i class="fas fa-clipboard-list"></i> ملخص الدراسة</h4>
                        <p>${study.summary}</p>
                    </div>
                    
                    ${study.detailedInfo ? `
                    <div class="detailed-info-section">
                        <h4><i class="fas fa-info-circle"></i> معلومات تفصيلية</h4>
                        <p>${study.detailedInfo}</p>
                    </div>
                    ` : ''}
                    
                    <div class="key-findings-section">
                        <h4><i class="fas fa-star"></i> النتائج الرئيسية</h4>
                        <ul class="findings-list">
                            ${study.keyFindings.map(finding => `<li><i class="fas fa-check-circle"></i> ${finding}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${study.practicalTips ? `
                    <div class="practical-tips-section">
                        <h4><i class="fas fa-lightbulb"></i> نصائح عملية للتطبيق</h4>
                        <ul class="tips-list">
                            ${study.practicalTips.map(tip => `<li><i class="fas fa-arrow-left"></i> ${tip}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${study.link ? `
                    <div class="source-section">
                        <h4><i class="fas fa-external-link-alt"></i> المصدر العلمي</h4>
                        <a href="${study.link}" target="_blank" class="source-link">
                            <i class="fas fa-link"></i> اقرأ الدراسة الكاملة
                        </a>
                    </div>
                    ` : ''}
                </div>
            `;
        }
        
        if (modal) modal.style.display = 'block';
    }

    showSearchOptions() {
        const modal = document.createElement('div');
        modal.className = 'search-options-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>خيارات البحث العلمي</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-option">
                        <h3>منظمة الصحة العالمية (WHO)</h3>
                        <p>البحث في قاعدة بيانات منظمة الصحة العالمية</p>
                        <button class="search-btn" onclick="studiesHelpers.searchWHO('health research')">
                            <i class="fas fa-globe"></i> البحث في WHO
                        </button>
                        <small>ملاحظة: للحصول على API key مجاني، زر <a href="https://www.who.int/data/gho/info/gho-odata-api" target="_blank">هنا</a></small>
                    </div>
                    <div class="search-option">
                        <h3>PubMed (المكتبة الطبية الأمريكية)</h3>
                        <p>البحث في أكبر قاعدة بيانات للأبحاث الطبية</p>
                        <button class="search-btn" onclick="studiesHelpers.searchPubMed('health research')">
                            <i class="fas fa-book-medical"></i> البحث في PubMed
                        </button>
                        <small>مجاني بالكامل - لا يحتاج API key</small>
                    </div>
                    <div class="search-option">
                        <h3>البحث المحلي</h3>
                        <p>البحث في الدراسات المحفوظة محلياً</p>
                        <input type="text" id="local-search" placeholder="ابحث في الدراسات المحلية...">
                        <button class="search-btn" onclick="app.performLocalSearch()">
                            <i class="fas fa-search"></i> بحث محلي
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.addSearchModalStyles();
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    performLocalSearch() {
        const searchTerm = document.getElementById('local-search').value;
        if (searchTerm.trim()) {
            const results = studiesHelpers.searchLocalStudies(searchTerm);
            this.displaySearchResults(results);
        }
    }

    displaySearchResults(results) {
        console.log('نتائج البحث:', results);
        if (results.length > 0) {
            this.createStudyModal(results[0]);
        } else {
            alert('لم يتم العثور على نتائج');
        }
    }

    setupTopicCards() {
        const topicCards = document.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${lang}`).classList.add('active');

        this.updateLanguageContent(lang);
    }

    updateLanguageContent(lang) {
        const translations = {
            ar: {
                pageTitle: 'الأدلة العلمية والدراسات',
                pageSubtitle: 'أحدث الأبحاث والدراسات الطبية الموثقة',
                searchTitle: 'البحث في قواعد البيانات العالمية',
                searchBtn: 'البحث في قواعد البيانات العلمية',
                backBtn: 'العودة للرئيسية'
            },
            en: {
                pageTitle: 'Scientific Evidence & Studies',
                pageSubtitle: 'Latest documented medical research and studies',
                searchTitle: 'Search Global Databases',
                searchBtn: 'Search Scientific Databases',
                backBtn: 'Back to Home'
            }
        };

        const t = translations[lang];
        
        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        const sectionTitle = document.querySelector('.section-title');
        const searchBtn = document.querySelector('.external-search-btn');
        const backBtn = document.querySelector('.back-btn');

        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;
        if (sectionTitle) sectionTitle.textContent = t.searchTitle;
        if (searchBtn) {
            searchBtn.innerHTML = `<i class="fas fa-globe"></i> ${t.searchBtn}`;
        }
        if (backBtn) {
            backBtn.innerHTML = `<i class="fas fa-arrow-right"></i> ${t.backBtn}`;
        }
    }

    showTopicDetails(topic) {
        const studies = studiesHelpers.getStudiesByTopic(topic);
        
        if (studies && studies.length > 0) {
            this.createStudyModal(studies[0]);
        } else {
            alert('عذراً، لم يتم العثور على دراسات لهذا الموضوع');
        }
    }

    createStudyModal(study) {
        const modal = document.createElement('div');
        modal.className = 'study-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.currentLanguage === 'ar' ? study.titleAr : study.titleEn}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="study-info">
                        <p><strong>الملخص:</strong> ${this.currentLanguage === 'ar' ? study.summaryAr : study.summaryEn}</p>
                        <div class="study-details">
                            <div class="detail-item">
                                <strong>عدد المشاركين:</strong> ${study.participants}
                            </div>
                            <div class="detail-item">
                                <strong>المدة:</strong> ${study.duration}
                            </div>
                            <div class="detail-item">
                                <strong>المجلة:</strong> ${study.journal}
                            </div>
                            <div class="detail-item">
                                <strong>السنة:</strong> ${study.year}
                            </div>
                            <div class="detail-item">
                                <strong>مستوى الأدلة:</strong> ${study.evidenceLevel}
                            </div>
                        </div>
                        <div class="key-findings">
                            <h3>النتائج الرئيسية:</h3>
                            <ul>
                                ${study.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="practical-application">
                            <h3>التطبيق العملي:</h3>
                            <p>${study.practicalApplication}</p>
                        </div>
                        <div class="study-tags">
                            <h3>الكلمات المفتاحية:</h3>
                            <div class="tags">
                                ${study.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.addStudyModalStyles();
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    updateStats(studies = null) {
        const studiesToCount = studies || this.allStudies;
        const totalStudies = studiesToCount.length;
        
        const statsElements = {
            total: document.getElementById('total-studies'),
            categories: document.getElementById('total-categories'),
            recent: document.getElementById('recent-studies')
        };
        
        if (statsElements.total) {
            statsElements.total.textContent = totalStudies;
        }
        
        if (statsElements.categories) {
            const uniqueCategories = [...new Set(studiesToCount.map(s => s.category))];
            statsElements.categories.textContent = uniqueCategories.length;
        }
        
        if (statsElements.recent) {
            const currentYear = new Date().getFullYear();
            const recentStudies = studiesToCount.filter(s => s.year >= currentYear - 2);
            statsElements.recent.textContent = recentStudies.length;
        }
    }

    addStudyModalStyles() {
        if (document.getElementById('study-modal-styles')) return;
        
        const modalStyles = document.createElement('style');
        modalStyles.id = 'study-modal-styles';
        modalStyles.textContent = `
            .study-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                padding: 20px;
            }
            .study-modal .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .study-modal .modal-header {
                background: var(--primary-color, #2c5aa0);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 12px 12px 0 0;
            }
            .study-modal .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            .study-modal .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .study-modal .modal-body {
                padding: 30px;
            }
            .study-modal .study-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            .study-modal .detail-item {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 8px;
            }
            .study-modal .key-findings, .study-modal .practical-application, .study-modal .study-tags {
                margin-top: 25px;
            }
            .study-modal .key-findings h3, .study-modal .practical-application h3, .study-modal .study-tags h3 {
                color: var(--primary-color, #2c5aa0);
                margin-bottom: 15px;
            }
            .study-modal .key-findings ul {
                padding-right: 20px;
            }
            .study-modal .key-findings li {
                margin-bottom: 8px;
                line-height: 1.6;
            }
            .study-modal .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .study-modal .tag {
                background: var(--primary-color, #2c5aa0);
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(modalStyles);
    }

    addSearchModalStyles() {
        if (document.getElementById('search-modal-styles')) return;
        
        const modalStyles = document.createElement('style');
        modalStyles.id = 'search-modal-styles';
        modalStyles.textContent = `
            .search-options-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                padding: 20px;
            }
            .search-options-modal .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .search-options-modal .modal-header {
                background: var(--primary-color, #2c5aa0);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 12px 12px 0 0;
            }
            .search-options-modal .search-option {
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            .search-options-modal .search-option:last-child {
                border-bottom: none;
            }
            .search-options-modal .search-option h3 {
                color: var(--primary-color, #2c5aa0);
                margin-bottom: 10px;
            }
            .search-options-modal .search-btn {
                background: var(--primary-color, #2c5aa0);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 10px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .search-options-modal .search-btn:hover {
                background: var(--primary-dark, #1e3d6f);
            }
            .search-options-modal input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-top: 10px;
            }
            .search-options-modal small {
                display: block;
                margin-top: 5px;
                color: #666;
            }
            .search-options-modal a {
                color: var(--primary-color, #2c5aa0);
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// وظائف عامة
function searchWHO() {
    const query = 'health research studies';
    studiesHelpers.searchWHO(query);
}

// متغير عام للتطبيق
let app;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    app = new StudiesApp();
    
    // إضافة وظيفة البحث الخارجي
    window.searchWHO = searchWHO;
    window.app = app;
});