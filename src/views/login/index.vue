<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">

      <div class="logo" />

      <div class="title">{{ $t('__projectName') }}</div>

      <el-form-item prop="account" :class="{'validateNone': loginFormValidate.account === 0, 'validateSuccess': loginFormValidate.account === 1, 'validateError': loginFormValidate.account === 2}">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          name="account"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password" :class="{'validateNone': loginFormValidate.password === 0, 'validateSuccess': loginFormValidate.password === 1, 'validateError': loginFormValidate.password === 2}">
        <span class="svg-container">
          <svg-icon icon-class="key" />
        </span>
        <el-input
          :key="curPasswordType"
          ref="password"
          v-model="loginForm.password"
          :type="curPasswordType === passwordType.hidePassword ? `password` : `text`"
          name="password"
        />
        <span class="show-pwd" :class="{'isActive': curPasswordType === passwordType.showPassword}" @click="showPwd">
          <svg-icon :icon-class="curPasswordType === passwordType.hidePassword ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="captcha" :class="{'validateNone': loginFormValidate.captcha === 0, 'validateSuccess': loginFormValidate.captcha === 1, 'validateError': loginFormValidate.captcha === 2}">
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          name="captcha"
          type="text"
          class="captcha"
          @keyup.enter.native="handleLogin"
        />
        <img :src="captchaImg" @click="refreshCaptcha()">
        <i class="el-icon-refresh-right refresh" @click="refreshCaptcha()" />
      </el-form-item>

      <el-button :loading="loading" type="primary" class="bg-yellow" @click.native.prevent="handleLogin">{{ $t('__login') }}</el-button>

      <div>
        <div v-if="device === 'desktop'" class="footer">
          <div class="device-icon">
            <svg-icon icon-class="computer" />
          </div>
          <div class="user-info">
            <div class="version">
              <div class="info">FV: 0.0.1</div>
              <div class="info">BR: {{ browserName }}</div>
            </div>
            <div class="version">
              <div class="info">BV: 0.0.1</div>
              <div class="info">IP: {{ clientInfo_IP }}</div>
            </div>
          </div>
        </div>
        <div v-else class="footer">
          <div class="device-icon">
            <svg-icon icon-class="phone" />
          </div>
          <div class="user-info">
            <div class="version">
              <div class="info">FV: 0.0.1</div>
              <div class="info">BV: 0.0.1</div>
            </div>
            <div class="version">
              <div class="info">BR: {{ browserName }}</div>
              <div class="info">IP: {{ clientInfo_IP }}</div>
            </div>
          </div>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import { login, generateCaptcha } from "@/api/user";
import { mapGetters } from "vuex";
import ResizeMixin from '@/mixin/ResizeHandler'
import { browserVersion, clientIP } from '@/utils/clientInfo'

