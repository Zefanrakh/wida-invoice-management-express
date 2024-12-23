"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Products", "cogs", "totalCogs");
    await queryInterface.renameColumn(
      "Products",
      "totalPriceSold",
      "totalPrice"
    );
    await queryInterface.renameColumn("Invoices", "invoiceNo", "invoiceNumber");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Products", "totalCogs", "cogs");
    await queryInterface.renameColumn(
      "Products",
      "totalPrice",
      "totalPriceSold"
    );
    await queryInterface.renameColumn("Invoices", "invoiceNumber", "invoiceNo");
  },
};
