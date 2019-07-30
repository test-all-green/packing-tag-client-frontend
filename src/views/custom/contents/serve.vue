<template>
    <div class="serve">
        <div class="back">
            <i class="el-icon-back" @click="back" v-if="inputing !== 'none'"></i>
        </div>
        <div v-if="inputing === 'none'" class="serve-btn ">
            <el-row type="flex" justify="center" class="pk-btn" align="center">
                <el-button type="primary" @click="parking">停车</el-button>
            </el-row>
            <el-row type="flex" justify="center" class="ft-btn" align="center">
                <el-button type="primary" @click="fetch">取车</el-button>
            </el-row>
        </div>
        <div v-if="inputing == 'parking'">
            <parking></parking>
        </div>
        <div v-if="inputing == 'fetch'">
            <fetch></fetch>
        </div>

    </div>
</template>

<script>
import parking from "./parking";
import fetch from "./fetch";
export default {
  data() {
    return {
      inputing: "none"
    };
  },

  components: {
    parking,
    fetch
  },

  computed: {},

  mounted() {},

  created() {
    //   this.isInit(this.$route.params.init);
  },

  methods: {
    //   inInit(){
    //       if()
    //   },
    parking() {
      //如果没有进行中的订单
      this.inputing = "parking";
    },
    fetch() {
      //没有已停车的订单
      this.inputing = "fetch";
    },
    back(){
        this.inputing = "none";
    }
  },

  filters: {}
};
</script>
<style lang='scss' >
.serve {
    height:100%;
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
.serve-btn {
    padding-top:130px;
  .ft-btn {
    margin-top: 60px;
  }
  .el-button {
    height: 120px;
    width: 240px;
    border-radius: 30px;
    font-size: 32px;
    border:2px solid #333;
  }
  .can-check {
    .el-button {
      background: #bb144a;
    }
  }
}
</style>