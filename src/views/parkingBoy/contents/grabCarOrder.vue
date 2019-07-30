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

    <div class="box-card-group" v-for="order in this.orderList">
      <el-card style="width: 100%;">
        {{order.status}}
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

<style>
.grab-car-order-container {
  text-align: left;
}
.grab-car-order-cell-value {
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  background-color: red;
}
</style>
