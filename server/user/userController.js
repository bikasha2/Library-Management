const asyncHandler = require('express-async-handler');
const userService = require('./userService')

const searchBook = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const serachedBook = await userService.searchBook(name);
    res.status(200).json({
        data: serachedBook,
    });
});

const borrowBook = asyncHandler(async(req, res) => {
    const emailId = req.emailId;
    const {bookId} = req.params;
    const bookBorrowed = await userService.borrowBook(emailId, bookId);
    res.status(200).json({
        data: bookBorrowed,
    });
});

const checkAssignBook = asyncHandler(async(req, res) => {
    const emailId = req.emailId
    const bookAssigned = await userService.checkAssignBook(emailId);
    const books = bookAssigned.books;
    res.status(200).json({
        books,
    });
});

const returnBook = asyncHandler(async(req, res) => {
    const emailId = req.emailId;
    const {bookId} = req.params;
    const returnedBook = await userService.returnBook(emailId, bookId);
    res.status(200).json({
        data: returnedBook
    });
});

const getBooks = asyncHandler(async(req, res) => {
    const books = await userService.getBooks();
    res.status(200).json({
        data: books
    });
});

module.exports = {
    searchBook,
    borrowBook,
    checkAssignBook,
    returnBook,
    getBooks,
}