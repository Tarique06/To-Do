module.exports = (sequelize, Sequelize) => {
    const Permissions = sequelize.define("permissions", {
        role: {
            type: Sequelize.STRING
        },
        permission: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return { Permissions };
};
