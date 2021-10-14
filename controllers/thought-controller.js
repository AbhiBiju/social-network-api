const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getThoughtById({ params }, res) {
    Thought.find({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  createThought({ body }, res) {
    const { thoughtText, writtenBy } = body;

    Thought.create({ thoughtText, writtenBy })
      .then(({ _id }) => User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true }))
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No Thought found with that id." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.id })
      .then(({ _id, writtenBy }) => User.findOneAndUpdate({ username: writtenBy }, { $pull: { thoughts: _id } }))
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
