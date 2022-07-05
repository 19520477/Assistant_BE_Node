const mongoose = require("mongoose");
//const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    default: null,
    required: true,
  },
  fullname: {
    type: String,
    default: null,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
