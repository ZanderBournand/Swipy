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
                    track: upload
                })

            firebase.firestore()
                .collection('user')
                .doc(user2)
                .collection('connections')
                .doc(user1)
                .set({
                    status: "waiting",
                    user: user1,
                    track: upload
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