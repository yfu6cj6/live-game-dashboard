<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div id="add-edit-white-list" class="add-edit-white-list">
        <div class="notice-cover" @click="onClose" />
        <div class="form-container">
          <div class="white-list-scroll scroll-wrap flex-column flex-fill">
            <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
              <div class="scroll-view flex-column flex-fill">
                <form class="el-form">
                  <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.account.state === inputState.error, 'is-success': inputData.account.state === inputState.success}">
                    <label for="userName" class="el-form-item__label">{{ $t('__agentOrSubAccount') }}</label>
                    <div class="el-form-item__content">
                      <div class="el-input">
                        <input v-model="editForm.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.account)" @change="checkInput()" @blur="checkInput()">
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner" />
                          <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account.state === inputState.error, 'el-icon-success': inputData.account.state === inputState.success}" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.ip.state === inputState.error, 'is-success': inputData.ip.state === inputState.success}">
                    <label for="domain" class="el-form-item__label">IP</label>
                    <div class="el-form-item__content">
                      <div class="el-input">
                        <input v-model="editForm.ip" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.ip)" @change="checkInput()" @blur="checkInput()">
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner" />
                          <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.ip.state === inputState.error, 'el-icon-success': inputData.ip.state === inputState.success}" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item button-group el-form-item--feedback">
                    <div class="el-form-item__content">
                      <div class="el-row is-align-middle el-row--flex">
                        <button type="button" class="el-button bg-yellow w-100 el-button--primary" @click="onSubmit">
                          <span>{{ $t('__submit') }}</span>
                        </button>
                        <button type="button" class="el-button bg-gray w-100 el-button--primary" @click="onClose">
                          <span>{{ $t('__cancel') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="form-alert">
                  <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade hidden">
                    <i class="el-alert__icon el-icon-info" />
                    <div class="el-alert__content">
                      <span v-if="errorTips !== ''" class="el-alert__title">{{ errorTips }}</span>
                      <i class="el-alert__closebtn el-icon-close" style="display: none;" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item :label="$t('__account')" prop="account">
            <el-input v-model="editForm.account" />
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="editForm.ip" />
          </el-form-item>
        </el-form>
        <span v-if="!dialogLoading" slot="bodyFooter">
          <el-button class="bg-gray" @click="onReset">{{ $t("__reset") }}</el-button>
          <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon';
import Dialog from '@/components/Dialog'

export default {
  name: 'EditDialog',
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
      inputData: {
        account: {
          type: 0,
          state: 0
        },
        ip: {
          type: 1,
          state: 0
        }
      },
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validate }],
        ip: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      errorTips: ''
    }
  },
  computed: {
  },
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
      }
    }
  },
  methods: {
    inputFocus(input) {
      input.state = this.inputState.none
    },
    checkInput() {
      this.errorTips = ''
      if (!this.editForm.account || this.editForm.account.length <= 0) {
        this.inputData.account.state = this.inputState.error
        this.errorTips = this.editForm.account.length > 0 ? `${this.$t('__agentOrSubAccount')}${this.$t('__formatInvalid')}` : ''
      } else {
        this.inputData.account.state = this.inputState.success
      }
      if (!this.checkIpValid()) {
        this.inputData.ip.state = this.inputState.error
        if (this.errorTips === '' && this.editForm.ip.length > 0) {
          this.errorTips = `IP${this.$t('__formatInvalid')}`
        }
      } else {
        this.inputData.ip.state = this.inputState.success
      }
    },
    checkIpValid() {
      if (!this.editForm.ip || this.editForm.ip.length <= 0) {
        return false
      }

      var strs = this.editForm.ip.split('.')
      if (strs.length !== 4) {
        return false
      }

      var valid = true
      for (let i = 0; i < strs.length; i++) {
        if (strs[i].length <= 0) {
          valid = false;
          break;
        }
        try {
          if (isNaN(Number(strs[i]))) {
            valid = false;
            break;
          }
        } catch (e) {
          valid = false;
          break;
        }
      }
      return valid
    },
    onSubmit() {
      if (this.inputData.account.state === this.inputState.error || this.inputData.ip.state === this.inputState.error) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }

      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
      // this.$refs.editForm.validate((valid) => {
      //   if (valid) {
      //     this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
      //   }
      // })
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.errorTips = ''
      this.inputData.account.state = this.inputState.none
      this.inputData.ip.state = this.inputState.none
      this.$nextTick(() => {
        // this.$refs.editForm.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0,0,0,0.5);
}

.el-form {
  margin-bottom: 10px;
}
</style>
