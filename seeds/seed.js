const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("Database has been synced successfully.");

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Users have been seeded successfully.");

  await Post.bulkCreate(postData);
  console.log("Posts have been seeded successfully.");

  await Comment.bulkCreate(commentData);
  console.log("Comments have been seeded successfully.");

  process.exit(0);
};

seedAll();
