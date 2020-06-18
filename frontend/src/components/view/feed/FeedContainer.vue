<template>
    <div class="feed-container">
        <div class="navigation">
            <b-button
                class="btn-add-tweet"
                rounded
                size="is-medium"
                type="is-danger"
                icon-left="twitter"
                icon-pack="fab"
                @click="onAddTweetClick"
            >
                Tweet :)
            </b-button>
        </div>
        <!--SELECT OPTION -->
        <div>
            <select v-model="sortQuery" @change="sortBy">
                <option disabled value="">Sort by</option>
                <option v-for="(sort, index) in sortTypes" :key="index">{{ sort }}</option>
            </select>
        </div>

        <TweetPreviewList :tweets="sortedArray" @infinite="infiniteHandler" />

        <b-modal :active.sync="isNewTweetModalActive" has-modal-card>
            <NewTweetForm />
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TweetPreviewList from '@/components/common/TweetPreviewList.vue';
import { pusher } from '@/services/Pusher';
import { SET_TWEET } from '@/store/modules/tweet/mutationTypes';
import showStatusToast from '@/components/mixin/showStatusToast';
import NewTweetForm from './NewTweetForm.vue';

export default {
    name: 'FeedContainer',

    mixins: [showStatusToast],

    components: {
        TweetPreviewList,
        NewTweetForm,
    },

    data: () => ({
        isNewTweetModalActive: false,
        page: 1,
        sortTypes: ['asc', 'desc', 'like'],
        sortQuery: '',
        sortArray: [],
    }),

    async created() {
        try {
            this.tweets = await this.fetchTweets({
                page: 1
            });
        } catch (error) {
            this.showErrorMessage(error.message);
        }

        const channel = pusher.subscribe('private-tweets');

        channel.bind('tweet.added', (data) => {
            this.$store.commit(`tweet/${SET_TWEET}`, data.tweet);
        });
    },

    beforeDestroy() {
        pusher.unsubscribe('private-tweets');
    },

    computed: {
        ...mapGetters('tweet', {
            tweets: 'tweetsSortedByCreatedDate'
        }),
        sortedArray() {
            if (this.sortArray.length) {
                return this.sortArray;
            }
            return this.tweets;
        },
    },

    methods: {
        sortBy() {
            this.sortArray = [];
            if (this.sortQuery === 'like') {
                this.sortArray = this.$store.getters['tweet/tweetsSortedByLikesCount'];
            }
            if (this.sortQuery === 'asc') {
                this.sortArray = this.$store.getters['tweet/tweetsSortedByCreatedDate'];
            }
            if (this.sortQuery === 'desc') {
                this.sortArray = this.$store.getters['tweet/tweetsSortedByCreatedDateDecs'];
            }
        },

        ...mapActions('tweet', [
            'fetchTweets',
        ]),

        onAddTweetClick() {
            this.showAddTweetModal();
        },

        showAddTweetModal() {
            this.isNewTweetModalActive = true;
        },

        async infiniteHandler($state) {
            try {
                const tweets = await this.fetchTweets({ page: this.page + 1 });

                if (tweets.length) {
                    this.page += 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } catch (error) {
                this.showErrorMessage(error.message);
                $state.complete();
            }
        },
        /* resortTweets() {
            console.log(this.sortQuery);
            this.$store.dispatch('tweet/sortBy', this.tweets);
        }, */
    },
};
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/initial-variables';

.navigation {
    padding: 10px 0;
    margin-bottom: 20px;
}

.modal-card {
    border-radius: 6px;
}

.btn-add-tweet {
    transition: 0.2s ease-out all;
    box-shadow: 1px 5px 5px 0 #00000020;

    &:hover {
        box-shadow: 1px 1px 0 0 #00000020;
    }

    @media screen and (max-width: $tablet) {
        font-size: 1rem;
    }
}
</style>
