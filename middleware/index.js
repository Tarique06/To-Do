const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

module.exports = {
    sequelize,
    Sequelize,
    Todo: require("../models/todo")(sequelize, Sequelize)
};
