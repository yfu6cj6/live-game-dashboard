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
        <div class="el-form-item__content item" :class="{'is-error': inputData.nickname.state === inputState.error, 'is-success': inputData.nickname.state === inputState.success}">
          <div class="label-group required">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__nickname') }}</label>
          </div>
          <div class="d-flex">
            <div class="el-input el-input--small">
              <input v-model="editForm.nickname" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.nickname.state)" @change="checkValidInput('nickname')" @blur="checkValidInput('nickname')">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner" />
                <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.nickname.state === inputState.error, 'el-icon-success': inputData.nickname.state === inputState.success}" />
              </span>
            </div>
          </div>
        </div>
        <div class="el-form-item__content item">
          <div class="label-group">
            <label class="form-item-label text-yellow font-weight-bold">{{ $t('__type') }}</label>
          </div>
          <div class="option">
            <div class="comp selected-filter">
              <select v-model="editForm.type" class="el-select">
                <option v-for="item in types" :key="item.key" :value="item.key">
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
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item :label="$t('__name')" prop="name">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item :label="$t('__nickname')" prop="nickname">
            <el-input v-model="editForm.nickname" />
          </el-form-item>
          <el-form-item :label="$t('__type')" prop="type">
            <el-select v-model="editForm.type">
              <el-option v-for="item in types" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
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
    'types': {
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
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validate }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }]
      },
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
        this.inputData.nickname.state = this.validContent(this.editForm.nickname, false) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'name':
          this.inputData.name.state = this.validContent(this.editForm.name) ? this.inputState.success : this.inputState.error
          break;
        case 'nickname':
          this.inputData.nickname.state = this.validContent(this.editForm.nickname) ? this.inputState.success : this.inputState.error
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
        // this.$refs.editForm.clearValidate()
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
