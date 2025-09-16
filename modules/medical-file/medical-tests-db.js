// قاعدة بيانات التحاليل الطبية الإضافية
const testDatabase = {
    hormones: {
        tsh: {
            name: 'هرمون الغدة الدرقية (TSH)',
            ranges: '0.4-4.0 mIU/L',
            category: 'هرمونات'
        },
        t3: {
            name: 'هرمون T3',
            ranges: '80-200 ng/dL',
            category: 'هرمونات'
        },
        t4: {
            name: 'هرمون T4',
            ranges: '5.1-14.1 μg/dL',
            category: 'هرمونات'
        },
        insulin: {
            name: 'الأنسولين',
            ranges: '2.6-24.9 μIU/mL',
            category: 'هرمونات'
        },
        cortisol: {
            name: 'الكورتيزول',
            ranges: '6.2-19.4 μg/dL',
            category: 'هرمونات'
        },
        testosterone: {
            name: 'التستوستيرون',
            ranges: 'رجال: 264-916 ng/dL، نساء: 15-70 ng/dL',
            category: 'هرمونات'
        },
        estrogen: {
            name: 'الإستروجين',
            ranges: 'نساء: 15-350 pg/mL حسب الدورة',
            category: 'هرمونات'
        },
        progesterone: {
            name: 'البروجسترون',
            ranges: 'نساء: 0.2-25 ng/mL حسب الدورة',
            category: 'هرمونات'
        }
    },
    vitamins: {
        vitamin_d: {
            name: 'فيتامين د (25-OH Vitamin D)',
            ranges: '30-100 ng/mL',
            category: 'فيتامينات'
        },
        vitamin_b12: {
            name: 'فيتامين ب12',
            ranges: '200-900 pg/mL',
            category: 'فيتامينات'
        },
        folate: {
            name: 'حمض الفوليك',
            ranges: '2.7-17.0 ng/mL',
            category: 'فيتامينات'
        },
        vitamin_c: {
            name: 'فيتامين ج',
            ranges: '0.4-2.0 mg/dL',
            category: 'فيتامينات'
        },
        vitamin_a: {
            name: 'فيتامين أ',
            ranges: '20-80 μg/dL',
            category: 'فيتامينات'
        },
        vitamin_e: {
            name: 'فيتامين هـ',
            ranges: '5.5-17.0 mg/L',
            category: 'فيتامينات'
        }
    },
    minerals: {
        iron: {
            name: 'الحديد',
            ranges: 'رجال: 65-175 μg/dL، نساء: 50-170 μg/dL',
            category: 'معادن'
        },
        ferritin: {
            name: 'الفيريتين',
            ranges: 'رجال: 12-300 ng/mL، نساء: 12-150 ng/mL',
            category: 'معادن'
        },
        calcium: {
            name: 'الكالسيوم',
            ranges: '8.5-10.5 mg/dL',
            category: 'معادن'
        },
        magnesium: {
            name: 'المغنيسيوم',
            ranges: '1.7-2.2 mg/dL',
            category: 'معادن'
        },
        zinc: {
            name: 'الزنك',
            ranges: '70-120 μg/dL',
            category: 'معادن'
        },
        phosphorus: {
            name: 'الفوسفور',
            ranges: '2.5-4.5 mg/dL',
            category: 'معادن'
        }
    },
    cardiac: {
        troponin: {
            name: 'التروبونين',
            ranges: 'أقل من 0.04 ng/mL',
            category: 'قلبية'
        },
        ck_mb: {
            name: 'CK-MB',
            ranges: '0-6.3 ng/mL',
            category: 'قلبية'
        },
        bnp: {
            name: 'BNP',
            ranges: 'أقل من 100 pg/mL',
            category: 'قلبية'
        },
        ldh: {
            name: 'LDH',
            ranges: '140-280 U/L',
            category: 'قلبية'
        }
    },
    inflammatory: {
        crp: {
            name: 'البروتين التفاعلي C (CRP)',
            ranges: 'أقل من 3.0 mg/L',
            category: 'التهابية'
        },
        esr: {
            name: 'سرعة الترسيب (ESR)',
            ranges: 'رجال: أقل من 15 mm/hr، نساء: أقل من 20 mm/hr',
            category: 'التهابية'
        },
        procalcitonin: {
            name: 'البروكالسيتونين',
            ranges: 'أقل من 0.25 ng/mL',
            category: 'التهابية'
        }
    },
    tumor_markers: {
        psa: {
            name: 'مستضد البروستاتا (PSA)',
            ranges: 'أقل من 4.0 ng/mL',
            category: 'دلالات الأورام'
        },
        cea: {
            name: 'CEA',
            ranges: 'غير مدخنين: أقل من 3.0 ng/mL، مدخنين: أقل من 5.0 ng/mL',
            category: 'دلالات الأورام'
        },
        ca_125: {
            name: 'CA 125',
            ranges: 'أقل من 35 U/mL',
            category: 'دلالات الأورام'
        },
        ca_19_9: {
            name: 'CA 19-9',
            ranges: 'أقل من 37 U/mL',
            category: 'دلالات الأورام'
        },
        afp: {
            name: 'AFP',
            ranges: 'أقل من 10 ng/mL',
            category: 'دلالات الأورام'
        }
    },
    coagulation: {
        pt: {
            name: 'زمن البروثرومبين (PT)',
            ranges: '11-13 ثانية',
            category: 'تخثر'
        },
        ptt: {
            name: 'زمن الثرومبوبلاستين الجزئي (PTT)',
            ranges: '25-35 ثانية',
            category: 'تخثر'
        },
        inr: {
            name: 'INR',
            ranges: '0.8-1.2',
            category: 'تخثر'
        },
        d_dimer: {
            name: 'D-Dimer',
            ranges: 'أقل من 500 ng/mL',
            category: 'تخثر'
        }
    },
    immunology: {
        iga: {
            name: 'الغلوبولين المناعي A (IgA)',
            ranges: '70-400 mg/dL',
            category: 'مناعة'
        },
        igg: {
            name: 'الغلوبولين المناعي G (IgG)',
            ranges: '700-1600 mg/dL',
            category: 'مناعة'
        },
        igm: {
            name: 'الغلوبولين المناعي M (IgM)',
            ranges: '40-230 mg/dL',
            category: 'مناعة'
        },
        ige: {
            name: 'الغلوبولين المناعي E (IgE)',
            ranges: 'أقل من 100 IU/mL',
            category: 'مناعة'
        }
    }
};

