<template>
    <div class="tweets-container">
        <transition-group name="slide-prev" tag="div">
            <template v-for="tweet in tweets">
                <!-- {{ cons(tweet) }} -->
                <TweetPreview
                    :key="tweet.id"
                    :tweet="tweet"
                    @click="onTweetClick"
                />
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

export default {
    name: 'TweetPreviewList',

    props: {
        tweets: {
            type: Array,
            required: true
        },
    },

    components: {
        TweetPreview,
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
