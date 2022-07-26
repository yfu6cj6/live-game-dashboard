<template>
  <div>
    <el-table class="agentManagement-agentTable" :data="tableData" border stripe :max-height="viewHeight">
      <af-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item :label="$t('__remark')">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </af-table-column>
      <el-table-column align="center" :width="200">
        <template slot-scope="scope">
          <router-link :to="`/agentManagement/agentManagement/${scope.row.id}`">
            <el-button class="agentBtn" size="mini">
              {{ scope.row.fullName }}
            </el-button>
          </router-link>
          <br>
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-setting" @click="onEditBtnClick(scope.row)" />
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-unlock" @click="onModPasswordBtnClick(scope.row)" />
        </template>
        <template #header>
          <span>{{ $t('__agent') }}</span>
          <el-popover
            v-model="popover"
            placement="right"
            :visible-arrow="false"
            @show="showPopover"
          >
            <span class="fullNameSearchTitle">{{ $t('__agent') }}</span>
            <input ref="fullNameSearchInput" v-model="searchForm.account" :placeholder="$t('__enterKeys')" @keyup.enter.exact="onFullNameSearchBtnClick">
            <el-button class="bg-yellow" style="margin-left: 10px;" size="mini" @click="onFullNameSearchBtnClick">{{ $t("__search") }}</el-button>
            <el-button class="bg-gray" size="mini" @click="onFullNameResetBtnClick">{{ $t("__reset") }}</el-button>
            <el-button slot="reference" class="search" size="mini">
              <svg-icon class="icon" icon-class="search" />
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <af-table-column prop="currency" :label="$t('__currency')" align="center" />
      <af-table-column :label="$t('__balance')" align="center" :width="160">
        <template slot-scope="scope">
          <span class="scope-content">{{ numberFormatStr(scope.row.balance) }}</span>
          <br>
          <el-button v-if="!isAgentSubAccount" class="labelButton bg-yellow" size="mini" @click="onDepositBtnClick(scope.row)">{{ $t("__deposit") }}</el-button>
          <el-button v-if="!isAgentSubAccount" class="labelButton bg-yellow" size="mini" @click="onWithdrawBtnClick(scope.row)">{{ $t("__withdraw") }}</el-button>
          <el-button
            v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'"
            class="labelButton bg-yellow"
            size="mini"
            :title="$t('__agentOneClickRecyclingTitle')"
            @click="onOneClickRecyclingBtnClick(scope.row)"
          >
            {{ $t("__oneClickRecycling") }}
          </el-button>
        </template>
      </af-table-column>
      <af-table-column prop="cityNameLabel" :label="$t('__timeZone')" align="center" />
      <af-table-column :label="$t('_handicapLimit')" align="center" :width="100">
        <template slot-scope="scope">
          <el-button class="labelButton bg-yellow" size="mini" @click="onLimitBtnClick(scope.row.handicaps)">{{ $t("_handicapLimit") }}</el-button>
        </template>
      </af-table-column>
      <af-table-column prop="directAgentCount" :label="$t('__directAgentCount')" align="center" />
      <af-table-column prop="directPlayerCount" :label="$t('__directPlayerCount')" align="center" />
      <af-table-column :label="$t('__liveGame')" align="center" :width="170">
        <template slot-scope="scope">
          <div class="liveGameGroup">
            <span class="scope-content">{{ `${$t('__commissionRate')}: ${numberFormatStr(scope.row.live_commission_rate)}%` }}</span>
            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click="onCommissionRateLogBtnClick(scope.row)" />
            <br>
            <span class="scope-content">{{ `${$t('__rollingRate')}: ${numberFormatStr(scope.row.live_rolling_rate)}%` }}</span>
            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click="onRollingRateLogBtnClick(scope.row)" />
            <br>
            <span class="scope-content">{{ `${$t('__giftRate')}: ${numberFormatStr(scope.row.live_gift_rate)}%` }}</span>
            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click="onGiftRateLogBtnClick(scope.row)" />
          </div>
        </template>
      </af-table-column>
      <af-table-column prop="created_at" :label="$t('__createdAt')" align="center" />
      <af-table-column prop="lastLoginAt" :label="$t('__lastLoginAt')" align="center" />
      <af-table-column v-if="!isAgentSubAccount" :label="$t('__operate')" align="center" :width="180">
        <template slot-scope="scope">
          <div class="checkboxGroup">
            <el-checkbox
              v-model="scope.row.totallyDisabled"
              class="red-tick agentManagement-agentCheckbox"
              :label="$t('__totallyDisabled')"
              :disabled="agentInfoTotallyDisabled"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.totallyDisabled, scope.row)"
            />
            <el-checkbox
              v-model="scope.row.lockLogin"
              class="red-tick agentManagement-agentCheckbox"
              :label="$t('__lockLogin')"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.lockLogin, scope.row)"
            />
            <el-checkbox
              v-model="scope.row.debarBet"
              class="red-tick agentManagement-agentCheckbox"
              :label="$t('__debarBet')"
              :disabled="agentInfoBetStatusDisabled"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.debarBet, scope.row)"
            />
            <template v-if="agentInfo.weekly_loss_settlement === '1'">
              <el-checkbox
                v-model="scope.row.weeklyLossSettlement"
                class="red-tick agentManagement-agentCheckbox"
                :label="$t('__weeklyLossSettlement')"
                @mousedown.native="onOperateCheckboxClick(dialogEnum.weeklyLossSettlement, scope.row)"
              />
            </template>
            <template v-if="agentInfo.one_click_recycling === '1'">
              <el-checkbox
                v-model="scope.row.oneClickRecycling"
                class="red-tick agentManagement-agentCheckbox"
                :label="$t('__oneClickRecycling')"
                @mousedown.native="onOperateCheckboxClick(dialogEnum.oneClickRecycling, scope.row)"
              />
            </template>
            <template v-if="agentInfo.gift_status === '1'">
              <el-checkbox
                v-model="scope.row.giftEffect"
                class="red-tick agentManagement-agentCheckbox"
                :label="$t('__giftEffect')"
                @mousedown.native="onOperateCheckboxClick(dialogEnum.giftEffect, scope.row)"
              />
            </template>
          </div>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__winLossReport')" align="center" :width="100">
        <template slot-scope="scope">
          <router-link :to="`/winLossReport/winLossReport/${scope.row.id}`">
            <el-button class="labelButton bg-yellow" size="mini">{{ $t("__winLossReport") }}</el-button>
          </router-link>
        </template>
      </af-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next, jumper, sizes"
      class="agent-pagination"
      :total="totalCount"
      background
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page.sync="currentPage"
      @size-change="handleSizeChangeByClient"
      @current-change="handlePageChangeByClient"
    />

    <modPasswordDialog
      ref="modPasswordDialog"
      :title="$t('__modPassword')"
      :visible="curDialogIndex === dialogEnum.modPassword"
      :confirm="$t('__revise')"
      :name-label="`${$t('__agent')}: `"
      :form="editForm"
      @close="closeDialogEven"
      @modPassword="modPassword"
    />

    <agentRateLogDialog
      :title="`${$t('__liveGame')} ${$t('__commissionRate')}`"
      :visible="curDialogIndex === dialogEnum.liveCommissionRate"
      :list-data="rateData"
      :operation-type="1"
      @close="closeDialogEven"
    />

    <agentRateLogDialog
      :title="`${$t('__liveGame')} ${$t('__rollingRate')}`"
      :visible="curDialogIndex === dialogEnum.liveRollingRate"
      :list-data="rateData"
      :operation-type="2"
      @close="closeDialogEven"
    />

    <agentRateLogDialog
      :title="`${$t('__liveGame')} ${$t('__giftRate')}`"
      :visible="curDialogIndex === dialogEnum.liveGiftRate"
      :list-data="rateData"
      :operation-type="3"
      @close="closeDialogEven"
    />

    <limitDialog
      :title="$t('_handicapLimit')"
      :visible="curDialogIndex === dialogEnum.limit"
      :handicaps="handicaps"
      @close="closeDialogEven"
    />

    <balanceDialog
      ref="depositBalanceDialog"
      :title="$t('__depositBalance')"
      :visible="curDialogIndex === dialogEnum.depositBalance"
      :confirm="$t('__confirm')"
      :form="editForm"
      :operation-type="1"
      :mode-type="1"
      @close="closeDialogEven"
      @depositBalance="depositBalance"
    />

    <balanceDialog
      ref="withdrawBalanceDialog"
      :title="$t('__withdrawBalance')"
      :visible="curDialogIndex === dialogEnum.withdrawBalance"
      :confirm="$t('__confirm')"
      :form="editForm"
      :operation-type="2"
      :mode-type="1"
      @close="closeDialogEven"
      @withdrawBalance="withdrawBalance"
    />

    <operateDialog
      ref="balanceOneClickRecyclingDialog"
      :visible="curDialogIndex === dialogEnum.balanceOneClickRecycling"
      :content="$stringFormat($t('__agentBalanceOneClickRecyclingMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <agentEditDialog
      ref="editDialog"
      :title="$t('__editSubAgent')"
      :visible="curDialogIndex === dialogEnum.edit"
      :operation-type="2"
      :agent-info="agentInfo"
      :confirm="$t('__revise')"
      :form="editForm"
      :step-enum="editStepEnum"
      @close="closeDialogEven"
      @editSuccess="handleRespone"
    />

    <agentEditDialog
      ref="createDialog"
      :title="$t('__addSubAgent')"
      :visible="curDialogIndex === dialogEnum.create"
      :operation-type="1"
      :agent-info="agentInfo"
      :confirm="$t('__confirm')"
      :form="editForm"
      :step-enum="editStepEnum"
      @close="closeDialogEven"
      @editSuccess="createDialogEditSuccess"
    />

    <operateDialog
      ref="totallyDisabledDialog"
      :visible="curDialogIndex === dialogEnum.totallyDisabled"
      :content="$stringFormat($t('__agentTotallyDisabledMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="lockLoginDialog"
      :visible="curDialogIndex === dialogEnum.lockLogin"
      :content="$stringFormat($t('__agentLockLoginMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="debarBetDialog"
      :visible="curDialogIndex === dialogEnum.debarBet"
      :content="$stringFormat($t('__agentDebarBetMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="weeklyLossSettlementDialog"
      :visible="curDialogIndex === dialogEnum.weeklyLossSettlement"
      :content="$stringFormat($t('__agentWeeklyLossSettlement'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="oneClickRecyclingDialog"
      :visible="curDialogIndex === dialogEnum.oneClickRecycling"
      :content="$stringFormat($t('__agentOneClickRecyclingMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="giftEffectDialog"
      :visible="curDialogIndex === dialogEnum.giftEffect"
      :content="$stringFormat($t('__agentGiftEffectMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <passwordTipDialog
      :title="$t('__tip')"
      :visible="curDialogIndex === dialogEnum.passwordTip"
      :confirm="$t('__confirm')"
      :form="editForm"
      @close="closeDialogEven"
    />
  </div>
