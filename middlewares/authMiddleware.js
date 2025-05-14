const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // تحقق من وجود token في الـ authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).send({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is missing from Authorization header",
      });
    }

    JWT.verify(token, "secret", (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorized User",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};
