const Sequelize = require("sequelize");
const config = require("../config/config.js");

const env = process.env.NODE_ENV || "development";
const { database, username, password, ...otherConfig } = config[env];
const sequelize = new Sequelize(database, username, password, otherConfig);

const User = require("./User");
const Post = require("./Post");
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
