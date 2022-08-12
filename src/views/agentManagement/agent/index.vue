<template>
  <div>
    <div ref="container" class="view-container">
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="wrap" @click.stop="remarkExpand(item)">
                <div class="expand">
                  <svg-icon v-if="item.open" icon-class="up" @click.stop="remarkExpand(item)" />
                  <svg-icon v-else icon-class="more" @click.stop="remarkExpand(item)" />
                </div>
                <div class="visible">
                  <div class="userInfo">
                    <div class="user">
                      <div>
                        <svg-icon icon-class="user" />
                      </div>
                      <div class="column">
                        <router-link :to="`/agentManagement/agentManagement/${item.id}`">
                          <el-button class="bg-normal stroke" size="mini">
                            {{ item.account }}
                          </el-button>
                        </router-link>
                        {{ `(${$t('__nickname')} : ${item.nickname})` }}
                      </div>
                    </div>
                    <div class="column liveCommissionRate">
                      <span class="conten">{{ `${item.live_commission_rate}%` }}</span>
                      <span class="header">{{ `${$t('__liveGame')}${$t('__rate')}` }}</span>
                    </div>
                    <div class="column state">
                      <span v-if="item.status === '1'" class="statusOpen">
                        <svg-icon icon-class="enable" />
                      </span>
                      <span v-else class="status">
                        <svg-icon icon-class="disable" />
                      </span>
                      <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                    </div>
                  </div>
                  <div class="otherInfo">
                    <div class="currency">
                      <span class="conten">{{ item.currency }}</span>
                    </div>
                    <div class="balance">
                      <span class="header">{{ $t('__balance') }}</span>
                      <svg-icon icon-class="coin" />
                      <span class="conten">{{ item.balance }}</span>
                    </div>
                    <div class="timeZone">
                      <span class="conten">{{ item.cityNameLabel }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="item.open">
                  <div class="btnGroup">
                    <div class="group1">
                      <el-button v-if="!isAgentSubAccount" class="bg-yellow" size="mini" @click.stop="onDepositBtnClick(item)">{{ $t("__deposit") }}</el-button>
                      <el-button v-if="!isAgentSubAccount" class="bg-yellow" size="mini" @click.stop="onWithdrawBtnClick(item)">{{ $t("__withdraw") }}</el-button>
                      <el-button
                        v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'"
                        class="bg-yellow"
                        size="mini"
                        :title="$t('__agentOneClickRecyclingTitle')"
                        @click.stop="onOneClickRecyclingBtnClick(item)"
                      >
                        {{ $t("__oneClickRecycling") }}
                      </el-button>
                      <span class="winLossReport">
                        <router-link :to="`/winLossReport/winLossReport/${item.id}`">
                          <el-button class="bg-yellow" size="mini">{{ $t("__winLossReport") }}</el-button>
                        </router-link>
                      </span>
                    </div>
                    <div class="group2">
                      <el-button class="bg-yellow" size="mini" @click.stop="onLimitBtnClick(item.handicaps)">{{ $t("__handicapLimit") }}</el-button>
                      <svg-icon v-if="!isAgentSubAccount" icon-class="key" class="yellow-color key" @click.stop="onModPasswordBtnClick(item)" />
                      <el-button v-if="!isAgentSubAccount" class="bg-normal yellow-color edit" size="mini" icon="el-icon-setting" @click.stop="onEditBtnClick(item)" />
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="agentCount">
                      <div class="infoGroup-item">
                        <span class="infoGroup-item-header">{{ $t('__directAgentCount') }}</span>
                        <span class="infoGroup-item-content">{{ item.directAgentCount }}</span>
                      </div>
                      <div class="infoGroup-item">
                        <span class="infoGroup-item-header">{{ $t('__directPlayerCount') }}</span>
                        <span class="infoGroup-item-content">{{ item.directPlayerCount }}</span>
                      </div>
                    </div>
                    <div class="liveGame">
                      <div class="liveGame-title">
                        {{ $t('__liveGame') }}
                      </div>
                      <div class="liveGame-wrap">
                        <div class="infoGroup-item">
                          <span class="infoGroup-item-header">
                            {{ $t('__commissionRate') }}
                            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click.stop="onCommissionRateLogBtnClick(item)" />
                          </span>
                          <span class="infoGroup-item-content">
                            {{ item.live_commission_rate }}
                            <span>%</span>
                          </span>
                        </div>
                        <div class="infoGroup-item">
                          <span class="infoGroup-item-header">
                            {{ $t('__rollingRate') }}
                            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click.stop="onRollingRateLogBtnClick(item)" />
                          </span>
                          <span class="infoGroup-item-content">
                            {{ item.live_rolling_rate }}
                            <span>%</span>
                          </span>
                        </div>
                        <div class="infoGroup-item">
                          <span class="infoGroup-item-header">
                            {{ $t('__giftRate') }}
                            <el-button class="iconButton" size="mini" icon="el-icon-tickets" @click.stop="onGiftRateLogBtnClick(item)" />
                          </span>
                          <span class="infoGroup-item-content">
                            {{ item.live_gift_rate }}
                            <span>%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="operate">
                      <el-checkbox
                        v-model="item.totallyDisabled"
                        class="red-tick"
                        :label="$t('__totallyDisabled')"
                        :disabled="agentInfoTotallyDisabled"
                        @mousedown.native="onOperateCheckboxClick(dialogEnum.totallyDisabled, item)"
                      />
                      <el-checkbox
                        v-model="item.lockLogin"
                        class="red-tick"
                        :label="$t('__lockLogin')"
                        @mousedown.native="onOperateCheckboxClick(dialogEnum.lockLogin, item)"
                      />
                      <el-checkbox
                        v-model="item.debarBet"
                        class="red-tick"
                        :label="$t('__debarBet')"
                        :disabled="agentInfoBetStatusDisabled"
                        @mousedown.native="onOperateCheckboxClick(dialogEnum.debarBet, item)"
                      />
                      <template v-if="agentInfo.weekly_loss_settlement === '1'">
                        <el-checkbox
                          v-model="item.weeklyLossSettlement"
                          class="red-tick"
                          :label="$t('__weeklyLossSettlement')"
                          @mousedown.native="onOperateCheckboxClick(dialogEnum.weeklyLossSettlement, item)"
                        />
                      </template>
                      <template v-if="agentInfo.one_click_recycling === '1'">
                        <el-checkbox
                          v-model="item.oneClickRecycling"
                          class="red-tick"
                          :label="$t('__oneClickRecycling')"
                          @mousedown.native="onOperateCheckboxClick(dialogEnum.oneClickRecycling, item)"
                        />
                      </template>
                      <template v-if="agentInfo.gift_status === '1'">
                        <el-checkbox
                          v-model="item.giftEffect"
                          class="red-tick"
                          :label="$t('__giftEffect')"
                          @mousedown.native="onOperateCheckboxClick(dialogEnum.giftEffect, item)"
                        />
                      </template>
                    </div>
                    <div>
                      <div class="infoGroup-item">
                        <span class="infoGroup-item-header">{{ $t('__createdAt') }}</span>
                        <span class="infoGroup-item-content">{{ item.created_at }}</span>
                      </div>
                      <div class="infoGroup-item">
                        <span class="infoGroup-item-header">{{ $t('__lastLoginAt') }}</span>
                        <span class="infoGroup-item-content">{{ item.lastLoginAt }}</span>
                      </div>
                      <div class="infoGroup-item">
                        <span class="infoGroup-item-header">{{ $t('__remark') }}</span>
                        <span class="infoGroup-item-content">{{ item.remark }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
      </div>
    </div>
    <div class="view-footer">
      <el-pagination
        layout="prev, pager, next, jumper, sizes"
        :total="totalCount"
        background
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :current-page.sync="currentPage"
        @size-change="handleSizeChangeByClient"
        @current-change="handlePageChangeByClient"
      />
    </div>

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

    <limitDialog
      :title="$t('__handicapLimit')"
      :visible="curDialogIndex === dialogEnum.limit"
      :handicaps="handicaps"
      @close="closeDialogEven"
    />

    <modPasswordDialog
      ref="modPasswordDialog"
      :title="$t('__modPassword')"
      :visible="curDialogIndex === dialogEnum.modPassword"
      :confirm="$t('__revise')"
      :name-label="`${$t('__agent')}`"
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
  </div>
</template>

<script>
import { agentSearch, agentCommissionRateLog, agentRollingRateLog, agentGiftRateLog, agentModPassword,
  agentGetSetBalanceInfo, agentDepositBalance, agentWithdrawBalance, agentModTotallyDisabled,
  agentModStatus, agentModBetStatus, agentBalanceOneClickRecycling, agentWeeklyLossSettlement,
  agentModOneClickRecycling, agentModGiftStatus } from '@/api/agentManagement/agent'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import { currencySearch } from '@/api/backstageManagement/currencyManagement'
import handlePageChange from '@/mixin/handlePageChange';
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import BalanceDialog from '@/views/agentManagement/balanceDialog'
import OperateDialog from '@/views/agentManagement/operateDialog'
import LimitDialog from '@/views/agentManagement/limitDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import AgentRateLogDialog from './agentRateLogDialog'
import AgentEditDialog from './agentEditDialog'

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
  components: { BalanceDialog, OperateDialog, LimitDialog, ModPasswordDialog, AgentRateLogDialog, AgentEditDialog },
  mixins: [handlePageChange],
  props: {
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
      'isAgentSubAccount',
      'device',
      'statusType'
    ]),
    agentInfoTotallyDisabled() {
      return this.agentInfo.totally_disabled === '1'
    },
    agentInfoBetStatusDisabled() {
      return this.agentInfo.bet_status === '0'
    }
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
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
        const statusNickname = this.statusType.find(type => type.key === element.status).nickname
        element.statusLabel = this.$t(statusNickname)
        element.live_commission_rate = numberFormat(element.live_commission_rate)
        element.live_rolling_rate = numberFormat(element.live_rolling_rate)
        element.live_gift_rate = numberFormat(element.live_gift_rate)
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
      this.editForm = { agentId: rowData.id, amount: numberFormat(0) }
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
      this.editForm = { agentId: rowData.id, amount: numberFormat(0) }
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

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          flex-direction: column;
          position: relative;
          .visible {
            display: flex;
            flex-direction: column;
            .userInfo {
              display: flex;
              .user {
                display: flex;
                width: 50%;
              }
              .liveCommissionRate {
                width: 22%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .header {
                  font-size: 12px;
                  color: #a3a3a3;
                }
                .conten {
                  font-weight: bold;
                }
              }
              .state {
                width: 15%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            }
            .otherInfo {
              display: flex;
              flex-wrap: wrap;
              margin-top: 3px;
              color: #a3a3a3;
              .conten {
                margin-left: 3px;
              }
              .balance {
                margin-left: 15px;
                display: flex;
                align-items: center;
              }
              .timeZone {
                margin-left: 15px;
              }
            }
            .column {
              display: flex;
              flex-direction: column;
            }
          }
          .btnGroup {
            margin-top: 5px;
            .group2 {
              margin-top: 10px;
              display: flex;
              align-items: center;
              .key {
                margin-left: 20px;
                font-size: 22px;
              }
              .edit {
                font-size: 22px;
                margin-left: 10px;
              }
            }
            .winLossReport {
              margin-left: 10px;
            }
          }
          .infoGroup {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            .agentCount {
              display: flex;
              padding-bottom: 2px;
              border-bottom: 2px solid $yellow;
            }
            .liveGame {
              margin-top: 5px;
              padding-bottom: 2px;
              border-bottom: 2px solid $yellow;
              .liveGame-title {
                font-weight: bold;
                margin-bottom: 5px;
              }
              .liveGame-wrap {
                display: flex;
                flex-wrap: wrap;
                .infoGroup-item {
                  .infoGroup-item-content {
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
              .iconButton {
                padding: 0;
                background: transparent;
                color: #000;
                -webkit-text-stroke: 0.5px $yellow;
                border: none;
                font-size: 16px;
                margin-left: 0;
                vertical-align: middle;
                .icon {
                  color: $yellow;
                  margin-left: 5px;
                }
              }
            }
            .infoGroup-item {
              min-width: 50%;
              display: flex;
              .infoGroup-item-header {
                width: 50%;
                min-width: 120px;
              }
              .infoGroup-item-content {
                width: 50%;
              }
            }
            .operate {
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;
              .el-checkbox {
                margin-right: 0;
                width: 50%;
                height: 30px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}

.expand {
  position: absolute;
  right: 0;
}

.stroke {
  padding: 0;
  font-size: 16px;
  color: #ce9600;
  font-weight: bold;
  border-bottom: 1px solid #ce9600;
  vertical-align: top;
}
</style>
