<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="popup-page">
        <div class="w-100 pt-3 pb-3">
          <el-steps v-if="visible" :active="curIndex" class="form-step" finish-status="success">
            <el-step v-if="hasStep('agentInfo')" />
            <el-step v-if="hasStep('rate')" />
            <el-step v-if="hasStep('limit')" />
            <el-step v-if="hasStep('balanceConfig')" />
            <el-step v-if="hasStep('confirm')" />
          </el-steps>
        </div>
        <div class="form-step-content flex-column flex-fill">
          <div class="parent-info">{{ `${$t('__superiorAgent')}: ${agentInfo.fullName}` }}</div>
          <div class="flex-column flex-fill scroll-inner main-form">
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__agentInfo') }}</label>
              <div class="step-content">
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="d-flex align-items-center">
                      <label class="form-item-label">{{ $t('__accountGenerateMode') }}</label>
                      <el-switch
                        v-model="autoGenerateAccount"
                        :active-color="color_yellow"
                        :inactive-color="color_yellow"
                        :active-text="$t('__auto')"
                        :inactive-text="$t('__manual')"
                      />
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': step1.account.hasError, 'is-success': step1.account.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__account') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-input el-input--small">
                      <input v-model="form.account" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.account)" @blur="inputChange(step1.account, form.account)" @change="inputChange(step1.account, form.account)">
                      <span v-if="step1.account.hasError || step1.account.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i v-if="step1.account.hasError" class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i v-if="step1.account.isSuccess" class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small" :class="{'is-error': step1.nickname.hasError, 'is-success': step1.nickname.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__name') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-input el-input--small">
                      <input v-model="form.nickname" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.nickname)" @blur="inputChange(step1.nickname, form.nickname)" @change="inputChange(step1.nickname, form.nickname)">
                      <span v-if="step1.nickname.hasError || step1.nickname.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i v-if="step1.nickname.hasError" class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i v-if="step1.nickname.isSuccess" class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': step1.password.hasError, 'is-success': step1.password.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__password') }}</label>
                      <small class="tip">{{ `${$t('__lengthLess')}5` }}</small>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input v-model="form.password" :type="step1.password.type" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.password)" @blur="passwordChange(step1.password, form.password)" @change="passwordChange(step1.password, form.password)">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.password.type!=='password'}" @click="showPassword(step1.password)" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item custom-psw el-form-item--feedback el-form-item--small" :class="{'is-error': step1.confirmPassword.hasError, 'is-success': step1.confirmPassword.isSuccess}">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input v-model="form.confirmPassword" :type="step1.confirmPassword.type" autocomplete="off" class="el-input__inner" @focus="inputFocus(step1.confirmPassword)" @blur="confirmPasswordChange" @change="confirmPasswordChange">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.confirmPassword.type!=='password'}" @click="showPassword(step1.confirmPassword)" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__accountStatus') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.status" class="el-select w-100">
                      <option v-for="item in accountStatusType" :key="item.key" :value="item.key">
                        {{ $t(item.nickname) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__timeZone') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.time_zone" class="el-select w-100">
                      <option v-for="item in time_zone" :key="item.id" :value="item.id">
                        {{ $t(item.city_name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__currency') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.currency" class="el-select w-100">
                      <option v-for="item in currency" :key="item.id" :value="item.id">
                        {{ $t(item.name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__remark') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-textarea el-input--small">
                      <textarea v-model="form.remark" autocomplete="off" class="el-textarea__inner" style="min-height: 48.0625px;" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="step-content">
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button type="button" class="el-button bg-yellow el-button--primary">
                  <span>{{ $t('__nextStep') }}</span>
                </button>
              </div>
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
        <div class="agentInfo">
          <span>{{ $t('__superiorAgent') }}</span>
          <span class="yellow-color agentFullName">{{ agentInfo.fullName }}</span>
        </div>
        <el-steps v-if="visible" :active="curIndex" align-center finish-status="success">
          <el-step v-if="hasStep('agentInfo')" :description="$t('__agentInfo')" />
          <el-step v-if="hasStep('rate')" :description="$t('__rate')" />
          <el-step v-if="hasStep('limit')" :description="$t('__handicapLimit')" />
          <el-step v-if="hasStep('balanceConfig')" :description="$t('__balanceConfig')" />
          <el-step v-if="hasStep('confirm')" :description="$t('__confirm')" />
        </el-steps>
        <el-form v-show="curIndex === stepEnum.agentInfo" ref="step1" :model="form" :rules="step1Rules">
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__accountGenerateMode')">
            <el-switch
              v-model="autoGenerateAccount"
              :active-color="color_yellow"
              :inactive-color="color_yellow"
              :active-text="$t('__auto')"
              :inactive-text="$t('__manual')"
            />
          </el-form-item>
          <el-form-item v-if="operationType===operationEnum.create&&visible" :label="$t('__agentAccount')" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item :label="$t('__agentNickname')" prop="nickname">
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
          <el-form-item :label="$t('__timeZone')" prop="time_zone">
            <el-select v-model="form.time_zone">
              <el-option v-for="item in time_zone" :key="item.id" :label="item.city_name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="showCurrency" :label="$t('__currency')" prop="currency">
            <el-select v-model="form.currency">
              <el-option v-for="item in currency" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('__remark')" prop="remark">
            <el-input v-model="form.remark" type="textarea" :rows="2" />
          </el-form-item>
        </el-form>
        <el-form v-show="curIndex === stepEnum.rate" ref="step2" :model="form" :rules="step2Rules">
          <el-form-item :label="`${$t('__liveGame')} ${$t('__commissionRate')}`" class="relative" prop="live_commission_rate">
            <span class="form-item-tip">{{ commissionRateTip }}</span>
            <el-input v-model="form.live_commission_rate" type="number" :disabled="agentInfo.live_commission_rate === 0" min="0" :max="agentInfo.live_commission_rate" />
          </el-form-item>
          <el-form-item :label="`${$t('__liveGame')} ${$t('__rollingRate')}`" class="relative" prop="live_rolling_rate">
            <span class="form-item-tip">{{ rollingRateTip }}</span>
            <el-input v-model="form.live_rolling_rate" type="number" :disabled="agentInfo.live_rolling_rate === 0" min="0" :max="agentInfo.live_rolling_rate" />
          </el-form-item>
          <el-form-item v-if="agentInfo.gift_status === '1'" :label="`${$t('__liveGame')} ${$t('__giftRate')}`" class="relative" prop="live_gift_rate">
            <span class="form-item-tip">{{ giftRateTip }}</span>
            <el-input v-model="form.live_gift_rate" type="number" :disabled="agentInfo.live_gift_rate === 0" min="0" :max="agentInfo.live_gift_rate" />
          </el-form-item>
        </el-form>
        <table
          v-show="curIndex === stepEnum.limit"
          ref="handicapsTable"
        >
          <thead>
            <tr>
              <th>
                <el-checkbox v-model="selectAll" class="red-tick" @change="selectionHandicaps" />
              </th>
              <th align="center">{{ $t('__nickname') }}</th>
              <th align="center">{{ $t('__betMin') }}</th>
              <th align="center">{{ $t('__betMax') }}</th>
              <th align="center">{{ $t('__currency') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in agentInfo.handicaps"
              :key="index"
              :class="{'single-row': index % 2 === 0}"
            >
              <td>
                <el-checkbox v-model="item.exist" class="red-tick" @change="handleCheckboxChange" />
              </td>
              <td align="center">{{ item.nickname }}</td>
              <td align="center">{{ item.bet_min }}</td>
              <td align="center">{{ item.bet_max }}</td>
              <td align="center">{{ item.currency }}</td>
            </tr>
          </tbody>
        </table>
        <el-form v-show="curIndex === stepEnum.balanceConfig" ref="step4" :model="form" :rules="step4Rules">
          <template>
            <div>
              <p>
                <label>{{ `${$t('__superiorAgent')}: ` }}
                  <span>{{ agentBalanceInfo.parent }}</span>
                </label>
              </p>
              <p>
                <label>{{ `${$t('__balance')}: ` }}
                  <span>{{ parentBalance }}</span>
                </label>
              </p>
              <p>
                <label>{{ `${$t('__agentAccount')}: ` }}
                  <span>{{ agentBalanceInfo.agent }}</span>
                </label>
              </p>
              <p>
                <label>{{ `${$t('__balance')}: ` }}
                  <span>{{ agentBalanceInfo.agentBalance }}</span>
                </label>
              </p>
            </div>
          </template>
          <el-form-item :label="$t('__depositBalance')" prop="balance">
            <el-input v-model="form.balance" type="number" :disabled="balanceDisable" min="0" />
          </el-form-item>
        </el-form>
        <el-form v-show="curIndex === stepEnum.confirm" ref="step5" :model="form" :rules="step5Rules">
          <el-row>
            <el-col :span="12">
              <label>{{ $t('__agentInfo') }}</label>
              <div />
              <div>
                <p>
                  <label>{{ $t('__agentAccount') }}
                    <span>{{ form.account }}</span>
                  </label>
                </p>
                <p>
                  <label>{{ $t('__agentNickname') }}
                    <span>{{ form.nickname }}</span>
                  </label>
                </p>
                <p>
                  <label>{{ $t('__timeZone') }}
                    <span>{{ timeZoneCityName }}</span>
                  </label>
                </p>
                <template v-if="showCurrency">
                  <p>
                    <label>{{ $t('__currency') }}
                      <span>{{ currencyName }}</span>
                    </label>
                  </p>
                </template>
                <template v-if="operationType===operationEnum.create">
                  <p>
                    <label>{{ $t('__balance') }}
                      <span>{{ numberFormatStr(form.balance) }}</span>
                    </label>
                  </p>
                </template>
                <label>{{ $t('__remark') }}
                  <span>{{ form.remark }}</span>
                </label>
              </div>
            </el-col>
            <el-col :span="12">
              <label>{{ $t('__rate') }}</label>
              <div />
              <div>
                <p>
                  <label>{{ `${$t('__liveGame')} ${$t('__commissionRate')}` }}
                    <span>{{ `${numberFormatStr(form.live_commission_rate)}%` }}</span>
                  </label>
                </p>
                <p>
                  <label>{{ `${$t('__liveGame')} ${$t('__rollingRate')}` }}
                    <span>{{ `${numberFormatStr(form.live_rolling_rate)}%` }}</span>
                  </label>
                </p>
                <p v-if="agentInfo.gift_status === '1'">
                  <label>{{ `${$t('__liveGame')} ${$t('__giftRate')}` }}
                    <span>{{ `${numberFormatStr(form.live_gift_rate)}%` }}</span>
                  </label>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <label>{{ $t('__handicapLimit') }}</label>
            <div />
            <el-table
              :data="selectHandicaps"
              tooltip-effect="dark"
              header-cell-class-name="bg-black_table_header"
              row-class-name="bg-black_table_col"
              style="background: black;"
            >
              <el-table-column prop="id" label="ID" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="nickname" :label="$t('__nickname')" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="bet_min" :label="$t('__betMin')" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="bet_max" :label="$t('__betMax')" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="currency" :label="$t('__currency')" align="center" :show-overflow-tooltip="true" />
            </el-table>
            <el-form-item v-if="visible" :label="$t('__userPassword')" prop="userPassword" style="text-align: left;">
              <el-input v-model="form.userPassword" show-password />
            </el-form-item>
          </el-row>
        </el-form>
        <span v-if="!dialogLoading" slot="bodyFooter">
          <el-button v-if="previousBtnVisible" class="bg-gray" @click="onPreviousBtnClick">{{ $t("__previous") }}</el-button>
          <el-button v-if="nextBtnVisible" class="bg-yellow" @click="onNextBtnClick">{{ $t("__nextStep") }}</el-button>
          <el-button v-if="confirmBtnVisible" class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import colors from '@/styles/variables.scss'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { agentCreateAccount, agentGetSetBalanceInfo, agentCreate, agentEdit } from '@/api/agentManagement/agent'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import Dialog from '@/components/Dialog'

export default {
  name: 'AgentEditDialog',
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
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
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
    'stepEnum': {
      type: Object,
      require: true,
      default() {
        return Object.freeze({ 'agentInfo': 0, 'rate': 1, 'limit': 2, 'balanceConfig': 3, 'confirm': 4 })
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
        callback(new Error(`${this.$t('__lengthLess')}5`))
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
    const validateCommissionRate = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.live_commission_rate > this.agentInfo.live_commission_rate) {
        callback(new Error(this.$t('__overMax')))
      } else if (this.form.live_commission_rate < 0) {
        callback(new Error(this.$t('__lowerMin')))
      } else {
        callback()
      }
    }
    const validateRollingRate = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.live_rolling_rate > this.agentInfo.live_rolling_rate) {
        callback(new Error(this.$t('__overMax')))
      } else if (this.form.live_rolling_rate < 0) {
        callback(new Error(this.$t('__lowerMin')))
      } else {
        callback()
      }
    }
    const validateGiftRate = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.live_gift_rate > this.agentInfo.live_gift_rate) {
        callback(new Error(this.$t('__overMax')))
      } else if (this.form.live_gift_rate < 0) {
        callback(new Error(this.$t('__lowerMin')))
      } else {
        callback()
      }
    }
    const validateBlance = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (this.form.balance < 0) {
        callback(new Error(this.$t('__lowerMin')))
      } else if (this.agentBalanceInfo.parentId !== 1 && Number(this.form.balance) > Number(this.agentBalanceInfo.parentBalance)) {
        callback(new Error(this.$t('__overMax')))
      } else {
        callback()
      }
    }
    return {
      selectAll: false,
      step1Rules: {
        account: [{ required: true, trigger: 'blur', validator: validatePassword }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      step2Rules: {
        live_commission_rate: [{ required: true, trigger: 'blur', validator: validateCommissionRate }],
        live_rolling_rate: [{ required: true, trigger: 'blur', validator: validateRollingRate }],
        live_gift_rate: [{ required: true, trigger: 'blur', validator: validateGiftRate }]
      },
      step4Rules: {
        balance: [{ required: true, trigger: 'blur', validator: validateBlance }]
      },
      step5Rules: {
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      operationEnum: Object.freeze({ 'create': 1, 'edit': 2 }),
      autoGenerateAccount: false,
      curIndex: 0,
      time_zone: [],
      currency: [],
      agentBalanceInfo: {},
      selectHandicaps: [],
      step1: {
        account: {
          hasError: false,
          isSuccess: false
        },
        nickname: {
          hasError: false,
          isSuccess: false
        },
        password: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        },
        confirmPassword: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType'
    ]),
    color_yellow() {
      return colors.yellow
    },
    commissionRateTip() {
      return `${this.$t('__range')}0%-${this.agentInfo.live_commission_rate}%`
    },
    rollingRateTip() {
      return `${this.$t('__range')}0%-${this.agentInfo.live_rolling_rate}%`
    },
    giftRateTip() {
      return `${this.$t('__range')}0%-${this.agentInfo.live_gift_rate}%`
    },
    previousBtnVisible() {
      return this.curIndex > this.stepEnum.agentInfo
    },
    nextBtnVisible() {
      if (this.curIndex === this.stepEnum.limit) {
        return this.selectHandicaps.length > 0
      }
      return this.curIndex < this.stepEnum.confirm
    },
    confirmBtnVisible() {
      return this.curIndex >= this.stepEnum.confirm
    },
    showCurrency() {
      return this.operationType === this.operationEnum.create && this.agentInfo.id === 1
    },
    balanceDisable() {
      if (this.agentBalanceInfo.parentId === 1) {
        return false
      }
      return Number(this.agentBalanceInfo.parentBalance) === 0
    },
    timeZoneCityName() {
      const timeZoneData = this.time_zone.find(timezone => this.form.time_zone === timezone.id)
      return timeZoneData ? timeZoneData.city_name : ''
    },
    currencyName() {
      const currencyData = this.currency.find(currencyItem => this.form.currency === currencyItem.id)
      return currencyData ? currencyData.name : ''
    },
    parentBalance() {
      return this.agentBalanceInfo.parentId === 1 ? '∞' : this.agentBalanceInfo.parentBalance
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.curIndex = this.stepEnum.agentInfo
      } else {
        this.autoGenerateAccount = false
        this.$refs.step1.clearValidate()
        this.$refs.step2.clearValidate()
        this.$refs.step4.clearValidate()
        this.$refs.step5.clearValidate()
      }
    },
    autoGenerateAccount() {
      if (this.autoGenerateAccount) {
        agentCreateAccount().then((res) => {
          this.form.account = res.account
          this.$refs.step1.clearValidate()
        }).catch(() => {
          this.autoGenerateAccount = false
        })
      }
    },
    curIndex() {
      if (this.curIndex === this.stepEnum.limit) {
        this.agentInfo.handicaps.forEach(agentInfoHandicap => {
          if (this.form.handicaps.some(formHandicaps => formHandicaps.id === agentInfoHandicap.id)) {
            this.$refs.handicapsTable.toggleRowSelection(agentInfoHandicap, true)
          }
        })
      } else if (this.curIndex === this.stepEnum.balanceConfig) {
        const id = this.operationType === this.operationEnum.create ? this.agentInfo.id : this.form.id
        this.dialogLoading = true
        const data = { agentId: id, actType: 'create' }
        agentGetSetBalanceInfo(data).then((res) => {
          this.agentBalanceInfo = res.rows
          this.agentBalanceInfo.agent = `${this.form.nickname}(${this.form.account})`
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      }
    }
  },
  methods: {
    confirmPasswordChange() {
      const check = this.form.confirmPassword && this.form.password === this.form.confirmPassword
      this.step1.confirmPassword.isSuccess = check
      this.step1.confirmPassword.hasError = !check
    },
    passwordChange(attributes, model) {
      if (model && model.length >= 5) {
        attributes.isSuccess = true
        attributes.hasError = false
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
      }
    },
    showPassword(attributes) {
      if (attributes.type === 'password') {
        attributes.type = ''
      } else {
        attributes.type = 'password'
      }
    },
    inputChange(attributes, model) {
      if (model) {
        attributes.isSuccess = true
        attributes.hasError = false
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
      }
    },
    inputFocus(attributes) {
      attributes.hasError = false
    },
    handleCheckboxChange(select) {
      if (select) {
        this.selectAll = !this.serverData.allPermissions.some(permissions => permissions.exist === false);
      } else {
        this.selectAll = false;
      }
    },
    hasStep(step) {
      for (const stepKey in this.stepEnum) {
        if (step === stepKey) {
          return true
        }
      }
      return false
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    selectionHandicaps(select) {
      this.serverData.allPermissions.forEach(element => {
        element.exist = select;
      });
      this.serverData.allPermissions = JSON.parse(JSON.stringify(this.serverData.allPermissions));
    },
    handleSelectionHandicaps(val) {
      this.selectHandicaps = val
    },
    onNextBtnClick() {
      let next = false
      if (this.curIndex === this.stepEnum.agentInfo) {
        this.$refs.step1.validate((valid) => {
          next = valid
        })
      } else if (this.curIndex === this.stepEnum.rate) {
        this.$refs.step2.validate((valid) => {
          next = valid
        })
      } else if (this.curIndex === this.stepEnum.limit) {
        next = true
      } else if (this.curIndex === this.stepEnum.balanceConfig) {
        this.$refs.step4.validate((valid) => {
          next = valid
        })
      }

      if (next) {
        this.curIndex++
      }
    },
    onPreviousBtnClick() {
      this.curIndex--
    },
    onSubmit() {
      this.$refs.step5.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form))
          data.handicaps = []
          this.selectHandicaps.forEach(element => {
            data.handicaps.push(element.id)
          })
          if (this.operationType === this.operationEnum.create) {
            data.parent = this.agentInfo.id
            this.dialogLoading = true
            agentCreate(data).then((res) => {
              this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
              this.dialogLoading = false
            }).catch(() => {
              this.dialogLoading = false
            })
          } else if (this.operationType === this.operationEnum.edit) {
            this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
              this.dialogLoading = true
              agentEdit(data).then((res) => {
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
    setTimeZone(data) {
      this.time_zone = data
    },
    setCurrency(data) {
      this.currency = data
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.main-form {
  max-height: calc(100vh - 3.75rem - 7.5rem - 3.75rem);
}

.popup-page {
  width: 100vw;
  height: calc(100vh - 3.75rem);
  background-color: #000;
  position: fixed;
  top: $navBarHeight;
  left: 0;
  z-index: 1;
  .form-step {
    width: 100%;
    padding: 0.83333rem 1.66667rem;
    border-radius: 0;
    .el-step__head {
      .el-step__line {
        height: 0.16667rem;
        top: 0.91667rem;
        left: 0;
        right: 0;
      }
      .el-step__icon {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        width: 2rem;
        height: 2rem;
        font-size: 1.16667rem;
      }
      &.is-process {
        .el-step__icon {
          color: #000;
          border-color: #000;
          background-color: #f9c901;
        }
      }
      &.is-wait {
        .el-step__icon {
          color: #000;
          border-color: #000;
          background-color: #a3a3a3;
        }
      }
    }
    .el-step__title {
      font-size: .91667rem;
    }
  }
  .parent-info {
    font-size: 1.08333rem;
    color: #fff;
    text-align: right;
    padding: 0.83333rem;
  }
  .step-content {
    padding: 0 1.66667rem;
    position: relative;
    z-index: 0;
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
  }
  .el-form {
    .form-item-title {
      background-color: #f9c901;
      font-size: 1.16667rem;
      font-weight: bold;
      padding: 1.25rem 1.66667rem;
      color: #000;
      background: #f9c901;
      width: 100%;
    }
    .step-content {
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          line-height: 1 !important;
        }
        &.is-error {
          input {
            border-color: #ff473d !important;
          }
        }
        .el-select {
          height: 2.5rem;
        }
      }
      .form-item-label {
        margin-top: 0.41667rem;
        margin-bottom: 0.41667rem;
        min-width: 2.5rem;
        white-space: nowrap;
        font-size: 1.16667rem;
        color: #f9c901;
      }
      input {
        font-size: 1.16667rem;
        margin-bottom: 0 !important;
      }
      .label-group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 0.83333rem 0;
      }
      .tip {
        margin-top: 0.41667rem;
        margin-bottom: 0.41667rem;
        font-size: 1rem;
        color: #a3a3a3;
        margin-left: auto;
      }
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
      .el-textarea__inner {
        border-radius: 0.25rem;
        border: 0.08333rem solid #f9c901;
        background-color: #fff;
        padding: 0.83333rem;
        font-size: 1.33333rem;
        color: #000;
      }
      .el-input__suffix {
        .el-input__icon {
          line-height: 2.4rem !important;
        }
      }
    }
    .el-switch {
      .el-switch__label {
        color: #fff;
        font-size: 1.16667rem;
        display: flex;
        align-items: center;
        &.is-active {
          color: #f9c901;
        }
        * {
          font-size: 1.16667rem;
        }
      }
      .el-switch__core {
        border-color: #f9c901 !important;
        background-color: #f9c901 !important;
      }
    }
  }
}

// .agentInfo {
//   .agentFullName {
//     margin-left: 10px;
//   }
// }

// .el-step,
// .el-form {
//   margin-top: 10px;
// }

// .relative {
//   position: relative;
// }

// .form-item-tip {
//   position: absolute;
//   padding: 5px 0 0 125px;
//   display: block;
//   line-height: 14px;
//   color: #f80;
//   top: calc(-100% + 7px);
//   right: 0;
// }

// @media screen and (min-width: 768px) and (max-width: 991px) {
//   .agentInfo {
//     width: 50%;
//     margin: 0 auto;
//   }
// }

// @media screen and (min-width: 992px) {
//   .agentInfo {
//     width: 50%;
//     margin: 0 auto;
//   }
// }
</style>
