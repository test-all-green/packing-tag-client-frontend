<template>
  <div class="formBody">
    <img src="@/assets/parking_tag.png" style="" width="350px"  />
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
          <el-form-item prop="loginMethod">
            <el-input
              type="text"
              v-model="account.loginMethod"
              auto-complete="off"
              placeholder="账号"
            ><i slot="prefix" class="el-icon-user-solid"></i></el-input>
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
              show-password
            ><i slot="prefix" class="el-icon-lock"></i></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row class="userType">
        <el-radio v-model="userTypeRadio" label="1">用户</el-radio>
        <el-radio v-model="userTypeRadio" label="2">职员</el-radio>
      </el-row> -->

      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->

      <el-row>
        <el-col :span="18" :offset="3">
          <el-form-item>
            <el-button type="primary" style="width:100%; radius: 5px;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="4" :offset="8">
        <span class="register" @click="signinAccount">注册</span>
      </el-col>
      <el-col :span="4">
        <span class="findAccount">找回密码</span>
      </el-col>
    </el-row>
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
      userTypeRadio: "1",
      logining: false,
      account: {
        loginMethod: "",
        staffPassword: ""
      },
      rules: {
        loginMethod: [
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
    signinAccount() {
      console.log("....signin");
      this.$router.push({ path: "/signinAccount" });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.account, this.userTypeRadio)
            .then(response => {
              const data = response.data;
              if (data.token !== undefined) {
                localStorage.setItem("access-token", data.token);
                if (this.userTypeRadio == 1) {
                  this.$router.push({ path: "/custom/serve" });
                } else if (this.userTypeRadio == 2) {
                  this.$router.push({ path: "/parkingBoy/serve-pkb" });
                }
              }
              if (data.message) {
                Message({
                  message: data.message || "error",
                  type: "error",
                  duration: 3 * 1000
                });
              }

              console.log("response....", response);
            })
            .catch(error => {
              // console.log(error.response.data);
              // Message({
              //   message: error.response.data || "error",
              //   type: "error",
              //   duration: 3 * 1000
              // });
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
  height: 667px;
  background-color: #dcdcdc;
  text-align: center;
}
.formBody .el-form {
  top: unset;
}
.formBody .el-row span.register,
span.findAccount {
  font-size: 13px;
}

.userType {
  padding-bottom: 10px;
}
</style>