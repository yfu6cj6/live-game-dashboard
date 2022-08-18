<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="popup-page">
        <div class="w-100 pt-3 pb-3">
          <el-steps v-if="visible" :active="curIndex" class="form-step" finish-status="success">
            <el-step v-if="hasStep('agentInfo')" />
            <el-step v-if="hasStep('rate')" />
            <el-step v-if="hasStep('limit')" />
            <el-step v-if="hasStep('balanceConfig')" />
            <el-step v-if="hasStep('confirm')" />
          </el-steps>
          <div v-if="hasError" class="form-alert">
            <div role="alert" class="el-alert el-alert--warning is-light fade show">
              <i class="el-alert__icon el-icon-warning" />
              <div class="el-alert__content">
                <span class="el-alert__title">{{ $t('__pleaseCheckFormContent') }}</span>
                <i class="el-alert__closebtn el-icon-close" style="display: none;" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-step-content flex-column flex-fill">
          <div class="parent-info">{{ `${$t('__superiorAgent')}: ${agentInfo.fullName}` }}</div>
          <div v-show="curIndex === stepEnum.agentInfo" class="flex-column flex-fill scroll-inner" :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`">
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__agentInfo') }}</label>
              <div class="step-content">
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="d-flex align-items-center">
                      <label class="form-item-label">{{ $t('__accountGenerateMode') }}</label>
                      <el-switch
                        v-model="autoGenerateAccount"
                        :active-text="$t('__auto')"
                        :inactive-text="$t('__manual')"
                      />
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': step1.account.hasError, 'is-success': step1.account.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__account') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-input el-input--small">
                      <input v-model="form.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.account)" @blur="inputChange(step1.account, form.account)" @change="inputChange(step1.account, form.account)">
                      <span v-if="step1.account.hasError || step1.account.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i v-if="step1.account.hasError" class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i v-if="step1.account.isSuccess" class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': step1.nickname.hasError, 'is-success': step1.nickname.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__name') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-input el-input--small">
                      <input v-model="form.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.nickname)" @blur="inputChange(step1.nickname, form.nickname)" @change="inputChange(step1.nickname, form.nickname)">
                      <span v-if="step1.nickname.hasError || step1.nickname.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i v-if="step1.nickname.hasError" class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i v-if="step1.nickname.isSuccess" class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': step1.password.hasError, 'is-success': step1.password.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__password') }}</label>
                      <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input v-model="form.password" :type="step1.password.type" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.password)" @blur="passwordChange(step1.password, form.password)" @change="passwordChange(step1.password, form.password)">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.password.type!=='password'}" @click="showPassword(step1.password)" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': step1.confirmPassword.hasError, 'is-success': step1.confirmPassword.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input v-model="form.confirmPassword" :type="step1.confirmPassword.type" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.confirmPassword)" @blur="confirmPasswordChange" @change="confirmPasswordChange">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.confirmPassword.type!=='password'}" @click="showPassword(step1.confirmPassword)" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__accountStatus') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.status" class="el-select w-100">
                      <option v-for="item in accountStatusType" :key="item.key" :value="item.key">
                        {{ $t(item.nickname) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__timeZone') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.time_zone" class="el-select w-100">
                      <option v-for="item in time_zone" :key="item.id" :value="item.id">
                        {{ $t(item.city_name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="showCurrency" class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__currency') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.currency" class="el-select w-100">
                      <option v-for="item in currency" :key="item.id" :value="item.id">
                        {{ $t(item.name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__remark') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-textarea el-input--small">
                      <textarea v-model="form.remark" autocomplete="off" class="el-textarea__inner" style="min-height: 48.0625px;" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div v-show="curIndex === stepEnum.rate" class="flex-column flex-fill scroll-inner" :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`">
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__rate') }}</label>
              <div id="step-1" class="step-content">
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__commissionRate')}` }}</label>
                        <small class="tip small">
                          {{ `${$t('__range')} :0 % - ${agentInfo.live_commission_rate} %` }}
                        </small>
                      </div>
                      <div class="text-field share el-input el-input--small">
                        <input v-model="form.live_commission_rate" type="text" autocomplete="off" step="0.01" class="el-input__inner">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__rollingRate')}` }}</label>
                        <small class="tip small">
                          {{ `${$t('__range')} :0 % - ${agentInfo.live_rolling_rate} %` }}
                        </small>
                      </div>
                      <div class="text-field share el-input el-input--small">
                        <input v-model="form.live_rolling_rate" type="text" autocomplete="off" step="0.01" class="el-input__inner">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="step-content">
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button v-if="previousBtnVisible" type="button" class="el-button bg-gray el-button--primary" @click="onPreviousBtnClick">
                  <span>{{ $t('__previous') }}</span>
                </button>
                <button v-if="nextBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onNextBtnClick">
                  <span>{{ $t('__nextStep') }}</span>
                </button>
                <button v-if="confirmBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                  <span>{{ confirm }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { agentCreateAccount, agentCreate, agentEdit } from '@/api/agentManagement/agent'
import { mapGetters } from 'vuex'

