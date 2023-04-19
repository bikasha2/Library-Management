const { verifyJwtToken } = require('../auth/authUtil');
const UnAuthorizedException = require('../shared/exception/UnAuthorizedException');
const asyncHandler = require('express-async-handler');
const verifyAuthMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization || req.cookies?.['access-token'];
  if (!token) {
    throw new UnAuthorizedException();
  }
  const { _id, role, exp, emailId } = await verifyJwtToken(token);
  if (Date.now() > exp * 1000) {
    throw new UnAuthorizedException();
  }
  req.userId = _id;
  req.role = role;
  req.emailId = emailId;
  next();
});

module.exports = verifyAuthMiddleware;
