<template>
  <div class="push-order-pane">
    <el-row type="flex" justify="center">
      <p class="order-title"></p>
    </el-row>
    <!-- <el-row align="center">
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
    </el-row>-->
    <van-cell title="名称" v-model="item.parkingLotName" size="large" />
    <van-cell title="区域" v-model="regionName" value="内容" size="large" />
    <van-cell title="地址" v-model="item.locationName" value="内容" size="large" />
    <van-cell title="状态" v-model="statusMap[item.status]" value="内容" size="large" />
    <van-cell title="开始时间" v-model="beginTime" value="内容" size="large" />
    <van-cell title="结束时间" v-model="endTime" size="large" />
    <!-- <el-row type="flex" justify="center" class="submit-btn">
      <el-button type="primary" @click="cancel">取消共享</el-button>
    </el-row> -->
    <el-footer>
        <el-col :span="4" :offset="8">
          <el-button type="primary" @click="addSharedLot">取消共享</el-button>
        </el-col>
      </el-footer>
  </div>
</template>
<script>
import { cancelPublishShareParkingLot } from "../../../api/shared";
import { getRegionById, getRegions } from "../../../api/region";
import moment from "moment";
export default {
  props: ["item"],
  data() {
    return {
      regionName: "",
      statusMap: {
        1: "已发布",
        2: "使用中"
      },
      beginTime: this.dateFormatToString(this.item.beginTime),
      endTime: this.dateFormatToString(this.item.endTime)
    };
  },
  methods: {
    dateFormatToString(val) {
      return moment(val).format("YYYY年MM月DD日HH:mm:ss");
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
