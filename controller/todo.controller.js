const todo = require('../models/todo')

//Creating a user
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        await todo.validateAsync(req.body)
        await todo.create(req.body)
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
        const user = await Users.findByPk(id)
        if (!user) throw new Error('User not found')
        return res.send({ user })
    }

    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
