<template>
    <div class="card" @click="$emit('click', tweet)">
        <div class="card-image">
            <figure v-if="tweet.imageUrl" class="image is-4by3">
                <img :src="tweet.imageUrl" alt="Tweet image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <router-link
                            v-if="tweet.author.avatar"
                            :to="{ name: 'user-page', params: { id: tweet.author.id } }"
                        >
                            <DefaultAvatar class="image is-64x64" :user="tweet.author" />
                        </router-link>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ tweet.author.firstName }} {{ tweet.author.lastName }}</p>
                    <p class="subtitle is-6">{{ tweet.author.nickname }}</p>
                </div>
            </div>

            <div class="content">
                {{ tweet.text }}
                <a>{{ tweet.author.nickname }}</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <router-link :to="{ name: 'user-page', params: { id: tweet.author.id } }">
                    #responsive
                </router-link>
                <br>
                <time>{{ tweet.created | createdDate }}</time>
            </div>
        </div>
    </div>
</template>

<script>
import DefaultAvatar from './DefaultAvatar.vue';

export default {
    name: 'TweetPreview',

    components: {
        DefaultAvatar,
    },

    props: {
        tweet: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../styles/common';

.tweet {
    cursor: pointer;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 0 #00000020;
    transition: 0.2s ease-out all;

    &:hover {
        box-shadow: 1px 1px 0 0 #00000020;
    }

    &-image {
        margin: 12px 0 0 0;

        img {
            width: auto;
        }
    }

    .nickname {
        margin-left: 5px;
    }

    .created {
        margin-left: 5px;
    }
}
</style>
