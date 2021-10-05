module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.BIGINT
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