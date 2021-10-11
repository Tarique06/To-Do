require('dotenv').config()
const express = require("express")
const cors = require("cors")
const todoUser = require("./routes/todo.routes")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Api Documentation/api.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

const db = require("./middleware/index")
db.sequelize.sync();

app.use(require('./routes/auth.routes'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/todo', todoUser)

app.get('/', (req, res) => {
    res.status(200).send('Welcome to To Do Application.')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
