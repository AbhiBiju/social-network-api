const { User, Thought, Reaction } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  // get user by id & populate thought and friend
  getUserById({ params }, res) {
    User.findById({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  // post new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  // put route to update user by id
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No User found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  // delete user by id and remove associated thoughts
  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
      .then(async (userData) => {
        const { username } = userData;
        await Thought.deleteMany({ writtenBy: username });
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
