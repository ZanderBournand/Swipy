import { saveMediaToStorage } from './random'
import firebase from 'firebase'
import uuid from 'uuid-random'
require('firebase/firebase-auth')
require('firebase/firestore')

export const sendConnectRequest = (user1, user2, upload) => new Promise((resolve, reject) => {

    if (user1 == null || user2 == null || upload == null) {
        return;
    }

    checkConnectStatus(user1, user2).then((res) => {

        if (res == null) {
            return;
        }
        else if (res[0] == true && res[1].status != 'waiting') {
            resolve('sent')
        }
        else if (res[0] == true && res[1].status == 'waiting') {
            createConnection(user1, user2)
            resolve('complete')
        }
        else {
            firebase.firestore()
                .collection('user')
                .doc(user1)
                .collection('connections')
                .doc(user2)
                .set({
                    status: "sent",
                    user: user2,
                    track: upload,
                    creation: firebase.firestore.FieldValue.serverTimestamp()
                })

            firebase.firestore()
                .collection('user')
                .doc(user2)
                .collection('connections')
                .doc(user1)
                .set({
                    status: "waiting",
                    user: user1,
                    track: upload,
                    creation: firebase.firestore.FieldValue.serverTimestamp()
                })
                }

    })

})

export const checkConnectStatus = (user1, user2) => new Promise((resolve, reject) => {

    if (user1 == null || user2 == null) {
        resolve([])
    }

    firebase.firestore()
        .collection('user')
        .doc(user1)
        .collection('connections')
        .doc(user2)
        .get()
        .then((res) => {
            if (res.exists) {
                resolve([res.exists, res.data()])
            }
            else {
                resolve([res.exists, null])
            }
        })

})

export const checkConnected = (user1, user2) => new Promise((resolve, reject) => {

    if (user1 == null || user2 == null) {
        resolve([])
    }

    firebase.firestore()
        .collection('user')
        .doc(user1)
        .collection('connections')
        .doc(user2)
        .get()
        .then((res) => {
            if (res.exists) {
                if (res.data().status == 'complete') {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
            else {
                resolve(false)
            }
        })

})

export const getPendingConnects = (user) => new Promise((resolve, reject) => {

    if (user == null) {
        reject()
    }

    firebase.firestore()
        .collection('user')
        .doc(user)
        .collection('connections')
        .where('status', '==', 'waiting')
        .orderBy('creation', 'desc')
        .onSnapshot((snapshot) => {
            let connects = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })
            resolve(connects)
        })
})

export const deleteInvitation = (user, invite) =>  {
    
    if (user == null || invite == null) {
        return
    }

    firebase.firestore()
        .collection('user')
        .doc(user)
        .collection('connections')
        .doc(invite.user)
        .delete();

    firebase.firestore()
        .collection('user')
        .doc(invite.user)
        .collection('connections')
        .doc(user)
        .delete()

}

export const generateID = (id1, id2) => {
    if (id1 > id2) {
        return id1 + id2;
    }
    else {
        return id2 + id1;
    }
}

export const createConnection = (user, user2) => {

    if (user == null || user2 == null) {
        return
    }

    firebase.firestore()
        .collection('user')
        .doc(user)
        .collection('connections')
        .doc(user2)
        .update({
            status: 'complete',
            connectID: generateID(user, user2)
        });

    firebase.firestore()
        .collection('user')
        .doc(user2)
        .collection('connections')
        .doc(user)
        .update({
            status: 'complete',
            connectID: generateID(user, user2)
        });


    firebase.firestore()
        .collection('connects')
        .doc(generateID(user, user2))
        .set({
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessage: 'Send a first message!',
            members: [user, user2]
        })
}

export const connectsListener = (listener) => {
    firebase.firestore()
        .collection('connects')
        .where('members', 'array-contains', firebase.auth().currentUser.uid)
        .orderBy('lastUpdate', 'desc')
        .onSnapshot(listener)
}

export const messagesListener = (listener, connectId) => {
    firebase.firestore()
    .collection('connects')
    .doc(connectId)
    .collection('messages')
    .orderBy('creation', 'desc')
    .onSnapshot(listener)
}

export const sendMessage = (connectId, message) => {
    firebase.firestore()
    .collection('connects')
    .doc(connectId)
    .collection('messages')
    .add({
        creator: firebase.auth().currentUser.uid,
        message,
        creation: firebase.firestore.FieldValue.serverTimestamp()
    })
    firebase.firestore()
    .collection('connects')
    .doc(connectId)
    .update({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: message,
    })
}

export const useless = ({userId, otherUserId, isConnected}) => new Promise((resolve, reject) => {
    if (userId != null && otherUserId != null && isConnected != null) {
        resolve()
    }
    else {
        reject()
    }
})
