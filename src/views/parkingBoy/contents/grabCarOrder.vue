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

    <div v-for="order in this.orderList" :key="order.id">
      <el-card class="box-card" style="width: 100%;" shadow="hover">
        <div class="card-body">
          <el-row>
            <el-col :span="4" :offset="1">
              <span class="circle">
                <p v-if="order.status == 'WP'">停</p>
                <p v-if="order.status == 'WF'">取</p>
              </span>
              <!-- <el-avatar :size="52" src="../../../assets/logo.png"></el-avatar> -->
            </el-col>
            <el-col :span="10" :offset="1">
              <div class="order-content-mid">
                <div v-if="order.status == 'WP'">
                  <p class="order-carNum">{{order.carNum}}</p>
                  <p class="wait-location">停车交接点: {{order.parkingWaitLocation}}</p>
                  <!-- <p class="order-create-time">订单时间: {{order.createTime}}</p> -->
                </div>
                <div v-if="order.status == 'WF'">
                  <p class="order-carNum">{{order.carNum}}</p>
                  <p class="wait-location">取车交接点: {{order.fetchWaitLocation}}</p>
                  <!-- <p class="order-create-time">订单时间: {{order.createTime}}</p> -->
                </div>
              </div>
            </el-col>

            <el-col :span="4" :offset="3">
              <div class="right" @click="showOrderDetail(order)">
                详情
                <i class="el-icon-right"></i>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrders } from "../../../api/order";
export default {
  data() {
    return {
      orderList: [
        {
          "id": "1",
          "carNum": "粤B989TC",
          "status": "WP",
          "parkingWaitLocation": "深圳市南山区大沙河公园",
          "createTime": "2019-07-30"
        },
        {
          "id": "2",
          "carNum": "粤B889TX",
          "status": "WF",
          "fetchWaitLocation": "深圳市福田区",
          "createTime": "2019-07-29"
        }
      ]
    };
  },
  methods: {
    showOrderDetail(order) {
      console.log(order);
    }
  },
  created() {},
  mounted() {
    // getOrders().then(response => {
    //   console.log("response.data :", response.data);
    //   this.orderList = response.data;
    // });
  }
};
</script>

<style  lang='scss'>
.grab-car-order-container {
  text-align: left;
  height: 562px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
