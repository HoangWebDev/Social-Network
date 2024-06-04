const Friendship =require("../models/FriendshipModel.js");

class FriendshipController{
    async getFriendships(req, res){
        try {
            const friendship = await Friendship.findAll();
            return res.json(friendship);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async getFriendshipsUser(req, res){
        try {
            const id_user1 = parseInt(req.params.id_user1);
            const id_user2 = parseInt(req.params.id_user2);
            const friendship = await Friendship.findAll({
                where:{
                    id_user1 : id_user1,
                    id_user2 : id_user2
                }
            })
            if (friendship) {
                return res.json(friendship);
            }else{
                return res.status(404).send({error: "Friendship not found"});
            }
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async createFriendship(req, res){
        try {
            const friendship = await Friendship.create({
                id_user1: req.body.id_user1,
                id_user2: req.body.id_user2,
                status: req.body.status
            });
            return res.json(friendship);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async deletaFriendship(req, res){
        try {
            const id_friendship = parseInt(req.params.id_friendship); //Tạm thời xóa theo id_friendship
            const friendship = await Friendship.destroy({
                where: {
                    id_friendship: id_friendship
                }
            })
            if (friendship) {
                return res.json(friendship)
            } else {
                return res.status(404).send({ error: "Friendship not found" });
            }
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }
}

module.exports = new FriendshipController()