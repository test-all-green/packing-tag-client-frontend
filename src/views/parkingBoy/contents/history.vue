<template>
    <div class="pk-history">
        <div class="order-list">
            <div v-for="order in orderList" :key="order.id">
                <el-card class="box-card" style="width: 100%;" shadow="hover">
                    <div class="card-body">
                        <el-row>
                            <el-col :span="4" :offset="1">
                                <span class="circle">
                                    <p>{{order.type|orderTypeFilter}}</p>
                                </span>
                                <!-- <el-avatar :size="52" src="../../../assets/logo.png"></el-avatar> -->
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <div class="order-content-mid">
                                    <div>
                                        <p class="order-carNum">{{order.carNum}}</p>
                                        <p class="wait-location">交接点: {{order.parkingWaitLocation}}</p>
                                        <!-- <p class="wait-location">时间:{{order.scheduledParkingArriveTime}}</p> -->
                                    </div>
                                </div>
                            </el-col>

                            <el-col :span="5" :offset="3">
                                <div class="right">
                                    <el-button type="primary" v-if="order.status == 'WT'" @click="chooseLost(order)">选择停车点</el-button>
                                    <div v-if="order.status != 'WT'" style="margin-top:20px;" @click="lookDetail(order)"> 详情
                                        <i class="el-icon-right"></i>
                                    </div>
                                </div>
                            </el-col>

                        </el-row>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { getPkHistoryOrder  } from "@/api/order.js";

export default {
  data() {
    return {
      orderList: [
        // {
        //   id: 1,
        //   carNum: "粤XXXX",
        //   type: "0",
        //   parkingWaitLocation: "街道",
        //   regionName: "香洲区",
        //   scheduledParkingArriveTime: "9:00",
        //   status: "WT"
        // },
        // {
        //   id: 2,
        //   carNum: "粤XXXX",
        //   type: "1",
        //   parkingWaitLocation: "街道",
        //   regionName: "香洲区",
        //   scheduledParkingArriveTime: "9:00"
        // }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.initHistoryOrder();
  },

  methods: {
    async initHistoryOrder() {
      const data = await getPkHistoryOrder();
      console.log("load historyOrder...", data.data);
      this.orderList = data.data;
    },
    lookDetail(order){

    },
    chooseLost(order){
        console.log("orderId:  "+order.id);
         this.$router.push({
          name:'选择停车场',
          params: { orderId: order.id }
        });
    }
  },

  filters: {
    orderTypeFilter(val) {
      if (val == 1) {
        return "取";
      }
      return "停";
    }
  }
};
</script>
<style lang='scss'>
.pk-history {
  text-align: left;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .order-list {
    .el-card__body {
      padding: 0;
      text-align: left;
      height: 80px;
      padding: 10px 0 0 0;
    }
    .card-body {
      position: relative;
    }

    .order-content-mid {
      font-size: 16px;
      .order-carNum {
        margin-top: 8px;
        // font-size: 16px;
        color: #458e28;
      }
      .wait-location {
        margin-top: 8px;
      }
      .order-create-time {
        margin-top: 10px;
      }
    }
    .circle {
      display: inline-block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      background: #f3ada1;
      line-height: 60px;
      // margin-left: 20px;
      & p {
        // margin:0 auto;
        font-size: 23px;
        margin-left: 18px;
      }
    }
    .right {
      font-size: 16px;
      padding: 0;
      color: #a2a2a2;

      .el-button {
        position: relative;
        left: -40px;
        top: 14px;
        // width:20px;
      }
    }
  }
}
</style>