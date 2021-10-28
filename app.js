require('dotenv').config()
const express = require("express")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Api Documentation/api.json');
const db = require('./database/index');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const auth = require('./Authentication/JwtAuthentication');

const app = express()

const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.isAdmin === "true") {
        return next();
    }
    res.status(403).json({ unauthorized: "You are not admin." });
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.get("/onlyadmin", auth, isAdmin, (req, res) => {
    res.status(200).json({ message: "hi admin" });
});

app.get("/onlyusers", auth, (req, res) => {
    res.status(200).json({ message: "hi user" });
});

//db.sequelize.sync({ force: true });

// function extendedDefaultFields(defaults, session) {
//     return {
//         data: defaults.data,
//         expires: defaults.expires, // default 24 hours
//         userId: session.user && session.user.userId,
//     }
// }

// const store = new sequelizeStore({
//     db: db.sequelize,
//     table: "sessions",
//     extendDefaultFields: extendedDefaultFields,
//     checkExpirationInterval: 15 * 60 * 1000,
// })

// app.use(session({
//     secret: "test",
//     store,
//     saveUninitialized: true, // this will create a session for every user
//     resave: false,
//     proxy: true,
// }))


require('./routes')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api/todo', todoUser)  

app.get('/', (req, res) => {
    res.status(200).send('Welcome to To Do Application.')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
