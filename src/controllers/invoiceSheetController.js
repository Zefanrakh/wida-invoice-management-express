const { utils, readFile } = require("xlsx");
const fs = require("fs");
const { Invoice, Product } = require("../models");
const { setNullFields } = require("../utils/helper/setNullField");
const { ValidationError } = require("sequelize");

const InvoiceSheetController = {
  /**
   * @typedef {Object} UploadedFile
   * @property {string} fieldname
   * @property {string} originalname
   * @property {string} encoding
   * @property {string} mimetype
   * @property {string} destination
   * @property {string} filename
   * @property {string} path
   * @property {number} size
   */

  /**
   * Import invoices and products from xlsx file.
   *
   * @param {Object} req
   * @param {UploadedFile} req.file
   * @param {Object} res
   * @returns {Promise<void>}
   */
  async importXlsx(req, res) {
    try {
      const filePath = req.file.path;
      const workBook = readFile(filePath);
      /**
       * @type {Array<{"invoice no": string, date: Date, customer: string, salesperson: string, "payment type": "CASH"|"CREDIT", notes: string}>}
       */
      const invoiceSheet = utils.sheet_to_json(workBook.Sheets["invoice"]);
      /**
       * @type {Array<{"Invoice no": string, item: string, quantity: number, "total cogs": number, "total price": number}>}
       */
      const productSheet = utils.sheet_to_json(workBook.Sheets["product sold"]);

      /**
       * @type {Array<{invoiceNumber: number, error: string}>}
       */
      const errorInvoices = [];
      /**
       * @type {Array<number>}
       */
      const validInvoices = [];

      const transaction = await Invoice.sequelize.transaction();

      try {
        for (const invoiceRow of invoiceSheet) {
          const {
            "invoice no": invoiceNumber,
            date,
            customer: customerName,
            salesperson: salespersonName,
            "payment type": paymentType,
            notes,
          } = invoiceRow;

          // Validate fields
          if (
            !invoiceNumber ||
            !date ||
            !customerName ||
            !salespersonName ||
            !paymentType
          ) {
            errorInvoices.push({
              invoiceNumber,
              error: `Required fields are missing. ${JSON.stringify(
                setNullFields({
                  expectedFields: [
                    "invoice no",
                    "date",
                    "customer",
                    "salesperson",
                    "payment type",
                    "notes",
                  ],
                  obj: invoiceRow,
                })
              )}`,
            });
            continue;
          }

          // // Validate existing invoice number
          // const existingInvoice = await Invoice.findOne({
          //   where: { invoiceNumber },
          //   transaction,
          // });
          // if (existingInvoice) {
          //   errorInvoices.push({
          //     invoiceNumber,
          //     error: "Invoice number already exists.",
          //   });
          //   continue;
          // }

          // Validate related products
          const products = productSheet.filter(
            (p) =>
              p["Invoice no"] === invoiceNumber ||
              p["invoice no"] === invoiceNumber
          );
          if (products.length === 0) {
            errorInvoices.push({
              invoiceNumber,
              error: "No products found for this invoice.",
            });
            continue;
          }

          // Validate each product
          const invalidProducts = products.filter(
            (p) =>
              !p.item ||
              p.item.length < 5 ||
              !p.quantity ||
              p.quantity < 1 ||
              !p["total cogs"] ||
              p["total cogs"] < 0 ||
              !p["total price"] ||
              p["total price"] < 0
          );

          if (invalidProducts.length > 0) {
            errorInvoices.push({
              invoiceNumber,
              error: `Invalid product data: ${JSON.stringify(
                invalidProducts.map((invalidProduct) =>
                  setNullFields({
                    expectedFields: [
                      "Invoice no",
                      "item",
                      "quantity",
                      "total cogs",
                      "total price",
                    ],
                    obj: invalidProduct,
                  })
                )
              )}`,
            });
            continue;
          }

          // Create invoice and products
          try {
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

            for (const product of products) {
              const {
                item: itemName,
                quantity,
                "total cogs": totalCogs,
                "total price": totalPrice,
              } = product;
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
            validInvoices.push(invoiceNumber);
          } catch (error) {
            if (error instanceof ValidationError) {
              errorInvoices.push({
                invoiceNumber,
                error: error.errors.map((e) => e.message).join(", "),
              });
            } else {
              errorInvoices.push({
                invoiceNumber,
                error: error.message,
              });
            }
          }
        }

        await transaction.commit();

        // Respond with results
        res.status(200).json({
          success: true,
          message: "File processed successfully.",
          validInvoices,
          errorInvoices,
        });
      } catch (error) {
        await transaction.rollback();
        res.status(500).json({
          success: false,
          message: error.message,
        });
      } finally {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = InvoiceSheetController;
