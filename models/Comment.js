const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  postId: String
});

module.exports = model('comment', commentSchema);
