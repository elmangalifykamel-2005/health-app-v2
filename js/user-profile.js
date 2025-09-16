// كود نظيف: تحميل بيانات المستخدم من Firestore وعرضها، ودعم رفع صورة شخصية فقط
document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        const userId = user.uid;
        firebase.firestore().collection('users').doc(userId).get().then(doc => {
            if (doc.exists && doc.data().basicInfo) {
                const info = doc.data().basicInfo;
                document.getElementById('profile-image').src = info.photoURL || 'photo/profile.jpg';
                document.getElementById('user-name').textContent = info.fullName || '';
                document.getElementById('user-email').textContent = info.email || user.email || '';
                document.getElementById('full-name').value = info.fullName || '';
                document.getElementById('birth-date').value = info.birthDate || '';
                document.getElementById('height').value = info.height || '';
                document.getElementById('weight').value = info.weight || '';
                document.getElementById('waist').value = info.waist || '';
                document.getElementById('blood-type').value = info.bloodType || '';
                document.getElementById('phone').value = info.phone || '';
                document.getElementById('bio').value = info.bio || '';
            }
        });
        // رفع صورة الملف الشخصي
        const uploadInput = document.getElementById('upload-profile-image');
        const profileImage = document.getElementById('profile-image');
        if (uploadInput) {
            uploadInput.onchange = function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const storageRef = firebase.storage().ref('profile-images/' + userId);
                storageRef.put(file).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        profileImage.src = url;
                        firebase.firestore().collection('users').doc(userId).set({ basicInfo: { photoURL: url } }, { merge: true });
                    });
                });
            // لا يوجد أقواس زائدة أو أكواد غير مستخدمة
});
            profileImage.src = 'photo/profile.jpg';
        }
    }

    // تحديث اسم المستخدم والبريد الإلكتروني
    document.getElementById('user-name').textContent = basicInfo.fullName || basicInfo.firstName || '';
    document.getElementById('user-email').textContent = basicInfo.email || firebase.auth().currentUser.email || '';

    // تحديث نموذج المعلومات الشخصية
    document.getElementById('full-name').value = basicInfo.fullName || '';
    document.getElementById('birth-date').value = basicInfo.birthDate || '';
    document.getElementById('height').value = basicInfo.height || '';
    document.getElementById('weight').value = basicInfo.weight || '';
    document.getElementById('waist').value = basicInfo.waist || '';
    document.getElementById('blood-type').value = basicInfo.bloodType || '';
    document.getElementById('phone').value = basicInfo.phone || '';
    document.getElementById('bio').value = basicInfo.bio || '';

    // تحديث إحصائيات المستخدم
    document.getElementById('streak-days').textContent = userData.streakDays || 0;
    document.getElementById('goals-completed').textContent = userData.goalsCompleted || 0;

    // رفع صورة الملف الشخصي
    const uploadInput = document.getElementById('upload-profile-image');
    uploadInput.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = firebase.storage().ref('profile-images/' + firebase.auth().currentUser.uid);
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                profileImage.src = url;
                // حفظ الرابط في قاعدة البيانات
                const userId = firebase.auth().currentUser.uid;
                firebase.firestore().collection('users').doc(userId).set({ basicInfo: { ...basicInfo, photoURL: url } }, { merge: true });
            });
        });
    };
}

/**
 * تحميل مؤشر الصحة وتحديث العرض
 * @param {Object} userData - بيانات المستخدم
 */
function loadHealthScore(userData) {
    // الحصول على درجة المؤشر الصحي
    const healthScore = userData.healthIndicator?.score || 50;
    
    // تحديث مؤشر الصحة في الواجهة
    document.getElementById('health-score').textContent = `${healthScore}%`;
    
    // تغيير لون المؤشر بناءً على القيمة
    const scoreElement = document.getElementById('health-score');
    if (healthScore >= 85) {
        scoreElement.style.color = '#28a745'; // أخضر
    } else if (healthScore >= 70) {
        scoreElement.style.color = '#17a2b8'; // أزرق فاتح
    } else if (healthScore >= 50) {
        scoreElement.style.color = '#ffc107'; // أصفر
    } else {
        scoreElement.style.color = '#dc3545'; // أحمر
    }
}

