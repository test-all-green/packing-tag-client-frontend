<template>
  <div class="pk-order-detail">
    <!-- <van-steps :active="active">
            <van-step>下单</van-step>
            <van-step>接单</van-step>
            <van-step>买家提货</van-step>
            <van-step>交易完成</van-step>
    </van-steps>-->
    <van-popup v-model="show">
      <p class="detail-title">停车订单</p>
      <el-card class="box-card">
        <van-panel :title="order.carNum" :desc="order.createTime" :status="orderContent">
          <div>
            <p>
              <label>区域：</label>
              {{order.regionId}}
            </p>
            <P>
              <label>交接地点：</label>
              {{order.parkingWaitLocation}}
            </P>
            <p>
              <label>预计交接时间：</label>
              {{order.scheduledParkingArriveTime}}
            </p>
            <p>
              <label>预计停车时长：</label>
              {{order.scheduledParkingTime+'小时'}}
            </p>
             <p v-if="order.type == 1">
              <label>车辆位置：</label>
              {{order.scheduledParkingTime}}
            </p>
            <!-- <p>
              <label>联系电话：</label>
              {{order.phone}}
            </p>-->
          </div>
          <div slot="footer">
            <van-button size="small" @click="back">返回</van-button>
            <van-button size="small" type="primary" style="margin-left:10px;" @click="grabOrder">抢单</van-button>
          </div>
        </van-panel>
      </el-card>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      active: 2,
      show: false,
      // Orderform: {
      //   carNum: "粤D232",
      //   parkingWaitLocation: "xx路口",
      //   scheduledParkingArriveTime: "9:00",
      //   scheduledParkingTime: "10",
      //   status: "停车受理等待",
      //   createTime: "2019-07-29 12:23:30",
      //   phone: "13651241411"
      // }
      orderContent:
        this.order.status === "PW" ? "停车等待受理" : "取车等待受理"
    };
  },

  components: {},

  computed: {
    // statusContent() {return Orderform.status == 'PW' ? '停车等待受理' : '取车等待受理'}
  },
  watch: {},

  mounted() {},

  created() {
    
  },

  methods: {
    grabOrder() {
      console.log(this.order.id)
      this.$router.push({
        path: "/parkingBoy/choosePkLot",
        query: { orderId: this.order.id }
      });
      this.show = false;
    },
    back() {
      // console.log(this.show);
      this.show = false;
    }
  },

  filters: {}
};
</script>
<style lang='scss' >
.pk-order-detail {
  height: 562px;
  .van-popup {
    z-index: 1000;
  }
  .van-popup--center {
    width: 90%;
  }
  .detail-title {
    font-size: 32px;
    margin: 20px;
  }
  .detail-title {
    font-size: 32px;
    margin: 20px;
  }
  .van-cell-group {
    // margin-top:40px;
  }
  .van-cell__title {
    font-size: 26px;
    //   text-align: left;
  }
  .van-panel__content {
    //   text-align:
    padding: 20px;

    & label {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin: 5px 0;
    }
  }
  .van-panel__footer {
    text-align: right;
  }
}
</style>