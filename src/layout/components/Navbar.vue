<template>
  <div>
    <div v-if="device === 'mobile'" class="mobile header-container">
      <div class="d-flex flex-wrap align-items-center header">
        <div class="display d-flex flex-wrap align-items-center">
          <div class="expand-icon-outer">
            <div class="expand-icon">
              <div class="fas yellow" @click="toggleSideBar">
                <svg
                  id="圖層_1"
                  data-name="圖層 1"
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
        <div class="control ml-auto">
          <div class="d-flex">
            <language class="language" :lang="curLang" @changLang="language" />
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
      'device'
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
  methods: {
    language(lang) {
      setLanguage(lang)
    },
    toggleSideBar() {
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
    height: 3.75rem;
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
    height: 3.75rem;
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
