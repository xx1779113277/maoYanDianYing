import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/home.vue'
import Audio from '../components/audio/audio.vue'
import Mine from '../components/mine/mine.vue'
import Details from '../components/detaild/index.vue'
import MineLogin from '../components/mine/view/login.vue'
import MineIndex from '../components/mine/view/index.vue'


Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { 
      path: '/home',
      name: 'home',
      meta: { keepAlive: true },
      component: Home 
    },
    { 
      path: '/audio', name: 'audio', component: Audio 
    },
    { 
      path: '/mine', name: 'mine', component: Mine, 
      children: [
        { path: '/mineindex', component: MineIndex },
        { path: '/minelogin', component: MineLogin }
      ] 
    },
    { 
      path: '/details/:data', 
      name: 'details',
      meta: { keepAlive: false },
      component: Details 
    },
    { path: '/*', meta: { keepAlive: true }, component: Home }
  ]
})

export default router
