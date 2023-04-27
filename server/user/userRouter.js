const {Router} = require('express');
const roleValidationMiddleware = require('../middleware/roleValidationMiddleware');
const verifyAuthMiddleware = require('../middleware/verifyAuthMiddleware');
const userRoles = require('./roles');
const userRouter = Router();
const userController = require('./userController')

userRouter.use(verifyAuthMiddleware)
userRouter.get('/getbooks', userController.getBooks);
userRouter.post('/book/book-name', roleValidationMiddleware(userRoles.STUDENT), userController.searchBook);
userRouter.post('/book/:bookId/borrow', roleValidationMiddleware(userRoles.STUDENT), userController.borrowBook);
userRouter.post('/book/check-assign', roleValidationMiddleware(userRoles.STUDENT), userController.checkAssignBook);
userRouter.post('/book/:bookId/return', roleValidationMiddleware(userRoles.STUDENT), userController.returnBook);

module.exports = userRouter;