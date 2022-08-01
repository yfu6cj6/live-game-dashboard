<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="agentInfo">
      <span class="header">{{ nameLabel }}</span>
      <span class="content">{{ form.fullName }}</span>
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
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'ModPasswordDialog',
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
      rules: {
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newPassword_confirmation: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      dialogLoading: false
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
          this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
            const data = JSON.parse(JSON.stringify(this.form))
            this.$emit('modPassword', data)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.agentInfo {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  display: flex;
  .header {
    color: $yellow;
    margin-right: 20px;
  }
  .content {
    color: #fff;
  }
}

</style>
