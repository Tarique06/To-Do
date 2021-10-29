const { sequelize } = require("../database/index"),
    { users } = sequelize.models,
    bcrypt = require("bcryptjs");

exports.getUserByEmail = async (email) => {
    return await users.findOne({
        where: {
            email: email
        },
        attributes: [
            'id',
            'username',
            'email',
            'password'
        ]
    })
}

exports.registerUser = async (req, res, userObj) => {
    try {
        const { username, email, password, isAdmin } = userObj;
        const hash = await bcrypt.hash(password, 10);

        await users.create({
            username: username,
            email: email,
            password: hash,
            isAdmin
        });
    } catch (error) {
        console.log(error)
    }
}

exports.getUserByUsername = async (username) => {
    return await users.findOne({
        where: {
            username: username
        }
    })
}

