<template>
    <div class="bg">
        <div :class="{'red-point': isNoticed }"></div>
        <mt-header :title="titleName" style="font-size:20px;position:relative;">
            <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
            <i class="el-icon-bell" slot="right"></i>
        </mt-header>
        <div class="body">
            <router-view></router-view>
        </div>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="serve">
                <i class="el-icon-s-order" slot="icon"></i>
                <span>服务厅</span>
            </mt-tab-item>
            <mt-tab-item id="共享">
                <i class="el-icon-place" slot="icon"></i>
                <span>共享</span>
            </mt-tab-item>
            <mt-tab-item id="我的订单">
                <i class="el-icon-notebook-2" slot="icon"></i>
                <span>我的订单</span>
            </mt-tab-item>
            <mt-tab-item id="我的">
                <i class="el-icon-user" slot="icon"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
// import SockJS from  'sockjs-client';  
// import Stomp from 'stompjs';
export default {
  data() {
    return {
      isNoticed:false,
      selected: "服务厅",
      routerName: {
        serve: "服务厅",
        share:"共享",
        order: "我的订单",
        my: "个人中心"
      },
    };
  },
  mounted(){
    // var socket = new SockJS('/wsendpoint'); //1连接SockJS的endpoint是“wsendpoint”，与后台代码中注册的endpoint要一样。
    //         stompClient = Stomp.over(socket);//2创建STOMP协议的webSocket客户端。
    //         stompClient.connect({}, function(frame) {//3连接webSocket的服务端。
    //             console.log('开始进行连接Connected: ' + frame);
    //             //4通过stompClient.subscribe（）订阅服务器的目标是'/topic/getResponse'发送过来的地址，与@SendTo中的地址对应。
    //             stompClient.subscribe('/topic/getResponse', function(respnose){
    //                 console.log('respnose :', respnose);
    //                 this.isNoticed=true
    //             });
    //             stompClient.subscribe('/user/' + userId + '/msg', function(respnose){
    //                 console.log(respnose);
    //                 this.isNoticed=true
    //             });
    //         });
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
.red-point{
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
}
</style>