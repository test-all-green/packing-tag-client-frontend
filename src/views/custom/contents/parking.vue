<template>
    <div class="push-order-pane">
        <el-row type="flex" justify="center">
            <p class="order-title">{{title}}</p>
        </el-row>
        <el-row align="center">
            <el-col class="col-form" :span="20" :offset="1">
                <el-form :label-position="labelPosition" label-width="80px" :model="Orderform" :rules="rules">
                    <el-form-item label="车牌" prop="carNum">
                        <el-input v-model="Orderform.carNum" placeholder="请输入详细车牌号"></el-input>
                    </el-form-item>
                    <el-form-item label="区域" prop="regionId">
                        <el-select v-model="Orderform.regionId" placeholder="请选择区域">
                            <el-option v-for="item in regions" :key="item.id" :label="item.regionName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交接点" prop="parkingWaitLocation">
                        <el-input v-model="Orderform.parkingWaitLocation" placeholder="请输入车辆交接地点"></el-input>
                    </el-form-item>
                    <el-form-item label="预计到达" prop="scheduledParkingArriveTime">
                        <el-time-select v-model="Orderform.scheduledParkingArriveTime" :picker-options="{start: '06:30',step: '00:15',end: '23:00'}" placeholder="请选择预计到达时间">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item label="预计时长" prop="scheduledParkingTime" v-if="type == 0">
                        <el-input v-model="Orderform.scheduledParkingTime" placeholder="请输入预计停车时长" oninput="value=value.replace(/[^\d]/g,'')">
                            <template slot="append">小时</template>
                        </el-input>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="submit-btn">
            <el-button type="primary" @click="submit">发起订单</el-button>
        </el-row>

    </div>
</template>
<script>
import { pushOrder } from "../../../api/order";
import { getRegions } from "../../../api/region";
export default {
  props: ["type"],
  data() {
    return {
      labelPosition: "right",
      Orderform: {
        carNum: "",
        parkingWaitLocation: "",
        scheduledParkingArriveTime: "",
        scheduledParkingTime: "",
        regionId:''
      },
      regions:[],
      parkingOrder: {},

      rules: {
        carNum: [{ required: true, message: "车牌号不能为空", trigger: "blur" }],
        parkingWaitLocation: [
          { required: true, message: "停车交接地点不能为空", trigger: "blur" }
        ],
        scheduledParkingArriveTime: [
          { required: true, message: "预计到达时间不能为空", trigger: "blur" }
        ],
        scheduledParkingTime: [
          { required: true, message: "预计停车时长不能为空", trigger: "blur" }
        ],
        regionId:[
            { required: true, message: "区域选择不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed:{
      title(){
          return this.type == "0"?'停车订单':'取车订单'
      }
  },
  created(){
    this.getRegionsData();
  },

  methods: {
    async getRegionsData(){
      const data = await getRegions();
      console.log(data);
      this.regions = data.data;
    },
    async submit() {
      console.log(this.Orderform);
      const data = await pushOrder(this.Orderform);
      console.log(data);
      if (data.status == 201) {
        this.$message({
          message: "发布订单成功",
          type: "success"
        });

        this.$router.push("/serve");
      }
    }
  }
};
</script>
<style lang="scss">
.col-form .el-form {
  top: unset;
}
.push-order-pane {
  position: relative;
  //   height: 100%;
  p.order-title {
    font-size: 28px;
    font-weight: bold;
    margin: 80px 0 20px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 232px;
  }
  .el-select{
      width: 232px;
  }
  .submit-btn {
    padding-left: 20px;
    .el-button {
      width: 200px;
    }
  }
}
</style>

