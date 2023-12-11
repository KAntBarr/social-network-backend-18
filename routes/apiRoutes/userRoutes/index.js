const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;