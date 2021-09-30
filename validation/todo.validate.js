const Joi = require('joi');

const ValidationTodo = Joi.object({
    firstName: Joi.string().min(3).max(25).trim(true).required(),
    lastName: Joi.string().trim(true).required(),
    address: Joi.string().min(7).max(30).required(),
    contactNumber: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim(true).required(),
    access_token: [
        Joi.string(),
        Joi.number()
    ]
})

module.exports = ValidationTodo;