<template>
  <div class="fas m-auto clickable yellow" @click.stop="toggleClick">
    <svg
      class="modPassword"
      viewBox="0 0 63 63"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      enable-background="new 257.516 158.797 327.636 277.964"
      style="height: 1.66667rem;width: 1.66667rem;"
    >
      <path
        d="M18.82,56H11.88V63H0L29.7,35.63l-2.32-2.18-27.2,25c0-2.46,0-4.63,0-6.79,
      0-.37.44-.76.75-1.07q11.4-11.48,22.83-22.91a1.73,1.73,0,0,0,
      .54-1.93c-2.51-9.54,1.05-18.56,9.08-23.15a19.79,19.79,0,0,1,28.74,23,19.74,19.74,0,0,1-17,14,20.1,
      20.1,0,0,1-8-.8,1.41,1.41,0,0,0-1.63.42c-3,3.05-6,6.08-9,9.07a2.86,2.86,0,0,1-1.71.71c-1.93.08-3.88,
      0-6,0ZM49,21a6.93,6.93,0,0,0,7-7,7,7,0,1,0-14,0A6.91,6.91,0,0,0,49,21Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ModPassword',
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.modPassword {
  height: 1.75rem;
  width: 1.75rem;
  overflow: hidden;
  vertical-align: middle;
}
</style>
