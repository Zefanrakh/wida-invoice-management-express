"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Invoices", "invoiceNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Invoices", "invoiceNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
