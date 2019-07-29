<template>
  <div class="bg">
    <mt-header title="TAG停车宝" style="font-size:20px;">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

  
      <router-view></router-view>
    

    <mt-tabbar v-model="selected">
      <mt-tab-item id="一键停取">
        <i class="el-icon-s-order" slot="icon"></i>
        <span @click="parking">一键停取</span>
      </mt-tab-item>
      <mt-tab-item id="我的订单">
        <i class="el-icon-notebook-2" slot="icon"></i>
        <span @click="order">我的订单</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <i class="el-icon-user" slot="icon"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '一键停取'
    }
  },
  methods: {
    parking() {
      this.$router.push("/serve");
    },
    order(){
        this.$router.push("/order");
    }
  },
};
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
  font-size: 24px;
}

.mint-header {
  height: 50px;
}
.bg{
    background: #dcdcdc;
    height:667px;
}
</style>