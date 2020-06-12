import api from '@/api/Api';
import { commentMapper } from '@/services/Normalizer';
import { SET_LOADING } from '../../mutationTypes';
import {
    SET_COMMENTS,
    SET_COMMENT_IMAGE,
    ADD_COMMENT,
    SET_COMMENT,
    DELETE_COMMENT,
    LIKE_COMMENT,
    DISLIKE_COMMENT,
} from './mutationTypes';
import { INCREMENT_COMMENTS_COUNT } from '../tweet/mutationTypes';

export default {
    async fetchComments({ commit }, tweetId) {
        commit(SET_LOADING, true, { root: true });

        try {
            const comments = await api.get(`/tweets/${tweetId}/comments`, {
                direction: 'asc',
            });
            commit(SET_COMMENTS, comments);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve(
                comments.map(commentMapper)
            );
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async addComment({ commit }, { tweetId, text }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const comment = await api.post('/comments', { tweet_id: tweetId, body: text });

            commit(ADD_COMMENT, comment);
            commit(`tweet/${INCREMENT_COMMENTS_COUNT}`, tweetId, { root: true });
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve(commentMapper(comment));
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async uploadCommentImage({ commit }, { id, imageFile }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            const comment = await api.post(`/comments/${id}/image`, formData);
            commit(SET_COMMENT_IMAGE, {
                id,
                imageUrl: comment.image_url
            });

            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async editComment({ commit }, { id, text }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const comment = await api.put(`/comments/${id}`, { text });
            // console.log(comment);
            commit(SET_COMMENT, comment);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve(commentMapper(comment));
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async deleteComment({ commit }, id) {
        commit(SET_LOADING, true, { root: true });

        try {
            await api.delete(`/comments/${id}`);

            commit(DELETE_COMMENT, id);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async likeOrDislikeComment({ commit }, { id, userId, email }) {
        commit(SET_LOADING, true, { root: true });
        try {
            const data = await api.put(`/comments/${id}/like`);
            if (data.status === 'added') {
                commit(LIKE_COMMENT, {
                    id,
                    userId
                });
                // console.log(data);
                // const emailRespose =
                await api.get(`/feed-page/${email}`);
                // console.log(emailRespose);
            } else {
                commit(DISLIKE_COMMENT, {
                    id,
                    userId
                });
            }

            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

};
