const router = require("express").Router();

const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute");
const postRoute = require("./postRoute");
const commentRoute = require("./commentRoute");
const logoutRoute = require("./logoutRoute");

router.use("/login", loginRoute);
router.use("/signup", signupRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);
router.use("/logout", logoutRoute);

module.exports = router;
