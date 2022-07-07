<template>
  <div class="sidebar-container" :class="{'open': isOpened}">
    <div class="small-option">
      <logout v-if="isOpened" class="item" @toggleClick="logout" />
      <modPassword v-if="isOpened" class="item" @toggleClick="modPassword" />
      <announcement v-if="isOpened" class="item" @toggleClick="announcement" />
      <language v-if="isOpened" class="item" :lang="curLang" @changLang="language" />
      <hamburger class="item" :is-active="isOpened" @toggleClick="toggleSideBar" />
    </div>
    <el-menu
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
      'device'
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

.sidebar-container {
  display: flex;
  flex-direction: column;
  width: $sideBarWidth;
  min-height: calc(100vh - 45px);
  background-color: #000;
  transition: transform .3s;
  transform: translateX(-($sideBarWidth + 1));

  .small-option {
    display: none;
  }

  .el-menu {
    border-right: 0px;
    min-height: calc(100vh - 45px - 80px);
  }

  .footer {
    color: #ccc;
    font-size: 14px;
    margin: 1em auto 0 auto;

    .version {
      display: flex;

      & :first-child {
        margin-right: 15px;
      }
    }
  }
}

.open.sidebar-container {
  transform: translateX(0);
}

@media screen and (min-width: 992px) {
  .sidebar-container {
    transform: translateX(0);
    width: $hideSidebarWidth;
    transition: width .3s;

    .small-option {
      display: flex;
      align-items: center;
      height: 45px;
      border-bottom: 1px solid #444;

      .item {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }

      .item + .item {
        border-left: 1px solid #444;
      }
    }
    .el-menu {
      min-height: calc(100vh - 45px - 45px - 80px);
    }

    .footer {
      display: none;
      width: 130px;
    }
  }

  .open.sidebar-container {
    width: $sideBarWidth;

    .footer {
      display: block;
    }
  }
}
</style>
