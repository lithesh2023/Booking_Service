const jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const validateToken = (req, res, next) => {
  try {
    console.log("headers", req.headers.authorization);
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecretKey);
    if (decoded) {
      req.user = decoded.userData;
      return next();
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};

module.exports = {
  validateToken,
};
