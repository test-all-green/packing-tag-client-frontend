<template>
  <div class="order-user-show">
    <div class="back-to-list" v-if="this.isInDetailPage">
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
                <div class="right">
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
      <van-panel title="标题" desc="描述信息" status="状态">
        <div>内容</div>
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
      OrderData: [],
      isInDetailPage: true
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