const db = require("../../../database/configuration/sequelizeConfig");
const { accounts,hours } = db;
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
    displayAllEmployees: (req,res)=>{
        accounts.findAll({where:{adm:false}}).then(employees=>{
            let data = []
            employees.forEach(employee=> data.push({
                account_id:employee.dataValues.id,
                firstname:employee.dataValues.firstname,

                lastname:employee.dataValues.lastname,
                avatar:employee.dataValues.avatar,
                role:employee.dataValues.role,

            }))
            res.status(200).send(data) 

        }).catch(err => res.status(500).send({message:"Something went wrong, try again later"}))
    },
    displayHoursFromEmployees: (req,res)=>{
        const account_id =req.query.account_id
       

        hours.findAll({where:{account_id:account_id}}).then(hour=>{
            let data = []
            hour.forEach(eachHour=> data.push(eachHour.dataValues))
            res.status(200).send(data) 

        }).catch(err => {
            console.log(err)
            res.status(500).send({message:"Something went wrong, try again later"})
        })
    },
    displayMonthHours: (req,res)=>{
        const account_id =req.query.account_id
        const year =req.query.year
        const month =req.query.month


        hours.findAll({where:{account_id:account_id,year:year,month:month}}).then(hour=>{
            let data = []
            hour.forEach(eachHour=> data.push(eachHour.dataValues))
            res.status(200).send(data.sort((a,b)=> a.day - b.day)) 

        }).catch(err => {
            console.log(err)
            res.status(500).send({message:"Something went wrong, try again later"})
        })
    },
    approveEachHour:(req,res)=>{
        const hourId=req.body.data.hourId
        hours.update({approved:true},{where:{id:hourId}}).then(result=>
       { if (result[0] > 0){
            res.status(200).send({ message: "The information was updated" })
           
        }}).catch(err=>   res
            .status(500)
            .send({
              message:
                "Something is wrong with our server. Please try again later",
            }))
        
    },
    approveAll:(req,res)=>{
        hours.update({approved:true},{where:{approved:false}}).then(result=>
            { if (result[0] > 0){
                 res.status(200).send({ message: "The information was updated" })
                
             }}).catch(err=>   res
                 .status(500)
                 .send({
                   message:
                     "Something is wrong with our server. Please try again later",
                 }))
    }
}