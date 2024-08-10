const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/Users.js");

//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//CREATE NEW USER
router.post("/signup", signup);
//LOGIN
router.post("/login", login);

router.get("/logout", logout);
//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-

module.exports = router;
