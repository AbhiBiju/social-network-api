const { User } = require("../models");

const friendController = {
  addFriend({params}, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friendData) => {
        if (!friendData) {
          res.status(404).json({ message: "User with this id not found" });
        }
        res.json(friendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friendData) => {
        if (!friendData) {
          res.status(404).json({ message: "User with this id not found" });
        }
        res.json(friendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
};

module.exports = friendController;
