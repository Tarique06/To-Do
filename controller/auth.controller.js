// const { UserModel } = require('../models');

// const isAdmin = (req, res, next) => {
//     const user = res.locals.user;
//     if (user.isAdmin === "true") {
//         return next();
//     }
//     res.status(403).json({ unauthorized: "You are not admin." });
// }

// const authenticationCallback = async (email, password) => {
//     try {
//         const user = await getUserByEmail(email);
//         if (user) {
//             const compare = await bcrypt.compare(password, user.password);

//             if (compare) {
//                 return [null, user];
//             }
//         }
//         throw "Incorrect credentials";
//     } catch (error) {
//         return [error, null];
//     }
// }


// module.exports = {
//     async login(req, res) {
//         try {
//             const { email, password } = req.body
//             const [error, user] = await authenticationCallback(email, password);

//             if (error) {
//                 return res.json({
//                     error: error
//                 })
//             }
//             return res.json({
//                 success: true
//             })
//         }
//         catch (error) {
//             console.error(error)
//             return res.status(403).json({ message: error })
//         }
//     },


//     async logout(req, res) {
//         const { jti } = req.token
//         try {
//             await Token.destroy({ where: { jti } })
//             res.status(200).json({ message: 'success' })
//         } catch (error) {
//             console.error(error)
//             return res.json({ 'status': 400 })
//         }
//     },
//     auth: this.auth
// }
