const dbConfig = require("../configuration/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const Token = require("../database/models/sessions")(sequelize, Sequelize)
const role = require("../database/models/roles")(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,
    role,
    Token,
    Users: require("../database/models/users")(sequelize, Sequelize, role, Token)
};
