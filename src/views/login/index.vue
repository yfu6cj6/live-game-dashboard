<template>
  <div class="login">
    <template v-if="device === 'mobile'">
      <div class="form-container el-row is-align-middle el-row--flex">
        <div class="w-100 loginContent">
          <div class="language">
            <div class="language-container" @click.stop="onClick">
              <div class="language-switch" :class="{'dropdown': dropdown}">
                <div class="current-language">
                  <div
                    v-for="(item, index) in langList"
                    :key="index"
                    class="language-item"
                    @click="changLang(item.key, index)"
                  >
                    <div class="fas" :class="{'display_none': index !== curLangIndex}">
                      <img
                        :src="require(`@/assets/lang/${item.key}.png`)"
                        :title="item.title"
                      >
                    </div>
                  </div>
                </div>
                <div v-if="dropdown" class="language-list">
                  <div
                    v-for="(item, index) in langList"
                    :key="index"
                    class="language-item"
                    :class="{'display_none': index === curLangIndex}"
                    @click="changLang(item.key, index)"
                  >
                    <div class="fas">
                      <img
                        :src="require(`@/assets/lang/${item.key}.png`)"
                        :title="item.title"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      <svg-icon class="icon-device" icon-class="phone" style="height: 3.33333rem; width: 3.33333rem;" />
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
    </template>
    <template v-else>
      <div class="overlay-scroll-wrap scrolling" style="height: 100vh; max-width: 100vw;">
        <div class="scroll-inner on os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-scrollbar-vertical-hidden os-host-transition">
          <div class="os-resize-observer-host">
            <div class="os-resize-observer observed" style="left: 0px; right: auto;" />
          </div>
          <div class="os-size-auto-observer" style="height: calc(100% + 1px); float: left;">
            <div class="os-resize-observer observed" />
          </div>
          <div class="os-padding">
            <div class="os-viewport os-viewport-native-scrollbars-invisible" style="right: 0px; bottom: 0px;">
              <div class="os-content" style="padding: 0px; height: 100%; width: 100%;">
                <div class="scroll-view">
                  <div class="form-container el-row is-align-middle el-row--flex">
                    <div class="w-100 loginContent">
                      <div class="content">
                        <div class="language">
                          <div class="language-container" @click.stop="onClick">
                            <div class="language-switch" :class="{'dropdown': dropdown}">
                              <div class="current-language">
                                <div
                                  v-for="(item, index) in langList"
                                  :key="index"
                                  class="language-item"
                                  @click="changLang(item.key, index)"
                                >
                                  <div class="fas" :class="{'display_none': index !== curLangIndex}">
                                    <img
                                      :src="require(`@/assets/lang/${item.key}.png`)"
                                      :title="item.title"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div v-if="dropdown" class="language-list">
                                <div
                                  v-for="(item, index) in langList"
                                  :key="index"
                                  class="language-item"
                                  :class="{'display_none': index === curLangIndex}"
                                  @click="changLang(item.key, index)"
                                >
                                  <div class="fas">
                                    <img
                                      :src="require(`@/assets/lang/${item.key}.png`)"
                                      :title="item.title"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-100" style="height: 10px;" />
                        <div class="logo">
                          <div class="white-label" style="background-image: url(&quot;/static/images/logo/logo.png&quot;);" />
                        </div>
                        <div class="page-name pb-2">{{ $t('__projectName') }}</div>
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
                                  <svg-icon class="icon-desktop" icon-class="computer" style="height: 2.5rem; width: 2.5rem;" />
                                </div>
                                <div class="w-75">
                                  <div class="d-flex">
                                    <div class="w-35">
                                      <div class="menu-item w-100 text-left">
                                        FV: 0.0.1
                                      </div>
                                      <div class="menu-item w-100 text-left">
                                        BV: 0.0.1
                                      </div>
                                    </div>
                                    <div class="w-65">
                                      <div class="menu-item w-100 text-left">
                                        BR: {{ browserName }}
                                      </div>
                                      <div class="menu-item w-100 text-left">
                                        IP: {{ clientInfo_IP }}
                                      </div>
                                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { login, generateCaptcha } from "@/api/user";
