require("dotenv").config();

const db = require("../../../database/configuration/sequelizeConfig");
const { hours, accounts } = db;

const {
 
  getMonthName,
} = require("../../../utilities/utilities");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");

module.exports = {
  displayAllEmployees: (req, res) => {
    accounts
      .findAll({ where: { adm: false } })
      .then((employees) => {
        let data = [];
        employees.forEach((employee) =>
          data.push({
            account_id: employee.dataValues.id,
            firstname: employee.dataValues.firstname,
            avatar_name: `/uploads/${employee.dataValues.avatar_name.replace(/\s/g, '')}`,
            lastname: employee.dataValues.lastname,
            avatar: employee.dataValues.avatar,
            role: employee.dataValues.role,
          })
        );
        res.status(200).send(data);
      })
      .catch((err) =>
        res
          .status(500)
          .send({ message: "Something went wrong, try again later" })
      );
  },
  displayHoursFromEmployees: (req, res) => {
    const account_id = req.query.account_id;

    hours
      .findAll({ where: { account_id: account_id } })
      .then((hour) => {
        let data = [];
        hour.forEach((eachHour) => data.push(eachHour.dataValues));
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Something went wrong, try again later" });
      });
  },
  displayMonthHours: (req, res) => {
    const account_id = req.query.account_id;
    const year = req.query.year;
    const month = req.query.month;

    hours
      .findAll({ where: { account_id: account_id, year: year, month: month } })
      .then((hour) => {
        let data = [];
        hour.forEach((eachHour) => data.push(eachHour.dataValues));
        res.status(200).send(data.sort((a, b) => a.day - b.day));
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Something went wrong, try again later" });
      });
  },
  approveEachHour: async (req, res) => {
    const hourId = req.body.data.hourId;
    await hours
      .update({ approved: true }, { where: { id: hourId } })
      .then((result) => {
        if (result[0] > 0) {
          res.status(200).send({ message: "The information was updated" });
        }
      })
      .catch((err) =>
        res.status(500).send({
          message: "Something is wrong with our server. Please try again later",
        })
      );

    hours
      .findOne(
        {
          include: [
            {
              model: accounts,
              attributes: ["email", "firstname", "notification"],
              required: true,
            },
          ],
        },
        { where: { id: hourId } }
      )
      .then((response) => {
        if (response.dataValues.account.dataValues.notification) {
          const usuario = process.env.EMAIL_USER;
          const senha = process.env.PASSWORD_EMAIL;

          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
              user: usuario,
              pass: senha,
            },
          });
          let info = transporter.sendMail({
            from: '"Bastards" <bastards@example.com>',
            to: `${response.dataValues.account.dataValues.email}`,
            subject: `Congratulations ${response.dataValues.account.dataValues.firstname}`,
            text: `
                 Hello ${response.dataValues.account.dataValues.firstname}
                 Your hours from ${response.dataValues.day}, ${getMonthName(
              response.dataValues.month + 1
            )},${response.dataValues.year} were approved by your manager!`,
            html: `
                 <h1> Hello ${
                   response.dataValues.account.dataValues.firstname
                 } </h1>
                 <p>  Your hours from ${
                   response.dataValues.day
                 }, ${getMonthName(response.dataValues.month + 1)},${
              response.dataValues.year
            } were approved by your manager</p>
                 <p><b> Kind regards,</b></p>`,
          });
        }
      })
      .catch((err) => console.log(err));
  },
  approveAll: (req, res) => {
    hours
      .update({ approved: true }, { where: { approved: false } })
      .then((result) => {
        if (result[0] > 0) {
          res.status(200).send({ message: "The information was updated" });
        }
      })
      .catch((err) =>
        res.status(500).send({
          message: "Something is wrong with our server. Please try again later",
        })
      );

    hours
      .findAll({
        include: [
          {
            model: accounts,
            attributes: ["email", "firstname", "notification"],
            required: true,
          },
        ],
      })
      .then((response) => {
        if (response[0].dataValues.account.dataValues.notification) {
          const usuario = process.env.EMAIL_USER;
          const senha = process.env.PASSWORD_EMAIL;

          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
              user: usuario,
              pass: senha,
            },
          });
          let info = transporter.sendMail({
            from: '"Bastards" <bastards@example.com>',
            to: `${response[0].dataValues.account.dataValues.email}`,
            subject: `Congratulations ${response[0].dataValues.account.dataValues.firstname}`,
            text: `
                         Hello ${
                           response[0].dataValues.account.dataValues.firstname
                         }
                         Your hours from ${getMonthName(
                           response[0].dataValues.month +1
                         )} were all aproved by the manager
                          Kind regards `,
            html: `
                         <h1> Hello ${
                           response[0].dataValues.account.dataValues.firstname
                         }, </h1>
                         <p>  Your hours from ${getMonthName(
                           response[0].dataValues.month +1
                         )} were all aproved by the manager</p>
                                                 <p><b> Kind regards,</b></p>`,
          });
        }
      })
      .catch((err) => console.log(err));
  },
};
