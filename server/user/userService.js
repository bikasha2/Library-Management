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
    user.assignedTo.push(_bookId);
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
    const userAssigned = user.assignedTo 
    const books = await Promise.all(userAssigned.map(async assign => {
        const book = await Book.findById(assign);
        return book;
    }));
    return {
        books
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
    const assign = user.assignedTo;
    const assignedBookId = assign.find((assignedBookId)=> {
        return assignedBookId.equals(_bookId)
    })
    if(assignedBookId === undefined) {
        return {
            msg: 'Book id did not match !'
        }
    }
    const bookPop = user.assignedTo.pop(bookId);
    await user.save()
    return bookPop;
   
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