const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");
const Userint = require("../models/Users");

const jwtOptions = require("../config/passportconfig");

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await Userint.findById(jwt_payload.id);
      if (user) {
        const now = Date.now() / 1000;
        if (jwt_payload.exp < now) {
          return done(null, false, { message: "El token ha expirado" });
        }
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

module.exports = {
  authenticate: passport.authenticate("jwt", { session: false }),
};