/**
 * تحميل الأهداف الصحية للمستخدم
// ملف نظيف: تحميل بيانات المستخدم من Firestore وعرضها، ودعم رفع صورة شخصية فقط
document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        const userId = user.uid;
        firebase.firestore().collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                let info = null;
                if (doc.data().basicInfo) {
                    info = doc.data().basicInfo;
                } else if (doc.data().profile && doc.data().profile.basicInfo) {
                    info = doc.data().profile.basicInfo;
                }
                if (info) {
                    document.getElementById('profile-image').src = info.photoURL || 'photo/profile.jpg';
                    document.getElementById('user-name').textContent = info.fullName || '';
                    document.getElementById('user-email').textContent = info.email || user.email || '';
                    document.getElementById('full-name').value = info.fullName || '';
                    // تاريخ الميلاد: birthDate أو dateOfBirth
                    document.getElementById('birth-date').value = info.birthDate || info.dateOfBirth || '';
                    document.getElementById('height').value = info.height || '';
                    document.getElementById('weight').value = info.weight || '';
                    document.getElementById('waist').value = info.waist || '';
                    document.getElementById('blood-type').value = info.bloodType || '';
                    document.getElementById('phone').value = info.phone || '';
                    document.getElementById('bio').value = info.bio || '';
                }
            }
        });
        // رفع صورة الملف الشخصي
        const uploadInput = document.getElementById('upload-profile-image');
        const profileImage = document.getElementById('profile-image');
        if (uploadInput) {
            uploadInput.onchange = function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const storageRef = firebase.storage().ref('profile-images/' + userId);
                storageRef.put(file).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        profileImage.src = url;
                        firebase.firestore().collection('users').doc(userId).set({ basicInfo: { photoURL: url } }, { merge: true });
                    });
                });
            };
        }
    });
});
                { id: 'meditationMaster', icon: 'fa-om', title: 'إتقان التأمل' }
            ];
            
            // عرض كل الإنجازات الافتراضية مع حالة الإكمال
            defaultAchievements.forEach(defaultAchievement => {
                const achieved = achievements && achievements[defaultAchievement.id];
                
                // إنشاء عنصر الإنجاز
                const achievementElement = document.createElement('div');
                achievementElement.className = 'col-md-4 col-sm-6 mb-3';
                
                // تعيين محتوى العنصر
                achievementElement.innerHTML = `
                    <div class="achievement-badge text-center ${achieved ? '' : 'locked'}">
                        <div class="badge-icon">
                            <i class="fas ${defaultAchievement.icon} fa-2x"></i>
                        </div>
                        <h6 class="mt-2">${defaultAchievement.title}</h6>
                        <div class="badge-date">
                            <small class="${achieved ? 'text-muted' : ''}">
                                ${achieved ? formatDate(achieved.date) : 'غير مكتمل'}
                            </small>
                        </div>
                    </div>
                `;
                
                // إضافة العنصر إلى الحاوية
                achievementsContainer.appendChild(achievementElement);
            });
        })
        .catch(error => {
            console.error("خطأ في تحميل الإنجازات:", error);
        });
}

/**
 * تهيئة أحداث واجهة المستخدم
 */
function initializeEventListeners() {
    // زر تعديل الملف الشخصي
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', toggleEditMode);
    }
    
    // زر إلغاء التعديل
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', cancelEdit);
    }
    
    // زر حفظ التغييرات
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', saveProfileChanges);
    }
    
    // زر إضافة هدف جديد
    const addGoalBtn = document.getElementById('add-goal-btn');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', () => {
            // إظهار نموذج إضافة هدف جديد
            const addGoalModal = new bootstrap.Modal(document.getElementById('add-goal-modal'));
            addGoalModal.show();
        });
    }
    
    // زر حفظ الهدف الجديد
    const saveGoalBtn = document.getElementById('save-goal-btn');
    if (saveGoalBtn) {
        saveGoalBtn.addEventListener('click', saveNewGoal);
    }
    
    // زر تغيير الصورة الشخصية
    const editImageBtn = document.querySelector('.edit-image-btn');
    if (editImageBtn) {
        editImageBtn.addEventListener('click', changeProfileImage);
    }
}

