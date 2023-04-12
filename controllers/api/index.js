const router = require("express").Router();

const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute");
const postRoute = require("./postRoute");
const commentRoute = require("./commentRoute");

router.use("/login", loginRoute);
router.use("/signup", signupRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);

module.exports = router;
