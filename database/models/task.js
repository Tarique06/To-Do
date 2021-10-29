module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        description: {
            type: Sequelize.STRING,
            required: true,
            trim: true
        },
        completed: {
            type: Sequelize.STRING,
            default: false
        }
    })

    return Task;
}
