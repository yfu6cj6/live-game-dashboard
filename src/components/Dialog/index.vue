<template>
  <div class="dialog" :class="{'sidebar_open': sidebar.opened}">
    <div class="mask" @click.stop="onClickMask" />
    <div v-loading="loading" class="dialog-wrap">
      <div v-if="showClose" class="dialog-close-icon" style="height: 1.77778rem; width: 1.77778rem;" @click.stop="onClose">
        <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" />
      </div>
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-body">
        <slot />
        <div v-if="$slots.bodyFooter" class="dialog-footer">
          <slot name="bodyFooter" />
        </div>
      </div>
      <div v-if="$slots.footer" class="dialog-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'Dialog',
  mixins: [dialogCommon],
  props: {
    'title': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'loading': {
      type: Boolean,
      require: true,
      default() {
        return true
      }
    },
    'closeOnClickModal': {
      type: Boolean,
      require: true,
      default() {
        return true
      }
    },
    'onCloseEven': {
      type: Function,
      require: true,
      default() {
        return () => {}
      }
    },
    'showClose': {
      type: Boolean,
      require: true,
      default() {
        return true
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    onClickMask() {
      if (this.closeOnClickModal) {
        this.onCloseEven()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.dialog {
  .dialog-wrap {
    .dialog-close-icon {
      position: absolute;
      top: 0.83333rem;
      right: 0.83333rem;
      z-index: 5;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-left: auto;
      &:hover {
        background-color: #666;
        border-radius: 50%;
      }
    }
    .dialog-title {
      position: absolute;
      font-size: 16px;
      text-align: center;
      color: #fff;
      top: 10px;
      right: 0;
      line-height: 20px;
      width: 100%;
      z-index: 4;
    }
    .dialog-body {
      padding-top: 0.41667rem;
      word-break: break-all;
    }
    .dialog-footer {
      text-align: center;
      padding-top: 2rem;
      word-break: break-all;
      .el-button {
        width: 18rem;
      }
    }
  }
}
#app.mobile {
  .dialog {
    position: fixed;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    top: 0;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 3;
      background: rgba(0,0,0,0.5);
    }
    .dialog-wrap {
      position: relative;
      height: auto;
      width: calc(100% - 20px);
      max-width: 80%;
      max-height: calc(100% - 60px);
      background-color: #000;
      padding: 30px 20px 20px 20px;
      border-style: solid;
      border-color: #f9c901;
      border-width: 1.5px 1.5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0 auto;
      z-index: 4;
      top: 80px;
      .dialog-close-icon {
        color: #fff;
      }
    }
  }
}

#app.pc {
  .dialog {
    position: fixed;
    z-index: 3;
    top: 75px;
    left: 50px;
    width: calc(100vw - 50px);
    height: calc(100vh - 75px);
    transition: all .3s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    &.sidebar_open {
      left: 200px;
      width: calc(100vw - 200px);
      transition: all .5s;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      background: rgba(0,0,0,0.5);
    }
    .dialog-wrap {
      position: relative;
      width: auto;
      height: auto;
      min-width: 400px;
      max-width: 100%;
      max-height: calc(100% - 60px);
      background-color: #000;
      padding: 30px 20px 20px 20px;
      border-style: solid;
      border-color: #f9c901;
      border-width: 1.5px 1.5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0 auto;
      z-index: 4;
      top: -10px;
      left: 0;
    }
  }
}
</style>
