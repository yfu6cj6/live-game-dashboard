<template>
  <Dialog
    :title="title"
    :width="formWidth"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
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
  </Dialog>
</template>

<script>
import handleDialogWidth from '@/layout/mixin/handleDialogWidth'
import Dialog from '@/components/Dialog'

export default {
  name: 'PasswordTipDialog',
  components: { Dialog },
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
