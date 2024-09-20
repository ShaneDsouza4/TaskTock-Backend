const JwtStrategy = require("passport-jwt").Strategy; //Auth Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt; //Perform boilerplate funcitonality

const User = require("../models/user.js");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Knows where JWT exists and extracts it
  secretOrKey: process.env.JWT_SECRET, //Password given to sign JWT tokens
};

//Exporting Middleware to see user if the user who they say they are
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user); //Pass use ivg it on to complete auth process
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false, { message: "Server Error" });
        });
    })
  );
};
