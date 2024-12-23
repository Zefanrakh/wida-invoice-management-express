const sequelize = require("../config/db");
const Invoice = require("./invoiceModel");
const Product = require("./productModel");

// Set up associations
Invoice.hasMany(Product, { foreignKey: "invoiceId", as: "products" });
Product.belongsTo(Invoice, { foreignKey: "invoiceId", as: "invoice" });

module.exports = { sequelize, Invoice, Product };
