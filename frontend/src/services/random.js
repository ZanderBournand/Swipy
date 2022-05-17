import firebase from 'firebase'
require('firebase/firebase-storage')


export const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
    
    const fileRef = firebase.storage().ref().child(path)

    const contentSpecs = (media.substr(media.length - 3) === "mov") ? 
        {contentType: 'video/quicktime', contentDisposition: ''} 
        :
        {} 

    fetch(media)
        .then(response => response.blob())
        .then(blob => fileRef.put(blob, contentSpecs))
        .then(task => task.ref.getDownloadURL())
        .then(downloadUrl => resolve(downloadUrl))
        .catch(() => reject())
})