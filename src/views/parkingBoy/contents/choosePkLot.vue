<template>
    <div class="choose-pklot-pane">
        <div class="back">
            <i class="el-icon-back" @click="$router.go(-1)"></i>
        </div>
        <van-collapse v-model="activeCollapse" accordion>
            <van-collapse-item title="停车场" name="1">
                <div class="lot-choose">
                    <el-card class="box-card lot-item" v-for="item in lots" :key="item.id">
                        <div @click="chooseLot(item)">
                            <span>
                                {{item.name}}
                            </span>
                            <span class="location">
                                {{item.location}}
                            </span>
                        </div>
                    </el-card>
                </div>
            </van-collapse-item>
            <van-collapse-item title="共享车位" name="2">
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeCollapse: "",
      show: false,
      lots: [
        {
          id: 1,
          name: "停车场A",
          location: "XXXX街道"
        },
        {
          id: 2,
          name: "停车场B",
          location: "XXXX街道"
        },
        {
          id: 3,
          name: "停车场C",
          location: "XXXX街道"
        },
        {
          id: 4,
          name: "停车场D",
          location: "XXXX街道"
        },
        {
          id: 5,
          name: "停车场E",
          location: "XXXX街道"
        },
        {
          id: 6,
          name: "停车场F",
          location: "XXXX街道"
        },
        {
          id: 7,
          name: "停车场G",
          location: "XXXX街道"
        },
        {
          id: 8,
          name: "停车场H",
          location: "XXXX街道"
        },
        {
          id: 9,
          name: "停车场I",
          location: "XXXX街道"
        },
        {
          id: 10,
          name: "停车场B",
          location: "XXXX街道"
        },
        {
          id: 11,
          name: "停车场A",
          location: "XXXX街道"
        },
        {
          id: 12,
          name: "停车场B",
          location: "XXXX街道"
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {},

  methods: {
    chooseLot(item) {
      this.$dialog
        .confirm({
          title: "选择停车地点",
          message: "确认抢单，并将车停往" + item.name + "?"
        })
        .then(() => {
          console.log("yes");
        })
        .catch(() => {
          // on cancel
        });
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