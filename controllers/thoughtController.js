const { Thought, User } = require('../models');

// Get all thoughts
async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');
      // .populate('reactions');

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// create a new thought
async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Thought created, but found no user with that ID' });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        // need to check for both
        thoughtText: req.body.thoughtText,
        username: req.body.username
      },
      {
        new: true,
        runValidators: true
      }
    );

    // console.log(thought);
    res.json(thought);
    if (!thought) {
      return res
        .status(404)
        .json({ message: 'Found no thought with that ID' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Delete a thought
async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json({ message: 'Thought was deleted!' })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      } } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {
        new: true,
        runValidators: true
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
}