export default {
  name: 'AgentEditDialog',
  mixins: [dialogCommon, common],
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
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
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
    'stepEnum': {
      type: Object,
      require: true,
      default() {
        return Object.freeze({ 'agentInfo': 0, 'rate': 1, 'limit': 2, 'balanceConfig': 3, 'confirm': 4 })
      }
    }
  },
  data: function() {
    return {
      operationEnum: Object.freeze({ 'create': 1, 'edit': 2 }),
      autoGenerateAccount: false,
      curIndex: 0,
      time_zone: [],
      currency: [],
      agentBalanceInfo: {},
      step1: {
        account: {
          hasError: false,
          isSuccess: false
        },
        nickname: {
          hasError: false,
          isSuccess: false
        },
        password: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        },
        confirmPassword: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        }
      },
      hasError: false
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType'
    ]),
    previousBtnVisible() {
      return this.curIndex > this.stepEnum.agentInfo
    },
    nextBtnVisible() {
      return this.curIndex < this.stepEnum.confirm
    },
    confirmBtnVisible() {
      return this.curIndex >= this.stepEnum.confirm
    },
    showCurrency() {
      return this.operationType === this.operationEnum.create && this.agentInfo.id === 1
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.curIndex = this.stepEnum.agentInfo
      } else {
        this.autoGenerateAccount = false
      }
    },
    autoGenerateAccount() {
      if (this.autoGenerateAccount) {
        agentCreateAccount().then((res) => {
          this.form.account = res.account
        }).catch(() => {
          this.autoGenerateAccount = false
        })
      }
    },
    curIndex() {
      // if (this.curIndex === this.stepEnum.limit) {
      //   this.agentInfo.handicaps.forEach(agentInfoHandicap => {
      //     if (this.form.handicaps.some(formHandicaps => formHandicaps.id === agentInfoHandicap.id)) {
      //       this.$refs.handicapsTable.toggleRowSelection(agentInfoHandicap, true)
      //     }
      //   })
      // } else if (this.curIndex === this.stepEnum.balanceConfig) {
      //   const id = this.operationType === this.operationEnum.create ? this.agentInfo.id : this.form.id
      //   this.dialogLoading = true
      //   const data = { agentId: id, actType: 'create' }
      //   agentGetSetBalanceInfo(data).then((res) => {
      //     this.agentBalanceInfo = res.rows
      //     this.agentBalanceInfo.agent = `${this.form.nickname}(${this.form.account})`
      //     this.dialogLoading = false
      //   }).catch(() => {
      //     this.dialogLoading = false
      //   })
      // }
    }
  },
  methods: {
    confirmPasswordChange() {
      const check = this.form.confirmPassword && this.form.password === this.form.confirmPassword
      this.step1.confirmPassword.isSuccess = check
      this.step1.confirmPassword.hasError = !check
      return check
    },
    passwordChange(attributes, model) {
      if (model && model.length >= 5) {
        attributes.isSuccess = true
        attributes.hasError = false
        return true
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
        return false
      }
    },
    showPassword(attributes) {
      if (attributes.type === 'password') {
        attributes.type = ''
      } else {
        attributes.type = 'password'
      }
    },
    inputChange(attributes, model) {
      if (model) {
        attributes.isSuccess = true
        attributes.hasError = false
        return true
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
        return false
      }
    },
    inputFocus(attributes) {
      attributes.hasError = false
    },
    hasStep(step) {
      for (const stepKey in this.stepEnum) {
        if (step === stepKey) {
          return true
        }
      }
      return false
    },
    onNextBtnClick() {
      let next = false
      if (this.curIndex === this.stepEnum.agentInfo) {
        let success = true
        if (!this.inputChange(this.step1.account, this.form.account)) {
          success = false
        }
        if (!this.inputChange(this.step1.nickname, this.form.nickname)) {
          success = false
        }
        if (!this.passwordChange(this.step1.password, this.form.password)) {
          success = false
        }
        if (!this.confirmPasswordChange()) {
          success = false
        }

        if (success) {
          this.hasError = false
          next = true
        } else {
          this.hasError = true
        }
      } else if (this.curIndex === this.stepEnum.rate) {
        console.log(1)
      } else if (this.curIndex === this.stepEnum.limit) {
        console.log(2)
      } else if (this.curIndex === this.stepEnum.balanceConfig) {
        console.log(3)
      }

      if (next) {
        this.curIndex++
      }
    },
    onPreviousBtnClick() {
      this.curIndex--
    },
    onSubmit() {
      this.$refs.step5.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          data.handicaps = []
          if (this.operationType === this.operationEnum.create) {
            data.parent = this.agentInfo.id
            this.dialogLoading = true
            agentCreate(data).then((res) => {
              this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
              this.dialogLoading = false
            }).catch(() => {
              this.dialogLoading = false
            })
          } else if (this.operationType === this.operationEnum.edit) {
            this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
              this.dialogLoading = true
              agentEdit(data).then((res) => {
                this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
                this.dialogLoading = false
              }).catch(() => {
                this.dialogLoading = false
              })
            })
          }
        }
      })
    },
    setTimeZone(data) {
      this.time_zone = data
    },
    setCurrency(data) {
      this.currency = data
    }
  }
}
</script>

<style lang="scss" scoped>
#step-1 {
  &.step-content {
    padding: 0 1.66667rem;
    position: relative;
    z-index: 0;
    .form-item-inner {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin: 0;
      .label-group {
        display: block;
        margin: 0.83333rem 0;
        width: 60%;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        .tip {
          margin-left: 0;
          width: 100%;
          margin-top: 0.41667rem;
          font-size: .91667rem;
        }
        label {
          width: 100%;
        }
      }
      .el-input__inner {
        text-align: center;
      }
    }
  }
}
</style>
