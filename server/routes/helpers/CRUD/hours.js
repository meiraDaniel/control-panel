const db = require("../../../database/configuration/sequelizeConfig");
const { hours } = db;
const bcrypt = require("bcrypt");
const {
  isObjectEmpty,
  isStringEmpty,
  isArrayEmpty,
  allMandatory,
  thisMandatory,
} = require("../../../utilities/utilities");
const Sequelize = require("sequelize");



module.exports = {
  insertHours: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const userInput = {
      day: req.body.day,
      month: month,
      year: year,
      account_id: req.body.account_id,
      project: req.body.project,
      hour: req.body.hour,
      approved: false,
    };
    let errors = {};

    if (isObjectEmpty(userInput)) errors.message = `${allMandatory}`;
    if (isStringEmpty(userInput.day))
      errors.message = `The field day ${thisMandatory}`;
    if (isObjectEmpty(userInput.hour))
      errors.message = `The field hour ${thisMandatory}`;
    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

    hours
      .findOne({
        where: {
          day: userInput.day,
          month: userInput.month,
          year: userInput.year,
          account_id:userInput.account_id
        },
      })
      .then((hoursExist) => {
        if(!hoursExist) 
        {hours.create({
              day: userInput.day,
              year: userInput.year,
              account_id: userInput.account_id,
              approved: userInput.approved,
              month: userInput.month,
              hour: userInput.hour,
            })
            .then((response) => {
              res
                .status(200)
                .send({ message: "You added your hours to the system" });
            })
            .catch((err) =>
              res
                .status(500)
                .send({ message: "something went wrong try again later" })
            );
        } else{
          res
            .status(409)
            .send({
              message:
                "You already insert your hours for this date. In case you want to update your information, please go to edit hours.",
            });}
      }); 
  },
  editHours: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const userInput = {
      day: req.body.day,
      month: month,
      year: year,
      account_id: req.body.account_id,
      project: req.body.project,
      hour: req.body.hour,
      approved: false,
    };

    const newInfo = {
      newProject: req.body.project,
      newHour: req.body.hour,
    };

    hours
      .update(
        { hour: newInfo.newHour, project: newInfo.newProject },
        {
          where: {
            day: userInput.day,
            month: userInput.month,
            year: userInput.year,
            account_id: userInput.account_id,
          },
        }
      )
      .then((newUserInfo) => {
        if (newUserInfo[0] > 0)
          return res
            .status(200)
            .send({ message: "Your information was updated" });
        if (newUserInfo[0] === 0)
          return res
            .status(200)
            .send({ message: "You need to add new information in the fields" });
      })
      .catch((err) =>
        res
          .status(500)
          .send({
            message:
              "Something is wrong with our server. Please try again later",
          })
      );
  },
/* 
  displayMonthTotal:(req, res) => {
      const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const account_id = req.query.account_id

    hours.findAll({ 
      include: {attributes: ['hour', [Sequelize.fn('sum', Sequelize.col('hour')), 'total']]},
      having : [Sequelize.where({account_id:account_id, month:month,year:year})] }).then(response=> res.status(200).send(response[0].dataValues.total)).catch(err=> res.status(500).send({
        message:
          "Something is wrong with our server. Please try again later",
      }))

  }, */

  displayhours: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const account_id = req.query.account_id;

    hours
      .findAll({ where: { year: year, month: month, account_id: account_id } })
      .then((response) => {
        let data = [];
        if (response.length === 0)
          res.status(404).send({ message: "There is no information avaible" });
        else {
          response.map((e) => data.push(e.dataValues));
          res.status(200).send(data);
        }
      });
  },
  deleteHours: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const account_id =req.body.account_id
    const day = req.body.day

     hours.destroy({where:{account_id:account_id,month:month,day:day,year:year}})
     .then(response=> { 
       if (response > 0)
     return res.status(200).send({ message: "Your hour was deleted" });
   if (response=== 0)
     return res.status(404).send({ message: "Some information are missing in the system. Try to insert other date" }); 
 })
 .catch((err) =>
   res
     .status(500)
     .send({
       message:
         "Something is wrong with our server. Please try again later",
     })
 );
},
  
};