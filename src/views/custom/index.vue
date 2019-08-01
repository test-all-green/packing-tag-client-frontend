<template>
    <div class="bg">
        <mt-header :title="titleName" style="font-size:20px;position:relative;">
            <i class="el-icon-more" slot="right" @click="popupVisible=isNoticed?true:false;isNoticed=isNoticed?true:false;"></i>
        </mt-header>
        <div class="body">
            <router-view></router-view>
        </div>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="服务厅_C">
                <i class="el-icon-s-order" slot="icon">                  
                </i>
                <span>服务厅</span>
            </mt-tab-item>
            <mt-tab-item id="共享_C">
                <div :class="{'red-point': isShareParkingLotNoticed }" @click="isShareParkingLotNoticed=false"></div>
                <i class="el-icon-place" slot="icon" @click="isShareParkingLotNoticed=false"></i>
                <span @click="isShareParkingLotNoticed=false">共享</span>
            </mt-tab-item>
            <mt-tab-item id="我的订单_C">
                <div :class="{'red-point': isOrderNoticed }" @click="isOrderNoticed=false"></div>
                <i class="el-icon-notebook-2" slot="icon" @click="isOrderNoticed=false"></i>
                <span @click="isOrderNoticed=false">我的订单</span>
            </mt-tab-item>
            <!-- <mt-tab-item id="我的_C">
                <i class="el-icon-user" slot="icon"></i>
                我的
            </mt-tab-item> -->
        </mt-tabbar>
    </div>
    
</template>

<script>
import { getHistoryOrder } from "../../api/order";
import {getShareParkingLot} from '../../api/shared'
export default {
    data() {
        return {
            isShareParkingLotNoticed:false,
            isOrderNoticed: false,
            selected: "服务厅_C",
            routerName: {
                serve: "服务厅",
                share: "共享",
                order: "我的订单",
                my: "个人中心"
            }
        };
    },
    created() {
        this.$store.dispatch("getOrderList");
        this.$store.dispatch("getShareParkingLot");
    },
    mounted() {
        this.polling = setInterval(() => {
          getHistoryOrder().then(response => {
                var oldOrderStatusList = this.$store.state.orderList.map(item => {
                    return item.status;
                });
                var newOrderStatusList = response.data.map(item => {
                    return item.status;
                });
                if (oldOrderStatusList.toString() !== newOrderStatusList.toString()) {
                    this.$message({
                        message: "订单状态有更新!",
                        duration: 4000
                    });
                    this.isOrderNoticed = true;
                    this.$store.commit('setOrderList',response.data)
                }
            }
          );
          getShareParkingLot().then(response => {
                var oldShareStatusList = this.$store.state.shareParkingLotList.map(item => {
                    return item.status;
                });
                var newShareStatusList = response.data.map(item => {
                    return item.status;
                });
                if (oldShareStatusList.toString() !== newShareStatusList.toString()) {
                    this.$message({
                        message: "车位状态有更新!",
                        duration: 4000
                    });
                    this.isShareParkingLotNoticed = true;
                    this.$store.commit('setShareParkingLot',response.data)
                }
            }
          );
        }, 2000);
    },
    methods:{
    },
    beforeDestroy() {
        clearInterval(this.polling);
    },
    watch: {
      $route(to,from){
          this.selected = to.name;
      },
    selected(val, oldVal) {
      this.$router.push({name:val});
    }
  },
  computed:{
    
    titleName(){
      return this.$route.name.split('_')[0];
    }
 
},
  methods: {}
};
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
    font-size: 24px;
}
.mint-tab-item{
  position: relative;
}
.red-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    z-index: 10;
    top: 46%;
    left: 52%;
    border-radius: 50%;
}
.body {
    height: 562px;
}
.mint-header {
    height: 50px;
}
.bg {
    background: #dcdcdc;
    height: 667px;
    position: relative;
}
.mint-popup{
  width: 100px;
  height: 50px;
    position: absolute;
    left: unset;
    width: 150px;
    top: 60px;
    right: -75px;
    border: 1px solid black;
    text-align: center;
    line-height: 50px;
}
</style>