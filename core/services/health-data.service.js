/**
 * خدمة إدارة البيانات الصحية للمستخدم
 * تدير جميع البيانات الصحية مثل القياسات والتحاليل والأدوية
 */

import firebaseService from './firebase.service.js';
import authService from './auth.service.js';

class HealthDataService {
    constructor() {
        // التحقق من أن المستخدم مسجل الدخول
        this.currentUserId = null;
        
        // الاستماع لتغييرات حالة المصادقة
        authService.addAuthStateListener((user) => {
            this.currentUserId = user ? user.uid : null;
        });
    }

    /**
     * التأكد من وجود مستخدم مسجل الدخول
     * @private
     */
    _ensureAuthenticated() {
        if (!this.currentUserId) {
            throw new Error('يجب تسجيل الدخول لإجراء هذه العملية');
        }
    }

    // ==================== القياسات الصحية ====================

    /**
     * إضافة قياس صحي جديد
     * @param {Object} measurementData - بيانات القياس
     * @returns {Promise<Object>} القياس المضاف
     */
    async addMeasurement(measurementData) {
        try {
            this._ensureAuthenticated();
            
            const data = {
                ...measurementData,
                userId: this.currentUserId,
                timestamp: new Date(),
                date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
            };
            
            return await firebaseService.addDocument('measurements', data);
        } catch (error) {
            console.error('خطأ في إضافة قياس:', error);
            throw error;
        }
    }

    /**
     * الحصول على قياسات المستخدم حسب النوع
     * @param {string} type - نوع القياس (weight, bloodPressure, bloodSugar, etc.)
     * @param {number} limit - عدد النتائج (اختياري)
     * @returns {Promise<Array>} مصفوفة من القياسات
     */
    async getMeasurements(type, limit = 10) {
        try {
            this._ensureAuthenticated();
            
            return await firebaseService.queryDocuments(
                'measurements',
                [
                    { field: 'userId', operator: '==', value: this.currentUserId },
                    { field: 'type', operator: '==', value: type }
                ],
                { field: 'timestamp', direction: 'desc' },
                limit
            );
        } catch (error) {
            console.error(`خطأ في الحصول على قياسات ${type}:`, error);
            throw error;
        }
    }

    /**
     * الحصول على آخر قياس من نوع معين
     * @param {string} type - نوع القياس
     * @returns {Promise<Object|null>} آخر قياس أو null إذا لم يكن هناك قياسات
     */
    async getLatestMeasurement(type) {
        try {
            const measurements = await this.getMeasurements(type, 1);
            return measurements.length > 0 ? measurements[0] : null;
        } catch (error) {
            console.error(`خطأ في الحصول على آخر قياس ${type}:`, error);
            throw error;
        }
    }

    /**
     * الحصول على قياسات المستخدم في فترة زمنية محددة
     * @param {string} type - نوع القياس
     * @param {Date} startDate - تاريخ البداية
     * @param {Date} endDate - تاريخ النهاية
     * @returns {Promise<Array>} مصفوفة من القياسات
     */
    async getMeasurementsInPeriod(type, startDate, endDate) {
        try {
            this._ensureAuthenticated();
            
            // تحويل التواريخ إلى سلاسل نصية بتنسيق YYYY-MM-DD
            const startDateStr = startDate.toISOString().split('T')[0];
            const endDateStr = endDate.toISOString().split('T')[0];
            
            // الحصول على جميع قياسات المستخدم من النوع المحدد
            const allMeasurements = await firebaseService.queryDocuments(
                'measurements',
                [
                    { field: 'userId', operator: '==', value: this.currentUserId },
                    { field: 'type', operator: '==', value: type },
                    { field: 'date', operator: '>=', value: startDateStr },
                    { field: 'date', operator: '<=', value: endDateStr }
                ],
                { field: 'timestamp', direction: 'asc' }
            );
            
            return allMeasurements;
        } catch (error) {
            console.error(`خطأ في الحصول على قياسات ${type} في الفترة المحددة:`, error);
            throw error;
        }
    }

