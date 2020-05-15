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
        task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account_id  : {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return todos;
  };