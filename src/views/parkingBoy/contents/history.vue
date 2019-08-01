<template>
    <div class="pk-history">
        <div class="order-list">
            <div v-for="order in orderList" :key="order.id" @click="active(order.id)">
                <el-card class="box-card" style="width: 100%;" shadow="hover" :class="{'isActive':activeIndex == order.id}">
                    <div class="order-body">
                        <van-panel :title="order.carNum" :desc="dateFormat(order.createTime)" :status="changeStatus(order.status)">
                            <div>
                                <p>
                                    <label>订单类型：</label>
                                    {{order.type|orderTypeFilter}}
                                </p>
                                <p>
                                    <label>区域：</label>
                                    {{order.regionName}}
                                </p>
                                 <p v-if="order.parkingLocation != undefined || order.parkingLocation != null">
                                    <label>停车点：</label>
                                    {{order.parkingLocation}}
                                </p>
                                <p v-if="order.parkingLotName != undefined || order.parkingLotName != null">
                                    <label>车辆位置：</label>
                                    {{order.parkingLotName}}
                                </p>
                                <P>
                                    <label>交接地点：</label>
                                    {{order.parkingWaitLocation}}
                                </P>
                                <p>
                                    <label>预计交接时间：</label>
                                    {{order.scheduledParkingArriveTime}}
                                </p>
                                <p v-if="order.type == 0">
                                    <label>预计停车时长：</label>
                                    {{order.scheduledParkingTime+'小时'}}
                                </p>
                               
                                <p>
                                    <label>联系电话：</label>
                                    {{order.phoneUser}}
                                </p>
                                <p v-if="order.endTime != undefined || order.endTime != null">
                                    <label>完成时间：</label>
                                    {{dateFormat(order.endTime)}}
                                </p>
                            </div>
                            <div slot="footer" style="text-align:right;">
                                <van-button @click="chooseLost(order)" v-if="isNotHavaPkLot(order)" type="info">选择停车点</van-button>
                                <van-button v-if="isCompletePark(order)" type="info" @click="completePark(order)">已停车</van-button>
                                <van-button v-if="isCompleteFetch(order)" type="info" @click="alreadyGiven(order)">车已交付</van-button>
                                <van-button v-if="order.type == 1 && order.status == 'GI'" type="info" @click="alreadyFetch(order)">已取车</van-button>
                            </div>
                        </van-panel>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { getPkHistoryOrder, completeOrder ,arrvialPkLot } from "@/api/order.js";
import handle from "../../../utils/formateHandle.js";
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
      ],
      activeIndex: -1
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
      this.$store.commit('setEmployeeNavIndex','我的订单_P');
    this.initHistoryOrder();
    this.$Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 2000
    });
  },

  methods: {
    async initHistoryOrder() {
      const data = await getPkHistoryOrder();
      console.log("load historyOrder...", data.data);

      this.orderList = data.data;
    },
    lookDetail(order) {},
    chooseLost(order) {
      console.log("orderId:  " + order.id);
      this.$router.push({
        name: "选择停车场",
        params: { orderId: order.id }
      });
    },
    changeStatus(val) {
      return handle.changeStatusToString(val, "boy");
    },
    dateFormat(val) {
      return handle.dateFormatToString(val);
    },
    isNotHavaPkLot(order) {
      return (
        order.type == 0 &&
        (order.parkingLotName == undefined || order.parkingLotName == null)
      );
    },
    isCompletePark(order) {
      return order.type == 0 && order.status == "PI";
    },
    isCompleteFetch(order) {
      return order.type == 1 && order.status == "FF";
    },

    async alreadyGiven(order) {
      
      const res = await completeOrder(order.id);
       this.$Toast({
          type: "success",
          message: "又完成一单，再接再厉！",
          duration: 2000
        });
      if(res.data.code == 200) {
        this.initHistoryOrder();
      }
      console.log(res.data.code);
    },
    async alreadyFetch(order){
        const res = await arrvialPkLot(order.id);
        
        if(res.data.code == 200){
          this.initHistoryOrder();
            this.$Toast({
          type: "success",
          message: "请尽快交付车辆！",
          duration: 2000
        });
        }
    },
    async completePark(order) {
      if (this.isCompletePark(order)) {
        this.$Toast({
          type: "success",
          message: "又完成一单，再接再厉！",
          duration: 2000
        });
        const res = await completeOrder(order.id);
        if (res.data.code == 200) {
          this.initHistoryOrder();
        }
        console.log(res.data.code);
      }
    },
    active(id) {
      if (this.activeIndex == id) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = id;
    }
  },

  filters: {
    orderTypeFilter(val) {
      if (val == 1) {
        return "取车";
      }
      return "停车";
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
    .van-cell__label {
      width: 200px;
    }

    .order-body {
      color: #969799;
      font-size: 14px;
      .van-cell__title {
        font-size: 24px;
      }
      .van-panel__content {
        padding: 5px 18px;
      }
      & label {
        display: inline-block;
        width: 120px;
        text-align: right;
      }
      & p {
        margin: 10px 0;
      }
    }
    .isActive {
      .van-panel {
        height: 350px;
        transition: height 0.6s;
      }
    }
    .van-panel {
      height: 65px;
      transition: height 0.6s;
    }
    .el-card__body {
      padding: 0;
      text-align: left;
      padding: 10px 0 0 0;
      transition: height 0.6s;
    }
    .card-body {
      position: relative;
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