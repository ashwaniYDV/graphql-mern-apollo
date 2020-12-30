const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  gender: Number,
  createdAt: String
});

module.exports = model('user', userSchema);
