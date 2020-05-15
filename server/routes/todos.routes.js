var express = require('express');
var router = express.Router();
const{displayTask,deleteTask,creatTask} =require('./helpers/CRUD/todos')
const {
    authentication
   } = require("./helpers/authentication");


router.get("/todo?",authentication, displayTask)
router.post("/todo/post",authentication, creatTask)
router.delete("/todo/delete",authentication, deleteTask)


module.exports = router;