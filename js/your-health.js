document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        const userId = user.uid;
        const db = firebase.firestore();
        db.collection('users').doc(userId).get().then(doc => {
            if (!doc.exists) return;
            const data = doc.data();
            // --- جمع البيانات ---
            const basic = data.basicInfo || {};
            const tests = data.medicalTests || [];
            const conditions = data.conditions || [];
            const allergies = data.allergies || [];
            const meds = data.medications || [];
            const family = data.familyHistory || [];
            const lifestyle = data.lifestyle || {};

            // --- إخراج ملخص عام ---
            let summary = `<div class='card p-3 mb-3'><h4>مرحبًا ${basic.fullName || ''}</h4>
                <span>العمر: ${basic.birthDate ? calcAge(basic.birthDate) : '-'} سنة</span> | 
                <span>الجنس: ${basic.gender || '-'} </span> | 
                <span>الطول: ${basic.height || '-'} سم</span> | 
                <span>الوزن: ${basic.weight || '-'} كجم</span> | 
                <span>فصيلة الدم: ${basic.bloodType || '-'}</span>
            </div>`;
            document.getElementById('health-summary').innerHTML = summary;

            // --- الأمراض ---
            let diseases = conditions.map(c => `<li><span class='risk'>${c.name}</span> <small>(${c.diagnosisDate})</small></li>`).join('');
            document.getElementById('diseases-section').innerHTML = `<h5 class='section-title'>الأمراض المصاب بها</h5><ul>${diseases || '<li>لا توجد أمراض مزمنة مسجلة</li>'}</ul>`;

            // --- المخاطر الصحية ---
            let risks = [];
            if (lifestyle.smoking === 'نعم') risks.push('التدخين');
            if (lifestyle.alcohol === 'نعم') risks.push('الكحول');
            if (parseFloat(basic.weight) / Math.pow(parseFloat(basic.height)/100,2) > 30) risks.push('سمنة');
            risks = risks.concat(conditions.filter(c => c.notes && c.notes.includes('خطر')).map(c => c.name));
            document.getElementById('risks-section').innerHTML = `<h5 class='section-title'>المخاطر الصحية</h5><ul>${risks.length ? risks.map(r=>`<li class='risk'>${r}</li>`).join('') : '<li>لا توجد مخاطر واضحة</li>'}</ul>`;

            // --- الفيتامينات والمعادن ---
            let vitamins = tests.filter(t => /فيتامين|Vitamin/i.test(t.name));
            let minerals = tests.filter(t => /حديد|كالسيوم|زنك|مغنيسيوم|بوتاسيوم|Sodium|Iron|Calcium|Zinc|Magnesium|Potassium/i.test(t.name));
            let vitHtml = vitamins.map(v => `<tr><td>${v.name}</td><td>${v.result} ${v.unit||''}</td><td>${interpretTest(v)}</td></tr>`).join('');
            let minHtml = minerals.map(m => `<tr><td>${m.name}</td><td>${m.result} ${m.unit||''}</td><td>${interpretTest(m)}</td></tr>`).join('');
            document.getElementById('vitamins-section').innerHTML = `<h5 class='section-title'>الفيتامينات</h5><table class='table'><tr><th>الاسم</th><th>النتيجة</th><th>تفسير</th></tr>${vitHtml || '<tr><td colspan=3>لا توجد بيانات</td></tr>'}</table>`;
            document.getElementById('minerals-section').innerHTML = `<h5 class='section-title'>المعادن</h5><table class='table'><tr><th>الاسم</th><th>النتيجة</th><th>تفسير</th></tr>${minHtml || '<tr><td colspan=3>لا توجد بيانات</td></tr>'}</table>`;

            // --- جودة النوم ونمط الحياة ---
            let sleepHtml = `<div class='card p-2'><b>جودة النوم:</b> ${lifestyle.sleepStart && lifestyle.sleepEnd ? `${lifestyle.sleepStart} - ${lifestyle.sleepEnd}` : 'غير محدد'}<br><b>النشاط البدني:</b> ${lifestyle.activity || 'غير محدد'}<br><b>النظام الغذائي:</b> ${lifestyle.diet || 'غير محدد'}</div>`;
            document.getElementById('sleep-section').innerHTML = `<h5 class='section-title'>نمط الحياة وجودة النوم</h5>${sleepHtml}`;

            // --- التاريخ العائلي ---
            let famHtml = family.map(f => `<li>${f.condition} <small>(${f.relation})</small></li>`).join('');
            document.getElementById('family-section').innerHTML = `<h5 class='section-title'>التاريخ العائلي</h5><ul>${famHtml || '<li>لا يوجد أمراض وراثية مسجلة</li>'}</ul>`;

            // --- الأدوية والحساسية ---
            let medsHtml = meds.map(m => `<li>${m.name} (${m.dose})</li>`).join('');
            let allergyHtml = allergies.map(a => `<li>${a.name} (${a.type})</li>`).join('');
            document.getElementById('lifestyle-section').innerHTML = `<h5 class='section-title'>الأدوية والحساسية</h5><b>الأدوية:</b><ul>${medsHtml || '<li>لا توجد أدوية مسجلة</li>'}</ul><b>الحساسية:</b><ul>${allergyHtml || '<li>لا توجد حساسية مسجلة</li>'}</ul>`;
        });
    });

    // دالة حساب العمر
    function calcAge(dateStr) {
        let d = new Date(dateStr);
        let now = new Date();
        let age = now.getFullYear() - d.getFullYear();
        if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age--;
        return age;
    }
    // دالة تفسير التحليل الطبي (مبسط)
    function interpretTest(test) {
        if (!test.referenceRange || !test.result) return '';
        let res = parseFloat(test.result);
        let ref = test.referenceRange.split('-').map(x=>parseFloat(x));
        if (ref.length === 2) {
            if (res < ref[0]) return "منخفض";
            if (res > ref[1]) return "مرتفع";
            return "طبيعي";
        }
        return '';
    }
});
