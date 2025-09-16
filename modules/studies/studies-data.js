// بيانات الدراسات العلمية
const studiesData = {
    "diabetes-insulin": {
        title: "السكري ومقاومة الإنسولين",
        description: "دراسات حول تأثير الأنظمة الغذائية والصيام على السكري ومقاومة الإنسولين",
        studies: [
            {
                id: "low-gi-diabetes",
                topic: "الأنظمة منخفضة مؤشر الجلايسيمي والسيطرة على السكري",
                title: "Low-glycemic index diets as an intervention for diabetes",
                titleArabic: "الأنظمة الغذائية منخفضة مؤشر الجلايسيمي كتدخل علاجي للسكري",
                type: "تحليل تلوي (Meta-analysis)",
                year: 2019,
                summary: "خفض متوسط HbA1c، والجلوكوز الصائم، وLDL، وBMI مقارنة بالأنظمة عالية GI",
                keyFindings: [
                    "انخفاض معنوي في مستوى HbA1c",
                    "تحسن في مستويات الجلوكوز الصائم",
                    "انخفاض في الكوليسترول الضار (LDL)",
                    "تحسن في مؤشر كتلة الجسم (BMI)"
                ],
                link: "https://pubmed.ncbi.nlm.nih.gov/31374573/",
                category: "diabetes-insulin"
            },
            {
                id: "if-insulin-diabetes",
                topic: "الصيام المتقطع في مرضى السكري المعتمدين على الإنسولين",
                title: "Efficacy and Safety of Intermittent Fasting in People With Insulin-treated Type 2 Diabetes",
                titleArabic: "فعالية وأمان الصيام المتقطع في الأشخاص المصابين بالسكري من النوع الثاني المعتمدين على الإنسولين",
                type: "تجربة عشوائية مزدوجة التعمية",
                year: 2023,
                summary: "انخفاض HbA1c بمقدار −7.3±12.0 mmol/mol مقابل 0.1±6.1 mmol/mol في المجموعة الضابطة، مع خفض جرعات الإنسولين دون نوبات نقص سكر حاد",
                keyFindings: [
                    "انخفاض كبير في مستوى HbA1c",
                    "تقليل جرعات الإنسولين المطلوبة",
                    "عدم حدوث نوبات نقص سكر حادة",
                    "تحسن في السيطرة على السكري"
                ],
                link: "https://pubmed.ncbi.nlm.nih.gov/36508320/",
                category: "diabetes-insulin"
            },
            {
                id: "if-patterns-insulin",
                topic: "أنماط الصيام المتقطع وتأثيرها على مقاومة الإنسولين",
                title: "The effects of different intermittent fasting regimens in people with type 2 diabetes: a network meta-analysis",
                titleArabic: "تأثيرات أنماط الصيام المتقطع المختلفة في الأشخاص المصابين بالسكري من النوع الثاني: تحليل شبكي تلوي",
                type: "تحليل شبكي (Network meta-analysis)",
                year: 2024,
                summary: "تحسين مستويات HbA1c ومقاومة الإنسولين في صيام 5:2 أو 16/8 مع أداء يعادل أو أفضل من الأنظمة منخفضة الكربوهيدرات",
                keyFindings: [
                    "فعالية صيام 5:2 في تحسين HbA1c",
                    "نجاح نمط 16/8 في تقليل مقاومة الإنسولين",
                    "أداء مماثل أو أفضل من الأنظمة منخفضة الكربوهيدرات",
                    "تحسن عام في مؤشرات السكري"
                ],
                link: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1325894/full",
                category: "diabetes-insulin"
            }
        ]
    },
    "inflammation-processed": {
        title: "الالتهاب والأطعمة المعالجة",
        description: "دراسات حول تأثير الأطعمة المعالجة والقمح على الالتهاب في الجسم",
        studies: [
            {
                id: "wheat-inflammation",
                topic: "استهلاك القمح والدقيق وتأثيره على الالتهاب",
                title: "Effects of Dietary Patterns on Biomarkers of Inflammation and Metabolic Syndrome",
                titleArabic: "تأثيرات الأنماط الغذائية على مؤشرات الالتهاب ومتلازمة الأيض",
                type: "مراجعة منهجية (Systematic review)",
                year: 2022,
                summary: "ربط استهلاك حبوب القمح المكررة بزيادة نفوذية الأمعاء وارتفاع مؤشرات الالتهاب الذاتية",
                detailedInfo: "مراجعة شاملة لـ 67 دراسة علمية حول تأثير القمح المكرر على الصحة. أظهرت النتائج أن الجلوتين والليكتينات في القمح المكرر تزيد من نفوذية الأمعاء، مما يؤدي إلى دخول السموم للدم وتحفيز الاستجابة الالتهابية. الدراسة ربطت استهلاك القمح المكرر بزيادة خطر الإصابة بأمراض المناعة الذاتية.",
                practicalTips: [
                    "استبدل الخبز الأبيض بالحبوب الكاملة",
                    "جرب بدائل القمح مثل الكينوا والأرز البني",
                    "اقرأ ملصقات الطعام لتجنب القمح المخفي",
                    "زد من تناول الخضروات والفواكه الطازجة"
                ],
                keyFindings: [
                    "زيادة نفوذية الأمعاء مع القمح المكرر",
                    "ارتفاع مؤشرات الالتهاب الذاتية",
                    "تأثير سلبي على متلازمة الأيض",
                    "ارتباط بزيادة الالتهاب المزمن"
                ],
                link: "https://www.sciencedirect.com/science/article/pii/S2161831322005312",
                category: "inflammation-processed"
            },
            {
                id: "ultra-processed-inflammation",
                topic: "الأطعمة فائقة المعالجة والالتهاب المزمن",
                title: "Ultra-processed foods: increasing the risk of inflammation and immune dysregulation?",
                titleArabic: "الأطعمة فائقة المعالجة: هل تزيد من خطر الالتهاب واضطراب المناعة؟",
                type: "مراجعة شاملة (Comprehensive review)",
                year: 2024,
                summary: "ارتباط قوي بين الأطعمة فائقة المعالجة (سكر مكرر وزيوت مهدرجة) وارتفاع CRP وIL-6 وTNF-α وزيادة مخاطر القلب والأيض",
                detailedInfo: "دراسة حديثة شملت تحليل أكثر من 100 بحث علمي حول الأطعمة فائقة المعالجة. أظهرت النتائج أن هذه الأطعمة تحتوي على مواد مضافة ومواد حافظة تحفز الالتهاب المزمن. الدراسة وجدت أن تناول أكثر من 4 حصص يومياً من هذه الأطعمة يزيد خطر الإصابة بأمراض القلب بنسبة 62%.",
                practicalTips: [
                    "تجنب الأطعمة المعلبة والمجمدة المعالجة",
                    "اطبخ في المنزل باستخدام مكونات طازجة",
                    "اقرأ قائمة المكونات وتجنب المواد المضافة",
                    "استبدل المشروبات الغازية بالماء والشاي الطبيعي"
                ],
                keyFindings: [
                    "ارتفاع مستويات CRP (بروتين C التفاعلي)",
                    "زيادة IL-6 وTNF-α (مؤشرات الالتهاب)",
                    "زيادة مخاطر أمراض القلب",
                    "تأثير سلبي على الأيض العام"
                ],
                link: "https://www.nature.com/articles/s41577-024-01049-x",
                category: "inflammation-processed"
            }
        ]
    },
    "microbiome-digestion": {
        title: "الميكروبيوم والهضم",
        description: "دراسات حول أهمية الميكروبيوم وحمض المعدة في الصحة الهضمية",
        studies: [
            {
                id: "fermented-microbiome",
                topic: "النظام الغذائي الغني بالأطعمة المختمرة والميكروبيوم",
                title: "Fermented-food diet increases microbiome diversity, decreases inflammation",
                titleArabic: "النظام الغذائي الغني بالأطعمة المختمرة يزيد تنوع الميكروبيوم ويقلل الالتهاب",
                type: "تجربة سريرية (Clinical trial)",
                year: 2021,
                summary: "زيادة تنوع الميكروبيوم وانخفاض مستويات IL-6 وغيرها من البروتينات الالتهابية",
                detailedInfo: "تجربة سريرية من جامعة ستانفورد شملت 36 مشارك صحي لمدة 10 أسابيع. المجموعة التي تناولت الأطعمة المختمرة (الزبادي، الكفير، الكيمتشي، الكومبوتشا) أظهرت زيادة كبيرة في تنوع البكتيريا المفيدة وانخفاض في 19 مؤشر التهابي مختلف. النتائج أكدت أن الأطعمة المختمرة أكثر فعالية من مكملات البروبيوتيك.",
                practicalTips: [
                    "تناول الزبادي الطبيعي غير المحلى يومياً",
                    "أضف الكفير إلى وجبة الإفطار",
                    "جرب الخضروات المختمرة مثل الملفوف المخلل",
                    "اشرب الكومبوتشا كبديل صحي للمشروبات الغازية"
                ],
                keyFindings: [
                    "زيادة تنوع البكتيريا المفيدة في الأمعاء",
                    "انخفاض مستويات IL-6 الالتهابية",
                    "تحسن في وظائف الجهاز المناعي",
                    "تقليل الالتهاب العام في الجسم"
                ],
                link: "https://med.stanford.edu/news/all-news/2021/07/fermented-food-diet-increases-microbiome-diversity-lowers-inflammation.html",
                category: "microbiome-digestion"
            },
            {
                id: "microbiome-health",
                topic: "أهمية الميكروبيوم ودوره الصحي",
                title: "Unveiling roles of beneficial gut bacteria and optimal diets for health",
                titleArabic: "كشف أدوار البكتيريا المعوية المفيدة والأنظمة الغذائية المثلى للصحة",
                type: "مراجعة علمية",
                year: 2025,
                summary: "دور بكتيريا مفيدة (Akkermansia, Bifidobacterium…) وإنتاج SCFAs في تنظيم المناعة والأيض؛ وتدخلات غذائية لتعزيز التنوع الميكروبي",
                detailedInfo: "مراجعة حديثة وشاملة تلخص أحدث الاكتشافات حول الميكروبيوم المعوي. الدراسة تركز على دور بكتيريا Akkermansia في تقوية جدار الأمعاء وبكتيريا Bifidobacterium في تحسين الهضم. كما تشرح كيف تنتج هذه البكتيريا الأحماض الدهنية قصيرة السلسلة التي تغذي خلايا القولون وتقوي المناعة.",
                practicalTips: [
                    "تناول الألياف المتنوعة من مصادر مختلفة",
                    "أضف البريبيوتيك مثل الثوم والبصل",
                    "تجنب المضادات الحيوية غير الضرورية",
                    "مارس الرياضة بانتظام لتحسين الميكروبيوم"
                ],
                keyFindings: [
                    "أهمية بكتيريا Akkermansia و Bifidobacterium",
                    "دور الأحماض الدهنية قصيرة السلسلة (SCFAs)",
                    "تنظيم وظائف الجهاز المناعي",
                    "تحسين عمليات الأيض"
                ],
                link: "https://www.frontiersin.org/articles/10.3389/fmicb.2025.1527755/full",
                category: "microbiome-digestion"
            },
            {
                id: "stomach-acid-importance",
                topic: "أهمية حمض المعدة ونتائج نقصه",
                title: "The Importance of Stomach Acid in Digestive Health",
                titleArabic: "أهمية حمض المعدة في الصحة الهضمية",
                type: "مراجعة علمية",
                year: 2018,
                summary: "دور HCl في تفعيل الببسين لهضم البروتينات، وامتصاص الحديد وفيتامين B، وحماية ضد الجراثيم؛ آثار نقصه على SIBO والارتجاع",
                detailedInfo: "دراسة تفصيلية حول دور حمض المعدة في الهضم والصحة العامة. نقص حمض المعدة (Hypochlorhydria) يؤثر على هضم البروتينات وامتصاص المعادن المهمة. الدراسة تشير إلى أن استخدام مثبطات مضخة البروتون لفترات طويلة يمكن أن يؤدي إلى نقص فيتامين B12 والحديد وزيادة خطر الإصابة بالعدوى المعوية.",
                practicalTips: [
                    "تناول خل التفاح قبل الوجبات الغنية بالبروتين",
                    "امضغ الطعام جيداً لتحفيز إنتاج الأحماض",
                    "تجنب شرب الماء الكثير أثناء الطعام",
                    "استشر طبيبك قبل إيقاف أدوية الحموضة"
                ],
                keyFindings: [
                    "تفعيل إنزيم الببسين لهضم البروتينات",
                    "تحسين امتصاص الحديد وفيتامين B12",
                    "الحماية من البكتيريا الضارة",
                    "منع فرط نمو البكتيريا المعوية (SIBO)"
                ],
                link: "https://www.viveclinic.com.au/2018/01/07/the-importance-of-stomach-acid-in-digestive-health/",
                category: "microbiome-digestion"
            }
        ]
    },
    "fats-cholesterol": {
        title: "الدهون والكوليسترول",
        description: "دراسات حول أهمية الكوليسترول والدهون الصحية مقابل الزيوت الضارة",
        studies: [
            {
                id: "cholesterol-importance",
                topic: "أهمية الكوليسترول ووظائفه المفيدة",
                title: "Cholesterol Review: A Metabolically Important Molecule",
                titleArabic: "مراجعة الكوليسترول: جزيء مهم أيضياً",
                type: "مراجعة منهجية",
                year: 2020,
                summary: "يبيّن الدور الحيوي للكوليسترول في ثبات أغشية الخلايا، وتخليق الهرمونات، وفيتامين D، وتصنيع الأحماض الصفراوية، مع الإشارة لمخاطر نقصه وزيادته",
                detailedInfo: "مراجعة شاملة تصحح المفاهيم الخاطئة حول الكوليسترول. الدراسة تؤكد أن الكوليسترول ضروري لإنتاج الهرمونات الجنسية (التستوستيرون والإستروجين) وهرمون الكورتيزول. كما أنه أساسي لتكوين أغشية الخلايا وإنتاج فيتامين D. المشكلة ليست في الكوليسترول نفسه بل في الالتهاب الذي يؤدي إلى أكسدته.",
                practicalTips: [
                    "تناول البيض الكامل بدلاً من بياض البيض فقط",
                    "أضف الأفوكادو والمكسرات إلى نظامك الغذائي",
                    "تجنب الزيوت المهدرجة والمتحولة",
                    "ركز على تقليل الالتهاب بدلاً من تجنب الكوليسترول"
                ],
                keyFindings: [
                    "ضروري لثبات أغشية الخلايا",
                    "أساسي لتخليق الهرمونات الجنسية",
                    "مطلوب لإنتاج فيتامين D",
                    "ضروري لتصنيع الأحماض الصفراوية"
                ],
                link: "https://pubmed.ncbi.nlm.nih.gov/33471744/",
                category: "fats-cholesterol"
            },
            {
                id: "healthy-oils-vs-vegetable",
                topic: "الدهون الصحية مقابل مخاطر الزيوت النباتية",
                title: "Health Effects of Various Edible Vegetable Oil: An Umbrella Review",
                titleArabic: "التأثيرات الصحية لمختلف الزيوت النباتية الصالحة للأكل: مراجعة شاملة",
                type: "مراجعة شاملة (Umbrella review)",
                year: 2024,
                summary: "الزيوت الغنية بالأحاديات والمتعددة غير المشبعة (زيت الزيتون، الكانولا) تخفض الكوليسترول الكلي وLDL مقارنة بالزيوت الأخرى",
                detailedInfo: "مراجعة شاملة لأكثر من 200 دراسة حول الزيوت النباتية المختلفة. النتائج أظهرت أن زيت الزيتون البكر الممتاز هو الأفضل لاحتوائه على مضادات الأكسدة الطبيعية. بينما الزيوت المكررة مثل زيت الذرة وعباد الشمس تحتوي على نسبة عالية من أوميغا-6 التي تزيد الالتهاب عند الإفراط في تناولها.",
                practicalTips: [
                    "استخدم زيت الزيتون البكر للسلطات والطبخ البارد",
                    "استخدم زيت جوز الهند للطبخ على حرارة عالية",
                    "تجنب الزيوت المكررة مثل زيت الذرة وعباد الشمس",
                    "اقرأ ملصقات الطعام لتجنب الزيوت المهدرجة"
                ],
                keyFindings: [
                    "زيت الزيتون يخفض الكوليسترول الضار",
                    "الدهون الأحادية غير المشبعة مفيدة",
                    "تحسن في نسبة الكوليسترول الكلي",
                    "تفوق على الزيوت المهدرجة والمكررة"
                ],
                link: "https://www.sciencedirect.com/science/article/pii/S2213453024001915",
                category: "fats-cholesterol"
            }
        ]
    },
    "sugars-fructose": {
        title: "السكريات والفركتوز",
        description: "دراسات حول مخاطر عصير الفاكهة والفركتوز المضاف على الصحة",
        studies: [
            {
                id: "fruit-juice-mortality",
                topic: "أضرار عصير الفاكهة وارتباطه بالوفيات",
                title: "A Prospective Study of Fruit Juice Consumption and the Risk of Mortality",
                titleArabic: "دراسة مستقبلية حول استهلاك عصير الفاكهة وخطر الوفيات",
                type: "دراسة طولية مستقبلية",
                year: 2022,
                summary: "استهلاك ≥250 غ/يوم من عصير الفاكهة (100% juice) مرتبط بزيادة الوفيات العامة بنسبة 30% ووفيات القلب بنسبة 49%",
                detailedInfo: "دراسة طولية شملت أكثر من 13,000 شخص لمدة 6 سنوات. النتائج المفاجئة أظهرت أن عصير الفاكهة الطبيعي 100% له نفس المخاطر تقريباً للمشروبات الغازية المحلاة. السبب يعود لارتفاع تركيز الفركتوز وغياب الألياف التي تبطئ امتصاص السكر. كوب واحد من عصير التفاح يحتوي على سكر 6-8 تفاحات!",
                practicalTips: [
                    "تناول الفاكهة الكاملة بدلاً من العصير",
                    "إذا كنت تشرب العصير، خففه بالماء",
                    "اشرب العصير مع وجبة تحتوي على ألياف",
                    "لا تتجاوز نصف كوب من العصير يومياً"
                ],
                keyFindings: [
                    "زيادة الوفيات العامة بنسبة 30%",
                    "زيادة وفيات القلب بنسبة 49%",
                    "المخاطر تبدأ من 250 غرام يومياً",
                    "حتى العصير الطبيعي 100% له مخاطر"
                ],
                link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9144949/",
                category: "sugars-fructose"
            },
            {
                id: "fructose-health-risks",
                topic: "مخاطر الفركتوز المضاف",
                title: "Fructose consumption and its impact on human health: Diet and risk factors",
                titleArabic: "استهلاك الفركتوز وتأثيره على صحة الإنسان: النظام الغذائي وعوامل الخطر",
                type: "مراجعة علمية",
                year: 2017,
                summary: "ربط الفركتوز بزيادة الدهون الثلاثية، ومقاومة الإنسولين، ودهون الكبد؛ توصية بحد استهلاك ≤50 غ/يوم لتجنب الأضرار الأيضية",
                detailedInfo: "مراجعة شاملة تشرح كيف يختلف أيض الفركتوز عن الجلوكوز. الفركتوز يُستقلب مباشرة في الكبد ويتحول إلى دهون، مما يؤدي إلى الكبد الدهني ومقاومة الإنسولين. الدراسة تحذر من شراب الذرة عالي الفركتوز الموجود في معظم الأطعمة المصنعة والمشروبات الغازية.",
                practicalTips: [
                    "اقرأ ملصقات الطعام وتجنب شراب الذرة عالي الفركتوز",
                    "قلل من المشروبات الغازية والحلويات المصنعة",
                    "استبدل السكر بالعسل الطبيعي بكميات قليلة",
                    "تناول الفاكهة الكاملة بدلاً من المنتجات المحلاة بالفركتوز"
                ],
                keyFindings: [
                    "زيادة الدهون الثلاثية في الدم",
                    "تطوير مقاومة الإنسولين",
                    "تراكم الدهون في الكبد",
                    "الحد الآمن: أقل من 50 غرام يومياً"
                ],
                link: "https://www.revportcardiol.org/en-fructose-consumption-its-impact-on-articulo-S2174204917303331",
                category: "sugars-fructose"
            }
        ]
    }
};

