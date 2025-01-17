const express = require('express');
const loginController = require('../controller/loginController');

const router = express.Router();

// Route for handling login
router.post('/',loginController.loginUser);
router.get('/clearcookie', (req, res) => {
    res.clearCookie('tokenz', { httpOnly: true, secure: true }); 
    res.status(200).json({ message: 'cookie cleared' })
});


module.exports = router;