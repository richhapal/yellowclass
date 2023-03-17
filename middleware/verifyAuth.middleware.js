const Jwt = require("jsonwebtoken");
const TokenService = require("../service/token.service");
const TokenServiceInstance = new TokenService();
const verifyAuth = async (req, res, next) => {
     const token = req.headers.authorization;
     let message = "No Token Found";
     if (!token) {
          res.json({ message });
     }
     if (token) {
          let verifyToken = await TokenServiceInstance.verifyToken(token);
          if (verifyToken.iat) {
               next();
          } else {
               res.json(verifyToken);
          }
     }
};

module.exports = verifyAuth;
