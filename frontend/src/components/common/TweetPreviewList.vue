<template>
    <div class="tweets-container">
        <transition-group name="slide-prev" tag="div">
            <template v-for="tweet in tweets">
                <!-- {{ cons(tweet) }} -->
                <div v-if="displayMode==='default'" :key="tweet.id">
                    <TweetPreview
                        :key="tweet.id"
                        :tweet="tweet"
                        @click="onTweetClick"
                    />
                </div>
                <div v-if="displayMode==='media'" :key="tweet.id">
                    <TweetPreviewMedia
                        :key="tweet.id"
                        :tweet="tweet"
                        @click="onTweetClick"
                    />
                </div>
                <div v-if="displayMode==='card'" :key="tweet.id">
                    <TweetPreviewCard
                        :key="tweet.id"
                        :tweet="tweet"
                        @click="onTweetClick"
                    />
                </div>
            </template>
        </transition-group>
        <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more" />
            <div slot="no-results" />
            <div slot="spinner" />
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import TweetPreview from './TweetPreview.vue';
import TweetPreviewCard from './TweetPreviewCard.vue';
import TweetPreviewMedia from './TweetPreviewMedia.vue';

export default {
    name: 'TweetPreviewList',

    props: {
        displayMode: {
            type: String,
            rewuerid: true,
            default: 'default'
        },
        tweets: {
            type: Array,
            required: true,
        },
    },

    components: {
        TweetPreview,
        TweetPreviewCard,
        TweetPreviewMedia,
        InfiniteLoading,
    },

    methods: {
        cons(tweet) {
            console.log(tweet);
        },
        onTweetClick(tweet) {
            this.$router.push({ name: 'tweet-page', params: { id: tweet.id } }).catch(() => {});
        },

        infiniteHandler($state) {
            this.$emit('infinite', $state);
        },
    },
};
</script>

<style scoped lang="scss">
.tweets-container {
    padding-bottom: 20px;
}
</style>
