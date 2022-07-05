<template>
  <section class="app-main" :class="{'open': isOpened}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    key() {
      return this.$route.path
    },
    isOpened() {
      return Boolean(this.sidebar.opened)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 45px);
  position: relative;
  overflow: hidden;
}

@media screen and (min-width: 992px) {
  .app-main {
    transition: margin-left .28s;
    margin-left: $hideSidebarWidth;
  }

  .app-main.open {
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
  }
}
</style>
