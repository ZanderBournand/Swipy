const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore()

exports.newUser = functions.auth.user().onCreate((user) => {
    return db
        .collection("user")
        .doc(user.uid)
        .set({
            email: user.email,
            uid: user.uid,
            photoURL: null,
            displayName: null,
        })
})