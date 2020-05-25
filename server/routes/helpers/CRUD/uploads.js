
require("dotenv").config();

const db = require("../../../database/configuration/sequelizeConfig");
const { uploads } = db;


module.exports = {
    displayUploads: (req, res) => {
        const account_id = req.query.account_id;
    console.log(account_id)
        uploads
          .findAll({ where: { account_id: account_id } })
          .then((upload) => {
           let data = [];
            upload.forEach((eachUpload) => data.push({
              id:eachUpload.dataValues.id,
              day:eachUpload.dataValues.day,
              month:eachUpload.dataValues.month,
              year:eachUpload.dataValues.year,
              upload:`/documents/${eachUpload.dataValues.upload_name}`,
              upload_name:eachUpload.dataValues.upload_name,
              upload_data: eachUpload.dataValues.upload

            }));
            res.status(200).send(data); 
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .send({ message: "Something went wrong, try again later" });
          });
      }
}
