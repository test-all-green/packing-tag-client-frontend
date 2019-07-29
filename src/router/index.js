import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import loginDemo from '@/views/login/login'

Vue.use(Router)

let router = new Router({
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
      component: () => import('@/views/About.vue')
    },
    {
      path: '/login',
      component: loginDemo
    },
    {
      path: '/signinAccount',
      component: () => import('@/views/signin/signin.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/index.vue')
    },
    {
      path: '/custom',
      component: () => import('@/views/custom/index.vue'),
      children:[
        {
            path:'/serve',
            component: () => import('@/views/custom/contents/serve.vue')
        },
        {
            path:'/order',
            component: () => import('@/views/custom/contents/order.vue')
        },
      ]
    },
    
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path.startsWith('/login')) {
//     window.localStorage.removeItem('access-token')
//     next()
//   } else if(to.path.startsWith('/signinAccount')){
//     next()
//   } else if(to.path.startsWith('/custom')){
//     next()
//   }else {
//     let token = window.localStorage.getItem('access-token')
//     if (!token) {
//       next({ path: '/login' })
//     } else {
//       next()
//     }

//   }
// })

export default router

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       redirect: '/login'
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
//     },
//     {
//       path: '/login',
//       component: loginDemo
//     },
//     {
//       path: '/main',
//       component: () => import('@/views/main/index.vue')
//     }
//   ]
// })