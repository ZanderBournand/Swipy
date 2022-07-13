import { saveMediaToStorage } from './random'
import firebase from 'firebase'
import uuid from 'uuid-random'
require('firebase/firebase-auth')
require('firebase/firestore')

export const sendConnectRequest = (user1, user2, upload) => {

    if (user1 == null || user2 == null || upload == null) {
        return;
    }

    checkConnectStatus(user1, user2).then((res) => {

        if (res == null) {
            return;
        }
        else if (res[0] == true && res[1].status != 'waiting') {
            console.log("cant send another request, current status: ", res[1].status)
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

}

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

const generateID = (id1, id2) => {
    if (id1 > id2) {
        return id1 + id2;
    }
    else {
        return id2 + id1;
    }
}

export const createConnection = (user, invite) => {

    if (user == null || invite == null) {
        return
    }

    firebase.firestore()
        .collection('user')
        .doc(user)
        .collection('connections')
        .doc(invite.user)
        .update({
            status: 'complete',
            connectID: generateID(user, invite.user)
        });

    firebase.firestore()
        .collection('user')
        .doc(invite.user)
        .collection('connections')
        .doc(user)
        .update({
            status: 'complete',
            connectID: generateID(user, invite.user)
        });


    firebase.firestore()
        .collection('connects')
        .doc(generateID(user, invite.user))
        .set({
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessage: 'Send a first message',
            members: [user, invite.user]
        })
}

