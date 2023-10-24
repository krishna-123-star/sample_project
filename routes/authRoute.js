// Import
const express = require('express');

const userRouter = express();
const {insertUser, login} = require('../controllers/authController');
const { userValidationRules, validate } = require('../validator/userValidator')

//Sign up for User
userRouter.post('/', userValidationRules(), validate, insertUser);

//Login for user
userRouter.post('/login', login);

module.exports = userRouter;