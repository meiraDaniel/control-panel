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

const account_id =req.body.data.account_id
const newRole =  req.body.data.role
const newEmail =  req.body.data.email

  accounts.update({role:newRole,email:newEmail},{ where:{id:account_id}}).then((newUserInfo)=>{
   if(newUserInfo[0] > 0) return res.status(200).send({message:"Your information was updated"});
   if(newUserInfo[0] === 0) return res.status(409).send({message:"You need to add new information in the fields"});
   
  }).catch(err=> res.status(500).send({message:"Something is wrong with our server. Please try again later"}))

 
},
displayInformation:(req,res)=>{
  const account_id=req.query.account_id
  accounts.findOne({where:{id:account_id}}).then(user=>  res.status(200).json({
          id: user.dataValues.id,   
          firstname: user.dataValues.firstname,
          lastname: user.dataValues.lastname,
          email:user.dataValues.email,
          adm:user.dataValues.adm,
          role:user.dataValues.role,
          avatart:user.dataValues.avatar,
          token: user.dataValues.token,  }) ).catch(err => {res.status(500).send({message:"Something is wrong with our server"});console.log(err)})
}



}
