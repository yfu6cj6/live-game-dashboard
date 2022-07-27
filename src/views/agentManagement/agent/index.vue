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
              <div class="wrap">
                <div class="visible">
                  <div class="top">
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
                      <span class="conten">{{ item.live_commission_rate }}</span>
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
                    <div class="expand">
                      <svg-icon v-if="item.open" icon-class="up" @click="remarkExpand(item)" />
                      <svg-icon v-else icon-class="more" @click="remarkExpand(item)" />
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="currency">
                      <span class="header">{{ $t('__currency') }}</span>
                      <span class="conten">{{ item.currency }}</span>
                    </div>
                    <div class="balance">
                      <span class="header">{{ $t('__balance') }}</span>
                      <svg-icon icon-class="coin" />
                      <span class="conten">{{ item.balance }}</span>
                    </div>
                    <div class="timeZone">
                      <span class="header">{{ $t('__timeZone') }}</span>
                      <span class="conten">{{ item.cityNameLabel }}</span>
                    </div>
                  </div>
                </div>
                <div class="inVisible">
                  <div class="">
                    <el-button v-if="!isAgentSubAccount" class="bg-yellow" size="mini" @click="onDepositBtnClick(item)">{{ $t("__deposit") }}</el-button>
                    <el-button v-if="!isAgentSubAccount" class="bg-yellow" size="mini" @click="onWithdrawBtnClick(item)">{{ $t("__withdraw") }}</el-button>
                    <el-button
                      v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'"
                      class="bg-yellow"
                      size="mini"
                      :title="$t('__agentOneClickRecyclingTitle')"
                      @click="onOneClickRecyclingBtnClick(item)"
                    >
                      {{ $t("__oneClickRecycling") }}
                    </el-button>
                    <span class="winLossReport">
                      <router-link :to="`/winLossReport/winLossReport/${item.id}`">
                        <el-button class="bg-yellow" size="mini">{{ $t("__winLossReport") }}</el-button>
                      </router-link>
                    </span>
                  </div>
                  <div class="handicapLimit">
                    <span>
                      <el-button class="bg-yellow" size="mini" @click="onLimitBtnClick(item.handicaps)">{{ $t("_handicapLimit") }}</el-button>
                    </span>
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
            .top {
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
            .bottom {
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
          .inVisible {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            .handicapLimit {
              margin-top: 5px;
            }
            .winLossReport {
              margin-left: 10px;
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
