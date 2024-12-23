const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

/**
 * @typedef {Object} ProductAttributes
 * @property {string} itemName
 * @property {number} quantity
 * @property {number} totalCogs
 * @property {number} totalPrice
 */

/**
 * @extends {Model<ProductAttributes>}
 */
class Product extends Model {}

Product.init(
  {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5] },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    totalCogs: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

module.exports = Product;
