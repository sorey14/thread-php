<template>
    <nav class="level is-mobile">
        <div class="level-left">
            <b-tooltip label="Comments" animated>
                <a class="level-item auto-cursor">
                    <span
                        class="icon is-medium has-text-info"
                        :class="{
                            'has-text-danger': tweetIsLikedByUser(tweet.id, user.id)
                        }"
                    >
                        <font-awesome-icon icon="comments" />
                    </span>
                    {{ tweet.commentsCount }}
                </a>
            </b-tooltip>
            <b-tooltip label="Like" animated>
                <a class="level-item" @click="onLikeOrDislikeComment">
                    <span
                        class="icon is-medium has-text-info"
                        :class="{
                            'has-text-danger': tweetIsLikedByUser(tweet.id, user.id)
                        }"
                    >
                        <font-awesome-icon icon="heart" />
                    </span>
                    {{ tweet.likesCount }}
                </a>
            </b-tooltip>
        </div>
        {{ cons(tweet) }}
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DefaultAvatar from '../../common/DefaultAvatar.vue';

export default {
    name: 'LikeDislike',
    component: {
        DefaultAvatar,
    },

    props: {
        tweet: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapGetters('tweet', [
            'tweetIsLikedByUser'
        ]),

        ...mapGetters('auth', {
            user: 'getAuthenticatedUser'
        }),
    },
    methods: {
        cons() {
            // console.log(comment);
        },
        ...mapActions('tweet', [
            'likeOrDislikeTweet'
        ]),

        async onLikeOrDislikeComment() {
            try {
                await this.likeOrDislikeTweet({
                    id: this.tweet.id,
                    userId: this.user.id
                });
            } catch (error) {
                console.error(error.message);
            }
        },

    }
};
</script>

 <style lang="scss" scoped>
 @import "~bulma/sass/utilities/initial-variables";
 @import "../../../styles/common";

 .tweet-image {
     margin: 12px 0 0 0;

     img {
         width: auto;
         cursor: pointer;
     }
 }

 .buttons {
     .button {
         @media screen and (max-width: $tablet) {
             font-size: 0.8rem;
         }
     }
 }

 .tweet-text {
     max-width: 100%;
 }

 .activity {
     margin-bottom: 16px;
 }

 .content {
     figure {
         margin-top: 0;
         margin-bottom: .75rem;
     }
 }

 .column {
     padding-bottom: 0;
 }
 </style>
