const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.isAdmin === "true") {
        return next();
    }
    res.status(403).json({ unauthorized: "You are not admin." });
}

module.exports = isAdmin