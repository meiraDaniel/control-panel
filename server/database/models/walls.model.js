/**
 * @function- create a model for wall table
 * @module wall
 * @type {object} account.account_id 
 * @type {object} account.message 
 * @type {object} account.title 
 * @return database function
 */


module.exports = (Sequelize, connector) => {
    const wall = connector.define("walls", {
    day: {
        message : Sequelize.VARCHAR,
        allowNull: false,
      },
      title : {
        type: Sequelize.VARCHAR,
        allowNull: false,
      },
      account_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      }

    });
  
    return wall;
  };