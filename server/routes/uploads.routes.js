var express = require('express');
var router = express.Router();
const {
    displayUploads
} = require("./helpers/CRUD/uploads");
const {
    authentication
   } = require("./helpers/authentication");


router.get("/upload?",authentication, displayUploads)


module.exports = router