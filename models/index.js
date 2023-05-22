const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const User = require("./user");
const Post = require("./post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "comment_author",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "comments",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  as: "post_comments",
});

module.exports = {
  User,
  Post,
  Comment,
  sequelize,
  Sequelize,
};
