const { DataTypes } = require('sequelize');
const sequelize = require("../../config/sequelize.js")

const Posts = sequelize.define('Posts', {
    // Định nghĩa các trường ở đây
    id_posts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    },{
    // Tắt tự động timestamps
    timestamps: false
  });

module.exports = Posts;