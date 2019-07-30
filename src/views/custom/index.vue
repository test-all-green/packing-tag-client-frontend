<template>
    <div class="bg">
        <mt-header :title="titleName" style="font-size:20px;">
            <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <router-view></router-view>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="serve">
                <i class="el-icon-s-order" slot="icon"></i>
                <span>服务厅</span>
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "serve",
      routerName:{
          serve:"服务厅",
          order:"我的订单",
          my:"个人中心"
      },
      titleName:'服务厅'
    };
  },
  watch: {
    selected(val, oldVal) {
      this.$router.push("/" + val);
        this.titleName = this.routerName[val];
    }
  },
  methods: {}
};
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
  font-size: 24px;
}

.mint-header {
  height: 50px;
}
.bg {
  background: #dcdcdc;
  height: 667px;
}
</style>