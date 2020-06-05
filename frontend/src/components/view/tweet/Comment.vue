<template>
    <article class="media">
        <figure class="media-left">
            <router-link
                v-if="comment.author.avatar"
                class="image is-48x48 is-square"
                :to="{ name: 'user-page', params: { id: comment.author.id } }"
            >
                <img class="is-rounded fit" :src="comment.author.avatar">
            </router-link>

            <router-link v-else :to="{ name: 'user-page', params: { id: comment.author.id } }">
                <DefaultAvatar class="image is-48x48" :user="comment.author" />
            </router-link>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>
                        {{ comment.author.firstName }} {{ comment.author.lastName }}
                    </strong>
                    <br>
                    {{ comment.body }}
                    <br>
                    <small class="has-text-grey">
                        {{ comment.created | createdDate }}
                    </small>
                </p>
                <figure v-if="comment.imageUrl" class="image is-3by1 tweet-image">
                    <img
                        :src="comment.imageUrl"
                        alt="Comment image"
                        @click="showImageModal"
                    >
                </figure>
            </div>
        </div>
        {{ consol(comment) }}

        <div v-if="isCommentOwner(comment.id, user.id)" class="column is-narrow is-12-mobile">
            <div class="buttons">
                <b-button type="is-warning" @click="onEditComment">Edit</b-button>
                <b-button type="is-danger" @click="onDeleteComment">Delete</b-button>
            </div>
            <b-modal :active.sync="isImageModalActive">
                <p class="image is-4by3">
                    <img class="fit" :src="comment.imageUrl">
                </p>
            </b-modal>
            <b-modal :active.sync="isEditCommentModalActive" has-modal-card>
                <EditCommentForm :comment="comment" />
            </b-modal>
        </div>
    </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditCommentForm from './EditCommentForm.vue';
import DefaultAvatar from '../../common/DefaultAvatar.vue';
import showStatusToast from '../../mixin/showStatusToast';

export default {
    name: 'Comment',

    components: {
        DefaultAvatar,
        EditCommentForm,
    },
    mixins: [showStatusToast],

    data: () => ({
        isEditCommentModalActive: false,
        isImageModalActive: false
    }),

    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters('auth', {
            user: 'getAuthenticatedUser'
        }),

        ...mapGetters('comment', [
            'isCommentOwner',
        ]),
    },

    methods: {
        consol(comment) {
            console.log(comment);
        },

        ...mapActions('comment', [
            'deleteComment',
            'editComment'
        ]),

        onEditComment() {
            this.isEditCommentModalActive = true;
        },

        onDeleteComment() {
            this.$buefy.dialog.confirm({
                title: 'Deleting comment',
                message: 'Are you sure you want to <b>delete</b> your comment? This action cannot be undone.',
                confirmText: 'Delete comment',
                type: 'is-danger',

                onConfirm: async () => {
                    try {
                        await this.deleteComment(this.comment.id);

                        this.showSuccessMessage('Comment deleted!');

                        this.$router.push({ name: 'comment-page' }).catch(() => {});
                    } catch {
                        this.showErrorMessage('Unable to delete comment!');
                    }
                }
            });
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
</style>
