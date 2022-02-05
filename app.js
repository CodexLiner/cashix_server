require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const PORT = process.env.PORT || 5000
//routes
const loginRoutes = require("./routes/loginRoute");
const bankRoute = require("./routes/bankDetails");
const transaction = require("./routes/transactions");
const stripe = require("./routes/stripe");

app.use(bodyParser.json());
app.use("/crepaid_login", loginRoutes);
app.use("/crepaid_bank_details", bankRoute);
app.use("/payments", transaction);
app.use("/create-payment-intent", stripe);

//db conection 
mongoose.connect(process.env.DB, () => {
  console.log("db connected!");
});
// server start
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
