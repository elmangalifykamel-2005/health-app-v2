/**
 * ملف مشترك للتعامل مع نماذج الملف الطبي
 * يحتوي على وظائف مساعدة للحفظ والإلغاء
 */

// وظيفة للعودة إلى الصفحة الرئيسية للملف الطبي
function returnToMedicalProfile() {
    window.location.href = 'medical-profile.html';
}

// وظيفة للتحقق من تسجيل الدخول
function checkUserAuthentication() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = '../../login.html';
        }
    });
}

// وظيفة لإضافة مستمعات الأحداث لأزرار الإلغاء
function setupCancelButton(buttonId = 'cancel-btn') {
    const cancelButton = document.getElementById(buttonId);
    if (cancelButton) {
        cancelButton.addEventListener('click', returnToMedicalProfile);
    }
}

// وظيفة لحفظ البيانات في Firebase
function saveToFirebase(collectionName, data) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (!user) {
            reject(new Error('المستخدم غير مسجل الدخول'));
            return;
        }

        firebase.firestore().collection('users').doc(user.uid).get()
            .then(doc => {
                // الحصول على مصفوفة البيانات الحالية أو إنشاء مصفوفة فارغة
                let dataArray = [];
                if (doc.exists && doc.data()[collectionName]) {
                    dataArray = doc.data()[collectionName];
                }

                // إضافة البيانات الجديدة
                dataArray.push({
                    ...data,
                    createdAt: new Date().toISOString(),
                    id: 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
                });

                // حفظ البيانات
                const updateData = {};
                updateData[collectionName] = dataArray;
                
                return firebase.firestore().collection('users').doc(user.uid).set(updateData, { merge: true });
            })
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('خطأ في حفظ البيانات:', error);
                reject(error);
            });
    });
}

// استدعاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تسجيل الدخول
    checkUserAuthentication();
    
    // إعداد زر الإلغاء
    setupCancelButton();
});