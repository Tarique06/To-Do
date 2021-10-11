const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const Token = require("../models/token")(sequelize, Sequelize)
const role = require("../models/todo.role")(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,
    role,
    Token,
    Todo: require("../models/todo")(sequelize, Sequelize, role, Token)
};
