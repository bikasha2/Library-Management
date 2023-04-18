const { config } = require('dotenv');
config();
module.exports = {
  port: process.env.PORT,
  mode: process.env.NODE_ENV,
  passwordSalt: process.env.PASSWORD_SALT,
  dbUri: process.env.DB_URI,
  tokenSecret: process.env.TOKEN_SECRET,
};
