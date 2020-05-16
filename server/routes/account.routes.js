var express = require('express');
var router = express.Router();
const {
 registerAccount,editProfile,displayInformation
} = require("./helpers/CRUD/account");
const {
    loginAuth,authentication
   } = require("./helpers/authentication");


router.post("/register", registerAccount)
router.post("/login", loginAuth)
router.put("/settings",authentication, editProfile)
router.get("/display/profile?",authentication, displayInformation)

module.exports = router;
