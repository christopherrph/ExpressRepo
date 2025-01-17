const express = require('express');
const loginController = require('../controller/loginController');

const router = express.Router();

// Route for handling login
router.post('/',loginController.loginUser);


module.exports = router;