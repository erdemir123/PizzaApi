"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
    const { username, email, password } = req.body;
    if ((email || username) && password) {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          let tokenData = await Token.findOne({ userId: user.id });
          if (!tokenData)
            tokenData = await Token.create({
              userId: user.id,
              token: passwordEncrypt(user.id + Date.now()),
            });
          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("This account is not active.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("This account is not active.");
    }
  },
  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */
    const auth = req.headers?.authorization; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
    const result = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
      result,
    });
  },
};
