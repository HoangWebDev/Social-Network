var express = require('express');
var router = express.Router();
const postsController = require("../api/controllers/PostsController")
const {adminAuth, userAuth} = require("../service/auth.token.js");

/* GET home page. */
router.get('/', userAuth ,postsController.getPosts);
router.get('/:id_posts', postsController.getPostsById);
router.get('/user/:id_user', postsController.getPostsByIdUser);
router.post('/', postsController.createPosts);
router.put('/:id_posts', postsController.updatePosts);
router.delete('/:id_posts', postsController.deletePosts);

module.exports = router;
