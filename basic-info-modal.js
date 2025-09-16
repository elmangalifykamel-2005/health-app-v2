// كود النموذج الجديد لحفظ البيانات الأساسية في Firestore
// يعتمد على وجود Firebase وتهيئته مسبقاً في الصفحة الرئيسية

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('basic-info-modal');
  const form = document.getElementById('basic-info-form');
  const skipBtn = document.getElementById('skipBasicInfo');

  // دالة إغلاق النافذة
  window.closeBasicInfoModal = function() {
    modal.style.display = 'none';
  };

  // دالة إظهار النافذة
  window.showBasicInfoModal = function() {
    modal.style.display = 'block';
  };

  // حفظ البيانات
  form.onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).set({ basicInfo: data }, { merge: true })
        .then(() => {
          alert('✅ تم حفظ المعلومات بنجاح!');
          modal.style.display = 'none';
          window.dispatchEvent(new CustomEvent('basicInfoUpdated'));
        })
        .catch(() => {
          alert('⚠️ حدث خطأ أثناء الحفظ');
        });
    } else {
      alert('⚠️ أنت غير مسجل الدخول');
    }
  };

  // زر التخطي
  skipBtn.onclick = function() {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).set({ basicInfo: { skipped: true } }, { merge: true })
        .finally(() => {
          modal.style.display = 'none';
          window.dispatchEvent(new CustomEvent('basicInfoUpdated'));
        });
    } else {
      modal.style.display = 'none';
      window.dispatchEvent(new CustomEvent('basicInfoUpdated'));
    }
  };
});
