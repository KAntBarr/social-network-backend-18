const { User, Thought } = require('../models');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
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
    res.status(500).json({ error: `${err}`});
  }
}

// create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
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
      {
        new: true,
        runValidators: true
      }
    );
    // .select('-__v')
    // .populate('thoughts')
    // .populate('friends');

    // console.log(user);
    res.json(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Found no user with that ID' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
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
    await User.updateMany(
      { _id: { $in: user.friends } },
      { $pull: { friends: user._id } },

    )
    res.json({ message: 'User and associated thoughts deleted!' })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
  }
}

async function addFriend(req, res) {
  try {
    const newFriend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      {
        new: true,
        runValidators: true
      }
    )
    // .select('-__v')
    // .populate('thoughts')
    // .populate('friends');

    if (!newFriend) {
      return res
        .status(404)
        .json({ message: 'Found no friend with that ID' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Found no user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
  }
}

async function removeFriend(req, res) {
  try {
    const oldFriend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      {
        new: true,
        runValidators: true
      }
    )
      // .select('-__v')
      // .populate('thoughts')
      // .populate('friends');

    if (!oldFriend) {
      return res
        .status(404)
        .json({ message: 'Found no friend with that ID' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Found no user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}`});
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