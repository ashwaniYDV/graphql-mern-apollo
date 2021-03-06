const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    username: String!
    likes: [Like]!
    comments: [Comment]!
    likeCount: Int!
    commentCount: Int!
    user: PostUser!
  }
  type Comment {
    id: ID!
    postId: String!
    parId: String!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type PostUser {
    email: String!
    username: String!
    profileImage: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    gender: Int!
    profileImage: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    gender: Int!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(title: String!, body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!, parId: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
