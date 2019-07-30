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
                            <p class="status-text">状态：{{item.status|orderStatusFileter}}</p>
                          
                        </el-col>
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
import {getHistoryOrder} from '../../../api/order'
export default {
  data() {
    return {
      OrderData: [ ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
      this.initData();
  },

  methods: {
      async initData(){
        const data = await getHistoryOrder();
        this.OrderData = data.data;
      }
  },

  filters: {
      dateFilter(val){
          moment(val).format('YYYY MM DD, HH:mm:ss')
      },
      orderStatusFileter(val){
          let map = {
              PW:'无人受理',
              PI:'停取中',
              F:'已完成',
              C:'取消订单'
          }
          return map[val]
      }
  }
};
</script>
<style lang='scss' >
.order-user-show {
    height:100%;
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
  .card-body{
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