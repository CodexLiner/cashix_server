const { response } = require("express");
const functions = require("./common/OtpFunctions");
const authorization = require("../middlewares/authorization");
const common = new functions();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const DataOtp = require("../models/otps");

// function for otp sending
router.post("/", async (request, response) => {
  // required variables
  const mobile = request.body.mobile;
  const rawOtp = common.getOtp();
  const user = { mobile: mobile };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "60m" });
  // deleting old otp
  if (DataOtp.findById(mobile)) {
    await DataOtp.deleteOne({ _id: mobile });
  }
  
  const otpModel = new DataOtp({ mobile: mobile,code: rawOtp,_id: mobile,lastToken: token,});
  const data = await otpModel.save();
  //   common.sendWithApi(mobile , rawOtp)
  response.send(data);

});

// function for validating otp

router.post("/submit", authorization.validate, async (request, response) => {
  const code = request.body.code;
  const mobile = request.body.mobile;
  const otpOnServer = await DataOtp.findOne({ _id: mobile });
  if (otpOnServer!=null && otpOnServer.code === code) {
    await DataOtp.deleteOne({ _id: mobile });
    const token = jwt.sign(mobile, process.env.ACCESS_TOKEN);
    response.send({error : false , message : "login succesfull" , token : token});
  }else{response.send({error : true , message : "invalid one time password"})}

});


// export
module.exports = router;
