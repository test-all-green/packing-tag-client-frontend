<template>
    <div class="order-user-show">
        <div v-for="item in OrderData" :key="item.id">
            <el-card class="box-card" :class="{'timeout':item.status =='已完成'||item.status =='取消'}">
                <div class="card-body">
                    <el-row>
                        <el-col :span="4" :offset="1">
                            <span class="circle">
                                <p>订单</p>
                            </span>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <p class="carNum-text">{{item.carNum}}</p>
                            <p class="status-text">状态：{{item.status}}</p>
                          
                        </el-col>
                        <!-- <el-col :span="4">
                              <p class="time">{{item.endTime}}</p>
                        </el-col> -->
                        <el-col :span="4" :offset="4">
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
import moment from 'moment'
export default {
  data() {
    return {
      OrderData: [
        {
          id: 1,
          carNum: "粤D251454",
          parkingWaitLocation: "",
          scheduledParkingArriveTime: "",
          scheduledParkingTime: "",
          status: "停车等待受理",
          endTime:'156445371'
        },
        {
          id: 2,
          carNum: "粤D4874",
          parkingWaitLocation: "",
          scheduledParkingArriveTime: "",
          scheduledParkingTime: "",
          status: "已完成",
          endTime:'156445371'
        },
        {
          id: 3,
          carNum: "粤D251454",
          parkingWaitLocation: "",
          scheduledParkingArriveTime: "",
          scheduledParkingTime: "",
          status: "取消",
          endTime:'1564440791'
        },
        {
          id: 4,
          carNum: "粤D4874",
          parkingWaitLocation: "",
          scheduledParkingArriveTime: "",
          scheduledParkingTime: "",
          status: "已完成",
          endTime:'1564350791'
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {},

  methods: {},

  filters: {
      dateFilter(val){
          moment(val).format('YYYY MM DD, HH:mm:ss')
      }
  }
};
</script>
<style lang='scss' >
.order-user-show {
  .el-card__body {
    padding: 0;
    text-align: left;
    height: 80px;
    padding: 10px 0 0 0;
  }
  .card-body{
      position: relative;
  }
  .circle {
    display: inline-block;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background: #ec6149;
    line-height: 60px;
    // margin-left: 20px;
    & p {
      // margin:0 auto;
      font-size: 28px;
      margin-left:1px;
    }
  }
  .timeout{
      background: #b3b3b3;
      .circle{
          background: #949393;
      }
      .right{
          color:#FFF;
      }
  }
  .carNum-text {
    font-size: 24px;
    margin-top:4px;
  }
  .status-text {
    margin-top: 28px;
    font-size:14px;
  }
  .time{
      font-size:14px;
      margin-top:57px;
  }
  .right {
    font-size: 16px;
    line-height: 20px;
    color: #a2a2a2;
    margin-top: 22px;

   
  }
}
</style>