import { mapGetters } from "vuex";
import ResizeMixin from '@/mixin/ResizeHandler'
import { browserVersion, clientIP } from '@/utils/clientInfo'
import { getLanguage, setLanguage } from '@/lang/lang'

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
    const langList = [{
      key: 'zh_cht',
      title: this.$t('__traditionalChinese')
    },
    {
      key: 'zh_chs',
      title: this.$t('__simplifiedChinese')
    }]
    let langIndex = -1
    const curLang = getLanguage()
    for (let i = 0, max = langList.length; i < max; i++) {
      if (langList[i].key === curLang) {
        langIndex = i
        break
      }
    }
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
      clientInfo_IP: '',
      langList: langList,
      curLangIndex: langIndex,
      dropdown: false
    };
  },
  computed: {
    ...mapGetters([
      'device',
      'loginTip'
    ]),
    captchaImg() {
      return this.captchaData.img;
    }
  },
  created() {
    // this.refreshCaptcha()
    this.getClientIP()
    const nameSplit = browserVersion().split(' ')
    this.browserName = this.$stringFormat('{0} - {1}', nameSplit)
  },
  methods: {
    changLang(lang, index) {
      this.curLangIndex = index
      setLanguage(lang)
    },
    onClick() {
      this.dropdown = !this.dropdown
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
#app.mobile .login {
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
    top: 0.5rem;
    right: 0.9rem;
    .language-container {
      .language-switch {
        position: relative;
        padding: 0.66667rem;
        &.dropdown {
          background: rgba(155,155,155,0.4);
        }
        .current-language {
          cursor: pointer;
        }
        .language-item {
          .fas {
            height: 3.33333rem;
            width: 3.33333rem;
            position: relative;
            img {
              vertical-align: middle;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              overflow: hidden;
              width: 100%;
              height: 4rem;
              width: 4rem;
            }
          }
        }
        .language-list {
          display: block;
          -webkit-animation-name: fadeIn;
          animation-name: fadeIn;
          -webkit-animation-duration: 0.5s;
          animation-duration: 0.5s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          .language-item {
            border-top: 0.08333rem solid #f9c901;
            margin-top: 0.41667rem;
            padding-top: 0.5rem;
            cursor: pointer;
          }
        }
      }
      .display_none {
        display: none;
      }
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
  }
}

.logoPic {
  background-image: url("/static/images/logo/logo.png");
}

#app.pc .login {
  .form-container {
    max-width: 100%;
    padding: 0 2.5rem;
    height: 100vh;
    margin: 0 auto;
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
    .loginContent {
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
      margin-left: auto;
      margin-right: auto;
      padding-bottom: auto;
      height: 100vh;
      .content {
        width: 100%;
        height: auto;
        max-width: 320px;
        min-width: 290px;
        margin: auto;
        position: relative;
        .language {
          position: absolute;
          top: 0.41667rem;
          right: 0.83333rem;
          z-index: 2;
          .language-container {
            .language-switch {
              position: relative;
              padding: 0.66667rem;
              &.dropdown {
                background: rgba(155,155,155,0.4);
              }
              .current-language {
                cursor: pointer;
              }
              .language-item {
                .fas {
                  height: 3.33333rem;
                  width: 3.33333rem;
                  position: relative;
                  img {
                    vertical-align: middle;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    width: 100%;
                    height: 4rem;
                    width: 4rem;
                  }
                }
              }
              .language-list {
                display: block;
                -webkit-animation-name: fadeIn;
                animation-name: fadeIn;
                -webkit-animation-duration: 0.5s;
                animation-duration: 0.5s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                .language-item {
                  border-top: 0.08333rem solid #f9c901;
                  margin-top: 0.41667rem;
                  padding-top: 0.5rem;
                  cursor: pointer;
                }
              }
            }
            .display_none {
              display: none;
            }
          }
        }
        .logo {
          margin-top: auto;
          margin-bottom: 10px;
          height: 200px;
          .white-label {
            width: 320px;
            height: 200px;
            margin: 0.83333rem auto;
            background-position: top;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        .page-name {
          font-size: 1.66667rem;
          text-align: center;
          font-weight: bold;
          margin-bottom: 1.41667rem;
          color: #b99e71;
        }
        .form {
          width: 100%;
          margin-bottom: auto;
          margin-top: 10px;
          .menu-footer {
            padding-left: 0px;
            padding-right: 0px;
            margin-top: 70px;
          }
        }
      }
    }
  }
}

#app .login {
  .form {
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
          &.custom-psw {
            &.el-input {
              height: auto;
            }
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
    .menu-footer {
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
}
</style>
