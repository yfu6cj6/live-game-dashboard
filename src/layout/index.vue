<template>
  <div :class="classObj" class="app-container">
    <navbar />
    <tags-view v-if="device !== 'mobile'" class="tagsView" :class="{'opened': sidebar.opened}" />
    <div class="drawer-bg" :class="{'opened': sidebar.opened}" @click="handleClickOutside" />
    <sidebar class="sidebar" />
    <agent-level class="agentLevel" />
    <app-main class="appMain" :class="{'opened': sidebar.opened}" />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, AgentLevel } from './components'
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
    AgentLevel
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
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
  .drawer-bg.opened {
    background: #000;
    opacity: 0.3;
    width: 100%;
    position: fixed;
    top: $navBarHeight;
    height: calc(100% - 45px);
    z-index: 998;
  }
  .sidebar {
    position: fixed;
    z-index: 999;
    border-right: 2px solid $yellow;
    top: $navBarHeight;
  }

  .agentLevel {
    position: fixed;
    z-index: 1000;
    border-right: 2px solid $yellow;
    top: $navBarHeight;
  }
}

@media screen and (min-width: 992px) {
  .app-container {
    .tagsView {
      padding-left: $hideSidebarWidth;
      transition: padding-left .3s;
    }

    .tagsView.opened {
      padding-left: $sideBarWidth;
    }

    .drawer-bg {
      display: none;
    }

    .appMain {
      padding-left: $hideSidebarWidth;
      transition: padding-left .3s;
    }

    .appMain.opened {
      padding-left: $sideBarWidth;
    }
  }
}
</style>