</template>

<script>
import { agentSearch, agentCommissionRateLog, agentRollingRateLog, agentGiftRateLog, agentModPassword,
  agentGetSetBalanceInfo, agentDepositBalance, agentWithdrawBalance, agentModTotallyDisabled,
  agentModStatus, agentModBetStatus, agentBalanceOneClickRecycling, agentWeeklyLossSettlement,
  agentModOneClickRecycling, agentModGiftStatus } from '@/api/agentManagement/agent'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import { currencySearch } from '@/api/backstageManagement/currencyManagement'
import handlePageChange from '@/layout/mixin/handlePageChange'
import AgentEditDialog from './agentEditDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import LimitDialog from '@/views/agentManagement/limitDialog'
import AgentRateLogDialog from './agentRateLogDialog'
import BalanceDialog from '@/views/agentManagement/balanceDialog'
import OperateDialog from '@/views/agentManagement/operateDialog'
import PasswordTipDialog from '@/views/agentManagement/passwordTipDialog'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'

const defaultForm = {
  parent: 0,
  account: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  time_zone: 1,
  currency: 1,
  remark: '',
  live_commission_rate: 0,
  live_rolling_rate: 0,
  live_gift_rate: 0,
  handicaps: [],
  balance: 0,
  userPassword: '',
  wallet_type: 1,
  status: '1',
  bet_status: '1'
}

