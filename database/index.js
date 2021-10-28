const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const {
    users,
    sessions,
    permissions,
} = require('./schema')(sequelize, Sequelize);

users.User.hasOne(sessions.Sessions);
sessions.Sessions.belongsTo(users.User);

users.User.belongsToMany(permissions.Permissions, { through: "roles", as: "Permissions" })
permissions.Permissions.belongsToMany(users.User, { through: "roles", as: "Users" })

const User = users.User
module.exports = db;
module.exports.User = User;