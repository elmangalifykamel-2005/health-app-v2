/**
 * نظام Firebase الموحد لتطبيق "صحتك بالدنيا"
 * يوفر واجهة موحدة للتعامل مع Firebase وتخزين البيانات
 */

// استدعاء ملف الإعدادات
document.write('<script src="config/app-config.js"></script>');

// Firebase Configuration - ملف مشترك لجميع الصفحات
const firebaseConfig = {
    apiKey: "AIzaSyCdUHldUu83kfgc_qUn-h5rZ8xTl2rhNjA",
    authDomain: "healthy-wealthy-app.firebaseapp.com",
    projectId: "healthy-wealthy-app",
    storageBucket: "healthy-wealthy-app.appspot.com",
    messagingSenderId: "182436316225",
    appId: "1:182436316225:web:5cfd34f879204b12ebf2c0"
};

/**
 * خدمة Firebase المركزية
 * توفر واجهة موحدة للتعامل مع Firebase والتخزين المحلي
 */
const firebaseService = {
    // المستخدم الحالي
    currentUser: null,
    
    // خاصية لمعرفة ما إذا تم تهيئة الخدمة بنجاح
    isInitialized: false,
    
    // تهيئة Firebase
    initialize: function() {
        console.log('🔄 نظام Firebase الموحد - جاري التهيئة...');
        
        try {
            // تجنب إعادة تهيئة Firebase إذا كانت التطبيقات موجودة بالفعل
            if (firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }
            
            this.db = firebase.firestore();
            const auth = firebase.auth();
            
            // مراقبة حالة المستخدم
            auth.onAuthStateChanged(user => this.handleAuthStateChange(user));
            
            // تسجيل الدخول المجهول كخيار احتياطي بعد تأخير قصير
            setTimeout(() => {
                if (!auth.currentUser) {
                    this.auth.signInAnonymously();
                }
            }, 2000);
            
            this.isInitialized = true;
            console.log('✅ تم تهيئة Firebase بنجاح');
            
            // إشعار باكتمال التهيئة
            window.dispatchEvent(new CustomEvent('firebaseInitialized'));
        } catch (error) {
            console.error('❌ فشل تهيئة Firebase:', error);
            this.isInitialized = false;
        }
        
        return this;
    },
    
    // معالجة تغييرات حالة المستخدم
    handleAuthStateChange: function(user) {
        this.currentUser = user;
        
        if (user) {
            localStorage.setItem(APP_CONFIG.storage.userId, user.uid);
            console.log('🔑 المستخدم الموحد متصل:', user.uid);
            
            // تخزين صورة المستخدم في localStorage إذا كانت متاحة
            if (user.photoURL) {
                localStorage.setItem('user_photo_url', user.photoURL);
                console.log('🖼️ تم تخزين صورة المستخدم:', user.photoURL);
            }
            
            // إشعار جميع الصفحات بتسجيل الدخول
            window.dispatchEvent(new CustomEvent('userSignedIn', { detail: user }));
        } else {
            console.log('🔑 المستخدم غير متصل - استخدام وضع محلي');
            
            // إشعار جميع الصفحات بتسجيل الخروج
            window.dispatchEvent(new CustomEvent('userSignedOut'));
        }
    },
    
    // تسجيل الدخول المجهول
    anonymousSignIn: function() {
        // فقط إذا لم يكن هناك مستخدم حالي
        if (!this.currentUser) {
            this.auth.signInAnonymously()
                .then(() => {
                    console.log('✅ تم تسجيل الدخول المجهول بنجاح');
                })
                .catch(error => {
                    console.log('❌ فشل تسجيل الدخول المجهول:', error.message);
                });
        }
    },
    
    // الحصول على المستخدم الحالي
    getCurrentUser: function() {
        return this.currentUser;
    },
    
    // الحصول على معرف المستخدم
    getUserId: function() {
        if (this.currentUser && this.currentUser.uid) {
            return this.currentUser.uid;
        }
        
        // Fallback للـ localStorage
        let userId = localStorage.getItem(APP_CONFIG.storage.userId);
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem(APP_CONFIG.storage.userId, userId);
        }
        return userId;
    },
    
    // عمليات البيانات
    data: {
        // حفظ البيانات في Firebase مع نسخة احتياطية في localStorage
        save: async function(collection, document, data) {
            const userId = firebaseService.getUserId();
            
            try {
                // تنقية البيانات
                const sanitizedData = this._sanitizeData(data);
                
                // إضافة طابع زمني
                sanitizedData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
                
                if (firebaseService.currentUser) {
                    // حفظ في Firebase
                    await firebaseService.db.collection('users')
                        .doc(userId)
                        .collection(collection)
                        .doc(document)
                        .set(sanitizedData);
                }
                
                // دائمًا حفظ في localStorage كنسخة احتياطية
                localStorage.setItem(`${userId}_${collection}_${document}`, JSON.stringify(sanitizedData));
                return true;
            } catch (error) {
                console.error(`خطأ في حفظ ${collection}/${document}:`, error);
                // محاولة الحفظ محليًا على أي حال
                localStorage.setItem(`${userId}_${collection}_${document}`, JSON.stringify(data));
                return false;
            }
        },
        
        // الحصول على البيانات من Firebase أو localStorage
        get: async function(collection, document) {
            const userId = firebaseService.getUserId();
            
            try {
                if (firebaseService.currentUser) {
                    // محاولة الحصول من Firebase أولاً
                    const docRef = await firebaseService.db.collection('users')
                        .doc(userId)
                        .collection(collection)
                        .doc(document)
                        .get();
                        
                    if (docRef.exists) {
                        // تخزين محلي للتخزين المؤقت
                        localStorage.setItem(`${userId}_${collection}_${document}`, JSON.stringify(docRef.data()));
                        return docRef.data();
                    }
                }
                
                // Fallback للـ localStorage
                const localData = localStorage.getItem(`${userId}_${collection}_${document}`);
                return localData ? JSON.parse(localData) : null;
            } catch (error) {
                console.error(`خطأ في الحصول على ${collection}/${document}:`, error);
                
                // Fallback للـ localStorage
                const localData = localStorage.getItem(`${userId}_${collection}_${document}`);
                return localData ? JSON.parse(localData) : null;
            }
        },
        
        // حذف البيانات
        delete: async function(collection, document) {
            const userId = firebaseService.getUserId();
            
            try {
                if (firebaseService.currentUser) {
                    // حذف من Firebase
                    await firebaseService.db.collection('users')
                        .doc(userId)
                        .collection(collection)
                        .doc(document)
                        .delete();
                }
                
                // حذف من localStorage
                localStorage.removeItem(`${userId}_${collection}_${document}`);
                return true;
            } catch (error) {
                console.error(`خطأ في حذف ${collection}/${document}:`, error);
                return false;
            }
        },
        
        // تنظيف وتنقية البيانات قبل الحفظ
        _sanitizeData: function(data) {
            if (!data || typeof data !== 'object') {
                console.error('تنسيق بيانات غير صالح للحفظ');
                return {};
            }
            
            // نسخة جديدة من البيانات
            const sanitized = {};
            
            // تنظيف كل حقل
            Object.entries(data).forEach(([key, value]) => {
                // إزالة أي علامات script أو محتوى خطير
                if (typeof value === 'string') {
                    sanitized[key] = value
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .trim();
                } else if (value === null || value === undefined) {
                    // تجاهل القيم الفارغة
                    sanitized[key] = '';
                } else {
                    sanitized[key] = value;
                }
            });
            
            return sanitized;
        }
    },
    
    // عمليات المصادقة
    auth: {
        // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
        signInWithEmailAndPassword: async function(email, password) {
            try {
                const auth = firebase.auth();
                return await auth.signInWithEmailAndPassword(email, password);
            } catch (error) {
                console.error('خطأ في تسجيل الدخول:', error.message);
                throw error;
            }
        },
        
        // إنشاء حساب باستخدام البريد الإلكتروني وكلمة المرور
        createUserWithEmailAndPassword: async function(email, password) {
            try {
                const auth = firebase.auth();
                return await auth.createUserWithEmailAndPassword(email, password);
            } catch (error) {
                console.error('خطأ في إنشاء الحساب:', error.message);
                throw error;
            }
        },
        
        // تسجيل الدخول باستخدام حساب Google
        signInWithGoogle: async function() {
            try {
                const auth = firebase.auth();
                const provider = new firebase.auth.GoogleAuthProvider();
                return await auth.signInWithPopup(provider);
            } catch (error) {
                console.error('خطأ في تسجيل الدخول بواسطة Google:', error.message);
                throw error;
            }
        },
        
        // تسجيل الدخول المجهول
        signInAnonymously: async function() {
            try {
                const auth = firebase.auth();
                return await auth.signInAnonymously();
            } catch (error) {
                console.error('خطأ في تسجيل الدخول المجهول:', error.message);
                throw error;
            }
        },
        
        // تسجيل الخروج
        signOut: async function() {
            try {
                const auth = firebase.auth();
                await auth.signOut();
                return true;
            } catch (error) {
                console.error('خطأ في تسجيل الخروج:', error.message);
                throw error;
            }
        },
        
        // استعادة كلمة المرور
        resetPassword: async function(email) {
            try {
                const auth = firebase.auth();
                await auth.sendPasswordResetEmail(email);
                return true;
            } catch (error) {
                console.error('خطأ في إرسال رابط استعادة كلمة المرور:', error.message);
                throw error;
            }
        },
        
        // مراقبة تغيرات حالة المصادقة
        onAuthStateChanged: function(callback) {
            const auth = firebase.auth();
            return auth.onAuthStateChanged(callback);
        },
        
        // التحقق مما إذا كان المستخدم مسجل الدخول
        isAuthenticated: function() {
            const auth = firebase.auth();
            return auth.currentUser !== null;
        }
    },
    
    // وظائف مساعدة
    helpers: {
        // الحصول على مفتاح بيانات المستخدم
        getUserDataKey: function(keyName) {
            return firebaseService.getUserId() + '_' + keyName;
        },
        
        // التحقق من وجود البيانات الأساسية أو تم تخطيها
        hasBasicInfo: async function() {
            const data = await firebaseService.data.get(
                APP_CONFIG.firebase.collections.medical, 
                APP_CONFIG.firebase.documents.basicInfo
            );
            // إذا كان هناك خاصية skipped=true اعتبر البيانات غير مكتملة
            if (data && data.skipped === true) return false;
            // تحقق من جميع الحقول المطلوبة
            if (data && data.fullName && data.birthDate && data.height && data.weight && data.waist && data.bloodType) {
                return true;
            }
            return false;
        },
        
        // ترجمة رسائل أخطاء Firebase
        getLocalizedErrorMessage: function(error, lang = 'ar') {
            console.log("Error code:", error.code);
            
            if (!error || !error.code) {
                return lang === 'ar' ? 'حدث خطأ غير معروف' : 'An unknown error occurred';
            }
            
            const errorMessages = {
                'auth/email-already-in-use': {
                    ar: 'البريد الإلكتروني مستخدم بالفعل',
                    en: 'Email is already in use'
                },
                'auth/invalid-email': {
                    ar: 'البريد الإلكتروني غير صحيح',
                    en: 'Invalid email address'
                },
                'auth/user-not-found': {
                    ar: 'المستخدم غير موجود',
                    en: 'User not found'
                },
                'auth/wrong-password': {
                    ar: 'كلمة المرور غير صحيحة',
                    en: 'Incorrect password'
                },
                'auth/weak-password': {
                    ar: 'كلمة المرور ضعيفة جدًا',
                    en: 'Password is too weak'
                },
                'auth/popup-closed-by-user': {
                    ar: 'تم إغلاق نافذة تسجيل الدخول',
                    en: 'Sign-in popup was closed'
                },
                'auth/popup-blocked': {
                    ar: 'تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة لهذا الموقع',
                    en: 'Popup was blocked. Please allow popups for this site'
                },
                'auth/too-many-requests': {
                    ar: 'تم تجاوز عدد المحاولات المسموح. الرجاء المحاولة لاحقًا',
                    en: 'Too many requests. Please try again later'
                },
                'auth/network-request-failed': {
                    ar: 'فشل الاتصال بالشبكة. تحقق من اتصالك بالإنترنت',
                    en: 'Network request failed. Check your internet connection'
                }
            };
            
            const errorObj = errorMessages[error.code];
            if (errorObj) {
                return errorObj[lang] || errorObj.en || error.message;
            }
            
            return error.message || (lang === 'ar' ? 'حدث خطأ غير معروف' : 'An unknown error occurred');
        }
    }
};

