const express = require("express");
const InvoiceController = require("../controllers/invoiceController");
const router = express.Router();

router.post("/", InvoiceController.createInvoice);
router.get("/", InvoiceController.readInvoices);
router.get("/:id", InvoiceController.readOneInvoice);
router.put("/:id", InvoiceController.updateInvoice);
router.delete("/:id", InvoiceController.deleteInvoice);

module.exports = router;
