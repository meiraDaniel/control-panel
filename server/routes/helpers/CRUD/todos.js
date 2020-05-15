const db = require("../../../database/configuration/sequelizeConfig");
const { todos } = db;
const Sequelize = require("sequelize");

const {
  isObjectEmpty,
  isStringEmpty,
  isArrayEmpty,
  allMandatory,
  thisMandatory,
} = require("../../../utilities/utilities");


module.exports = {
  creatTask: (req, res) => {
  
    const userInput = {
     account_id: req.body.account_id,
     task:req.body.task,
      
    };
    let errors = {};

    if (isObjectEmpty(userInput)) errors.message = `${allMandatory}`;
    if (isStringEmpty(userInput.task))
      errors.message = `The field task ${thisMandatory}`;
 
    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

   
    todos.create({
              task: userInput.task,
              account_id: userInput.account_id,
              
            })
            .then((response) => {
              res
                .status(200)
                .send({ message: "This task was added to your list" });
            })
            .catch((err) =>
              res
                .status(500)
                .send({ message: "something went wrong try again later" })
            );
       
      },
  

  displayTask: (req, res) => {
     const account_id = req.query.account_id;

     todos.findAll({ where: { account_id: account_id }})
      .then((response) => {  
       let data = [];
        if (response.length === 0)   res.status(404).send({ message: "Congratulations, you have no tasks left" });
        else {   
           response.map((e) => data.push(e.dataValues));
           res.status(200).json(data)   
      }}).catch(err => {console.error(err); res.status(500).send({message:"Our list went lost, try again latter"})});
  },

 


 deleteTask: (req, res) => {
  const account_id = req.body.account_id;
   const taskId = req.body.taskId

   todos.destroy({where:{account_id:account_id,id:taskId}})
   .then(response=> { 
   if (response > 0) return res.status(200).send([response]);
 if (response=== 0) return res.status(404).send({ message: "Some information are missing in the system" });
})
.catch((err) =>
 {res.status(500).send({
     message:
       "Something is wrong with our server. Please try again later",
   }); console.log(err)}
);
},
};
