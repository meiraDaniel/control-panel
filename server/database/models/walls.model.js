/**
 * @function- create a model for wall table
 * @module wall
 * @type {object} account.account_id 
 * @type {object} account.message 
 * @type {object} account.title 
 * @return database function
 */


module.exports = (Sequelize, connector) => {
    const walls = connector.define("walls", {
      title: {
        type : Sequelize.STRING,
        allowNull: false,
      },
      message : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
       
      }

    });
  
    return walls;
  };