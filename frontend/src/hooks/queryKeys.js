export const keys = {
    user: (user) => ['user', user],
    userFollowing: (userId, otherUserId) => ['following', userId + otherUserId],
    userConnected: (userId, otherUserId) => ['connected', userId + otherUserId],
    posts: (userId) => ['posts', userId],
    uploads: (userId) => ['uploads', userId]
}