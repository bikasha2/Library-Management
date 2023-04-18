const OperationalError = require('./OperationalError');

class UnAuthorizedException extends OperationalError {
  constructor() {
    super(401, 'Unauthorized Access');
  }
}

module.exports = UnAuthorizedException;
