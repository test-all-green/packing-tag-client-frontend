import Vue from 'vue'
import Vuex from 'vuex'
import {getHistoryOrder} from '../api/order'
import {getShareParkingLot} from '../api/shared'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        orderList:[],
        shareParkingLotList:[]
    },
    mutations: {
        setOrderList(state,orderList){
            state.orderList=orderList
        },
        setShareParkingLot(state,shareParkingLotList){
            state.shareParkingLotList=shareParkingLotList
        }
    },
    actions: {
        async getOrderList({commit}){
            const response=await getHistoryOrder()
            commit('setOrderList',response.data)
        },
        async getShareParkingLot({commit}){
            const response=await getShareParkingLot()
            commit('setShareParkingLot',response.data)
        },
    },
    getters: {
    }
  })
  export default store;
