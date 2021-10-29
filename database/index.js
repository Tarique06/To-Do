const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const {
    users,
    task
} = require('./schema')(sequelize, Sequelize);
users.User.hasOne(task)

const User = users.User
module.exports = db;
module.exports.User = User;
module.exports.Task = task;