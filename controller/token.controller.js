const { Token } = require("../middleware/index");

Token.findAll = ({
    include: [{
        model: Todo,
        where: {
            id: 1
        }
    }]
})