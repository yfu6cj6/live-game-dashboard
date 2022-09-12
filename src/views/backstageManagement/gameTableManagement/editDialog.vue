<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div v-if="isEdit" class="el-form-item__content item" :class="{'is-error': inputData.id === inputState.error, 'is-success': inputData.id === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__tableId') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.id" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('id')" @blur="checkValidInput('id')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.id === inputState.error, 'el-icon-success': inputData.id === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.name === inputState.error, 'is-success': inputData.name === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__name') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('name')" @blur="checkValidInput('name')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.name === inputState.error, 'el-icon-success': inputData.name === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__status') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.status" class="el-select">
                  <option v-for="item in status" :key="item.key" :value="item.key">
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
          <div class="el-form-item__content item" :class="{'is-error': inputData.app_name === inputState.error, 'is-success': inputData.app_name === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">app_name</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.app_name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('app_name')" @blur="checkValidInput('app_name')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.app_name === inputState.error, 'el-icon-success': inputData.app_name === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.streaming_name === inputState.error, 'is-success': inputData.streaming_name === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">streaming_name</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.streaming_name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('streaming_name')" @blur="checkValidInput('streaming_name')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.streaming_name === inputState.error, 'el-icon-success': inputData.streaming_name === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.idle_rounds === inputState.error, 'is-success': inputData.idle_rounds === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__idleRounds') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.idle_rounds" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('idle_rounds')" @blur="checkValidInput('idle_rounds')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.idle_rounds === inputState.error, 'el-icon-success': inputData.idle_rounds === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.streaming_url === inputState.error, 'is-success': inputData.streaming_url === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__streamingUrl') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.streaming_url" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput('streaming_url')" @blur="checkValidInput('streaming_url')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.streaming_url === inputState.error, 'el-icon-success': inputData.streaming_url === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item mb-1_5">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__description') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-input v-model="editForm.description" type="textarea" :rows="2" />
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
      inputData: {
        id: 0,
        name: 0,
        app_name: 0,
        streaming_name: 0,
        idle_rounds: 0,
        streaming_url: 0
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
    inputFocus() {
      this.inputData.id = this.inputData.id === this.inputState.error ? this.inputState.none : this.inputData.id
      this.inputData.name = this.inputData.name === this.inputState.error ? this.inputState.none : this.inputData.name
      this.inputData.app_name = this.inputData.app_name === this.inputState.error ? this.inputState.none : this.inputData.app_name
      this.inputData.streaming_name = this.inputData.streaming_name === this.inputState.error ? this.inputState.none : this.inputData.streaming_name
      this.inputData.idle_rounds = this.inputData.idle_rounds === this.inputState.error ? this.inputState.none : this.inputData.idle_rounds
      this.inputData.streaming_url = this.inputData.streaming_url === this.inputState.error ? this.inputState.none : this.inputData.streaming_url
      this.errorTips = ''
    },
    checkValidInput(type) {
      if (type === '') {
        this.inputData.id = !this.isEdit || this.validContent(this.editForm.id) ? this.inputState.success : this.inputState.error
        this.inputData.name = this.validContent(this.editForm.name) ? this.inputState.success : this.inputState.error
        this.inputData.app_name = this.validContent(this.editForm.app_name) ? this.inputState.success : this.inputState.error
        this.inputData.streaming_name = this.validContent(this.editForm.streaming_name) ? this.inputState.success : this.inputState.error
        this.inputData.idle_rounds = this.validContent(this.editForm.idle_rounds) ? this.inputState.success : this.inputState.error
        this.inputData.streaming_url = this.validContent(this.editForm.streaming_url) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'id':
          this.inputData.id = !this.isEdit || this.validContent(this.editForm.id) ? this.inputState.success : this.inputState.error
          break;
        case 'name':
          this.inputData.name = this.validContent(this.editForm.name) ? this.inputState.success : this.inputState.error
          break;
        case 'app_name':
          this.inputData.app_name = this.validContent(this.editForm.app_name) ? this.inputState.success : this.inputState.error
          break;
        case 'streaming_name':
          this.inputData.streaming_name = this.validContent(this.editForm.streaming_name) ? this.inputState.success : this.inputState.error
          break;
        case 'idle_rounds':
          this.inputData.idle_rounds = this.validRound(this.editForm.idle_rounds) ? this.inputState.success : this.inputState.error
          break;
        case 'streaming_url':
          this.inputData.streaming_url = this.validContent(this.editForm.streaming_url) ? this.inputState.success : this.inputState.error
          break;
      }
    },
    validContent(content) {
      const valid = content && content.length > 0
      valid ? '' : this.errorTips = this.$t('__pleaseCheckFormContent')
      return valid
    },
    validRound(content) {
      const valid = content && content.length > 0
      if (valid) {
        const num = Number(content)
        const validNum = num > 0
        validNum ? '' : this.errorTips = `${this.$t('__idleRounds')}${this.$stringFormat(this.$t('__mustBeGreater'), [0])}`
        return validNum
      }

      this.errorTips = this.$t('__pleaseCheckFormContent')
      return valid
    },
    onSubmit() {
      this.checkValidInput('')
      if (this.errorTips !== '') {
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
      this.$nextTick(() => {
        // this.$refs.editForm.clearValidate()
        this.inputData.id = this.inputState.none
        this.inputData.name = this.inputState.none
        this.inputData.app_name = this.inputState.none
        this.inputData.streaming_name = this.inputState.none
        this.inputData.idle_rounds = this.inputState.none
        this.inputData.streaming_url = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mb-1_5 {
  margin-bottom: 1.5rem;
}
</style>
