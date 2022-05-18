import firebase from 'firebase'

export const getFeed = () => new Promise((resolve, reject) => {
    firebase
    .firestore()
    .collection('post')
    .get()
    .then((res) => {
        const posts = res.docs.map((value) => {
            const id = value.id;
            const data = value.data();
            return {id, ...data}
        })
        resolve(posts)
    })
})

export const getLikeById = (postId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("post")
      .doc(postId)
      .collection("likes")
      .doc(uid)
      .get()
      .then((res) => resolve(res.exists));
  });

export const updateLike = (postId, uid, currentLikeState) => {
    if (currentLikeState) {
      firebase
        .firestore()
        .collection("post")
        .doc(postId)
        .collection("likes")
        .doc(uid)
        .delete();
    } else {
      firebase
        .firestore()
        .collection("post")
        .doc(postId)
        .collection("likes")
        .doc(uid)
        .set({});
    }
  };