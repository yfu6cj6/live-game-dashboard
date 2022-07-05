<template>
  <div @click.stop="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="257.516 158.797 327.636 277.964"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      enable-background="new 257.516 158.797 327.636 277.964"
    >
      <rect x="547.746" y="158.797" width="37.406" height="277.964" />
      <polygon
        points="257.516,297.778 369.017,409.279 395.466,382.83 329.119,316.481 515.429,316.481 515.429,279.075 329.119,279.075
	395.466,212.729 369.017,186.278 283.966,271.328 283.966,271.328 "
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.hamburger {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: rotate(180deg);
  fill: $yellow !important;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
