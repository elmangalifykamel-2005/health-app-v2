const herbsData = [
    {
        id: 1,
        name: "الكركم",
        scientificName: "Curcuma longa",
        evidenceLevel: "high",
        categories: ["anti-inflammatory", "digestive"],
        activeIngredients: "الكركمين (Curcumin) - 3-5% من الوزن الجاف",
        benefits: [
            "مضاد قوي للالتهابات (مثبت في 300+ دراسة)",
            "مضاد للأكسدة ومحارب للجذور الحرة",
            "مضاد للبكتيريا (فعال ضد H. pylori)",
            "محتمل الفائدة في السكري والتهاب المفاصل",
            "دعم صحة القلب والأوعية الدموية"
        ],
        usage: "500-1000 ملجم من مستخلص الكركمين يومياً، أو 1-3 جرام من مسحوق الكركم",
        warnings: [
            "صعوبة الامتصاص عند تناوله منفرداً",
            "قد يتفاعل مع أدوية سيولة الدم (الوارفارين)",
            "يُنصح بتناوله مع الفلفل الأسود (البيبرين) لتحسين الامتصاص",
            "تجنب الجرعات العالية أثناء الحمل"
        ],
        interactions: "الوارفارين، أدوية السكري، مضادات الحموضة",
        references: "https://www.ncbi.nlm.nih.gov/books/NBK92752/"
    },
    {
        id: 2,
        name: "الجنكة بيلوبا",
        scientificName: "Ginkgo biloba",
        evidenceLevel: "moderate",
        categories: ["cognitive", "cardiovascular"],
        activeIngredients: "فلافونويدات الجنكة (24%) وتيربين لاكتونات (6%)",
        benefits: [
            "تحسين الدورة الدموية الطرفية",
            "دعم الوظائف المعرفية والذاكرة",
            "مضاد للأكسدة وحماية الخلايا العصبية",
            "تحسين أعراض العرج المتقطع",
            "محتمل الفائدة في طنين الأذن"
        ],
        usage: "120-240 ملجم يومياً من المستخلص المعياري، مقسمة على جرعتين",
        warnings: [
            "قد يزيد خطر النزيف",
            "تجنب قبل العمليات الجراحية بأسبوعين",
            "قد يسبب صداع أو اضطراب معدي",
            "تجنب مع أدوية سيولة الدم"
        ],
        interactions: "الوارفارين، الأسبرين، مضادات الاكتئاب",
        references: "https://www.nccih.nih.gov/health/ginkgo"
    },
    {
        id: 3,
        name: "عشبة سانت جون",
        scientificName: "Hypericum perforatum",
        evidenceLevel: "high",
        categories: ["mental-health", "mood"],
        activeIngredients: "هايبرسين (Hypericin) وهايبرفورين (Hyperforin)",
        benefits: [
            "علاج الاكتئاب الخفيف إلى المتوسط",
            "تحسين المزاج والحالة النفسية",
            "مضاد للفيروسات (خارجياً)",
            "التئام الجروح والحروق الطفيفة",
            "تخفيف أعراض انقطاع الطمث"
        ],
        usage: "300 ملجم، 3 مرات يومياً من المستخلص المعياري (0.3% هايبرسين)",
        warnings: [
            "تفاعلات دوائية خطيرة مع العديد من الأدوية",
            "يقلل فعالية حبوب منع الحمل",
            "قد يسبب حساسية ضوئية",
            "لا يُستخدم مع مضادات الاكتئاب الأخرى"
        ],
        interactions: "مضادات الاكتئاب، حبوب منع الحمل، الديجوكسين، السيكلوسبورين",
        references: "https://www.nccih.nih.gov/health/st-johns-wort"
    },
    {
        id: 4,
        name: "الثوم",
        scientificName: "Allium sativum",
        evidenceLevel: "high",
        categories: ["cardiovascular", "immune", "anti-inflammatory"],
        activeIngredients: "الأليسين (Allicin) والمركبات الكبريتية",
        benefits: [
            "خفض ضغط الدم المرتفع (مثبت سريرياً)",
            "تقليل الكوليسترول الضار (LDL)",
            "تقوية جهاز المناعة",
            "مضاد للبكتيريا والفطريات",
            "خصائص مضادة للسرطان (دراسات أولية)"
        ],
        usage: "600-1200 ملجم من مستخلص الثوم يومياً، أو 2-4 فصوص طازجة",
        warnings: [
            "قد يزيد خطر النزيف",
            "رائحة قوية في النفس والعرق",
            "قد يسبب اضطراب معدي",
            "تجنب قبل العمليات الجراحية"
        ],
        interactions: "الوارفارين، أدوية فيروس نقص المناعة، ساكوينافير",
        references: "https://www.ncbi.nlm.nih.gov/books/NBK92774/"
    },
    {
        id: 5,
        name: "إيكيناسيا (القنفذية)",
        scientificName: "Echinacea purpurea",
        evidenceLevel: "moderate",
        categories: ["immune", "anti-inflammatory"],
        activeIngredients: "إيكيناكوسيدات، بوليفينولات، وألكاميدات",
        benefits: [
            "تقليل مدة وشدة نزلات البرد",
            "تحفيز جهاز المناعة",
            "مضاد للالتهابات والفيروسات",
            "التئام الجروح (استخدام خارجي)",
            "مضاد للأكسدة"
        ],
        usage: "300-500 ملجم، 3 مرات يومياً لمدة لا تزيد عن 10 أيام",
        warnings: [
            "قد تسبب ردود فعل تحسسية",
            "تجنب مع أمراض المناعة الذاتية",
            "لا تستخدم لأكثر من 10 أيام متتالية",
            "قد تتفاعل مع أدوية تثبيط المناعة"
        ],
        interactions: "الكافيين، أدوية تثبيط المناعة، الكورتيكوستيرويدات",
        references: "https://www.nccih.nih.gov/health/echinacea"
    },
    {
        id: 6,
        name: "الزنجبيل",
        scientificName: "Zingiber officinale",
        evidenceLevel: "high",
        categories: ["digestive", "anti-inflammatory", "nausea"],
        activeIngredients: "الجنجيرول ([6]-gingerol) والشوجاول (Shogaols)",
        benefits: [
            "علاج فعال للغثيان والقيء (مثبت سريرياً)",
            "مضاد قوي للالتهابات",
            "تحسين الهضم وتخفيف عسر الهضم",
            "تخفيف آلام الدورة الشهرية",
            "علاج نزلات البرد والصداع النصفي"
        ],
        usage: "250-1000 ملجم من مستخلص الزنجبيل، أو 1-1.5 جرام من المسحوق يومياً",
        warnings: [
            "قد يتفاعل مع أدوية سيولة الدم",
            "تجنب الجرعات العالية أثناء الحمل (>1 جرام)",
            "قد يسبب حرقة المعدة في بعض الحالات",
            "تجنب مع حصوات المرارة"
        ],
        interactions: "الوارفارين، أدوية السكري، أدوية ضغط الدم",
        references: "https://www.ncbi.nlm.nih.gov/books/NBK92775/"
    },
    {
        id: 7,
        name: "الجنسنج الآسيوي",
        scientificName: "Panax ginseng",
        evidenceLevel: "moderate",
        categories: ["cognitive", "immune", "energy"],
        activeIngredients: "الجنسينوسيدات (Ginsenosides) - أكثر من 50 مركب مختلف",
        benefits: [
            "تحسين الوظائف المعرفية والتركيز",
            "زيادة الطاقة وتقليل التعب",
            "تقوية جهاز المناعة",
            "تحسين مستويات السكر في الدم",
            "تحسين الوظيفة الجنسية"
        ],
        usage: "200-600 ملجم يومياً من مستخلص الجنسنج المعياري (4-7% جنسينوسيدات)",
        warnings: [
            "قد يتفاعل مع أدوية السكري ومضادات التخثر",
            "تجنب الاستخدام مع المنشطات والكافيين",
            "قد يسبب الأرق والصداع والعصبية",
            "تجنب الاستخدام أثناء الحمل والرضاعة"
        ],
        interactions: "الوارفارين، أدوية السكري، مثبطات MAO، الكافيين",
        references: "https://www.nccih.nih.gov/health/asian-ginseng"
    },
    {
        id: 8,
        name: "شوك الحليب",
        scientificName: "Silybum marianum",
        evidenceLevel: "moderate",
        categories: ["liver", "antioxidant"],
        activeIngredients: "السيليمارين (Silymarin) - مجموعة فلافونويدات (70-80%)",
        benefits: [
            "حماية الكبد من السموم والأدوية",
            "مضاد قوي للأكسدة",
            "مضاد للالتهابات والفيروسات",
            "تجديد خلايا الكبد",
            "محتمل الفائدة في التهاب الكبد المزمن"
        ],
        usage: "200-400 ملجم من مستخلص السيليمارين، 2-3 مرات يومياً",
        warnings: [
            "الأبحاث حول فعاليته مختلطة ومحدودة",
            "قد يتفاعل مع بعض الأدوية",
            "جودة المكملات الغذائية متغيرة",
            "قد يسبب اضطراب معدي خفيف"
        ],
        interactions: "أدوية السكري، الفينيتوين، الهالوبيريدول",
        references: "https://www.nccih.nih.gov/health/milk-thistle"
    },
    {
        id: 9,
        name: "البالميطو القزم",
        scientificName: "Serenoa repens",
        evidenceLevel: "moderate",
        categories: ["prostate", "hormonal"],
        activeIngredients: "أحماض دهنية وستيرولات نباتية",
        benefits: [
            "تحسين أعراض تضخم البروستاتا الحميد",
            "تقليل التبول الليلي المتكرر",
            "تحسين تدفق البول",
            "مضاد للالتهابات في الجهاز البولي",
            "محتمل الفائدة في تساقط الشعر الأندروجيني"
        ],
        usage: "160 ملجم مرتين يومياً من المستخلص المعياري",
        warnings: [
            "قد يسبب اضطراب معدي خفيف",
            "نتائج الدراسات متضاربة",
            "قد يتفاعل مع الهرمونات",
            "استشر الطبيب قبل الاستخدام لمشاكل البروستاتا"
        ],
        interactions: "أدوية الهرمونات، مضادات التخثر",
        references: "https://www.nccih.nih.gov/health/saw-palmetto"
    },
    {
        id: 10,
        name: "الشاي الأخضر",
        scientificName: "Camellia sinensis",
        evidenceLevel: "high",
        categories: ["antioxidant", "cardiovascular", "weight-loss"],
        activeIngredients: "إيبيجالوكاتيشين جاليت (EGCG) والكاتيشينات",
        benefits: [
            "مضاد قوي للأكسدة (أقوى من فيتامين C و E)",
            "حماية القلب وخفض الكوليسترول",
            "دعم فقدان الوزن وحرق الدهون",
            "تحسين وظائف المخ والتركيز",
            "خصائص مضادة للسرطان (دراسات أولية)"
        ],
        usage: "2-3 أكواب يومياً، أو 300-400 ملجم من مستخلص EGCG",
        warnings: [
            "يحتوي على الكافيين (قد يسبب الأرق)",
            "قد يقلل امتصاص الحديد",
            "تجنب على معدة فارغة",
            "الجرعات العالية قد تضر الكبد"
        ],
        interactions: "أدوية سيولة الدم، الحديد، بعض المضادات الحيوية",
        references: "https://www.ncbi.nlm.nih.gov/books/NBK92768/"
    },
    {
        id: 11,
        name: "الناردين",
        scientificName: "Valeriana officinalis",
        evidenceLevel: "moderate",
        categories: ["sleep", "anxiety", "relaxation"],
        activeIngredients: "أحماض الفاليرينيك وإيسوفاليرينيك",
        benefits: [
            "تحسين جودة النوم وتقليل الأرق",
            "تخفيف القلق والتوتر",
            "استرخاء العضلات",
            "تهدئة الجهاز العصبي",
            "تقليل وقت الدخول في النوم"
        ],
        usage: "300-600 ملجم من المستخلص، قبل النوم بساعة",
        warnings: [
            "قد يسبب النعاس الصباحي",
            "تجنب مع الكحول والمهدئات",
            "قد يسبب صداع أو اضطراب معدي",
            "تجنب القيادة بعد تناوله"
        ],
        interactions: "المهدئات، أدوية النوم، الكحول، مضادات الاكتئاب",
        references: "https://www.nccih.nih.gov/health/valerian"
    },
    {
        id: 12,
        name: "الحبة السوداء",
        scientificName: "Nigella sativa",
        evidenceLevel: "moderate",
        categories: ["immune", "anti-inflammatory", "respiratory"],
        activeIngredients: "الثيموكينون (Thymoquinone) والزيوت الطيارة",
        benefits: [
            "تقوية جهاز المناعة",
            "مضاد للالتهابات والأكسدة",
            "تحسين أعراض الربو والحساسية",
            "خفض مستويات السكر والكوليسترول",
            "مضاد للبكتيريا والفطريات"
        ],
        usage: "1-2 ملعقة صغيرة من الزيت يومياً، أو 500-1000 ملجم من المستخلص",
        warnings: [
            "قد يخفض ضغط الدم والسكر",
            "تجنب الجرعات العالية أثناء الحمل",
            "قد يتفاعل مع أدوية السكري",
            "قد يسبب طفح جلدي في بعض الحالات"
        ],
        interactions: "أدوية السكري، أدوية ضغط الدم، مضادات التخثر",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3642442/"
    },
    {
        id: 13,
        name: "الأشواغاندا",
        scientificName: "Withania somnifera",
        evidenceLevel: "moderate",
        categories: ["stress", "energy", "hormonal"],
        activeIngredients: "الويثانوليدات (Withanolides) - خاصة الويثانوليد D",
        benefits: [
            "تقليل التوتر والقلق (مثبت سريرياً)",
            "تحسين مستويات الطاقة والقدرة على التحمل",
            "دعم وظائف الغدة الكظرية",
            "تحسين جودة النوم",
            "زيادة مستويات التستوستيرون (في الرجال)"
        ],
        usage: "300-600 ملجم من المستخلص المعياري يومياً",
        warnings: [
            "قد يتفاعل مع أدوية الغدة الدرقية",
            "تجنب مع أمراض المناعة الذاتية",
            "قد يخفض ضغط الدم والسكر",
            "تجنب أثناء الحمل والرضاعة"
        ],
        interactions: "أدوية الغدة الدرقية، أدوية السكري، المهدئات",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3252722/"
    },
    {
        id: 14,
        name: "الروديولا الوردية",
        scientificName: "Rhodiola rosea",
        evidenceLevel: "moderate",
        categories: ["stress", "cognitive", "energy"],
        activeIngredients: "الروزافين (Rosavin) والساليدروسيد (Salidroside)",
        benefits: [
            "تحسين القدرة على التعامل مع التوتر",
            "زيادة الطاقة وتقليل التعب",
            "تحسين الوظائف المعرفية والتركيز",
            "تحسين الأداء البدني والذهني",
            "مضاد للاكتئاب الخفيف"
        ],
        usage: "200-400 ملجم من المستخلص المعياري (3% روزافين، 1%ساليدروسيد)",
        warnings: [
            "قد يسبب الأرق إذا تم تناوله مساءً",
            "قد يتفاعل مع مضادات الاكتئاب",
            "تجنب مع اضطراب ثنائي القطب",
            "قد يسبب دوخة أو جفاف الفم"
        ],
        interactions: "مضادات الاكتئاب، أدوية السكري، أدوية ضغط الدم",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6208354/"
    },
    {
        id: 15,
        name: "البراهمي",
        scientificName: "Bacopa monnieri",
        evidenceLevel: "moderate",
        categories: ["cognitive", "memory", "neuroprotective"],
        activeIngredients: "الباكوسيدات (Bacosides) A و B",
        benefits: [
            "تحسين الذاكرة والتعلم",
            "زيادة التركيز والانتباه",
            "حماية الخلايا العصبية من التلف",
            "تقليل القلق والتوتر",
            "مضاد للأكسدة في الدماغ"
        ],
        usage: "300-600 ملجم من المستخلص المعياري (20-50% باكوسيدات) يومياً",
        warnings: [
            "قد يسبب اضطراب معدي في البداية",
            "النتائج تظهر بعد 8-12 أسبوع من الاستخدام",
            "قد يتفاعل مع أدوية الغدة الدرقية",
            "تناوله مع الطعام لتقليل الاضطراب المعدي"
        ],
        interactions: "أدوية الغدة الدرقية، المهدئات، أدوية الصرع",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3746283/"
    },
    {
        id: 16,
        name: "الريحان المقدس",
        scientificName: "Ocimum tenuiflorum",
        evidenceLevel: "moderate",
        categories: ["stress", "immune", "respiratory"],
        activeIngredients: "الأوجينول، الكارفاكرول، والروزمارينيك أسيد",
        benefits: [
            "تقليل التوتر والقلق",
            "تقوية جهاز المناعة",
            "مضاد للالتهابات والأكسدة",
            "تحسين أعراض الجهاز التنفسي",
            "تنظيم مستويات السكر في الدم"
        ],
        usage: "300-600 ملجم من المستخلص يومياً، أو 2-3 أكواب من الشاي",
        warnings: [
            "قد يخفض مستويات السكر في الدم",
            "قد يتفاعل مع أدوية سيولة الدم",
            "تجنب الجرعات العالية أثناء الحمل",
            "قد يؤثر على الخصوبة (دراسات حيوانية)"
        ],
        interactions: "أدوية السكري، مضادات التخثر، أدوية ضغط الدم",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4296439/"
    },
    {
        id: 17,
        name: "الحلبة",
        scientificName: "Trigonella foenum-graecum",
        evidenceLevel: "moderate",
        categories: ["digestive", "diabetes", "lactation"],
        activeIngredients: "الصابونينات، الألياف القابلة للذوبان، والتريجونيلين",
        benefits: [
            "خفض مستويات السكر في الدم",
            "تحسين الهضم وتخفيف الإمساك",
            "زيادة إنتاج حليب الأم",
            "خفض الكوليسترول الضار",
            "مضاد للالتهابات والأكسدة"
        ],
        usage: "500-1000 ملجم من المستخلص، أو 2-5 جرام من البذور المطحونة يومياً",
        warnings: [
            "قد تخفض مستويات السكر بشكل مفرط",
            "قد تسبب رائحة شبيهة بالقيقب في العرق والبول",
            "تجنب أثناء الحمل (قد تحفز الولادة)",
            "قد تتفاعل مع أدوية السكري"
        ],
        interactions: "أدوية السكري، الوارفارين، أدوية الغدة الدرقية",
        references: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5954247/"
    },
    {
        id: 18,
        name: "الصبار",
        scientificName: "Aloe vera",
        evidenceLevel: "moderate",
        categories: ["skin", "digestive", "wound-healing"],
        activeIngredients: "الألوين، الألوإيمودين، والبوليساكاريدات",
        benefits: [
            "التئام الجروح والحروق الطفيفة",
            "ترطيب وتهدئة الجلد الملتهب",
            "علاج الأكزيما والصدفية",
            "مضاد للالتهابات والبكتيريا",
            "تحسين الهضم (الاستخدام الداخلي محدود)"
        ],
        usage: "جل الصبار موضعياً حسب الحاجة، أو 50-200 ملجم من المستخلص داخلياً",
        warnings: [
            "الاستخدام الداخلي قد يسبب إسهال شديد",
            "قد يخفض مستويات السكر في الدم",
            "تجنب الاستخدام الداخلي أثناء الحمل",
            "قد يسبب حساسية جلدية في بعض الأشخاص"
        ],
        interactions: "أدوية السكري، الديجوكسين، مدرات البول",
        references: "https://www.nccih.nih.gov/health/aloe-vera"
    }
];

// تصدير البيانات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = herbsData;
}