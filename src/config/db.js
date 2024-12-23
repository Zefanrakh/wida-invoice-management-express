const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "invoice_management",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
