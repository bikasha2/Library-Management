const { default: mongoose } = require('mongoose')
const Book = require('../admin/bookModel')
const User = require('./userModel')
const NotFoundException = require('../shared/exception/NotFoundException')

const searchBook = async(name) => {
   const serachedBook = await Book.find({name: name})
   if(serachedBook.length === 0) {
        throw new NotFoundException(`Book with name: ${name} not found !`)
   }
   return serachedBook;
}

const assignBook = async(emailId, bookId) => {
    const _bookId = new mongoose.Types.ObjectId(bookId);
    const book = await Book.findById(_bookId);
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
    const _emailId = new mongoose.Types.ObjectId(emailId);
    const user = await User.findById(_emailId);
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

module.exports = {
    searchBook,
    assignBook,
    checkAssignBook,
}