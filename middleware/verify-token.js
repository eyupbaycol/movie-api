const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;
  if (token) {
    jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: "Authenticate failed"
        });
      } else {
        req.decode = decoded;
        next(); // herşey yolunda herhangi bir route ile eşleşebilrsin
      }
    });
  } else {
    res.json({
      status: false,
      message: "token is not found"
    });
  }
};
