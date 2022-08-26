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
                <i class="el-alert__closebtn el-icon-close" style="display: none;" />
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
      <Dialog
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item v-if="isEdit" :label="$t('__tableId')" prop="id">
            <el-input v-model="editForm.id" type="number" />
          </el-form-item>
          <el-form-item :label="$t('__name')" prop="name">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item :label="$t('__status')" prop="status">
            <el-select v-model="editForm.status">
              <el-option v-for="item in status" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="app_name" prop="app_name">
            <el-input v-model="editForm.app_name" />
          </el-form-item>
          <el-form-item label="streaming_name" prop="streaming_name">
            <el-input v-model="editForm.streaming_name" />
          </el-form-item>
          <el-form-item :label="$t('__idleRounds')" prop="idle_rounds">
            <el-input v-model="editForm.idle_rounds" type="number" />
          </el-form-item>
          <el-form-item :label="$t('__streamingUrl')" prop="streaming_url">
            <el-input v-model="editForm.streaming_url" />
          </el-form-item>
          <el-form-item :label="$t('__description')" prop="description">
            <el-input v-model="editForm.description" type="textarea" :rows="2" />
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
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'EditDialog',
  components: { Dialog },
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
    status: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      require: true,
      default() {
        return []
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
    const validateIdleRounds = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (value <= 0) {
        callback(new Error(this.$stringFormat(this.$t('__mustBeGreater'), [0])))
      } else {
        callback()
      }
    }
    return {
      rules: {
        id: [{ required: true, trigger: 'blur', validator: validate }],
        name: [{ required: true, trigger: 'blur', validator: validate }],
        app_name: [{ required: true, trigger: 'blur', validator: validate }],
        streaming_name: [{ required: true, trigger: 'blur', validator: validate }],
        idle_rounds: [{ required: true, trigger: 'blur', validator: validateIdleRounds }],
        streaming_url: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {}
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
    onSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
        }
      })
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        this.$refs.editForm.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
