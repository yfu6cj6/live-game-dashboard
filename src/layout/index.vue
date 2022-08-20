<template>
  <div :class="classObj" class="app-container">
    <template v-if="device === 'mobile'">
      <navbar class="navbar" />
      <tags-view v-show="false" class="tagsView" />
      <div class="drawer-bg" :class="{'opened': sidebar.opened}" @click="handleClickOutside" />
      <sidebar class="sidebar" :class="{'opened': sidebar.opened}" />
      <agent-level class="agentLevel" />
      <app-main class="appMain" :class="{'opened': sidebar.opened}" />
      <modPwdDialog v-if="modPwd" />
    </template>
    <template v-else>
      <navbar class="navbar" />
      <tags-view class="tagsView" :class="{'opened': sidebar.opened}" />
      <sidebar class="sidebar" />
      <agent-level class="agentLevel" />
      <app-main class="appMain" :class="{'opened': sidebar.opened}" />
      <modPwdDialog v-if="modPwd" />
    </template>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, AgentLevel, ModPwdDialog } from './components'
import ResizeMixin from '@/mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import defaultSettings from '@/settings'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    AgentLevel,
    ModPwdDialog
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
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

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-container {
  @include clearfix;
  height: 100%;
  width: 100%;
  .navbar {
    z-index: 999;
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
    .tagsView {
      padding-left: $pcHideSidebarWidth;
      transition: padding-left .3s;
    }

    .tagsView.opened {
      padding-left: $mobileSideBarWidth;
    }

    .sidebar {
      height: 100%;
      margin-left: 0;
      position: fixed;
      top: 45px;
      left: 0;
      z-index: 12;
      visibility: visible;
    }

    .appMain {
      padding-left: $pcHideSidebarWidth;
      transition: padding-left .3s;
      max-width: 100%;
    }

    .appMain.opened {
      padding-left: $mobileSideBarWidth;
    }
  }
}
</style>
