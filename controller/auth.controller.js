const { pick } = require('ramda')
const { nanoid } = require('nanoid/async')
const { Token, Todo } = require('../middleware/index')
const { UserModel } = require('../models');

// sec let me clean this up a bit,

const authenticationCallback = async (email, password) => {
    try {
        // Get user from database
        const user = await getUserByEmail(email);

        if (user) {
            // compare user password to body password
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

// look
// will you always check by email? or do you take email || username?email and password

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body
            console.dir({ email, password })

            // const user = await Todo.findOne({ where: { email } })
            const [error, user] = await authenticationCallback(email, password);

            if (error) {
                return res.json({
                    error: error
                })
            }

            // this is what's setting the data inside
            // req.session.user = {
            //     userId = user.id,
            //     username = user.username
            // }

            return res.json({
                success: true
            })


            // //await Todo.verifyPassword(password)
            // const jwtid = await nanoid()
            // const token = await jwt.sign({ sub: user.id, jti: jwtid })
            // //const userToken = await Token.create({ jti: jwtid })
            // // const token = await user.generateToken()
            // console.log(token)
            // await Token.create({ jti: jwtid })
            // await user.update({ tokenJti: jwtid })
            // return res.status(200).json({ user: user.name, token })
        }
        catch (error) {
            console.error(error)
            return res.status(403).json({ message: error })
        }
    },


    async logout(req, res) {
        const { jti } = req.token
        try {
            await Token.destroy({ where: { jti } })
            res.status(200).json({ message: 'success' })
        } catch (error) {
            console.error(error)
            return res.json({ 'status': 400 })
        }
    }
}