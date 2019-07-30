<template>
    <div class="pk-history">
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
                                    <div>
                                        <p class="order-carNum">{{order.carNum}}</p>
                                        <p class="wait-location">交接点: {{order.parkingWaitLocation}}</p>
                                    </div>

                                </div>
                            </el-col>

                            <el-col :span="4" :offset="3">
                                <div class="right">
                                    <el-button>完成停车</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        orderList:[
            {
                
            }

        ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {},

  methods: {},

  filters: {}
};
</script>
<style lang='scss'>
.pk-history {
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
}
</style>