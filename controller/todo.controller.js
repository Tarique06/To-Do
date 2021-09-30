const { Sequelize, Todo } = require('../middleware/index')
const ValidationTodo = require('../validation/todo.validate')

//Creating a user
exports.create = async (req, res) => {
    const { firstName, lastName, address, contactNumber, password, access_token } = req.body
    try {
        await ValidationTodo.validateAsync(req.body)
        await Todo.create({ firstName, lastName, address, contactNumber, password, access_token })
        return res.status(200).json({
            message: 'Created Database Schema for To Do.'
        })
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
