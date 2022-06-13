const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  validate: function (request, response, next) {
    const authHeader = request.headers["authorization"];
    if (authHeader === null) {
      response.send({ error: true, message: "authrization can not be null" });
    }
    const token = authHeader.split(" ")[1];
    if (token == null) response.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) {
        response.send(401);
      } else {
        request.mobile = user;
        console.log(user)
        next();
      }
    });
  },
};
