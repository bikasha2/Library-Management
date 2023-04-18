const OperationalError = require('./OperationalError');

class NotFoundException extends OperationalError {
  constructor(message) {
    super(404, message);
  }
}

module.exports = NotFoundException;
