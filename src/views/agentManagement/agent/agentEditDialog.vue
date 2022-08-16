<template>
  <Dialog
    v-if="visible"
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
      selectHandicaps: []
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

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.agentInfo {
  .agentFullName {
    margin-left: 10px;
  }
}

.el-step,
.el-form {
  margin-top: 10px;
}

.relative {
  position: relative;
}

.form-item-tip {
  position: absolute;
  padding: 5px 0 0 125px;
  display: block;
  line-height: 14px;
  color: #f80;
  top: calc(-100% + 7px);
  right: 0;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .agentInfo {
    width: 50%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 992px) {
  .agentInfo {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
