<template>
    <div v-if="tweet">
        <!-- {{ cons(tweets) }} -->
        <article class="media box tweet">
            <figure class="media-left">
                <router-link
                    v-if="tweet.author.avatar"
                    class="image is-64x64 is-square"
                    :to="{ name: 'user-page', params: { id: tweet.author.id } }"
                >
                    <img
                        class="is-rounded fit"
                        :src="tweet.author.avatar"
                        alt="Author avatar"
                    >
                </router-link>

                <router-link v-else :to="{ name: 'user-page', params: { id: tweet.author.id } }">
                    <DefaultAvatar class="image is-64x64" :user="tweet.author" />
                </router-link>
            </figure>

            <button
                type="button"
                class="copyLink"
                v-clipboard:copy="tweetUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >
                <span class="spanLink">Copy link!</span>
            </button>

            <div class="media-content">
                <div class="columns">
                    <div class="column">
                        <div class="content">
                            <p class="tweet-text">
                                <strong>{{ tweet.author.firstName }} {{ tweet.author.lastName }}</strong>
                                <br>
                                <small class="has-text-grey">
                                    {{ tweet.created | createdDate }}
                                </small>
                                <br>
                                {{ tweet.text }}
                            </p>
                            <figure v-if="tweet.imageUrl" class="image is-3by1 tweet-image">
                                <img
                                    :src="tweet.imageUrl"
                                    alt="Tweet image"
                                    @click="showImageModal"
                                >
                            </figure>
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <b-tooltip label="Comments" animated>
                                        <a class="level-item auto-cursor">
                                            <span
                                                class="icon is-medium has-text-info"
                                                :class="{
                                                    'has-text-danger': tweetIsCommentedByUser(tweet.id, user.id)
                                                }"
                                            >
                                                <font-awesome-icon icon="comments" />
                                            </span>
                                            {{ tweet.commentsCount }}
                                        </a>
                                    </b-tooltip>

                                    <b-tooltip label="Like" animated>
                                        <a class="level-item" @click="onLikeOrDislikeTweet">
                                            <span
                                                class="icon is-medium has-text-info"
                                                :class="{
                                                    'has-text-danger': tweetIsLikedByUser(tweet.id, user.id)
                                                }"
                                            >
                                                <font-awesome-icon icon="heart" />
                                            </span>
                                        </a>
                                        <span class="listUser" @click="listUsersLike">{{ tweet.likesCount }}</span>
                                    </b-tooltip>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div v-if="isTweetOwner(tweet.id, user.id)" class="column is-narrow is-12-mobile">
                        <div class="buttons">
                            <b-button type="is-warning" @click="onEditTweet">Edit</b-button>
                            <b-button type="is-danger" @click="onDeleteTweet">Delete</b-button>
                        </div>
                    </div>
                </div>
                <!-- {{ cons(getCommentsByTweetId(tweet.id)) }} -->
                <!-- {{ cons(tweet.id) }} -->
                <template v-for="comment in getCommentsByTweetId(tweet.id)">
                    <Comment
                        :comment="comment"
                        :key="comment.id"
                        :tweet="tweet"
                    />
                </template>
                <NewCommentForm :tweet-id="tweet.id" />
            </div>
        </article>

        <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img class="fit" :src="tweet.imageUrl">
            </p>
        </b-modal>

        <b-modal :active.sync="isEditTweetModalActive" has-modal-card>
            <EditTweetForm :tweet="tweet" />
        </b-modal>

        <b-modal :active.sync="isShowUserActive" has-modal-card>
            <article class="modal-card">
                <div class="modal-card-body">
                    <div v-for="like in tweet.likes" :key="like.userId">
                        <UserComment
                            :like="like"
                        />
                    </div>
                </div>
            </article>
        </b-modal>
    </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import { mapGetters, mapActions } from 'vuex';
import Comment from './Comment.vue';
import UserComment from './UserComment.vue';
import NewCommentForm from './NewCommentForm.vue';
import EditTweetForm from './EditTweetForm.vue';
import DefaultAvatar from '../../common/DefaultAvatar.vue';
import showStatusToast from '../../mixin/showStatusToast';


Vue.use(VueClipboard);

Vue.component('LikeDislike', { /* ... */ });

export default {
    name: 'TweetContainer',

    components: {
        Comment,
        NewCommentForm,
        EditTweetForm,
        DefaultAvatar,
        UserComment,
    },

    mixins: [showStatusToast],

    props: {
    },

    data: () => ({
        isEditTweetModalActive: false,
        isImageModalActive: false,
        tweetUrl: window.location.href,
        isShowUserActive: false,
    }),

    async created() {
        try {
            await this.fetchTweetById(this.$route.params.id);
            await this.fetchAllUsers();
            this.fetchComments(this.tweet.id);
        } catch (error) {
            console.error(error.message);
        }
    },

    computed: {
        ...mapGetters('auth', {
            user: 'getAuthenticatedUser'
        }),

        ...mapGetters('tweet', [
            'getTweetById',
            'isTweetOwner',
            'tweetIsLikedByUser'
        ]),

        ...mapGetters('comment', [
            'getCommentsByTweetId',
            'tweetIsCommentedByUser'
        ]),

        tweet() {
            return this.getTweetById(this.$route.params.id);
        },
    },

    methods: {
        ...mapActions('user', [
            'fetchAllUsers',
        ]),

        cons(tweet) {
            console.log(tweet);
        },

        onCopy() {
            return window.location.href;
        },
        onError() {
            this.showErrorMessage('Unable to copy link!');
        },
        copyLink() {
            this.activCopyLink = !this.activCopyLink;
            console.log(this.activCopyLink);
        },
        ...mapActions('tweet', [
            'fetchTweetById',
            'deleteTweet',
            'likeOrDislikeTweet'
        ]),

        ...mapActions('comment', [
            'fetchComments',
        ]),

        onEditTweet() {
            this.isEditTweetModalActive = true;
        },

        onDeleteTweet() {
            this.$buefy.dialog.confirm({
                title: 'Deleting tweet',
                message: 'Are you sure you want to <b>delete</b> your tweet? This action cannot be undone.',
                confirmText: 'Delete Tweet',
                type: 'is-danger',

                onConfirm: async () => {
                    try {
                        await this.deleteTweet(this.tweet.id);

                        this.showSuccessMessage('Tweet deleted!');

                        this.$router.push({ name: 'feed' }).catch(() => {});
                    } catch {
                        this.showErrorMessage('Unable to delete tweet!');
                    }
                }
            });
        },

        showImageModal() {
            this.isImageModalActive = true;
        },

        async onLikeOrDislikeTweet() {
            try {
                // console.log(this.tweet);
                await this.likeOrDislikeTweet({
                    id: this.tweet.id,
                    userId: this.user.id,
                    email: this.tweet.author.email
                });
            } catch (error) {
                console.error(error.message);
            }
        },

        listUsersLike() {
            this.isShowUserActive = true;
        },
    },
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
.copyLink{
    margin: 15px;
    width: 25%;
}
.spanLink{
}
.listUser{
    line-height: 2;
}
</style>
