// بيانات النوم والدراسات العلمية
const sleepData = {
    // الدراسات العلمية عن النوم
    studies: [
        {
            id: 'sleep-duration-chronic-diseases',
            factor: 'مدة النوم والأمراض المزمنة',
            title: 'Sleep Duration and Chronic Diseases among US Adults Age 45 Years and Older',
            participants: '54,269 بالغ (45+ سنة)',
            institution: 'Centers for Disease Control and Prevention (CDC) - الولايات المتحدة',
            duration: 'مقطعية (2010)',
            results: 'النوم القصير (≤6 ساعات) والطويل (≥10 ساعات) مرتبط بزيادة خطر أمراض القلب، السكتة الدماغية، السكري بشكل U-shaped. النوم الأمثل: 7-9 ساعات.',
            link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3773191/',
            category: 'chronic-diseases',
            importance: 'high'
        },
        {
            id: 'sleep-loss-diabetes',
            factor: 'قلة النوم ومقاومة الأنسولين',
            title: 'New study helps explain links between sleep loss and diabetes',
            participants: '19 ذكراً صحياً (18-30 سنة)',
            institution: 'University of Chicago - الولايات المتحدة',
            duration: 'تجربة معشاة لـ 4 ليالي',
            results: 'النوم 4 ساعات فقط لـ3 ليالي أدى لزيادة الأحماض الدهنية بنسبة 15-30% وقلل حساسية الأنسولين بـ23%، مما يشبه مقدمات السكري.',
            link: 'https://www.uchicagomedicine.org/forefront/news/2015/february/new-study-helps-explain-links-between-sleep-loss-and-diabetes',
            category: 'diabetes',
            importance: 'high'
        },
        {
            id: 'sleep-regularity-mortality',
            factor: 'انتظام النوم والوفيات',
            title: 'Sleep regularity is a stronger predictor of mortality risk than sleep duration',
            participants: '60,977 مشاركاً من UK Biobank',
            institution: 'Harvard Medical School & UK Biobank',
            duration: '7.8 سنوات',
            results: 'انتظام النوم أقوى مؤشر للوفيات من مدة النوم. النوم المنتظم قلل خطر الوفاة بنسبة 20-48% والوفاة القلبية الوعائية بـ22-57%.',
            link: 'https://academic.oup.com/sleep/article/47/1/zsad253/7280269',
            category: 'mortality',
            importance: 'critical'
        },
        {
            id: 'sleep-fragmentation-alzheimer',
            factor: 'تقطع النوم والزهايمر',
            title: 'Chronic fragmentation of the daily sleep-wake rhythm increases brain amyloid-beta levels',
            participants: 'فئران مختبرية (3xTg-AD model)',
            institution: 'Washington University School of Medicine',
            duration: '4 أسابيع من تقطيع النوم',
            results: 'تقطيع النوم المزمن زاد مستويات الأميلويد بيتا في الدماغ والالتهاب العصبي، مما يسرع تطور الزهايمر.',
            link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8941625/',
            category: 'alzheimer',
            importance: 'high'
        },
        {
            id: 'insomnia-cardiovascular',
            factor: 'الأرق وأمراض القلب',
            title: 'Insomnia and Risk of Cardiovascular Disease',
            participants: 'مراجعة منهجية - مئات الآلاف من المشاركين',
            institution: 'Penn State College of Medicine',
            duration: 'دراسات طولية 3-20 سنة',
            results: 'الأرق مع قصر النوم زاد خطر ارتفاع ضغط الدم، أمراض القلب التاجية، وفشل القلب بنسبة 45%. الأرق وحده زاد خطر القلب بـ33%.',
            link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5577359/',
            category: 'cardiovascular',
            importance: 'high'
        },
        {
            id: 'sleep-duration-mortality-meta',
            factor: 'النوم والوفيات - تحليل شمولي',
            title: 'Sleep Duration and All-Cause Mortality: A Systematic Review and Meta-Analysis',
            participants: '1,382,999 مشاركاً من 74 دراسة',
            institution: 'University of Warwick & University of Naples',
            duration: 'مراجعة منهجية لدراسات طولية',
            results: 'علاقة U-shaped واضحة: النوم القصير (<7 ساعات) والطويل (>8 ساعات) زادا خطر الوفاة. النوم الأمثل: 7 ساعات بالضبط.',
            link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2864873/',
            category: 'mortality',
            importance: 'critical'
        },
        {
            id: 'insomnia-trajectories-cardiovascular',
            factor: 'الأرق ومسارات القلب الوعائي',
            title: 'Insomnia symptom trajectories and incident cardiovascular disease in older adults',
            participants: '12,102 بالغاً (50+ سنة)',
            institution: 'University of Michigan & National Institute on Aging',
            duration: '10.2 سنة متوسط',
            results: 'المسارات المتزايدة والمستمرة للأرق زادت خطر القلب الوعائي بنسبة 28-32%. حتى عرض واحد زاد الخطر بـ16%.',
            link: 'https://pubmed.ncbi.nlm.nih.gov/40425274/',
            category: 'cardiovascular',
            importance: 'high'
        },
        {
            id: 'sleep-cardiovascular-comprehensive',
            factor: 'النوم والأمراض القلبية الوعائية الشاملة',
            title: 'Associations between Sleep Duration and Cardiovascular Diseases: Meta-review',
            participants: 'مراجعة شمولية للأدبيات العلمية',
            institution: 'First Affiliated Hospital of Xinxiang Medical University',
            duration: 'تحليل للدراسات الرصدية ودراسات العشوائية المندلية',
            results: 'النوم القصير عامل خطر سببي لأمراض القلب التاجية وفشل القلب. النوم الطويل مرتبط بالسكتة الدماغية والوفيات دون علاقة سببية واضحة.',
            link: 'https://www.frontiersin.org/journals/cardiovascular-medicine/articles/10.3389/fcvm.2022.930000/full',
            category: 'cardiovascular',
            importance: 'high'
        },
        {
            id: 'insomnia-chinese-cardiovascular',
            factor: 'أعراض الأرق والقلب الوعائي (صيني)',
            title: 'Insomnia symptoms and risk of cardiovascular diseases among 0.5 million Chinese adults',
            participants: '487,200 بالغ صيني (30-79 سنة)',
            institution: 'China Kadoorie Biobank - جامعة أكسفورد',
            duration: '9.6 سنة متوسط',
            results: 'جميع أعراض الأرق الثلاث زادت خطر أمراض القلب الوعائي. وجود الأعراض الثلاث معاً زاد الخطر بـ18% للقلب الوعائي و22% لأمراض القلب الإقفارية.',
            link: 'https://www.neurology.org/doi/10.1212/WNL.0000000000008581',
            category: 'cardiovascular',
            importance: 'high'
        }
    ],

    // النصائح الأساسية
    basicTips: {
        ar: [
            'حافظ على مواعيد نوم ثابتة',
            'تجنب الكافيين قبل النوم بـ 6 ساعات',
            'اجعل غرفة النوم مظلمة وهادئة',
            'تجنب الشاشات قبل النوم بساعة',
            'مارس الرياضة بانتظام (ليس قبل النوم مباشرة)'
        ],
        en: [
            'Maintain consistent sleep schedule',
            'Avoid caffeine 6 hours before bedtime',
            'Keep bedroom dark and quiet',
            'Avoid screens 1 hour before bed',
            'Exercise regularly (not right before bed)'
        ]
    },

    // التوصيات المبنية على الأدلة العلمية
    evidenceBasedRecommendations: {
        ar: [
            'النوم الأمثل: 7-9 ساعات يومياً (حسب دراسة CDC)',
            'انتظام النوم أهم من مدة النوم (دراسة Harvard)',
            'تجنب النوم أقل من 6 ساعات أو أكثر من 10 ساعات',
            'علاج الأرق ضروري لحماية القلب والأوعية الدموية',
            'النوم المتقطع يزيد خطر الزهايمر - حافظ على نوم متواصل'
        ],
        en: [
            'Optimal sleep: 7-9 hours daily (CDC study)',
            'Sleep regularity more important than duration (Harvard study)',
            'Avoid sleeping less than 6 or more than 10 hours',
            'Treating insomnia is crucial for heart health',
            'Fragmented sleep increases Alzheimer risk - maintain continuous sleep'
        ]
    }
};

// تصدير البيانات للاستخدام في صفحات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sleepData;
}