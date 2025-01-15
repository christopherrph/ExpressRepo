const db = require('../config/database'); // Assuming you have a db configuration file



// Get all users
const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Get user by ID
const getUserById = (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Create new user
const createUser = (req, res) => {
    const { name, email, address } = req.body;
    const query = 'INSERT INTO user (name, email, address) VALUES (?, ?, ?)';
    db.query(query, [name, email, address], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
};

// Bulk create users
const bulkCreateUsers = (req, res) => {
    const users = req.body.users; // Assuming the request body contains an array of users
    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: 'Invalid users data :(' });
    }

    const values = users.map(user => [user.name, user.email, user.address]);
    const query = 'INSERT INTO user (name, email, address) VALUES ?';

    db.query(query, [values], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Users created successfully', affectedRows: results.affectedRows });
    });
};

// Update user
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, address } = req.body;
    const fields = [];
    const values = [];

    if (name) {
        fields.push('name = ?');
        values.push(name);
    }
    if (email) {
        fields.push('email = ?');
        values.push(email);
    }
    if (address) {
        fields.push('address = ?');
        values.push(address);
    }

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    const query = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    values.push(userId);

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
};

// Delete user
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    bulkCreateUsers
};