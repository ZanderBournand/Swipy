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
            workCount: 0
        })
})

exports.likeCreate = functions.firestore.document('post/{id}/{type}/{uid}').onCreate((_, context) => {
    let updateObj = {}
    if(context.params.type == 'comments'){
        updateObj={
            commentsCount: admin.firestore.FieldValue.increment(1) 
        }
    }
    if(context.params.type == 'likes'){
        updateObj={
            likesCount: admin.firestore.FieldValue.increment(1) 
        }
    }
    return db
        .collection("post")
        .doc(context.params.id)
        .update(updateObj)
})

exports.likeDelete = functions.firestore.document('post/{id}/{type}/{uid}').onDelete((_, context) => {
    let updateObj = {}
    if(context.params.type == 'comments'){
        updateObj={
            commentsCount: admin.firestore.FieldValue.increment(-1) 
        }
    }
    if(context.params.type == 'likes'){
        updateObj={
            likesCount: admin.firestore.FieldValue.increment(-1) 
        }
    }
    return db
        .collection("post")
        .doc(context.params.id)
        .update(updateObj)
})

exports.workCreated = functions.firestore.document('uploads/{uid}/{type}/{id}').onCreate((_, context) => {
    let updateObj = {
        workCount: admin.firestore.FieldValue.increment(1)
    }
    return db
        .collection("user")
        .doc(context.params.uid)
        .update(updateObj)
})