/**
 * تبديل وضع تعديل الملف الشخصي
 */
function toggleEditMode() {
    const formInputs = document.querySelectorAll('#profile-form input, #profile-form textarea');
    const actionButtons = document.querySelector('.action-buttons');
    const editBtn = document.getElementById('edit-profile-btn');
    
    // تمكين/تعطيل جميع حقول النموذج
    formInputs.forEach(input => {
        input.disabled = !input.disabled;
    });
    
    // إظهار/إخفاء أزرار الحفظ والإلغاء
    actionButtons.style.display = actionButtons.style.display === 'none' ? 'block' : 'none';
    
    // تغيير نص زر التعديل
    editBtn.innerHTML = actionButtons.style.display === 'none' ? 
        '<i class="fas fa-edit"></i> تعديل' : 
        '<i class="fas fa-times"></i> إلغاء';
}

/**
 * إلغاء وضع التعديل وإعادة تحميل البيانات
 */
function cancelEdit() {
    const userId = firebase.auth().currentUser.uid;
    loadUserProfile(userId);
    toggleEditMode();
}

/**
 * حفظ تغييرات الملف الشخصي
 * @param {Event} event - حدث النقر
 */
function saveProfileChanges(event) {
    event.preventDefault();
    
    // الحصول على قيم النموذج
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const birthDate = document.getElementById('birth-date').value;
    const bio = document.getElementById('bio').value.trim();
    
    // التحقق من صحة البيانات
    if (!firstName || !lastName) {
        showAlert('يرجى إدخال الاسم الأول والأخير', 'warning');
        return;
    }
    
    // الحصول على معرف المستخدم الحالي
    const userId = firebase.auth().currentUser.uid;
    
    // تحديث البيانات في Firebase
    const updates = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        birthDate: birthDate,
        bio: bio,
        lastUpdated: new Date().toISOString()
    };
    
    firebase.database().ref(`users/${userId}`).update(updates)
        .then(() => {
            showAlert('تم تحديث الملف الشخصي بنجاح', 'success');
            toggleEditMode();
            
            // تحديث اسم المستخدم المعروض
            document.getElementById('user-name').textContent = `${firstName} ${lastName}`;
        })
        .catch(error => {
            console.error("خطأ في حفظ البيانات:", error);
            showAlert('حدث خطأ أثناء تحديث الملف الشخصي', 'danger');
        });
}

/**
 * حفظ هدف جديد
 */
function saveNewGoal() {
    // الحصول على قيم نموذج الهدف
    const title = document.getElementById('goal-title').value.trim();
    const type = document.getElementById('goal-type').value;
    const target = parseInt(document.getElementById('goal-target').value);
    const unit = document.getElementById('goal-unit').value.trim();
    const duration = document.getElementById('goal-duration').value;
    
    // التحقق من صحة البيانات
    if (!title || !type || isNaN(target) || target <= 0 || !unit) {
        showAlert('يرجى إدخال جميع بيانات الهدف بشكل صحيح', 'warning');
        return;
    }
    
    // إنشاء كائن الهدف الجديد
    const newGoal = {
        title: title,
        type: type,
        target: target,
        current: 0,
        unit: unit,
        duration: duration,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // الحصول على معرف المستخدم الحالي
    const userId = firebase.auth().currentUser.uid;
    
    // إضافة الهدف إلى قاعدة البيانات
    const newGoalRef = firebase.database().ref(`users/${userId}/goals`).push();
    
    newGoalRef.set(newGoal)
        .then(() => {
            // إغلاق النموذج
            bootstrap.Modal.getInstance(document.getElementById('add-goal-modal')).hide();
            
            // إعادة تعيين النموذج
            document.getElementById('add-goal-form').reset();
            
            // إعادة تحميل الأهداف
            loadHealthGoals(userId);
            
            showAlert('تم إضافة الهدف الجديد بنجاح', 'success');
        })
        .catch(error => {
            console.error("خطأ في إضافة الهدف:", error);
            showAlert('حدث خطأ أثناء إضافة الهدف الجديد', 'danger');
        });
}

/**
 * تعديل هدف موجود
 * @param {string} goalId - معرف الهدف
 * @param {Object} goal - بيانات الهدف
 */
function editGoal(goalId, goal) {
    // تنفيذ منطق تعديل الهدف (سيتم تنفيذه لاحقًا)
    console.log("تعديل الهدف:", goalId, goal);
    // هنا يمكن إظهار نموذج تعديل الهدف وملؤه بالبيانات الحالية
}

/**
 * حذف هدف
 * @param {string} goalId - معرف الهدف
 * @param {string} userId - معرف المستخدم
 */
function deleteGoal(goalId, userId) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الهدف؟')) {
        firebase.database().ref(`users/${userId}/goals/${goalId}`).remove()
            .then(() => {
                showAlert('تم حذف الهدف بنجاح', 'success');
                loadHealthGoals(userId);
            })
            .catch(error => {
                console.error("خطأ في حذف الهدف:", error);
                showAlert('حدث خطأ أثناء حذف الهدف', 'danger');
            });
    }
}

