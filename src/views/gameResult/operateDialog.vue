<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="scroll-wrap float">
          <div class="scroll-inner off">
            <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
              <div class="text-white text-center">{{ content }}</div>
              <div class="text-red pt-3 pb-3 w-100 mt-1">
                <form class="el-form el-form--label-left">
                  <div class="el-form-item operator-psw custom-psw mr-auto ml-0 el-form-item--small" :class="{'is-error': hasError, 'is-success': isSuccess}">
                    <div class="el-form-item__content">
                      <div class="value-group">
                        <div class="el-input el-input--small el-input--suffix">
                          <input v-model="form.userPassword" :type="userPasswordType" autocomplete="off" :placeholder="$t('__userPassword')" class="el-input__inner" @focus="passwordFocus" @blur="passwordChange" @change="passwordChange">
                          <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                              <i class="el-input__icon el-icon-error el-input__validateIcon has-error" />
                              <i class="el-input__icon el-icon-success el-input__validateIcon no-error" />
                              <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType!=='password'}" @click="showUserPasswordType" />
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
      <Dialog v-loading="dialogLoading" :title="title" :visible.sync="visible" :width="formWidth" :before-close="onClose" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="contentClass">
          <span>{{ content }}</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <el-form-item :label="$t('__userPassword')" prop="userPassword">
            <el-input v-model="form.userPassword" show-password />
          </el-form-item>
        </el-form>
        <span v-show="!dialogLoading" slot="footer">
          <el-button class="bg-yellow" @click="onSubmit">{{ $t('__confirm') }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon';
import Dialog from '@/components/Dialog'

export default {
  name: 'OperateDialog',
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
    'content': {
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
    return {
      rules: {
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      dialogLoading: false,
      userPasswordType: 'password',
      hasError: false,
      errorTip: '',
      isSuccess: false
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        // this.$refs.form.clearValidate()
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
        this.errorTip = this.$t('__pleaseCheckFormContent')
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
    },
    onClose() {
      this.$emit('close')
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

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

.contentClass {
  text-align: center;
  color: $yellow;
  padding-top: 10px;
  margin-bottom: 10px;
}

.el-form {
  margin-bottom: 10px;
}
</style>
