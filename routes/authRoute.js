// Import
const express = require('express');

const userRouter = express();
const {insertUser, login} = require('../controllers/authController');

//Sign up for User
userRouter.post('/',insertUser);

//Login for user
userRouter.post('/login', login);

module.exports = userRouter;