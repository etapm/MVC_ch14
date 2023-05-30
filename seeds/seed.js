require("dotenv").config();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/Comment");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(
    postData.map((post) => ({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }))
  );
  console.log("Posts have been seeded successfully.");

  await Comment.bulkCreate(
    commentData.map((comment) => ({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    }))
  );
  console.log("Comments have been seeded successfully.");

  process.exit(0);
};

seedAll();
