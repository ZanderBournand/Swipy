export const truncateString = (lastMessage) => {
    var maxLength = 60;
    if (lastMessage.length < maxLength) return lastMessage;
    var trimmedString = lastMessage.substring(0, maxLength);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ...";
    return trimmedString;
}

export const getTrending = (uploads) => {

    let songs = (uploads.has('songs') ? uploads.get('songs') : [])
    let beats = (uploads.has('beats') ? uploads.get('beats') : [])
    let totalWork = songs.concat(beats)

    if (totalWork.length == 0) {
        return []
    }

    totalWork.sort((a, b) => {
        let aValue = a.interactionsCount * 0.5 + a.playsCount * 0.25 + a.likesCount * 0.25;
        let bValue = b.interactionsCount * 0.5 + b.playsCount * 0.25 + b.likesCount * 0.25;
        
        if (bValue > aValue) {
            return 1
        }
        else {
            return -1
        }
    })

    if (totalWork[0].interactionsCount == 0) {
        return []
    }
    else if (totalWork[1].interactionsCount == 0) {
        return totalWork.slice(0, 1)
    }
    else {
        return totalWork.slice(0, 2)
    }
}

export const getPopular = (uploads) => {

    let songs = (uploads.has('songs') ? uploads.get('songs') : [])
    let beats = (uploads.has('beats') ? uploads.get('beats') : [])
    let totalWork = songs.concat(beats)

    if (totalWork.length == 0) {
        return []
    }

    totalWork.sort((a, b) => {
        let aValue = a.interactionsCount * 0.5 + a.playsCount * 0.25 + a.likesCount * 0.25;
        let bValue = b.interactionsCount * 0.5 + b.playsCount * 0.25 + b.likesCount * 0.25;
        
        if (bValue > aValue) {
            return 1
        }
        else {
            return -1
        }
    })

    if (totalWork[0].interactionsCount == 0) {
        return []
    }
    else if (totalWork[1].interactionsCount == 0) {
        return totalWork.slice(0, 1)
    }
    else if (totalWork[2].interactionsCount == 0) {
        return totalWork.slice(0, 2)
    }
    else if (totalWork[3].interactionsCount == 0) {
        return totalWork.slice(0, 3)
    }
    else if (totalWork[4].interactionsCount == 0) {
        return totalWork.slice(0, 4)
    }
    else {
        return totalWork.slice(0, 5)
    }
}

export const getPreview = (uploads) => {

    let songs = (uploads.has('songs') ? uploads.get('songs') : [])
    let beats = (uploads.has('beats') ? uploads.get('beats') : [])
    let totalWork = songs.concat(beats)

    if (totalWork.length == 0) {
        return []
    }

    totalWork.sort((a, b) => {
        let tempA = new Date(a.creation.seconds * 1000)
        let tempB = new Date(b.creation.seconds * 1000)

        if (tempA > tempB) {
            return 1
        }
        else {
            return -1
        }
    })

    if (totalWork.length > 10) {
        return totalWork.slice(0, 10)
    }
    else {
        return totalWork
    }
}

export const dateFormat = (date) => {
    let newDate = ""

    switch (date.substring(5, 7)) {
        case "01":
            newDate += "Jan "
            break;
        case "02":
            newDate += "Feb "
            break;
        case "03":
            newDate += "Mar "
            break;
        case "04":
            newDate += "Apr "
            break;
        case "05":
            newDate += "May "
            break;
        case "06":
            newDate += "Jun "
            break;
        case "07":
            newDate += "Jul "
            break;
        case "08":
            newDate += "Aug "
            break;
        case "09":
            newDate += "Sep "
            break;
        case "10":
            newDate += "Oct "
            break;
        case "11":
            newDate += "Nov "
            break;
        case "12":
            newDate += "Dec "
            break;
    }

    if (date.charAt(8) == '0') {
        newDate += date.substring(9, 10)
    }
    else {
        newDate += date.substring(8, 10)
    }

    newDate += ", "
    newDate += date.substring(0, 4)
    
    return newDate
}

export const sortUploads = (uploads) => {

    let songs = (uploads.has('songs') ? uploads.get('songs') : [])
    let beats = (uploads.has('beats') ? uploads.get('beats') : [])

    songs.sort((a, b) => {
        let aValue = a.interactionsCount * 0.5 + a.playsCount * 0.25 + a.likesCount * 0.25;
        let bValue = b.interactionsCount * 0.5 + b.playsCount * 0.25 + b.likesCount * 0.25;
        
        if (bValue > aValue) {
            return 1
        }
        else {
            return -1
        }
    })

    beats.sort((a, b) => {
        let aValue = a.interactionsCount * 0.5 + a.playsCount * 0.25 + a.likesCount * 0.25;
        let bValue = b.interactionsCount * 0.5 + b.playsCount * 0.25 + b.likesCount * 0.25;
        
        if (bValue > aValue) {
            return 1
        }
        else {
            return -1
        }
    })

    uploads.set('songs', songs)
    uploads.set('beats', beats)

    return uploads;
}

export const getStats = (uploads) => {
    let songs = (uploads.has('songs') ? uploads.get('songs') : [])
    let beats = (uploads.has('beats') ? uploads.get('beats') : [])
    let totalWork = songs.concat(beats)

    if (totalWork.length == 0) {
        return []
    }

    let views = 0;
    let connections = 0;
    
    for (let i = 0; i < totalWork.length; i++) {
        views += totalWork[i].playsCount
        connections += totalWork[i].interactionsCount
    }

    let newViews = Math.abs(views) > 999 ? Math.sign(views) * ((Math.abs(views) / 1000).toFixed(1)) + 'k' : Math.sign(views) * Math.abs(views)

    return new Array(newViews, connections)
}
