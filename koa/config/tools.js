const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')


// 转哈希
var encrypt = function(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

// 验证密码跟哈希密码匹配吗
var decode = function(password, hashPassword) {
    // 匹配 res = true  否在 res = false
        var res = bcrypt.compareSync(password, hashPassword);
        return res
    }
    
// 创建token的方法
var jwtSign = function(payload) {
    // 验证通过返回token    格式jwt.sign({ 传递的数据 }, 产生token的私钥, { expiresIn: 过期时间 })
    const token = jwt.sign( payload, keys.tokenKey, { expiresIn: '12h' });
    return token
}
module.exports = { encrypt, decode, jwtSign }