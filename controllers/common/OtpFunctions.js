const axios = require("axios");
// export functions
module.exports = function common() {
  this.getOtp = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  this.sendWithApi = (mobile , code) => {
    const sendUrl = "https://api.textlocal.in/send/?";
    const api = process.env.TEXTTOLOCALKEY;
    const message = encodeURIComponent(
      `${code} is your OTP code PLEASE DO NOT SHARE WITH ANYONE From Gopal Meena`
    );
    const senderName = "GOPLME";
    const stringMessage = `${sendUrl}apikey=${api}&numbers=${91}${mobile}&message=${message}&sender=${senderName}`;
    // api call
    axios.get(stringMessage).then((result) => {}).catch((err) => {
        console.log(err);
      });
  };
};
