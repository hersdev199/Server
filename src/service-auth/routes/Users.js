const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/Users.js");

//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-
//CREATE NEW USER
router.post("/signup", signup);
//*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-

module.exports = router;
