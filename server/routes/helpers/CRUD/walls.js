const db = require("../../../database/configuration/sequelizeConfig");
const { walls } = db;
const Sequelize = require("sequelize");

const {
  isObjectEmpty,
  isStringEmpty,
  isArrayEmpty,
  allMandatory,
  thisMandatory,
} = require("../../../utilities/utilities");


module.exports = {
  createPost: (req, res) => {
  
    const userInput = {
     account_id: req.body.account_id,
     title:req.body.title,
      message:req.body.message
    };
    let errors = {};

    if (isObjectEmpty(userInput)) errors.message = `${allMandatory}`;
    if (isStringEmpty(userInput.title))
      errors.message = `The field title ${thisMandatory}`;
    if (isObjectEmpty(userInput.message))
      errors.message = `The field message ${thisMandatory}`;
    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

   
    walls.create({
              title: userInput.title,
              message: userInput.message,
              account_id: userInput.account_id,
              likes:0
            })
            .then((response) => {
              res
                .status(200)
                .send({ message: "Your post was created" });
            })
            .catch((err) =>
              res
                .status(500)
                .send({ message: "something went wrong try again later" })
            );
       
      },
  

  displayPost: (req, res) => {
const account_id = req.query.account_id
     walls.findAll({include: [{model:db.accounts, attributes:['firstname',"avatar"]}], required: true})
      .then((response) => { 
       let data = [];
        if (response.length === 0)
          res.status(404).send({ message: "There is no information avaible" });
        else {
          response.map((e) => data.push({postId:e.dataValues.id, title:e.dataValues.title, message:e.dataValues.message,firstname:e.dataValues.account.dataValues.firstname,avatar:e.dataValues.account.dataValues.avatar}));
res.status(200).json(data.sort((a,b)=> b.postId - a.postId))} 
      }).catch(err => {console.error(err); res.status(500).send({message:"Our wall is broke at the moment, try again latter"})});
  },

  likePost: (req, res) => {
    
    const postId = req.body.postId;
    

    walls.update({likes:Sequelize.literal('likes + 1')}, {where:{ id: postId }})
    .then((response) => { 
        if (response.length === 0)
         res.status(404).send({ message: "Our wall is broke at the moment, try again latter" });
       else {
       res.status(200).send(response) }
     } ).catch(err => {console.error(err); res.status(500).send({message:"Our wall is broke at the moment, try again latter"})});
 },
};
