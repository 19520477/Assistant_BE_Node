const sign_in = require("../controllers/sign_in");
const sign_up = require("../controllers/sign_up");
const { addUser } = require("../controllers/sign_up");

const router = require("express").Router();

router.post("/signup", sign_up.addUser);

router.post("/signin", sign_in.userExist);

module.exports = router;
