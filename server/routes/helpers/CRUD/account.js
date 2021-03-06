require("dotenv").config();

const db = require("../../../database/configuration/sequelizeConfig");
const { accounts } = db;
const bcrypt = require("bcrypt");
const path = require("path");
const nodemailer = require("nodemailer");

module.exports = {
  registerAdm: (req, res) => {
    accounts
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        adm: true,
        password: req.body.password,
      })
      .then((response) => res.status(200).send({ message: "user created" }))
      .catch((err) => res.status(400).send({ message: err }));
  },
  registerAccount: async (req, res) => {
  let file, firstname, lastname, email, role, password, hash;
    firstname = req.body.file[0];
    lastname = req.body.file[1];
    email = req.body.file[2];
    role = req.body.file[3];
    password = req.body.file[4];
    hash = await bcrypt.hash(password, 10);


    accounts.findOne({where:{email:email}}).then(async(user)=>
      {if(user) return res.status(406).send({message:"This user already exists"})
      if (req.files === null) {
        accounts
          .create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
            adm: false,
            password: hash,
            notification: true,
          })
          .then((response) => {
            res.status(201).send(`the user ${lastname} was created`);
          })
          .catch((err) => console.log(err));
      }
  
      file = req.files.file;
      await file.mv(
        path.join(
          __dirname,
          "../../../../client/public/uploads",
          file.name.replace(/\s/g, "")
        ),
        (err) => {
          if (err) {
            return console.log(err);
          }
        }
      );
  
      accounts
        .create({
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          adm: false,
          avatar_name: file.name,
          avatar: `/uploads/${file.name}`,
          password: hash,
          notification: true,
        })
        .then((response) => {
          res.status(201).send(`the user ${lastname} was created`);
        })
        .catch((err) => console.log(err)); 
}
    ).catch((err) => console.log(err));
    
  },

  editProfile: async (req, res) => {
    const account_id = req.body.data.account_id;
    const newRole = req.body.data.role;
    const newEmail = req.body.data.email;
    const newValue = req.body.data.notification;

    if (req.body.data.newPassword) {
      const newPassword = req.body.data.newPassword;
      const hash = await bcrypt.hash(newPassword, 10);
      accounts
        .update(
          {
            role: newRole,
            email: newEmail,
            notification: newValue,
            password: hash,
          },
          { where: { id: account_id } }
        )
        .then((response) => {
          if (response > 0)
            res.status(200).send({ message: " Your information was updated" });
          else {
            res
              .status(300)
              .send({ message: "You need to add new information" });
          }
        })
        .catch((err) =>
          res.status(500).send({
            message: "Something is wrong with our server, try again later",
          })
        );
    } else {
      accounts
        .update(
          { role: newRole, email: newEmail, notification: newValue },
          { where: { id: account_id } }
        )
        .then((newUserInfo) => {
          if (newUserInfo[0] > 0)
            return res
              .status(200)
              .send({ message: "Your information was updated" });
          if (newUserInfo[0] === 0)
            return res
              .status(409)
              .send({
                message: "You need to add new information in the fields",
              });
        })
        .catch((err) =>
          res.status(500).send({
            message:
              "Something is wrong with our server. Please try again later",
          })
        );
    }
  },
  displayInformation: (req, res) => {
    const account_id = req.query.account_id;
    accounts
      .findOne({ where: { id: account_id } })
      .then((user) =>
        res.status(200).json({
          id: user.dataValues.id,
          firstname: user.dataValues.firstname,
          lastname: user.dataValues.lastname,
          email: user.dataValues.email,
          adm: user.dataValues.adm,
          role: user.dataValues.role,
          avatar_name: user.dataValues.avatar_name,
          token: user.dataValues.token,
        })
      )
      .catch((err) => {
        res.status(500).send({ message: "Something is wrong with our server" });
        console.log(err);
      });
  },
};
