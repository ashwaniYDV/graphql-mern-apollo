const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
  username: String,
  createdAt: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = model('post', postSchema);
