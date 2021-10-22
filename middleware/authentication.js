const { Todo, Token } = require('../middleware/index')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader)
            throw new Error('Missing auth header.')

        const token = authHeader.replace('Bearer ', '')
        const tokenDecoded = await jwt.verify(token)
        console.log(tokenDecoded)
        const { jti, sub } = tokenDecoded

        if (!await Token.findOne({ where: { jti } })) // I recommend doing something like jti: jti (to be future proof)
            throw new Error('Token deleted')

        const user = await Todo.findByPk(sub)

        if (!user)
            throw new Error('User of To Do not found')

        req.token = { jti, sub }
        req.user = { id: user.id, name: user.name }
        next()
    }
    catch (error) {
        console.error(error)
        res.status(401).send({ message: 'Unauthorized' })
    }
}
module.exports = auth
