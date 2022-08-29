<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div v-loading="dialogLoading" class="black_bg">
        <div class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.account.state === inputState.error, 'is-success': inputData.account.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__account') }}</label>
              <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.account.state)" @change="checkValidInput('account')" @blur="checkValidInput('account')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account.state === inputState.error, 'el-icon-success': inputData.account.state === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div v-if="hasPassword" class="el-form-item__content item" :class="{'is-error': inputData.password.state === inputState.error, 'is-success': inputData.password.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__password') }}</label>
              <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.password" :type="inputData.password.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.password.state)" @change="checkValidInput('password')" @blur="checkValidInput('password')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner">
                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" :class="{'d-none': inputData.password.state !== inputState.error}" />
                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" :class="{'d-none': inputData.password.state !== inputState.success}" />
                    <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.password.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.password)" />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div v-if="hasPassword" class="el-form-item__content item custom-psw" :class="{'is-error': inputData.confirmPassword.state === inputState.error, 'is-success': inputData.confirmPassword.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__confirmPassword') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="confirmPassword" :type="inputData.confirmPassword.inputType" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.confirmPassword.state)" @change="checkValidInput('confirmPassword')" @blur="checkValidInput('confirmPassword')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner">
                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" :class="{'d-none': inputData.confirmPassword.state !== inputState.error}" />
                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" :class="{'d-none': inputData.confirmPassword.state !== inputState.success}" />
                    <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputData.confirmPassword.inputType !== 'password'}" @click.stop="showUserPasswordType(inputData.confirmPassword)" />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputData.nickname.state === inputState.error, 'is-success': inputData.nickname.state === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__nickname') }}</label>
              <small class="tip">{{ `${$t('__lengthLess')}1` }}</small>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.nickname.state)" @change="checkValidInput('nickname')" @blur="checkValidInput('nickname')">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.nickname.state === inputState.error, 'el-icon-success': inputData.nickname.state === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__timeZone') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.timeZone" class="el-select">
                  <option v-for="item in timeZones" :key="item.key" :value="item.key">
                    {{ $t(item.cityName) }}
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
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__role') }}</label>
            </div>
            <div class="option dialogRoles">
              <div class="comp selected-filter custom" style="width: 100% !important;">
                <el-select
                  v-model="editForm.roles"
                  class="d-flex"
                  multiple
                  :popper-append-to-body="false"
                  :collapse-tags="rolesCollapse"
                  :placeholder="$t('__role')"
                  :popper-class="'custom-dropdown w-auto'"
                >
                  <el-option
                    v-for="item in selectOption.roles"
                    :key="item.key"
                    :label="item.nickname"
                    :value="item.key"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__agentName') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.agentId" class="el-select">
                  <option v-for="item in agents" :key="item.key" :value="item.key">
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
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__accountStatus') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.status" class="el-select">
                  <option v-for="item in accountStatusType" :key="item.key" :value="item.key">
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
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__remark') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-input v-model="editForm.remark" type="textarea" :rows="2" />
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
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item :label="$t('__account')" prop="account">
            <el-input v-model="editForm.account" />
          </el-form-item>
          <el-form-item v-if="hasPassword" :label="$t('__password')" prop="password">
            <el-input v-model="editForm.password" show-password />
          </el-form-item>
          <el-form-item v-if="hasPassword" :label="$t('__confirmPassword')" prop="confirmPassword">
            <el-input v-model="confirmPassword" show-password />
          </el-form-item>
          <el-form-item :label="$t('__nickname')" prop="nickname">
            <el-input v-model="editForm.nickname" />
          </el-form-item>
          <el-form-item :label="$t('__timeZone')" prop="timeZone">
            <el-select v-model="editForm.timeZone">
              <el-option v-for="item in timeZones" :key="item.key" :label="item.cityName" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__role')" prop="roles">
            <el-select v-model="editForm.roles" multiple>
              <el-option v-for="item in roles" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__agentName')" prop="agentId">
            <el-select v-model="editForm.agentId">
              <el-option v-for="item in agents" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__accountStatus')" prop="status">
            <el-select v-model="editForm.status">
              <el-option v-for="item in accountStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__remark')" prop="remark">
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
import common from '@/mixin/common';

