<template>
  <div :class="classObj" class="app-container">
    <div>
      <div>
        <navbar />
        <div class="drawer-bg" :class="{'opened': sidebar.opened}" @click="handleClickOutside" />
        <sidebar class="sidebar" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import defaultSettings from '@/settings'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'tagsView'
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
  position: relative;
  height: 100%;
  width: 100%;

  .drawer-bg.opened {
    background: #000;
    opacity: 0.3;
    width: 100%;
    position: absolute;
    top: $navBarHeight;
    height: calc(100% - 45px);
    z-index: 999;
  }

  .sidebar {
    position: absolute;
    z-index: 1000;
    border-right: 2px solid $yellow;
  }
}

@media screen and (min-width: 992px) {
  .app-container {
    .drawer-bg {
      display: none;
    }
  }
}
</style>
