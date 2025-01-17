const express = require('express');
const router = express.Router();
const userSQLController = require('../controller/userSQLController');



// Route to get all users
router.get('/', userSQLController.getAllUsers);

// Route to get a user by ID
router.get('/:id', userSQLController.getUserById);

// Route to create a new user
router.post('/', userSQLController.createUser);

// Route to update a user by ID
router.patch('/:id', userSQLController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userSQLController.deleteUser);

// Route to bulk create users
router.post('/bulk', userSQLController.bulkCreateUsers);


module.exports = router;