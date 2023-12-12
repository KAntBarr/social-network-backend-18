const { User } = require('../models');

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
      .select('-__v');

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

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Delete a user and associated apps
async function deleteUser(req, res) {
  try {

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