const asyncHandler = require('express-async-handler');
const adminService = require('./adminService');

const addBook = asyncHandler(async(req, res) => {
    const {name, category} = req.body;
    const book = await adminService.addBook({
        name, 
        category, 
    });
    res.status(201).json({
        data: book,
    })
})

const updateBook = asyncHandler(async(req, res) => {
    const {bookId} = req.params;
    const updatedBookData = req.body;
    const bookToBeUpdated = await adminService.updateBook(bookId, updatedBookData);
    res.status(200).json({
        data: bookToBeUpdated
    })
})

const deleteBook = asyncHandler(async(req, res) => {
    const {bookId} = req.params;
    await adminService.deleteBook(bookId);
    res.status(200).json({
        message: 'Book has been deleted successfully !'
    })
})

const bookStatus = asyncHandler(async(req, res) => {
    const {bookId} = req.params;
    const bookStatus = req.body.status;
    const updatedBookStatus = await adminService.bookStatus(bookId, bookStatus);
    res.status(200).json({
        data: updatedBookStatus
    })
})

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    bookStatus
}

