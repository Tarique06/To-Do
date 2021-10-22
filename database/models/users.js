module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
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

    // Todo.prototype.generateToken = async function generateToken() {
    //     const jwtid = await nanoid()
    //     const token = jwt.sign({ sub: this.id }, { jwtid })
    //     const userToken = await Token.create({ jti: jwtid })
    //     await this.addToken(userToken)
    //     await userToken.setTodo(this)
    //     return token
    // }

    // Users.prototype.verifyPassword = async function verifyPassword(password) {
    //     console.log('verify Password instance method', { password, hash: this.password })
    //     return bcrypt.compare(this.password, password)
    // }

    return { User };
}