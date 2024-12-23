const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

/**
 * @typedef {Object} InvoiceAttributes
 * @property {string} invoiceNumber
 * @property {Date} date
 * @property {string} customerName
 * @property {string} salespersonName
 * @property {"CASH" | "CREDIT"} paymentType
 * @property {string} [notes]
 */

/**
 * @extends {Model<InvoiceAttributes>}
 */
class Invoice extends Model {}

Invoice.init(
  {
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Invoice number already exists",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2] },
    },
    salespersonName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2] },
    },
    paymentType: {
      type: DataTypes.ENUM("CASH", "CREDIT"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["CASH", "CREDIT"]],
          msg: "Invalid payment type. Must be either CASH or CREDIT.",
        },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      validate: { len: [5] },
    },
  },
  {
    sequelize,
    modelName: "Invoice",
  }
);

module.exports = Invoice;
