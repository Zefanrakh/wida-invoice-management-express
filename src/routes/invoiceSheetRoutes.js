const express = require("express");
const InvoiceSheetController = require("../controllers/invoiceSheetController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", upload.single("file"), InvoiceSheetController.importXlsx);

module.exports = router;
