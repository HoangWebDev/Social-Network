const Posts = require('../models/PostsModel.js');
const Comments = require('../models/CommentModel.js');
const Likes = require('../models/LikeModel.js');
class PostsController {
    async getPosts(req, res) {
        try {
            const posts = await Posts.findAll();
            return res.json(posts);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async getPostsById(req, res) {
        try {
            const id_posts = req.params.id_posts;
            console.log(id_posts);
            const posts = await Posts.findByPk(id_posts);
            if (posts) {
                return res.json(posts);
            } else {
                return res.status(404).send({ error: "Không tìm thấy bài posts" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async getPostsByIdUser(req, res) {
        try {
            const id_user = req.params.id_user;
            const posts = await Posts.findAll({
                where: {
                    id_user: id_user
                }
            });
            return res.json(posts);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async createPosts(req, res) {
        try {
            const posts = await Posts.create({
                id_user: req.body.id_user,
                content: req.body.content,
                image: req.body.image,
            });
            return res.json(posts);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async updatePosts(req, res) {
        try {
            const id_posts = req.params.id_posts;
            const posts = await Posts.findByPk(id_posts);
            if (posts) {
                const updatedPosts = await posts.update({
                    id_user: req.body.id_user,
                    content: req.body.content,
                    image: req.body.image,
                });
                return res.json(updatedPosts);
            } else {
                return res.status(404).send({ error: "Posts not found" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async deletePosts(req, res) {
        try {
            const id_posts = parseInt(req.params.id_posts);
            if (!isNaN(id_posts)) {
                // Xóa các comments liên quan đến post trước
                await Comments.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });

                await Likes.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });

                // Sau đó mới xóa post
                await Posts.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });
                return res.json({ message: "Post and related comments deleted successfully" });
            } else {
                return res.status(400).send({ error: "Invalid ID" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.status(500).send({ error: "Lỗi server: " + error.message });
        }
    }

}

module.exports = new PostsController();