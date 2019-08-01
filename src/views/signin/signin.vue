<template>
  <div class="registermain">
    <mt-header title="注册" style="font-size:20px;">
      <router-link to="/login" slot="left">
        <mt-button icon="back" style="font-size: 14px;">返回</mt-button>
      </router-link>
    </mt-header>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item
            label="姓名"
            prop="userName"
            label-width="80px"
            :rules="[
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ]"
          >
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item label="邮箱" prop="email" label-width="80px">
            <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item label="手机" prop="phone" label-width="80px">
            <el-input type="text" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item label="密码" prop="userPassword" label-width="80px">
            <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off" placeholder="请输入您的密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item label="确认密码" prop="checkPassword" label-width="80px">
            <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <mt-button type="danger">danger</mt-button> -->
      <el-row>
        <el-form-item class="submitBtn">
          <el-col :span="8" :offset="5">
            <el-button type="primary" @click="submitForm('ruleForm')" style="width:80%">提交</el-button>
          </el-col>
          <el-col :span="9" :offset="0">
            <el-button @click="resetForm('ruleForm')" style="width:80%">重置</el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- <mt-header fixed title="固定在顶部"></mt-header>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>-->
  </div>
</template>

<script>
import { signinAccount } from "@/api/login.js";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      );
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
      if (value === "") {
        callback(new Error("请输入电话"));
      } else if (!phoneReg.test(value)) {
        callback(new Error("手机格式不正确"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        userPassword: "",
        checkPassword: "",
        email: "",
        phone: ""
      },
      rules: {
        userPassword: [
          { validator: validatePassword, trigger: "blur", required: true }
        ],
        checkPassword: [
          { validator: validateCheckPassword, trigger: "blur", required: true }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur", required: true }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          signinAccount(this.ruleForm).then(response => {
            let data = response.data;
            console.log(data);
            if (data.code == 200) {
              this.$notify({
                title: "成功",
                message: "注册成功，请登录",
                type: "success"
              });
              this.$router.push({ path: "/login" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.registermain {
  background-color: #dcdcdc;
  height: 667px;
}

.mint-header {
  height: 50px;
}

.el-form {
  position: relative;
  top: 80px;
}

.el-form .el-row .submitBtn .el-form-item__content {
  margin-left: 0px !important;
}
</style>