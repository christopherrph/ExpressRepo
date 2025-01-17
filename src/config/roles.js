const roles = {
    admin: {
        can: ['create', 'read', 'update', 'delete'],
    },
    user: {
        can: ['read'],
    },
    guest: {
        can: [],
    },
};

module.exports = roles;