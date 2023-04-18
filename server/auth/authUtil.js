const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');
async function encryptPassword(password) {
  return bcrypt.hash(password, +config.passwordSalt);
}

async function comparePassword(plainPassword, hashPassword) {
  return bcrypt.compare(plainPassword, hashPassword);
}

async function createJwtToken(payload) {
  return jwt.sign(payload, config.tokenSecret, {
    expiresIn: '5h',
  });
}

async function verifyJwtToken(token) {
  return jwt.verify(token, config.tokenSecret);
}

module.exports = {
  encryptPassword,
  comparePassword,
  createJwtToken,
  verifyJwtToken,
};
