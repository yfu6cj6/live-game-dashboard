<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div id="add-edit-white-list" class="add-edit-white-list">
        <div class="notice-cover" @click="onClose" />
        <div class="form-container">
          <div class="white-list-scroll scroll-wrap flex-column flex-fill">
            <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
              <div class="scroll-view flex-column flex-fill">
                <form class="el-form">
                  <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.account.state === inputState.error, 'is-success': inputData.account.state === inputState.success}">
                    <label for="userName" class="el-form-item__label">{{ $t('__agentOrSubAccount') }}</label>
                    <div class="el-form-item__content">
                      <div class="el-input">
                        <input v-model="editForm.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.account)" @change="checkValidInput('account')" @blur="checkValidInput('account')">
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner" />
                          <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account.state === inputState.error, 'el-icon-success': inputData.account.state === inputState.success}" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.ip.state === inputState.error, 'is-success': inputData.ip.state === inputState.success}">
                    <label for="domain" class="el-form-item__label">IP</label>
                    <div class="el-form-item__content">
                      <div class="el-input">
                        <input v-model="editForm.ip" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.ip)" @change="checkValidInput('ip')" @blur="checkValidInput('ip')">
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner" />
                          <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.ip.state === inputState.error, 'el-icon-success': inputData.ip.state === inputState.success}" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item button-group el-form-item--feedback">
                    <div class="el-form-item__content">
                      <div class="el-row is-align-middle el-row--flex">
                        <button type="button" class="el-button bg-yellow w-100 el-button--primary" @click="onSubmit">
                          <span>{{ $t('__submit') }}</span>
                        </button>
                        <button type="button" class="el-button bg-gray w-100 el-button--primary" @click="onClose">
                          <span>{{ $t('__cancel') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="form-alert">
                  <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade hidden">
                    <i class="el-alert__icon el-icon-info" />
                    <div class="el-alert__content">
                      <span v-if="errorTips !== ''" class="el-alert__title">{{ errorTips }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp" style="max-width: 600px; min-width: unset;">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div id="add-edit-white-list" class="add-edit-white-list">
            <div class="overlay-scroll-wrap scrolling">
              <div class="back-top" />
              <div id="scroll-inner" class="scroll-inner on native">
                <div class="scroll-view" style="max-height: calc(729px);">
                  <div class="form-container h-100 p-0 pt-3">
                    <form class="el-form">
                      <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.account.state === inputState.error, 'is-success': inputData.account.state === inputState.success}">
                        <label for="userName" class="el-form-item__label">{{ $t('__agentOrSubAccount') }}</label>
                        <div class="el-form-item__content">
                          <div class="el-input">
                            <input v-model="editForm.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.account)" @change="checkValidInput('account')" @blur="checkValidInput('account')">
                            <span class="el-input__suffix">
                              <span class="el-input__suffix-inner" />
                              <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.account.state === inputState.error, 'el-icon-success': inputData.account.state === inputState.success}" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="el-form-item el-form-item--feedback" :class="{'is-error': inputData.ip.state === inputState.error, 'is-success': inputData.ip.state === inputState.success}">
                        <label for="domain" class="el-form-item__label">IP</label>
                        <div class="el-form-item__content">
                          <div class="el-input">
                            <input v-model="editForm.ip" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(inputData.ip)" @change="checkValidInput('ip')" @blur="checkValidInput('ip')">
                            <span class="el-input__suffix">
                              <span class="el-input__suffix-inner" />
                              <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputData.ip.state === inputState.error, 'el-icon-success': inputData.ip.state === inputState.success}" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-alert">
              <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade hidden">
                <i class="el-alert__icon el-icon-info" />
                <div class="el-alert__content">
                  <span v-if="errorTips !== ''" class="el-alert__title">{{ errorTips }}</span>
                </div>
              </div>
            </div>
            <div class="d-flex w-100 justify-content-center mt-3">
              <button type="button" class="el-button bg-yellow common-button el-button--primary" @click="onSubmit">
                <span>{{ $t('__submit') }}</span>
              </button>
              <button type="button" class="el-button bg-gray common-button el-button--primary" @click="onClose">
                <span>{{ $t('__cancel') }}</span>
              </button>
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
  components: { },
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
      inputData: {
        account: {
          type: 0,
          state: 0
        },
        ip: {
          type: 1,
          state: 0
        }
      },
      editForm: {},
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
    inputFocus(input) {
      input.state = this.inputState.none
    },
    checkValidInput(type) {
      this.errorTips = ''
      switch (type) {
        case 'account':
          if (this.editForm.account !== undefined && this.editForm.account.length > 0) {
            this.inputData.account.state = this.inputState.success
          } else {
            this.inputData.account.state = this.inputState.error
            this.errorTips = `${this.$t('__agentOrSubAccount')}${this.$t('__formatInvalid')}`
          }
          break
        case 'ip':
          if (this.checkIpValid()) {
            this.inputData.ip.state = this.inputState.success
          } else {
            this.inputData.ip.state = this.inputState.error
            this.errorTips = `IP${this.$t('__formatInvalid')}`
          }
          break;
      }
    },
    checkIpValid() {
      if (!this.editForm.ip === undefined) {
        return false
      }
      if (this.editForm.ip.length <= 0) {
        return false
      }
      var strs = this.editForm.ip.split('.')
      if (strs.length !== 4) {
        return false
      }
      var valid = true
      for (let i = 0; i < strs.length; i++) {
        if (strs[i].length <= 0) {
          valid = false;
          break;
        }
        try {
          if (isNaN(Number(strs[i]))) {
            valid = false;
            break;
          }
        } catch (e) {
          valid = false;
          break;
        }
      }
      return valid
    },
    onSubmit() {
      if (this.inputData.account.state === this.inputState.error || this.inputData.ip.state === this.inputState.error) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }
      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onReset() {
      this.$nextTick(() => {
        this.editForm = JSON.parse(JSON.stringify(this.form))
        this.errorTips = ''
        this.inputData.account.state = this.inputState.none
        this.inputData.ip.state = this.inputState.none
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app.mobile {
  .notice-cover {
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(0,0,0,0.5);
  }

  .add-edit-white-list {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .form-container {
      padding: 2.5rem;
      border-top: 0.25rem solid #f9c901;
      background-color: #000;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 25rem;
      max-height: calc(100vh - 5rem);
      .el-form-item__content {
        font-size: 1.16667rem;
      }
      .el-form-item__label {
        font-size: 1.16667rem;
        height: 1.16667rem;
        line-height: 1.16667rem;
      }
      .el-form-item {
        margin-bottom: 0.83333rem;
        .el-form-item__label {
          width: 100%;
          text-align: left;
          color: #f9c901;
        }
        .el-input {
          .el-input__inner {
            border-radius: 0.25rem;
            border: 0.08333rem solid #f9c901;
            background-color: #fff;
            padding: 0.83333rem;
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 1.33333rem;
            color: #000;
          }
        }
        &.is-error {
          .el-input__inner {
            border-color: #f56c6c;
          }
        }
      }
    }
    .form-alert {
      .el-alert {
        padding: 0 !important;
      }
    }
  }

  .el-form {
    margin-bottom: 10px;
  }
}
</style>
