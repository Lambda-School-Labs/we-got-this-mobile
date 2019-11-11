import Firebase from '../../config/firebase';
const db = Firebase.getFirestore();

export const service = {
    async addCustomer(customer) {
        let docRef = db.collection('customers').add({
            ...customer,
        });

        let data = await docRef.get();

        return data;
    },

    async getAllCustomers(accountId) {
        let customers = [];

        let querySnapshot = await db
            .collection('customers')
            .where('accountId', '==', accountId)
            .get();

        querySnapshot.forEach(doc => {
            console.log('Document: ', doc);
            let docRef = doc.id;
            customers.push({ docRef, ...doc.data() });
        });

        return customers;
    },
};
