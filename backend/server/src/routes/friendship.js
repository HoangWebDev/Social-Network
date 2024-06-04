var express = require('express');
var router = express.Router();
const friendshipController = require('../api/controllers/FriendshipController.js');

/* GET home page. */
router.get('/', friendshipController.getFriendships);
router.get('/:id_user1/:id_user2', friendshipController.getFriendshipsUser);
// router.post('/', commentController.createComment);
// router.delete('/:id_comment', commentController.deleteComment);


module.exports = router;
