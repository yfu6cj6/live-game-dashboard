<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div v-if="!isEdit" class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__tableId') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.table_id" class="el-select">
                  <option v-for="item in tables" :key="item.key" :value="item.key">
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
          <div v-if="!isEdit" class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__liveBetAreaId') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.live_bet_area_id" class="el-select">
                  <option v-for="item in liveBetArea" :key="item.key" :value="item.key">
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
          <div class="el-form-item__content item" :class="{'is-error': inputData.min_bet === inputState.error, 'is-success': inputData.min_bet === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMin') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.bet_min" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('min_bet')" @blur="checkValidInput('min_bet')">
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
                <input v-model="editForm.bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('max_bet')" @blur="checkValidInput('max_bet')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.max_bet === inputState.error, 'el-icon-success': inputData.max_bet === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.total_bet === inputState.error, 'is-success': inputData.total_bet === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__totalBetMax') }}</label>
              <small class="tip zeroMeansNoLimit">{{ `${$t('__zeroMeansNoLimit')}` }}</small>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.total_bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('total_bet')" @blur="checkValidInput('total_bet')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.total_bet === inputState.error, 'el-icon-success': inputData.total_bet === inputState.success}" />
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
            <div v-if="!isEdit" class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__tableId') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="editForm.table_id" class="el-select">
                    <option v-for="item in tables" :key="item.key" :value="item.key">
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
            <div v-if="!isEdit" class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__liveBetAreaId') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="editForm.live_bet_area_id" class="el-select">
                    <option v-for="item in liveBetArea" :key="item.key" :value="item.key">
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
            <div class="el-form-item__content item" :class="{'is-error': inputData.min_bet === inputState.error, 'is-success': inputData.min_bet === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__betMin') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.bet_min" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('min_bet')" @blur="checkValidInput('min_bet')">
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
                  <input v-model="editForm.bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('max_bet')" @blur="checkValidInput('max_bet')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.max_bet === inputState.error, 'el-icon-success': inputData.max_bet === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.total_bet === inputState.error, 'is-success': inputData.total_bet === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__totalBetMax') }}</label>
                <small class="tip zeroMeansNoLimit">{{ `${$t('__zeroMeansNoLimit')}` }}</small>
              </div>
              <div class="d-flex mb-2">
                <div class="el-input el-input--small">
                  <input v-model="editForm.total_bet_max" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('total_bet')" @blur="checkValidInput('total_bet')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.total_bet === inputState.error, 'el-icon-success': inputData.total_bet === inputState.success}" />
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
import dialogCommon from '@/mixin/dialogCommon'
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
    },
    'tables': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'liveBetArea': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'isEdit': {
      type: Boolean,
      require: true
    }
  },
  data: function() {
    return {
      editForm: {},
      dialogLoading: false,
      inputData: {
        min_bet: 0,
        max_bet: 0,
        total_bet: 0
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
      this.inputData.min_bet = this.inputData.min_bet === this.inputState.error ? this.inputState.none : this.inputData.min_bet
      this.inputData.max_bet = this.inputData.max_bet === this.inputState.error ? this.inputState.none : this.inputData.max_bet
      this.inputData.total_bet = this.inputData.total_bet === this.inputState.error ? this.inputState.none : this.inputData.total_bet
      this.errorTips = ''
    },
    checkValidInput(type) {
      if (type === '') {
        this.inputData.min_bet = this.validContent(this.editForm.bet_min, false) ? this.inputState.success : this.inputState.error
        this.inputData.max_bet = this.validContent(this.editForm.bet_max, false) ? this.inputState.success : this.inputState.error
        this.inputData.total_bet = this.validContent(this.editForm.total_bet_max, true) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'min_bet':
          this.inputData.min_bet = this.validContent(this.editForm.bet_min, false) ? this.inputState.success : this.inputState.error
          break;
        case 'max_bet':
          this.inputData.max_bet = this.validContent(this.editForm.bet_max, false) ? this.inputState.success : this.inputState.error
          break;
        case 'total_bet':
          this.inputData.total_bet = this.validContent(this.editForm.total_bet_max, true) ? this.inputState.success : this.inputState.error
          break;
      }
    },
    validContent(content, canZero) {
      const valid = content && content.length > 0
      if (valid) {
        const validNum = canZero ? Number(content) >= 0 : Number(content) > 0
        if (!validNum) {
          if (canZero) {
            this.errorTips = `${this.$t('__amount')}${this.$stringFormat(this.$t('__mustBeGreaterOrEqual'), [0])}`
          } else {
            this.errorTips = `${this.$t('__amount')}${this.$stringFormat(this.$t('__mustBeGreater'), [0])}`
          }
        }
        return validNum
      }
      valid ? '' : this.errorTips = this.$t('__pleaseCheckFormContent')
      return valid
    },
    onSubmit() {
      this.checkValidInput('')
      if (this.errorTips !== '') {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return;
      }

      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        this.inputData.min_bet = this.inputState.none
        this.inputData.max_bet = this.inputState.none
        this.inputData.total_bet = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.black_bg {
  z-index: 3;
}

.zeroMeansNoLimit {
  color: #fff;
  right: 1.5rem;
}
</style>
