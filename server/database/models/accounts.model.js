/**
 * @function- create a model for account table
 * @module account
 * @type {object} account.firstname
 * @type {object} account.lastname
 * @type {object} account.email
 * @type {object} account.adm
 * @type {object} account.role
 * @type {object} account.avatar
 * @return database function
 */


module.exports = (Sequelize, connector) => {
    const accounts = connector.define("accounts", {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adm: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.BLOB,
        allowNull: true,
      },

    }, {timestamps: false});
  
    return accounts;
  };