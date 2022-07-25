<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <label>{{ `${$t('__account')}: ` }}
      <span>{{ account }}</span>
    </label>
    <br>
    <label>{{ passwordTitle }}
      <span>{{ password }}</span>
    </label>
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onClose">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'ResetPasswordDialog',
  mixins: [dialogCommon],
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
      dialogLoading: false
    }
  },
  computed: {
    passwordTitle() {
      return this.form.isCreate ? `${this.$t('__password')}: ` : `${this.$t('__newPassword')}: `
    },
    account() {
      return this.form.account ? this.form.account : ''
    },
    password() {
      return this.form.password ? this.form.password : ''
    }
  },
  methods: {
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
