<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg giftEditDialog">
        <div class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputGiftNameState === inputState.error, 'is-success': inputGiftNameState === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__giftNickname') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkGiftName()" @blur="checkGiftName()">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputGiftNameState === inputState.error, 'el-icon-success': inputGiftNameState === inputState.success}" />
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
                <select v-model="editForm.currency_id" class="el-select">
                  <option v-for="item in searchItems.currency" :key="item.key" :value="item.key">
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
                <select v-model="editForm.status" class="el-select">
                  <option v-for="item in searchItems.status" :key="item.key" :value="item.key">
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
          <div class="el-form-item__content item" :class="{'is-error': inputGiftValueState === inputState.error, 'is-success': inputGiftValueState === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__value') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.value" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValue()" @blur="checkValue()">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputGiftValueState === inputState.error, 'el-icon-success': inputGiftValueState === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__giftImage') }}</label>
              <small class="tip text-white">{{ uploadTip }}</small>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-upload
                  class="giftUpload"
                  action=""
                  :http-request="uploadHttpRequest"
                  list-type="picture-card"
                  accept="image/jpeg,image/gif,image/png"
                  :file-list="fileList"
                  :on-change="handleChange"
                  drag
                >
                  <i class="el-icon-plus" />
                </el-upload>
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
            <div class="el-form-item__content item" :class="{'is-error': inputGiftNameState === inputState.error, 'is-success': inputGiftNameState === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__giftNickname') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.name" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkGiftName()" @blur="checkGiftName()">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputGiftNameState === inputState.error, 'el-icon-success': inputGiftNameState === inputState.success}" />
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
                  <select v-model="editForm.currency_id" class="el-select">
                    <option v-for="item in searchItems.currency" :key="item.key" :value="item.key">
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
                  <select v-model="editForm.status" class="el-select">
                    <option v-for="item in searchItems.status" :key="item.key" :value="item.key">
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
            <div class="el-form-item__content item" :class="{'is-error': inputGiftValueState === inputState.error, 'is-success': inputGiftValueState === inputState.success}">
              <div class="label-group required">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__value') }}</label>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <input v-model="editForm.value" type="number" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValue()" @blur="checkValue()">
                  <span class="el-input__suffix">
                    <span class="el-input__suffix-inner" />
                    <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputGiftValueState === inputState.error, 'el-icon-success': inputGiftValueState === inputState.success}" />
                  </span>
                </div>
              </div>
            </div>
            <div class="el-form-item__content item">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__giftImage') }}</label>
                <small class="tip text-white">{{ uploadTip }}</small>
              </div>
              <div class="d-flex">
                <div class="el-input el-input--small">
                  <el-upload
                    class="giftUpload"
                    action=""
                    :http-request="uploadHttpRequest"
                    list-type="picture-card"
                    accept="image/jpeg,image/gif,image/png"
                    :file-list="fileList"
                    :on-change="handleChange"
                    drag
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
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
    searchItems: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    imageList: {
      type: Array,
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
      } else if (value.trim().length > 5) {
        callback(new Error(`${this.$t('__lengthLong')}5`))
      } else {
        callback()
      }
    }
    const valueValidate = (rule, value, callback) => {
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
        nickname: [{ required: true, trigger: 'blur', validator: validate }],
        value: [{ required: true, trigger: 'blur', validator: valueValidate }]
      },
      editForm: {},
      fromData: new FormData(),
      fileList: this.imageList,
      limitImageWidth: 73,
      inputGiftNameState: 0,
      inputGiftValueState: 0,
      errorTips: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    uploadTip() {
      return `jpg/png，Width <= ${this.limitImageWidth}px`
    }
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
      this.inputGiftNameState = this.inputState.none
      this.inputGiftValueState = this.inputState.none
      this.errorTips = ''
    },
    checkGiftName() {
      this.inputGiftNameState = (this.editForm.name && this.editForm.name.length > 0) ? this.inputState.success : this.inputState.error
    },
    checkValue() {
      const valid = (this.editForm.value && this.editForm.value.length > 0)
      if (valid === true) {
        var value = 0
        try {
          value = Number(this.editForm.value)
        } catch (e) {
          value = 0
        }
      }

      this.inputGiftValueState = (value > 0) ? this.inputState.success : this.inputState.error
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    uploadHttpRequest(params) {
      const { file } = params
      this.fromData.set('imageFile', file)
    },
    checkImageSize(file, limitSize) {
      return new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          const valid = (img.width <= limitSize.width || limitSize.width === 0) && (img.height <= limitSize.height || limitSize.height === 0)
          resolve(valid)
        }
        img.src = _URL.createObjectURL(file)
      }).then((valid) => {
        return valid
      })
    },
    onSubmit() {
      this.checkGiftName()
      this.checkValue()
      if (this.inputGiftNameState !== this.inputState.success || this.inputGiftValueState !== this.inputState.success) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return;
      }
      const imageFile = this.fromData.get('imageFile')
      if (imageFile) {
        const isIMAGE = (imageFile.type === 'image/jpeg') || (imageFile.type === 'image/gif') || (imageFile.type === 'image/png')
        if (!isIMAGE) {
          this.fileList = []
          this.$message.error(this.$t('__fileError'))
          return
        }
        const limitSize = { width: this.limitImageWidth, height: 0 }
        this.checkImageSize(imageFile, limitSize).then((validSize) => {
          if (validSize) {
            this.send()
          } else {
            this.fileList = []
            this.$message.error(this.$stringFormat(this.$t('__imageSizeLimit'), [limitSize.width, limitSize.height]))
          }
        })
      } else {
        this.send()
      }
    },
    send() {
      for (const data in this.editForm) {
        this.fromData.set(data, this.editForm[data])
      }
      this.$emit('confirm', this.fromData)
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.fromData = new FormData()
      this.fileList = JSON.parse(JSON.stringify(this.imageList))
    }
  }
}
</script>

<style lang="scss">
.giftEditDialog {
  .data_content {
    .giftUpload {
      .el-upload {
        .el-upload-dragger {
          width: 100%;
          height: 100%;
        }
      }
      .el-upload-list__item-status-label {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
</style>
