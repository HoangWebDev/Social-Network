var express = require('express');
var router = express.Router();
const commentController = require("../api/controllers/CommentController")

/* GET home page. */
router.get('/', commentController.getComments);
router.get('/:id_posts', commentController.getCommentPosts);
router.post('/', commentController.createComment);
router.delete('/:id_comment', commentController.deleteComment);


module.exports = router;
