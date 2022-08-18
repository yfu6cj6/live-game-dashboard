<template>
  <Dialog
    v-if="visible"
    :title="title"
    :loading="dialogLoading"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div v-if="form.backendUrl">
      <span class="title">{{ `${$t('__backendUrl')}: ` }}</span>
      <span class="content">{{ `${form.backendUrl}` }}</span>
    </div>
    <div v-if="form.gameUrl">
      <span class="title">{{ `${$t('__gameUrl')}: ` }}</span>
      <span class="content">{{ `${form.gameUrl}` }}</span>
    </div>
    <div
      v-for="(item, index) in form.accountsInfo"
      :key="index"
      class="accountsInfo"
    >
      <div>
        <span class="title">{{ `${$t('__account')}: ` }}</span>
        <span class="content">{{ `${item.account}` }}</span>
      </div>
      <div>
        <span class="title">{{ passwordTitle }}</span>
        <span class="content">{{ `${item.password}` }}</span>
      </div>
    </div>
    <span slot="bodyFooter">
      <el-button class="bg-yellow" @click="onClose">{{ confirm }}</el-button>
    </span>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'PasswordTipDialog',
  components: { Dialog },
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

.title {
  color: $yellow;
}
.content {
  color: #fff;
}

.accountsInfo {
  margin-top: 10px;
}
</style>
