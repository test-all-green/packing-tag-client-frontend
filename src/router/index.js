import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import loginDemo from '@/views/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/login',
      component: loginDemo
    },
    {
      path: '/main',
      component: () => import('@/views/main/index.vue')
    }
  ]
})