require('dotenv').config()
const express = require("express")
const cors = require("cors")
// const todoUser = require("./routes/user.routes")
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./Api Documentation/api.json');
const db = require('./database/index');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// db.sequelize.sync({ force: true }); // You can pass {force: true} in sync() yeah go ahead and run

function extendedDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires, // default 24 hours
        userId: session.user && session.user.userId,
    }
}

const store = new sequelizeStore({
    db: db.sequelize,
    table: "sessions",
    extendDefaultFields: extendedDefaultFields,
    checkExpirationInterval: 15 * 60 * 1000,
})

app.use(session({
    secret: "test",
    store,
    saveUninitialized: true, // this will create a session forf everyone that visits;
    resave: false,
    proxy: true,
}))


// app.use(require('./routes/auth.routes'))
require('./routes')(app);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api/todo', todoUser) // what's /api/todo it 

app.get('/', (req, res) => {
    res.status(200).send('Welcome to To Do Application.')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
