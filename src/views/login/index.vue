<template>
  <div class="formBody">
    <img src="@/assets/logo.png" style="margin-top:40px" />
    <el-form
      ref="loginForm"
      :model="account"
      :rules="rules"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <el-row>
        <el-col :span="18" :offset="3">
          <el-form-item prop="staffName">
            <el-input type="text" v-model="account.staffName" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" :offset="3">
          <el-form-item prop="staffPassword">
            <el-input
              type="password"
              v-model="account.staffPassword"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->

      <el-row>
        <el-col :span="18" :offset="3">
          <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { MessageBox, Message } from "element-ui";
import { reject } from "q";
export default {
  data() {
    const validUsername = str => {
      return str.length > 0;
    };

    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      account: {
        staffName: "",
        staffPassword: ""
      },
      rules: {
        staffName: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        staffPassword: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ]
      },
      checked: true
    };
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.account)
            .then(response => {
              this.$router.push({ path: "/main" });
              console.log("response....", response);
            })
            .catch(error => {
              console.log(error.response.data);
              Message({
                message: error.response.data || "error",
                type: "error",
                duration: 3 * 1000
              });
            });
        }
      });
    }
  }
};
</script>

<style>
.formBody {
  font-size: 12px;
}
</style>