const { Thought, Reaction } = require("../models");

const reactionController = {
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, { $push: { reactions: body } }, { new: true, runValidators: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "thought with this id not found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "thought with this id not found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
};

module.exports = reactionController;
