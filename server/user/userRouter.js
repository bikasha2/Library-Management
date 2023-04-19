const {Router} = require('express');
const roleValidationMiddleware = require('../middleware/roleValidationMiddleware');
const verifyAuthMiddleware = require('../middleware/verifyAuthMiddleware');
const userRoles = require('./roles');
const userRouter = Router();
const userController = require('./userController')

userRouter.use(verifyAuthMiddleware)
userRouter.post('/book/book-name', roleValidationMiddleware(userRoles.STUDENT), userController.searchBook);

module.exports = userRouter;