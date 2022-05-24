const truncateString = (lastMessage) => {
    var maxLength = 60;
    if (lastMessage.length < maxLength) return lastMessage;
    var trimmedString = lastMessage.substring(0, maxLength);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ...";
    return trimmedString;
}

export default truncateString;