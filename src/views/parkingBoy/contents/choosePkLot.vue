<template>
    <div class="choose-pklot-pane">
         <mt-header title="选择停车点" style="font-size:20px;">
         </mt-header>
        <div class="back">
            <i class="el-icon-back" @click="$router.go(-1)"></i>
        </div>
        <van-collapse v-model="activeCollapse" accordion>
            <van-collapse-item title="停车场" name="1">
                <div class="lot-choose">
                    <el-card class="box-card lot-item" v-for="item in lots" :key="item.id">
                        <div @click="chooseLot(item)">
                            <span>
                                {{item.parkingLotName}}({{item.remain}})
                            </span>
                            <span class="location">
                                {{item.location}}
                            </span>
                        </div>
                    </el-card>
                </div>
            </van-collapse-item>
            <van-collapse-item title="共享车位" name="2">
              <div class="lot-choose">
                    <el-card class="box-card lot-item" v-for="item in shareLots" :key="item.id">
                        <div @click="chooseShareLot(item)">
                            <span>
                                {{item.parkingLotName}}(可用)
                            </span>
                            <span class="location">
                                {{item.location}}
                            </span>
                        </div>
                    </el-card>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import {getPkLots,getShareLots } from '../../../api/parkinglot'
import {chooseLotInOrder} from '../../../api/order'
export default {
  data() {
    return {
      activeCollapse: "",
      
      lots: [
      ],
      shareLots:[],

      orderId:''
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
     this.$Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 500
      });
    this.orderId = this.$route.params.orderId;

    console.log(this.orderId,"还有谁")
    this.initLotsData();
    this.initShareLotsData();
  },

  methods: {
    async initLotsData(){
        const data = await getPkLots(this.orderId);
        this.lots = data.data;
    },
    async initShareLotsData(){
      const data = await getShareLots(this.orderId);
      console.log(data.data)
      this.shareLots = data.data;
    },
    chooseLot(item) {
      this.$dialog
        .confirm({
          title: "选择停车点",
          message: "确认停车点，请尽快将车停往" + item.parkingLotName
        })
        .then(() => {
          console.log("yes");
            let postData= {
              parkingLotType:1,
              parkingLotId:item.id,
              orderId:this.orderId
            }
            this.grapOrder(postData);
            console.log(postData);
        })
        .catch(() => {
          // on cancel
        });
    },
    chooseShareLot(item){
      this.$dialog
        .confirm({
          title: "选择停车点",
          message: "确认停车点，请尽快将车停往" + item.parkingLotName + "?"
        })
        .then(() => {
          console.log("yes");
            let postData= {
              parkingLotType:2,
              parkingLotId:item.id,
              orderId:this.orderId
            }
            this.grapOrder(postData);
            console.log(postData);
        })
        .catch(() => {
          // on cancel
        });
    },
    async grapOrder(data){
      const res = await chooseLotInOrder(data);
      if(res.status == 200){
     
        this.$Toast.loading({
            type: "success",
            message: "请尽快前往交接地点",
            duration: 2000
          });
        
        this.$router.push({name:'我的订单_P'});
      }
    }
  },

  filters: {}
};
</script>
<style lang='scss' >
.van-dialog__message {
  line-height: 2;
}
.choose-pklot-pane {
  .van-cell {
    height: 50px;
    font-size: 18px;
    border-radius: 5px;
    background: #fafafa;

    &:active {
      background: #ececec;
    }
    // &:focus{
    //     background: green;
    // }
  }
  .lot-choose {
    height: 440px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  //      .el-card {
  //         // margin-bottom: 5px;
  //         // background: red;
  //     }
  .lot-item {
    // height: 50px;
    font-size: 16px;
    // line-height: 50px;
    position: relative;

    &:active {
      background: #ececec;
    }

    .location {
      position: absolute;
      right: 20px;
    }
  }
  .back {
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
}
</style>