// تأكد من وجود كائن Firebase قبل التهيئة
if (typeof firebase !== 'undefined') {
    // تهيئة الخدمة فورًا
    firebaseService.initialize();
    
    // كشف الخدمة عالميًا
    window.firebaseService = firebaseService;
    
    console.log('🔧 تم تحميل نظام Firebase الموحد');
} else {
    console.error('❌ لم يتم العثور على كائن Firebase! تأكد من تحميل مكتبات Firebase بشكل صحيح.');
    
    // إنشاء كائن firebaseService فارغ لتجنب الأخطاء
    window.firebaseService = {
        isInitialized: false,
        initialize: function() {
            console.error('❌ لا يمكن تهيئة Firebase: المكتبة غير موجودة.');
            return this;
        },
        auth: {
            signInWithEmailAndPassword: async function() { throw new Error('Firebase غير متاح'); },
            createUserWithEmailAndPassword: async function() { throw new Error('Firebase غير متاح'); },
            signInWithGoogle: async function() { throw new Error('Firebase غير متاح'); },
            signOut: async function() { return true; },
            resetPassword: async function() { throw new Error('Firebase غير متاح'); }
        }
    };
}

// إضافة معالج أحداث لإعادة المحاولة في حال فشل التحميل
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof firebase !== 'undefined' && !firebaseService.isInitialized) {
            console.log('🔄 إعادة محاولة تهيئة Firebase بعد التحميل الكامل للصفحة...');
            firebaseService.initialize();
        }
    }, 2000);
});