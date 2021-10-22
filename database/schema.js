module.exports = function (sequelize, Sequelize) {
    return {
        users: require('./models/users')(sequelize, Sequelize),
        sessions: require('./models/sessions')(sequelize, Sequelize),
        // roles: require('./models/roles')(sequelize, Sequelize),
        permissions: require('./models/permissions')(sequelize, Sequelize),
    }
}