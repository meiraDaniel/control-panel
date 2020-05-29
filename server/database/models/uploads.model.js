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
    const uploads = connector.define("uploads", {
    account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      upload_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      upload: {
        type: Sequelize.BLOB,
        allowNull: true,
      }
    
        }, {timestamps: false});
  
    return uploads;
  };