<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="flex-column flex-fill" style="background: rgb(0, 0, 0);">
        <div class="flex-column flex-fill">
          <div class="flex-column flex-fill">
            <div class="agent-form subAccount-form popup-page flex-column flex-fill h-100">
              <div class="form-alert">
                <div class="parent-info">{{ `${$t('__superiorAgent')}: ${agentInfo.parent.nickname}` }}</div>
              </div>
              <div class="form-step-content flex-column flex-fill">
                <form class="el-form flex-column flex-fill el-form--label-left">
                  <div class="scroll-wrap flex-column flex-fill">
                    <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
                      <div class="scroll-view flex-column flex-fill">
                        <div class="initPswFormat">
                          <input type="text" name="uuu">
                          <input type="password" name="uuu">
                        </div>
                        <label class="form-item-title">{{ $t('__subAccountBaseInfo') }}</label>
                        <div class="step-content">
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__account') }}</label>
                                <small class="tip" style="display: none">{{ `${$t('__lengthLess')}5, ${$t('__lengthLong')}8` }}</small>
                              </div>
                              <div class="d-flex">
                                <div class="el-input el-input--small">
                                  <input type="text" autocomplete="off" class="el-input__inner">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__nickname') }}</label>
                                <small class="tip" />
                              </div>
                              <div class="el-input el-input--small">
                                <input type="text" autocomplete="off" class="el-input__inner">
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item custom-psw el-form-item--feedback is-error el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__password') }}</label>
                                <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input type="password" autocomplete="off" class="el-input__inner">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-close has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-check no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" />
                                  </span>
                                  <i class="el-input__icon el-input__validateIcon el-icon-circle-close" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input type="password" autocomplete="off" class="el-input__inner">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-close has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-check no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="align-items-center pt-2">
                                <label class="el-checkbox is-checked">
                                  <span class="el-checkbox__input is-checked">
                                    <span class="el-checkbox__inner" />
                                    <input type="checkbox" aria-hidden="false" true-value="0" false-value="1" class="el-checkbox__original">
                                  </span>
                                </label>
                                <span class="text-yellow">{{ $t('__effectAgentLine') }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="align-items-center pt-2">
                                <label class="el-checkbox is-checked">
                                  <span class="el-checkbox__input is-checked">
                                    <span class="el-checkbox__inner" />
                                    <input type="checkbox" aria-hidden="false" true-value="1" false-value="2" class="el-checkbox__original">
                                  </span>
                                </label>
                                <span class="text-yellow">{{ $t('__admin') }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__remark') }}</label>
                                <small class="tip" />
                              </div>
                              <div class="el-textarea el-input--small">
                                <textarea autocomplete="off" class="el-textarea__inner" style="min-height: 48.0625px;" />
                              </div>
                            </div>
                          </div>
                          <div class="el-form-item operator-psw custom-psw el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__userPassword') }}</label>
                              </div>
                              <div class="el-input el-input--small el-input--suffix">
                                <input type="password" autocomplete="off" class="el-input__inner">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-close has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-check no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="w-100 p-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="step-content">
                    <div class="form-ctrl">
                      <div class="el-row is-align-middle el-row--flex">
                        <button type="button" class="el-button bg-yellow el-button--primary">
                          <span>{{ $t('__submit') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog v-if="visible" :loading="dialogLoading" :title="title" :on-close-even="onClose" :close-on-click-modal="device === 'mobile'" :close-on-press-escape="false">
        <label class="agentNameLabel">{{ `${$t('__superiorAgent')}: ` }}
          <span class="agentNameSpan">{{ agentInfo.fullName }}</span>
        </label>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <el-form-item :label="$t('__accountGenerateMode')">
            <el-switch
              v-model="autoGenerateAccount"
              :active-color="color_yellow"
              :inactive-color="color_yellow"
              :active-text="$t('__auto')"
              :inactive-text="$t('__manual')"
            />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__account')" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item :label="$t('__nickname')" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__password')" prop="password">
            <el-input v-model="form.password" show-password />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__confirmPassword')" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" show-password />
          </el-form-item>
          <el-form-item :label="$t('__accountStatus')" prop="status">
            <el-select v-model="form.status">
              <el-option v-for="item in accountStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__timeZone')" prop="timeZone">
            <el-select v-model="form.timeZone">
              <el-option v-for="item in time_zone" :key="item.id" :label="item.city_name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.effectAgentLine" class="red-tick" :label="$t('__effectAgentLine')" />
            <el-checkbox v-model="form.isAdmin" class="red-tick" :label="$t('__admin')" />
          </el-form-item>
          <el-form-item :label="$t('__remark')" prop="remark">
            <el-input v-model="form.remark" type="textarea" :rows="2" />
          </el-form-item>
          <el-form-item v-if="visible" :label="$t('__userPassword')" prop="userPassword">
            <el-input v-model="form.userPassword" show-password />
          </el-form-item>
        </el-form>
        <span v-if="!dialogLoading" slot="bodyFooter">
          <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import colors from '@/styles/variables.scss'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { subAccountCreateAccount, subAccountCreate, subAccountEdit } from '@/api/agentManagement/subAccount'
import { mapGetters } from 'vuex'
import Dialog from '@/components/Dialog'

export default {
  name: 'SubAccountEditDialog',
  components: { Dialog },
  mixins: [dialogCommon, common],
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
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'confirm': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
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
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (value.trim().length < 5) {
        callback(new Error(this.$t('__lengthLess') + '5'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.password !== this.form.confirmPassword) {
        callback(new Error(`${this.$t('__confirmPassword')}${this.$t('__and')}${this.$t('__password')}${this.$t('__inconsistent')}`))
      } else {
        callback()
      }
    }
    return {
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validatePassword }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      operationEnum: Object.freeze({ 'create': 1, 'edit': 2 }),
      time_zone: [],
      autoGenerateAccount: false,
      dialogLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType'
    ]),
    color_yellow() {
      return colors.yellow
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.$refs.form.clearValidate()
      }
    },
    autoGenerateAccount() {
      if (this.autoGenerateAccount) {
        subAccountCreateAccount().then((res) => {
          this.form.account = res.account
          this.$refs.form.clearValidate()
        }).catch(() => {
          this.autoGenerateAccount = false
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          data.effectAgentLine = data.effectAgentLine ? '1' : '0'
          data.isAdmin = data.isAdmin ? '1' : '0'
          if (this.operationType === this.operationEnum.create) {
            data.agentId = this.agentInfo.id
            this.dialogLoading = true
            subAccountCreate(data).then((res) => {
              this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
              this.dialogLoading = false
            }).catch(() => {
              this.dialogLoading = false
            })
          } else if (this.operationType === this.operationEnum.edit) {
            this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
              this.dialogLoading = true
              subAccountEdit(data).then((res) => {
                this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
                this.dialogLoading = false
              }).catch(() => {
                this.dialogLoading = false
              })
            })
          }
        }
      })
    },
    onClose() {
      this.$emit('close')
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    },
    setTimeZone(data) {
      this.time_zone = data
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

label {
  font-weight: 300;
}

.agentNameLabel {
  font-size: 14px;
  color: #fff
}

.el-checkbox,
.agentNameSpan {
  color: $yellow;
}

.el-checkbox+.el-checkbox {
  margin-left:50px;
}

.el-steps--horizontal {
  margin: 15px 0
}

.el-select,
.el-input,
.el-textarea{
  width: 90%;
}
</style>
