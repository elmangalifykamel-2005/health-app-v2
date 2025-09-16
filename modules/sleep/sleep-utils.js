// وظائف مساعدة لصفحات النوم

// إدارة اللغة
let lang = localStorage.getItem('hl_language') || 'ar';

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('hl_language', lang);
  
  // تحديث عرض العناصر
  ['ar','en'].forEach(l=>{
    document.querySelectorAll(`[id$="-${l}"]`).forEach(el=>{
      el.style.display = (l === lang ? 'block' : 'none');
    });
  });
  
  // تحديث اتجاه النص
  document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  
  // تحديث أزرار اللغة
  const langArBtn = document.getElementById('lang-' + lang);
  const langOtherBtn = document.getElementById('lang-' + (lang === 'ar' ? 'en' : 'ar'));
  if (langArBtn) langArBtn.classList.add('active');
  if (langOtherBtn) langOtherBtn.classList.remove('active');
}

// إضافة وظيفة getCurrentLanguage المفقودة
function getCurrentLanguage() {
  return lang || localStorage.getItem('hl_language') || 'ar';
}

// تهيئة اللغة عند تحميل الصفحة
function initLanguage() {
  const currentLang = getCurrentLanguage();
  if (document.getElementById('lang-ar')) {
    document.getElementById('lang-ar').onclick = () => setLang('ar');
  }
  if (document.getElementById('lang-en')) {
    document.getElementById('lang-en').onclick = () => setLang('en');
  }
  setLang(currentLang);
}

// حفظ بيانات النوم
function saveSleepData(data) {
  const sleepData = JSON.parse(localStorage.getItem('sleepData') || '{}');
  const today = new Date().toDateString();
  sleepData[today] = { ...sleepData[today], ...data };
  localStorage.setItem('sleepData', JSON.stringify(sleepData));
}

// استرجاع بيانات النوم
function getSleepData(date = null) {
  const sleepData = JSON.parse(localStorage.getItem('sleepData') || '{}');
  const targetDate = date || new Date().toDateString();
  return sleepData[targetDate] || {};
}

// حساب جودة النوم
function calculateSleepQuality(hours, bedtime, wakeup, interruptions = 0) {
  let score = 0;
  
  // نقاط ساعات النوم (40 نقطة)
  if (hours >= 7 && hours <= 9) {
    score += 40;
  } else if (hours >= 6 && hours < 7) {
    score += 30;
  } else if (hours >= 5 && hours < 6) {
    score += 20;
  } else {
    score += 10;
  }
  
  // نقاط توقيت النوم (30 نقطة)
  const bedHour = parseInt(bedtime.split(':')[0]);
  if (bedHour >= 22 || bedHour <= 1) {
    score += 30;
  } else if (bedHour >= 21 || bedHour <= 2) {
    score += 20;
  } else {
    score += 10;
  }
  
  // نقاط الانقطاعات (30 نقطة)
  if (interruptions === 0) {
    score += 30;
  } else if (interruptions <= 2) {
    score += 20;
  } else if (interruptions <= 4) {
    score += 10;
  }
  
  return Math.min(score, 100);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
  initLanguage();
});

// تصدير الوظائف للاستخدام في صفحات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setLang,
    getCurrentLanguage,
    initLanguage,
    saveSleepData,
    getSleepData,
    calculateSleepQuality
  };
}