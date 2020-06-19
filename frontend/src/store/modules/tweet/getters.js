import moment from 'moment';

export default {
    tweetsSortedByCreatedDate: state => Object.values(state.tweets).sort(
        (a, b) => (
            moment(b.created) - moment(a.created)
        )
    ),    

    tweetsSortedByCreatedDateDecs: state => Object.values(state.tweets).sort(
        (a, b) => (
            moment(b.created) - moment(a.created)
        )
    ).slice().reverse(),

    tweetsSortedByLikesCount: state => Object.values(state.tweets).sort(
        (a, b) => (
            b.likesCount - a.likesCount
        )
    ),

    getTweetById: state => id => state.tweets[id],

    getAllTweetLikedByUserId: state => id => Object.values(state.tweets).filter(
        (tweet) => tweet.likes.find((like) => like.userId === id)
    ),

    isTweetOwner: (state, getters) => (tweetId, userId) => getters.getTweetById(tweetId).author.id === userId,

    tweetIsLikedByUser: (state, getters) => (tweetId, userId) => getters
        .getTweetById(tweetId)
        .likes
        .find(like => like.userId === userId) !== undefined,

};
