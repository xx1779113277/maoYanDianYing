const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

// ------------------------获取所有数据--------------------------//
let oneData = JSON.parse(fs.readFileSync('./static/home/one.json', 'utf-8'))  //正在热映
let twoData = JSON.parse(fs.readFileSync('./static/home/two.json', 'utf-8'))  //即将上映
let oneSwiper = JSON.parse(fs.readFileSync('./static/home/oneSwiper.json', 'utf-8')) //横溪昂轮播图
let twoSwiper = JSON.parse(fs.readFileSync('./static/home/twoSwiper.json', 'utf-8')) //横溪昂轮播图
// --------------------------------------------------------------//

// ----------------------处理data数据, 9条一组----------------- //
function setData(page, data){
    let arr = []
    for(var i = 0; i < data.length; i+=9){
        arr.push([...data].splice(i, 9))
    }
    return arr[page]
}
// -------------------------------------------------------------- //

// ---------------------------home页接口----------------------------- //
// Tone     user/alist   
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
// get  user/li
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
// -------------------------------------------------------------- //

// post     user/login
router.post('/login', cxt => {
    cxt.body = 'OK'
})

// post     user/register
router.post('/register', cxt => {
    cxt.body = 'OK'
})

// 这样导出路由才生效
module.exports = router.routes()