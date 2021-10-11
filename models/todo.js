const { nanoid } = require('nanoid/async')
const jwt = require('../validation/webToken')

module.exports = (sequelize, Sequelize, Token, Role) => {
    const Todo = sequelize.define("todo", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },
        {
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        });

    Todo.prototype.generateToken = async function generateToken() {
        const jwtid = await nanoid()
        const token = jwt.sign({ sub: this.id }, { jwtid })
        const userToken = await Token.create({ jti: jwtid })
        await this.addToken(userToken)
        await userToken.setTodo(this)
        return token
    }

    Todo.prototype.verifyPassword = async function verifyPassword(password) {
        console.log('verify Password instance method', { password, hash: this.password })
        return bcrypt.compare(this.password, password)
    }

    Todo.hasMany(Token)
    Token.belongsTo(Todo)

    Todo.belongsTo(Role)

    return Todo;
}