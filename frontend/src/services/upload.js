import { saveMediaToStorage } from './random'
import firebase from 'firebase'
import uuid from 'uuid-random'
require('firebase/firebase-auth')
require('firebase/firestore')

export const createUpload = (type, title, audio, video, artwork) => new Promise((resolve, reject) => {

    let storageUploadId = uuid()
    let allSavePromises = null

    if (video == null) {
        allSavePromises = Promise.all([
            saveMediaToStorage(audio,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/audio`),
            saveMediaToStorage(artwork,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/artwork`),
        ])
        allSavePromises
            .then((media) => {
                firebase.firestore()
                    .collection("uploads")
                    .doc(type+"s")
                    .collection(firebase.auth().currentUser.uid)
                    .add({
                        creator: firebase.auth().currentUser.uid,
                        media: {
                            audio: media[0],
                            artwork: media[1]
                        },
                        title: title,
                        likesCount: 0,
                        commentsCount: 0,
                        interactionsCount: 0,
                        creation: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => resolve())
                    .catch(() => reject())
            })
            .catch(() => reject())
    }
    else {
        allSavePromises = Promise.all([
            saveMediaToStorage(audio,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/audio`),
            saveMediaToStorage(artwork,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/artwork`),
            saveMediaToStorage(video,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/video`)
        ])
        allSavePromises
        .then((media) => {
            firebase.firestore()
                .collection("uploads")
                .doc(type+"s")
                .collection(firebase.auth().currentUser.uid)
                .add({
                    creator: firebase.auth().currentUser.uid,
                    media: {
                        audio: media[0],
                        artwork: media[1],
                        video: media[2]
                    },
                    title: title,
                    likesCount: 0,
                    commentsCount: 0,
                    interactionsCount: 0,
                    creation: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => resolve())
                .catch(() => reject())
        })
        .catch(() => reject())
    }

})