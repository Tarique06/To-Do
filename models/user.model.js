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

exports.registerUser = async (userObj) => {
    try {
        const { username, email, password } = userObj;
        const hash = await bcrypt.hash(password, 10);

        const user = await users.create({
            username: username,
            email: email,
            password: hash,
        })

        const [error, role] = await getRoleByRoleName("user");

        if (error) throw error;

        user.addPermissions(role)
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            error: error
        })
    }
}

exports.getUserByUsername = async (username) => {
    return await users.findOne({
        where: {
            username: username
        }
    })
}

exports.addUserRoles = async (user, roleName) => {
    try {
        const [error, role] = await getRoleByRoleName(roleName);

        if (error) throw error;

        user.addPermissions(role);

        return [null, true]

    } catch (error) {
        return [error, null];
    }
}

exports.addRoles = async (userId, role) => {
    try {
        const user = await users.findByPk(userId, {
            include: roles
        })

        if (!user) return false;

        let userRoles = user.roles;

        if (userRoles.includes(role)) {
            throw `User already has the ${role} role!`
        }

        await roles.create({
            name: role,
            userId: userId
        })
    } catch (error) {
        res.json({
            success: false,
            error: error
        })
    }

}