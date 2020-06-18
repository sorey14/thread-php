<template>
    <p class="user_comment">
        <strong>
            <!-- {{ like.userId }} -->
            {{ getFullName(like.userId) }}
        </strong>
        <br>
        {{ getFullName }}
        <br>
        <small class="has-text-whites">
            <!-- {{ comment.created | createdDate }} -->
        </small>
    </p>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import showStatusToast from '../../mixin/showStatusToast';

export default {
    name: 'Comment',

    components: {
    },
    mixins: [showStatusToast],

    data: () => ({
        isEditCommentModalActive: false,
        isImageModalActive: false
    }),

    props: {
        like: {
            type: Object,
            required: true,
        },
    },
    /* async created() {
        try {
            // await this.fetchUsersByUserId((this.like.userId));
        } catch (error) {
            console.error(error.message);
        }
    }, */
    computed: {
        ...mapGetters('user', [
            'fetchUsers',
            'getFullName',

        ]),
        /* getFullName() {
            return this.getFullName(this.like.userId);
        }, */
    },

    methods: {
        cons(comment) {
            console.log(comment);
        },

        ...mapActions('comment', [
            'deleteComment',
            'editComment'
        ]),
        ...mapActions('user', [
            'fetchUsersByUserId',
        ]),

        onEditComment() {
            this.isEditCommentModalActive = true;
        },

        showImageModal() {
            this.isImageModalActive = true;
        },
    }
};
</script>

<style lang="scss" scoped>
nav {
    margin-left: -8px;
}

.content {
    p {
        margin-bottom: 0;
    }
}
.user_comment {
    color: white;
    .has-text-whites {
        color: white;
    }
}
</style>
