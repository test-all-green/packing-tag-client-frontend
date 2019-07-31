<template>
  <div class="order-user-show">
    <div class="back-to-list" v-if="this.isInDetailPage" @click="backToList">
      <i class="el-icon-back"></i>
    </div>
    <div class="user-orderList-wrapper" v-if="!this.isInDetailPage">
      <div v-for="item in OrderData" :key="item.id">
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
                <p class="status-text">状态：{{item.status|orderStatusFileter}}</p>
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

    <div class="user-order-detail-page" v-if="this.isInDetailPage">
      <van-panel
        :title="this.orderItem.carNum"
        :desc="this.orderItem.parkingCreateTime"
        :status="this.orderItem.status"
      >
        <div class="detail-content-container">
          <div class="detail-info">
            <el-row>
              <el-col :span="7" :offset="2">服务人: </el-col>
              <el-col :span="10">{{this.orderItem.parkingBoyName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">联系电话：</el-col>
              <el-col :span="10">{{this.orderItem.parkingBoyPhone}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">交接点：</el-col>
              <el-col :span="10">{{this.orderItem.parkingWaitLocation}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="2">停车地点：</el-col>
              <el-col :span="10">{{this.orderItem.parkingLocation}}</el-col>
            </el-row>
          </div>
        </div>
        <div slot="footer" class="detail-content-footer">
          <el-row>
            <el-col :span="10" :offset="1">
              <van-button size="large">取车</van-button>
            </el-col>
            <el-col :span="10" :offset="1">
              <van-button size="large" type="danger">支付订单</van-button>
            </el-col>
          </el-row>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getHistoryOrder } from "../../../api/order";
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
      isInDetailPage: false,
      orderItem: {}
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      const data = await getHistoryOrder();
      this.OrderData = data.data;
    },

    showDetailPage(order) {
      this.isInDetailPage = true;
      this.orderItem = order;
      this.orderItem.status = this.orderStatusFileter(this.orderItem.status);
    },
    backToList() {
      this.isInDetailPage = false;
    },

    orderStatusFileter(val) {
      let map = {
        PW: "无人受理",
        PI: "停取中",
        F: "已完成",
        C: "取消订单"
      };
      return map[val];
    }
  },

  filters: {
    dateFilter(val) {
      moment(val).format("YYYY MM DD, HH:mm:ss");
    },
    orderStatusFileter(val) {
      let map = {
        PW: "无人受理",
        PI: "停取中",
        F: "已完成",
        C: "取消订单"
      };
      return map[val];
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
              font: 14px/2 Tahoma,Helvetica,Arial,'宋体',sans-serif;
          }
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