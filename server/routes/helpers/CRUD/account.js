const db = require("../../../database/configuration/sequelizeConfig");
const { accounts } = db;
const bcrypt = require("bcrypt");

module.exports = {
  registerAccount: async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);

      accounts.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        adm: req.body.adm,
        avatar: req.body.avatar,
        password: hash,
      });

      res.status(201).send(`the user ${req.body.lastname} was created`);
    } catch {
      (err) => res.send(err);
    }
  },

  editProfile: (req, res) => {

const userEmail = req.body.email
const user = {
  avatar:req.body.avatar,
  role:req.body.role,
  newEmail:req.body.newEmail }

  accounts.update({email:user.newEmail,role:user.role,avatar:user.avatar},{ where:{email:userEmail}}).then((newUserInfo)=>{
   if(newUserInfo[0] > 0) return res.status(200).send({message:"Your information was updated"});
   if(newUserInfo[0] === 0) return res.status(200).send({message:"You need to add new information in the fields"});
   
  }).catch(err=> res.status(500).send({message:"Something is wrong with our server. Please try again later"}))


}

}
