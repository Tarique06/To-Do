require('dotenv').config()
const express = require("express")
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'User and Task Manangement',
            description: "User and Task Manangement using Swagger",
            contact: {
                name: "This is developed using Swagger, Node js and Express js"
            },
            servers: ["http://localhost:8080"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Routes
/**
 * @swagger
 * /getUsers:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful get response
 */
app.get('/getUsers', (req, res) => {
    res.status(200).send('users results')
})

/**
 * @swagger
 * /putUsers:
 *  put:
 *    description: Use to update a users
 *    responses:
 *      '200':
 *        description: A successful update response
 */
app.put('/putUsers', (req, res) => {

    res.status(200).send('succesfully updated with desired results')
})

const db = require("./middleware/index")
db.sequelize.sync();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
