const { Thought } = require('../models');

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
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Delete a thought and associated apps
async function deleteThought(req, res) {
  try {

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addReaction(req, res) {
  try {
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function removeReaction(req, res) {
  try {
    
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