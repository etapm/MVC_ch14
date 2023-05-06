require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("Database has been synced successfully.");

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Users have been seeded successfully.");

  const posts = await Post.bulkCreate(
    postData.map((post, index) => ({
      ...post,
      user_id: users[index % users.length].id,
    }))
  );
  console.log("Posts have been seeded successfully.");

  await Comment.bulkCreate([
    {
      content: "Coding is super hard but rewarding.",
      user_id: 1,
      post_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Handlebars is a handy tool, all coders should know about it.",
      user_id: 3,
      post_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Will the Warriors win the 2023 Championship?",
      user_id: 2,
      post_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  process.exit(0);
};

seedAll();
