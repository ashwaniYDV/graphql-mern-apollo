const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      let post = await Post.findById(postId);

      if (post) {
        const comment = new Comment({
          body,
          username,
          postId,
          createdAt: new Date().toISOString()
        });
        await comment.save();
        
        post.comments.push(comment);
        await post.save();
        post = await Post.findById(postId).populate('comments');
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const comment = await Comment.findOne({ _id: commentId });
      if(!comment) {
        throw new UserInputError('Comment not found');
      }

      let post = await Post.findById(postId);
      if (post) {
        if (comment.username === username) {
          post.comments.pull(commentId);
          await post.save();

          await Comment.findByIdAndRemove({ _id: commentId });

          post = await Post.findById(postId).populate('comments');
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  },
};
