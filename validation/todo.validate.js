const Joi = require('joi');
const Todo = require("../models/todo")

const Todo = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().min(7).max(30).required(),
    contactNumber: Joi.number().integer().min(10).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    access_token: [
        Joi.string(),
        Joi.number()
    ]
})

module.exports = Todo;