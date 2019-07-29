<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="车牌">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="停车取车点">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="停车预计到达时间">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
  <el-form-item label="预计停车时长">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      parkingOrder: {}
    };
  }
};
</script>
