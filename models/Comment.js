const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  postId: String,
  parId: {
    type: String,
    default: "0"
  }
});

module.exports = model('comment', commentSchema);
