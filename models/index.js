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

module.exports = {
  User,
  Post,
  Comment,
  sequelize,
  Sequelize,
};
