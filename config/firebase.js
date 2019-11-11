import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    development: {
        apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
        authDomain: 'we-got-this-d3ae2.firebaseapp.com',
        databaseURL: 'https://we-got-this-d3ae2.firebaseio.com',
        projectId: 'we-got-this-d3ae2',
        storageBucket: 'we-got-this-d3ae2.appspot.com',
        messagingSenderId: '566987245774',
        appId: '1:566987245774:web:7c72786ff32c9283a4e89f',
        clientId:
            '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
        measurementId: 'G-2KGS348CCJ',
    },
}[process.env.NODE_ENV || 'development'];

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        //firebase.analytics();
        this.auth = firebase.auth();
        this.firestore = firebase.firestore;
        console.log('Initialized Firebase App');
    }

    onAuthStateChanged(callbackSuccess, callbackFailure) {
        return firebase
            .auth()
            .onAuthStateChanged(callbackSuccess, callbackFailure);
    }

    getStorageRef() {
        return firebase.storage().ref();
    }

    getFirestore() {
        return firebase.firestore();
    }

    signInWithRedirect(callbackSuccess, callbackFailure) {
        let provider = new firebase.auth.GoogleAuthProvider();
        return firebase
            .auth()
            .signInWithRedirect(provider)
            .then(callbackSuccess)
            .catch(callbackFailure);
    }

    signInWithCredential(credentials) {
        return this.auth.signInWithCredential(credentials);
    }

    signOut() {
        this.auth.signOut();
    }
}

const Fire = new Firebase();

export default Fire;
