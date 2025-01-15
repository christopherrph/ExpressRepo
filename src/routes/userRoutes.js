const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

// Contoh pake controller
router.get('/GetAllUsers', userController.getAllUsers);
router.get('/GetUser/:id', userController.getUserById);
router.post('/CreateUser', userController.createUser);
router.delete('/deleteuser/:id',userController.deleteUserById);


// Contoh ga pake controller
router.get('/',(req, res) => {
    res.json({
        "name": "John",
        "age": 30,
        "isStudent": false,
        "skills": ["JavaScript", "HTML", "CSS"],
        "address": {
          "city": "New York",
          "zipCode": 10001
        }
      }
      )
})

router.post('/',(req, res) => {
    res.send('User POST')
})


module.exports = router;