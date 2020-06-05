<template>
  <div class="login">
    <div class="content-main">
      <h1>小白菜</h1>
      <el-form :model="model" ref="form" class="login-form">
        <el-form-item label="用户名" prop="userName" :rules="rules.required">
          <el-input v-model="model.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.required">
          <el-input v-model="model.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="model.remember">自动登录</el-checkbox>
      </el-form>
      <div class="submit-btn">
        <el-button type="primary" :loading="loading" @click="submitLogin">登录</el-button>
        <div class="flex-bet-center">
          <router-link to="/user/register">免费注册</router-link>
          <router-link to="/change-password">忘记密码</router-link>
        </div>
      </div>
      <div class="footer">
        <span>小白菜管理平台</span>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";
import { SET_ACCOUNT_TOKEN, SET_USER_INFO } from "@/store/mutations-type";
export default {
  name: "Login",
  data() {
    return {
      model: {
        userName: "",
        password: "",
        remember: true
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    async submitLogin() {
      if (!this.validateForm(this.$refs.form)) return;
      this.loading = true;
      try {
        const result = await login(this.model);
        this.loading = false;
        if (this.reqMsg(result, false)) {
          this.$notify({
            title: "登录成功",
            message: "欢迎来到小白菜管理后台",
            type: "success"
          });
          this.$store.dispatch("setUserInfo", result.data.userInfo);
          this.$store.dispatch("setAccountToken", result.data.token);
          this.$router.push("/");
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/index.scss";
@import "@/style/user.scss";
</style>
<style lang="scss">
.login {
  .login-form {
    .el-input__inner {
      border-width: 0;
      border-bottom-width: 1px;
      border-radius: 0;
    }
  }
}
</style>