const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/Users.js");

//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//CREATE NEW USER
router.post("/signup", signup);
//LOGIN
router.post("/login", login);
//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-

module.exports = router;
