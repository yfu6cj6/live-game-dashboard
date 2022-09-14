<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="flex-column flex-fill popup-view" style="background: rgb(0, 0, 0);">
        <div class="flex-column flex-fill">
          <div v-loading="dialogLoading" class="flex-column flex-fill">
            <div class="sub-account-allocations flex-column flex-fill">
              <form class="el-form flex-column flex-fill el-form--label-left">
                <div class="page-title">
                  {{ `${$t('__subAgentDistribute')} - ` }}
                  <span class="user-name">{{ ` ${account} ` }}</span>
                </div>
                <div class="w-100 step-content flex-column flex-fill">
                  <div class="scroll-wrap flex-column flex-fill">
                    <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
                      <div class="scroll-view flex-column flex-fill">
                        <table class="el-table w-100 flex-grow-0">
                          <tr class="el-table__row head">
                            <td class="w2">
                              <label class="el-checkbox all-check" :class="{'is-checked': selectAll}">
                                <span class="el-checkbox__input" :class="{'is-indeterminate': hadSelectedButNotAll, 'is-checked': selectAll}">
                                  <span class="el-checkbox__inner" />
                                  <input v-model="selectAll" type="checkbox" aria-hidden="false" class="el-checkbox__original" value="" @click="selection">
                                </span>
                              </label>
                            </td>
                            <td class="w2">{{ $t('__index') }}</td>
                            <td class="w6">{{ $t('__agentAccount') }}</td>
                          </tr>
                        </table>
                        <div role="group" aria-label="checkbox-group" class="el-checkbox-group">
                          <table class="el-table w-100">
                            <tr
                              v-for="(item, index) in selectSubAgents"
                              :key="index"
                              class="el-table__row"
                            >
                              <td class="w2">
                                <label class="el-checkbox" :class="{'is-checked': item.exist}">
                                  <span class="el-checkbox__input" :class="{'is-checked': item.exist}">
                                    <span class="el-checkbox__inner" />
                                    <input v-model="item.exist" type="checkbox" aria-hidden="false" name="agent" class="el-checkbox__original" value="374568" @change="handleCheckboxChange">
                                  </span>
                                </label>
                              </td>
                              <td class="w2">{{ (index+1) }}</td>
                              <td class="w6">{{ item.nickname }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-2 w-100" />
                  <div class="text-red w-100 mt-1 ml-auto mr-auto pb-1">
                    <form class="el-form el-form--label-left">
                      <div v-if="errorTips !== ''" class="text-center text-red ml-auto mr-auto w-100 pb-2">{{ errorTips }}</div>
                      <div class="el-form-item operator-psw custom-psw m-auto el-form-item--small" :class="{'is-error': userInputState === inputState.error, 'is-success': userInputState === inputState.success}">
                        <div class="el-form-item__content">
                          <div class="d-flex justify-content-center">
                            <div class="label-group w-auto m-0 mr-3">
                              <label class="form-item-label text-yellow">{{ $t('__userPassword') }}</label>
                            </div>
                            <div class="value-group w-auto">
                              <div class="el-input el-input--small el-input--suffix">
                                <input
                                  v-model="form.userPassword"
                                  :type="userPasswordType"
                                  onkeyup="value=value.replace(/[\W]/g,'')"
                                  autocomplete="off"
                                  class="el-input__inner"
                                  @focus="inputFocus()"
                                  @change="checkPassword()"
                                  @blur="checkPassword()"
                                >
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType !== 'password'}" @click.stop="showUserPasswordType()" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
            </div>
            <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
              <button type="button" class="el-button bg-yellow common-button w-50 el-button--primary" @click="onSubmit">
                <span>{{ $t('__submit') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp subAccountFormAllocations">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div class="popup-title">{{ `${$t('__subAgentDistribute')}` }}</div>
          <div id="subAccountFormAllocations" class="others agent-form">
            <div class="step-content">
              <div class="page-title ml-auto p-0" style="font-size: 14px;">{{ `${$t('__agent')}` }}
                <span class="user-name">{{ ` ${account} ` }}</span>
              </div>
            </div>
            <div class="overlay-scroll-wrap scrolling">
              <backTop
                :inner-class="'.scroll-inner.distributeDialog'"
              />
              <div id="scroll-inner" class="scroll-inner on native distributeDialog">
                <div class="scroll-view" style="max-height: 70vh;">
                  <form class="el-form el-form--label-left">
                    <div class="step-content d-block" style="padding: 0px !important;">
                      <div class="w-100 handicap-table" style="position: relative;">
                        <table class="el-table w-100">
                          <tbody>
                            <tr class="el-table__row head">
                              <td class="w2">
                                <div class="cell checkbox">
                                  <label class="el-checkbox all-check" :class="{'is-checked': selectAll}">
                                    <span class="el-checkbox__input" :class="{'is-indeterminate': hadSelectedButNotAll, 'is-checked': selectAll}">
                                      <span class="el-checkbox__inner" />
                                      <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="" @click="selection">
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td class="w2">
                                <div class="cell name">{{ $t('__index') }}</div>
                              </td>
                              <td class="w6">
                                <div class="cell name long">{{ $t('__agentAccount') }}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="w-100">
                          <div role="group" aria-label="checkbox-group" class="el-checkbox-group">
                            <table class="el-table w-100">
                              <tbody>
                                <tr style="visibility: hidden;" />
                                <tr
                                  v-for="(item, index) in selectSubAgents"
                                  :key="index"
                                  class="el-table__row"
                                >
                                  <td class="w2">
                                    <div class="cell checkbox">
                                      <label class="el-checkbox" :class="{'is-checked': item.exist}">
                                        <span class="el-checkbox__input" :class="{'is-checked': item.exist}">
                                          <span class="el-checkbox__inner" />
                                          <input v-model="item.exist" type="checkbox" aria-hidden="false" name="agent" class="el-checkbox__original" value="374568" @change="handleCheckboxChange">
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td class="w2">
                                    <div class="cell name">{{ (index+1) }}</div>
                                  </td>
                                  <td class="w6">
                                    <div class="cell name long">{{ item.nickname }}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="form-alert p-0" style="height: 30px;">
              <div v-if="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade justify-content-center show">
                <i class="el-alert__icon el-icon-warning" />
                <div class="el-alert__content">
                  <span class="el-alert__title">{{ errorTips }}</span>
                </div>
              </div>
            </div>
            <div class="text-red w-100 mt-1 ml-auto mr-auto pt-2">
              <form class="el-form el-form--label-left">
                <div class="el-form-item operator-psw custom-psw m-auto el-form-item--small" :class="{'is-error': userInputState === inputState.error, 'is-success': userInputState === inputState.success}">
                  <div class="el-form-item__content">
                    <div class="d-flex justify-content-center">
                      <div class="label-group w-auto" style="margin-right: 10px;">
                        <label class="form-item-label text-yellow">{{ $t('__userPassword') }}</label>
                      </div>
                      <div class="value-group w-auto">
                        <div class="el-input el-input--small el-input--suffix">
                          <input
                            v-model="form.userPassword"
                            :type="userPasswordType"
                            onkeyup="value=value.replace(/[\W]/g,'')"
                            autocomplete="off"
                            class="el-input__inner"
                            @focus="inputFocus()"
                            @change="checkPassword()"
                            @blur="checkPassword()"
                          >
                          <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                              <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                              <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                              <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType !== 'password'}" @click.stop="showUserPasswordType()" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="d-flex w-100 justify-content-center popup-buttons" style="margin-top: 20px;">
            <button type="button" class="el-button bg-yellow common-button el-button--primary">
              <span>{{ $t('__submit') }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import BackTop from '@/components/BackTop'
import { mapGetters } from 'vuex'

export default {
  name: 'SubAgentDistributeDialog',
  components: { BackTop },
  mixins: [dialogCommon, common],
  props: {
    'account': {
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
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'subAgents': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    return {
      userPasswordType: 'password',
      selectAll: false,
      selectSubAgents: [],
      errorTips: '',
      userInputState: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    hadSelectedButNotAll() {
      const itemIdx = this.selectSubAgents.findIndex(element => element.exist)
      return !this.selectAll && itemIdx >= 0
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.userPasswordType = 'password'
        this.selectAll = false
        this.selectSubAgents = []
        this.userInputState = this.inputState.none
        this.errorTips = ''
      }
    }
  },
  methods: {
    showUserPasswordType() {
      if (this.userPasswordType === 'password') {
        this.userPasswordType = ''
      } else {
        this.userPasswordType = 'password'
      }
    },
    setData(boundAgents) {
      this.selectSubAgents = JSON.parse(JSON.stringify(this.subAgents))
      this.selectSubAgents.forEach(subAgent => {
        if (boundAgents.some(boundAgent => boundAgent === subAgent.key)) {
          subAgent.exist = true
        } else {
          subAgent.exist = false
        }
      })
      this.selectAll = !this.selectSubAgents.some(subAgent => subAgent.exist === false)
    },
    selection() {
      this.selectAll = !this.selectAll
      console.log('selection: ' + this.selectAll);
      this.selectSubAgents.forEach(element => {
        element.exist = this.selectAll
      });
      this.selectSubAgents = JSON.parse(JSON.stringify(this.selectSubAgents))
    },
    handleCheckboxChange(select) {
      console.log('handleCheckboxChange: ' + select);
      if (select) {
        this.selectAll = !this.selectSubAgents.some(subAgent => subAgent.exist === false)
      } else {
        this.selectAll = false;
      }
      this.selectSubAgents = JSON.parse(JSON.stringify(this.selectSubAgents))
    },
    inputFocus() {
      this.userInputState = this.inputState.none
      this.errorTips = ''
    },
    checkPassword() {
      const invalid = this.form.userPassword === undefined || this.form.userPassword.length <= 0
      this.userInputState = invalid ? this.inputState.error : this.inputState.success
      if (invalid) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
      }
    },
    onSubmit() {
      if (this.userInputState !== this.inputState.success) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }

      const data = JSON.parse(JSON.stringify(this.form))
      data.agents = []
      this.selectSubAgents.filter(item => item.exist).forEach(element => {
        data.agents.push(element.key)
      })
      this.$emit('onSubmit', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  .p-buttons {
    padding-top: 0.41667rem;
    padding-bottom: 0.41667rem;
  }
  .popup-view {
    position: fixed;
    top: 3.75rem;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: calc(100vh - 3.75rem);
  }
  .el-checkbox {
      color: #606266;
      font-weight: 500;
      font-size: 1.4rem;
      position: relative;
      cursor: pointer;
      display: inline-block;
      white-space: nowrap;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin-bottom: 0.5rem;
  }
  .sub-account-allocations {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .step-content {
      padding: 0.83333rem 1.66667rem;
      position: relative;
      z-index: 0;
      .el-checkbox__input {
        .el-checkbox__inner {
          width: 1.16667rem;
          height: 1.16667rem;
        }
      }
      .el-table {
        font-size: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #000;
        width: 100%;
        td {
          text-align: center;
          padding: 0.5rem 0;
          &.w2 {
            width: 20%;
          }
          &.w6 {
            width: 60%;
          }
        }
        tr {
          &.head {
            background: #e9e9e9;
          }
          &:nth-child(even) {
            background: #e9e9e9;
          }
        }
      }
    }
    .page-title {
      font-size: 1rem;
      color: #fff;
      text-align: left;
      padding: 1rem;
      margin-top: 1.66667rem;
      margin-bottom: 0.83333rem;
      .user-name {
        color: #f9c901;
      }
    }
  }
}
#app.pc {
  .agent-form {
    .step-content {
      max-width: 100%;
      .handicap-table {
        transform: translateZ(0);
        .el-table {
          font-size: 12px;
          line-height: 1;
          .head {
            .cell {
              word-break: break-word;
            }
          }
          .cell {
            white-space: normal;
            overflow-x: visible;
            font-size: 12px;
            line-height: 1;
            height: 100%;
            text-align: left;
            padding: 0;
            width: 30px;
            padding-right: 10px;
            &.checkbox {
              padding-left: 10px;
              width: 60px;
            }
            &.name {
              width: 100px;
            }
            &.long {
              width: 180px !important;
            }
          }
          tbody {
            tr {
              transform: translateZ(0);
              &:nth-child(odd) {
                background: #e9e9e9;
              }
            }
          }
        }
      }
    }
    .el-form {
      .operator-psw {
        .el-input__inner {
          height: 2.8rem;
          max-width: 190px;
        }
        .form-item-label {
          font-size: 15px;
        }
      }
    }
    &.others {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      overflow: auto;
      .page-title {
        font-size: 1rem;
        color: #fff;
        text-align: left;
        padding: 1rem;
        margin-top: 1.66667rem;
        margin-bottom: 0.83333rem;
        .user-name {
          color: #f9c901;
        }
      }
      .el-alert__title {
        font-size: 1rem;
      }
    }
  }
  .subAccountFormAllocations {
    .popup-buttons {
      margin-top: 5px !important;
    }
  }
}
</style>
