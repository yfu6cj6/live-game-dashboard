<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.name.state === inputState.error, 'is-success': inputData.name.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.name)" @change="checkValidInput('name')" @blur="checkValidInput('name')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.name.state === inputState.error, 'el-icon-success': inputData.name.state === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.nickname.state === inputState.error, 'is-success': inputData.nickname.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__nickname') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.nickname)" @change="checkValidInput('nickname')" @blur="checkValidInput('nickname')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.nickname.state === inputState.error, 'el-icon-success': inputData.nickname.state === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">Uri</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.uri" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('odds')" @blur="checkValidInput('odds')">
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__method') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.method" class="el-select">
                  <option v-for="item in methodType" :key="item" :value="item">
                    {{ $t(item) }}
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
          <div class="el-form-item__content item mb-1_5">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">requestContent</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-input v-model="editForm.request_content" type="textarea" :rows="2" />
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">responseContent</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-input v-model="editForm.response_content" type="textarea" :rows="2" />
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
            <div class="el-form-item__content item" :class="{'is-error': inputData.name.state === inputState.error, 'is-success': inputData.name.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.name)" @change="checkValidInput('name')" @blur="checkValidInput('name')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.name.state === inputState.error, 'el-icon-success': inputData.name.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item" :class="{'is-error': inputData.nickname.state === inputState.error, 'is-success': inputData.nickname.state === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__nickname') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.nickname)" @change="checkValidInput('nickname')" @blur="checkValidInput('nickname')">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.nickname.state === inputState.error, 'el-icon-success': inputData.nickname.state === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">Uri</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.uri" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('odds')" @blur="checkValidInput('odds')">
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__method') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="editForm.method" class="el-select">
                    <option v-for="item in methodType" :key="item" :value="item">
                      {{ $t(item) }}
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
            <div class="el-form-item__content item mb-1_5">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">requestContent</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <el-input v-model="editForm.request_content" type="textarea" :rows="2" />
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">responseContent</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <el-input v-model="editForm.response_content" type="textarea" :rows="2" />
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
    'methodType': {
      type: Array,
      require: true,
      default() {
        return []
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
        nickname: {
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
        this.inputData.name.state = this.validContent(this.editForm.name) ? this.inputState.success : this.inputState.error
        this.inputData.nickname.state = this.validContent(this.editForm.nickname) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'name':
          this.inputData.name.state = this.validContent(this.editForm.name, 5) ? this.inputState.success : this.inputState.error
          break;
        case 'nickname':
          this.inputData.nickname.state = this.validContent(this.editForm.nickname, 1) ? this.inputState.success : this.inputState.error
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
        this.inputData.nickname.state = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
