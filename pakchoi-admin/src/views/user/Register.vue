<template>
  <div class="register">
    <div class="content-main">
      <h1>注册</h1>
      <el-form
        :model="model"
        ref="form"
        :rules="formRules"
        class="flex-bet flex-wrap register-form"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="model.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobile">
          <el-input v-model.number="model.mobile" :maxlength="11" type="tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="model.confirmPassword" type="password" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" type="eamil" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="validateCode">
          <div class="flex-start-center w-100">
            <el-input v-model="model.validateCode" :maxlength="4" type="text" placeholder="请输入验证码"></el-input>
            <el-button
              type="text"
              class="get-code-btn"
              @click.stop="validateCode"
              :disabled="btnDisabled"
            >{{getCodeBtnText}}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button type="primary" :loading="loading" @click="submitRegister">注册</el-button>
        <div>
          <router-link to="/user/login" class="theme-color">去登录</router-link>
        </div>
      </div>
      <div class="footer">
        <span>小白菜管理平台</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getValidateCode, registerUser } from "@/api/user";
let countDown;
export default {
  name: "Register",
  data() {
    const validator = (rule, value, callback) => {
      if (value !== this.model.password) {
        callback(Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      model: {},
      getCodeBtnText: "获取验证码",

      formRules: {
        userName: [
          {
            required: true,
            pattern: /^\w{4,16}$/,
            message: "请输入4~16位的字符",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^\w{11}$/,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 16,
            message: "请输入6~16字符密码",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: validator,
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: this.rules.regexp.email,
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        validateCode: [
          {
            required: true,
            message: "请输入正确的验证码",
            trigger: "blur",
            pattern: /^\d{4}$/
          }
        ]
      },
      loading: false,
      btnDisabled: false
    };
  },
  mounted() {},
  methods: {
    async submitRegister() {
      try {
        if (!this.validateForm(this.$refs.form)) return;
        this.loading = true;
        const result = await registerUser(this.model);
        this.loading = false;
        this.clearCountDown();
        if (!this.reqMsg(result)) return;
        this.$refs.form.resetFields();
        this.$confirm("是否跳转到登录页面", "注册成功", { type: "success" })
          .then(() => {
            this.$router.push("/user/login");
          })
          .catch(() => {});
      } catch (error) {
        this.loading = false;
        this.clearCountDown();
      }
    },
    validateCode() {
      this.$refs.form.validateField("email", async err => {
        if (err != "") return;
        this.btnDisabled = true;
        const result = await getValidateCode({ email: this.model.email });
        this.btnDisabled = false;
        if (!this.reqMsg(result)) return;

        this.setOutTime();
      });
    },
    setOutTime() {
      clearInterval(countDown);
      this.btnDisabled = true;
      let time = 60;
      countDown = setInterval(() => {
        time--;
        if (time > 0) {
          this.getCodeBtnText = `${time}s后重新获取`;
        } else {
          this.clearCountDown();
        }
      }, 1000);
    },
    clearCountDown() {
      this.btnDisabled = false;
      this.getCodeBtnText = "获取验证码";
      clearInterval(countDown);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/user.scss";
.register {
  .content-main {
    width: 700px;
    .register-form {
      & > div {
        flex: 0 0 48%;
      }
    }
    .submit-btn {
      text-align: center;
      button {
        width: 240px;
      }
    }
    .get-code-btn {
      min-width: 10em;
    }
  }
}
</style>
