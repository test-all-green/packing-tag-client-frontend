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
            path: '/parkingBoy',
            component: () => import('@/views/parkingBoy/index.vue'),
            children: [
                {
                    path: '/parkingBoy/serve-pkb',
                    component: () => import('@/views/parkingBoy/contents/grabCarOrder.vue'),
                    name:"服务厅",
                    children: []
                },
                {
                    path: '/parkingBoy/pkOrderDetail',
                    component: () => import('@/views/parkingBoy/contents/parkingOrderDetail'),
                },
                {
                    path: '/parkingBoy/choosePkLot',
                    name:'选择停车场',
                    component: () => import('@/views/parkingBoy/contents/choosePkLot'),
                },
                {
                    path: '/parkingBoy/order-pkb',
                    name:'我的订单',
                    component: () => import('@/views/parkingBoy/contents/history.vue')
                }
            ]
        },
        {
            path: '/custom',
            component: () => import('@/views/custom/index.vue'),
            children: [
                {
                    path: '/custom/serve',
                    name: '服务厅',
                    component: () => import('@/views/custom/contents/serve.vue')
                },
                {
                    path: '/custom/order',
                    name: '我的订单',
                    component: () => import('@/views/custom/contents/order.vue')
                }
            ]
        }

    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith('/login')) {
//         window.localStorage.removeItem('access-token')
//         next()
//     } else if (to.path.startsWith('/signinAccount')) {
//         next()
//     } else {
//         let token = window.localStorage.getItem('access-token')
//         if (!token) {
//             next({ path: '/login' })
//         } else {
//             next()
//         }

//     }
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
