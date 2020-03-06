const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const gravatar = require('gravatar')

// ---------------------------home页 数据 及 接口----------------------------- //
// 获取home所有数据
let oneData = JSON.parse(fs.readFileSync('./static/home/one.json', 'utf-8'))  //正在热映
let twoData = JSON.parse(fs.readFileSync('./static/home/two.json', 'utf-8'))  //即将上映
let oneSwiper = JSON.parse(fs.readFileSync('./static/home/oneSwiper.json', 'utf-8')) //横溪昂轮播图
let twoSwiper = JSON.parse(fs.readFileSync('./static/home/twoSwiper.json', 'utf-8')) //横溪昂轮播图
// 处理data数据, 9条一组
function setData(page, data){
    let arr = []
    for(var i = 0; i < data.length; i+=9){
        arr.push([...data].splice(i, 9))
    }
    return arr[page]
}
// user/alist   
router.get('/one/:page', cxt => {
    let { page } = cxt.params
    if(isNaN(page) || page == Number) {
        cxt.body = { ok: false, err: 'invaild page' }
    }else {
        let data = setData(page, oneData)
        cxt.body = { ok: true, data }
    }
})
// user/swiper
router.get('/oneSwiper', cxt => {
    cxt.body = { ok: true, data: oneSwiper }
})
// user/li
router.get('/two/:page', cxt => {
    let { page } = cxt.params
    if(isNaN(page) || page == Number) {
        cxt.body = { ok: false, err: 'invaild page' }
    }else {
        let data = setData(page, twoData)
        cxt.body = { ok: true, data }
    }
})
// user/swiper
router.get('/twoSwiper', cxt => {
    cxt.body = { ok: true, data: twoSwiper }
})
// -------------------------- end -------------------------------------------- //


// -------------------------- mine 页面接口 ----------------------------------- //

const Users = require('../model/User')
const tools = require('../config/tools')
const keys = require('../config/keys')
// 登录     user/login
router.post('/login', async cxt => {

    // 查询数据库中用户名存不存在
    const findUsername = await User.find({ username: cxt.request.body.username })
    console.log(findUsername)
    if(findUsername.length === 0) {
        cxt.body = {
            ok: false,
            msg: '该用户不存在'
        }
    }else {
        // 获取数据
        let data = cxt.request.body

        // 验证密码跟哈希密码匹配吗
        const res = tools.decode(data.password, findUsername[0].password)

        if(res) {
            // 验证通过返回token    格式jwt.sign({ 传递的数据 }, 产生token的私钥, { expiresIn: 过期时间 })
            const payload = { username: data.username,  avatar: data.avatar }
            var token = tools.jwtSign(payload)

            cxt.body = {
                ok: true,
                msg: '登录成功',
                'token': token
            }
        }else {
            cxt.body = {
                ok: false,
                msg: '用户名与密码不匹配',
            }
        }
    }
})

// 注册     user/register
router.post('/register', async cxt => {

    // 查询数据库中用户名存不存在
    const findUsername = await Users.find({ username: cxt.request.body.username })

    if(findUsername.length === 0) {
        // 获取数据
        const data = await cxt.request.body
        
        // 创建默认的avatar个人头像
        var avatar = await gravatar.url(data.username, {s: '200', r: 'pg', d: 'mm'});

        var newUser = await new User({
            ...data,
            // 密码加密 转哈希模式
            password: tools.encrypt(data.password),
            avatar
        })

        // 添加到数据库
        await newUser.save()
            .then(user => {
                // 验证通过返回token    格式jwt.sign({ 传递的数据 }, 产生token的私钥, { expiresIn: 过期时间 })
                const payload = { username: data.username,  avatar: data.avatar }
                var token = tools.jwtSign(payload)

                cxt.body = {
                    ok: true,
                    msg: '注册成功',
                    'token': token,
                    user
                }
            })
            .catch( err => {
                console.log(err)
            })

    }else {
        cxt.body = {
            ok: false,
            msg: '用户名已存在'
        }
    }
})

router.get('/islogin', async cxt => {
    
})
// -------------------------- end ---------------------------------------- //


// 这样导出路由才生效
module.exports = router.routes()