<template>
  <div>
    <template v-if="device === 'mobile'">
      <div class="mobile sidebar-container" :class="{'open': isOpened}">
        <el-menu
          class="mainMenu"
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
      browserName: '',
      clientInfo_IP: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'device',
      'modPwd'
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

.mobile.sidebar-container {
  display: flex;
  flex-direction: column;
  width: $sideBarWidth;
  height: 100%;
  background-color: #000;
  transform: translateX(-(20.83333rem + 1));
  border-right: 1px solid $yellow;
  overflow-x: hidden;
  overflow-y: auto;
  .mainMenu {
    padding-top: 0.83333rem;
    border-right: 0px;
    .el-menu-item {
      font-size: 1.4rem;
      height: auto;
      line-height: 3.5rem;
      &.is-active {
        background-color: #a3a3a3 !important;
        i {
          color: #fc0;
        }
      }
    }
    .el-submenu {
      font-size: unset;
      .el-submenu__title {
        font-size: 1.4rem;
        height: auto;
        line-height: 3.5rem;
        .el-submenu__icon-arrow {
          color: #fff;
          font-size: 1.4rem;
        }
      }
      .el-menu-item {
        min-width: 0;
      }
    }
    .sub-el-icon {
      color: $yellow;
      width: 1.33333rem;
      height: 1.33333rem;
      margin-right: .41667rem;
      font-size: unset;
    }
    .icon {
      color: $yellow;
      margin-right: .41667rem;
      font-size: unset;
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
  &.open {
    transition: transform .5s;
    transform: translateX(0);
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
    .icon {
      color: $yellow;
      margin-right: .5em;
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
