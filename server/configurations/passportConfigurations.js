//Dependecies
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//utilities
const utilities = require("./helpers");
const handleJWT = utilities.handleJWT;
const findUserByEmail = utilities.findUserByEmail;
const jwtConfiguration = utilities.jwtConfiguration;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
          findUserByEmail(email)
        .then((user) => {
          if (!user) {
            done(null, false, {
              message: "This e-mail is not registered",
            });
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (isMatch) {
                done(null, user.dataValues);
              } else {
                done(null, false, { message: "Password incorrect" });
              }
            });
          }
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "jwt",
    new JwtStrategy(jwtConfiguration, (payload, done) => {
      handleJWT(payload)
        .then((user) => done(null, user.dataValues))
        .catch((err) => console.error(err));
    })
  );
};