    /**
     * حذف قياس
     * @param {string} measurementId - معرّف القياس
     * @returns {Promise<boolean>} نجاح العملية
     */
    async deleteMeasurement(measurementId) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن القياس ينتمي للمستخدم الحالي
            const measurement = await firebaseService.getDocument('measurements', measurementId);
            
            if (!measurement) {
                throw new Error('القياس غير موجود');
            }
            
            if (measurement.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لحذف هذا القياس');
            }
            
            return await firebaseService.deleteDocument('measurements', measurementId);
        } catch (error) {
            console.error('خطأ في حذف القياس:', error);
            throw error;
        }
    }

    // ==================== التحاليل الطبية ====================

    /**
     * إضافة نتيجة تحليل طبي
     * @param {Object} testData - بيانات التحليل
     * @returns {Promise<Object>} التحليل المضاف
     */
    async addMedicalTest(testData) {
        try {
            this._ensureAuthenticated();
            
            const data = {
                ...testData,
                userId: this.currentUserId,
                timestamp: new Date(),
                date: testData.date || new Date().toISOString().split('T')[0]
            };
            
            return await firebaseService.addDocument('medicalTests', data);
        } catch (error) {
            console.error('خطأ في إضافة تحليل طبي:', error);
            throw error;
        }
    }

    /**
     * الحصول على التحاليل الطبية للمستخدم
     * @param {number} limit - عدد النتائج (اختياري)
     * @returns {Promise<Array>} مصفوفة من التحاليل
     */
    async getMedicalTests(limit = 10) {
        try {
            this._ensureAuthenticated();
            
            return await firebaseService.queryDocuments(
                'medicalTests',
                [
                    { field: 'userId', operator: '==', value: this.currentUserId }
                ],
                { field: 'date', direction: 'desc' },
                limit
            );
        } catch (error) {
            console.error('خطأ في الحصول على التحاليل الطبية:', error);
            throw error;
        }
    }

    /**
     * الحصول على تحليل طبي محدد
     * @param {string} testId - معرّف التحليل
     * @returns {Promise<Object|null>} التحليل أو null إذا لم يكن موجودًا
     */
    async getMedicalTest(testId) {
        try {
            this._ensureAuthenticated();
            
            const test = await firebaseService.getDocument('medicalTests', testId);
            
            if (!test || test.userId !== this.currentUserId) {
                return null;
            }
            
            return test;
        } catch (error) {
            console.error('خطأ في الحصول على التحليل الطبي:', error);
            throw error;
        }
    }

    /**
     * تحديث بيانات تحليل طبي
     * @param {string} testId - معرّف التحليل
     * @param {Object} testData - بيانات التحليل المحدثة
     * @returns {Promise<Object>} التحليل المحدث
     */
    async updateMedicalTest(testId, testData) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن التحليل ينتمي للمستخدم الحالي
            const test = await firebaseService.getDocument('medicalTests', testId);
            
            if (!test) {
                throw new Error('التحليل غير موجود');
            }
            
            if (test.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لتحديث هذا التحليل');
            }
            
            // حذف الحقول التي لا يجب تحديثها
            const { id, userId, timestamp, createdAt, ...updatableData } = testData;
            
            return await firebaseService.updateDocument('medicalTests', testId, updatableData);
        } catch (error) {
            console.error('خطأ في تحديث التحليل الطبي:', error);
            throw error;
        }
    }

    /**
     * حذف تحليل طبي
     * @param {string} testId - معرّف التحليل
     * @returns {Promise<boolean>} نجاح العملية
     */
    async deleteMedicalTest(testId) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن التحليل ينتمي للمستخدم الحالي
            const test = await firebaseService.getDocument('medicalTests', testId);
            
            if (!test) {
                throw new Error('التحليل غير موجود');
            }
            
            if (test.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لحذف هذا التحليل');
            }
            
            return await firebaseService.deleteDocument('medicalTests', testId);
        } catch (error) {
            console.error('خطأ في حذف التحليل الطبي:', error);
            throw error;
        }
    }

    // ==================== الأدوية والعلاجات ====================

    /**
     * إضافة دواء جديد للمستخدم
     * @param {Object} medicationData - بيانات الدواء
     * @returns {Promise<Object>} الدواء المضاف
     */
    async addMedication(medicationData) {
        try {
            this._ensureAuthenticated();
            
            const data = {
                ...medicationData,
                userId: this.currentUserId,
                timestamp: new Date(),
                active: true // الدواء نشط افتراضيًا
            };
            
            return await firebaseService.addDocument('medications', data);
        } catch (error) {
            console.error('خطأ في إضافة دواء:', error);
            throw error;
        }
    }

    /**
     * الحصول على الأدوية النشطة للمستخدم
     * @returns {Promise<Array>} مصفوفة من الأدوية
     */
    async getActiveMedications() {
        try {
            this._ensureAuthenticated();
            
            return await firebaseService.queryDocuments(
                'medications',
                [
                    { field: 'userId', operator: '==', value: this.currentUserId },
                    { field: 'active', operator: '==', value: true }
                ],
                { field: 'name', direction: 'asc' }
            );
        } catch (error) {
            console.error('خطأ في الحصول على الأدوية النشطة:', error);
            throw error;
        }
    }

    /**
     * تحديث معلومات دواء
     * @param {string} medicationId - معرّف الدواء
     * @param {Object} medicationData - بيانات الدواء المحدثة
     * @returns {Promise<Object>} الدواء المحدث
     */
    async updateMedication(medicationId, medicationData) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن الدواء ينتمي للمستخدم الحالي
            const medication = await firebaseService.getDocument('medications', medicationId);
            
            if (!medication) {
                throw new Error('الدواء غير موجود');
            }
            
            if (medication.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لتحديث هذا الدواء');
            }
            
            // حذف الحقول التي لا يجب تحديثها
            const { id, userId, timestamp, createdAt, ...updatableData } = medicationData;
            
            return await firebaseService.updateDocument('medications', medicationId, updatableData);
        } catch (error) {
            console.error('خطأ في تحديث الدواء:', error);
            throw error;
        }
    }

    /**
     * تعطيل دواء (بدلاً من حذفه)
     * @param {string} medicationId - معرّف الدواء
     * @returns {Promise<Object>} الدواء المحدث
     */
    async deactivateMedication(medicationId) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن الدواء ينتمي للمستخدم الحالي
            const medication = await firebaseService.getDocument('medications', medicationId);
            
            if (!medication) {
                throw new Error('الدواء غير موجود');
            }
            
            if (medication.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لتعطيل هذا الدواء');
            }
            
            return await firebaseService.updateDocument('medications', medicationId, { 
                active: false,
                endDate: new Date()
            });
        } catch (error) {
            console.error('خطأ في تعطيل الدواء:', error);
            throw error;
        }
    }

    // ==================== التذكيرات ====================

    /**
     * إضافة تذكير جديد
     * @param {Object} reminderData - بيانات التذكير
     * @returns {Promise<Object>} التذكير المضاف
     */
    async addReminder(reminderData) {
        try {
            this._ensureAuthenticated();
            
            const data = {
                ...reminderData,
                userId: this.currentUserId,
                timestamp: new Date(),
                active: true // التذكير نشط افتراضيًا
            };
            
            return await firebaseService.addDocument('reminders', data);
        } catch (error) {
            console.error('خطأ في إضافة تذكير:', error);
            throw error;
        }
    }

    /**
     * الحصول على تذكيرات اليوم
     * @returns {Promise<Array>} مصفوفة من التذكيرات
     */
    async getTodayReminders() {
        try {
            this._ensureAuthenticated();
            
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            
            return await firebaseService.queryDocuments(
                'reminders',
                [
                    { field: 'userId', operator: '==', value: this.currentUserId },
                    { field: 'active', operator: '==', value: true },
                    { field: 'date', operator: '==', value: today }
                ],
                { field: 'time', direction: 'asc' }
            );
        } catch (error) {
            console.error('خطأ في الحصول على تذكيرات اليوم:', error);
            throw error;
        }
    }

    /**
     * تحديث حالة تذكير (مكتمل أو غير مكتمل)
     * @param {string} reminderId - معرّف التذكير
     * @param {boolean} completed - حالة الاكتمال
     * @returns {Promise<Object>} التذكير المحدث
     */
    async updateReminderStatus(reminderId, completed) {
        try {
            this._ensureAuthenticated();
            
            // التحقق من أن التذكير ينتمي للمستخدم الحالي
            const reminder = await firebaseService.getDocument('reminders', reminderId);
            
            if (!reminder) {
                throw new Error('التذكير غير موجود');
            }
            
            if (reminder.userId !== this.currentUserId) {
                throw new Error('ليس لديك صلاحية لتحديث هذا التذكير');
            }
            
            return await firebaseService.updateDocument('reminders', reminderId, {
                completed,
                completedAt: completed ? new Date() : null
            });
        } catch (error) {
            console.error('خطأ في تحديث حالة التذكير:', error);
            throw error;
        }
    }

    // ==================== الملف الطبي ====================

    /**
     * الحصول على الملف الطبي للمستخدم
     * @returns {Promise<Object|null>} الملف الطبي أو null إذا لم يكن موجودًا
     */
    async getMedicalProfile() {
        try {
            this._ensureAuthenticated();
            
            return await firebaseService.getDocument('medicalProfiles', this.currentUserId);
        } catch (error) {
            console.error('خطأ في الحصول على الملف الطبي:', error);
            throw error;
        }
    }

    /**
     * إنشاء أو تحديث الملف الطبي للمستخدم
     * @param {Object} profileData - بيانات الملف الطبي
     * @returns {Promise<Object>} الملف الطبي المحدث
     */
    async updateMedicalProfile(profileData) {
        try {
            this._ensureAuthenticated();
            
            // الحصول على الملف الطبي الحالي إن وجد
            const existingProfile = await this.getMedicalProfile();
            
            // دمج البيانات الجديدة مع البيانات الحالية
            const newData = {
                ...(existingProfile || {}),
                ...profileData,
                userId: this.currentUserId
            };
            
            return await firebaseService.setDocument('medicalProfiles', this.currentUserId, newData);
        } catch (error) {
            console.error('خطأ في تحديث الملف الطبي:', error);
            throw error;
        }
    }

    /**
     * إضافة حالة طبية إلى الملف الطبي
     * @param {Object} conditionData - بيانات الحالة الطبية
     * @returns {Promise<Object>} الملف الطبي المحدث
     */
    async addMedicalCondition(conditionData) {
        try {
            this._ensureAuthenticated();
            
            // الحصول على الملف الطبي الحالي
            const profile = await this.getMedicalProfile() || { conditions: [] };
            
            // إضافة الحالة الطبية الجديدة
            const conditions = Array.isArray(profile.conditions) ? profile.conditions : [];
            conditions.push({
                ...conditionData,
                id: Date.now().toString(),
                addedAt: new Date()
            });
            
            // تحديث الملف الطبي
            return await this.updateMedicalProfile({ conditions });
        } catch (error) {
            console.error('خطأ في إضافة حالة طبية:', error);
            throw error;
        }
    }

    /**
     * إضافة حساسية إلى الملف الطبي
     * @param {Object} allergyData - بيانات الحساسية
     * @returns {Promise<Object>} الملف الطبي المحدث
     */
    async addAllergy(allergyData) {
        try {
            this._ensureAuthenticated();
            
            // الحصول على الملف الطبي الحالي
            const profile = await this.getMedicalProfile() || { allergies: [] };
            
            // إضافة الحساسية الجديدة
            const allergies = Array.isArray(profile.allergies) ? profile.allergies : [];
            allergies.push({
                ...allergyData,
                id: Date.now().toString(),
                addedAt: new Date()
            });
            
            // تحديث الملف الطبي
            return await this.updateMedicalProfile({ allergies });
        } catch (error) {
            console.error('خطأ في إضافة حساسية:', error);
            throw error;
        }
    }
}

// إنشاء نسخة واحدة من الخدمة للاستخدام في التطبيق بأكمله
const healthDataService = new HealthDataService();

export default healthDataService;