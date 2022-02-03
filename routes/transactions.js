const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const trans = require("../models/transactions");
const rents = require("../models/RentModel");
router.post("/", auth, async (req, res) => {
  const newTrans = new trans({
    transactionId: req.body.transactionId,
    status: req.body.status,
    amount: req.body.amount,
    authkey: req.body.authkey,
    type: req.body.type,
  });
  try {
    const addTrans = await newTrans.save();
    res.json(addTrans);
  } catch (e) {
    console.log(e);
  }
});
router.post("/rents", auth, async (req, res) => {
  const mRents = new rents({
    transaction_id: req.body.transactionId,
    description: req.body.transactionDesc,
    date: req.body.transactionDate,
    mobile: req.mobile,
    account: req.body.transactionAC,
    ifsc: req.body.transactionIfsc,
    holderName: req.body.transactionName,
    amount: req.body.transactionAmount,
    status: "pending",
  });
  try {
    const savedRent = await mRents.save();
    res.json(savedRent);
  } catch (e) {
    console.log(e);
  }
});
router.get("/list", auth, async (req, res) => {
  console.log(req.mobile);
  // res.sendS(200);
  try {
    const transactionList = await trans.find({ authkey: req.mobile });
    res.json(transactionList);
  } catch (e) {
    console.log(e);
  }
});
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  console.log(`the token is ${token}`);
  const userCode = req.body.code;
  if (token == null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      res.send(401);
    }
    req.mobile = user;
    next();
  });
}
// exports
module.exports = router;
