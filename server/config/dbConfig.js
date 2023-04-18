const mongoose = require('mongoose');
const config = require('./');
module.exports = async function () {
  mongoose.set('strictQuery', false);
  return mongoose.connect(config.dbUri);
};
