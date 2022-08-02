<template>
  <div>
    <div class="mask" @click.stop="beforeClose" />
    <div v-loading="loading" class="dialog">
      <div class="header">
        <i class="el-icon-close close" @click.stop="beforeClose" />
        <slot name="header" />
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

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
    'beforeClose': {
      type: Function,
      require: true,
      default() {
        return () => {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.mask {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: .5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.dialog {
  position: fixed;
  width: calc(100% - 20px);
  max-height: calc(100% - 160px);
  border: 2px solid $yellow;
  display: flex;
  display: -ms-flex; /* 兼容IE */
  flex-direction: column;
  -ms-flex-direction: column; /* 兼容IE */
  background: #000;
  margin: 0 auto !important;
  overflow-y: auto;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #fff;
  .header {
    text-align: center;
    font-size: 22px;
    padding: 20px 20px 10px;
    .close {
      position: absolute;
      top: 5px;
      right: 10px;
      color: $yellow;
    }
  }
  .body {
    padding: 0 10px;
  }
  .footer {
    text-align: center;
    padding: 10px 20px 20px;
  }
}

.loading {
  top: 0;
  left: 0;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .dialog {
    max-height: calc(100% - 20px);
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

@media screen and (min-width: 992px) {
  .dialog {
    max-width: 50%;
  }
}
</style>
