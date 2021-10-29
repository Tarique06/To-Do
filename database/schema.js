module.exports = function (sequelize, Sequelize) {
    return {
        users: require('./models/users')(sequelize, Sequelize),
        task: require('./models/task')(sequelize, Sequelize)
    }
}