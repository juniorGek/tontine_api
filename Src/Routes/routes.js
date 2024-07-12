const express = require('express');
const AuthController = require('../Controllers/AuthController');
const authMiddleware = require('../Middlewares/authMiddleware.JS');
const router = express.Router();
require("dotenv").config();


router.get('/', (req, res) => {
    res.send('Bonjour tout le monde');
});


router.post('/register',authMiddleware, AuthController.register)
router.post('/login', AuthController.login)

router.get('/user',authMiddleware,AuthController.user)









module.exports = router;