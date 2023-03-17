const Jwt = require("jsonwebtoken");
const UserService = require("../service/auth.service");
const TokenService = require("../service/token.service");
const UserServiceInstance = new UserService();
const TokenServiceInstance = new TokenService();
const createNewUser = async (req, res) => {
     try {
          const newUser = await UserServiceInstance.createUser(req.body);
          if (newUser.id) {
               const token = TokenServiceInstance.generateToken(newUser.id, process.env.JWT_ACCESS);
               res.json({ newUser, token });
          } else {
               newUser.isLoggedIn = false;
               res.json(newUser);
          }
     } catch (e) {
          res.json(e);
     }
};

const userLoginWithEmailAndPassword = async (req, res) => {
     try {
          const loginUser = await UserServiceInstance.login(req.body);
          if (loginUser.id) {
               const token = TokenServiceInstance.generateToken(loginUser._id, process.env.JWT_REFRESH);
               loginUser.isLoggedIn = true;
               res.json({ loginUser, token });
          } else {
               loginUser["isLoggedIn"] = false;
               res.json(loginUser);
          }
     } catch (error) {
          res.json(error);
     }
};

module.exports = { createNewUser, userLoginWithEmailAndPassword };
