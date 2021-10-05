const Joi = require('joi');

const ValidationTodo = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    access_token: [
        Joi.string(),
        Joi.number()
    ]
})

module.exports = ValidationTodo;