const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const sign_in = {
  userExist: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({
        success: false,
        message: `Missing fields, please doublecheck your request`,
      });

    try {
      const checkUserExists = await User.findOne({ email });
      if (!checkUserExists)
        return res.status(404).json({
          success: false,
          message: "User not found, please try again",
        });

      const validPassword = argon2.verify(checkUserExists.password, password);
      if (!validPassword)
        return res.status(403).json({
          success: false,
          message: "Bad request: wrong password, please try again",
        });

      const accessToken = jwt.sign(
        {
          userId: checkUserExists._id,
        },
        process.env.TOKEN_KEY
      );

      return res
        .status(200)
        .json({ success: true, message: "Login successfully", accessToken });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: `Internal server error: ${err}` });
    }
  },
};

module.exports = sign_in;
