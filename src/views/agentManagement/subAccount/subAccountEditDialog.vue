<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="flex-column flex-fill" style="background: rgb(0, 0, 0);">
        <div class="flex-column flex-fill">
          <div class="flex-column flex-fill">
            <div v-loading="dialogLoading" class="agent-form subAccount-form popup-page flex-column flex-fill h-100">
              <div class="form-alert">
                <div v-show="errorTips === ''" class="parent-info">{{ `${$t('__superiorAgent')}: ${agentInfo.account}` }}</div>
                <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade show">
                  <i class="el-alert__icon el-icon-warning" />
                  <div class="el-alert__content">
                    <span class="el-alert__title">{{ errorTips }}</span>
                    <i class="el-alert__closebtn el-icon-close" style="display: none;" />
                  </div>
                </div>
              </div>
              <div class="form-step-content flex-column flex-fill">
                <form class="el-form flex-column flex-fill el-form--label-left">
                  <div class="scroll-wrap flex-column flex-fill">
                    <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
                      <div class="scroll-view flex-column flex-fill">
                        <div class="initPswFormat">
                          <input type="text" name="uuu">
                          <input type="password" name="uuu">
                        </div>
                        <label class="form-item-title">{{ $t('__subAccountBaseInfo') }}</label>
                        <div class="step-content">
                          <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.account.state === inputState.error, 'is-success': inputData.account.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__account') }}</label>
                                <small v-if="operationType === operationEnum.create" class="tip">{{ `${$t('__lengthLess')}5` }}</small>
                              </div>
                              <div class="d-flex">
                                <div class="el-input el-input--small" :class="{'is-disabled': operationType === operationEnum.edit}">
                                  <input v-if="operationType === operationEnum.create" v-model="form.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.account)" @change="checkAccount()" @blur="checkAccount()">
                                  <input v-if="operationType === operationEnum.edit" v-model="form.account" disabled="disabled" type="text" autocomplete="off" class="el-input__inner">
                                  <span v-if="operationType === operationEnum.create" class="el-input__suffix">
                                    <span class="el-input__suffix-inner" />
                                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account.state === inputState.error, 'el-icon-success': inputData.account.state === inputState.success}" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.nickname.state === inputState.error, 'is-success': inputData.nickname.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__nickname') }}</label>
                                <small class="tip">{{ `${$t('__lengthLess')}1` }}</small>
                              </div>
                              <div class="el-input el-input--small">
                                <input v-model="form.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.nickname)" @change="checkNickName()" @blur="checkNickName()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner" />
                                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.nickname.state === inputState.error, 'el-icon-success': inputData.nickname.state === inputState.success}" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div v-if="operationType === operationEnum.create" class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.password.state === inputState.error, 'is-success': inputData.password.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__password') }}</label>
                                <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input v-model="form.password" :type="inputData.password.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.password)" @change="checkPassword()" @blur="checkPassword()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.password.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.password)" />
                                  </span>
                                  <i class="el-input__icon el-input__validateIcon el-icon-error" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div v-if="operationType === operationEnum.create" class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.confirmPassword.state === inputState.error, 'is-success': inputData.confirmPassword.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input v-model="form.confirmPassword" :type="inputData.confirmPassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.confirmPassword)" @change="checkConfirmPassword()" @blur="checkConfirmPassword()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.confirmPassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.confirmPassword)" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.confirmPassword.state === inputState.error, 'is-success': inputData.confirmPassword.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__accountStatus') }}</label>
                              </div>
                              <select v-model="form.status" class="el-select w-100">
                                <option v-for="item in accountStatusType" :key="item.key" :value="item.key">
                                  {{ $t(item.nickname) }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.confirmPassword.state === inputState.error, 'is-success': inputData.confirmPassword.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__timeZone') }}</label>
                              </div>
                              <select v-model="form.timeZone" class="el-select w-100">
                                <option v-for="item in time_zone" :key="item.id" :value="item.id">
                                  {{ $t(item.city_name) }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div v-if="operationType===operationEnum.create&&visible" class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="align-items-center pt-2">
                                <label class="el-checkbox" :class="{'is-checked': form.effectAgentLine === '1'}">
                                  <span class="el-checkbox__input" :class="{'is-checked': form.effectAgentLine === '1'}">
                                    <span class="el-checkbox__inner" />
                                    <input v-model="form.effectAgentLine" type="checkbox" aria-hidden="false" true-value="1" false-value="0" class="el-checkbox__original">
                                  </span>
                                </label>
                                <span class="text-yellow">{{ $t('__effectAgentLine') }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="align-items-center pt-2">
                                <label class="el-checkbox" :class="{'is-checked': form.isAdmin === '1'}">
                                  <span class="el-checkbox__input" :class="{'is-checked': form.isAdmin === '1'}">
                                    <span class="el-checkbox__inner" />
                                    <input v-model="form.isAdmin" type="checkbox" aria-hidden="false" true-value="1" false-value="0" class="el-checkbox__original">
                                  </span>
                                </label>
                                <span class="text-yellow">{{ $t('__admin') }}</span>
                              </div>
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
                          <div class="el-form-item operator-psw custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': inputData.operatePassword.state === inputState.error, 'is-success': inputData.operatePassword.state === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__userPassword') }}</label>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input v-model="form.userPassword" :type="inputData.operatePassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.operatePassword)" @change="checkOperatePassword()" @blur="checkOperatePassword()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.operatePassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.operatePassword)" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="w-100 p-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="step-content">
                    <div class="form-ctrl">
                      <div class="el-row is-align-middle el-row--flex">
                        <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                          <span>{{ $t('__submit') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog v-if="visible" :loading="dialogLoading" :title="title" :on-close-even="onClose" :close-on-click-modal="device === 'mobile'" :close-on-press-escape="false">
        <label class="agentNameLabel">{{ `${$t('__superiorAgent')}: ` }}
          <span class="agentNameSpan">{{ agentInfo.fullName }}</span>
        </label>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <el-form-item :label="$t('__accountGenerateMode')">
            <el-switch
              v-model="autoGenerateAccount"
              :active-color="color_yellow"
              :inactive-color="color_yellow"
              :active-text="$t('__auto')"
              :inactive-text="$t('__manual')"
            />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__account')" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item :label="$t('__nickname')" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__password')" prop="password">
            <el-input v-model="form.password" show-password />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__confirmPassword')" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" show-password />
          </el-form-item>
          <el-form-item :label="$t('__accountStatus')" prop="status">
            <el-select v-model="form.status">
              <el-option v-for="item in accountStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__timeZone')" prop="timeZone">
            <el-select v-model="form.timeZone">
              <el-option v-for="item in time_zone" :key="item.id" :label="item.city_name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.effectAgentLine" class="red-tick" :label="$t('__effectAgentLine')" />
            <el-checkbox v-model="form.isAdmin" class="red-tick" :label="$t('__admin')" />
          </el-form-item>
          <el-form-item :label="$t('__remark')" prop="remark">
            <el-input v-model="form.remark" type="textarea" :rows="2" />
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
import colors from '@/styles/variables.scss'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { subAccountCreateAccount, subAccountCreate, subAccountEdit } from '@/api/agentManagement/subAccount'
import { mapGetters } from 'vuex'
import Dialog from '@/components/Dialog'

export default {
  name: 'SubAccountEditDialog',
  components: { Dialog },
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
    'confirm': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
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
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (value.trim().length < 5) {
        callback(new Error(this.$t('__lengthLess') + '5'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.password !== this.form.confirmPassword) {
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
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
      inputData: {
        account: {
          state: 0
        },
        nickname: {
          state: 0
        },
        password: {
          inputType: 'password',
          state: 0
        },
        confirmPassword: {
          inputType: 'password',
          state: 0
        },
        operatePassword: {
          inputType: 'password',
          state: 0
        }
      },
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validatePassword }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      operationEnum: Object.freeze({ 'create': 1, 'edit': 2 }),
      time_zone: [],
      autoGenerateAccount: false,
      dialogLoading: false,
      errorTips: ''
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType'
    ]),
    color_yellow() {
      return colors.yellow
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        // this.$refs.form.clearValidate()
        this.inputData.password.inputType = 'password'
        this.inputData.confirmPassword.inputType = 'password'
        this.inputData.operatePassword.inputType = 'password'
        this.inputData.password.state = this.inputState.none
        this.inputData.confirmPassword.state = this.inputState.none
        this.inputData.operatePassword.state = this.inputState.none
        this.inputData.account.state = this.inputState.none
        this.inputData.nickname.state = this.inputState.none
        this.errorTips = ''
      }
    },
    autoGenerateAccount() {
      if (this.autoGenerateAccount) {
        subAccountCreateAccount().then((res) => {
          this.form.account = res.account
          this.$refs.form.clearValidate()
        }).catch(() => {
          this.autoGenerateAccount = false
        })
      }
    }
  },
  methods: {
    showUserPasswordType(input) {
      input.inputType = input.inputType === '' ? 'password' : '';
    },
    inputFocus(input) {
      input.state = this.inputState.none
      this.errorTips = ''
    },
    checkAccount() {
      var valid = this.checkInputFormat(this.form.account)
      this.inputData.account.state = valid ? this.inputState.success : this.inputState.error
    },
    checkNickName() {
      this.inputData.nickname.state = (this.form.nickname && this.form.nickname.length > 0) ? this.inputState.success : this.inputState.error
    },
    checkPassword() {
      var valid = this.checkInputFormat(this.form.password)
      this.inputData.password.state = valid ? this.inputState.success : this.inputState.error
    },
    checkConfirmPassword() {
      var valid = this.checkInputFormat(this.form.confirmPassword)
      if (!valid) {
        this.inputData.confirmPassword.state = this.inputState.error
        return
      }
      this.inputData.confirmPassword.state = this.form.password === this.form.confirmPassword ? this.inputState.success : this.inputState.error
    },
    checkOperatePassword() {
      this.inputData.operatePassword.state = this.form.userPassword ? this.inputState.success : this.inputState.error
    },
    checkInputFormat(formData) {
      if (!formData) {
        return false
      } else if (formData.length < 5) {
        return false
      } else {
        return true
      }
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.form))
      // data.effectAgentLine = data.effectAgentLine ? '1' : '0'
      // data.isAdmin = data.isAdmin ? '1' : '0'
      if (this.operationType === this.operationEnum.create) {
        if (this.form.account.length < 5) {
          this.errorTips = `${this.$t('__account')}` + `${this.$t('__lengthLess') + '5'}`
          return
        }
        if (this.form.nickname.length < 1) {
          this.errorTips = `${this.$t('__nickname')}` + `${this.$t('__lengthLess') + '1'}`
          return
        }
        if (this.form.password !== this.form.confirmPassword) {
          this.errorTips = `${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`
          return
        }
        if (this.inputData.account.state !== this.inputState.success ||
            this.inputData.nickname.state !== this.inputState.success ||
            this.inputData.password.state !== this.inputState.success ||
            this.inputData.confirmPassword.state !== this.inputState.success ||
            this.inputData.operatePassword.state !== this.inputState.success) {
          this.errorTips = this.$t('__pleaseCheckFormContent')
          return
        }
        data.agentId = this.agentInfo.id
        this.dialogLoading = true
        subAccountCreate(data).then((res) => {
          this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      } else if (this.operationType === this.operationEnum.edit) {
        if (this.form.nickname.length < 1) {
          this.errorTips = `${this.$t('__nickname')}` + `${this.$t('__lengthLess')}1`
          return
        }
        this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
          this.dialogLoading = true
          console.log(data);
          subAccountEdit(data).then((res) => {
            this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
            this.dialogLoading = false
          }).catch(() => {
            this.dialogLoading = false
          })
        })
      }
    },
    onClose() {
      this.$emit('close')
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    },
    setTimeZone(data) {
      this.time_zone = data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox:last-of-type {
    margin-right: 0.5rem;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
