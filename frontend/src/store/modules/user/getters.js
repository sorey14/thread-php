export default {
    fetchUsers: state => state.users,
    // getFullName: state => `${state.user.firstName} ${state.user.lastName}`,
    getFullName: state => id => state.users[id].firstName + state.users[id].lastName,


};
