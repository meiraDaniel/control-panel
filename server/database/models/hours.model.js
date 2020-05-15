/**
 * @function- create a model for hours table
 * @module hours
 * @type {object} account.day
 * @type {object} account.month
 * @type {object} account.email
 * @type {object} account.hour
 * @type {object} account.account_id
 * @type {object} account.project
 * @return database function
 */


module.exports = (Sequelize, connector) => {
    const hours = connector.define("hours", {
    day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{max: 31,
          min: 1} 
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
        validate:{ max: 12,
          min: 1}
        },
      hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
       max: 24,
        min: 0}
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }    

    });
  
    return hours;
  };