/**
 * @function- create a model for todos table
 * @module todos
 * @type {object} account.account_id 
 * @type {object} account.message 
 * @type {object} account.title 
 * @return database function
 */


module.exports = (Sequelize, connector) => {
    const todos = connector.define("todos", {
    day: {
        account_id  : Sequelize.INTEGER,
        allowNull: false,
      },
      task  : {
        type: Sequelize.VARCHAR,
        allowNull: false,
      }

    });
  
    return todos;
  };