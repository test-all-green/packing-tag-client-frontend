<template>
    <div class="bg">
        <div :class="{'red-point': isNoticed }"></div>
        <mt-header :title="titleName" style="font-size:20px;position:relative;">
            <i class="el-icon-bell" slot="right" @click="popupVisible=isNoticed?true:false;isNoticed=isNoticed?true:false;"></i>
        </mt-header>
        <div class="body">
            <router-view></router-view>
        </div>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="serve">
                <i class="el-icon-s-order" slot="icon"></i>
                <span>服务厅</span>
            </mt-tab-item>
            <mt-tab-item id="share">
                <i class="el-icon-place" slot="icon"></i>
                <span>共享</span>
            </mt-tab-item>
            <mt-tab-item id="order">
                <i class="el-icon-notebook-2" slot="icon"></i>
                <span>我的订单</span>
            </mt-tab-item>
            <mt-tab-item id="my">
                <i class="el-icon-user" slot="icon"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
        <mt-popup v-model="popupVisible" >
          <!-- <mt-cell title="订单状态有更新" is-link></mt-cell> -->
          <span @click="popupVisible=false;isNoticed=false;$router.push('/custom/order')">订单状态有更新 <i class="el-icon-arrow-right"></i></span>
          </mt-popup>
    </div>
    
</template>

<script>
import { getHistoryOrder } from "../../api/order";
export default {
    data() {
        return {
            isNoticed: false,
            popupVisible: false,
            selected: "serve",
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
    },
    mounted() {
        this.polling = setInterval(() => {
            getHistoryOrder().then(response => {
                var oldStatusList = this.$store.state.orderList.map(item => {
                    return item.status;
                });
                var newStatusList = response.data.map(item => {
                    return item.status;
                });
                if (oldStatusList.toString() !== newStatusList.toString()) {
                    this.$message({
                        message: "订单状态有更新!"
                    });
                    this.isNoticed = true;
                    this.$store.commit("setOrderList", response.data);
                }
            });
        }, 2000);
    },
    methods:{
      popupInfo(){
        console.log('111 :', 111);
      }
    },
    beforeDestroy() {
        clearInterval(this.polling);
    },

    watch: {
        selected(val, oldVal) {
            this.$router.push("/custom/" + val);
        }
    },
    computed: {
        titleName() {
            return this.$route.name;
        }
    },
    methods: {}
};
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
    font-size: 24px;
}
.red-point {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: red;
    z-index: 10;
    right: 10px;
    top: 25px;
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