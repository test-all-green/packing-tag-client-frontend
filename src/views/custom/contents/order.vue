<template>
  <div class="order-user-show">
    <div class="back-to-list" v-if="this.isInDetailPage == 'orderDetailPage'" @click="backToList">
      <i class="el-icon-back"></i>
    </div>
    <div class="user-orderList-wrapper" v-if="this.isInDetailPage == 'orderListPage'">
      <div v-for="item in $store.state.orderList" :key="item.id">
        <el-card class="box-card" :class="{'timeout':item.status =='已完成'||item.status =='取消'}">
          <div class="card-body">
            <el-row>
              <!-- <el-col :span="4" :offset="1">
                            <span class="circle">
                                <p>订单</p>
                            </span>
              </el-col>-->
              <el-col :span="9" :offset="2">
                <p class="carNum-text">{{item.carNum == '' ? '粤BWUZHI' : item.carNum}}</p>
                <p class="status-text">状态：{{orderStatusFileter(item.status)}}</p>
              </el-col>
              <el-col :span="4" :offset="8">
                <div class="right" @click="showDetailPage(item)">
                  详情
                  <i class="el-icon-right"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>

    <div class="user-order-detail-page" v-if="this.isInDetailPage == 'orderDetailPage'">
      <van-panel
        :title="this.orderItem.carNum"
        :desc="this.orderItem.createTime"
        :status="this.orderItem.status"
      >
        <div class="detail-content-container">
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
              <el-col :span="7" :offset="2">停车地点：</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingLocation}}</el-col>
            </el-row>
             <el-row>
              <el-col :span="7" :offset="2">服务人:</el-col>
              <el-col :span="10">{{this.parkOrderItem.parkingBoyName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">联系电话：</el-col>
              <el-col :span="10">{{this.parkOrderItem.phoneEmployee}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="detail-content-container" v-if="this.fetchOrderItem.id !== undefined">
          <van-divider></van-divider>
          <div class="detail-info">
            <el-row>
              <el-col :span="7" :offset="2">服务人:</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingBoyName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">联系电话：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingBoyPhone}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">交接点：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingWaitLocation}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">停车地点：</el-col>
              <el-col :span="10">{{this.fetchOrderItem.parkingLocation}}</el-col>
            </el-row>
          </div>
        </div>

        <div slot="footer" class="detail-content-footer">
          <el-row>
            <!-- <el-col :span="10" :offset="1" v-if="this.fetchOrderItem.id !== undefined">
              <van-button size="large" disabled>呼叫取车</van-button>
            </el-col>-->
            <el-col
              :span="22"
              :offset="1"
              v-if="this.parkOrderItem.id !== undefined && this.parkOrderItem.status == 'WT'"
            >
              <van-button size="large" @click="callFetchCar(orderItem)">呼叫取车</van-button>
            </el-col>
            <!-- <el-col :span="10" :offset="1">
              <van-button size="large" type="danger">支付订单</van-button>
            </el-col>-->
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1" style="margin-top:10px;">
              <!-- <van-button
                size="large"
                type="danger"
                disabled
                v-if="this.fetchOrderItem.id !== undefined"
              >支付订单</van-button> -->
              <van-button
                size="large"
                type="danger"
                v-if="this.fetchOrderItem.id !== undefined && this.fetchOrderItem.status == 'WP'"
              >支付订单</van-button>    
            </el-col>
          </el-row>
        </div>
      </van-panel>
    </div>

    <!-- 取车订单 -->
    <div class="user-call-fetch-car-page" v-if="this.isInDetailPage == 'fetchCarPage'"></div>
  </div>
</template>

<script>
import moment from "moment";
import { getHistoryOrder, getUserOrderDetail } from "../../../api/order";
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
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const data = await getHistoryOrder();
      this.OrderData = data.data;
      console.log("initData", this.OrderData);
    },

    callFetchCar(order) {
      console.log("callFetchCar..+", order);
      // this.isInDetailPage = 'fetchCarPage';
      let data = {
        "order": order,
        "type": 1

        
      };
      this.$store.commit('setOrder',data)
      // this.$router.push({ path: "/custom/serve", query: data });
      this.$router.push({ name: "服务厅_C", params: data });
    },
    async showDetailPage(order) {
         this.$Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 1500
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
        this.isInDetailPage = "orderDetailPage";
        this.orderItem.status = this.orderStatusFileter(this.orderItem.status);
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

      this.orderItem.status = this.orderStatusFileter(this.orderItem.status);
      this.orderItem.createTime = moment(this.orderItem.createTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },

    backToList() {
      this.isInDetailPage = "orderListPage";
    },

    orderStatusFileter(val) {
      let map = {
        PW: "无人受理",
        PI: "存取中",
        F: "已完成",
        C: "取消订单",
        GI: "前往地点",
        WP: "待支付",
        FW: "等待取车受理"
      };
      return map[val];
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
          color: #9a9292;
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
      padding: 20px 10px;
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
    padding: 10px 0 0 0;
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
    // margin-top:px;
  }
  .status-text {
    margin-top: 10px;
    font-size: 14px;
  }
  .time {
    font-size: 14px;
    margin-top: 57px;
  }
  .right {
    font-size: 16px;
    line-height: 20px;
    color: #a2a2a2;
    margin-top: 22px;
  }
}
</style>