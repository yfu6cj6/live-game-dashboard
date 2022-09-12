<template>
  <div
    class="back-top"
    :class="{'active': active, 'inactive': inactive}"
    style="width: 85.25px; height: 85.25px; font-size: 20px; top: 20px;"
    @click="backTopLerp"
  >
    <i class="el-submenu__icon-arrow el-icon-arrow-up" />
  </div>
</template>

<script>

export default {
  name: 'BackTop',
  props: {
    innerClass: {
      type: String,
      require: true,
      default() {
        return '.scroll-inner.on.native'
      }
    },
    viewClass: {
      type: String,
      require: true,
      default() {
        return '.scroll-view'
      }
    }
  },
  data() {
    return {
      active: false,
      inactive: false,
      timeOutKey: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop, true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollToTop, true)
  },
  methods: {
    backTop() {
      const inner = document.querySelector(this.innerClass)
      if (inner) {
        inner.scrollTop = 0
      }
    },
    backTopLerp() {
      const inner = document.querySelector(this.innerClass)
      if (inner) {
        const timer = setInterval(() => {
          const ispeed = Math.floor(this.scrollTop / 5)
          inner.scrollTop = -this.scrollTop + ispeed
          if (inner.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      }
    },
    scrollToTop() {
      const inner = document.querySelector(this.innerClass)
      if (inner) {
        const view = inner.querySelector(this.viewClass)
        if (view) {
          const scrollTop = view.getBoundingClientRect().y
          const innerTop = inner.getBoundingClientRect().y
          this.scrollTop = scrollTop - innerTop
          if (this.scrollTop < 0) {
            this.active = true
            if (this.timeOutKey) {
              clearTimeout(this.timeOutKey)
            }
            this.timeOutKey = setTimeout(() => {
              this.inactive = true
            }, 1000)
          } else {
            this.active = false
            if (this.timeOutKey) {
              clearTimeout(this.timeOutKey)
            }
          }
          this.inactive = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
  cursor: pointer;
  position: absolute;
  top: 20%;
  right: 30px;
  z-index: 3;
  max-width: 35px;
  min-width: 25px;
  max-height: 35px;
  min-height: 25px;
  background: #f9c901;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-shadow: 0 1px 2px #bbb;
  box-shadow: 0 1px 2px #bbb;
  opacity: 0;
  visibility: hidden;
  i.el-submenu__icon-arrow {
    margin-top: 0;
    position: unset;
    font-size: inherit;
    font-weight: bolder;
  }
  &.active {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
  }
  &.inactive {
    visibility: visible;
    opacity: 0.5;
    -webkit-transition: opacity .5s linear;
    transition: opacity .5s linear;
    &:hover {
      opacity: 1;
      -webkit-transition: opacity .2s linear;
      transition: opacity .2s linear;
    }
  }
}
</style>
