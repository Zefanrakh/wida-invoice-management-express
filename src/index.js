const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const invoiceRoutes = require("./routes/invoiceRoutes");
const invoiceSheetRoutes = require("./routes/invoiceSheetRoutes");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invoices/upload", invoiceSheetRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
