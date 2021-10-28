const { User } = require("../database/index");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    try {
        const authHeader = req.cookies.access_token;
        if (!authHeader) {
            throw new Error('Session expired, Re-log In')
        }
        const token = authHeader.replace('Bearer ', '')
        const { sub } = jwt.verify(token, process.env.JWT_SECRET_CODE)

        const user = await User.findByPk(sub)
        if (!user) {
            throw new Error('User not found')
            return;
        }
        req.token = { sub }
        req.user = user
        next()
    }
    catch (error) {
        console.error(error)
        res.status(401).send({ message: 'Unauthorized' })
    }
}
module.exports = auth