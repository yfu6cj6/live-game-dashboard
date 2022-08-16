<template>
  <div>
    <div class="mask" @click.stop="onClickMask" />
    <div v-loading="loading" class="dialog">
      <div class="dialog-header">
        <i v-if="showClose" class="el-icon-close dialog-header-close" @click.stop="onCloseEven" />
        <div>{{ title }}</div>
      </div>
      <div class="dialog-body">
        <slot />
        <div v-if="$slots.bodyFooter" class="dialog-body-footer">
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
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #fff;
  .dialog-header {
    text-align: center;
    font-size: 1.4rem;
    padding: 2rem 1rem 1rem;
    word-break: break-all;
    .dialog-header-close {
      position: fixed;
      top: 5px;
      right: 10px;
      color: $yellow;
    }
  }
  .dialog-body {
    padding: 0 .7rem;
    overflow-y: auto;
    word-break: break-all;
    .dialog-body-footer {
      text-align: center;
      padding: .7rem 1.4rem 1.4rem;
      word-break: break-all;
      .el-button {
        width: 12rem;
      }
    }
  }
  .dialog-footer {
    text-align: center;
    padding: .7rem 1.4rem 1.4rem;
    word-break: break-all;
    .el-button {
      width: 12rem;
    }
  }
}

.loading {
  top: 0;
  left: 0;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .dialog {
    max-height: calc(100% - 100px);
  }
}

@media screen and (min-width: 992px) {
  .dialog {
    max-width: 50%;
    .dialog-body {
      padding: 0 3rem;
      .dialog-body-footer {
        .el-button {
          width: 18rem;
        }
      }
    }
    .dialog-footer {
      .el-button {
        width: 18rem;
      }
    }
  }
}
</style>
