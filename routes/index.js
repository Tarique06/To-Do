module.exports = (app) => {
    app.use("/user", require("./user.routes"));
    app.use("/task", require("./task.routes"))
}
