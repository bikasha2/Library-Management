const asyncHandler = require('express-async-handler');
const userService = require('./userService')

const searchBook = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const serachedBook = await userService.searchBook(name);
    res.status(200).json({
        data: serachedBook,
    });
});

const assignBook = asyncHandler(async(req, res) => {
    const {emailId} = req.body;
    const {bookId} = req.params;
    const bookAssigned = await userService.assignBook(emailId, bookId);
    res.status(200).json({
        data: bookAssigned,
    });
});

const checkAssignBook = asyncHandler(async(req, res) => {
    const {emailId} = req.params;
    const bookAssigned = await userService.checkAssignBook(emailId);
    res.status(200).json({
        bookAssigned,
    });
});

module.exports = {
    searchBook,
    assignBook,
    checkAssignBook,
}