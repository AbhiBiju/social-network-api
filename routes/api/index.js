const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const friendRoutes = require("./friend-routes");
const reactionRoutes = require("./reaction-routes");

userRoutes.use("/:id/friends", friendRoutes);
thoughtRoutes.use("/:id/reactions", reactionRoutes);

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
