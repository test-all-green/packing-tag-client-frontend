<template>
  <div class="push-order-pane">
    <el-row type="flex" justify="center">
      <p class="order-title">请填写车位信息</p>
    </el-row>
    <el-row align="center">
      <el-col class="col-form" :span="20" :offset="1">
        <el-form label-width="80px" :model="form" :rules="rules">
          <el-form-item label="地址" prop="location">
            <el-input v-model="form.location" placeholder="请输入车位详细地址"></el-input>
          </el-form-item>
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
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="submit-btn">
      <el-button type="primary" @click="submit">添加</el-button>
    </el-row>
  </div>
</template>
<script>
import { postShareParkingLot } from "../../../api/shared";
import { getRegions } from "../../../api/region";
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        location: "",
        parkingLotName: "",
        regionId: ""
      },
      regions: [],
      rules: {
        location: [
          { required: true, message: "请输入车位详细地址", trigger: "blur" }
        ],
        parkingLotName: [
          { required: true, message: "请输入车位的名称", trigger: "blur" }
        ],
        regionId: [{ required: true, message: "区域不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submit() {
      console.log(this.form);
      const data = await postShareParkingLot(this.form);
      console.log(data);
      if (data.status == 201) {
        this.$message({
          message: "添加共享车位成功",
          type: "success"
        });
        this.$parent.addSuccess();
        this.$parent.initData();
      }
    }
  },
  async mounted() {
    let regionData = await getRegions();
    this.regions = regionData.data;
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
  .submit-btn {
    padding-left: 20px;
    .el-button {
      width: 200px;
    }
  }
}
</style>
