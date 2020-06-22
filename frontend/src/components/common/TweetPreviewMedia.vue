<template>
    <article class="media" @click="$emit('click', tweet)">
        <figure class="media-left">
            <p class="image is-64x64">
                <DefaultAvatar class="image is-64x64" :user="tweet.author" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ tweet.author.firstName }} {{ tweet.author.lastName }}</strong>
                    <small>@{{ tweet.author.nickname }}</small> <small>{{ tweet.created | createdDate }}</small>
                    <br>
                    {{ tweet.text }}
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply" /></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-medium has-text-info">
                            <font-awesome-icon icon="comments" />
                        </span>
                        {{ tweet.commentsCount }}
                    </a>
                    <a class="level-item">
                        <span class="icon is-medium has-text-info">
                            <font-awesome-icon icon="heart" />
                        </span>
                        {{ tweet.likesCount }}
                    </a>
                </div>
            </nav>
        </div>
        <div class="media-right">
            <button class="delete" />
        </div>
    </article>
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
