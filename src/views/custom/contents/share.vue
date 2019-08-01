<template>
  <div>
    <div class="back">
      <i class="el-icon-back" @click="inputing = 'none'" v-if="inputing !== 'none'"></i>
    </div>
    <div v-if="inputing === 'none'">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">未发布</span>
          <div v-for="item in $store.state.shareParkingLotList.filter(lot => lot.status === 0)" :key="item.id">
            <el-card class="box-card">
              <div class="card-body">
                <el-row>
                  <el-col :span="9" :offset="1">
                    <p class="carNum-text">{{item.parkingLotName}}</p>
                  </el-col>
                  <el-col :span="4" :offset="10">
                    <div class="right">
                      <i class="el-icon-right" @click="publishSharedLot(item)"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已发布">
          <div v-for="item in $store.state.shareParkingLotList.filter(lot => lot.status === 1 || lot.status === 2)" :key="item.id">
            <el-card class="box-card">
              <div class="card-body">
                <el-row>
                  <el-col :span="9" :offset="1">
                    <p class="carNum-text">{{item.parkingLotName}}</p>
                  </el-col>
                  <el-col :span="4" :offset="10">
                    <div class="right">
                      <i class="el-icon-right" @click="sharedLotDetail(item)"></i>
                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <el-col :span="4" :offset="7">
          <el-button type="primary" @click="addSharedLot">+&nbsp;&nbsp;&nbsp;新增共享车位</el-button>
        </el-col>
      </el-footer>
    </div>
    <div v-if="inputing === 'addForm'">
      <addShared></addShared>
    </div>
    <div v-if="inputing === 'publishForm'">
      <publishForm v-bind:item="item"></publishForm>
    </div>
    <div v-if="inputing === 'sharedLotDetail'">
      <sharedLotDetail v-bind:item="item"></sharedLotDetail>
    </div>
  </div>
</template>
<script>
import addShared from "./addShared.vue";
import publishForm from "./publishLot.vue";
import sharedLotDetail from "./shareLotDetail.vue";
import { getShareParkingLot } from "../../../api/shared";
export default {
  data() {
    return {
      activeName: "second",
      inputing: "none",
      sharedParkingLot: [],
      item: {}
    };
  },
  created() {
    this.initData();
  },
  components: {
    addShared,
    publishForm,
    sharedLotDetail
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    publishSharedLot(item) {
      this.item = item;
      this.inputing = "publishForm";
    },
    sharedLotDetail(item) {
      this.item = item;
      this.inputing = "sharedLotDetail";
    },
    addSharedLot() {
      this.inputing = "addForm";
    },
    addSuccess() {
      this.inputing = "none";
    },
    async initData() {
      const data = await getShareParkingLot();
      this.sharedParkingLot = data.data;
    }
  }
};
</script>
<style lang='scss'>
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
.el-footer{
  margin-top:20px;
  line-height:60px;
}
.el-tabs__item{
  padding: 0 71.87px !important;
}
</style>
