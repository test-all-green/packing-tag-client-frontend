import Vue from 'vue'
import Vuex from 'vuex'
import {getHistoryOrder} from '../api/order'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        orderList:[]
    },
    mutations: {
        setOrderList(state,orderList){
            state.orderList=orderList
        }
    },
    actions: {
        async getOrderList({commit}){
            const response=await getHistoryOrder()
            commit('setOrderList',response.data)
        }
    },
    getters: {
    }
  })
  export default store;
