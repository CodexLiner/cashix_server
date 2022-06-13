const express = require("express");
const authentication = require("../middlewares/authorization");
const router = express.Router();
const bankDetails = require("../models/user_bank_details");

router.post("/", authentication.validate, async (req, res) => {
  console.log(req.body.authkey);
  const bank = new bankDetails({
    _id: req.body.authkey,
    authkey: req.body.authkey,
    name: req.body.name,
    mobile: req.body.mobile,
    UserIfsc: req.body.UserIfsc,
    UserKycId: req.body.UserKycId,
    UserKycIdType: req.body.UserKycIdType,
    UserAccount: req.body.UserAccount,
  });

  try {
    const bankAdded = await bank.save();
    res.json(bankAdded);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:mobile", authentication.validate, async (request, response) => {
  const mobile = request.params.mobile;
  const account = await bankDetails.findById(mobile);
  response.send(account);
});
// exports
module.exports = router;
