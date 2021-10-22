const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const {
    users,
    sessions,
    // roles,
    permissions,
} = require('./schema')(sequelize, Sequelize);

users.User.hasOne(sessions.Sessions);
sessions.Sessions.belongsTo(users.User);

users.User.belongsToMany(permissions.Permissions, { through: "roles", as: "Permissions" })
permissions.Permissions.belongsToMany(users.User, { through: "roles", as: "Users" })

module.exports = db;
