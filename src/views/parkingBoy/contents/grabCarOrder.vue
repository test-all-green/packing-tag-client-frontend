<template>
  <div class="grab-car-order-container">
    <!-- <van-cell
      v-for="(item,index) in orderList"
      :key="index"
      num="2"
      :label="'创建时间'+item.createTime"
      :title="item.carNum"
    >
      <template slot>
        <span>无</span>
      </template>
    </van-cell>-->
    <!-- <mt-cell v-for="(item,index) in orderList" :key="index" :title="item.carNum"  value="带 icon"></mt-cell>   -->

    <div class="order-list">
      <div v-for="order in orderList" :key="order.id">
        <el-card class="box-card" style="width: 100%;" shadow="hover">
          <div class="card-body">
            <el-row>
              <el-col :span="4" :offset="1">
                <span class="circle">
                  <p v-if="order.status == 'PW'">停</p>
                  <p v-if="order.status == 'FW'">取</p>
                </span>
                <!-- <el-avatar :size="52" src="../../../assets/logo.png"></el-avatar> -->
              </el-col>
              <el-col :span="10" :offset="1">
                <div class="order-content-mid">
                  <div v-if="order.status == 'PW'">
                    <p class="order-carNum">{{order.carNum}}</p>
                    <p class="wait-location">停车交接点: {{order.parkingWaitLocation}}</p>
                    <!-- <p class="order-create-time">订单时间: {{order.createTime}}</p> -->
                  </div>
                  <div v-if="order.status == 'FW'">
                    <p class="order-carNum">{{order.carNum}}</p>
                    <p class="wait-location">取车交接点: {{order.fetchWaitLocation}}</p>
                    <!-- <p class="order-create-time">订单时间: {{order.createTime}}</p> -->
                  </div>
                </div>
              </el-col>

              <el-col :span="4" :offset="3">
                <div class="right" @click="showDetail(order)">
                  抢单
                  <i class="el-icon-right"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>

    <parking-order-detail ref='window' :order="orderDetail"  />
  </div>
</template>

<script>
import { formatDate, formatDate2 } from "@/utils/data.js";
import { getOrders } from "../../../api/order";
import moment from "moment";
import parkingOrderDetail from "@/views/parkingBoy/contents/parkingOrderDetail.vue";
export default {
  data() {
    return {
      orderDetail: {},
      orderList: []
    };
  },
  methods: {
    showDetail(order) {
      this.$refs['window'].show = true;
      order.createTime = moment(order.createTime).format('YYYY MM DD hh:mm:ss');
      // order.createTime = formatDate2(order.createTime);
      // order.status = order.status == 'PW' ? '停车等待受理' : '取车等待受理';
      this.orderDetail = order;
    }, 
    closeDetailreturnFalse() {

    },
    async initData(){
      const res = await getOrders("PW");
      this.orderList = res.data;
    console.log(this.orderList)
    }
  },
  created() {},
  mounted() {
    this.initData();
    
  },
  components: {
    parkingOrderDetail
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
    .el-card__body {
      padding: 0;
      text-align: left;
      height: 80px;
      padding: 10px 0 0 0;
    }
    .card-body {
      position: relative;
    }
  }

  .order-content-mid {
    font-size: 13px;
    .order-carNum {
      margin-top: 10px;
      font-size: 16px;
      color: #458e28;
    }
    .wait-location {
      margin-top: 10px;
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
    line-height: 0px;
    color: #a2a2a2;
    margin-top: 28px;
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
