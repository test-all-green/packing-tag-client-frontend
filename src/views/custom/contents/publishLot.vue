<template>
  <div class="push-order-pane">
    <el-row type="flex" justify="center">
      <p class="order-title"></p>
    </el-row>
    <el-row align="center">
      <el-col class="col-form" :span="20" :offset="1">
        <el-form label-width="80px" :model="form">
          <el-form-item label="名称: ">
            <label readonly="readonly">{{item.parkingLotName}}</label>
          </el-form-item>
          <el-form-item label="区域: ">
            <label readonly="readonly">{{regionName}}</label>
          </el-form-item>
          <el-form-item label="地址: ">
            <label readonly="readonly">{{item.locationName}}</label>
          </el-form-item>
          <el-form-item label="开始时间: ">
            <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择共享开始时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间: ">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择共享结束时间"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="submit-btn">
      <el-button type="primary" @click="submit">发布</el-button>
    </el-row>
  </div>
</template>
<script>
import { publishShareParkingLot } from "../../../api/shared";
import { getRegionById } from "../../../api/region";
import moment from "moment";
export default {
  props: ["item"],
  data() {
    return {
      labelPosition: "right",
      form: {
        id: this.item.id,
        beginTime: "",
        endTime: ""
      },
      region: {},
      regionName:""
    };
  },
  created() {
    
    // var regionById = getRegionById(this.item.regionId);
    // this.region = regionById.data;
    // console.log(this.region);
  },
  methods: {
    async submit() {
      this.form.beginTime = this.form.beginTime.getTime();
      console.log(this.form.beginTime);
      this.form.endTime = new Date(this.form.endTime).getTime();
      const data = await publishShareParkingLot(this.form);
      console.log(data);
      if (data.status == 200) {
        this.$message({
          message: "发布共享车位成功",
          type: "success"
        });
        this.$parent.addSuccess();
        this.$parent.initData();
      }
    }
  },
  mounted() {
    getRegionById(this.item.regionId).then(Response => {
      this.regionName = Response.data.regionName;
    });
  },
};
</script>
