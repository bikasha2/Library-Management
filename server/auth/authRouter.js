const { Router } = require('express');
const authRouter = Router();
const authController = require('./authController');
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;