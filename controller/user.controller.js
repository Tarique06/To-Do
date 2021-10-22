// const { Sequelize, Todo, role } = require('../middleware/index')
// const ValidationTodo = require('../validation/todo.validate')
const bcrypt = require("bcryptjs");
const { UserModel } = require("../models");

const authenticationCallback = async (email, password) => {
    try {
        // Get user from database
        const user = await UserModel.getUserByEmail(email);

        if (user) {
            // compare user password to body password
            const compare = await bcrypt.compare(password, user.password);

            if (compare) {
                return [null, user];
            }
        }

        throw "Incorrect credentials";

    } catch (error) {
        return [error, null];
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [error, user] = await authenticationCallback(email, password);

        if (error) throw error;

        const hour = 3600
        req.session.user = {
            userId: user.id,
            username: user.username
        }

        req.session.cookie.expires = new Date(Date.now() + hour);
        req.session.cookie.maxAge = hour;

        res.json({
            success: true,
            session: req.session,
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            error: error,
        })
        // return [error, null];
    }
}

// I wont the authentication part, I will leave that to you (just add middlewaree and check)
exports.addRoles = async (req, res, next) => {
    try {

        const { username, role } = req.body;

        const user = await UserModel.getUserByUsername(username);

        if (!user) throw "No user found by that username";

        const [error, success] = await UserModel.addUserRoles(user, role);

        if (error) throw error;

        return res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            error: error
        })
    }
}

exports.register = async (req, res, next) => {
    // make sure you're passing "username" not "name"
    try {

        const userData = { username, email, password } = req.body;
        const User = await UserModel.getUserByEmail(userData.email);

        if (User) {
            throw "User already exists";
        };

        const user = await UserModel.registerUser(userData);

        return res.json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            error: error
        })
    }

}

exports.logout = async () => {
    req.session.destroy(function (error) {
        if (error) {
            res.json({
                success: false,
                error: error,
            })
        }
        res.json({
            success: true
        })
    })
}
//Creating a user
// exports.create = async (req, res) => {
//     const { username, email, password } = req.body
//     try {
//         const userAlreadyExist = await Todo.findOne({ where: { email: email } })
//         if (!userAlreadyExist) {
//             await ValidationTodo.validateAsync(req.body)
//             const hashPassword = await bcrypt.hash(password, 8)
//             const newUser = await Todo.create({ name, email, password: hashPassword })
//             const { id } = newUser
//             await role.create({ id, name: 'normalUser', todoId: id })
//             return res.status(200).json({
//                 message: 'Created Database Schema for To Do.'
//             })
//         }
//         else {
//             res.status(302).send("Database schema for To Do already exist.....!")
//         }
//     }
//     catch (error) {
//         console.warn(error)
//         res.status(500).send(error);
//     };
// }

//Finding a user with userid
// exports.findOne = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await Todo.findByPk(id)
//         if (!user) throw new Error('To do not found')
//         return res.send({ id: user.id, name: user.name })
//     }

//     catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }
// }

// //Updating a user with userid
// exports.update = (req, res) => {
//     const id = req.params.id;
//     Todo.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: 'Update Successfully'
//                 })
//             } else {
//                 res.send({
//                     message: `Cannot update a user with id=${id}. Maybe user was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating user with id=" + id
//             });
//         });
// };

// //Deleting a user with userid
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Todo.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "User is deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete User with id=${id}. Maybe User for TO DO was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             });
//         });
// };
