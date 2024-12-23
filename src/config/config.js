require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "invoice_management",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "invoice_management",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};
