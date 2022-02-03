const mongoose = require("mongoose");
const rents = mongoose.Schema({
  transaction_id: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  mobile: { type: String, required: true },
  account: { type: String, required: true },
  ifsc: { type: String, required: true },
  holderName: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
});

// exports
module.exports = mongoose.model("rents", rents);
