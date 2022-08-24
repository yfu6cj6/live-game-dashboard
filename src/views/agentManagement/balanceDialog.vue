<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div>
        <div class="notice-cover" @click.stop="onClose" />
        <div class="fadeInUp pp notice animated">
          <div id="scroll-inner" class="scroll-inner off">
            <div v-loading="dialogLoading" class="scroll-view" style="display: block; position: static; max-height: 70vh;">
              <div class="w-100" belongto="subAgent">
                <div class="detail-credit-form border-0 animated fadeInUp">
                  <div class="credit-item-group">
                    <div class="credit-item w-100">
                      <div class="label fixed-size">{{ $t('__superiorAgent') }}</div>
                      <div class="value yellow">{{ agentBalanceInfo.parent }}</div>
                    </div>
                    <div class="credit-item mr-2">
                      <div class="label fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                      <div class="value">
                        <span class="">{{ parentBalance }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="credit-item-group">
                    <div class="credit-item w-100">
                      <div class="label yellow fixed-size">{{ accountTitle }}</div>
                      <div class="value yellow">{{ operateName }}</div>
                    </div>
                    <div class="credit-item mr-2">
                      <div class="label fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                      <div class="value">
                        <span class="">{{ balance }}</span>
                      </div>
                    </div>
                  </div>
                  <form class="el-form el-form--label-left">
                    <div class="credit-item-group">
                      <div class="credit-item big">
                        <div class="label fixed-size yellow">{{ balanceLabelTitle }}</div>
                        <div class="value">
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="yellow el-input el-input--small" :class="{'is-disabled': !enoughBalance}">
                                <input v-model="form.amount" type="text" :disabled="!enoughBalance" autocomplete="off" step="0.01" min="0.1" max="10" class="el-input__inner" @focus="inputFocus_balance()">
                                <span v-if="errorTips !== ''" class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-close" style="color: rgb(245, 108, 108);" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="credit-item">
                        <div class="label fixed-size" />
                        <div class="value">
                          <small v-show="enoughBalance" class="tip">
                            {{ $t('__range') }}
                            <span class="">1.00</span> - <span class="">{{ parentBalance }}</span>
                          </small>
                          <small v-show="!enoughBalance" class="tip text-red">{{ $t('__noEnoughBalance') }}</small>
                        </div>
                      </div>
                      <div class="credit-item big h-auto">
                        <div class="label fixed-size yellow">{{ `${$t('__userPassword')}: ` }}</div>
                        <div class="value">
                          <div class="el-form-item operator-psw custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': passwordState === inputState.error, 'is-success': passwordState === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="yellow el-input el-input--small el-input--suffix">
                                <input v-model="form.userPassword" :type="inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus_password()" @change="checkPassword()" @blur="checkPassword()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputType !== 'password'}" @click.stop="showPasswordType()" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="credit-item-group">
                    <div v-if="errorTips !== ''" class="form-alert">
                      <div role="alert" class="el-alert el-alert--warning is-light fade show">
                        <i class="el-alert__icon el-icon-warning" />
                        <div class="el-alert__content">
                          <span class="el-alert__title">{{ errorTips }}</span>
                          <i class="el-alert__closebtn el-icon-close" style="display: none;" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="credit-item-group">
                    <div class="d-flex w-100 ">
                      <button v-if="enoughBalance" type="button" class="el-button el-button--primary bg-yellow w-100" @click.stop="onSubmit">
                        <span>{{ `${$t('__submit')}` }}</span>
                      </button>
                      <button type="button" class="el-button bg-gray w-100 el-button--primary" @click.stop="onClose">
                        <span>{{ `${$t('__cancel')}` }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
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
        <span v-if="!dialogLoading" slot="bodyFooter">
          <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'BalanceDialog',
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
      inputState: Object.freeze({
        'none': 0,
        'success': 1,
        'error': 2
      }),
      rules: {
        amount: [{ required: true, trigger: 'blur', validator: validateBlance }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      passwordState: 0,
      inputType: 'password',
      operationEnum: Object.freeze({ 'depositBalance': 1, 'withdrawBalance': 2 }),
      modeEnum: Object.freeze({ 'agent': 1, 'member': 2 }),
      agentBalanceInfo: {},
      errorTips: ''
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
      if (this.operationType === this.operationEnum.depositBalance) {
        return this.agentBalanceInfo.parentId === 1 ? 'oo' : numberFormat(this.agentBalanceInfo.parentBalance)
      } else {
        if (this.modeType === this.modeEnum.agent) {
          return numberFormat(this.agentBalanceInfo.agentBalance)
        } else {
          return numberFormat(this.agentBalanceInfo.memberBalance)
        }
      }
    },
    operateName() {
      if (this.modeType === this.modeEnum.agent) {
        return this.agentBalanceInfo.agent
      } else {
        return this.agentBalanceInfo.member
      }
    },
    balance() {
      if (this.modeType === this.modeEnum.agent) {
        return numberFormat(this.agentBalanceInfo.agentBalance)
      } else {
        return numberFormat(this.agentBalanceInfo.memberBalance)
      }
    },
    enoughBalance() {
      if (this.operationType === this.operationEnum.depositBalance) {
        return Number(this.agentBalanceInfo.parentBalance) > 0
      } else {
        if (this.modeType === this.modeEnum.agent) {
          return Number(this.agentBalanceInfo.agentBalance) > 0
        } else {
          return Number(this.agentBalanceInfo.memberBalance) > 0
        }
      }
    },
    accountTitle() {
      if (this.modeType === this.modeEnum.agent) {
        return this.$t('__agentAccount')
      } else {
        return this.$t('__memberAccount')
      }
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        // this.$refs.form.clearValidate()
        this.inputType = 'password'
        this.passwordState = this.inputState.none
        this.errorTips = ''
      }
    }
  },
  methods: {
    showPasswordType() {
      this.inputType = this.inputType === '' ? 'password' : '';
    },
    checkPassword() {
      this.passwordState = this.form.userPassword ? this.inputState.success : this.inputState.error
    },
    inputFocus_balance() {
      this.errorTips = ''
    },
    inputFocus_password() {
      this.errorTips = ''
      this.passwordState = this.inputState.none
    },
    onSubmit() {
      const num = Number(this.form.amount)
      // 判斷格式
      if (!this.form.amount || this.form.amount.length <= 0 || isNaN(num) || num <= 0) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }
      // 判斷數值有無超過範圍
      if (this.operationType === this.operationEnum.depositBalance) {
        if (this.agentBalanceInfo.parentId !== 1 && num > Number(this.agentBalanceInfo.parentBalance)) {
          this.errorTips = this.$t('__overMax')
          return
        }
      } else if (this.operationType === this.operationEnum.withdrawBalance) {
        if (num > Number(this.agentBalanceInfo.agentBalance)) {
          this.errorTips = this.$t('__overMax')
          return
        }
      }

      const data = JSON.parse(JSON.stringify(this.form))
      if (this.operationType === this.operationEnum.depositBalance) {
        this.$emit('depositBalance', data)
      } else if (this.operationType === this.operationEnum.withdrawBalance) {
        this.$emit('withdrawBalance', data)
      }

      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.confirmMsg(`${this.$t('__confirmOperation')}?`, () => {
      //       const data = JSON.parse(JSON.stringify(this.form))
      //       if (this.operationType === this.operationEnum.depositBalance) {
      //         this.$emit('depositBalance', data)
      //       } else if (this.operationType === this.operationEnum.withdrawBalance) {
      //         this.$emit('withdrawBalance', data)
      //       }
      //     })
      //   }
      // })
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

.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0,0,0,0.5);
  z-index: 3;
}

</style>
