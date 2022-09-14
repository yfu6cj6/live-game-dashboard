<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="el-form-item__content item" :class="{'is-error': inputData.name.state === inputState.error, 'is-success': inputData.name.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.name" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.name.state)" @change="checkValidInput('name')" @blur="checkValidInput('name')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.name.state === inputState.error, 'el-icon-success': inputData.name.state === inputState.success}" />
              </span>
            </div>
          </div>
        </div>
        <div class="el-form-item__content item" :class="{'is-error': inputData.code.state === inputState.error, 'is-success': inputData.code.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__code') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.code" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.code.state)" @change="checkValidInput('code')" @blur="checkValidInput('code')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.code.state === inputState.error, 'el-icon-success': inputData.code.state === inputState.success}" />
              </span>
            </div>
          </div>
        </div>
        <div class="el-form-item__content item" :class="{'is-error': inputData.symbol.state === inputState.error, 'is-success': inputData.symbol.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__symbol') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.symbol" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.symbol.state)" @change="checkValidInput('symbol')" @blur="checkValidInput('symbol')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.symbol.state === inputState.error, 'el-icon-success': inputData.symbol.state === inputState.success}" />
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
          <div class="data_content">
            <div class="w-100 d-flex justify-content-center font-weight-bold font-1_5">
              <span class="text-yellow ">{{ title }}</span>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.name.state === inputState.error, 'is-success': inputData.name.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.name" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.name.state)" @change="checkValidInput('name')" @blur="checkValidInput('name')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.name.state === inputState.error, 'el-icon-success': inputData.name.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.code.state === inputState.error, 'is-success': inputData.code.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__code') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.code" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.code.state)" @change="checkValidInput('code')" @blur="checkValidInput('code')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.code.state === inputState.error, 'el-icon-success': inputData.code.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item mb-2" :class="{'is-error': inputData.symbol.state === inputState.error, 'is-success': inputData.symbol.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__symbol') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.symbol" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.symbol.state)" @change="checkValidInput('symbol')" @blur="checkValidInput('symbol')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.symbol.state === inputState.error, 'el-icon-success': inputData.symbol.state === inputState.success}" />
                  </span>
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
    return {
      editForm: {},
      inputData: {
        name: {
          state: 0
        },
        code: {
          state: 0
        },
        symbol: {
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
        this.inputData.name.state = this.validContent(this.editForm.name, false) ? this.inputState.success : this.inputState.error
        this.inputData.code.state = this.validContent(this.editForm.code, false) ? this.inputState.success : this.inputState.error
        this.inputData.symbol.state = this.validContent(this.editForm.symbol, false) ? this.inputState.success : this.inputState.error
        return
      }
      switch (type) {
        case 'name':
          this.inputData.name.state = this.validContent(this.editForm.name) ? this.inputState.success : this.inputState.error
          break;
        case 'code':
          this.inputData.code.state = this.validContent(this.editForm.code) ? this.inputState.success : this.inputState.error
          break;
        case 'symbol':
          this.inputData.symbol.state = this.validContent(this.editForm.symbol) ? this.inputState.success : this.inputState.error
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
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        this.inputData.name.state = this.inputState.none
        this.inputData.code.state = this.inputState.none
        this.inputData.symbol.state = this.inputState.none
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
