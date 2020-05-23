const db = require("../../../database/configuration/sequelizeConfig");
const { accounts } = db;
const bcrypt = require("bcrypt");
const path = require("path");

module.exports = { 
  
  registerAccount: async(req, res) => {

    const file = req.files.file;
    const firstname = req.body.file[0];
    const lastname = req.body.file[1]; 
    const email = req.body.file[2]; 
    const role = req.body.file[3]; 
    const password = req.body.file[4]; 



      await file.mv(
        path.join(__dirname, "../../../../client/public/uploads", file.name),
        (err) => {
          if (err) {
            return console.log(err);
          }})


      const hash = await bcrypt.hash(password, 10);

      accounts.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: role,
        adm: false,
        avatar_name:file.name,
        avatar:`/uploads/${file.name}`,
        password: hash,
        notification:false
      }).then(response =>  res.status(201).send(`the user ${lastname} was created`) ).catch(err=>
     console.log(err));
    
  },

  editProfile: (req, res) => {

const account_id =req.body.data.account_id
const newRole =  req.body.data.role
const newEmail =  req.body.data.email
const newValue =  req.body.data.notification

  accounts.update({role:newRole,email:newEmail,notification:newValue},{ where:{id:account_id}}).then((newUserInfo)=>{
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
          avatar_name:user.dataValues.avatar_name,
          token: user.dataValues.token,  }) ).catch(err => {res.status(500).send({message:"Something is wrong with our server"});console.log(err)})
}



}
