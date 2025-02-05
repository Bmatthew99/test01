const serviceAccount = require('./firebase/serviceAccount.json');
const admin = require("firebase-admin");
module.exports = {
    firebaseConfig: {
        apiKey: "AIzaSyCoWahVxMHDM7Lhn-fNWxJBFyy3G9GJZMg",
        authDomain: "node-251406.firebaseapp.com",
        databaseURL: "https://node-251406.firebaseio.com",
        projectId: "node-251406",
        storageBucket: "node-251406.appspot.com",
        messagingSenderId: "97014998587",
        appId: "1:97014998587:web:118f584bd583d5f9bb9e1e",
        measurementId: "G-Y15LQ0VBJ1"
    },
    adminConfig:{
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://node-251406.firebaseio.com",
        storageBucket: "node-251406.appspot.com"
    }
}