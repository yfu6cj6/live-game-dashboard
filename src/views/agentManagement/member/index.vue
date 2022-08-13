<template>
  <div>
    <el-table class="agentManagement-memberTable" :data="tableData" border stripe :max-height="viewHeight">
      <af-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item :label="$t('__remark')">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </af-table-column>
      <el-table-column align="center" :min-width="fullNameWidth">
        <template slot-scope="scope">
          <span>{{ scope.row.fullName }}</span>
          <br>
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-setting" @click="onEditBtnClick(scope.row)" />
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-unlock" @click="onModPasswordBtnClick(scope.row)" />
        </template>
        <template #header>
          <span>{{ $t('__member') }}</span>
          <el-popover
            v-model="popover"
            placement="right"
            :visible-arrow="false"
            @show="showPopover"
          >
            <span class="fullNameSearchTitle">{{ $t('__member') }}</span>
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
          <span>{{ numberFormatStr(scope.row.balance) }}</span>
          <br>
          <el-button v-if="!isAgentSubAccount" class="labelButton bg-yellow" size="mini" @click="onDepositBtnClick(scope.row)">{{ $t("__deposit") }}</el-button>
          <el-button v-if="!isAgentSubAccount" class="labelButton bg-yellow" size="mini" @click="onWithdrawBtnClick(scope.row)">{{ $t("__withdraw") }}</el-button>
          <el-button
            v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'"
            class="labelButton bg-yellow"
            size="mini"
            :title="$t('__memberOneClickRecyclingTitle')"
            @click="onOneClickRecyclingBtnClick(scope.row)"
          >
            {{ $t("__oneClickRecycling") }}
          </el-button>
        </template>
      </af-table-column>
      <af-table-column prop="cityNameLabel" :label="$t('__timeZone')" align="center" />
      <af-table-column :label="$t('__handicapLimit')" align="center" :width="100">
        <template slot-scope="scope">
          <el-button class="labelButton bg-yellow" size="mini" @click="onLimitBtnClick(scope.row.handicaps)">{{ $t("__handicapLimit") }}</el-button>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__liveGame')" align="center" :width="140">
        <template slot-scope="scope">
          <span class="scope-content">{{ `${$t('__rollingRate')}: ${numberFormatStr(scope.row.live_rolling_rate)}%` }}</span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__maxWinAmountLimit')" align="center" :fontSize="18">
        <template slot-scope="scope">
          <span>{{ checkInfo(scope.row.max_win_amount_limit) }}</span>
          <template v-if="scope.row.max_win_amount_limit !== '0.00' && scope.row.max_win_amount_limit < scope.row.total_payout">
            <span class="exceeded">{{ `[${$t('__exceeded')}]` }}</span>
          </template>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__maxLoseAmountLimit')" align="center" :fontSize="18">
        <template slot-scope="scope">
          <span>{{ checkInfo(scope.row.max_lose_amount_limit) }}</span>
          <template v-if="scope.row.max_lose_amount_limit !== '0.00' && maxLoseAmountLimitExceededCheck(scope.row)">
            <span class="exceeded">{{ `[${$t('__exceeded')}]` }}</span>
          </template>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__totalPayout')" align="center" :fontSize="18">
        <template slot-scope="scope">
          <span>{{ numberFormatStr(scope.row.total_payout) }}</span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__totalValidBetAmount')" align="center" :fontSize="18">
        <template slot-scope="scope">
          <span>{{ numberFormatStr(scope.row.total_valid_bet_amount) }}</span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__weekPayout')" align="center">
        <template slot-scope="scope">
          <span>{{ numberFormatStr(scope.row.week_payout) }}</span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__weekValidBetAmount')" align="center">
        <template slot-scope="scope">
          <span>{{ numberFormatStr(scope.row.week_valid_bet_amount) }}</span>
        </template>
      </af-table-column>
      <af-table-column prop="created_at" :label="$t('__createdAt')" align="center" />
      <af-table-column prop="lastLoginAt" :label="$t('__lastLoginAt')" align="center" />
      <af-table-column :label="$t('__lastBetTime')" align="center" :width="140">
        <template slot-scope="scope">
          <el-button class="labelButton bg-yellow" size="mini" @click="onLastBetTime(scope.row)">
            <span>{{ $t('__lastBetTime') }}</span>
            <br>
            <span>{{ scope.row.lastBetTime }}</span>
          </el-button>
        </template>
      </af-table-column>
      <af-table-column v-if="!isAgentSubAccount" :label="$t('__operate')" align="center" :width="180">
        <template slot-scope="scope">
          <div class="checkboxGroup">
            <el-checkbox
              v-model="scope.row.lockLogin"
              class="red-tick agentManagement-memberCheckbox"
              :label="$t('__lockLogin')"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.lockLogin, scope.row)"
            />
            <el-checkbox
              v-model="scope.row.debarBet"
              class="red-tick agentManagement-memberCheckbox"
              :label="$t('__debarBet')"
              :disabled="agentInfoBetStatusDisabled"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.debarBet, scope.row)"
            />
            <template v-if="agentInfo.weekly_loss_settlement === '1'">
              <el-checkbox
                v-model="scope.row.weeklyLossSettlement"
                class="red-tick agentManagement-memberCheckbox"
                :label="$t('__weeklyLossSettlement')"
                @mousedown.native="onOperateCheckboxClick(dialogEnum.weeklyLossSettlement, scope.row)"
              />
            </template>
            <template v-if="agentInfo.gift_status === '1'">
              <el-checkbox
                v-model="scope.row.giftEffect"
                class="red-tick agentManagement-memberCheckbox"
                :label="$t('__giftEffect')"
                @mousedown.native="onOperateCheckboxClick(dialogEnum.giftEffect, scope.row)"
              />
            </template>
            <!-- <el-checkbox
              v-model="scope.row.isMute"
              class="red-tick agentManagement-memberCheckbox"
              :label="$t('__mute')"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.isMute, scope.row)"
            /> -->
          </div>
        </template>
      </af-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next, jumper, sizes"
      class="member-pagination"
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
      :name-label="`${$t('__member')}: `"
      :form="editForm"
      @close="closeDialogEven"
      @modPassword="modPassword"
    />

    <limitDialog
      :title="$t('__handicapLimit')"
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
      :mode-type="2"
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
      :mode-type="2"
      @close="closeDialogEven"
      @withdrawBalance="withdrawBalance"
    />

    <operateDialog
      ref="oneClickRecyclingDialog"
      :visible="curDialogIndex === dialogEnum.oneClickRecycling"
      :content="$stringFormat($t('__memberOneClickRecyclingMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <memberEditDialog
      ref="editDialog"
      :title="$t('__editMember')"
      :visible="curDialogIndex === dialogEnum.edit"
      :operation-type="2"
      :agent-info="agentInfo"
      :confirm="$t('__revise')"
      :form="editForm"
      :step-enum="editStepEnum"
      @close="closeDialogEven"
      @editSuccess="handleRespone"
    />

    <memberEditDialog
      ref="createDialog"
      :title="$t('__addMember')"
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
      ref="lockLoginDialog"
      :visible="curDialogIndex === dialogEnum.lockLogin"
      :content="$stringFormat($t('__memberLockLoginMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="debarBetDialog"
      :visible="curDialogIndex === dialogEnum.debarBet"
      :content="$stringFormat($t('__memberDebarBetMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="weeklyLossSettlementDialog"
      :visible="curDialogIndex === dialogEnum.weeklyLossSettlement"
      :content="$stringFormat($t('__memberWeeklyLossSettlementMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="giftEffectDialog"
      :visible="curDialogIndex === dialogEnum.giftEffect"
      :content="$stringFormat($t('__memberGiftEffectMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="isMuteDialog"
      :visible="curDialogIndex === dialogEnum.isMute"
      :content="$stringFormat($t('__memberIsMuteMsg'), operateDialogMsgParameter)"
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
import { memberSearch, memberModPassword, memberGetSetBalanceInfo,
  memberDepositBalance, memberWithdrawBalance, memberModStatus,
  memberModBetStatus, memberGetLastBetTime, memberOneClickRecycling,
  memberWeeklyLossSettlement, memberModGiftStatus, memberModMuteStatus } from '@/api/agentManagement/member'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import handlePageChange from '@/layout/mixin/handlePageChange'
