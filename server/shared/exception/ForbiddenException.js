const OperationalError = require('./OperationalError');

class ForbiddenException extends OperationalError {
  constructor(message) {
    super(403, message);
  }
}

module.exports = ForbiddenException;
