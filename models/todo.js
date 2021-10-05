module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        access_token: {
            type: Sequelize.STRING
        }
    });

    return Todo;
}