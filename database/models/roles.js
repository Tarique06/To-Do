module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        role: {
            type: Sequelize.STRING
        },
        permission: {
            type: Sequelize.INTEGER
        }
    }, {
        updatedAt: false
    });

    return { Role };
};
