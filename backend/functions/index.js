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
            workCount: 0,
            connections: 0,
        })
})

exports.likeCreateNew = functions.firestore.document('uploads/{uid1}/{type}/{id}/likes/{uid2}').onCreate((_, context) => {
    let updateObj = {
        likesCount: admin.firestore.FieldValue.increment(1) 
    }
    return db
        .collection("uploads")
        .doc(context.params.uid1)
        .collection(context.params.type)
        .doc(context.params.id)
        .update(updateObj)
})

exports.likeDeleteNew = functions.firestore.document('uploads/{uid1}/{type}/{id}/likes/{uid2}').onDelete((_, context) => {
    let updateObj = {
        likesCount: admin.firestore.FieldValue.increment(-1) 
    }
    return db
        .collection("uploads")
        .doc(context.params.uid1)
        .collection(context.params.type)
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

exports.workDeleted = functions.firestore.document('uploads/{uid}/{type}/{id}').onDelete((_, context) => {
    let updateObj = {
        workCount: admin.firestore.FieldValue.increment(-1)
    }
    return db
        .collection("user")
        .doc(context.params.uid)
        .update(updateObj)
})

exports.interactionCreated = functions.firestore.document('user/{uid}/connections/{uid2}').onCreate((snap, context) => {
    let data = snap.data()
    
    let updateObj = {
        interactionsCount: admin.firestore.FieldValue.increment(1)
    }

    if (data.status == 'sent' && data.track.id != 'n/a') {
        return db
            .collection('uploads')
            .doc(data.track.creator)
            .collection(data.track.type + "s")
            .doc(data.track.id)
            .update(updateObj)
    }
    else {
        return
    }
})

exports.connectionCreated = functions.firestore.document('user/{uid}/connections/{uid2}').onUpdate((change, context) => {
    let data = change.after.data()

    let updateObj = {
        connections: admin.firestore.FieldValue.increment(1)
    }

    if (data.status == 'complete') {
        return db
            .collection('user')
            .doc(context.params.uid)
            .update(updateObj)
    }
})

exports.connectionDeleted= functions.firestore.document('user/{uid}/connections/{uid2}').onDelete((snap, context) => {
    let data = snap.data()

    let updateObj = {
        connections: admin.firestore.FieldValue.increment(-1)
    }

    if (data.status == 'complete') {
        return db
            .collection('user')
            .doc(context.params.uid)
            .update(updateObj)
    }
})