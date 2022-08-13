<template>
  <Dialog
    :loading="dialogLoading"
    class="modPwdDialog"
    :title="`${$t('__firstLoginModPassword')}`"
    :close-on-click-modal="false"
    :show-close="false"
  >
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
    <span slot="bodyFooter">
      <el-button class="bg-yellow font-weight-bold" @click.native.prevent="onSubmit">{{ $t('__submit') }}</el-button>
      <el-button class="bg-gray font-weight-bold" @click.native.prevent="onLogout">{{ $t('__logout') }}</el-button>
    </span>
  </Dialog>
</template>

<script>
import { modifyPassword } from '@/api/user'
import { mapGetters } from 'vuex'
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'ModPwdDialog',
  components: { Dialog },
  mixins: [dialogCommon],
  props: {
    'visible': {
      type: Boolean,
      require: true
    }
  },
  data: function() {
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
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
      }
    }
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
          this.dialogLoading = true
          modifyPassword(this.form).then(() => {
            this.dialogLoading = false
            this.$store.dispatch('user/setModPwdState', false)
            this.reset()
            this.$message({
              message: 'Modify successfully',
              type: 'success'
            })
          }).catch(() => {
            this.dialogLoading = false
          })
        }
      })
    },
    onLogout() {
      this.$router.push({ path: '/logout' })
    },
    reset() {
      this.form.currentPassword = ''
      this.form.newPassword = ''
      this.form.newPassword_confirmation = ''
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.modPwdDialog {
  .account-info {
    color: $yellow;
    display: inline-block;
    padding-bottom: 2rem;
    font-size: 1.4rem;
    span {
      padding-left: .7rem;
      color: #fff;
    }
  }
  .el-form {
    margin-bottom: .7rem;
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__content {
        line-height: 2rem;
        margin-bottom: 2.1rem;
        .el-form-item__error {
          top: 100%;
        }
        .item {
          color: $yellow;
        }
        .custom-psw {
          .el-icon-view {
            display: inline-block;
          }
          .el-input__inner {
            height: 100%;
          }
          &.el-input {
            height: 3rem;
          }
          .el-input__suffix {
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .el-form-item.newPassword {
      .el-form-item__content {
        .item {
          display: flex;
          flex-direction: column;
          .newPasswordTip {
            color: #fff;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
}
</style>
