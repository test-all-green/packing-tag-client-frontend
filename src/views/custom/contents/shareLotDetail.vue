<template>
  <div class="push-order-pane">
    <el-row type="flex" justify="center">
      <p class="order-title"></p>
    </el-row>
    <el-row align="center">
      <el-col class="col-form" :span="20" :offset="1">
        <el-form label-width="80px">
          <el-form-item label="名称: ">
            <label>{{item.parkingLotName}}</label>
          </el-form-item>
          <el-form-item label="区域: ">
            <label>{{regionName}}</label>
          </el-form-item>
          <el-form-item label="地址: ">
            <label>{{item.locationName}}</label>
          </el-form-item>
          <el-form-item label="状态: ">
            <label>{{statusMap[item.status]}}</label>
          </el-form-item>
          <el-form-item label="开始时间: ">
            <label>{{timestampToTime(item.beginTime)}}</label>
          </el-form-item>
          <el-form-item label="结束时间: ">
            <label>{{timestampToTime(item.endTime)}}</label>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="submit-btn">
      <el-button type="primary" @click="cancel">取消共享</el-button>
    </el-row>
  </div>
</template>
<script>
import { cancelPublishShareParkingLot } from "../../../api/shared";
import { getRegionById, getRegions } from "../../../api/region";
export default {
  props: ["item"],
  data() {
    return {
      regionName: "",
      statusMap:{
          1:"已发布",
          2:"使用中"
      }
    };
  },
  methods: {
    timestampToTime(cjsj) {
      console.log(cjsj);
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    async cancel() {
      console.log(this.form);
      try {
        var data = await cancelPublishShareParkingLot(this.item.id);
        if (data.status == 200) {
          this.$message({
            message: "取消共享车位成功",
            type: "success"
          });
        }
      } catch {
        this.$message({
          message: "该车位已被使用，无法取消",
          type: "error"
        });
      }

      this.$parent.addSuccess();
      this.$parent.initData();

      cancelPublishShareParkingLot(this.item.id).then({});
    }
  },
  mounted() {
    getRegionById(this.item.regionId).then(Response => {
      this.regionName = Response.data.regionName;
    });
  }
};
</script>
