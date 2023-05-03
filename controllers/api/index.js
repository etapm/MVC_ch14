const router = require("express").Router();

const userRoute = require("./userRoutes");
const postRoute = require("./postRoute");
const commentRoute = require("./commentRoute");
const dashboardRoute = require("./dashboardRoute");

router.use("/", dashboardRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);

module.exports = router;
