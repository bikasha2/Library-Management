const CONSTANTS = require('./constants');
const mongoose = require('mongoose');
const NotFoundException = require('./exception/NotFoundException');

function checkEmailId(emailId) {
  return CONSTANTS.EMAIL_ID_REGEXP.test(emailId);
}

const  availabilityOfBook = async(bookId) => {
  const _id = new mongoose.Types.ObjectId(bookId);
  const bookToBeUpdated = await Book.findById(_id);
  if(!bookToBeUpdated) {
      throw new NotFoundException(`Book having id ${bookId} is not found !`)
  }
  return bookToBeUpdated
}

module.exports = {
  checkEmailId,
  availabilityOfBook
};
