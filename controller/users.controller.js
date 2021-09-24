const todo = require('../models/users')

exports.create = async (req, res) => {
    const { firstName, lastName, address, contactNumber, password, access_token } = req.body
    try {
        await todo.validateAsync({ firstName, lastName, address, contactNumber, password, access_token })
        return res.status(200).json({
            message: 'Created Database Schema for todo'
        })
    }
    catch (error) {
        console.warn(error)
        res.status(500).send(error);
    };
}
