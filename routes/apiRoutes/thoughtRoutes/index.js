const router = require('express').Router();
const {
  getThoughts,
  getThought,
  updateThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(removeReaction);

module.exports = router;