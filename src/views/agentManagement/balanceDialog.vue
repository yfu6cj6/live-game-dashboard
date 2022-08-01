<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="info">
      <div class="info-item">
        <span class="yellow-color info-header">{{ $t('__superiorAgent') }}</span>
        <span class="info-content">{{ agentBalanceInfo.parent }}</span>
      </div>
      <div class="info-item">
        <span class="yellow-color info-header">{{ $t('__superiorBalance') }}</span>
        <span class="info-content">{{ parentBalance }}</span>
      </div>
      <div v-if="modeType===modeEnum.agent" class="info-item">
        <span class="yellow-color info-header">{{ $t('__agent') }}</span>
        <span class="info-content">{{ agentBalanceInfo.agent }}</span>
      </div>
      <div v-if="modeType===modeEnum.agent" class="info-item">
        <span class="yellow-color info-header">{{ $t('__agentBalance') }}</span>
        <span class="info-content">{{ agentBalanceInfo.agentBalance }}</span>
      </div>
      <div v-if="modeType===modeEnum.member" class="info-item">
        <span class="yellow-color info-header">{{ $t('__member') }}</span>
        <span class="info-content">{{ agentBalanceInfo.member }}</span>
      </div>
      <div v-if="modeType===modeEnum.member" class="info-item">
        <span class="yellow-color info-header">{{ $t('__memberBalance') }}</span>
        <span class="info-content">{{ agentBalanceInfo.memberBalance }}</span>
      </div>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="balanceLabelTitle" prop="amount">
        <el-input v-model="form.amount" type="number" :disabled="balanceDisable" min="0" />
      </el-form-item>
      <el-form-item v-if="visible" :label="$t('__userPassword')" prop="userPassword">
        <el-input v-model="form.userPassword" show-password />
      </el-form-item>
    </el-form>
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'BalanceDialog',
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
    },
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'modeType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data: function() {
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    const validateBlance = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.amount < 0) {
        callback(new Error(this.$t('__lowerMin')))
      } else if (Number(this.form.amount) === 0) {
        callback(new Error(this.$t('__meaningless')))
      } else if (this.operationType === this.operationEnum.depositBalance) {
        if (this.agentBalanceInfo.parentId !== 1 && Number(this.form.amount) > Number(this.agentBalanceInfo.parentBalance)) {
          callback(new Error(this.$t('__overMax')))
        } else {
          callback()
        }
      } else if (this.operationType === this.operationEnum.withdrawBalance) {
        if (Number(this.form.amount) > Number(this.agentBalanceInfo.agentBalance)) {
          callback(new Error(this.$t('__overMax')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      rules: {
        amount: [{ required: true, trigger: 'blur', validator: validateBlance }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      operationEnum: Object.freeze({ 'depositBalance': 1, 'withdrawBalance': 2 }),
      modeEnum: Object.freeze({ 'agent': 1, 'member': 2 }),
      agentBalanceInfo: {}
    }
  },
  computed: {
    balanceLabelTitle() {
      return this.operationType === this.operationEnum.depositBalance ? this.$t('__depositBalance') : this.$t('__withdrawBalance')
    },
    balanceDisable() {
      if (this.operationType === this.operationEnum.depositBalance) {
        if (this.agentBalanceInfo.parentId === 1) {
          return false
        } else {
          return Number(this.agentBalanceInfo.parentBalance) === 0
        }
      } else {
        return Number(this.agentBalanceInfo.agentBalance) === 0
      }
    },
    parentBalance() {
      return this.agentBalanceInfo.parentId === 1 ? 'oo' : this.agentBalanceInfo.parentBalance
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.$refs.form.clearValidate()
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmMsg(`${this.$t('__confirmOperation')}?`, () => {
            const data = JSON.parse(JSON.stringify(this.form))
            if (this.operationType === this.operationEnum.depositBalance) {
              this.$emit('depositBalance', data)
            } else if (this.operationType === this.operationEnum.withdrawBalance) {
              this.$emit('withdrawBalance', data)
            }
          })
        }
      })
    },
    setBalanceInfo(balanceInfo) {
      this.agentBalanceInfo = balanceInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  font-size: 16px;
  width: 100%;
  margin: 20px auto;
  .info-item {
    display: flex;
    padding-top: 2px;
    padding-bottom: 2px;
    .info-header {
      width: 120px;
      font-weight: bold;
    }
    .info-content {
      color: #fff;
    }
  }
}
@media screen and (min-width: 768px) {
  .info {
    width: 50%;
  }
}
</style>
