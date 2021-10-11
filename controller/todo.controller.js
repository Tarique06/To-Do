const { Sequelize, Todo } = require('../middleware/index')
const ValidationTodo = require('../validation/todo.validate')
const bcrypt = require("bcryptjs")

//Creating a user
exports.create = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userAlreadyExist = await Todo.findOne({ where: { email: email } })
        if (!userAlreadyExist) {
            await ValidationTodo.validateAsync(req.body)
            const hashPassword = await bcrypt.hash(password, 8)
            await Todo.create({ name, email, password: hashPassword })
            return res.status(200).json({
                message: 'Created Database Schema for To Do.'
            })
        }
        else {
            res.status(302).send("Database schema for To Do already exist.....!")
        }
    }
    catch (error) {
        console.warn(error)
        res.status(500).send(error);
    };
}

//Finding a user with userid
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Todo.findByPk(id)
        if (!user) throw new Error('To do not found')
        return res.send({ user })
    }

    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

//Updating a user with userid
exports.update = (req, res) => {
    const id = req.params.id;
    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Update Successfully'
                })
            } else {
                res.send({
                    message: `Cannot update a user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

//Deleting a user with userid
exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User is deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User for TO DO was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
