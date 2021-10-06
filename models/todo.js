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
        }
    },
        {
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        });

    return Todo;
}