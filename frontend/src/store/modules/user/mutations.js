// import Storage from '@/services/Storage';
import { userMapper } from '@/services/Normalizer';
import {
    SET_ALL_USER,
} from './mutationTypes';

export default {
    [SET_ALL_USER]: (state, users) => {
        state.users = {
            ...state.users,
            ...users.reduce(
                (prev, user) => ({ ...prev, [user.id]: userMapper(user) }),
                {}
            ),
        };
    },
};
