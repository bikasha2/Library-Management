const Book = require('../admin/bookModel')
const NotFoundException = require('../shared/exception/NotFoundException')

const searchBook = async(name) => {
   const serachedBook = await Book.find({name: name})
   if(serachedBook.length === 0) {
        throw new NotFoundException(`Book with name: ${name} not found !`)
   }
   return serachedBook;
}

module.exports = {
    searchBook,
}