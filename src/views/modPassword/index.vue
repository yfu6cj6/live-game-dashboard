<template>
  <div class="scroll-wrap flex-column flex-fill">
    <div class="scroll-inner flex-column flex-fill off">
      <div class="scroll-view flex-column flex-fill">
        <div class="set-psw flex-column flex-fill">
          <div class="scroll-wrap flex-column flex-fill">
            <div class="scroll-inner flex-column flex-fill off">
              <div class="scroll-view flex-column flex-fill">
                <div class="modPwd-container">
                  <div>
                    <div class="account-info">
                      {{ $t('__account') }}
                      <span>{{ account }}</span>
                    </div>
                    <el-form ref="form" :model="form" :rules="rules">
                      <el-form-item prop="currentPassword">
                        <span class="item">{{ $t('__currentPassword') }}</span>
                        <el-input
                          ref="currentPassword"
                          v-model="form.currentPassword"
                          name="currentPassword"
                          :type="currentPasswordType"
                          class="custom-psw"
                        >
                          <template slot="suffix">
                            <i class="el-input__icon el-icon-view clickable" :class="{'text-black': currentPasswordType !== 'password', 'text-line-gray-shallow': currentPasswordType === 'password'}" @click="showCurrentPassword" />
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="newPassword" class="newPassword">
                        <span class="item">
                          <span>{{ $t('__newPassword') }}</span>
                          <span class="newPasswordTip">{{ `${$t('__lengthLess')}5` }}</span>
                        </span>
                        <el-input
                          :key="newPasswordType"
                          ref="newPassword"
                          v-model="form.newPassword"
                          :type="newPasswordType"
                          name="newPassword"
                          class="custom-psw"
                        >
                          <template slot="suffix">
                            <i class="el-input__icon el-icon-view clickable" :class="{'text-black': newPasswordType !== 'password', 'text-line-gray-shallow': newPasswordType === 'password'}" @click="showNewPwd" />
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="newPassword_confirmation">
                        <span class="item">{{ $t('__confirmPassword') }}</span>
                        <el-input
                          :key="confirmationNewPasswordType"
                          ref="newPassword_confirmation"
                          v-model="form.newPassword_confirmation"
                          :type="confirmationNewPasswordType"
                          name="newPassword_confirmation"
                          class="custom-psw"
                          @keyup.enter.native="onSubmit"
                        >
                          <template slot="suffix">
                            <i class="el-input__icon el-icon-view clickable" :class="{'text-black': confirmationNewPasswordType !== 'password', 'text-line-gray-shallow': confirmationNewPasswordType === 'password'}" @click="showNewConfirmationPwd" />
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <el-button class="bg-yellow font-weight-bold" @click.native.prevent="onSubmit">{{ $t('__submit') }}</el-button>
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

export default {
  name: 'ModPassword',
  data() {
    const validateCurrentPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (value.trim().length < 5) {
        callback(new Error(this.$t('__lengthLess') + '5'))
      } else {
        callback()
      }
    }
    const validateConfirmNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.newPassword !== this.form.newPassword_confirmation) {
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
      } else {
        callback()
      }
    }
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        newPassword_confirmation: ''
      },
      rules: {
        currentPassword: [{ required: true, validator: validateCurrentPassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
        newPassword_confirmation: [{ required: true, validator: validateConfirmNewPassword, trigger: 'blur' }]
      },
      submitLoading: false,
      currentPasswordType: 'password',
      newPasswordType: 'password',
      confirmationNewPasswordType: 'password'
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    showCurrentPassword() {
      if (this.currentPasswordType === 'password') {
        this.currentPasswordType = ''
      } else {
        this.currentPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.currentPassword.focus()
      })
    },
    showNewPwd() {
      if (this.newPasswordType === 'password') {
        this.newPasswordType = ''
      } else {
        this.newPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.newPassword.focus()
      })
    },
    showNewConfirmationPwd() {
      if (this.confirmationNewPasswordType === 'password') {
        this.confirmationNewPasswordType = ''
      } else {
        this.confirmationNewPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.newPassword_confirmation.focus()
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          modifyPassword(this.form).then(() => {
            this.submitLoading = false
            this.reset()
            this.$message({
              message: 'Modify successfully',
              type: 'success'
            })
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
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
.scroll-view {
  background-color: #000;
  .modPwd-container {
    height: 100%;
    padding: 2.5rem;
    .el-button {
      width: 100%;
    }
  }
}
</style>
