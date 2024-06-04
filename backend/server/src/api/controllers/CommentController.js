const Comment = require('../models/CommentModel.js');

class CommentController {
    async getComments (req, res) {
        try {
            const comments = await Comment.findAll();
            return res.json(comments);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async getCommentPosts (req, res) {
        try {
            const id_posts = parseInt(req.params.id_posts);
            const comments = await Comment.findAll({
                where: {
                    id_posts: id_posts
                }                        
            })
            if (comments) {
                return res.json(comments);                
            }else {
                return res.status(404).send({ error: "Posts not found" });
            }
        } catch (error) {
            console.error("Có lỗi: ", error);
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async createComment (req, res) {
        try {
            const comment = await Comment.create({
                id_posts: req.body.id_posts,                
                id_user: req.body.id_user,
                content: req.body.content
            })
            return res.json(comment);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async deleteComment (req, res) {
        try {
            const id_comment = parseInt(req.params.id_comment);
            const comment = await Comment.findByPk(id_comment);
            if (!comment) {
                return res.status(404).send({ error: "Comment not found" });
            }
            await Comment.destroy({
                where: {
                    id_comment: id_comment
                }
            })
            return res.json(comment);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }
}

module.exports = new CommentController;