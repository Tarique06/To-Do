const { sequelize } = require("../database/index"),
    { users, roles, permissions } = sequelize.models,
    bcrypt = require("bcryptjs");

const getRoleByRoleName = async (roleName) => {
    try {
        const role = await permissions.findOne({
            where: {
                role: roleName
            }
        })

        if (!role) throw `${roleName} does not exist`

        return [null, role];

    } catch (error) {
        return [error, null]
    }
}

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

        const user = await users.create({
            username: username,
            email: email,
            password: hash,
            isAdmin
        });

        const [error, role] = await getRoleByRoleName("user");

        if (error) throw error;

        user.addPermissions(role)
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