const createFormStepEnum = Object.freeze({ 'agentInfo': 0, 'rate': 1, 'limit': 2, 'balanceConfig': 3, 'confirm': 4 })
const editFormStepEnum = Object.freeze({ 'agentInfo': 0, 'rate': 1, 'limit': 2, 'confirm': 3 })

export default {
  name: 'Agent',
  components: { AgentEditDialog, ModPasswordDialog, LimitDialog, AgentRateLogDialog, BalanceDialog, OperateDialog, PasswordTipDialog },
  mixins: [handlePageChange],
  props: {
    'viewHeight': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'modPassword': 3,
        'limit': 4,
        'liveCommissionRate': 5,
        'liveRollingRate': 6,
        'liveGiftRate': 7,
        'depositBalance': 8,
        'withdrawBalance': 9,
        'totallyDisabled': 10,
        'lockLogin': 11,
        'debarBet': 12,
        'passwordTip': 13,
        'balanceOneClickRecycling': 14,
        'weeklyLossSettlement': 15,
        'oneClickRecycling': 16,
        'giftEffect': 17
      }),
      handicaps: [],
      agentInfo: {},
      editForm: {},
      editStepEnum: {},
      rateData: [],
      curDialogIndex: 0,
      operateDialogMsgParameter: [],
      searchForm: {},
      popover: false
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount'
    ]),
    agentInfoTotallyDisabled() {
      return this.agentInfo.totally_disabled === '1'
    },
    agentInfoBetStatusDisabled() {
      return this.agentInfo.bet_status === '0'
    }
  },
  methods: {
    showPopover() {
      this.$nextTick(() => {
        this.$refs.fullNameSearchInput.focus()
      })
    },
    operateSubmit(data) {
      switch (this.curDialogIndex) {
        case this.dialogEnum.totallyDisabled: {
          this.$refs.totallyDisabledDialog.setDialogLoading(true)
          agentModTotallyDisabled(data).then((res) => {
            this.handleRespone(res)
            this.$refs.totallyDisabledDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.totallyDisabledDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.lockLogin: {
          this.$refs.lockLoginDialog.setDialogLoading(true)
          agentModStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.lockLoginDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.lockLoginDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.debarBet: {
          this.$refs.debarBetDialog.setDialogLoading(true)
          agentModBetStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.debarBetDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.debarBetDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.balanceOneClickRecycling: {
          this.$refs.balanceOneClickRecyclingDialog.setDialogLoading(true)
          data.agentId = this.editForm.agentId
          agentBalanceOneClickRecycling(data).then((res) => {
            this.handleRespone(res)
            this.$refs.balanceOneClickRecyclingDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.balanceOneClickRecyclingDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.weeklyLossSettlement: {
          this.$refs.weeklyLossSettlementDialog.setDialogLoading(true)
          agentWeeklyLossSettlement(data).then((res) => {
            this.handleRespone(res)
            this.$refs.weeklyLossSettlementDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.weeklyLossSettlementDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.oneClickRecycling: {
          this.$refs.oneClickRecyclingDialog.setDialogLoading(true)
          agentModOneClickRecycling(data).then((res) => {
            this.handleRespone(res)
            this.$refs.oneClickRecyclingDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.oneClickRecyclingDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.giftEffect: {
          this.$refs.giftEffectDialog.setDialogLoading(true)
          agentModGiftStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.giftEffectDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.giftEffectDialog.setDialogLoading(false)
          })
          break
        }
      }
    },
    onOperateCheckboxClick(operateType, rowData) {
      this.editForm = { id: rowData.id }
      switch (operateType) {
        case this.dialogEnum.totallyDisabled: {
          if (this.agentInfoTotallyDisabled) return
          this.curDialogIndex = this.dialogEnum.totallyDisabled
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.lockLogin: {
          this.curDialogIndex = this.dialogEnum.lockLogin
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.debarBet: {
          if (this.agentInfoBetStatusDisabled) return
          this.curDialogIndex = this.dialogEnum.debarBet
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.weeklyLossSettlement: {
          this.curDialogIndex = this.dialogEnum.weeklyLossSettlement
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.oneClickRecycling: {
          this.curDialogIndex = this.dialogEnum.oneClickRecycling
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.giftEffect: {
          this.curDialogIndex = this.dialogEnum.giftEffect
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
      }
    },
    // 父物件呼叫
    async create() {
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.createDialog.setTimeZone(timezone)
      if (this.agentInfo.id === 1) {
        const currency = await currencySearch({})
        this.$refs.createDialog.setCurrency(currency)
      }
      this.editForm = JSON.parse(JSON.stringify(defaultForm))
      this.editStepEnum = createFormStepEnum
      this.curDialogIndex = this.dialogEnum.create
      this.setDataLoading(false)
    },
    handleRespone(res) {
      this.agentInfo = res.agentInfo
      this.agentInfo.fullName = `${this.agentInfo.nickname}(${this.agentInfo.account})`

      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.fullName = `${element.nickname}(${element.account})`
        element.currency = element.currency.code
        element.time_zone = element.timeZone.id
        element.cityNameLabel = element.timeZone.city_name
        element.totallyDisabled = element.totally_disabled === '1'
        element.lockLogin = element.status === '0'
        element.debarBet = element.bet_status === '0'
        element.weeklyLossSettlement = element.weekly_loss_settlement === '1'
        element.oneClickRecycling = element.one_click_recycling === '1'
        element.giftEffect = element.gift_status === '1'
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.$emit('serverResponse', JSON.parse(JSON.stringify(res)))
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      const data = JSON.parse(JSON.stringify(this.editForm))
      this.editForm = { account: data.account, password: data.password, isCreate: true }
      this.curDialogIndex = this.dialogEnum.passwordTip
    },
    setDataLoading(dataLoading) {
      this.$emit('setDataLoading', dataLoading)
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.agentInfo.id = agentId
      this.onFullNameResetBtnClick()
    },
    onFullNameSearchBtnClick() {
      this.popover = false
      this.currentPage = 1
      this.onSubmit(this.searchForm.account)
    },
    onFullNameResetBtnClick() {
      this.searchForm.account = ''
      this.onFullNameSearchBtnClick()
    },
    onSubmit(accountKeyWord) {
      this.setDataLoading(true)
      agentSearch({ agentId: this.agentInfo.id, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onLimitBtnClick(handicaps) {
      this.handicaps = JSON.parse(JSON.stringify(handicaps))
      this.curDialogIndex = this.dialogEnum.limit
    },
    onCommissionRateLogBtnClick(rowData) {
      this.setDataLoading(true)
      agentCommissionRateLog({ agentId: rowData.id, cate: 'live' }).then((res) => {
        this.curDialogIndex = this.dialogEnum.liveCommissionRate
        this.rateData = res.rows
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onRollingRateLogBtnClick(rowData) {
      this.setDataLoading(true)
      agentRollingRateLog({ agentId: rowData.id, cate: 'live' }).then((res) => {
        this.curDialogIndex = this.dialogEnum.liveRollingRate
        this.rateData = res.rows
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onGiftRateLogBtnClick(rowData) {
      this.setDataLoading(true)
      agentGiftRateLog({ agentId: rowData.id, cate: 'live' }).then((res) => {
        this.curDialogIndex = this.dialogEnum.liveGiftRate
        this.rateData = res.rows
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onModPasswordBtnClick(rowData) {
      this.editForm = { id: rowData.id, fullName: rowData.fullName, account: rowData.account }
      this.curDialogIndex = this.dialogEnum.modPassword
    },
    onDepositBtnClick(rowData) {
      this.editForm = { agentId: rowData.id, amount: this.numberFormatStr(0) }
      this.curDialogIndex = this.dialogEnum.depositBalance
      this.$refs.depositBalanceDialog.setDialogLoading(true)
      agentGetSetBalanceInfo({ agentId: rowData.id }).then((res) => {
        this.$refs.depositBalanceDialog.setBalanceInfo(res.rows)
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      })
    },
    onWithdrawBtnClick(rowData) {
      this.editForm = { agentId: rowData.id, amount: this.numberFormatStr(0) }
      this.curDialogIndex = this.dialogEnum.withdrawBalance
      this.$refs.withdrawBalanceDialog.setDialogLoading(true)
      agentGetSetBalanceInfo({ agentId: rowData.id }).then((res) => {
        this.$refs.withdrawBalanceDialog.setBalanceInfo(res.rows)
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      })
    },
    onOneClickRecyclingBtnClick(rowData) {
      this.editForm = { agentId: rowData.id }
      this.curDialogIndex = this.dialogEnum.balanceOneClickRecycling
      this.operateDialogMsgParameter = [rowData.fullName]
    },
    async onEditBtnClick(rowData) {
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.editDialog.setTimeZone(timezone)

      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.editStepEnum = editFormStepEnum
      this.curDialogIndex = this.dialogEnum.edit
      this.setDataLoading(false)
    },
    modPassword(data) {
      this.$refs.modPasswordDialog.setDialogLoading(true)
      agentModPassword(data).then((res) => {
        this.handleRespone(res)
        this.$refs.modPasswordDialog.setDialogLoading(false)
        this.editForm = { account: this.editForm.account, password: data.newPassword, isCreate: false }
        this.curDialogIndex = this.dialogEnum.passwordTip
      }).catch(() => {
        this.$refs.modPasswordDialog.setDialogLoading(false)
      })
    },
    depositBalance(data) {
      this.$refs.depositBalanceDialog.setDialogLoading(true)
      agentDepositBalance(data).then((res) => {
        this.handleRespone(res)
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      })
    },
    withdrawBalance(data) {
      this.$refs.withdrawBalanceDialog.setDialogLoading(true)
      agentWithdrawBalance(data).then((res) => {
        this.handleRespone(res)
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss">
.agentManagement-agentCheckbox {
  .el-checkbox__input+.el-checkbox__label {
    padding-left: 5px;
  }
}

.agentManagement-agentTable td .cell {
  line-height: 2em;
  padding: 0;
  margin: 0.1em;
}
</style>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.agent {
  &-pagination {
    padding: 1em;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
}

.agentBtn {
  padding: 0;
  background: transparent;
  color: #000;
  -webkit-text-stroke: 0.5px $yellow;
  border: none;
  font-size: 14px;
}

.scope-content {
  margin-right: 2px;
}

.search {
  margin-left: 3px;
  padding: 4px;
  background-color: $yellow;
  border-color: $yellow;
  color: #000;
}

.search:focus,
.search:hover {
  color: #000;
}

.fullNameSearchTitle {
  color: $yellow;
  margin-right: 10px;
  font-weight: 400;
}

.iconButton {
  padding: 0;
  background: transparent;
  color: #000;
  -webkit-text-stroke: 0.5px $yellow;
  border: none;
  font-size: 16px;
  margin-left: 0;

  .icon {
    color: $yellow;
    margin-left: 5px;
  }
}

.labelButton {
  padding-left: 5px;
  padding-right: 5px;
}

.el-button+.el-button {
  margin-left: 5px;
}

.agentManagement-agentCheckbox {
  width: 50%;
}

.liveGameGroup {
  text-align: left;
  padding-left: 10px;
  .iconButton {
    margin-top: 6px;
    margin-right: 10px;
    float: right;
  }
}

.checkboxGroup {
  text-align: left;
  padding-left: 10px;
}
</style>
