<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="el-form-item__content item" :class="{'is-error': inputData.param.state === inputState.error, 'is-success': inputData.param.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__parameter') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.parameter" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.param.state)" @change="checkValidInput('param')" @blur="checkValidInput('param')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.param.state === inputState.error, 'el-icon-success': inputData.param.state === inputState.success}" />
              </span>
            </div>
          </div>
        </div>
        <div class="el-form-item__content item" :class="{'is-error': inputData.value.state === inputState.error, 'is-success': inputData.value.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__parameterValue') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.value" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.value.state)" @change="checkValidInput('value')" @blur="checkValidInput('value')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.value.state === inputState.error, 'el-icon-success': inputData.value.state === inputState.success}" />
              </span>
            </div>
          </div>
        </div>
        <div class="el-form-item__content item">
          <div class="label-group">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__remark') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <el-input v-model="editForm.remark" type="textarea" :rows="2" />
            </div>
          </div>
        </div>
        <div class="operate_content">
          <div class="form-alert">
            <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade show">
              <i class="el-alert__icon el-icon-warning" />
              <div class="el-alert__content">
                <span class="el-alert__title">{{ errorTips }}</span>
              </div>
            </div>
          </div>
          <div class="form-ctrl">
            <div class="el-row is-align-middle el-row--flex">
              <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                <span>{{ confirm }}</span>
              </button>
              <button type="button" class="el-button bg-gray el-button--primary" @click="onReset">
                <span>{{ $t('__reset') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel giftEditDialog backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div v-loading="dialogLoading" class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="data_content">
            <div class="w-100 d-flex justify-content-center font-weight-bold font-1_5">
              <span class="text-yellow ">{{ title }}</span>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.param.state === inputState.error, 'is-success': inputData.param.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__parameter') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.parameter" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.param.state)" @change="checkValidInput('param')" @blur="checkValidInput('param')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.param.state === inputState.error, 'el-icon-success': inputData.param.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.value.state === inputState.error, 'is-success': inputData.value.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__parameterValue') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.value" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.value.state)" @change="checkValidInput('value')" @blur="checkValidInput('value')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.value.state === inputState.error, 'el-icon-success': inputData.value.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__remark') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <el-input v-model="editForm.remark" type="textarea" :rows="5" />
                </div>
              </div>
            </div>
          </div>
          <div class="operate_content">
            <div class="form-alert">
              <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade show">
                <i class="el-alert__icon el-icon-warning" />
                <div class="el-alert__content">
                  <span class="el-alert__title">{{ errorTips }}</span>
                </div>
              </div>
            </div>
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                  <span>{{ confirm }}</span>
                </button>
                <button type="button" class="el-button bg-gray el-button--primary" @click="onReset">
                  <span>{{ $t('__reset') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon';
import { mapGetters } from 'vuex'

export default {
  name: 'EditDialog',
  components: {},
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
      rules: {
        parameter: [{ required: true, trigger: 'blur', validator: validate }],
        value: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      dialogLoading: false,
      inputData: {
        param: {
          state: 0
        },
        value: {
          state: 0
        }
      },
      errorTips: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
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
    inputFocus(state) {
      state = state === this.inputState.error ? this.inputState.none : state;
      this.errorTips = ''
    },
    checkValidInput(type) {
      if (type === '') {
        this.inputData.param.state = this.validContent(this.editForm.parameter, false) ? this.inputState.success : this.inputState.error
        this.inputData.value.state = this.validContent(this.editForm.value, false) ? this.inputState.success : this.inputState.error
        return
      }
      switch (type) {
        case 'param':
          this.inputData.param.state = this.validContent(this.editForm.parameter) ? this.inputState.success : this.inputState.error
          break;
        case 'value':
          this.inputData.value.state = this.validContent(this.editForm.value) ? this.inputState.success : this.inputState.error
          break;
      }
    },
    validContent(content) {
      const valid = content && content.length > 0
      if (!valid) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
      }
      return valid
    },
    onSubmit() {
      this.checkValidInput('')
      if (this.errorTips !== '') {
        return
      }

      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onClose() {
      this.$emit('close')
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        // this.$refs.editForm.clearValidate()
        this.inputData.param.state = this.inputState.none
        this.inputData.value.state = this.inputState.none
        this.errorTips = ''
      })
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.is-error {
  .el-input__inner {
    border-color: #f56c6c;
  }
  .el-input__validateIcon {
    color: #f56c6c;
  }
}
.is-success {
  .el-input__inner {
    border-color: #67c23a;
  }
  .el-input__validateIcon {
    color: #67c23a;
  }
}

.form-ctrl {
  padding-top: 0.41667rem;
  padding-bottom: 0.41667rem;
  width: calc(100vw - 3.33333rem);
  height: 3.33333rem;
  background: #000;
  button {
    width: 150px;
    margin: auto;
  }
}

.label-group.required:after {
  content: "*";
  color: #f56c6c;
  margin-left: 0.3rem;
  font-size: 1.5rem;
}
</style>
