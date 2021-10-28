module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize

    const Sessions = sequelize.define("sessions",
        {
            sid: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            expires: DataTypes.DATE,
            data: Sequelize.TEXT
        },
        {
            tableName: "sessions",
            updatedAt: false,
        })

    return { Sessions }
}
