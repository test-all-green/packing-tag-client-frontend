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
              <!-- <span class="circle">
                <p>订单</p>
              </span>-->
              <el-avatar :size="52" src="../../../assets/logo.png"></el-avatar>
            </el-col>
            <el-col :span="9" :offset="1">
              <div class="order-content-mid">

              </div>
            </el-col>

            <el-col :span="4" :offset="14">
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
</template>

<script>
import { getOrders } from "../../../api/order";
export default {
  data() {
    return {
      orderList: []
    };
  },
  created() {},
  mounted() {
    getOrders().then(response => {
      console.log("response.data :", response.data);
      this.orderList = response.data;
    });
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
      margin-left: 7px;
    }
  }
  .right {
    font-size: 16px;
    line-height: 20px;
    color: #a2a2a2;
    margin-top: 22px;

   
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
