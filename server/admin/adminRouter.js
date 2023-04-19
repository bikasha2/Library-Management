const {Router} = require('express');
const roleValidationMiddleware = require('../middleware/roleValidationMiddleware');
const verifyAuthMiddleware = require('../middleware/verifyAuthMiddleware');
const userRoles = require('../user/roles');
const adminRouter = Router();
const adminController = require('./adminController');

adminRouter.use(verifyAuthMiddleware);
adminRouter.post('/book', roleValidationMiddleware(userRoles.ADMIN), adminController.addBook);
adminRouter
    .route('/book/:bookId')
    .put(
        roleValidationMiddleware(userRoles.ADMIN),
        adminController.updateBook
    )
    .delete(
        roleValidationMiddleware(userRoles.ADMIN),
        adminController.deleteBook
    )
adminRouter.put(
    '/book-status/:bookId',
    roleValidationMiddleware(userRoles.ADMIN),
    adminController.bookStatus
)

module.exports = adminRouter;
