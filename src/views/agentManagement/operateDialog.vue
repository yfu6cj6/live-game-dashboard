<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="scroll-wrap float">
          <div class="scroll-inner off">
            <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
              <div class="text-white text-center">{{ title }}</div>
              <div class="text-red pt-3 pb-3 w-100 mt-1">
                <form class="el-form el-form--label-left">
                  <div class="el-form-item operator-psw custom-psw mr-auto ml-0 el-form-item--small" :class="{'is-error': hasError, 'is-success': isSuccess}">
                    <div class="el-form-item__content">
                      <div class="value-group">
                        <div class="el-input el-input--small el-input--suffix">
                          <input v-model="form.userPassword" :type="userPasswordType" autocomplete="off" :placeholder="`${$t('__operator')}${$t('__password')}`" class="el-input__inner" @focus="passwordFocus" @change="passwordChange">
                          <span class="el-input__suffix" @click="showUserPasswordType">
                            <span class="el-input__suffix-inner">
                              <i class="el-input__icon el-icon-error has-error" :class="{'el-input__validateIcon': hasError}" />
                              <i class="el-input__icon el-icon-success no-error" :class="{'el-input__validateIcon': isSuccess}" />
                              <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType!=='password'}" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="text-red ml-auto mr-auto w-100">{{ errorTip }}</div>
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
          <button type="button" class="el-button bg-yellow common-button w-50 el-button--primary" @click.stop="onSubmit">
            <span>{{ $t('__confirm') }}</span>
          </button>
          <button type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click.stop="onClose">
            <span>{{ $t('__cancel') }}</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
        class="operateDialog"
      >
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item :label="$t('__userPassword')" prop="userPassword" class="disableRequiredIcon">
            <el-input ref="userPassword" v-model="form.userPassword" :type="userPasswordType" class="custom-psw">
              <template slot="suffix">
                <i class="el-input__icon el-icon-view clickable" :class="{'text-black': userPasswordType !== 'password', 'text-line-gray-shallow': userPasswordType === 'password'}" @click="showUserPasswordType" />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="bodyFooter">
          <el-button class="bg-yellow font-weight-bold" @click="onSubmit">{{ $t('__confirm') }}</el-button>
          <el-button class="bg-gray font-weight-bold" @click="onClose">{{ $t('__cancel') }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'

export default {
  name: 'OperateDialog',
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
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
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
    return {
      rules: {
        userPassword: [{ required: true, validator: validateCurrentPassword, trigger: 'blur' }]
      },
      userPasswordType: 'password',
      hasError: false,
      errorTip: '',
      isSuccess: false
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.userPasswordType = 'password'
        this.hasError = false
        this.errorTip = ''
        this.isSuccess = false
      }
    }
  },
  methods: {
    passwordChange() {
      if (this.form.userPassword) {
        this.isSuccess = true
      } else {
        this.isSuccess = false
        this.hasError = true
      }
    },
    passwordFocus() {
      this.hasError = false
      this.errorTip = ''
    },
    showUserPasswordType() {
      if (this.userPasswordType === 'password') {
        this.userPasswordType = ''
      } else {
        this.userPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.userPassword.focus()
      })
    },
    onSubmit() {
      if (!this.form.userPassword) {
        this.errorTip = this.$t('__pleaseCheckFormContent')
        this.hasError = true
        this.isSuccess = false
      } else {
        this.hasError = false
        this.isSuccess = true
        const data = JSON.parse(JSON.stringify(this.form))
        this.$emit('onSubmit', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-buttons {
  padding-top: 0.41667rem;
  padding-bottom: 0.41667rem;
}
</style>
