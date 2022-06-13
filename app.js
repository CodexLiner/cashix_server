require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const PORT = process.env.PORT || 5000;

//routes
const loginRoutes = require("./routes/loginRoute");
const bankRoute = require("./routes/bankDetails");
const transaction = require("./routes/transactions");
const stripe = require("./routes/stripe");

// controllers
const auth = require("./controllers/Auth");
const account = require("./controllers/bank");

app.use(bodyParser.json());
// new routes
app.use("/authentication", auth);
app.use("/account", account);
app.use("/create-payment-intent", stripe);

// end new routs

app.use("/crepaid_bank_details", bankRoute);
app.use("/payments", transaction);

//db conection
mongoose.connect(process.env.DB, () => {
  console.log("Cashix App Connected With Database!");
});

// server start
app.listen(PORT, () => console.log(`Cashix App Listening On Port ${PORT}!`));
