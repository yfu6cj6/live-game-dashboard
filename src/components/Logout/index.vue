<template>
  <div class="fas m-auto clickable pr-1 yellow" @click.stop="toggleClick">
    <svg
      class="logout"
      viewBox="337.962 206.102 169.087 178.771"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      enable-background="new 257.516 158.797 327.636 277.964"
    >
      <path
        d="M379.947,227.414c0,6.46,0.247,12.434-0.145,18.364c-0.124,1.878-1.593,4.026-3.056,5.402
    c-37.443,35.249-23.036,99.245,26.162,114.028c51.243,15.396,94.34-27.308,87.402-74.234c-2.713-18.346-11.201-32.976-25.662-44.37
    c-1.021-0.805-2.057-2.302-2.104-3.514c-0.221-5.761-0.099-11.532-0.099-17.393c25.349,6.366,48.183,48.148,45.405,81.431
    c-3.392,40.686-36.983,73.818-76.847,77.377c-49.061,4.379-83.608-31.116-90.817-64.45
    C331.435,279.574,349.28,244.032,379.947,227.414z"
      />
      <path
        d="M429.936,306.47c-7.822,0-15.201,0-22.805,0c0-33.506,0-66.774,0-100.368c7.479,0,14.977,0,22.805,0
    C429.936,239.423,429.936,272.789,429.936,306.47z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.logout {
  height: 1.75rem;
  width: 1.75rem;
  overflow: hidden;
  vertical-align: middle;
}
</style>
