const db = require("../../../database/configuration/sequelizeConfig");
const { hours, uploads } = db;
const bcrypt = require("bcrypt");
const {
  isObjectEmpty,
  isStringEmpty,
  isArrayEmpty,
  allMandatory,
  thisMandatory,
} = require("../../../utilities/utilities");
const Sequelize = require("sequelize");
const path = require("path");

module.exports = {
  insertHours: async (req, res) => {
let file, file_name, account_id,day,hour,project

    if(req.files !== null)
    { file = req.files.file;
     file_name = file.name;
      account_id = req.body.file[0];
      day = req.body.file[1];
      hour = req.body.file[2];
      project = req.body.file[3];
     await file.mv(
      path.join(__dirname, "../../../../client/public/documents", file.name),
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );}else{
      account_id = req.body.file[1];
      day = req.body.file[2];
      hour = req.body.file[3];
      project = req.body.file[4];
    }

     


    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const userInput = {
      day: day,
      month: month,
      year: year,
      account_id: account_id,
      project: project,
      hour: hour,
      approved: false,
    };
    let errors = {};
    if (isObjectEmpty(userInput)) errors.message = `${allMandatory}`;
    if (isStringEmpty(userInput.day))
      errors.message = `The field day ${thisMandatory}`;
    if (!userInput.hour) errors.message = `The field hour ${thisMandatory}`;
    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

    hours
      .findOne({
        where: {
          day: userInput.day,
          month: userInput.month,
          year: userInput.year,
          account_id: userInput.account_id,
        },
      })
      .then((hoursExist) => {
        if (!hoursExist) {
          if (req.files !== null) {
            console.log('here')
            uploads.create({
              account_id: userInput.account_id,
              day: userInput.day,
              month: userInput.month,
              year: userInput.year,
              upload_name: file_name,
              upload: file,
            });
            hours
              .create({
                day: userInput.day,
                year: userInput.year,
                account_id: userInput.account_id,
                approved: userInput.approved,
                month: userInput.month,
                hour: userInput.hour,
                project: userInput.project,
              })
              .then((response) => {
                res
                  .status(200)
                  .send({ message: "You added your hours to the system" });
              })
              .catch((err) =>
                res
                  .status(500)
                  .send({
                    errors: { message: "something went wrong try again later" },
                  })
              );
          } else {
            hours
              .create({
                day: userInput.day,
                year: userInput.year,
                account_id: userInput.account_id,
                approved: userInput.approved,
                month: userInput.month,
                hour: userInput.hour,
                project: userInput.project,
              })
              .then((response) => {
                res
                  .status(200)
                  .send({ message: "You added your hours to the system" });
              })
              .catch((err) =>
                res
                  .status(500)
                  .send({
                    errors: { message: "something went wrong try again later" },
                  })
              );
          }
        } else {
          res
            .status(409)
            .send({
              errors: {
                message:
                  "You already insert your hours for this date. In case you want to update your information, please go to edit hours.",
              },
            });
        }
      });
  },
  editHours: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const id = req.body.data.id;

    const newInfo = {
      newProject: req.body.data.newProject,
      newHour: req.body.data.newHour,
    };
    hours
      .update(
        { hour: newInfo.newHour, project: newInfo.newProject },
        {
          where: {
            id: id,
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
        res.status(500).send({
          message: "Something is wrong with our server. Please try again later",
        })
      );
  },

  displayMonthTotal: (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const account_id = req.query.account_id;

    hours
      .sum("hour", {
        where: { account_id: account_id, month: month, year: year },
      })
      .then((response) => res.status(200).send({ value: response }))
      .catch((err) => {
        res.status(500).send({
          message: "Something is wrong with our server. Please try again later",
        });
      });
  },

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
          res.status(200).send(data.sort((a, b) => a.day - b.day));
        }
      });
  },
  deleteHours: (req, res) => {
    const id = req.body.id;

    hours
      .destroy({ where: { id: id } })
      .then((response) => {
        if (response > 0)
          return res.status(200).send({ message: "Your hour was deleted" });
        if (response === 0)
          return res
            .status(404)
            .send({
              message:
                "Some information are missing in the system. Try to insert other date",
            });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Something is wrong with our server. Please try again later",
        });
      });
  },
};
