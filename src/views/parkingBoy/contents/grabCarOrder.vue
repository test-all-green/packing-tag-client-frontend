<template>
    <div class="grab-car-order-container">
        <div class="order-list">
            <div v-for="order in orderList" :key="order.id" @click="active(order.id)">
                <el-card class="box-card" style="width: 100%;" shadow="hover" :class="{'isActive':activeIndex == order.id}">
                    <div class="order-body">
                        <van-panel :title="carNum(order)" :desc="order.parkingWaitLocation" :status="changeStatus(order.status)">
                            <div>
                                <p>
                                    <label>订单类型：</label>
                                    {{order.type|orderTypeFilter}}
                                </p>
                                <p>
                                    <label>区域：</label>
                                    {{order.regionName}}
                                </p>
                                <P>
                                    <label>交接地点：</label>
                                    {{order.parkingWaitLocation}}
                                </P>
                                <p>
                                    <label>预计交接时间：</label>
                                    {{order.scheduledParkingArriveTime}}
                                </p>
                                <p v-if="order.type == 0 ">
                                    <label>预计停车时长：</label>
                                    {{order.scheduledParkingTime+'小时'}}
                                </p>
                                <p>
                                    <label>联系电话：</label>
                                    {{order.phoneUser}}
                                </p>

                            </div>
                            <div slot="footer" style="text-align:right;">
                                <van-button type="info" @click="grabOrder(order)">抢单</van-button>
                            </div>
                        </van-panel>
                    </div>
                </el-card>

            </div>
        </div>

        <parking-order-detail ref='window' :order="orderDetail" />
    </div>
</template>

<script>
import { formatDate, formatDate2 } from "@/utils/data.js";
import { getOrders } from "../../../api/order";
import moment from "moment";
import parkingOrderDetail from "@/views/parkingBoy/contents/parkingOrderDetail.vue";
import handle from "../../../utils/formateHandle.js";
import { grapOrder } from "../../../api/order";

export default {
  data() {
    return {
      orderDetail: {},
      orderList: [],
      activeIndex: -1
    };
  },
  methods: {
    showDetail(order) {
      this.$refs["window"].show = true;
      order.createTime = moment(order.createTime).format("YYYY MM DD hh:mm:ss");
      // order.createTime = formatDate2(order.createTime);
      // order.status = order.status == 'PW' ? '停车等待受理' : '取车等待受理';
      this.orderDetail = order;
    },
    closeDetailreturnFalse() {},
    async initData() {
      const res = await getOrders("PW");
      this.orderList = res.data;
      console.log(this.orderList);
    },
    changeStatus(val) {
      return handle.changeStatusToString(val, "boy");
    },
    carNum(order) {
      let type = order.type == 1 ? "取" : "停";
      return order.carNum + "（" + type + "）";
    },
    async grabOrder(order) {
      console.log(order.id);
      const res = await grapOrder(order.id);
      this.$Toast({
        type: "success",
        message: "抢单成功",
        duration: 2000
      });
      if (order.type == 0) {
        this.$router.push({
          name: "选择停车场",
          params: { orderId: order.id }
        });
      }
       this.$router.push({ name: "我的订单_P" });
      
    },
    active(id) {
      if (this.activeIndex == id) {
        this.activeIndex = -1;
        return;
      }
      this.activeIndex = id;
    }
  },
  created() {
    this.$Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 1000
    });
    this.initData();
  },
  mounted() {},
  components: {
    parkingOrderDetail
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

<style  lang='scss'>
.grab-car-order-container {
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
        // text-align: center;
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
        height: 290px;
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
.grab-car-order-cell-value {
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  padding: 1px;
  background-color: red;
}
</style>