/**
 * تغيير صورة الملف الشخصي
 */
function changeProfileImage() {
    // إنشاء عنصر إدخال ملف وإخفاؤه
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // تنفيذ النقر على عنصر إدخال الملف
    fileInput.click();
    
    // معالجة حدث اختيار الملف
    fileInput.addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) {
            // التحقق من حجم وامتداد الملف
            if (file.size > 5 * 1024 * 1024) { // 5 ميجابايت
                showAlert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'warning');
                return;
            }
            
            const userId = firebase.auth().currentUser.uid;
            const storageRef = firebase.storage().ref(`users/${userId}/profile_image`);
            
            // إظهار مؤشر التقدم
            showAlert('جارٍ رفع الصورة...', 'info');
            
            // رفع الصورة إلى Firebase Storage
            const uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed', 
                // مراقبة التقدم
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(`نسبة التقدم: ${progress}%`);
                },
                // معالجة الخطأ
                error => {
                    console.error("خطأ في رفع الصورة:", error);
                    showAlert('حدث خطأ أثناء رفع الصورة', 'danger');
                },
                // معالجة الانتهاء بنجاح
                () => {
                    // الحصول على رابط التنزيل
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        // تحديث صورة الملف الشخصي في قاعدة البيانات
                        firebase.database().ref(`users/${userId}`).update({
                            photoURL: downloadURL
                        });
                        
                        // تحديث الصورة في واجهة المستخدم
                        document.getElementById('profile-image').src = downloadURL;
                        
                        showAlert('تم تحديث صورة الملف الشخصي بنجاح', 'success');
                    });
                }
            );
        }
    });
    
    // إزالة عنصر الإدخال بعد الاستخدام
    fileInput.addEventListener('blur', () => {
        document.body.removeChild(fileInput);
    });
}

/**
 * عرض تنبيه للمستخدم
 * @param {string} message - رسالة التنبيه
 * @param {string} type - نوع التنبيه (success, warning, danger, info)
 */
function showAlert(message, type = 'info') {
    // إنشاء عنصر التنبيه
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible fade show fixed-top mx-auto mt-3`;
    alertElement.style.maxWidth = '500px';
    alertElement.style.zIndex = '9999';
    alertElement.setAttribute('role', 'alert');
    
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
    `;
    
    // إضافة التنبيه إلى الصفحة
    document.body.appendChild(alertElement);
    
    // إزالة التنبيه تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        if (alertElement.parentNode) {
            alertElement.classList.remove('show');
            setTimeout(() => {
                if (alertElement.parentNode) {
                    document.body.removeChild(alertElement);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * تنسيق التاريخ بصيغة مناسبة
 * @param {string} dateString - التاريخ بصيغة ISO
 * @returns {string} التاريخ المنسق
 */
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}