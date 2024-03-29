<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="el-form-item__content item" :class="{'is-error': inputAmountState === inputState.error, 'is-success': inputAmountState === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__amount') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.amount" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('id')" @blur="checkValidInput('id')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputAmountState === inputState.error, 'el-icon-success': inputAmountState === inputState.success}" />
              </span>
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
          <div class="el-form-item__content item" :class="{'is-error': inputAmountState === inputState.error, 'is-success': inputAmountState === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__amount') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.amount" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('id')" @blur="checkValidInput('id')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputAmountState === inputState.error, 'el-icon-success': inputAmountState === inputState.success}" />
                </span>
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
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'ChipEditDialog',
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
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        amount: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      dialogLoading: false,
      inputAmountState: 0,
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
    inputFocus() {
      this.inputAmountState = this.inputAmountState === this.inputState.error ? this.inputState.none : this.inputAmountState
      this.errorTips = ''
    },
    checkValidInput() {
      this.inputAmountState = this.validContent(this.editForm.amount) ? this.inputState.success : this.inputState.error
    },
    validContent(content) {
      const valid = content && content.length > 0
      if (valid) {
        const num = Number(content)
        const validNum = num > 0
        validNum ? '' : this.errorTips = `${this.$t('__amount')}${this.$stringFormat(this.$t('__mustBeGreater'), [0])}`
        return validNum
      }

      this.errorTips = this.$t('__pleaseCheckFormContent')
      return valid
    },
    onSubmit() {
      this.checkValidInput();
      if (this.errorTips !== '') {
        return
      }
      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        this.inputAmountState = this.inputState.none
        this.errorTips = ''
      })
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
