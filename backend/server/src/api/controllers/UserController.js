require("dotenv").config();
const User = require("../models/UserModel.js"); // Đường dẫn đến file định nghĩa model User của bạn
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
class UserController {
  // Lấy danh sách tất cả người dùng
  async getUser(req, res) {
    try {
      const user = await User.findAll();
      return res.json(user);
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  // Lấy thông tin người dùng theo id
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  // Tạo mới người dùng
  async createUser(req, res) {
    try {
      const newUser = await User.create({
        username: req.body.username,
        password_hash: req.body.password, // Password sẽ được hash trong hook `beforeCreate`
        email: req.body.email,
        full_name: req.body.full_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        picture_url: req.body.picture_url,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  // Cập nhật thông tin người dùng
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update({
        username: req.body.username,
        password_hash: req.body.password, // Password sẽ được hash trong hook `beforeUpdate` nếu thay đổi
        email: req.body.email,
        full_name: req.body.full_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        picture_url: req.body.picture_url,
      });
      return res.json(user);
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  // Xóa người dùng

  async deleteUser(req, res) {
    try {
      const id_user = req.params.id_user;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.destroy({
        where: {
          id_user: id_user,
        },
      });
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  //Login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isValid = await User.comparePassword(password, user.password_hash);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        {
          id_user: user.id_user,
          username: user.username,
          role: user.role,
        },
        secret,
        { expiresIn: "1h" }
      );
      res.setHeader("Authorization", "Bearer " + token);
      res.json({ message: "Login successfully", token: token });
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }

  /* Get user profile */
  async getUserProfile(req, res) {
    try {
      // Trích xuất thông tin người dùng từ token
      const dataDecoded = jwt.verify(req.token, secret);

      const user = await User.findByPk(dataDecoded.id_user);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Chỉ trả về thông tin cần thiết, không trả về password_hash
      const userProfile = {
        id_user: user.id_user,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        birthday: user.birthday,
        gender: user.gender,
        picture_url: user.picture_url,
        role: user.role,
      };

      return res.json(userProfile);
    } catch (error) {
      console.error("Thông báo: ", error);
      return res.json(500).send("Lỗi server: ", error.message);
    }
  }
}

module.exports = new UserController();
