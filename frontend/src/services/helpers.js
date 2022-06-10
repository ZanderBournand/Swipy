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