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
                    name:"服务厅_P",
                    children: []
                },
                {
                    path: '/parkingBoy/pkOrderDetail',
                    component: () => import('@/views/parkingBoy/contents/parkingOrderDetail'),
                },
               
                {
                    path: '/parkingBoy/order-pkb',
                    name:'我的订单_P',
                    component: () => import('@/views/parkingBoy/contents/history.vue')
                }
            ]
        },
        {
            path: '/choosePkLot',
            name:'选择停车场',
            component: () => import('@/views/parkingBoy/contents/choosePkLot'),
        },
        {
            path: '/custom',
            component: () => import('@/views/custom/index.vue'),
            children: [
                {
                    path: '/custom/serve',
                    name: '服务厅_C',
                    component: () => import('@/views/custom/contents/serve.vue')
                },
                {
                    path: '/custom/order',
                    name: '我的订单_C',
                    component: () => import('@/views/custom/contents/order.vue')
                },
                {
                    path: '/custom/share',
                    name: '共享_C',
                    component: () => import('@/views/custom/contents/share.vue')
                }
            ]
        }

    ]
})

export default router