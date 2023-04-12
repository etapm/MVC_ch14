const seedUsers = require("./userData.json");
const seedPosts = require("./postData.json");
const seedComments = require("./commentData.json");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("Database has been synced successfully.");
  await seedUsers();
  console.log("Users have been seeded successfully.");

  await seedPosts();
  console.log("Posts have been seeded successfully.");

  await seedComments();
  console.log("Comments have been seeded successfully.");

  process.exit(0);
};

seedAll();
