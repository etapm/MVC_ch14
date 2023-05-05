const Sequelize = require("sequelize");
const path = require("path");
require("dotenv").config();

const configPath = path.resolve(__dirname, ".", "config.js");
const env = process.env.NODE_ENV || "development";
const config = require(configPath)[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

module.exports = sequelize;
