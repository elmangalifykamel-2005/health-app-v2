/**
 * خدمة Firebase الرئيسية
 * تدير الاتصال بـ Firebase والعمليات المشتركة على قاعدة البيانات
 */

// استيراد تكوين Firebase من الملف الرئيسي
import { firebaseConfig } from '../../firebase-config.js';

// خدمة Firebase للتعامل مع كل عمليات قاعدة البيانات
class FirebaseService {
    constructor() {
        // تهيئة Firebase عند إنشاء الخدمة
        this.initializeFirebase();
    }

    /**
     * تهيئة Firebase واستخراج المراجع المطلوبة
     */
    async initializeFirebase() {
        try {
            // استيراد ديناميكي لمكتبات Firebase (لتحسين الأداء)
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
            const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            const { getFirestore, collection, doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc, query, where, orderBy, limit, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js');
            const { getStorage, ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js');

            // تهيئة التطبيق
            this.app = initializeApp(firebaseConfig);
            
            // الحصول على مراجع الخدمات
            this.auth = getAuth(this.app);
            this.db = getFirestore(this.app);
            this.storage = getStorage(this.app);
            
            // تخزين الدوال المستخدمة للوصول لاحقًا
            this.firestore = {
                collection, doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc, query, where, orderBy, limit, getDocs
            };
            
            this.firebaseStorage = {
                ref, uploadBytes, getDownloadURL
            };
            
            this.firebaseAuth = {
                onAuthStateChanged
            };
            
            console.log('تم تهيئة Firebase بنجاح');
            return true;
        } catch (error) {
            console.error('خطأ في تهيئة Firebase:', error);
            return false;
        }
    }

    /**
     * الحصول على المستخدم الحالي
     * @returns {Object|null} كائن المستخدم الحالي أو null إذا لم يكن هناك مستخدم مسجل الدخول
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }

    /**
     * الحصول على وثيقة من Firestore
     * @param {string} collectionName - اسم المجموعة
     * @param {string} docId - معرّف الوثيقة
     * @returns {Promise<Object|null>} الوثيقة أو null إذا لم تكن موجودة
     */
    async getDocument(collectionName, docId) {
        try {
            const docRef = this.firestore.doc(this.db, collectionName, docId);
            const docSnap = await this.firestore.getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error(`خطأ في الحصول على الوثيقة ${collectionName}/${docId}:`, error);
            throw error;
        }
    }

    /**
     * تعيين وثيقة في Firestore (إنشاء أو استبدال)
     * @param {string} collectionName - اسم المجموعة
     * @param {string} docId - معرّف الوثيقة
     * @param {Object} data - بيانات الوثيقة
     * @returns {Promise<void>}
     */
    async setDocument(collectionName, docId, data) {
        try {
            const docRef = this.firestore.doc(this.db, collectionName, docId);
            
            // إضافة طوابع زمنية
            const timestamp = new Date();
            const dataWithTimestamps = {
                ...data,
                updatedAt: timestamp
            };
            
            // إضافة createdAt فقط إذا كانت وثيقة جديدة
            const docSnap = await this.firestore.getDoc(docRef);
            if (!docSnap.exists()) {
                dataWithTimestamps.createdAt = timestamp;
            }
            
            await this.firestore.setDoc(docRef, dataWithTimestamps);
            return { id: docId, ...dataWithTimestamps };
        } catch (error) {
            console.error(`خطأ في تعيين الوثيقة ${collectionName}/${docId}:`, error);
            throw error;
        }
    }

    /**
     * تحديث وثيقة موجودة في Firestore
     * @param {string} collectionName - اسم المجموعة
     * @param {string} docId - معرّف الوثيقة
     * @param {Object} data - البيانات المراد تحديثها
     * @returns {Promise<void>}
     */
    async updateDocument(collectionName, docId, data) {
        try {
            const docRef = this.firestore.doc(this.db, collectionName, docId);
            
            // إضافة طابع زمني للتحديث
            const dataWithTimestamp = {
                ...data,
                updatedAt: new Date()
            };
            
            await this.firestore.updateDoc(docRef, dataWithTimestamp);
            return { id: docId, ...dataWithTimestamp };
        } catch (error) {
            console.error(`خطأ في تحديث الوثيقة ${collectionName}/${docId}:`, error);
            throw error;
        }
    }

    /**
     * إضافة وثيقة جديدة مع معرّف تلقائي
     * @param {string} collectionName - اسم المجموعة
     * @param {Object} data - بيانات الوثيقة
     * @returns {Promise<Object>} الوثيقة المضافة مع المعرّف
     */
    async addDocument(collectionName, data) {
        try {
            const collectionRef = this.firestore.collection(this.db, collectionName);
            
            // إضافة طوابع زمنية
            const timestamp = new Date();
            const dataWithTimestamps = {
                ...data,
                createdAt: timestamp,
                updatedAt: timestamp
            };
            
            const docRef = await this.firestore.addDoc(collectionRef, dataWithTimestamps);
            return { id: docRef.id, ...dataWithTimestamps };
        } catch (error) {
            console.error(`خطأ في إضافة وثيقة إلى ${collectionName}:`, error);
            throw error;
        }
    }

    /**
     * حذف وثيقة من Firestore
     * @param {string} collectionName - اسم المجموعة
     * @param {string} docId - معرّف الوثيقة
     * @returns {Promise<void>}
     */
    async deleteDocument(collectionName, docId) {
        try {
            const docRef = this.firestore.doc(this.db, collectionName, docId);
            await this.firestore.deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error(`خطأ في حذف الوثيقة ${collectionName}/${docId}:`, error);
            throw error;
        }
    }

    /**
     * استعلام عن وثائق في مجموعة
     * @param {string} collectionName - اسم المجموعة
     * @param {Array} conditions - مصفوفة من الشروط [{ field, operator, value }, ...]
     * @param {Object} orderByField - حقل الترتيب { field, direction }
     * @param {number} limitCount - الحد الأقصى للنتائج
     * @returns {Promise<Array>} مصفوفة من الوثائق المطابقة
     */
    async queryDocuments(collectionName, conditions = [], orderByField = null, limitCount = null) {
        try {
            const collectionRef = this.firestore.collection(this.db, collectionName);
            
            // بناء الاستعلام مع الشروط
            let queryRef = this.firestore.query(collectionRef);
            
            // إضافة الشروط
            if (conditions && conditions.length > 0) {
                conditions.forEach(condition => {
                    queryRef = this.firestore.query(
                        queryRef, 
                        this.firestore.where(condition.field, condition.operator, condition.value)
                    );
                });
            }
            
            // إضافة الترتيب
            if (orderByField) {
                queryRef = this.firestore.query(
                    queryRef, 
                    this.firestore.orderBy(orderByField.field, orderByField.direction || 'asc')
                );
            }
            
            // إضافة الحد
            if (limitCount) {
                queryRef = this.firestore.query(queryRef, this.firestore.limit(limitCount));
            }
            
            // تنفيذ الاستعلام
            const querySnapshot = await this.firestore.getDocs(queryRef);
            
            // تجميع النتائج
            const results = [];
            querySnapshot.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() });
            });
            
            return results;
        } catch (error) {
            console.error(`خطأ في استعلام ${collectionName}:`, error);
            throw error;
        }
    }

    /**
     * رفع ملف إلى Firebase Storage
     * @param {string} path - المسار في Storage
     * @param {File} file - كائن الملف
     * @returns {Promise<string>} رابط URL للملف المرفوع
     */
    async uploadFile(path, file) {
        try {
            const storageRef = this.firebaseStorage.ref(this.storage, path);
            await this.firebaseStorage.uploadBytes(storageRef, file);
            const downloadURL = await this.firebaseStorage.getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error(`خطأ في رفع الملف إلى ${path}:`, error);
            throw error;
        }
    }
}

// إنشاء نسخة واحدة من الخدمة للاستخدام في التطبيق بأكمله
const firebaseService = new FirebaseService();

export default firebaseService;