export default {
  name: 'EditDialog',
  components: { Dialog },
  mixins: [common, dialogCommon],
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
    'roles': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'agents': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'timeZones': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'accountStatusType': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'hasPassword': {
      type: Boolean,
      require: true,
      default() {
        return true
      }
    }
  },
  data: function() {
    const validate = (rule, value, callback) => {
      if (!value || value.length < 1) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!this.confirmPassword.length) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.confirmPassword !== this.editForm.password) {
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
      } else {
        callback()
      }
    }
    return {
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validate }],
        password: [{ required: true, trigger: 'blur', validator: validate }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }],
        roles: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      confirmPassword: '',
      dialogLoading: false,
      inputData: {
        account: {
          state: 0
        },
        password: {
          inputType: 'password',

          state: 0
        },
        confirmPassword: {
          inputType: 'password',
          state: 0
        },
        nickname: {
          state: 0
        }
      },
      errorTips: '',
      selectOption: {
        roles: []
      }
    }
  },
  computed: {
    rolesCollapse() {
      return this.editForm.roles && this.editForm.roles.length > 4
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
        this.selectOption.roles = JSON.parse(JSON.stringify(this.roles))
        this.$nextTick(() => {
          this.addSelectFilter()
        })
      }
    }
  },
  methods: {
    showUserPasswordType(password) {
      password.inputType = password.inputType === '' ? 'password' : '';
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option dialogRoles', () => {
        this.editForm.roles = JSON.parse(JSON.stringify(this.roles)).map(item => item.key)
      }, () => {
        this.editForm.roles = []
      }, () => {
        this.selectOption.roles = JSON.parse(JSON.stringify(this.roles)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    inputFocus(state) {
      state = state === this.inputState.error ? this.inputState.none : state;
      this.errorTips = ''
    },
    checkValidInput(type) {
      if (type === '') {
        this.inputData.account.state = this.validContent(this.editForm.account, false) ? this.inputState.success : this.inputState.error
        this.inputData.password.state = !this.hasPassword ? this.inputState.success : this.validContent(this.editForm.password, false) ? this.inputState.success : this.inputState.error
        this.inputData.confirmPassword.state = !this.hasPassword ? this.inputState.success : this.validPassword(this.confirmPassword, true) ? this.inputState.success : this.inputState.error
        this.inputData.nickname.state = this.validContent(this.editForm.nickname, true) ? this.inputState.success : this.inputState.error
        return
      }

      switch (type) {
        case 'account':
          this.inputData.account.state = this.validContent(this.editForm.account, 5) ? this.inputState.success : this.inputState.error
          break;
        case 'password':
          this.inputData.password.state = this.validContent(this.editForm.password, 5) ? this.inputState.success : this.inputState.error
          break;
        case 'confirmPassword':
          this.inputData.confirmPassword.state = this.validPassword(this.confirmPassword, 5) ? this.inputState.success : this.inputState.error
          break;
        case 'nickname':
          this.inputData.nickname.state = this.validContent(this.editForm.nickname, 1) ? this.inputState.success : this.inputState.error
          break;
      }
    },
    validContent(content, lessLength) {
      const valid = content && content.length >= lessLength
      if (!valid) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
      }
      return valid
    },
    validPassword(content, lessLength) {
      const valid = this.validContent(content, lessLength);
      if (valid) {
        if (this.editForm.password !== this.confirmPassword) {
          console.log('validPassword');
          this.errorTips = `${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`
          return false
        } else {
          return true
        }
      }
      return valid
    },
    onSubmit() {
      this.checkValidInput('');
      console.log(this.errorTips)
      if (this.errorTips !== '') {
        return;
      }

      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        // this.$refs.editForm.clearValidate()
        this.inputData.account.state = this.inputState.none
        this.inputData.password.state = this.inputState.none
        this.inputData.confirmPassword.state = this.inputState.none
        this.inputData.nickname.state = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
