var admin = require("firebase-admin");
var firebase = require('firebase');
const config = require('../config/firebase.js');

firebase.initializeApp(config.firebaseConfig);
admin.initializeApp(config.adminConfig);

module.exports = { admin, firebase };