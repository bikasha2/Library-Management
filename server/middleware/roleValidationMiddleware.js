const asyncHandler = require('express-async-handler');
const UnAuthorizedException = require('../shared/exception/UnAuthorizedException');
const roleValidationMiddleware = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (req.role !== role) {
      throw new UnAuthorizedException();
    }
    next();
  });
};

module.exports = roleValidationMiddleware;
