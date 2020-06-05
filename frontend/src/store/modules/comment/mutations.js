import { commentMapper } from '@/services/Normalizer';
import {
    SET_COMMENTS,
    SET_COMMENT_IMAGE,
    ADD_COMMENT,
    SET_COMMENT,
    DELETE_COMMENT,
    INCREMENT_COMMENTS_COUNT,
} from './mutationTypes';

export default {
    [SET_COMMENTS]: (state, comments) => {
        let commentsByIdMap = {};

        comments.forEach(comment => {
            commentsByIdMap = {
                ...commentsByIdMap,
                [comment.id]: commentMapper(comment)
            };
        });

        state.comments = commentsByIdMap;
    },

    [SET_COMMENT_IMAGE]: (state, { id, imageUrl }) => {
        state.comments[id].imageUrl = imageUrl;
    },

    [ADD_COMMENT]: (state, comment) => {
        state.comments = {
            ...state.comments,
            [comment.id]: commentMapper(comment)
        };
    },

    [SET_COMMENT]: (state, comment) => {
        state.comments = {
            ...state.comments,
            [comment.id]: commentMapper(comment)
        };
    },

    [DELETE_COMMENT]: (state, id) => {
        delete state.comments[id];
    },

    [INCREMENT_COMMENTS_COUNT]: (state, id) => {
        state.tweets[id].commentsCount++;
    },
};
