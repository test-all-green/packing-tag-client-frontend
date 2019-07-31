<template>
  <div class="push-order-pane">
    <el-row type="flex" justify="center">
      <p class="order-title"></p>
    </el-row>
    <el-row align="center">
      <el-col class="col-form" :span="20" :offset="1">
        <el-form label-width="80px" :model="form" :rules="rules">
          <el-form-item label="名称" prop="parkingLotName">
            <el-input v-model="form.parkingLotName" placeholder="请输入车位的名称"></el-input>
          </el-form-item>
          <el-form-item label="区域" label-width="80px" prop="regionId">
            <el-select v-model="form.regionId" placeholder="请选择区域">
              <el-option
                v-for="item in regions"
                :key="item.id"
                :label="item.regionName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地址" label-width="80px" prop="locationId">
            <el-select v-model="form.locationId" placeholder="请选择地址">
              <el-option
                v-for="item in locationFilter"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间: ">
            <el-date-picker
              v-model="form.beginTime"
              type="datetime"
              placeholder="选择共享开始时间"
              prop="beginTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间: ">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择共享结束时间"
              prop="endTime"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="submit-btn">
      <mt-button class="Btn" type="primary" size="normal" @click="submit">发布</mt-button>
      <mt-button class="Btn" type="primary" size="normal" @click="submit">删除</mt-button>
    </el-row>
  </div>
</template>
<script>
import { publishShareParkingLot } from "../../../api/shared";
import { getRegionById, getRegions } from "../../../api/region";
import { getLocations } from "../../../api/location";
import moment from "moment";
export default {
  props: ["item"],
  data() {
    return {
      labelPosition: "right",
      form: {
        id: this.item.id,
        regionId: this.item.regionId,
        locationId: this.item.locationId,
        parkingLotName: this.item.parkingLotName,
        beginTime: "",
        endTime: ""
      },
      region: {},
      regionName: "",
      regions: [],
      locations: [],
      rules: {
        locationId: [
          { required: true, message: "请输入车位详细地址", trigger: "blur" }
        ],
        parkingLotName: [
          { required: true, message: "请输入车位的名称", trigger: "blur" }
        ],
        regionId: [{ required: true, message: "区域不能为空", trigger: "blur" }]
      }
    };
  },
  async mounted() {
    let regionData = await getRegions();
    this.regions = regionData.data;
    let locationData = await getLocations();
    this.locations = locationData.data;

    getRegionById(this.item.regionId).then(Response => {
      this.regionName = Response.data.regionName;
    });
  },
  computed: {
    locationFilter() {
      let a = this.locations.filter(
        location => location.regionId === this.form.regionId
      );
      //   if(a){
      //       console.log("first:"+this.form.locationId)
      //   }else{
      //       console.log("second:"+this.form.locationId)
      //   }
      //   debugger
      //   if (a.length === 0) {
      // this.form.locationId = "";
      //   }else{
      //       this.form.locationId=this.item.locationId
      //   }
      return a;
    }
  },
  methods: {
    async submit() {
      this.form.beginTime = new Date(this.form.beginTime).getTime();
      this.form.endTime = new Date(this.form.endTime).getTime();
      if (
        !this.form.parkingLotName ||
        !this.form.locationId ||
        !this.form.regionId ||
        !this.form.beginTime ||
        !this.form.endTime
      ){
        this.$message({
          message: "输入信息不完整，请重新输入",
          type: "error"
        });
        return;
      }
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
  }
};
</script>
<style>
.Btn{
  margin: 20px
}
</style>
