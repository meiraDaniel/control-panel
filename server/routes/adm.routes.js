var express = require('express');
var router = express.Router();
const {
    displayAllEmployees,displayHoursFromEmployees,approveEachHour,approveAll,displayMonthHours

} = require("./helpers/CRUD/adm");
const {
    authentication
   } = require("./helpers/authentication");


router.get("/employees", authentication,displayAllEmployees)
router.get("/employees/hours?", authentication,displayHoursFromEmployees)
router.put("/employees/approve", authentication,approveEachHour)
router.put("/employees/approveAll", authentication,approveAll)
router.get("/employees/month/hours?", authentication,displayMonthHours)


module.exports = router;