import handleTableWidth from '@/layout/mixin/handleTableWidth'
import MemberEditDialog from './memberEditDialog'
import LimitDialog from '@/views/agentManagement/limitDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import BalanceDialog from '@/views/agentManagement/balanceDialog'
import OperateDialog from '@/views/agentManagement/operateDialog'
import PasswordTipDialog from '@/views/agentManagement/passwordTipDialog'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'

const defaultForm = {
  name: '',
  nick_name: '',
  password: '',
  confirmPassword: '',
  time_zone: 1,
  remark: '',
  live_rolling_rate: 0,
  max_win_amount_limit: 0,
  max_lose_amount_limit: 0,
  handicaps: [],
  balance: 0,
  userPassword: '',
  wallet_type: 1,
  status: '1',
  bet_status: '1'
}

const createFormStepEnum = Object.freeze({ 'memberInfo': 0, 'rate': 1, 'limit': 2, 'balanceConfig': 3, 'confirm': 4 })
const editFormStepEnum = Object.freeze({ 'memberInfo': 0, 'rate': 1, 'limit': 2, 'confirm': 3 })

export default {
  name: 'Member',
  components: { MemberEditDialog, LimitDialog, ModPasswordDialog, BalanceDialog, OperateDialog, PasswordTipDialog },
  mixins: [handlePageChange, handleTableWidth],
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
        'depositBalance': 5,
        'withdrawBalance': 6,
        'lockLogin': 7,
        'debarBet': 8,
        'passwordTip': 9,
        'oneClickRecycling': 10,
        'weeklyLossSettlement': 11,
        'giftEffect': 12,
        'isMute': 13,
      }),
      agentInfo: {},
      handicaps: [],
      editForm: {},
      editStepEnum: {},
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
    agentInfoBetStatusDisabled() {
      return this.agentInfo.bet_status === '0'
    },
    fullNameWidth() {
      return this.calculateWidth(this.$t('__member'), 'fullName', 8, 35) + 'px'
    }
  },
  methods: {
    showPopover() {
      this.$nextTick(() => {
        this.$refs.fullNameSearchInput.focus()
      })
    },
    checkInfo(info) {
      return (info === 0 || info === '0.00')
        ? this.$t('__noLimit') : this.numberFormatStr(info)
    },
    maxLoseAmountLimitExceededCheck(rowData) {
      return rowData.weekly_loss_settlement === '1'
        ? -(rowData.max_lose_amount_limit) > rowData.week_payout : -(rowData.max_lose_amount_limit) > rowData.total_payout
    },
    operateSubmit(data) {
      switch (this.curDialogIndex) {
        case this.dialogEnum.lockLogin: {
          this.$refs.lockLoginDialog.setDialogLoading(true)
          memberModStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.lockLoginDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.lockLoginDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.debarBet: {
          this.$refs.debarBetDialog.setDialogLoading(true)
          memberModBetStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.debarBetDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.debarBetDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.oneClickRecycling: {
          this.$refs.oneClickRecyclingDialog.setDialogLoading(true)
          data.memberId = this.editForm.memberId
          memberOneClickRecycling(data).then((res) => {
            this.handleRespone(res)
            this.$refs.oneClickRecyclingDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.oneClickRecyclingDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.weeklyLossSettlement: {
          this.$refs.weeklyLossSettlementDialog.setDialogLoading(true)
          memberWeeklyLossSettlement(data).then((res) => {
            this.handleRespone(res)
            this.$refs.weeklyLossSettlementDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.weeklyLossSettlementDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.giftEffect: {
          this.$refs.giftEffectDialog.setDialogLoading(true)
          memberModGiftStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.giftEffectDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.giftEffectDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.isMute: {
          this.$refs.isMuteDialog.setDialogLoading(true)
          memberModMuteStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.isMuteDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.isMuteDialog.setDialogLoading(false)
          })
          break
        }
      }
    },
    onOperateCheckboxClick(operateType, rowData) {
      this.editForm = { memberId: rowData.id }
      this.operateDialogMsgParameter = [rowData.fullName]
      switch (operateType) {
        case this.dialogEnum.lockLogin: {
          this.curDialogIndex = this.dialogEnum.lockLogin
          break
        }
        case this.dialogEnum.debarBet: {
          if (this.agentInfoBetStatusDisabled) return
          this.curDialogIndex = this.dialogEnum.debarBet
          break
        }
        case this.dialogEnum.weeklyLossSettlement: {
          this.curDialogIndex = this.dialogEnum.weeklyLossSettlement
          break
        }
        case this.dialogEnum.giftEffect: {
          this.curDialogIndex = this.dialogEnum.giftEffect
          break
        }
        case this.dialogEnum.isMute: {
          this.curDialogIndex = this.dialogEnum.isMute
          break
        }
      }
    },
    // 父物件呼叫
    async create() {
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.createDialog.setTimeZone(timezone)
      this.editForm = JSON.parse(JSON.stringify(defaultForm))
      this.editStepEnum = createFormStepEnum
      this.curDialogIndex = this.dialogEnum.create
      this.setDataLoading(false)
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
    onSearchByString(str) {
      this.currentPage = 1
      this.onSubmit(str)
    },
    onFullNameResetBtnClick() {
      this.searchForm.account = ''
      this.onFullNameSearchBtnClick()
    },
    onSubmit(accountKeyWord) {
      this.setDataLoading(true)
      memberSearch({ agentId: this.agentInfo.id, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    handleRespone(res) {
      this.agentInfo = res.agentInfo
      this.agentInfo.fullName = `${this.agentInfo.nickname}(${this.agentInfo.account})`

      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.fullName = `${element.nick_name}(${element.name})`
        element.currency = element.currency.code
        element.time_zone = element.timeZone.id
        element.cityNameLabel = element.timeZone.city_name
        element.lockLogin = element.status === '0'
        element.debarBet = element.bet_status === '0'
        element.weeklyLossSettlement = element.weekly_loss_settlement === '1'
        element.giftEffect = element.gift_status === '1',
        element.isMute = element.mute === '1'
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.$emit('serverResponse', JSON.parse(JSON.stringify(res)))
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      const data = JSON.parse(JSON.stringify(this.editForm))
      this.editForm = { account: data.name, password: data.password, isCreate: true }
      this.curDialogIndex = this.dialogEnum.passwordTip
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    setDataLoading(dataLoading) {
      this.$emit('setDataLoading', dataLoading)
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
    onLimitBtnClick(handicaps) {
      this.handicaps = JSON.parse(JSON.stringify(handicaps))
      this.curDialogIndex = this.dialogEnum.limit
    },
    onLastBetTime(rowData) {
      this.setDataLoading(true)
      memberGetLastBetTime({ member_id: rowData.id }).then((res) => {
        this.allDataByClient.find(data => data.id === rowData.id).lastBetTime = res.lastBetTime
        this.handlePageChangeByClient(this.currentPage)
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onModPasswordBtnClick(rowData) {
      this.editForm = { id: rowData.id, fullName: rowData.fullName, account: rowData.name }
      this.curDialogIndex = this.dialogEnum.modPassword
    },
    onDepositBtnClick(rowData) {
      this.editForm = { memberId: rowData.id, amount: this.numberFormatStr(0) }
      this.curDialogIndex = this.dialogEnum.depositBalance
      this.$refs.depositBalanceDialog.setDialogLoading(true)
      memberGetSetBalanceInfo({ memberId: rowData.id }).then((res) => {
        this.$refs.depositBalanceDialog.setBalanceInfo(res.rows)
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      })
    },
    onWithdrawBtnClick(rowData) {
      this.editForm = { memberId: rowData.id, amount: this.numberFormatStr(0) }
      this.curDialogIndex = this.dialogEnum.withdrawBalance
      this.$refs.withdrawBalanceDialog.setDialogLoading(true)
      memberGetSetBalanceInfo({ memberId: rowData.id }).then((res) => {
        this.$refs.withdrawBalanceDialog.setBalanceInfo(res.rows)
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.withdrawBalanceDialog.setDialogLoading(false)
      })
    },
    onOneClickRecyclingBtnClick(rowData) {
      this.editForm = { memberId: rowData.id }
      this.curDialogIndex = this.dialogEnum.oneClickRecycling
      this.operateDialogMsgParameter = [rowData.fullName]
    },
    modPassword(data) {
      this.$refs.modPasswordDialog.setDialogLoading(true)
      memberModPassword(data).then((res) => {
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
      memberDepositBalance(data).then((res) => {
        this.handleRespone(res)
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.depositBalanceDialog.setDialogLoading(false)
      })
    },
    withdrawBalance(data) {
      this.$refs.withdrawBalanceDialog.setDialogLoading(true)
      memberWithdrawBalance(data).then((res) => {
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
.agentManagement-memberCheckbox {
  .el-checkbox__input+.el-checkbox__label {
    padding-left: 5px;
  }
}

.agentManagement-memberTable td .cell {
  line-height: 2em;
  padding: 0;
  margin: 0.1em;
}
</style>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.member {
  &-pagination {
    padding: 1em;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
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

.agentManagement-memberCheckbox {
  width: 50%;
}

.checkboxGroup {
  text-align: left;
  padding-left: 10px;
}

.exceeded {
  color: red;
  display: block;
  line-height: 16px;
}
</style>
