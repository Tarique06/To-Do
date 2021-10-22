function isInt(value) {
    let x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

module.exports = class bitField {
    // default value is 0
    constructor(value = 0) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    get(int) {
        if (isInt(int)) {
            return (this.value & (1 << int)) != 0;
        }

        return 0;
    }

    set(int, newInt = true) {
        return this.value = (this.value & ~(1 << int)) | (newInt << int);
    }

    clear(int) {
        this.set(int, false);
    }
}