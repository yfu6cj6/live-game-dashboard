<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.account === inputState.error, 'is-success': inputData.account === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.area_name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('account')" @blur="checkValidInput('account')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account === inputState.error, 'el-icon-success': inputData.account === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.code === inputState.error, 'is-success': inputData.code === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__code') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.area" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('code')" @blur="checkValidInput('code')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.code === inputState.error, 'el-icon-success': inputData.code === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.odds === inputState.error, 'is-success': inputData.odds === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__odds') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.odds" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('odds')" @blur="checkValidInput('odds')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.odds === inputState.error, 'el-icon-success': inputData.odds === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.min_bet === inputState.error, 'is-success': inputData.min_bet === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMin') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.bet_min" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('maxbet')" @blur="checkValidInput('maxbet')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.min_bet === inputState.error, 'el-icon-success': inputData.min_bet === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.max_bet === inputState.error, 'is-success': inputData.max_bet === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMax') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('minbet')" @blur="checkValidInput('minbet')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.max_bet === inputState.error, 'el-icon-success': inputData.max_bet === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__currency') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.currency" class="el-select">
                  <option v-for="item in currency" :key="item.key" :value="item.key">
                    {{ $t(item.nickname) }}
                  </option>
                </select>
                <div class="fas gray-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 63 63"
                    style="height: 0.916667rem; width: 0.916667rem;"
                  >
                    <title>arrow_2</title>
                    <g id="hGqiqI.tif">
                      <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__status') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.activated" class="el-select">
                  <option v-for="item in activated" :key="item.key" :value="item.key">
                    {{ $t(item.nickname) }}
                  </option>
                </select>
                <div class="fas gray-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 63 63"
                    style="height: 0.916667rem; width: 0.916667rem;"
                  >
                    <title>arrow_2</title>
                    <g id="hGqiqI.tif">
                      <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                    </g>
                  </svg>
                </div>
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
    </template>
    <template v-else>
      <div class="agent-pop-up-panel giftEditDialog backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="data_content">
            <div class="w-100 d-flex justify-content-center font-weight-bold font-1_5">
              <span class="text-yellow ">{{ title }}</span>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.account === inputState.error, 'is-success': inputData.account === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.area_name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('account')" @blur="checkValidInput('account')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account === inputState.error, 'el-icon-success': inputData.account === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.code === inputState.error, 'is-success': inputData.code === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__code') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.area" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('code')" @blur="checkValidInput('code')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.code === inputState.error, 'el-icon-success': inputData.code === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.odds === inputState.error, 'is-success': inputData.odds === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__odds') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.odds" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('odds')" @blur="checkValidInput('odds')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.odds === inputState.error, 'el-icon-success': inputData.odds === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.min_bet === inputState.error, 'is-success': inputData.min_bet === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMin') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.bet_min" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('maxbet')" @blur="checkValidInput('maxbet')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.min_bet === inputState.error, 'el-icon-success': inputData.min_bet === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.max_bet === inputState.error, 'is-success': inputData.max_bet === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMax') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('minbet')" @blur="checkValidInput('minbet')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.max_bet === inputState.error, 'el-icon-success': inputData.max_bet === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__currency') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="editForm.currency" class="el-select">
                    <option v-for="item in currency" :key="item.key" :value="item.key">
                      {{ $t(item.nickname) }}
                    </option>
                  </select>
                  <div class="fas gray-deep">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 63 63"
                      style="height: 0.916667rem; width: 0.916667rem;"
                    >
                      <title>arrow_2</title>
                      <g id="hGqiqI.tif">
                        <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__status') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="editForm.activated" class="el-select">
                    <option v-for="item in activated" :key="item.key" :value="item.key">
                      {{ $t(item.nickname) }}
                    </option>
                  </select>
                  <div class="fas gray-deep">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 63 63"
                      style="height: 0.916667rem; width: 0.916667rem;"
                    >
                      <title>arrow_2</title>
                      <g id="hGqiqI.tif">
                        <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                      </g>
                    </svg>
                  </div>
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
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'EditDialog',
  components: {},
  mixins: [dialogCommon],
  props: {
    title: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      require: true
    },
    confirm: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    form: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    currency: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    activated: {
      type: Array,
      require: true,
      default() {
        return []
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
        area_name: [{ required: true, trigger: 'blur', validator: validate }],
        area: [{ required: true, trigger: 'blur', validator: validate }],
        odds: [{ required: true, trigger: 'blur', validator: validate }],
        bet_min: [{ required: true, trigger: 'blur', validator: validate }],
        bet_max: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      inputData: {
        account: 0,
        code: 0,
        odds: 0,
        min_bet: 0,
        max_bet: 0
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
    inputFocus() {
      this.inputData.account = this.inputData.account === this.inputState.error ? this.inputState.none : this.inputData.account
      this.inputData.code = this.inputData.code === this.inputState.error ? this.inputState.none : this.inputData.code
      this.inputData.odds = this.inputData.odds === this.inputState.error ? this.inputState.none : this.inputData.odds
      this.inputData.min_bet = this.inputData.min_bet === this.inputState.error ? this.inputState.none : this.inputData.min_bet
      this.inputData.max_bet = this.inputData.max_bet === this.inputState.error ? this.inputState.none : this.inputData.max_bet
      this.errorTips = ''
    },
    checkValidInput(type) {
      if (type === '') {
        this.inputData.account = this.validContent(this.editForm.area_name) ? this.inputState.success : this.inputState.error
        this.inputData.code = this.validContent(this.editForm.area) ? this.inputState.success : this.inputState.error
        this.inputData.odds = this.validContent(this.editForm.odds) ? this.inputState.success : this.inputState.error
        this.inputData.min_bet = this.validContent(this.editForm.bet_min) ? this.inputState.success : this.inputState.error
        this.inputData.max_bet = this.validContent(this.editForm.bet_max) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'account':
          this.inputData.account = this.validContent(this.editForm.area_name) ? this.inputState.success : this.inputState.error
          break;
        case 'code':
          this.inputData.code = this.validContent(this.editForm.area) ? this.inputState.success : this.inputState.error
          break;
        case 'odds':
          this.inputData.odds = this.validContent(this.editForm.odds) ? this.inputState.success : this.inputState.error
          break;
        case 'maxbet':
          this.inputData.min_bet = this.validContent(this.editForm.bet_min) ? this.inputState.success : this.inputState.error
          break;
        case 'minbet':
          this.inputData.max_bet = this.validContent(this.editForm.bet_max) ? this.inputState.success : this.inputState.error
          break;
      }
    },
    validContent(content) {
      const valid = content && content.length > 0
      valid ? '' : this.errorTips = this.$t('__pleaseCheckFormContent')
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
      this.$nextTick(() => {
        this.editForm = JSON.parse(JSON.stringify(this.form))
        // this.$refs.editForm.clearValidate()
        this.inputData.account = this.inputState.none
        this.inputData.code = this.inputState.none
        this.inputData.odds = this.inputState.none
        this.inputData.min_bet = this.inputState.none
        this.inputData.max_bet = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
