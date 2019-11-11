import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    //
    //GET OR CREATE CURRENT USER
    async getOrCreateCurrentUser(authUser) {
        let { email, displayName, photoURL } = authUser;

        let currentUser;
        let querySnapshot = await db
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!querySnapshot.empty) {
            console.log('Got Current User');
            querySnapshot.forEach(doc => {
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        } else {
            console.log('No User found, creating a new one!');
            //Create a new user
            let docRef = await db.collection('users').add({
                email,
                displayName,
                photoURL,
            });

            docRef.get().then(doc => {
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        }
        return currentUser;
    },

    //
    //UPDATE CURRENT USER
    async updateCurrentUser(updateUserInfo) {
        let docRef = await db
            .collection('users')
            .doc(`${updateUserInfo.docRef}`)
            .put({
                ...updateUserInfo,
            });

        let updatedUser = null;
        docRef.get().then(doc => {
            let docRef = doc.id;
            updatedUser = { docRef, ...doc.data() };
        });

        return updatedUser;
    },
};
