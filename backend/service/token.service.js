const Jwt = require("jsonwebtoken");

class TokenService {
     generateToken = (id, type) => {
          const token = Jwt.sign({ id, type }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_MINUTE * 60 });
          const expires = new Date(Date.now() + process.env.TOKEN_EXPIRES_MINUTE * 60 * 1000).toLocaleTimeString();
          return { token, expires };
     };
     verifyToken = async (token) => {
          try {
               const verify = await Jwt.verify(token, process.env.JWT_SECRET);
               // console.log("verify", verify);
               return verify;
          } catch (error) {
               if (error.name == "TokenExpiredError") {
                    return { message: "Please Login Again Session Expired " };
               }
          }
     };
}

module.exports = TokenService;
