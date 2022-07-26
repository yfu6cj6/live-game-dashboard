<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="formWidth"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <label>{{ `${$t('__account')}: ` }}
      <span>{{ `${form.account}` }}</span>
    </label>
    <br>
    <label>{{ passwordTitle }}
      <span>{{ `${form.password}` }}</span>
    </label>
    <span slot="footer">
      <el-button class="bg-yellow" @click="onClose">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import handleDialogWidth from '@/layout/mixin/handleDialogWidth'

export default {
  name: 'PasswordTipDialog',
  mixins: [handleDialogWidth],
  props: {
    'title': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'visible': {
      type: Boolean,
      require: true
    },
    'confirm': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
    }
  },
  computed: {
    passwordTitle() {
      return this.form.isCreate ? `${this.$t('__password')}: ` : `${this.$t('__newPassword')}: `
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

label {
  color: $yellow;
  font-size: 14px;
  font-weight: 500;
  span {
    color: #fff;
  }
}
</style>
