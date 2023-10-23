const authAPI = {
    LOGIN: '/login',
    LOGOUT: '/logout',
};

const userAPI = {
    CREATE: '/create',
    ALL: '/get-all',
    USER_BY_ID: '/user/:id',
}

module.exports = {
    authAPI,
    userAPI,
};