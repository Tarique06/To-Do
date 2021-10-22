const bitField = require("../models/bitfield.model");

class permissions extends bitField {
    create = 0;
    updated = 1;
    delete = 2;
}

class roles extends bitField {
    user = 0;
    admin = 1;
}

module.exports = {
    permissions,
    roles
}