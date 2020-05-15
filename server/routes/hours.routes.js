var express = require('express');
var router = express.Router();
const {insertHours,editHours,displayhours,deleteHours,displayMonthTotal}= require('./helpers/CRUD/hours')
const {
    authentication
   } = require("./helpers/authentication");

router.post("/myhours/insert",authentication, insertHours)
router.put("/myhours/edit",authentication, editHours)
router.get("/myhours?:account_id",authentication, displayhours)
router.delete("/myhours/delete",authentication, deleteHours)
/* router.get("/myhours/total?:account_id",authentication, displayMonthTotal)
 */
module.exports = router;
