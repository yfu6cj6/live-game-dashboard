<template>
  <div id="app" :class="{'mobile': device === 'mobile', 'pc': device === 'desktop'}">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'device'
    ])
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: PingFang TC, PingFang SC, 微軟雅黑, Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.16667rem;
  line-height: 1;
  background-color: #000 !important;
  background-position: center !important;
  background-size: cover !important;
  background-image: url("/static/images/logo/loginBG.png");
  height: 100%;
  width: 100%;
}
</style>
