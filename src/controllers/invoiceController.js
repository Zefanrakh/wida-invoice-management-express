const { ValidationError } = require("sequelize");
const { Invoice, Product } = require("../models");

const InvoiceController = {
  /**
   * Create a new invoice.
   *
   * @param {Object} req
   * @param {Object} req.body
   * @param {string} req.body.invoiceNumber
   * @param {Date} req.body.date
   * @param {string} req.body.customerName
   * @param {string} req.body.salespersonName
   * @param {"CASH" | "CREDIT"} req.body.paymentType
   * @param {string} [req.body.notes]
   * @param {Array<{itemName: string, quantity: number, totalCogs: number, totalPrice: number}>} req.body.products
   * @param {Object} res
   * @returns {Promise<void>}
   */
  async createInvoice(req, res) {
    const transaction = await Invoice.sequelize.transaction();
    try {
      const {
        invoiceNumber,
        date,
        customerName,
        salespersonName,
        paymentType,
        notes,
        products,
      } = req.body;

      // Create invoice
      const invoice = await Invoice.create(
        {
          invoiceNumber,
          date,
          customerName,
          salespersonName,
          paymentType,
          notes,
        },
        { transaction }
      );

      // Add invoice product
      for (const product of products) {
        const { itemName, quantity, totalCogs, totalPrice } = product;
        await Product.create(
          {
            invoiceId: invoice.id,
            itemName,
            quantity,
            totalCogs,
            totalPrice,
          },
          { transaction }
        );
      }

      await transaction.commit();
      res.status(201).json({ success: true, data: invoice });
    } catch (error) {
      let errorMessage = error.message;
      if (error instanceof ValidationError) {
        errorMessage = error.errors.map((e) => e.message).join(", ");
      }
      await transaction.rollback();
      res.status(500).json({ success: false, message: errorMessage });
    }
  },

  async readInvoices(req, res) {
    try {
      const { date, size = 10, page = 1 } = req.query;
      const limit = parseInt(size);
      const offset = (parseInt(page) - 1) * limit;

      let dateQuery = {};
      if (date) {
        dateQuery = { date };
      }

      const queries = {
        ...(dateQuery && dateQuery),
      };

      const invoices = await Invoice.findAndCountAll({
        where: queries,
        include: [{ model: Product, as: "products" }],
        limit,
        offset,
        distinct: true,
      });

      res.status(200).json({ success: true, data: invoices });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async readOneInvoice(req, res) {
    try {
      const { id } = req.params;
      const invoices = await Invoice.findOne({
        where: { id },
        include: [{ model: Product, as: "products" }],
        distinct: true,
      });

      res.status(200).json({ success: true, data: invoices });
    } catch (error) {
      res.status(500).json({ success: false, message: errorMessage });
    }
  },

  /**
   * Update an invoice.
   *
   * @param {Object} req
   * @param {Object} req.body
   * @param {string} req.body.invoiceNumber
   * @param {Date} req.body.date
   * @param {string} req.body.customerName
   * @param {string} req.body.salespersonName
   * @param {"CASH" | "CREDIT"} req.body.paymentType
   * @param {string} [req.body.notes]
   * @param {Array<{itemName: string, quantity: number, totalCogs: number, totalPrice: number}>} req.body.products
   * @param {Object} res
   * @returns {Promise<void>}
   */
  async updateInvoice(req, res) {
    const transaction = await Invoice.sequelize.transaction();
    try {
      const { id } = req.params;
      const {
        invoiceNumber,
        date,
        customerName,
        salespersonName,
        paymentType,
        notes,
        products,
      } = req.body;

      // Update invoice
      await Invoice.update(
        {
          invoiceNumber,
          date,
          customerName,
          salespersonName,
          paymentType,
          notes,
        },
        { where: { id }, transaction }
      );

      // Replace inovice products
      if (Array.isArray(products)) {
        // Only delete existing products if products field provided in the request body.
        if (!products.length) {
          throw new Error("An invoice must contain at least one product.");
        }
        await Product.destroy({ where: { invoiceId: id }, transaction });
      }
      for (const product of products ?? []) {
        const { itemName, quantity, totalCogs, totalPrice } = product;
        await Product.create(
          {
            invoiceId: id,
            itemName,
            quantity,
            totalCogs,
            totalPrice,
          },
          { transaction }
        );
      }

      await transaction.commit();
      res.status(200).json({ success: true });
    } catch (error) {
      let errorMessage = error.message;
      if (error instanceof ValidationError) {
        errorMessage = error.errors.map((e) => e.message).join(", ");
      }
      await transaction.rollback();
      res.status(500).json({ success: false, message: errorMessage });
    }
  },

  async deleteInvoice(req, res) {
    const transaction = await Invoice.sequelize.transaction();
    try {
      const { id } = req.params;

      await Product.destroy({ where: { invoiceId: id }, transaction });
      const result = await Invoice.destroy({ where: { id }, transaction });

      await transaction.commit();
      res.status(200).json({ success: result > 0 });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = InvoiceController;
