if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
   const passport = require("passport");
  const jwt = require("jsonwebtoken");

module.exports = {
  loginAuth:  (req, res,next) => {
    passport.authenticate("local", (err, user, info) => {

      
       if (err)  {res.status(500).send("Something went wrong"); console.error(err)}
        if (!user) return res.status(400).send(info);
    
        const token = jwt.sign(
          JSON.stringify(user),
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).json({
          success: true,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          adm:user.adm,
          role:user.role,
          avatart:user.avatar,
           token: "Bearer " + token,
        });
      })(req, res, next);
},
authentication:  (req, res,next) => {
passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) console.log(err);
  });
  next();
},
}