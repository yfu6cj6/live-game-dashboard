<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="notice-cover" @click.stop="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="scroll-wrap float">
          <div id="scroll-inner" class="scroll-inner off">
            <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
              <div class="inferior-psw">
                <div class="w-100">
                  <div class="notice-tip text-white pb-3">{{ `${$t('__account')} : ${form.account}` }}</div>
                  <div class="notice-text">
                    <form class="el-form el-form--label-left">
                      <div class="el-form-item custom-psw el-form-item--small" :class="{'is-error': inputData.newPassword.state === inputState.error, 'is-success': inputData.newPassword.state === inputState.success}">
                        <div class="el-form-item__content">
                          <div class="label-group">
                            <label class="form-item-label w-100 text-yellow">{{ $t('__newPassword') }}</label>
                            <div class="tip">{{ `${$t('__lengthLess')}5` }}</div>
                          </div>
                          <div class="el-input el-input--small el-input--suffix">
                            <input v-model="form.newPassword" :type="inputData.newPassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.newPassword)" @change="checkNewPassword()" @blur="checkNewPassword()">
                            <span class="el-input__suffix">
                              <span class="el-input__suffix-inner">
                                <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.newPassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.newPassword)" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="el-form-item custom-psw el-form-item--small" :class="{'is-error': inputData.confirmPassword.state === inputState.error, 'is-success': inputData.confirmPassword.state === inputState.success}">
                        <div class="el-form-item__content">
                          <div class="label-group">
                            <label class="form-item-label text-yellow">{{ $t('__confirmPassword') }}</label>
                          </div>
                          <div class="el-input el-input--small el-input--suffix">
                            <input v-model="form.newPassword_confirmation" :type="inputData.confirmPassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.confirmPassword)" @change="checkConfirmPassword()" @blur="checkConfirmPassword()">
                            <span class="el-input__suffix">
                              <span class="el-input__suffix-inner">
                                <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.confirmPassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.confirmPassword)" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="el-form-item custom-psw el-form-item--small" :class="{'is-error': inputData.operatePassword.state === inputState.error, 'is-success': inputData.operatePassword.state === inputState.success}">
                        <div class="el-form-item__content">
                          <div class="label-group">
                            <label class="form-item-label text-yellow">{{ $t('__userPassword') }}</label>
                          </div>
                          <div class="el-input el-input--small el-input--suffix">
                            <input v-model="form.userPassword" :type="inputData.operatePassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.operatePassword)" @change="checkOperatePassword()" @blur="checkOperatePassword()">
                            <span class="el-input__suffix">
                              <span class="el-input__suffix-inner">
                                <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.operatePassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.operatePassword)" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="form-alert">
                    <div v-if="errorTips !== ''" role="alert" class="el-alert el-alert--error is-light">
                      <i class="el-alert__icon el-icon-error" />
                      <div class="el-alert__content">
                        <span class="el-alert__title">{{ errorTips }}</span>
                        <i class="el-alert__closebtn el-icon-close" style="display: none;" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
          <button type="button" class="el-button bg-yellow common-button w-50 el-button--primary" @click.stop="onSubmit">
            <span>{{ $t('__submit') }}</span>
          </button>
          <button type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click="onClose">
            <span>{{ $t('__cancel') }}</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        v-if="visible"
        :loading="dialogLoading"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <div class="agentInfo">
          <span class="agentInfo-header">{{ nameLabel }}</span>
          <span class="agentInfo-content">{{ form.fullName }}</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item v-if="visible" :label="$t('__newPassword')" prop="newPassword">
            <el-input v-model="form.newPassword" show-password />
          </el-form-item>
          <el-form-item v-if="visible" :label="$t('__confirmPassword')" prop="newPassword_confirmation">
            <el-input v-model="form.newPassword_confirmation" show-password />
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

export default {
  name: 'ModPasswordDialog',
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
    'nameLabel': {
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
      } else if (this.form.newPassword !== this.form.newPassword_confirmation) {
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
      } else {
        callback()
      }
    }
    return {
      inputData: {
        newPassword: {
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
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newPassword_confirmation: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      dialogLoading: false,
      errorTips: ''
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        // this.$refs.form.clearValidate()
        this.inputData.newPassword.inputType = 'password'
        this.inputData.confirmPassword.inputType = 'password'
        this.inputData.operatePassword.inputType = 'password'
        this.inputData.newPassword.state = this.inputState.none
        this.inputData.confirmPassword.state = this.inputState.none
        this.inputData.operatePassword.state = this.inputState.none
        this.errorTips = ''
      }
    }
  },
  methods: {
    showUserPasswordType(password) {
      password.inputType = password.inputType === '' ? 'password' : '';
    },
    inputFocus(password) {
      password.state = this.inputState.none
      this.errorTips = ''
    },
    checkNewPassword() {
      var valid = this.checkInputFormat(this.form.newPassword)
      this.inputData.newPassword.state = valid ? this.inputState.success : this.inputState.error
    },
    checkConfirmPassword() {
      var valid = this.checkInputFormat(this.form.newPassword_confirmation)
      if (!valid) {
        this.inputData.confirmPassword.state = this.inputState.error
        return
      }
      this.inputData.confirmPassword.state = this.form.newPassword === this.form.newPassword_confirmation ? this.inputState.success : this.inputState.error
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
      if (this.form.newPassword !== this.form.newPassword_confirmation) {
        this.errorTips = `${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`
        return
      }

      if (this.inputData.newPassword.state !== this.inputState.success ||
          this.inputData.confirmPassword.state !== this.inputState.success ||
          this.inputData.operatePassword.state !== this.inputState.success) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }

      const data = JSON.parse(JSON.stringify(this.form))
      this.$emit('modPassword', data)

      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
      //       const data = JSON.parse(JSON.stringify(this.form))
      //       this.$emit('modPassword', data)
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

#app .mobile {
  .inferior-psw {
    background-color: #000;
    width: 100%;
    .notice-tip {
      font-size: 1.33333rem;
    }
    .el-form-item {
      margin-bottom: 0.83333rem;
    }
    .el-form-item__content {
      font-size: 1rem;
      line-height: 1.66667rem;
    }
    .tip {
      font-size: .83333rem;
      color: #fff;
      line-height: 1.5 !important;
      padding-bottom: 10px;
    }
    .custom-psw {
      &.is-error{
        .has-error {
          display: inline-block;
        }
      }
      &.is-success {
        .no-error {
          display: inline-block;
        }
      }
    }
  }

  .agentInfo {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    display: flex;
    .agentInfo-header {
      color: $yellow;
      margin-right: 20px;
    }
    .agentInfo-content {
      color: #fff;
    }
  }

  .p-buttons {
    padding-top: 0.41667rem;
    padding-bottom: 0.41667rem;
  }
}
</style>
