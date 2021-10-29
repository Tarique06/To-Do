require('dotenv').config()
const express = require("express")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Api Documentation/api.json');
const db = require('./database/index');
const cookieParser = require('cookie-parser');
const auth = require('./Authentication/JwtAuthentication');
const isAdmin = require('./Authentication/permission')
const app = express()


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

require('./routes')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to To Do Application.')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
