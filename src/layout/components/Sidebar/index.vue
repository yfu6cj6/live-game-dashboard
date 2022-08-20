<template>
  <div>
    <template v-if="device === 'mobile'">
      <div class="mobile sidebar-container" :class="{'open': isOpened}">
        <div class="search-bar-box">
          <div class="select-type">
            <button
              class="el-button el-button--default"
              :class="{
                'bg-yellow': curSearchIndex === searchEnum.agent,
                'bg-black': curSearchIndex !== searchEnum.agent}"
              @click.stop="setSearchEnum(searchEnum.agent)"
            >
              {{ $t('__agent') }}
            </button>
            <button
              class="el-button el-button--default"
              :class="{
                'bg-yellow': curSearchIndex === searchEnum.member,
                'bg-black': curSearchIndex !== searchEnum.member}"
              @click.stop="setSearchEnum(searchEnum.member)"
            >
              {{ $t('__member') }}
            </button>
          </div>
          <form>
            <div class="agentSearchBar nav-search-bar">
              <div class="flex-wrap filter-wrap el-row el-row--flex">
                <div class="filter-item search">
                  <form>
                    <div class="comp d-flex search-filter">
                      <input v-model="searchContent" class="el-input">
                    </div>
                  </form>
                </div>
                <div class="filter-item button">
                  <button
                    type="button"
                    class="el-button el-button--default"
                    style="padding: 0px 8px !important; font-size: 10px;"
                    @click.stop="searchData"
                  >
                    <span>
                      <div class="black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 63 63"
                        >
                          <title>search</title>
                          <path d="M40.76,47.93c-10.66,6.6-22.62,5.25-31-1.27A26.27,26.27,0,0,1,.65,19.49,26.58,26.58,0,0,1,22.55.23,26.27,26.27,0,0,1,52.11,22.74a24.08,24.08,0,0,1-3,15.91c-1,1.62-.72,2.47.58,3.71,4,3.83,8,7.8,11.86,11.78,3,3.07,1.85,7.45-2.23,8.66-2.15.64-3.81-.31-5.28-1.77l-12.3-12.2C41.43,48.54,41.13,48.28,40.76,47.93Zm1.35-21.79A16.17,16.17,0,0,0,26,10.11,16.33,16.33,0,0,0,9.93,26.18a16.33,16.33,0,0,0,16.14,16A16.16,16.16,0,0,0,42.11,26.14Z" />
                        </svg>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
              <div style="display: none;">
                <div class="fadeOutUp pp notice animated">
                  <div class="scroll-wrap float">
                    <div id="scroll-inner" class="scroll-inner off">
                      <div class="scroll-view" style="display: block; position: static; max-height: 50vh;" />
                    </div>
                  </div>
                  <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
                    <button type="button" class="el-button bg-gray common-button w-50 el-button--primary">
                      <span>{{ $t('__close') }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <el-menu
          class="mainMenu el-menu-vertical"
          :default-active="activeMenu"
          :collapse="!isOpened"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
        <div v-if="isOpened" class="footer">
          <div>FV: 0.0.1</div>
          <div>BV: 0.0.1</div>
          <div>BR: {{ browserName }}</div>
          <div>IP: {{ clientInfo_IP }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="pc sidebar-container" :class="{'open': isOpened}">
        <div class="option">
          <div class="small-option">
            <div class="small-item">
              <logout v-if="isOpened" @toggleClick="logout" />
            </div>
            <div class="small-item">
              <modPassword v-if="isOpened" @toggleClick="modPassword" />
            </div>
            <div class="small-item">
              <announcement v-if="isOpened" @toggleClick="announcement" />
            </div>
            <div class="small-item">
              <div class="language">
                <language v-if="isOpened" :lang="curLang" @changLang="language" />
              </div>
            </div>
            <div class="small-item hamburger">
              <hamburger :is-active="isOpened" @toggleClick="toggleSideBar" />
            </div>
          </div>
        </div>
        <el-menu
          class="mainMenu"
          :default-active="activeMenu"
          :collapse="!isOpened"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
        <div v-if="isOpened" class="footer">
          <div class="version">
            <div>FV: 0.0.1</div>
            <div>BV: 0.0.1</div>
          </div>
          <div>BR: {{ browserName }}</div>
          <div>IP: {{ clientInfo_IP }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Logout from '@/components/Logout'
import ModPassword from '@/components/ModPassword'
import Announcement from '@/components/Announcement'
import Language from '@/components/Language'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { browserVersion, clientIP } from '@/utils/clientInfo'
import { getLanguage, setLanguage } from '@/lang/lang'

export default {
  components: { SidebarItem, Logout, ModPassword, Announcement, Language, Hamburger },
  data() {
    return {
      searchEnum: Object.freeze({
        'agent': 0,
        'member': 1
      }),
      browserName: '',
      clientInfo_IP: '',
      curSearchIndex: 0,
      searchContent: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'device',
      'modPwd',
      'agent_id'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isOpened() {
      return Boolean(this.sidebar.opened)
    },
    curLang() {
      return getLanguage()
    }
  },
  created() {
    this.getClientIP()
    const nameSplit = browserVersion().split(' ')
    this.browserName = this.$stringFormat('{0} - {1}', nameSplit)
  },
  methods: {
    searchData() {
      switch (this.curSearchIndex) {
        case this.searchEnum.agent: {
          this.$store.dispatch('agentManagement/setAgentSearch', ['agent', this.searchContent])
          break
        }
        case this.searchEnum.member: {
          this.$store.dispatch('agentManagement/setAgentSearch', ['member', this.searchContent])
          break
        }
      }
      this.$router.push({ path: `/agentManagement/agentManagement/${this.agent_id}` })
      this.$store.dispatch('app/toggleSideBar')
    },
    setSearchEnum(index) {
      this.curSearchIndex = index
    },
    async getClientIP() {
      this.clientInfo_IP = await clientIP()
    },
    logout() {
      this.$router.push({ path: '/logout' })
    },
    modPassword() {
      this.$router.push({ path: '/passwordReset/modPassword' })
    },
    announcement() {
      this.$router.push({ path: '/home' })
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

<style lang="scss">
@import "~@/styles/variables.scss";

#app .mobile.sidebar-container {
  display: flex;
  flex-direction: column;
  width: $sideBarWidth;
  height: 100%;
  background-color: #000;
  transform: translateX(-(20.83333rem + 1));
  border-right: 1px solid $yellow;
  overflow-x: hidden;
  overflow-y: auto;
  &.open {
    transition: transform .5s;
    transform: translateX(0);
  }
  .search-bar-box {
    padding-top: 2.5rem;
    padding-bottom: 0.83333rem;
    position: relative;
    &:after {
      height: 0px;
      border-bottom: 1px solid #444;
      content: '';
      position: absolute;
      width: calc(100% - 20px);
      left: 0.83333rem;
      bottom: 1px;
    }
    .select-type {
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding-left: 5px;
      margin-bottom: -4px;
      .el-button {
        padding: 0;
        width: 6.4rem;
        line-height: 1;
        height: 2.4rem;
        border-radius: 0.3rem 0.3rem 0 0;
        margin-left: 0;
        font-size: 1.16667rem;
        &.bg-black {
          color: #fff;
          background: #000;
          border: 0.08333rem solid #000;
        }
      }
    }
    .agentSearchBar {
      padding: 0.83333rem;
      background-color: #000;
      width: calc(100% - 10px);
      padding: 5px;
      padding-top: 0;
      .filter-wrap {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0;
        .filter-item {
          height: 2.8rem;
          width: auto;
          &.search {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            .search-filter {
              height: 2.8rem;
              background: #fff;
              border: 0.16667rem solid #f9c901;
              border-radius: 0.20833rem 0 0 0.20833rem;
              input {
                font-size: 1.16667rem;
                height: 2.83333rem;
                line-height: 1;
                padding: 0.41667rem 0.83333rem;
                border: 0 solid #f9c901;
                border-radius: 0;
              }
              .el-input {
                font-size: 10px;
                line-height: 1;
                padding: 5px;
                border: 0 solid #f9c901;
                border-radius: 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: 100% !important;
              }
            }
          }
          &.button {
            .el-button {
              height: 100% !important;
              color: #000;
              background: #f9c901;
              border: 0.16667rem solid #f9c901;
              border-radius: 0 0.20833rem 0.20833rem 0;
              padding: 0 0.83333rem;
              svg {
                width: 1.2rem !important;
                height: 1.2rem !important;
              }
            }
          }
        }
      }
    }
  }
  .mainMenu {
    .el-menu-item,
    .el-submenu {
      padding-left: 0rem !important;
      padding-right: 0rem !important;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      position: relative;
      height: auto;
      overflow: visible;
      .el-icon-setting,
      .fas {
        font-size: 1.33333rem;
        width: 2rem;
        text-align: center;
        margin-right: 0.41667rem;
        margin-left: 0.83333rem;
        color: #f9c901;
        margin-top: -0.16667rem;
      }
      .title-container {
        width: calc(100% - 5rem);
      }
      .text {
        color: #fff;
        word-break: break-word;
        white-space: normal;
        height: auto;
        overflow: visible;
        p {
          line-height: 2rem;
          margin-top: 0.7rem;
          margin-bottom: 0.7rem;
        }
      }
      .el-submenu__title {
        background-color: transparent;
        padding-left: 0 !important;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
      }
      .el-menu--inline {
        width: 100%;
      }
      .el-submenu__icon-arrow {
        font-size: 1.33333rem;
        color: #fff !important;
        right: 1rem;
      }
    }
    .el-menu-item,
    .el-submenu__title {
      height: auto;
      line-height: 3.5rem;
      &.is-active {
        background: #a3a3a3 !important;
      }
    }
    .el-submenu {
      &.is-active {
        .el-submenu__title {
          background: #a3a3a3 !important;
        }
      }
    }
  }
  .footer {
    color: #ccc;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-bottom: 1rem;
    font-size: .91667rem;
    line-height: 1.25rem;
  }
}

.pc.sidebar-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 45px);
  background-color: #000;
  transform: translateX(0);
  width: $hideSidebarWidth;
  transition: width .3s;
  border-right: 1px solid $yellow;
  .option {
    padding: 5px 10px;
    z-index: 2;
    position: relative;
    .small-option {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 1px solid #444;
      padding: 2px 0;
      margin: 0 -6px;
      width: calc(100% + 12px);
      .small-item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: auto;
        display: none;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        height: 38px;
        .language {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          background-color: rgba(0,0,0,0.8);
        }
      }
      .small-item.hamburger {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        transform: rotate(180deg);
      }
    }
  }
  .mainMenu {
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
    border-right: 0;
    text-align: left;
    overflow: auto;
    width: 100%;
    height: auto;
    max-height: calc(100% - 42px);
    overflow: auto;
    .el-menu-item {
      height: 3.5rem;
      position: relative;
      padding-left: 10px !important;
      padding-right: 10px !important;
      margin-right: 1px;
      line-height: 3.5rem;
      border-bottom: 1px solid #444;
      .el-tooltip {
        padding: 0 17px !important;
      }
    }
    .el-submenu {
      overflow: hidden;
      .el-submenu__title {
        height: 3.5rem;
        position: relative;
        padding: 0 14px !important;
        margin-right: 1px;
        line-height: 3.5rem;
        border-bottom: 1px solid #444;
        & > span {
          display: none;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      .el-menu {
        .nest-menu {
          padding-left: 2rem;
        }
      }
    }
    .sub-el-icon {
      color: $yellow;
      width: 1em;
      height: 1em;
      margin-right: .2em;
    }
  }
  .footer {
    color: #ccc;
    font-size: 14px;
    display: none;
    width: 130px;
    margin: 1em auto;
    .version {
      display: flex;
      & :first-child {
        margin-right: 15px;
      }
    }
  }
  &.open {
    width: $sideBarWidth;
    .option {
      .small-option {
        .small-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          &.hamburger {
            transform: rotate(0);
          }
        }
        .small-item + .small-item {
          border-left: 1px solid #444;
        }
      }
    }
    .mainMenu {
      .el-menu-item {
        height: auto;
      }
      .el-submenu__title {
        & > span {
          display: inline-block;
        }
        .el-submenu__icon-arrow {
          display: flex;
          color: #fff;
          font-size: 1.4rem;
        }
      }
    }
    .footer {
      display: block;
    }
  }
}
</style>
