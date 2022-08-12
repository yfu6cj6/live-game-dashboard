<template>
  <div class="login">
    <div class="form-container el-row is-align-middle el-row--flex">
      <div class="w-100 loginContent">
        <language class="language" :lang="curLang" @changLang="language" />
        <div class="content">
          <div class="logo">
            <div class="white-label logoPic" />
          </div>
          <div class="page-name">{{ $t('__projectName') }}</div>
          <div class="form">
            <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules">
              <el-form-item prop="account" :class="{'validateSuccess': loginFormValidate.account === 1, 'validateError': loginFormValidate.account === 2}">
                <el-input
                  ref="account"
                  v-model="loginForm.account"
                  name="account"
                  type="text"
                >
                  <template slot="prefix">
                    <div class="login-input-prefix">
                      <div class="fas yellow text-yellow">
                        <svg-icon class="icon" icon-class="user" />
                      </div>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" :class="{'validateSuccess': loginFormValidate.password === 1, 'validateError': loginFormValidate.password === 2}">
                <el-input
                  :key="curPasswordType"
                  ref="password"
                  v-model="loginForm.password"
                  class="custom-psw"
                  :type="curPasswordType === passwordType.hidePassword ? `password`: `text`"
                  name="password"
                  @keyup.enter.native="handleLogin"
                >
                  <template slot="prefix">
                    <div class="login-input-prefix">
                      <div class="fas yellow text-yellow">
                        <svg-icon class="icon" icon-class="key" />
                      </div>
                    </div>
                  </template>
                  <template slot="suffix">
                    <i class="el-input__icon el-icon-view clickable" :class="{'text-line-gray-deep': curPasswordType === passwordType.hidePassword, 'text-white': curPasswordType === passwordType.showPassword}" @click="showPwd" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item class="submit mb-0">
                <div class="flex-wrap el-row is-align-middle el-row--flex">
                  <el-button :loading="loading" class="bg-yellow w-100" @click.native.prevent="handleLogin">{{ $t('__login') }}</el-button>
                </div>
              </el-form-item>
              <div class="form-alert" :class="{'d-none': loginTip === ''}">
                <div class="el-alert el-alert--warning is-light">
                  <i class="el-alert__icon el-icon-warning" />
                  <div class="el-alert__content">
                    <span class="el-alert__title">{{ loginTip }}</span>
                  </div>
                </div>
              </div>
              <div class="menu-footer">
                <div class="d-flex">
                  <div class="w-25 device text-gold-light">
                    <svg-icon v-if="device==='mobile'" class="icon-device" icon-class="phone" style="height: 3.33333rem; width: 3.33333rem;" />
                    <svg-icon v-if="device==='desktop'" class="icon-desktop" icon-class="computer" style="height: 3.33333rem; width: 3.33333rem;" />
                  </div>
                  <div class="w-75">
                    <div class="d-flex">
                      <div class="w-35">
                        <div class="menu-item w-100 text-left">FV: 0.0.1</div>
                      </div>
                      <div class="w-65">
                        <div class="menu-item w-100 text-left">BV: 0.0.1</div>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="menu-item w-100 text-left">BR: {{ browserName }}</div>
                    </div>
                    <div class="d-flex">
                      <div class="menu-item w-100 text-left">IP: {{ clientInfo_IP }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, generateCaptcha } from "@/api/user";
import { mapGetters } from "vuex";
import ResizeMixin from '@/mixin/ResizeHandler'
import { browserVersion, clientIP } from '@/utils/clientInfo'
import Language from '@/components/Language'
import { getLanguage, setLanguage } from '@/lang/lang'

export default {
  name: "Login",
  components: { Language },
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
        password: ''
        // captcha: '',
        // key: ''
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
      'device',
      'loginTip'
    ]),
    captchaImg() {
      return this.captchaData.img;
    },
    curLang() {
      return getLanguage()
    }
  },
  created() {
    // this.refreshCaptcha()
    this.getClientIP()
    const nameSplit = browserVersion().split(' ')
    this.browserName = this.$stringFormat('{0} - {1}', nameSplit)
  },
  methods: {
    language(lang) {
      setLanguage(lang)
    },
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
              this.$store.dispatch("login/setLoginTip", '')
              this.$store.dispatch("user/login", res)
              await this.$store.dispatch("backstageManagement/getAnnouncement")
              this.$router.push({ path: '/home' })
            }
          }).catch(() => {
            // this.captchaData = err.data.captcha
            // this.loginForm.key = this.captchaData.key
            // this.loginForm.captcha = ''
            // this.$refs.captcha.focus()
            this.$refs.password.focus()
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
#app .login {
  background-position: center;
  background-size: contain;
  position: relative;
  .form-container {
    max-width: 31.25rem;
    padding: 0 2.5rem 2.5rem 2.5rem;
    height: 90vh;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    .loginContent {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: auto;
      min-height: 100%;
    }
    .content {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      width: 100%;
      max-width: 31.25rem;
      margin: auto;
      .logo {
        margin-top: 0.83333rem;
        margin-bottom: 10px;
        width: 100%;
        min-height: 50px;
        .white-label {
          width: 240px;
          height: 150px;
        }
      }
      .page-name {
        font-size: 1.66667rem;
        text-align: center;
        font-weight: bold;
        margin-top: 0.83333rem;
        margin-bottom: 1.25rem;
        color: #b99e71;
      }
    }
    .white-label {
      width: 100%;
      height: 10rem;
      margin: 0.83333rem auto 0rem auto;
      background-position: top;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .language {
    position: absolute;
    top: 0.41667rem;
    right: 0.83333rem;
    z-index: 2;
    transform: scale(1.5);
  }
  .login-form {
    max-width: 26.66667rem;
    font-size: 1rem;
    .el-form-item {
      margin-bottom: 1.66667rem;
      .el-input {
        border-bottom: 0.16667rem solid #f9c901;
        .el-input__inner {
          border: 0;
          background-color: rgba(255,255,255,0.08) !important;
          padding: 0.83333rem 3.33333rem 0.83333rem 4.16667rem;
          height: 3.95833rem;
          line-height: 3.95833rem;
          font-size: 1.33333rem;
          color: #fff;
          -webkit-text-fill-color: #fff;
          -webkit-transition: background-color 5000s ease-in-out 0s;
          transition: background-color 5000s ease-in-out 0s;
        }
      }
      .el-button {
        font-size: 1.33333rem;
        margin-top: 0.83333rem;
        margin-bottom: 0.83333rem;
        margin-left: 0;
        font-weight: bold;
      }
      &.validateSuccess {
        .el-input {
          border-bottom: 0.16667rem solid #67c23a;
        }
      }
      &.validateError {
        .el-input {
          border-bottom: 0.16667rem solid #f73838;
        }
      }
    }
    .el-input__inner {
      line-height: 1 !important;
    }
    .login-input-prefix {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 100%;
      margin-left: 0.83333rem;
      .fas svg {
        width: 2rem !important;
        height: 2rem !important;
      }
    }
  }
  .custom-psw {
    .el-icon-view {
      display: inline-block;
    }
  }
  .form-alert {
    .el-alert {
      padding: 0 !important;
    }
    .el-alert__title {
      font-size: 1.16667rem;
    }
  }
  .menu-footer {
    margin-top: 0.83333rem;
    padding-bottom: 0.83333rem;
    padding-left: 0;
    width: 100%;
    .device {
      text-align: center;
    }
    .menu-item {
      margin-bottom: 0.41667rem;
      font-size: .91667rem;
      color: #999;
    }
  }
}

.logoPic {
  background-image: url("/static/images/logo/logo.png");
}
</style>
