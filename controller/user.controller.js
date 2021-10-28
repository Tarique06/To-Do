const bcrypt = require("bcryptjs");
const { UserModel } = require("../models");
var jwt = require('jsonwebtoken');
const { User } = require('../database/index');
const auth = require('../Authentication/JwtAuthentication')

const authenticationCallback = async (email, password) => {
    try {
        const user = await UserModel.getUserByEmail(email);

        if (user) {
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

        var token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET_CODE, {
            expiresIn: 300
        });
        if (error) {
            // throw error;
            throw new Error(`${error}`);
        }


        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ token: token });


    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            error: error,
        })
    }
}


exports.register = async (req, res, next) => {
    try {

        const userData = { username, email, password } = req.body;
        const User = await UserModel.getUserByEmail(userData.email);
        userData.isAdmin = "false";
        if (User) {
            throw "User already exists";
        };
        const user = await UserModel.registerUser(req, res, userData);

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

exports.adminRegister = async (req, res, next) => {
    try {

        const userData = { username, email, password } = req.body;
        const User = await UserModel.getUserByEmail(userData.email);
        userData.isAdmin = "true";
        if (User) {
            throw "User already exists";
        };
        const user = await UserModel.registerUser(req, res, userData);

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

exports.logout = async (req, res) => {
    return res.clearCookie("access_token").status(200).json({ message: "User is now logged out" });
}

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Update Successfully'
                })
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            console.log(num)
            if (num == 1) {
                res.send({
                    message: "User is deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User is not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

