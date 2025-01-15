const db = require('../config/database');

const getAllUsers = () => {
    const query = 'SELECT * FROM users';
    return db.query(query);
}

module.exports = {getAllUsers};