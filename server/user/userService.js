const { default: mongoose } = require('mongoose')
const Book = require('../admin/bookModel')
const User = require('./userModel')
const NotFoundException = require('../shared/exception/NotFoundException')
const bookStatus = require('../admin/bookStatus')

const searchBook = async(name) => {
   const serachedBook = await Book.find({name: name})
   if(serachedBook.length === 0) {
        throw new NotFoundException(`Book with name: ${name} not found !`)
   }
   return serachedBook;
}

const borrowBook = async(emailId, bookId) => {
    const _bookId = new mongoose.Types.ObjectId(bookId);
    const book = await Book.findById(_bookId);
    book.status = bookStatus.ASSIGNED;
    await book.save();
    if(!book) {
        throw new NotFoundException();
    }
    const user = emailId === '' ? null : await User.findOne({emailId});
    user.assignedTo = _bookId;
    const updatedUser = await user.save();
    if(emailId === '') {
        return null;
    }
    return {
        _id: book?._id,
        name: book?.name,
        category: book?.category,
        emailId: updatedUser?.emailId,
    }
}

const checkAssignBook = async(emailId) => {
    const user = await User.findOne({emailId});
    if(!user) {
        throw new NotFoundException();
    }
    const _bookId = new mongoose.Types.ObjectId(user.assignedTo)
    const book = await Book.findById(_bookId)
    return {
        _id: book?._id,
        name: book?.name,
        category: book?.category,
    };
}

const returnBook = async(emailId, bookId) => {
    const _bookId = new mongoose.Types.ObjectId(bookId);
    const book = await Book.findById(_bookId);
    book.status = bookStatus.AVAILABLE;
    await book.save();
    if(!book) {
        throw new NotFoundException();
    }
    const user = emailId === '' ? null : await User.findOne({emailId});
    if(user.assignedTo.equals(_bookId)) {
        user.assignedTo = null;
        const updateUser = await user.save();
        return updateUser;
    }
    if(emailId === '') {
        return null;
    } 
    return {
        msg: 'Book id did not match !'
    }
}

const getBooks = async() => {
    const books = await Book.find();
    return books;
}

module.exports = {
    searchBook,
    borrowBook,
    checkAssignBook,
    returnBook,
    getBooks
}