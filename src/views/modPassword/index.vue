<template>
  <div>
    -
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
        this.validateCurrentPassword = 2
        callback(new Error(this.$t('__requiredField')))
      } else {
        this.validateCurrentPassword = 1
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (!value) {
        this.validateNewPassword = 2
        callback(new Error(this.$t('__requiredField')))
      } else if (value.trim().length < 5) {
        this.validateNewPassword = 2
        callback(new Error(this.$t('__lengthLess') + '5'))
      } else {
        this.validateNewPassword = 1
        callback()
      }
    }
    const validateConfirmNewPassword = (rule, value, callback) => {
      if (!value) {
        this.validateConfirmNewPassword = 2
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.newPassword !== this.form.newPassword_confirmation) {
        this.validateConfirmNewPassword = 2
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
      } else {
        this.validateConfirmNewPassword = 1
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
      validateCurrentPassword: 0,
      validateNewPassword: 0,
      validateConfirmNewPassword: 0,
      newPasswordType: 'password',
      confirmationNewPasswordType: 'password'
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ]),
    checkInput() {
      return this.form.currentPassword && this.form.newPassword && !this.form.newPassword_confirmation
    },
    currentPasswordValidateSuccess() {
      return this.validateCurrentPassword === 1
    },
    currentPasswordValidateError() {
      return this.validateCurrentPassword === 2
    },
    newPasswordValidateSuccess() {
      return this.validateNewPassword === 1
    },
    newPasswordValidateError() {
      return this.validateNewPassword === 2
    },
    confirmNewPasswordValidateSuccess() {
      return this.validateConfirmNewPassword === 1
    },
    confirmNewPasswordValidateError() {
      return this.validateConfirmNewPassword === 2
    }
  },
  methods: {
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

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
