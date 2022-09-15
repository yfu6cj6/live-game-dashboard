<template>
  <div class="w-100 h-100 modPassword">
    <div class="scroll-wrap flex-column flex-fill">
      <div class="scroll-inner flex-column flex-fill off">
        <div class="scroll-view flex-column flex-fill">
          <div class="set-psw flex-column flex-fill">
            <div class="scroll-wrap flex-column flex-fill">
              <div class="scroll-inner flex-column flex-fill off">
                <div class="scroll-view flex-column flex-fill">
                  <div class="form-container">
                    <div class="w-100">
                      <div class="w-100 pb-4">
                        <span class="text-yellow">{{ $t('__account') }}</span>
                        <span class="text-white ml-3">{{ account }}</span>
                      </div>
                      <form class="el-form">
                        <div
                          class="el-form-item custom-psw el-form-item--feedback"
                          :class="{
                            'is-error': currentPassword.hasError,
                            'is-success': currentPassword.isSuccess}"
                        >
                          <label class="el-form-item__label">{{ $t('__currentPassword') }}</label>
                          <div class="el-form-item__content">
                            <div class="el-input el-input--small el-input--suffix">
                              <input
                                v-model="form.currentPassword"
                                :type="currentPassword.type"
                                autocomplete="off"
                                class="el-input__inner"
                                @focus="inputFocus(currentPassword)"
                                @blur="inputChange(currentPassword, form.currentPassword)"
                                @change="inputChange(currentPassword, form.currentPassword)"
                              >
                              <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                  <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                  <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                  <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': currentPassword.type!=='password'}" @click="showPassword(currentPassword)" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="clear-both" />
                        <div
                          class="el-form-item custom-psw el-form-item--feedback"
                          :class="{
                            'is-error': newPassword.hasError,
                            'is-success': newPassword.isSuccess}"
                        >
                          <label class="el-form-item__label">{{ $t('__newPassword') }}</label>
                          <div class="el-form-item__content">
                            <div class="tips">{{ `${$t('__lengthLess')}5` }}</div>
                            <div class="el-input el-input--suffix">
                              <input
                                v-model="form.newPassword"
                                :type="newPassword.type"
                                autocomplete="off"
                                class="el-input__inner"
                                @focus="inputFocus(newPassword)"
                                @blur="inputChange(newPassword, form.newPassword, 5)"
                                @change="inputChange(newPassword, form.newPassword, 5)"
                              >
                              <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                  <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                  <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                  <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': newPassword.type!=='password'}" @click="showPassword(newPassword)" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="el-form-item custom-psw el-form-item--feedback"
                          :class="{
                            'is-error': newPassword_confirmation.hasError,
                            'is-success': newPassword_confirmation.isSuccess}"
                        >
                          <label class="el-form-item__label">{{ $t('__checkNewPassword') }}</label>
                          <div class="el-form-item__content">
                            <div class="el-input el-input--suffix">
                              <input
                                v-model="form.newPassword_confirmation"
                                :type="newPassword_confirmation.type"
                                autocomplete="off"
                                class="el-input__inner"
                                @focus="inputFocus(newPassword_confirmation)"
                                @blur="confirmPasswordChange"
                                @change="confirmPasswordChange"
                              >
                              <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                  <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                  <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                  <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': newPassword_confirmation.type!=='password'}" @click="showPassword(newPassword_confirmation)" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="clear-both" />
                        <div class="el-form-item button-group el-form-item--feedback">
                          <div class="el-form-item__content">
                            <template v-if="device === 'mobile'">
                              <div class="el-row is-align-middle el-row--flex">
                                <button type="button" class="el-button bg-yellow w-100 el-button--primary" @click.stop="onSubmit">
                                  <span>{{ $t('__submit') }}</span>
                                </button>
                                <button type="button" class="el-button bg-gray w-100 el-button--primary" @click.stop="onCancel">
                                  <span>{{ $t('__cancel') }}</span>
                                </button>
                              </div>
                            </template>
                            <template v-else>
                              <div class="d-flex w-100 justify-content-center">
                                <button type="button" class="el-button bg-yellow el-button--primary" style="margin-right: 0.83333rem; width: 140px;" @click.stop="onSubmit">
                                  <span>{{ $t('__submit') }}</span>
                                </button>
                              </div>
                            </template>
                          </div>
                        </div>
                      </form>
                      <div class="form-alert">
                        <div v-show="errorTip !== ''" role="alert" class="el-alert el-alert--warning is-light fade show">
                          <i class="el-alert__icon el-icon-warning" />
                          <div class="el-alert__content">
                            <span class="el-alert__title">{{ errorTip }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { modifyPassword } from '@/api/user'
import { mapGetters } from 'vuex'
import { getMsg } from '@/utils/response'

export default {
  name: 'ModPassword',
  data() {
    return {
      form: {},
      currentPassword: {
        hasError: false,
        isSuccess: false,
        type: 'password'
      },
      newPassword: {
        hasError: false,
        isSuccess: false,
        type: 'password'
      },
      newPassword_confirmation: {
        hasError: false,
        isSuccess: false,
        type: 'password'
      },
      errorTip: ''
    }
  },
  computed: {
    ...mapGetters([
      'account',
      'device'
    ])
  },
  created() {
    this.setHeaderStyle()
    this.reset()
  },
  activated() {
    this.setHeaderStyle()
    this.reset()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__modPassword'), false, () => { }])
    },
    inputFocus(attributes) {
      attributes.hasError = false
    },
    inputChange(attributes, model, min = 1) {
      if (model && model.length >= min) {
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
    confirmPasswordChange() {
      const check = this.form.newPassword_confirmation && this.form.newPassword === this.form.newPassword_confirmation
      this.newPassword_confirmation.isSuccess = check
      this.newPassword_confirmation.hasError = !check
      return check
    },
    onSubmit() {
      let success = true
      if (!this.inputChange(this.currentPassword, this.form.currentPassword)) {
        success = false
      }
      if (!this.inputChange(this.newPassword, this.form.newPassword, 5)) {
        success = false
      }
      if (!this.confirmPasswordChange()) {
        success = false
      }
      if (success) {
        this.setDataLoading(true)
        modifyPassword(this.form).then(() => {
          this.setDataLoading(false)
          this.$store.dispatch('user/setModPwdState', false)
          this.reset()
          this.$message({
            message: 'Modify successfully',
            type: 'success'
          })
        }).catch((response) => {
          this.errorTip = getMsg(response.data.message)
          this.setDataLoading(false)
        })
      } else {
        this.errorTip = this.$t('__pleaseCheckFormContent')
      }
    },
    onCancel() {
      this.$router.push({ path: '/home' })
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    },
    reset() {
      this.form.currentPassword = ''
      this.form.newPassword = ''
      this.form.newPassword_confirmation = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.modPassword{
  .set-psw {
    .form-container {
      max-width: 31.25rem;
      padding: 2.5rem;
      margin: 0 auto;
      .el-form-item {
        width: 25rem;
        .el-form-item__label {
          width: 100%;
          text-align: left;
          color: #f9c901;
          line-height: 1rem;
          font-size: 1.16667rem;
        }
        .el-form-item__content {
          line-height: 3.4rem;
          font-size: 1.16667rem;
          .tips {
            color: #fff !important;
            font-size: 1rem;
            line-height: 1.2;
          }
          .el-input {
            .el-input__inner {
              border-radius: 0.25rem;
              border: 0.08333rem solid #f9c901;
              background-color: #fff;
              padding: 0.83333rem;
              height: 2.91667rem;
              line-height: 2.5rem;
              font-size: 1.33333rem;
              color: #000;
            }
            .el-input__suffix {
              .el-input__suffix-inner {
                .el-input__icon {
                  line-height: 3.2rem;
                }
              }
            }
          }
          .el-button {
            margin-top: 0.83333rem;
            margin-bottom: 0.83333rem;
            font-weight: bold;
          }
        }
      }
      .clear-both {
        width: 100%;
        display: block;
        clear: both;
      }
    }
  }
}
</style>