export default {
  name: "Login",
  mixins: [ResizeMixin],
  data() {
    const validateAccount = (rule, value, callback) => {
      if (!value) {
        this.loginFormValidate.account = 2;
        callback(new Error(' '));
      } else {
        this.loginFormValidate.account = 1;
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        this.loginFormValidate.password = 2;
        callback(new Error(' '));
      } else {
        this.loginFormValidate.password = 1;
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (!value) {
        this.loginFormValidate.captcha = 2;
        callback(new Error(' '));
      } else {
        this.loginFormValidate.captcha = 1;
        callback();
      }
    };
    return {
      loginForm: {
        account: '',
        password: '',
        captcha: '',
        key: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateAccount }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
      },
      passwordType: Object.freeze({
        'hidePassword': 0,
        'showPassword': 1
      }),
      curPasswordType: 0,
      validateType: Object.freeze({
        'none': 0,
        'success': 1,
        'error': 2
      }),
      loginFormValidate: {
        account: 0,
        password: 0,
        captcha: 0
      },
      loading: false,
      captchaData: {},
      browserName: '',
      clientInfo_IP: ''
    };
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    captchaImg() {
      return this.captchaData.img;
    }
  },
  created() {
    this.refreshCaptcha()
    this.getClientIP()
    const nameSplit = browserVersion().split(' ')
    this.browserName = this.$stringFormat('{0} - {1}', nameSplit)
  },
  methods: {
    async getClientIP() {
      this.clientInfo_IP = await clientIP()
    },
    showPwd() {
      this.curPasswordType = this.curPasswordType === this.passwordType.hidePassword
        ? this.passwordType.showPassword : this.passwordType.hidePassword;
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    refreshCaptcha() {
      generateCaptcha().then((res) => {
        this.captchaData = res
        this.loginForm.key = this.captchaData.key
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm).then(async(res) => {
            // status = '0' 已被停權
            if (res.user.status === "0") {
              this.$message({
                message: "Login failed, the account has been suspended",
                type: "error"
              })
            } else {
              this.$message({
                message: "Login successfully",
                type: "success"
              })
              this.$store.dispatch("user/login", res)
              await this.$store.dispatch("backstageManagement/getAnnouncement")
              this.$router.push({ path: '/home' })
            }
          }).catch((err) => {
            this.captchaData = err.data.captcha
            this.loginForm.key = this.captchaData.key
            this.loginForm.captcha = ''
            this.$refs.captcha.focus()
          }).finally(() => {
            this.loading = false
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.login-container {
  background-position: center !important;
  background-size: cover !important;
  background-image: url("/static/images/logo/loginBG.jpg");
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;

  .login-form {
    width: 400px;
    max-width: calc(100vw - 40px);
    min-height: 600px;
    margin: 0 auto;

    .logo {
      width: 450px;
      max-width: 100vw;
      height: 200px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      &::before {
        position: absolute;
        content: "";
        width: 450px;
        max-width: 100%;
        height: 280px;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("/static/images/logo/logo.png");
      }
    }

    .title {
      color: $yellow;
      text-align: center;
      font-weight: 600;
      font-size: 20px;
      margin-top: 22px;
      margin-bottom: 22px;
    }

    .el-form-item {
      background-color: rgba(255, 255, 255, 0.08);
      margin-left: 1em;
      margin-right: 1em;
      box-sizing: border-box;

      .svg-container {
        padding-left: 1em;
        color: $yellow;

        .svg-icon {
          width: 1.5em;
          height: 1.5em;
          vertical-align: middle;
        }
      }

      .el-input {
        width: calc(100% - 1em - 1.5em - 1.5em);
        font-size: 16px;

        .el-input__inner {
          border: transparent;
          background-color: transparent;
          color: #fff;
          padding: 0 1em;
        }
      }

      .show-pwd {
        color: #6e6e6e;
      }

      .show-pwd.isActive {
        color: #fff;
      }

      .captcha {
        width: calc(100% - 100px - 30px);

        & ~ img {
          width: 100px;
          cursor: pointer;
          transform: translateY(25%);
        }

        & ~ i {
          color: #fff;
          cursor: pointer;
          vertical-align: middle;
          margin-left: .5em;
          box-sizing: border-box;
        }
      }
    }

    .el-button {
      width: calc(100% - 2em);
      font-size: 20px;
      margin: 0 1em;
    }

    .el-form-item.validateNone {
      border-bottom: 2px solid $yellow;
    }

    .el-form-item.validateSuccess {
      border-bottom: 2px solid #67c23a;
    }

    .el-form-item.validateError {
      border-bottom: 2px solid #f73838;
    }

    .footer {
      margin-top: 40px;
      display: flex;
      justify-content: center;

      .user-info {
        display: flex;

        .version {
          display: flex;
          flex-direction: column;
        }

        .version + .version {
          margin-left: 2em;
        }
      }

      .info {
        color: #999;
        font-size: 1em;
        text-align: left;
      }

      .device-icon {
        margin-right: 1em;

        .svg-icon {
          color: #b99e71;
          width: 2.5em;
          height: 2.5em;
        }
      }
    }

  }
}
</style>
