const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");
const Userint = require("../models/Users");

//configurar la insersion de los privilegios en el token

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req?.cookies?.jwt;
    },
  ]),
  secretOrKey: process.env.SECRET_PASSPORT,
  expiresIn: 3600,
};

module.exports = jwtOptions;
