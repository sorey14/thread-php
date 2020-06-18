import api from '@/api/Api';
import { SET_ALL_USER } from './mutationTypes';
import { SET_LOADING } from '../../mutationTypes';

export default {
    async fetchAllUsers({ commit }) {
        commit(SET_LOADING, true, { root: true });
        console.log('action fetchAllUsers');

        try {
            const user = await api.post('/users/users');
            // console.log(user);
            commit(SET_ALL_USER, user);
            commit(SET_LOADING, false, { root: true });
            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async fetchUsersByUserId({ commit }, userId) {
        commit(SET_LOADING, true, { root: true });
        try {
            const user = await api.get(`/users/${userId}`);
            commit(SET_ALL_USER, user);
            console.log(user);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve(
                // users.map(userMapper)
            );
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },
};
