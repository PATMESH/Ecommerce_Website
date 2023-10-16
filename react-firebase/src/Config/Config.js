    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';
    import 'firebase/compat/storage';

    const firebaseConfig = {
        apiKey: "AIzaSyBvuhtnbr-Z77O9RV_VQWwVxErTHmikL68",
        authDomain: "e-commerce-d563b.firebaseapp.com",
        projectId: "e-commerce-d563b",
        storageBucket: "e-commerce-d563b.appspot.com",
        messagingSenderId: "866078106383",
        appId: "1:866078106383:web:26139a64a9bb1e3566d47a",
        measurementId: "G-F5KEBETS93"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();

    export { auth, db, storage };
