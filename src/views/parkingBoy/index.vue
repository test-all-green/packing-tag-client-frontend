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
                <div :class="{'red-color-point': isGrabOrderNoticed }" @click="isGrabOrderNoticed=false"></div>
                <i class="el-icon-s-order" slot="icon" @click="isGrabOrderNoticed=false"></i>
                <span @click="isGrabOrderNoticed=false">抢单</span>
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
import { getOrders } from "../../api/order";
import { get } from "@/utils/http";
export default {
  data() {
    return {
      selected: "服务厅_P",
      isGrabOrderNoticed: false
      // titleName:'服务厅'
    };
  },
  watch: {
    $route(to, from) {
      this.selected = to.name;
    },
    selected(val, oldVal) {
      this.$router.push({ name: val });
    }
  },
  computed: {
    titleName() {
      return this.$route.name.split("_")[0];
    },
    selected(val, oldVal) {
      this.$router.push({ name: val });
    },
    navIndex() {
      var index = this.$store.state.employeeNavIndex;
      this.selected = index;
      return index;
    }
  },
  created() {},
  mounted() {
    this.polling = setInterval(() => {
      getOrders("PW").then(response => {
        var oldStatusList = this.$store.state.grapOrderList.map(item => {
          return item.status;
        });
        console.log("oldStatusList :", oldStatusList);
        var newStatusList = response.data.map(item => {
          return item.status;
        });
        console.log("newStatusList :", newStatusList);
        if (oldStatusList.toString() !== newStatusList.toString()) {
          this.$message({
            message: "订单状态有更新!",
            duration: 2000
          });
          this.isGrabOrderNoticed = true;
          this.$store.commit("setGrapOrderList", response.data);
        }
      });
    }, 2000);
  },
  beforeDestroy() {},
  methods: {
    getMsg() {
      get(
        "http://39.98.244.95:8088/parking-staffs/getMessage"
      ).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>

<style>
.mint-tabbar .mint-tab-item .mint-tab-item-icon {
  font-size: 24px;
  position: relative;
}
.red-color-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  z-index: 10;
  top: 44%;
  left: 25.5%;
  border-radius: 50%;
}
.mint-header {
  height: 50px;
}

.pk-body {
  height: 562px;
  /* background: red; */
}
.bg {
  background: #dcdcdc;
  /* height: 667px; */
}
</style>
