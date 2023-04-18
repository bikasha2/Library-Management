const asyncHandler = require('express-async-handler');
const config = require('../config');
const authService = require('./authService');
const loginUser = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;
  const result = await authService.loginUser({ emailId, password });
  res.cookie('access_token', result.token, {
    httpOnly: true,
    secure: config.mode === 'development',
  });
  res.status(200).json({
    data: result,
  });
});

module.exports = {
    loginUser
};