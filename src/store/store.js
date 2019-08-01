import Vue from 'vue'
import Vuex from 'vuex'
import {getHistoryOrder} from '../api/order'
import {getShareParkingLot} from '../api/shared'
import { getOrders } from "../api/order";
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        orderList:[],
        shareParkingLotList:[],
        grapOrderList:[],
        customNavIndex:'',
        employeeNavIndex:''
    },
    mutations: {
        setOrderList(state,orderList){
            state.orderList=orderList
        },
        setShareParkingLot(state,shareParkingLotList){
            state.shareParkingLotList=shareParkingLotList
        },
        setGrapOrderList(state,grapOrderList){
            state.grapOrderList=grapOrderList
        },
        setCustomNavIndex(state,val){
            state.customNavIndex = val;
        },
        setEmployeeNavIndex(state,val){
            state.employeeNavIndex = val
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
        async getGrapOrderList({commit}){
            const response=await getOrders("PW")
            commit('setGrapOrderList',response.data)
        }
    },
    getters: {
    }
  })
  export default store;
