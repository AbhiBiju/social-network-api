const router = require("express").Router({ mergeParams: true });
const { addReaction, removeReaction } = require("../../controllers/reaction-controller");

router.route("/").post(addReaction).delete(removeReaction);

module.exports = router;
