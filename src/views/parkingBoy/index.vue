<template>
  <div class="bg">
    <mt-header :title="titleName" style="font-size:20px;">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="pk-body">
      <router-view></router-view>
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="服务厅_P">
        <i class="el-icon-s-order" slot="icon"></i>
        抢单
      </mt-tab-item>
      <!-- <mt-tab-item id="fetchCarOrder">
        <i class="el-icon-map-location" slot="icon"></i>
        <span @click="getMsg">停取</span>
      </mt-tab-item> -->
      <mt-tab-item id="我的订单_P">
        <i class="el-icon-notebook-2" slot="icon"></i>
        我的订单
      </mt-tab-item>
      <!-- <mt-tab-item id="我的_P">
        <i class="el-icon-user" slot="icon"></i>
        我的
      </mt-tab-item> -->
    </mt-tabbar>
  </div>
</template>

<script>
import { get } from '@/utils/http'
export default {
  data () {
    return {
      selected: '服务厅_P',
      // titleName:'服务厅'
    }
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
  created(){
    
  },
  methods: {
    getMsg () {
      get('http://39.98.244.95:8088/parking-staffs/getMessage').then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
  font-size: 24px;
}

.mint-header {
  height: 50px;
}

.pk-body{
    height: 562px;
    /* background: red; */
}
.bg {
  background: #dcdcdc;
  /* height: 667px; */
}
</style>
