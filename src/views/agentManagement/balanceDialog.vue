<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div>
        <div class="notice-cover" @click.stop="onClose" />
        <div class="fadeInUp pp notice animated">
          <div id="scroll-inner" class="scroll-inner off">
            <div v-loading="dialogLoading" class="scroll-view" style="display: block; position: static; max-height: 70vh;">
              <div class="w-100" belongto="subAgent">
                <div class="detail-credit-form border-0 animated fadeInUp">
                  <div class="credit-item-group">
                    <div class="credit-item w-100">
                      <div class="label fixed-size">{{ $t('__superiorAgent') }}</div>
                      <div class="value yellow">{{ agentBalanceInfo.parent }}</div>
                    </div>
                    <div class="credit-item mr-2">
                      <div class="label fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                      <div class="value">
                        <span class="">{{ parentBalance }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="credit-item-group">
                    <div class="credit-item w-100">
                      <div class="label yellow fixed-size">{{ accountTitle }}</div>
                      <div class="value yellow">{{ operateName }}</div>
                    </div>
                    <div class="credit-item mr-2">
                      <div class="label fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                      <div class="value">
                        <span class="">{{ balance }}</span>
                      </div>
                    </div>
                  </div>
                  <form class="el-form el-form--label-left">
                    <div class="credit-item-group">
                      <div class="credit-item big">
                        <div class="label fixed-size yellow">{{ balanceLabelTitle }}</div>
                        <div class="value">
                          <div class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="yellow el-input el-input--small" :class="{'is-disabled': balanceDisable}">
                                <input v-model="form.amount" type="number" :disabled="balanceDisable" autocomplete="off" min="0" class="el-input__inner" @focus="inputFocus_balance()">
                                <span v-if="errorTips !== ''" class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-circle-close" style="color: rgb(245, 108, 108);" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="credit-item">
                        <div class="label fixed-size" />
                        <div class="value">
                          <small v-show="!balanceDisable" class="tip">
                            {{ $t('__range') }}
                            <span class="">1.00</span> - <span class="">{{ parentBalance }}</span>
                          </small>
                          <small v-show="balanceDisable" class="tip text-red">{{ $t('__noEnoughBalance') }}</small>
                        </div>
                      </div>
                      <div class="credit-item big h-auto">
                        <div class="label fixed-size yellow">{{ `${$t('__userPassword')}: ` }}</div>
                        <div class="value">
                          <div class="el-form-item operator-psw custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': passwordState === inputState.error, 'is-success': passwordState === inputState.success}">
                            <div class="el-form-item__content">
                              <div class="yellow el-input el-input--small el-input--suffix">
                                <input v-model="form.userPassword" :type="inputType" onkeyup="value=value.replace(/[\W]/g,'')" autocomplete="off" class="el-input__inner" @focus="inputFocus_password()" @change="checkPassword()" @blur="checkPassword()">
                                <span class="el-input__suffix">
                                  <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                    <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                    <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputType !== 'password'}" @click.stop="showPasswordType()" />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="credit-item-group">
                    <div v-if="errorTips !== ''" class="form-alert">
                      <div role="alert" class="el-alert el-alert--warning is-light fade show">
                        <i class="el-alert__icon el-icon-warning" />
                        <div class="el-alert__content">
                          <span class="el-alert__title">{{ errorTips }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="credit-item-group">
                    <div class="d-flex w-100 ">
                      <button v-if="!balanceDisable" type="button" class="el-button el-button--primary bg-yellow w-100" @click.stop="onSubmit">
                        <span>{{ `${$t('__submit')}` }}</span>
                      </button>
                      <button type="button" class="el-button bg-gray w-100 el-button--primary" @click.stop="onClose">
                        <span>{{ `${$t('__cancel')}` }}</span>
                      </button>
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
        <div class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div class="overlay-scroll-wrap scrolling">
            <div class="back-top" />
            <div id="scroll-inner" class="scroll-inner on native">
              <div class="scroll-view" style="max-height: calc(779px);">
                <div class="detail-credit-form" belongto="subAgent">
                  <div class="detail-credit">
                    <div class="credit-item-group">
                      <div class="credit-item strong w-100">
                        <div class="label">{{ `${$t('__superiorAgent')} :` }}</div>
                        <div class="value yellow">{{ agentBalanceInfo.parent }}</div>
                      </div>
                      <div class="credit-item w-100 pl-3 pr-3">
                        <div class="label text-yellow fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                        <div class="value fixed-size">
                          <span class="">{{ parentBalance }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="credit-item-group">
                      <div class="credit-item strong w-100">
                        <div class="label">{{ `${accountTitle} :` }}</div>
                        <div class="value yellow">{{ operateName }}</div>
                      </div>
                      <div class="credit-item w-100 pl-3 pr-3">
                        <div class="label text-yellow fixed-size">{{ `${$t('__liveGame')}${$t('__balance')}` }}</div>
                        <div class="value fixed-size">
                          <span class="">{{ balance }}</span>
                        </div>
                      </div>
                    </div>
                    <form class="el-form el-form--label-left">
                      <div class="credit-item-group">
                        <div class="credit-item">
                          <div class="label fixed-size yellow">{{ `${balanceLabelTitle} :` }}</div>
                          <div class="value" style="width: 200px;">
                            <div class="el-form-item el-form-item--feedback el-form-item--small">
                              <div class="el-form-item__content">
                                <div class="el-input el-input--small" :class="{'is-disabled': balanceDisable}">
                                  <input v-model="form.amount" type="number" :disabled="balanceDisable" autocomplete="off" min="0" class="el-input__inner" @focus="inputFocus_balance()">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="credit-item">
                          <div class="label fixed-size" />
                          <div class="value">
                            <small class="tip">{{ $t('__range') }}:<span class="">1.00</span> - <span class="">{{ parentBalance }}</span></small>
                            <small v-if="balanceDisable" class="tip text-red">{{ $t('__noEnoughBalance') }}</small>
                          </div>
                        </div>
                        <div class="credit-item h-auto">
                          <div class="label fixed-size yellow">{{ `${$t('__userPassword')}: ` }} :</div>
                          <div class="value" style="width: 200px;">
                            <div class="el-form-item operator-psw custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': passwordState === inputState.error, 'is-success': passwordState === inputState.success}">
                              <div class="el-form-item__content">
                                <div class="el-input el-input--small el-input--suffix">
                                  <input v-model="form.userPassword" :type="inputType" onkeyup="value=value.replace(/[\W]/g,'')" autocomplete="off" class="el-input__inner" @focus="inputFocus_password()" @change="checkPassword()" @blur="checkPassword()">
                                  <span class="el-input__suffix">
                                    <span class="el-input__suffix-inner">
                                      <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                      <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                      <i title="显示密码" class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': inputType !== 'password'}" @click.stop="showPasswordType()" />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div class="credit-item-group">
                      <div v-if="errorTips !== ''" class="form-alert">
                        <div role="alert" class="el-alert el-alert--warning is-light fade show">
                          <i class="el-alert__icon el-icon-warning" />
                          <div class="el-alert__content">
                            <span class="el-alert__title">{{ errorTips }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="credit-item-group mb-0">
                      <div class="d-flex w-100 justify-content-center">
                        <button v-if="!balanceDisable" type="button" class="el-button el-button--primary bg-yellow common-button" @click.stop="onSubmit">
                          <span>{{ `${$t('__submit')}` }}</span>
                        </button>
                        <button type="button" class="el-button bg-gray common-button el-button--primary" @click.stop="onClose">
                          <span>{{ `${$t('__cancel')}` }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
import { numberFormat } from '@/utils/numberFormat'
import { mapGetters } from 'vuex'

export default {
  name: 'BalanceDialog',
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
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'modeType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data: function() {
    return {
      passwordState: 0,
      inputType: 'password',
      operationEnum: Object.freeze({ 'depositBalance': 1, 'withdrawBalance': 2 }),
      modeEnum: Object.freeze({ 'agent': 1, 'member': 2 }),
      agentBalanceInfo: {},
      errorTips: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    balanceLabelTitle() {
      return this.operationType === this.operationEnum.depositBalance ? this.$t('__depositBalance') : this.$t('__withdrawBalance')
    },
    balanceDisable() {
      if (this.operationType === this.operationEnum.depositBalance) {
        if (this.agentBalanceInfo.parentId === 1) {
          return false
        } else {
          return Number(this.agentBalanceInfo.parentBalance) === 0
        }
      } else {
        if (this.modeType === this.modeEnum.agent) {
          return Number(this.agentBalanceInfo.agentBalance) === 0
        } else {
          return Number(this.agentBalanceInfo.memberBalance) === 0
        }
      }
    },
    parentBalance() {
      if (this.operationType === this.operationEnum.depositBalance) {
        return this.agentBalanceInfo.parentId === 1 ? 'oo' : numberFormat(this.agentBalanceInfo.parentBalance)
      } else {
        if (this.modeType === this.modeEnum.agent) {
          return numberFormat(this.agentBalanceInfo.agentBalance)
        } else {
          return numberFormat(this.agentBalanceInfo.memberBalance)
        }
      }
    },
    operateName() {
      if (this.modeType === this.modeEnum.agent) {
        return this.agentBalanceInfo.agent
      } else {
        return this.agentBalanceInfo.member
      }
    },
    balance() {
      if (this.modeType === this.modeEnum.agent) {
        return numberFormat(this.agentBalanceInfo.agentBalance)
      } else {
        return numberFormat(this.agentBalanceInfo.memberBalance)
      }
    },
    accountTitle() {
      if (this.modeType === this.modeEnum.agent) {
        return this.$t('__agentAccount')
      } else {
        return this.$t('__memberAccount')
      }
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.inputType = 'password'
        this.passwordState = this.inputState.none
        this.errorTips = ''
      }
    }
  },
  methods: {
    showPasswordType() {
      this.inputType = this.inputType === '' ? 'password' : '';
    },
    checkPassword() {
      this.passwordState = this.form.userPassword ? this.inputState.success : this.inputState.error
    },
    inputFocus_balance() {
      this.errorTips = ''
    },
    inputFocus_password() {
      this.errorTips = ''
      this.passwordState = this.inputState.none
    },
    onSubmit() {
      const num = Number(this.form.amount)
      // 判斷格式
      if (!this.form.amount || this.form.amount.length <= 0 || isNaN(num) || num <= 0) {
        this.errorTips = this.$t('__pleaseCheckFormContent')
        return
      }
      // 判斷數值有無超過範圍
      if (this.operationType === this.operationEnum.depositBalance) {
        if (this.agentBalanceInfo.parentId !== 1 && num > Number(this.agentBalanceInfo.parentBalance)) {
          this.errorTips = this.$t('__overMax')
          return
        }
      } else if (this.operationType === this.operationEnum.withdrawBalance) {
        if (num > Number(this.agentBalanceInfo.agentBalance)) {
          this.errorTips = this.$t('__overMax')
          return
        }
      }
      if (this.form.userPassword === undefined || this.form.userPassword === null || this.form.userPassword.length === 0) {
        this.setErrorTips(this.$t('__pleaseEnterUserPassword'))
        return
      }

      const data = JSON.parse(JSON.stringify(this.form))
      if (this.operationType === this.operationEnum.depositBalance) {
        this.$emit('depositBalance', data)
      } else if (this.operationType === this.operationEnum.withdrawBalance) {
        this.$emit('withdrawBalance', data)
      }
    },
    setBalanceInfo(balanceInfo) {
      this.agentBalanceInfo = balanceInfo
    },
    setErrorTips(tips) {
      this.errorTips = tips
    }
  }
}
</script>

<style lang="scss" scoped>
#app.mobile {
  .info {
    font-size: 16px;
    width: 100%;
    margin: 20px auto;
    .info-item {
      display: flex;
      padding-top: 2px;
      padding-bottom: 2px;
      .info-header {
        width: 120px;
        font-weight: bold;
      }
      .info-content {
        color: #fff;
      }
    }
  }
  .detail-credit-form {
    width: 100%;
    padding: 0;
    color: #fff !important;
    background-color: #000 !important;
    border-top: 0;
    .credit-item-group {
      max-width: 31.25rem;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-bottom: 0.83333rem;
    }
    .credit-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 2.5rem;
      .label {
        margin-right: 0.83333rem;
        &.fixed-size {
          width: 8.33333rem;
        }
      }
      .yellow {
        color: #f9c901;
        width: 15rem;
      }
      &.big {
        height: 3.33333rem;
        .value {
          height: 2.5rem;
        }
      }
    }
  }
  .notice-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(0,0,0,0.5);
    z-index: 3;
  }
}
#app.pc {
  .detail-credit-form {
    border-top: 0;
    .detail-credit {
      z-index: 3;
      width: auto;
      padding: 0px;
      color: #fff !important;
      .credit-item-group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-bottom: 0.83333rem;
        .credit-item {
          .value {
            margin-right: 1.66667rem;
          }
        }
      }
    }
  }
}
</style>
