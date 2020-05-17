var express = require('express');
var router = express.Router();
const {
    displayAllEmployees,displayHoursFromEmployees,approveEachHour,approveAll

} = require("./helpers/CRUD/adm");
const {
    authentication
   } = require("./helpers/authentication");


router.get("/employees", authentication,displayAllEmployees)
router.get("/employees/hours?", authentication,displayHoursFromEmployees)
router.put("/employees/approve", authentication,approveEachHour)
router.put("/employees/approveAll", authentication,approveAll)


module.exports = router;