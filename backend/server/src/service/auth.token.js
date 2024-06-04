require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.adminAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Không vào được. Thiếu token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, dataDecoded) => {
    if (err)
      return res.status(401).json({
        message: "Token không hợp lệ",
      });
    if (dataDecoded.role !== 1) {
      return res.status(401).json({
        message: "Bạn không phải admin",
      });
    } else next();
  });
};

exports.userAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Không là token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, dataDecoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token không hợp lệ",
      });
    }
    else {
      req.token = token;      
      req.user = dataDecoded;      
      next();
    }
  });
};
