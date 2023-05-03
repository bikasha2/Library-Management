const NotFoundException = require('../shared/exception/NotFoundException');
const ForbiddenException = require('../shared/exception/ForbiddenException');
const mongoose = require('mongoose');
const Book = require('./bookModel');
const { availabilityOfBook } = require('../shared/util');

const addBook = async(bookData) => {
    const newBook = new Book({
        name: bookData.name,
        category: bookData.category
    })
    return await newBook.save();
}

const updateBook = async(bookId, updatedBookData) => {
   const bookToBeUpdated =  await availabilityOfBook(bookId);
    bookToBeUpdated.name = updatedBookData.name;
    bookToBeUpdated.category = updatedBookData.category;
    return await bookToBeUpdated.save();
}

const deleteBook = async(bookId) => {
    const _id = new mongoose.Types.ObjectId(bookId);
    const book = await Book.findByIdAndRemove(_id)
    return book;
}

const bookStatus = async(bookId, bookStatus) => {
    const bookToBeUpdated = await availabilityOfBook(bookId);
    bookToBeUpdated.status = bookStatus;
    return await bookToBeUpdated.save();
}

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    bookStatus
};