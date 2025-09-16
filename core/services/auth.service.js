/**
 * خدمة المصادقة
 * تدير تسجيل الدخول والخروج وحالة المستخدم
 */

import firebaseService from './firebase.service.js';

class AuthService {
    constructor() {
        this.user = null;
        this.authStateListeners = [];
        
        // التحقق من حالة المصادقة عند بدء التشغيل
        this.setupAuthStateListener();
    }

    /**
     * إعداد مستمع لتغييرات حالة المصادقة
     */
    async setupAuthStateListener() {
        // انتظر اكتمال تهيئة Firebase
        await this.waitForFirebaseAuth();
        
        // إعداد المستمع لحالة المصادقة
        firebaseService.firebaseAuth.onAuthStateChanged(firebaseService.auth, (user) => {
            this.user = user;
            
            // إشعار جميع المستمعين بتغيير حالة المستخدم
            this.notifyAuthStateListeners();
            
            if (user) {
                console.log('تم تسجيل الدخول:', user.email);
                // تحميل بيانات المستخدم الإضافية من قاعدة البيانات
                this.loadUserData(user.uid);
            } else {
                console.log('تم تسجيل الخروج');
                localStorage.removeItem('userData');
            }
        });
    }

    /**
     * انتظار اكتمال تهيئة Firebase
     */
    async waitForFirebaseAuth() {
        let retries = 0;
        const maxRetries = 10;
        
        while (!firebaseService.auth && retries < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 500));
            retries++;
        }
        
        if (!firebaseService.auth) {
            console.error('فشل في تهيئة Firebase Auth');
            throw new Error('فشل في تهيئة Firebase Auth');
        }
    }

    /**
     * تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
     * @param {string} email - البريد الإلكتروني
     * @param {string} password - كلمة المرور
     * @returns {Promise<Object>} كائن المستخدم
     */
    async signIn(email, password) {
        try {
            // استيراد دالة تسجيل الدخول ديناميكيًا
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            
            const userCredential = await signInWithEmailAndPassword(firebaseService.auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('خطأ في تسجيل الدخول:', error);
            
            // تحويل رسائل الخطأ إلى رسائل عربية مفهومة
            const errorMessage = this.getAuthErrorMessage(error.code);
            throw new Error(errorMessage);
        }
    }

    /**
     * إنشاء حساب جديد باستخدام البريد الإلكتروني وكلمة المرور
     * @param {string} email - البريد الإلكتروني
     * @param {string} password - كلمة المرور
     * @param {Object} userData - بيانات المستخدم الإضافية
     * @returns {Promise<Object>} كائن المستخدم
     */
    async signUp(email, password, userData) {
        try {
            // استيراد دالة إنشاء الحساب ديناميكيًا
            const { createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            
            // إنشاء الحساب
            const userCredential = await createUserWithEmailAndPassword(firebaseService.auth, email, password);
            const user = userCredential.user;
            
            // حفظ بيانات المستخدم الإضافية في Firestore
            await this.saveUserData(user.uid, {
                email: user.email,
                displayName: userData.displayName || '',
                createdAt: new Date(),
                ...userData
            });
            
            return user;
        } catch (error) {
            console.error('خطأ في إنشاء الحساب:', error);
            
            // تحويل رسائل الخطأ إلى رسائل عربية مفهومة
            const errorMessage = this.getAuthErrorMessage(error.code);
            throw new Error(errorMessage);
        }
    }

    /**
     * تسجيل الخروج
     * @returns {Promise<void>}
     */
    async signOut() {
        try {
            // استيراد دالة تسجيل الخروج ديناميكيًا
            const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            
            await signOut(firebaseService.auth);
            this.user = null;
            localStorage.removeItem('userData');
        } catch (error) {
            console.error('خطأ في تسجيل الخروج:', error);
            throw error;
        }
    }

    /**
     * إعادة تعيين كلمة المرور
     * @param {string} email - البريد الإلكتروني
     * @returns {Promise<void>}
     */
    async resetPassword(email) {
        try {
            // استيراد دالة إعادة تعيين كلمة المرور ديناميكيًا
            const { sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            
            await sendPasswordResetEmail(firebaseService.auth, email);
        } catch (error) {
            console.error('خطأ في إعادة تعيين كلمة المرور:', error);
            
            // تحويل رسائل الخطأ إلى رسائل عربية مفهومة
            const errorMessage = this.getAuthErrorMessage(error.code);
            throw new Error(errorMessage);
        }
    }

    /**
     * الحصول على المستخدم الحالي
     * @returns {Object|null} كائن المستخدم أو null إذا لم يكن هناك مستخدم مسجل الدخول
     */
    getCurrentUser() {
        return this.user;
    }

    /**
     * التحقق مما إذا كان المستخدم مسجل الدخول
     * @returns {boolean} حالة تسجيل الدخول
     */
    isAuthenticated() {
        return !!this.user;
    }

    /**
     * حفظ بيانات المستخدم في Firestore
     * @param {string} userId - معرّف المستخدم
     * @param {Object} userData - بيانات المستخدم
     * @returns {Promise<void>}
     */
    async saveUserData(userId, userData) {
        try {
            return await firebaseService.setDocument('users', userId, userData);
        } catch (error) {
            console.error('خطأ في حفظ بيانات المستخدم:', error);
            throw error;
        }
    }

    /**
     * تحميل بيانات المستخدم من Firestore
     * @param {string} userId - معرّف المستخدم
     * @returns {Promise<Object|null>} بيانات المستخدم
     */
    async loadUserData(userId) {
        try {
            const userData = await firebaseService.getDocument('users', userId);
            
            if (userData) {
                // تخزين البيانات في التخزين المحلي للوصول السريع
                localStorage.setItem('userData', JSON.stringify(userData));
            }
            
            return userData;
        } catch (error) {
            console.error('خطأ في تحميل بيانات المستخدم:', error);
            return null;
        }
    }

    /**
     * تحديث معلومات الملف الشخصي للمستخدم
     * @param {Object} profileData - بيانات الملف الشخصي
     * @returns {Promise<Object>} بيانات المستخدم المحدثة
     */
    async updateProfile(profileData) {
        try {
            if (!this.user) {
                throw new Error('لا يوجد مستخدم مسجل الدخول');
            }
            
            const userId = this.user.uid;
            
            // تحديث بيانات المستخدم في Firestore
            const updatedUserData = await firebaseService.updateDocument('users', userId, profileData);
            
            // تحديث التخزين المحلي
            const existingData = JSON.parse(localStorage.getItem('userData') || '{}');
            const newData = { ...existingData, ...profileData };
            localStorage.setItem('userData', JSON.stringify(newData));
            
            return updatedUserData;
        } catch (error) {
            console.error('خطأ في تحديث الملف الشخصي:', error);
            throw error;
        }
    }

    /**
     * إضافة مستمع لتغييرات حالة المصادقة
     * @param {Function} listener - دالة المستمع التي ستستدعى عند تغيير حالة المستخدم
     */
    addAuthStateListener(listener) {
        if (typeof listener === 'function' && !this.authStateListeners.includes(listener)) {
            this.authStateListeners.push(listener);
            
            // استدعاء المستمع مع الحالة الحالية فورًا
            listener(this.user);
        }
    }

    /**
     * إزالة مستمع حالة المصادقة
     * @param {Function} listener - دالة المستمع المراد إزالتها
     */
    removeAuthStateListener(listener) {
        const index = this.authStateListeners.indexOf(listener);
        if (index !== -1) {
            this.authStateListeners.splice(index, 1);
        }
    }

    /**
     * إشعار جميع المستمعين بتغيير حالة المستخدم
     */
    notifyAuthStateListeners() {
        this.authStateListeners.forEach(listener => {
            listener(this.user);
        });
    }

    /**
     * الحصول على رسالة خطأ مناسبة بناءً على رمز الخطأ
     * @param {string} errorCode - رمز خطأ Firebase
     * @returns {string} رسالة الخطأ بالعربية
     */
    getAuthErrorMessage(errorCode) {
        const errorMessages = {
            'auth/invalid-email': 'البريد الإلكتروني غير صالح',
            'auth/user-disabled': 'تم تعطيل حساب المستخدم',
            'auth/user-not-found': 'لا يوجد مستخدم بهذا البريد الإلكتروني',
            'auth/wrong-password': 'كلمة المرور غير صحيحة',
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
            'auth/weak-password': 'كلمة المرور ضعيفة جدًا',
            'auth/network-request-failed': 'فشل في الاتصال بالشبكة',
            'auth/too-many-requests': 'تم تعطيل الوصول إلى هذا الحساب مؤقتًا نتيجة لعدة محاولات فاشلة لتسجيل الدخول',
            'auth/requires-recent-login': 'تتطلب هذه العملية إعادة تسجيل الدخول',
            'auth/popup-closed-by-user': 'تم إغلاق نافذة التسجيل قبل إكمال العملية',
        };
        
        return errorMessages[errorCode] || 'حدث خطأ غير معروف. يرجى المحاولة مرة أخرى.';
    }
}

// إنشاء نسخة واحدة من خدمة المصادقة للاستخدام في التطبيق بأكمله
const authService = new AuthService();

export default authService;