import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/home.vue'
import Audio from '../components/audio/audio.vue'
import Mine from '../components/mine/mine.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/audio', component: Audio },
    { path: '/mine', component: Mine },
    { path: '/*', component: Home }
  ]
})

export default router
