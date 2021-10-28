const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../Api Documentation/api.json');

module.exports = (app) => {
    app.use("/user", require("./user.routes"));
    app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument), require("./api-docs.routes"));
};
