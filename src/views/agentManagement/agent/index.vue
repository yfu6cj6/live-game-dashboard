<template>
  <div>
    <div class="agent-list">
      <div class="agent-list">
        <div v-show="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="list-row"
          >
            <div class="force-wrap" />
            <div class="list-item index">
              <span class="value">{{ (index+1) }}</span>
            </div>
            <div class="list-item" style="width: 50%;">
              <span class="value" style="display: flex; word-break: break-all; padding-bottom: 0.75rem;">
                <div class="fas gray-deep">
                  <svg-icon style="height: 1.25rem; width: 1.25rem;" icon-class="user" />
                </div>
                <div class="item-inner">
                  <span>
                    <router-link :to="`/agentManagement/agentManagement/${item.id}`">
                      <div class="text-link text-underline text-golden pl-1 pb-1">{{ item.account }}</div>
                    </router-link>
                  </span>
                  <span>
                    <div class="tag-name">{{ `(${$t('__nickname')}: ${item.nickname})` }}</div>
                  </span>
                </div>
              </span>
            </div>
            <div class="list-item share" style="width: 22%; margin-left: auto;">
              <span class="value">
                <span>
                  <div class="two-row-items">
                    <div class="items-value mb-0">{{ `${ item.live_commission_rate }%` }}</div>
                    <div class="items-label mt-2">{{ `${$t('__liveGame')}${$t('__rate')}` }}</div>
                  </div>
                </span>
              </span>
            </div>
            <div class="list-item state" style="width: 15%; margin-left: 0.5rem;">
              <span class="value">
                <span>
                  <div class="item-inner">
                    <span class="fas">
                      <svg-icon :icon-class="item.lockLogin ? 'disable' : 'enable'" :class="{'text-red': item.lockLogin, 'text-green': !item.lockLogin}" />
                    </span>
                  </div>
                  <div class="item-inner mt-2" :class="{'text-red':item.lockLogin, 'text-green':!item.lockLogin}">{{ item.lockLoginLabel }}</div>
                </span>
              </span>
            </div>
            <div class="force-wrap" />
            <div class="list-item" style="width: 100%; margin-left: 2.5rem; display: flex; align-items: center;">
              <div class="two-row-items credit">
                <div class="items-label text-left mt-1">
                  <span class="label w-100">
                    {{ ` ${$t('__balance')} ` }}
                    <div class="items-label-icon">
                      <svg-icon icon-class="coin" class="fas  gray-deep" style="height: 1.08333rem; width: 1.08333rem;" />
                    </div>
                    {{ item.balance }}
                  </span>
                </div>
              </div>
            </div>
            <div class="list-item ctrl">
              <div class="item-inner">
                <div :class="{'d-none': item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon class="fas gray-deep" icon-class="more" style="height: 2rem; width: 2rem;" />
                </div>
                <div :class="{'d-none': !item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon class="fas gray-deep" icon-class="up" style="height: 2rem; width: 2rem;" />
                </div>
              </div>
            </div>
            <div class="force-wrap" />
            <div v-if="item.open" class="agent-list-detail">
              <!-- <div class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <span class="value">
                  <span class="solid-circle">
                    <div class="fas black">
                      <svg-icon icon-class="top" style="height: 1.5rem; width: 1.5rem;" />
                    </div>
                  </span>
                </span>
              </div> -->
              <!-- <div class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <span class="value">
                  <span>
                    <span class="v-line d-block" />
                  </span>
                </span>
              </div> -->
              <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                <span class="value">
                  <button class="el-button bg-yellow el-button--default" @click.stop="onDepositBtnClick(item)">
                    <span>{{ $t('__deposit') }}</span>
                  </button>
                </span>
              </div>
              <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                <span class="value">
                  <button class="el-button bg-yellow el-button--default" @click.stop="onWithdrawBtnClick(item)">
                    <span>{{ $t('__withdraw') }}</span>
                  </button>
                </span>
              </div>
              <div v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                <span class="value">
                  <button class="el-button bg-yellow el-button--default" @click.stop="onOneClickRecyclingBtnClick(item)">
                    <span>{{ $t('__oneClickRecycling') }}</span>
                  </button>
                </span>
              </div>
              <div class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                <span class="value">
                  <router-link :to="`/winLossReport/winLossReport/${item.id}`">
                    <button class="el-button bg-yellow el-button--default">
                      <span>{{ $t('__winLossReport') }}</span>
                    </button>
                  </router-link>
                </span>
              </div>
              <div class="force-wrap" />
              <div class="list-item" style="width: auto; flex-wrap: wrap; align-self: center; margin: 1rem auto 1.5rem 0px;">
                <span class="label mr-2">{{ `${$t('__handicapLimit')}:` }}</span>
                <span class="value handicap text-yellow" @click.stop="onLimitBtnClick(item)">
                  <span class="h-t">{{ item.handicaps_info }}</span>
                </span>
                <span class="label ml-2">
                  <div class="fas yellow">
                    <img src="@/assets/agentManagement/updown.png" style="height: 1.33333rem; width: 1.33333rem;">
                  </div>
                </span>
              </div>
              <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem; align-self: center; margin-right: auto;" @click="onModPasswordBtnClick(item)">
                <span class="value">
                  <span class="key">
                    <div class="fas yellow">
                      <img src="@/assets/agentManagement/key.png" style="height: 1.83333rem; width: 1.83333rem;">
                    </div>
                  </span>
                </span>
              </div>
              <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem; align-self: center;" @click="onEditBtnClick(item)">
                <span class="value">
                  <span class="edit">
                    <div class="fas yellow">
                      <img src="@/assets/agentManagement/settings.png" style="height: 1.83333rem; width: 1.83333rem;">
                    </div>
                  </span>
                </span>
              </div>
              <div class="force-wrap" />
              <div class="list-item" style="width: auto; padding-right: 2rem;">
                <span class="label" style="width: auto; padding-bottom: 0.5rem; padding-right: 1rem;">{{ $t('__level') }}</span>
                <span class="value">{{ ` ${$t('__agent')} ` }}</span>
              </div>
              <div class="list-item" style="width: 100%;">
                <span class="value gameHall" style="width: 100%;">
                  <div class="hall-row first">
                    <div class="w-100 hall-title">
                      <div class="hall-item">
                        <span class="value">{{ $t('__liveGame') }}</span>
                      </div>
                    </div>
                    <div class="w-100 hall-content">
                      <div class="d-flex">
                        <div class="hall-item w-50">
                          <span class="label">{{ `${$t('__rate')}% ` }}</span>
                          <span class="value">{{ `${item.live_commission_rate}%` }}</span>
                          <div class="fas yellow" @click.stop="onCommissionRateLogBtnClick(item)">
                            <img src="@/assets/agentManagement/share.png" style="height: 1.5rem; width: 1.5rem;">
                          </div>
                        </div>
                        <div class="hall-item w-50">
                          <span class="label">{{ `${$t('__rollingRate')}% ` }}</span>
                          <span class="value">{{ `${item.live_rolling_rate}%` }}</span>
                          <div class="fas yellow" @click.stop="onRollingRateLogBtnClick(item)">
                            <img src="@/assets/agentManagement/rollCoin.png" style="height: 1.5rem; width: 1.5rem;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="display: none;" />
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.totallyDisabled, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-disabled': agentInfoTotallyDisabled, 'is-checked': item.totallyDisabled}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__totallyDisabled') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.debarBet, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-disabled': agentInfoBetStatusDisabled, 'is-checked': item.debarBet}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__debarBet') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.lockLogin, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-checked': item.lockLogin}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__lockLogin') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.weeklyLossSettlement, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-checked': item.weeklyLossSettlement}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__weeklyLossSettlement') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.oneClickRecycling, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-checked': item.oneClickRecycling}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__oneClickRecycling') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 50%; margin-top: 1rem;">
                <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.giftEffect, item)">
                  <span class="el-checkbox red-tick">
                    <span class="el-checkbox__input" :class="{'is-checked': item.giftEffect}">
                      <span class="el-checkbox__inner" />
                    </span>
                  </span>
                  <span class="label">{{ $t('__giftEffect') }}</span>
                </span>
              </div>
              <div class="list-item" style="width: 100%; margin-top: 1rem;">
                <span class="label" style="width: 50%;">{{ $t('__createdAt') }}</span>
                <span class="value" style="width: 50%;">{{ item.created_at }}</span>
              </div>
              <div class="list-item" style="width: 100%; margin-top: 1rem;">
                <span class="label" style="width: 50%;">{{ $t('__lastLoginAt') }}</span>
                <span class="value" style="width: 50%;">{{ item.lastLoginAt }}</span>
              </div>
              <div class="list-item" style="width: 100%; margin-top: 1rem;">
                <span class="label">{{ $t('__remark') }}</span>
              </div>
              <div class="list-item" style="width: 100%; margin-top: 1rem;">
                <span class="value" style="word-break: break-word;">{{ item.remark }}</span>
              </div>
            </div>
          </div>
          <div v-if="totalCount > pageSize" class="text-center p-3">
            <div v-if="tableData.length >= totalCount">
              <span>{{ $t("__noMoreInformation") }}</span>
            </div>
            <div v-else>
              <span class="view-more border-bottom border-dark mb-1" @click="moreInfoByClient">{{ $t('__searchMoreValue') }}</span>
            </div>
          </div>
          <div style="display: none;" />
        </div>
        <div v-show="tableData.length <= 0">
          <div class="noInformation">
            <span>{{ `${$t('__noHave')}${$t('__directAgent')}` }}</span>
          </div>
        </div>
      </div>
    </div>
    <agentEditDialog
      ref="editDialog"
      :title="$t('__editSubAgent')"
      :visible="curDialogIndex === dialogEnum.edit"
      :operation-type="2"
      :agent-info="agentInfo"
      :confirm="$t('__submit')"
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
      :confirm="$t('__submit')"
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
      :title="$t('__agentBalanceOneClickRecyclingMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <limitDialog
      :title="$t('__handicapLimit')"
      :visible="curDialogIndex === dialogEnum.limit"
      :form="editForm"
      :agent-name="account"
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
      :title="$t('__agentTotallyDisabledMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="lockLoginDialog"
      :visible="curDialogIndex === dialogEnum.lockLogin"
      :title="$t('__agentLockLoginMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="debarBetDialog"
      :visible="curDialogIndex === dialogEnum.debarBet"
      :title="$t('__agentDebarBetMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="weeklyLossSettlementDialog"
      :visible="curDialogIndex === dialogEnum.weeklyLossSettlement"
      :title="$t('__agentWeeklyLossSettlement')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="oneClickRecyclingDialog"
      :visible="curDialogIndex === dialogEnum.oneClickRecycling"
      :title="$t('__agentOneClickRecyclingMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="giftEffectDialog"
      :visible="curDialogIndex === dialogEnum.giftEffect"
      :title="$t('__agentGiftEffectMsg')"
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
      agentInfo: {},
      editForm: {},
      editStepEnum: {},
      rateData: [],
      curDialogIndex: 0,
      account: ''
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount',
      'device'
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
        this.tableData = Object.assign([], this.tableData)
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
          break
        }
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
        case this.dialogEnum.oneClickRecycling: {
          this.curDialogIndex = this.dialogEnum.oneClickRecycling
          break
        }
        case this.dialogEnum.giftEffect: {
          this.curDialogIndex = this.dialogEnum.giftEffect
          break
        }
      }
    },
    // 父物件呼叫
    async create() {
      this.pageSizeCount = 1
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__addSubAgent'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentManagement'), false, () => { }])
      }])
    },
    handleRespone(res) {
      this.agentInfo = res.agentInfo
      this.agentInfo.handicaps.forEach(element => {
        element.betMinLabel = numberFormat(element.bet_min)
        element.betMaxLabel = numberFormat(element.bet_max)
      });
      this.agentInfo.fullName = `${this.agentInfo.nickname}(${this.agentInfo.account})`
      // 設定已經擴展的item
      const open = this.allDataByClient.filter(item => item.open).map(item => item.id)
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.fullName = `${element.nickname}(${element.account})`
        element.currency = element.currency.code
        element.time_zone = element.timeZone.id
        element.cityNameLabel = element.timeZone.city_name
        element.totallyDisabled = element.totally_disabled === '1'
        element.lockLogin = element.status === '0'
        element.lockLoginLabel = element.lockLogin === true ? this.$t('__disabled') : this.$t('__enabled')
        element.debarBet = element.bet_status === '0'
        element.weeklyLossSettlement = element.weekly_loss_settlement === '1'
        element.oneClickRecycling = element.one_click_recycling === '1'
        element.giftEffect = element.gift_status === '1'
        element.live_commission_rate = numberFormat(element.live_commission_rate)
        element.live_rolling_rate = numberFormat(element.live_rolling_rate)
        element.live_gift_rate = numberFormat(element.live_gift_rate)
        element.open = open.includes(element.id)

        var limit = ''
        for (var i = 0; i < element.handicaps.length; i++) {
          limit += element.handicaps[i].nickname
          if (i < element.handicaps.length - 1) {
            limit += ','
          }
        }
        element.handicaps_info = limit;
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)
      this.closeDialogEven()
      this.$emit('serverResponse', JSON.parse(JSON.stringify(res)))
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      this.editForm = { accountsInfo: res.accountsInfo, backendUrl: res.backendUrl, isCreate: true }
      this.curDialogIndex = this.dialogEnum.passwordTip
    },
    setDataLoading(dataLoading) {
      this.$emit('setDataLoading', dataLoading)
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.agentInfo.id = agentId
      this.onSubmit('')
    },
    onSearchByString(str) {
      this.pageSizeCount = 1
      this.currentPage = 1
      this.onSubmit(str)
    },
    onSubmit(accountKeyWord) {
      this.setDataLoading(true)
      agentSearch({ agentId: this.agentInfo.id, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onLimitBtnClick(rowData) {
      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.account = rowData.account
      this.curDialogIndex = this.dialogEnum.limit
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentManagement'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentManagement'), false, () => { }])
      }])
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
    },
    async onEditBtnClick(rowData) {
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.editDialog.setTimeZone(timezone)

      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.editStepEnum = editFormStepEnum
      this.curDialogIndex = this.dialogEnum.edit
      this.setDataLoading(false)
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__editSubAgent'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentManagement'), false, () => { }])
      }])
    },
    modPassword(data) {
      this.$refs.modPasswordDialog.setDialogLoading(true)
      agentModPassword(data).then((res) => {
        this.handleRespone(res)
        this.$refs.modPasswordDialog.setDialogLoading(false)
        this.editForm = { accountsInfo: [{ account: this.editForm.account, password: data.newPassword }], isCreate: true }
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
.hall-row {
  width: 100vw;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0px -3.4rem;
  border-bottom: 0.08333rem solid #f9c901;
  border-top: 0rem solid #f9c901;
  &.first {
    border-top: 0.08333rem solid #f9c901;
  }
  .hall-title {
    padding: 1.25rem 0.83333rem 0rem 2.16667rem;
    color: #000;
  }
  .hall-content {
    padding: 0.41667rem 1rem;
    color: #000;
    font-size: .91667rem;
    .hall-item {
      padding: 0.41667rem 0.41667rem 0.41667rem 1.16667rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      .label {
        color: #a3a3a3;
        margin-right: 0.83333rem;
      }
      .value {
        font-weight: bold;
        color: #000;
        margin-right: 0.83333rem;
        width: auto;
      }
    }
  }
}
.noInformation {
  margin-top: 1rem;
  text-align: center;
}
</style>
