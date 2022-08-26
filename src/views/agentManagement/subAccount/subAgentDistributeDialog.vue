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
                                <input v-model="form.userPassword" :type="userPasswordType" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkPassword()" @blur="checkPassword()">
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
      -
    </template>
  </div>
</template>

<script>
// import Dialog from '@/components/Dialog'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'

export default {
  name: 'SubAgentDistributeDialog',
  // components: { Dialog },
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
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      userPasswordType: 'password',
      selectAll: false,
      selectSubAgents: [],
      errorTips: '',
      userInputState: 0
    }
  },
  computed: {
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
      this.selectSubAgents.forEach(element => {
        element.exist = this.selectAll
      });
      this.selectSubAgents = JSON.parse(JSON.stringify(this.selectSubAgents))
    },
    handleCheckboxChange(select) {
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

<style lang="scss">
#app .subAgentDistributeDialog {
  .subAgent {
    width: 100%;
    .el-checkbox {
      .el-checkbox__input {
        .el-checkbox__inner {
          width: 2rem;
          height: 2rem;
        }
      }
      &.red-tick {
        .is-checked {
          .el-checkbox__inner {
            &:after {
              width: 0.5rem;
              height: 1.5rem;
              left: 1rem;
              top: -0.5rem;
            }
          }
        }
      }
    }
    .agent {
      font-size: 1.5rem;
    }
  }
  .el-form {
    .el-form-item {
      .el-form-item__label {
        line-height: 2rem;
      }
    }
  }
}

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
</style>
