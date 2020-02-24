const mongoose = require('mongoose')

// 创建模板
const Schema = mongoose.Schema

// 实例化模板
const UserSchema = new Schema({
    // 名字
    name: {
        type: String
    },
    // 账号
    username: {
        type: String,
        required: true
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    // 头像
    avatar: {
        type: String
    },
    // data 时间
    date: {
        type: Date,
        // 当创建一个用户的时候, 会生成一个时间
        default: Date.now
    }
})

// 导出模板
module.exports = User = mongoose.model('users', UserSchema)