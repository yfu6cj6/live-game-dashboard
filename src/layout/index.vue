<template>
  <div v-loading="loading" :class="classObj" class="app-container">
    <template v-if="device === 'mobile'">
      <setPwd v-if="modPwd" />
      <template v-else>
        <navbar class="navbar" />
        <page-tabs class="d-none" />
        <div class="drawer-bg" :class="{'opened': sidebar.opened}" @click="handleClickOutside" />
        <sidebar class="sidebar" :class="{'opened': sidebar.opened}" />
        <agent-level class="agentLevel" />
        <app-main class="appMain" :class="{'opened': sidebar.opened}" />
      </template>
    </template>
    <template v-else>
      <navbar class="navbar" />
      <page-tabs class="page-tabs" :class="{'opened': sidebar.opened}" />
      <sidebar class="sidebar" />
      <agent-level class="agentLevel" />
      <app-main class="appMain" :class="{'opened': sidebar.opened}" />
    </template>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, PageTabs, AgentLevel } from './components'
import ResizeMixin from '@/mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import defaultSettings from '@/settings'
import SetPwd from '@/components/SetPwd'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    PageTabs,
    AgentLevel,
    SetPwd
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'loading',
      'modPwd'
    ]),
    classObj() {
      return {
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  created() {
    this.$store.dispatch('settings/changeSetting', defaultSettings)
    this.$store.dispatch('agentManagement/closeAgentLevelSideBar')
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss">
.app-container {
  &>.el-loading-mask {
    z-index: 3500;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-container {
  @include clearfix;
  height: 100%;
  width: 100%;
  position: relative;
  .navbar {
    z-index: 10;
  }
  .drawer-bg.opened {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 11;
  }
  .sidebar {
    height: 100%;
    margin-left: 0;
    position: fixed;
    top: 2.5rem;
    left: 0;
    padding-bottom: 2.5rem;
    visibility: hidden;
    &.opened {
      visibility: visible;
      z-index: 12;
    }
  }
  .agentLevel {
    position: fixed;
    z-index: 12;
    border-right: 2px solid $yellow;
    top: $navBarHeight;
    padding-top: 0.91667rem;
  }
  .appMain {
    padding-top: $navBarHeight;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    max-width: 768px;
    width: 100%;
    height: 100%;
    z-index: 1;
    margin: 0 auto;
    background-color: #d6d6d6;
  }
}

@media screen and (min-width: 992px) {
  .app-container {
    .page-tabs {
      position: fixed;
      top: 45px;
      left: 50px;
      margin-left: 0px;
      background: #000;
      width: calc(100vw - 50px);
      transition: all .3s;
      z-index: 11;
    }

    .page-tabs.opened {
      transition: all .5s;
      left: 200px;
      width: calc(100vw - 200px);
    }

    .sidebar {
      height: 100%;
      margin-left: 0;
      position: fixed;
      top: 45px;
      left: 0;
      z-index: 3000;
      visibility: visible;
    }

    .agentLevel {
      z-index: 3010;
    }

    .appMain {
      padding-top: calc(3.75rem + 30px);
      padding-left: $pcHideSidebarWidth;
      transition: padding-left .3s;
      max-width: 100%;
      background-color: #000 !important;
      background-position: center !important;
      background-size: cover !important;
      background-image: url("/static/images/logo/loginBG.png");
    }

    .appMain.opened {
      padding-left: $pcSideBarWidth;
      transition: padding-left .5s;
    }
  }
}
</style>
