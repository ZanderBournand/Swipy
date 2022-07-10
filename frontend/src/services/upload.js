import { saveMediaToStorage } from './random'
import firebase from 'firebase'
import uuid from 'uuid-random'
require('firebase/firebase-auth')
require('firebase/firestore')

export const createUpload = (type, title, audio, video, artwork) => new Promise((resolve, reject) => {

    let storageUploadId = uuid()
    let allSavePromises = null

    let r1 = Math.floor(Math.random() * (10000 - 0) + 0);
    let r2 = Math.floor(Math.random() * (10000 - 0) + 0);
    let r3 = Math.floor(Math.random() * (10000 - 0) + 0);

    const userDoc = firebase.firestore().collection('uploads').doc(firebase.auth().currentUser.uid);
    userDoc.get()
    .then((docSnapshot) => {
        if(!docSnapshot.exists) {
            userDoc.set({
                uid: firebase.auth().currentUser.uid
            })
        }
    })

    if (video == null) {
        allSavePromises = Promise.all([
            saveMediaToStorage(audio,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/audio`),
            saveMediaToStorage(artwork,`uploads/${firebase.auth().currentUser.uid}/${type+"s"}/${storageUploadId}/artwork`),
        ])
        allSavePromises
            .then((media) => {
                firebase.firestore()
                    .collection("uploads")
                    .doc(firebase.auth().currentUser.uid)
                    .collection(type+"s")
                    .add({
                        creator: firebase.auth().currentUser.uid,
                        media: {
                            audio: media[0],
                            artwork: media[1]
                        },
                        random: {
                            1: r1,
                            2: r2,
                            3: r3
                        },
                        title: title,
                        type: type,
                        playsCount: 0,
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
                .doc(firebase.auth().currentUser.uid)
                .collection(type+"s")
                .add({
                    creator: firebase.auth().currentUser.uid,
                    media: {
                        audio: media[0],
                        artwork: media[1],
                        video: media[2]
                    },
                    random: {
                        1: r1,
                        2: r2,
                        3: r3
                    },
                    title: title,
                    type: type,
                    playsCount: 0,
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

export const getSongsByUserId = (uid = firebase.auth().currentUser?.uid) => new Promise((resolve, reject) => {

    let direction = Math.floor(Math.random() * (3 - 1) + 1);
    let randomIndex = Math.floor(Math.random() * (4 - 1) + 1);
    let randomOrderValue = Math.floor(Math.random() * (10000 - 0) + 0);

    if (direction == 1) {
        firebase
        .firestore()
        .collection('uploads')
        .doc(uid)
        .collection("songs")
        .where("random." + randomIndex.toString(), "<=", randomOrderValue)
        .orderBy("random." + randomIndex.toString(), "desc")
        .limit(3)
        .get()
        .then((res) => {
            let songs = res.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })

            if (songs.length < 3) {
                firebase
                .firestore()
                .collection('uploads')
                .doc(uid)
                .collection("songs")
                .where("random." + randomIndex.toString(), ">=", randomOrderValue)
                .orderBy("random." + randomIndex.toString())
                .limit(3 - songs.length)
                .get()
                .then((res) => {
                    let songs2 = res.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return {id, ...data}
                    })
                    let songsTotal = songs.concat(songs2)
                    resolve(songsTotal)
                })

            }

            else {
                resolve(songs)
            }
        })
    }
    else {
        firebase
        .firestore()
        .collection('uploads')
        .doc(uid)
        .collection("songs")
        .where("random." + randomIndex.toString(), ">=", randomOrderValue)
        .orderBy("random." + randomIndex.toString())
        .limit(3)
        .get()
        .then((res) => {
            let songs = res.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })

            if (songs.length < 3) {
                firebase
                .firestore()
                .collection('uploads')
                .doc(uid)
                .collection("songs")
                .where("random." + randomIndex.toString(), "<=", randomOrderValue)
                .orderBy("random." + randomIndex.toString(), "desc")
                .limit(3 - songs.length)
                .get()
                .then((res) => {
                    let songs2 = res.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return {id, ...data}
                    })
                    let songsTotal = songs.concat(songs2)
                    resolve(songsTotal)
                })

            }

            else {
                resolve(songs)
            }
        })
    }
})

export const getBeatsByUserId = (uid = firebase.auth().currentUser?.uid) => new Promise((resolve, reject) => {

    let direction = Math.floor(Math.random() * (3 - 1) + 1);
    let randomIndex = Math.floor(Math.random() * (4 - 1) + 1);
    let randomOrderValue = Math.floor(Math.random() * (10000 - 0) + 0);

    if (direction == 1) {
        firebase
        .firestore()
        .collection('uploads')
        .doc(uid)
        .collection("beats")
        .where("random." + randomIndex.toString(), "<=", randomOrderValue)
        .orderBy("random." + randomIndex.toString(), "desc")
        .limit(3)
        .get()
        .then((res) => {
            let beats = res.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })

            if (beats.length < 3) {
                firebase
                .firestore()
                .collection('uploads')
                .doc(uid)
                .collection("beats")
                .where("random." + randomIndex.toString(), ">=", randomOrderValue)
                .orderBy("random." + randomIndex.toString())
                .limit(3 - beats.length)
                .get()
                .then((res) => {
                    let beats2 = res.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return {id, ...data}
                    })
                    let beatsTotal = beats.concat(beats2)
                    resolve(beatsTotal)
                })

            }

            else {
                resolve(beats)
            }
        })
    }
    else {
        firebase
        .firestore()
        .collection('uploads')
        .doc(uid)
        .collection("beats")
        .where("random." + randomIndex.toString(), ">=", randomOrderValue)
        .orderBy("random." + randomIndex.toString())
        .limit(3)
        .get()
        .then((res) => {
            let beats = res.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {id, ...data}
            })

            if (beats.length < 3) {
                firebase
                .firestore()
                .collection('uploads')
                .doc(uid)
                .collection("beats")
                .where("random." + randomIndex.toString(), "<=", randomOrderValue)
                .orderBy("random." + randomIndex.toString(), "desc")
                .limit(3 - beats.length)
                .get()
                .then((res) => {
                    let beats2 = res.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return {id, ...data}
                    })
                    let beatsTotal = beats.concat(beats2)
                    resolve(beatsTotal)
                })

            }

            else {
                resolve(beats)
            }
        })
    }
})

export const getSongs = () => new Promise((resolve, reject) => {

    const songs = []

    firebase
    .firestore()
    .collection('uploads')
    .get()
    .then((res) => {
        const populate = async () => {
            for (const item of res.docs) {
                let songsOfUser = await getSongsByUserId(item.id)
                songs.push({
                    user: item.id,
                    work: songsOfUser
                })
            }
            resolve(songs)
        }
        populate()
    })
})

export const getBeats = () => new Promise((resolve, reject) => {

    const beats = [];

    firebase
    .firestore()
    .collection('uploads')
    .get()
    .then((res) => {
        const populate = async () => {
            for (const item of res.docs) {
                let beatsOfUser = await getBeatsByUserId(item.id)
                beats.push({
                    user: item.id,
                    work: beatsOfUser
                })
            }
            resolve(beats)
        }
        populate()
    })
})

export const getAllUploadsByUserId = (uid = firebase.auth().currentUser?.uid) => new Promise((resolve, reject) => {

    const uploads = new Map();
    
    firebase.firestore()
        .collection('uploads')
        .doc(uid)
        .collection('songs')
        .get()
        .then((res) => {
            const songs = res.docs.map((value) => {
                const id = value.id;
                const data = value.data();
                return {id, ...data}
            })
            uploads.set("songs", songs)
        })
    firebase.firestore()
        .collection('uploads')
        .doc(uid)
        .collection('beats')
        .get()
        .then((res) => {
            const beats = res.docs.map((value) => {
                const id = value.id;
                const data = value.data();
                return {id, ...data}
            })
            uploads.set("beats", beats)
            resolve(uploads)
        })
})

export const getLikeByUpload = (upload, uid) =>

  new Promise((resolve, reject) => {

    if (upload == null) {
        reject()
    }

    firebase.firestore()
      .collection("uploads")
      .doc(upload.creator)
      .collection(upload.type + "s")
      .doc(upload.id)
      .collection('likes')
      .doc(uid)
      .get()
      .then((res) => resolve(res.exists));
});

export const updateLike = (upload, uid, currentLikeState) => {

    if (upload == null) {
        return;
    }

    if (currentLikeState) {
        firebase.firestore()
            .collection("uploads")
            .doc(upload.creator)
            .collection(upload.type + "s")
            .doc(upload.id)
            .collection('likes')
            .doc(uid)
            .delete();
    } else {
        firebase.firestore()
            .collection("uploads")
            .doc(upload.creator)
            .collection(upload.type + "s")
            .doc(upload.id)
            .collection('likes')
            .doc(uid)
            .set({});
}};



