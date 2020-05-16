var express = require('express');
var router = express.Router();
const{displayPost,createPost,likePost} =require('./helpers/CRUD/walls')
const {
    authentication
   } = require("./helpers/authentication");
router.post("/wall/post",authentication, createPost)
router.get("/wall",authentication, displayPost)
router.put("/wall/like",authentication, likePost)


module.exports = router;