const { User, Thought } = require('../models');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        // need to check for both
        username: req.body.username,
        email: req.body.email
      },
      { new: true }
    );

    // console.log(user);
    res.json(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Found no user with that ID' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    // need to remove this friend from other friends' lists
    res.json({ message: 'User and associated thoughts deleted!' })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addFriend(req, res) {
  try {

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function removeFriend(req, res) {
  try {

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
}