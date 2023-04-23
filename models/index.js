const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

// Importing models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Establishing associations
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
  hooks: true,
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Exporting models
module.exports = {
  User,
  Post,
  Comment,
  sequelize,
  Sequelize,
};