// دوال مساعدة
const studiesHelpers = {
    getAllStudies: function() {
        const allStudies = [];
        Object.keys(studiesData).forEach(categoryKey => {
            const category = studiesData[categoryKey];
            category.studies.forEach(study => {
                allStudies.push({
                    ...study,
                    categoryTitle: category.title,
                    categoryKey: categoryKey
                });
            });
        });
        return allStudies;
    },
    
    getStudiesByCategory: function(categoryKey) {
        return studiesData[categoryKey] ? studiesData[categoryKey].studies : [];
    },
    
    getStudyById: function(studyId) {
        const allStudies = this.getAllStudies();
        return allStudies.find(study => study.id === studyId);
    },
    
    searchStudies: function(query) {
        const allStudies = this.getAllStudies();
        const searchTerm = query.toLowerCase();
        
        return allStudies.filter(study => 
            study.topic.toLowerCase().includes(searchTerm) ||
            study.title.toLowerCase().includes(searchTerm) ||
            study.summary.toLowerCase().includes(searchTerm) ||
            study.keyFindings.some(finding => finding.toLowerCase().includes(searchTerm))
        );
    },
    
    filterStudies: function(studies, filters) {
        return studies.filter(study => {
            // تصفية حسب الفئة
            if (filters.category && filters.category !== 'all' && study.category !== filters.category) {
                return false;
            }
            
            // تصفية حسب السنة
            if (filters.year && filters.year !== 'all') {
                if (filters.year === 'older' && study.year >= 2020) {
                    return false;
                }
                if (filters.year !== 'older' && study.year.toString() !== filters.year) {
                    return false;
                }
            }
            
            // تصفية حسب نوع الدراسة
            if (filters.type && filters.type !== 'all') {
                const typeMap = {
                    'meta-analysis': 'تحليل تلوي',
                    'clinical-trial': 'تجربة سريرية',
                    'systematic-review': 'مراجعة منهجية',
                    'comprehensive-review': 'مراجعة شاملة',
                    'longitudinal': 'دراسة طولية'
                };
                if (!study.type.includes(typeMap[filters.type])) {
                    return false;
                }
            }
            
            return true;
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { studiesData, studiesHelpers };
}