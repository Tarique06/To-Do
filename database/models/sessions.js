// module.exports = (sequelize, Sequelize) => {
//     const { DataTypes } = Sequelize

//     const Token = sequelize.define("tokens", {
//         jti: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true
//         }
//     }, {
//         tableName: "tokens",
//     }
//     )

//     return Token
// }

module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize

    const Sessions = sequelize.define("sessions", {
        sid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        expires: DataTypes.DATE,
        data: Sequelize.TEXT // I don't think we will need data, but just in case for now;
    }, {
        tableName: "sessions",
        updatedAt: false,
    }
    )

    return { Sessions }
}
