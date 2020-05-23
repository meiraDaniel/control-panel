const enVars = require("./envVariables");
const Sequelize = require("sequelize");

const connector = new Sequelize(
  enVars.development.database,
  enVars.development.user,
  enVars.development.password,
  {
    host: enVars.development.host,
    dialect: enVars.development.dialect,
    define: {
      timestamps: false,
    },
  }
);

const authenticate = async (connector) => {
  try {
    await connector.authenticate();
    console.log(`connection to db was good`);
  } catch (e) {
    console.error(e);
  }
};

authenticate(connector);

const db = {};

db.Sequelize = Sequelize;
db.connector = connector;
db.accounts = require("../models/accounts.model")(Sequelize, connector);
db.hours = require("../models/hours.model")(Sequelize, connector);
db.todos = require("../models/todos.model")(Sequelize, connector);
db.walls = require("../models/walls.model")(Sequelize, connector);
db.uploads = require("../models/uploads.model")(Sequelize, connector);


//account conection
db.accounts.hasMany(db.hours, { foreignKey: "account_id", sourceKey: "id" });
db.accounts.hasMany(db.todos, { foreignKey: "account_id", sourceKey: "id" });
db.accounts.hasMany(db.walls, { foreignKey: "account_id", sourceKey: "id" });
db.accounts.hasMany(db.uploads, { foreignKey: "account_id", sourceKey: "id" });


db.walls.belongsTo(db.accounts, { foreignKey: "account_id"});
db.hours.belongsTo(db.accounts, { foreignKey: "account_id"});
db.uploads.belongsTo(db.accounts, { foreignKey: "account_id"});


module.exports = db;