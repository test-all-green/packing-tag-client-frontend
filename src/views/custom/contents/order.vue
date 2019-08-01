<template>
  <div class="order-user-show">
    <div class="back-to-list" v-if="this.isInDetailPage == 'orderDetailPage'" @click="backToList">
      <i class="el-icon-back"></i>
    </div>
    <div class="user-orderList-wrapper" v-if="this.isInDetailPage == 'orderListPage'">
      <div v-for="item in $store.state.orderList" :key="item.id">
        <el-card class="box-card" :class="{'timeout':item.status =='已完成'||item.status =='取消'}">
          <div class="card-body" @click="showDetailPage(item)">
            <el-row tyle="flex" justify="space-around">
              <!-- <el-col :span="4" :offset="1">
                            <span class="circle">
                                <p>订单</p>
                            </span>
              </el-col>-->
              <el-col :span="9" :offset="1">
                <div style="padding:10px 0;">
                  <p class="carNum-text">{{item.carNum}}</p>
                  <!-- <p class="status-text">状态：{{orderStatusFileter(item.status)}}</p> -->
                </div>
              </el-col>
              <el-col :span="12" :offset="2" >
                <div class="right" :class="{'status-text-color':item.status !='F'}">
                  {{orderStatusFileter(item.status)}}
                  <!-- <i class="el-icon-right"></i> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>

    <div class="user-order-detail-page" v-if="this.isInDetailPage == 'orderDetailPage'">
      <van-panel :title="orderItem.carNum" :desc="orderItem.createTime" :status="detailStatus">
        <div class="detail-content-container">
          <van-divider content-position="left">停车订单</van-divider>
          <div class="detail-info">
            <el-row>
              <el-col :span="7" :offset="2">区域：</el-col>
              <el-col :span="10">{{this.parkOrderItem.regionName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">交接点：</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingWaitLocation}}</el-col>
            </el-row>

            <el-row>
              <el-col :span="7" :offset="2">交接时间：</el-col>
              <el-col :span="10">{{this.parkOrderItem.scheduledParkingArriveTime}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">停车地点：</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingLocation||"暂无"}}</el-col>
            </el-row>
            <el-row v-if="this.parkOrderItem.parkingLotName != undefined || this.parkOrderItem.parkingLotName != null">
              <el-col :span="7" :offset="2">停车位</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingLotName||"暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">服务人:</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingBoyName||"暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">联系电话：</el-col>
              <el-col :span="10">{{this.parkOrderItem.phoneEmployee||"暂无"}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="detail-content-container" v-if="this.fetchOrderItem.id !== undefined">
          <van-divider content-position="left">取车订单</van-divider>
          <div class="detail-info">
            <el-row>
              <el-col :span="7" :offset="2">区域：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.regionName}}</el-col>
            </el-row>

            <el-row>
              <el-col :span="7" :offset="2">交接点：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingWaitLocation || '暂无'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">交接时间:</el-col>
              <el-col :span="10">{{this.fetchOrderItem.scheduledParkingArriveTime || '暂无'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">停车地点：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingLocation || '暂无'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">服务人:</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingBoyName || '暂无'}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">联系电话：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.phoneEmployee || '暂无'}}</el-col>
            </el-row>
          </div>
        </div>

        <div slot="footer" class="detail-content-footer">
          <el-row type="flex" justify="center">
            <van-button
              v-if="this.parkOrderItem.id !== undefined && this.parkOrderItem.status == 'FW'"
              type="info"
              @click="callFetchCar(orderItem)"
            >呼叫取车</van-button>
          </el-row>
          <el-row type="flex" justify="center">
              <van-button
                size="large"
                type="danger"
                v-if="this.fetchOrderItem.id !== undefined && this.fetchOrderItem.status == 'WP'"
                @click="pay(orderItem)"
              >支付订单</van-button>
            
          </el-row>
        </div>

        <div v-if="this.fetchOrderItem.id != undefined && this.fetchOrderItem.status == 'F'">
          <van-divider content-position="left">支付</van-divider>
          <el-row>
            <el-col :span="22" :offset="2">
              金额：{{this.fetchOrderItem.money}}
            </el-col>
          </el-row>
        </div>
      </van-panel>
    </div>

    <div class="user-call-fetch-car-page" v-if="this.isInDetailPage == 'fetchCarPage'"></div>
  </div>
</template>

<script>
import moment from "moment";
import { getHistoryOrder, getUserOrderDetail } from "../../../api/order";
import { goPay } from "../../../api/pay";
export default {
  data() {
    return {
      OrderData: [
        {
          id: 2,
          carNum: "粤BGUN",
          parkingCreateTime: "2019-11-11 10:24:11",
          parkingEndTime: "1564413634943",
          parkingBoyId: "12",
          parkingBoyName: "康司机",
          parkingBoyPhone: "1351002457",
          parkingWaitLocation: "香洲区南软交界点",
          parkingLotId: "1",
          parkingLocation: "南软地下停车场",
          createTime: "1564413634943",
          endTime: "1564413634943",
          status: "PI",
          type: "0",
          parkingLotType: "1",
          regionId: "1"
        }
      ],
      isInDetailPage: "orderListPage",
      orderItem: {},
      parkOrderItem: {},
      fetchOrderItem: {}
    };
  },
  components: {},
  computed: {
    detailStatus() {
      return this.orderStatusFileter(this.orderItem.status);
    }
  },
  created() {
       this.$store.commit('setCustomNavIndex','我的订单_C');
    this.$Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 500
      });
    this.initData();
    
  },
  methods: {
    async initData() {
      const data = await getHistoryOrder();
      this.OrderData = data.data;
      console.log("initData", this.OrderData);
    },

    callFetchCar(order) {

       this.$Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 500
      });
      console.log("callFetchCar..+", order);
      // this.isInDetailPage = 'fetchCarPage';
      let data = {
        order: order,
        type: 1
      };
      this.$store.commit("setOrder", data);
      // this.$router.push({ path: "/custom/serve", query: data });
      this.$router.push({ name: "服务厅_C", params: data });
    },
    async showDetailPage(order) {
      this.$Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 500
      });
      this.orderItem = {};
      this.parkOrderItem = {};
      this.fetchOrderItem = {};
      if (order.type == null) {
        this.$message({
          message: "暂无人处理",
          type: "warning"
        });

        this.orderItem = order;
        console.log("===========================" + this.orderItem);
        this.isInDetailPage = "orderDetailPage";
        // this.orderItem.status = this.orderStatusFileter(this.orderItem.status);
        this.orderItem.createTime = moment(this.orderItem.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return;
      }
      this.isInDetailPage = "orderDetailPage";
      let param = {
        id: order.id,
        type: order.type
      };
      console.log("param...", param);
      const data = await getUserOrderDetail(param);
      this.order = data.data;

      console.log("all...", this.order);

      this.parkOrderItem = this.order.parkOrder;
      this.fetchOrderItem = this.order.fetchOrder;

      if (this.fetchOrderItem.carNum !== undefined) {
        this.orderItem = this.fetchOrderItem;
      } else {
        this.orderItem = this.parkOrderItem;
      }
      console.log("parking..", this.order.parkOrder);
      console.log("fetOrder", this.order.fetchOrder);
      console.log("orderItem..", this.orderItem);

      // this.orderItem.status = this.orderStatusFileter(this.orderItem.status);
      this.orderItem.createTime = moment(this.orderItem.createTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },

    backToList() {
      this.isInDetailPage = "orderListPage";
    },

    orderStatusFileter(val) {
      console.log(val, "asdds");
      let map = {
        PW: "无人受理",
        PI: "停取中",
        F: "已完成",
        C: "取消订单",
        GI: "正在取车",
        WP: "待支付",
        FW: "已停车",
        WT: "正在挑选停车点",
        FF:"急速赶来中"
      };
      console.log(map[val]);
      return map[val];
    },

    async pay(order) {
      console.log(order);
      const pay = await goPay(order);
      console.log("pay=============" + pay.data);
      const div = document.createElement("div");
      div.innerHTML = pay.data; // html code
      document.body.appendChild(div);
      console.log("form=============" + document.forms[0]);
      document.forms[0].submit();
    }
  },
  filters: {
    dateFilter(val) {
      moment(val).format("YYYY MM DD, HH:mm:ss");
    }
  }
};
</script>
<style lang='scss' >
.order-user-show {
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .user-order-detail-page {
    .van-panel__header {
      .van-cell__title {
        margin-left: 13px;
        span {
          font-size: 24px;
          color: #323233;
        }
      }
      .van-cell__value {
        span {
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
    .detail-content-container {
      padding: 15px 0;
      .detail-info {
        color: #584f4f;
        .el-row {
          font: 14px/2 Tahoma, Helvetica, Arial, "宋体", sans-serif;
        }
      }
    }
    .van-panel__footer {
      padding: 12px 10px;

      .van-button {
        height: 40px;
        width: 250px;
      }
    }
  }
  .back-to-list {
    position: absolute;
    top: 12px;
    left: 20px;
    color: #fff;
    & i {
      font-size: 28px;
      &:focus {
        background: #333;
      }
    }
  }
  .el-card__body {
    padding: 0;
    text-align: left;
    height: 60px;
    // padding: 10px 0 0 0;
  }
  .card-body {
    position: relative;
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
      font-size: 28px;
      margin-left: 1px;
    }
  }
  .timeout {
    background: #b3b3b3;
    .circle {
      background: #949393;
    }
    .right {
      color: #fff;
    }
  }
  .carNum-text {
    font-size: 24px;
    margin-top: 10px;
  }
  .status-text {
    margin-top: 8px;
    color: #969799;
    font-size: 12px;
  }
  .time {
    font-size: 14px;
    margin-top: 57px;
  }
  .right {
    font-size: 14px;
    line-height: 20px;
    color: #a2a2a2;
    margin-top: 22px;
    text-align: right;
    margin-right: 10px;
  }
  .status-text-color{
    color:blue;
    // font-weight: bold;
  }
}
</style>