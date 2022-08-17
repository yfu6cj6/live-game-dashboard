<template>
  <div>
    <div v-if="device === 'mobile'" class="mobile header-container">
      <div class="d-flex flex-wrap align-items-center header">
        <div class="display d-flex flex-wrap align-items-center">
          <div class="expand-icon-outer">
            <div class="expand-icon">
              <div class="fas yellow" @click="toggleSideBar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 63 63"
                >
                  <title>menu</title>
                  <path d="M31.53,8.15H60.06a2.71,2.71,0,0,1,2.59,1.4,2.49,2.49,0,0,1,0,2.63A2.82,2.82,0,0,1,60,13.49H3.06a2.78,2.78,0,0,1-3-2.17A2.67,2.67,0,0,1,2.82,8.16H31.53Z" />
                  <path d="M31.58,54.85H3a2.67,2.67,0,1,1,0-5.32c4.06,0,8.12,0,12.19,0H59.71a2.94,2.94,0,0,1,3,1.5,2.64,2.64,0,0,1-2.48,3.84c-4.27,0-8.54,0-12.8,0Z" />
                  <path d="M31.45,28.87c9.51,0,19,0,28.53,0a2.72,2.72,0,0,1,2.81,3.66,2.63,2.63,0,0,1-2.68,1.66H3.05A4.14,4.14,0,0,1,1.78,34a2.63,2.63,0,0,1,.88-5.12c4.15,0,8.3,0,12.45,0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="user-info">
          <div class="info-item">
            <div class="info">
              <div class="label">
                <span class="strong">Hi,</span>
              </div>
              <div class="value">
                <span class="strong">{{ account }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.path === '/home'" class="control ml-auto">
          <div class="d-flex">
            <language class="language" :lang="curLang" @changLang="language" />
          </div>
        </div>
        <div v-if="$route.path !== '/home'" class="page-name ml-auto">
          <div class="left">
            <div class="inner clickable text-center">
              <div class="fas help black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 63 63"
                  style="height: 1.16667rem; width: 1.16667rem;"
                >
                  <title>question</title>
                  <g>
                    <path d="M31.53,63A31.51,31.51,0,1,1,63,31.42,31.47,31.47,0,0,1,31.53,63Zm2.28-19c0-.42.09-.76.08-1.1a10.82,10.82,0,0,1,4.27-9,39.92,39.92,0,0,0,5.05-5,11.32,11.32,0,0,0-.75-15.49c-3.07-3.11-6.9-4.13-11.08-4.13C27,9.28,23,10.44,20,14a15,15,0,0,0-3.3,8.44l5.72.68.26-1.23c1-4.95,4-7.72,8.41-7.88,4.89-.19,9,3.55,9,8.12a6.43,6.43,0,0,1-2,4.62c-2,2-4.06,3.84-6,5.82-3.17,3.19-4,7.15-3.64,11.53Zm.61,11.09V48.89H28.18v6.25Z" />
                  </g>
                </svg>
              </div>
              <span class="strong text" :class="{'zh_ch': curLang === 'zh_cht' || curLang === 'zh_chs'}">
                {{ $t(curViewTitle) }}
              </span>
            </div>
          </div>
          <div class="left d-none">
            <div class="inner">
              <div class="fas help black text-center">
                <span class="strong text" :class="{'zh_ch': curLang === 'zh_cht' || curLang === 'zh_chs'}">
                  {{ $t(curViewTitle) }}
                </span>
              </div>
            </div>
          </div>
          <div v-show="$route.meta.showBack" class="center">
            <span class="strong line" />
          </div>
          <div v-show="$route.meta.showBack" class="right" @click.stop="goBack">
            <div class="inner clickable">
              <div class="fas clickable black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 63 63"
                  style="height: 1.66667rem; width: 1.66667rem;"
                >
                  <title>back</title>
                  <path d="M.72,18.47,6.88,12.3,7,12.19l6-6a2.45,2.45,0,0,1,3.47,0A2.55,2.55,0,0,1,17.2,7.9v9.84H43.11a20,20,0,0,1,14,5.84v0h0a19.84,19.84,0,0,1,0,28.12h0a19.9,19.9,0,0,1-14,5.84H8.92a2.46,2.46,0,0,1,0-4.91H43.11a14.83,14.83,0,0,0,10.53-4.38l.07,0h0a15,15,0,0,0,0-21.14l0,0h0a15,15,0,0,0-10.6-4.42H17.2v9.88A2.43,2.43,0,0,1,14.77,35,2.55,2.55,0,0,1,13,34.26L6.88,28.09,6.75,28l-6-6a2.44,2.44,0,0,1,0-3.46Z" />
                </svg>
              </div>
            </div>
          </div>
          <div v-show="!$route.meta.showBack" class="center" />
          <div v-show="!$route.meta.showBack" class="right">
            <div class="inner" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="pc header-container">
      <div class="d-flex align-items-center header">
        <div class="app-name">{{ $t('__projectName') }}</div>
        <div class="user-info w-100 justify-content-between mr-auto ml-1">
          <div class="info-item">
            <span class="label">
              <span class="strong">Hi, </span>
            </span>
            <span class="value">
              <span class="strong">{{ account }}</span>
            </span>
          </div>
          <div class="info-item">
            <span class="label">
              <span class="strong">{{ `${$t('__currentAgent')}: ` }}</span>
            </span>
            <span class="value">
              <span class="strong">{{ agentAccount }}</span>
            </span>
          </div>
          <div class="info-item">
            <span class="label">
              <span class="strong">{{ `${$t('__balance')}: ` }}</span>
            </span>
            <span class="value">
              <span class="strong">{{ balanceInfo }}</span>
            </span>
          </div>
        </div>
        <marquee v-if="marqueeMsg.length > 0" class="marquee">
          <div v-for="item in marqueeMsg" :key="item" class="msg">
            {{ item }}
          </div>
        </marquee>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Language from '@/components/Language'
import { getLanguage, setLanguage } from '@/lang/lang'

export default {
  components: {
    Language
  },
  data: function() {
    return {
      viewName: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'marqueeMsg',
      'agentAccount',
      'account',
      'balance',
      'agent_id',
      'device',
      'curViewTitle',
      'modPwd'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    balanceInfo() {
      return this.agent_id === 1 ? 'oo' : this.balance
    },
    curLang() {
      return getLanguage()
    }
  },
  watch: {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    language(lang) {
      setLanguage(lang)
    },
    toggleSideBar() {
      if (this.modPwd) return
      this.$store.dispatch('app/toggleSideBar')
      this.$nextTick(() => {
        if (!this.sidebar.opened) {
          this.$store.dispatch('agentManagement/closeAgentLevelSideBar')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.mobile.header-container {
  height: 4.66667rem;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 13;
  .header {
    width: 100%;
    height: $navBarHeight;
    padding: 0.41667rem;
    background-color: #262626;
    position: relative;
    .display {
      width: 3.33333rem;
      .expand-icon-outer {
        position: relative;
        width: 2.33333rem;
        height: 2.33333rem;
        margin-right: 2.5rem;
        .expand-icon {
          content: '';
          width: 6.66667rem;
          height: 6.66667rem;
          border-radius: 50%;
          background-color: #262626;
          position: absolute;
          top: -2.83333rem;
          left: -2.33333rem;
          .fas {
            position: absolute;
            top: 3.33333rem;
            left: 2.5rem;
            color: #f9c901;
            margin-right: 0;
            svg {
              vertical-align: middle;
              width: 2.45rem;
              height: 1.86667rem;
              overflow: hidden;
            }
          }
        }
      }
    }
    .user-info {
      margin-left: 0.6rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: wrap;
      -ms-flex: wrap;
      flex: wrap;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 1;
      color: #f9c901;
      cursor: pointer;
      .info-item {
        margin-right: 0.83333rem;
        line-height: 1;
        .info {
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          .label {
            letter-spacing: .11667rem;
            margin-right: 0.33333rem;
            line-height: 1;
            color: #f9c901;
          }
          .value {
            line-height: 1;
            color: #fff;
          }
        }
      }
    }
    .control {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: wrap;
      -ms-flex: wrap;
      flex: wrap;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 1;
      color: #f9c901;
      cursor: pointer;
    }
    .page-name {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      padding: 0;
      color: #000;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      overflow: hidden;
      max-width: 16.66667rem;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 95%;
        height: 0;
        border-left: 2.5rem solid transparent;
        border-top: 4.16667rem solid #f9c903;
        z-index: 1;
      }
      .left {
        z-index: 2;
        padding-left: 2.91667rem;
        .inner {
          padding: 0.83333rem 0rem 0.83333rem 0.41667rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
      }
      .right {
        z-index: 2;
        .inner {
          padding: 0.83333rem 0.83333rem 0.83333rem 0rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
      }
      .fas {
        z-index: 2;
        &.help {
          margin-right: 0.83333rem;
          margin-bottom: 2px;
        }
        path {
          fill: inherit !important;
        }
      }
      .strong {
        font-size: 1.16667rem;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        z-index: 2;
        &.text {
          font-size: .83333rem !important;
          word-break: break-word;
          &.zh_ch {
            font-size: 1rem !important;
          }
        }
        &.line {
          height: 75%;
          border-right: 0.08333rem solid #4e4e4e;
          margin-left: 0.83333rem;
          margin-right: 0.83333rem;
        }
      }
      .center {
        padding: 0.83333rem 0rem;
        height: $navBarHeight;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
  }
}

.pc.header-container {
  height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 13;
  .header {
    width: 100%;
    height: $navBarHeight;
    background-color: #262626;
    position: relative;
    .app-name {
      padding: 0.41667rem 1.25rem;
      color: #fff;
      font-size: 1.2rem;
      width: 245px;
    }
    .user-info {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      max-width: 600px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 1;
      color: #f9c901;
      .info-item {
        line-height: 1;
        .label {
          letter-spacing: .11667rem;
          margin-right: 0.33333rem;
          line-height: 1;
          color: #f9c901;
        }
        .value {
          line-height: 1;
          color: #fff;
        }
      }
    }
    .marquee {
      color: #fff;
      max-width: 10%;
    }
  }
}
</style>
