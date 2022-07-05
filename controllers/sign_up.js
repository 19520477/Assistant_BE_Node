const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const sign_up = {
  addUser: async (req, res) => {
    const { email, username, fullname, password } = req.body;
    if (!email || !username || !fullname || !password)
      return res.status(401).json({
        success: false,
        message: "Missing fields, please doublecheck your request",
      });

    try {
      const checkEmailExists = await User.findOne({ email });
      if (checkEmailExists)
        return res.status(401).json({
          success: false,
          message: "Email already exists, please try again",
        });

      const checkUsernameExists = await User.findOne({ username });
      if (checkUsernameExists)
        return res.status(401).json({
          success: false,
          message: "Username already exists, please try again",
        });

      const hashed_password = await argon2.hash(password);

      const newUser = await User.create({
        email: email.toLowerCase(),
        username,
        fullname,
        password: hash_password,
      });
      await newUser.save();

      const token = await jwt.sign(
        { userId: newUser._id },
        process.env.TOKEN_KEY
      );

      newUser.token = token;

      return res.status(200).json({
        success: true,
        message: "Create new user successfully",
        token,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: `Internal server error: ${err}` });
    }
  },
};

module.exports = sign_up;
