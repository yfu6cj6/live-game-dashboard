<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
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
              <div class="list-item" style="width: 70%;">
                <span class="value" style="display: flex; word-break: break-all; padding-bottom: 0.75rem;">
                  <div>
                    <svg-icon class="fas gray-deep" icon-class="user" style="height: 1.25rem; width: 1.25rem;" />
                  </div>
                  <div class="item-inner">
                    <span>
                      <div class="text-link text-golden pl-1 pb-1">{{ item.name }}</div>
                    </span>
                    <span />
                    <span>
                      <div>{{ `${$t('__nickname')} : ${item.nick_name}` }}</div>
                    </span>
                  </div>
                </span>
              </div>
              <div class="list-item state" style="width: auto; margin-left: auto;">
                <span class="value">
                  <span>
                    <div class="item-inner">
                      <span class="fas">
                        <svg-icon :icon-class="item.status === '1' ? 'enable' : 'disable'" :class="{'text-green': item.status === '1', 'text-red': item.status !== '1'}" />
                      </span>
                    </div>
                    <div class="item-inner mt-2" :class="{'text-green': item.status === '1', 'text-red': item.status !== '1'}">{{ item.status === '1' ? $t('__enabled') : $t('__disabled') }}</div>
                  </span>
                </span>
              </div>
              <div class="force-wrap" />
              <div class="list-item" style="width: 50%; margin-left: 2.5rem; display: flex; align-items: center;">
                <span class="value" style="display: flex; align-items: center;">
                  <div class="fas">
                    <svg-icon icon-class="coin" class="gray-deep" style="height: 1.08333rem; width: 1.08333rem;" />
                  </div>
                  <span>
                    <span class="font-weight-bold ml-1">{{ item.balanceLabel }}</span>
                  </span>
                </span>
              </div>
              <div class="list-item ctrl">
                <div class="item-inner">
                  <div :class="{'d-none': item.open}" @click.stop="remarkExpand(item)">
                    <svg-icon class="fas gray-deep" icon-class="more" style="height: 2rem; width: 2rem; margin-right: 0.5rem" />
                  </div>
                  <div :class="{'d-none': !item.open}" @click.stop="remarkExpand(item)">
                    <svg-icon class="fas gray-deep" icon-class="up" style="height: 2rem; width: 2rem;" />
                  </div>
                </div>
              </div>
              <div class="force-wrap" />
              <div v-if="item.open" class="agent-list-detail">
                <div class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                  <span class="value">
                    <span class="solid-circle">
                      <div class="fas">
                        <svg-icon class="black" icon-class="top" style="height: 1.5rem; width: 1.5rem;" @click.stop="agentInfoClick(item)" />
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                  <span class="value">
                    <span>
                      <span class="v-line d-block" />
                    </span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="value">
                    <button class="el-button bg-yellow el-button--default" @click.stop="onDepositBtnClick(item)">
                      <span>{{ $t('__deposit') }}</span>
                    </button>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="value">
                    <button class="el-button bg-yellow video el-button--default" @click.stop="onWithdrawBtnClick(item)">
                      <span>{{ $t('__withdraw') }}</span>
                    </button>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'" class="list-item" style="width: auto; flex-wrap: wrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="value">
                    <button class="el-button bg-yellow video el-button--default" @click.stop="onOneClickRecyclingBtnClick(item)">
                      <span>{{ $t('__oneClickRecycling') }}</span>
                    </button>
                  </span>
                </div>
                <div class="force-wrap" />
                <div class="list-item" style="width: auto; flex-wrap: wrap; margin: 1rem auto 1.5rem 0px;">
                  <span class="label mr-2">{{ $t('__handicapLimit') }}</span>
                  <span class="value handicap text-yellow" @click.stop="onLimitBtnClick(item)">
                    <span class="h-t">{{ item.handicaps_info }}</span>
                  </span>
                  <span class="label ml-2">
                    <div class="fas yellow" @click.stop="onLimitBtnClick(item)">
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
                <div class="list-item" style="width: 100%;">
                  <span class="value gameHall" style="width: 100%;">
                    <div class="hall-row first">
                      <div class="w-100 hall-title">
                        <div class="hall-item">
                          <span class="value">{{ `${$t('__liveGame')} ` }}</span>
                        </div>
                      </div>
                      <div class="w-100 hall-content">
                        <div class="d-flex">
                          <div class="hall-item w-50">
                            <span class="label">{{ `${$t('__rollingRate')}%` }}</span>
                            <span class="value">
                              <span>{{ item.liveRollingRateLabel }}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item" style="width: 50%; margin-top: 1rem;">
                  <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.lockLogin, item)">
                    <span class="el-checkbox red-tick">
                      <span class="el-checkbox__input" :class="{'is-checked': item.lockLogin}">
                        <span class="el-checkbox__inner" />
                      </span>
                    </span>
                    <span class="label">{{ $t('__lockLogin') }}</span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item" style="width: 50%; margin-top: 1rem;">
                  <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.debarBet, item)">
                    <span class="el-checkbox red-tick">
                      <span class="el-checkbox__input" :class="{'is-disabled': agentInfoBetStatusDisabled, 'is-checked': item.debarBet}">
                        <span class="el-checkbox__inner" />
                      </span>
                    </span>
                    <span class="label">{{ $t('__debarBet') }}</span>
                  </span>
                </div>
                <template v-if="!isAgentSubAccount && agentInfo.weekly_loss_settlement === '1'">
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
                </template>
                <template v-if="!isAgentSubAccount && agentInfo.gift_status === '1'">
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
                </template>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__totalValidBetAmount') }}</span>
                  <span class="value">{{ item.totalValidBetAmountLabel }}</span>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__currency') }}</span>
                  <span class="value">{{ item.currency }}</span>
                </div>
                <div class="force-wrap" />
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__maxWinAmountLimit') }}</span>
                  <span class="value">{{ checkInfo(item.max_win_amount_limit) }}</span>
                  <template v-if="item.max_win_amount_limit !== '0.00' && Number(item.max_win_amount_limit) < Number(item.total_payout)">
                    <span class="exceeded">{{ `[${$t('__exceeded')}]` }}</span>
                  </template>
                  <template v-else>
                    <span class="text-black-light">{{ `[${$t('__noExceeded')}]` }}</span>
                  </template>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__maxLoseAmountLimit') }}</span>
                  <span class="value">{{ checkInfo(item.max_lose_amount_limit) }}</span>
                  <template v-if="item.max_lose_amount_limit !== '0.00' && maxLoseAmountLimitExceededCheck(item)">
                    <span class="exceeded">{{ `[${$t('__exceeded')}]` }}</span>
                  </template>
                  <template v-else>
                    <span class="text-black-light">{{ `[${$t('__noExceeded')}]` }}</span>
                  </template>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__timeZone') }}</span>
                  <span class="value">{{ item.cityNameLabel }}</span>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__totalPayout') }}</span>
                  <span class="value" :class="{ 'text-red': item.total_payout > 0, 'text-blue': item.total_payout < 0 }">{{ item.totalPayoutLabel }}</span>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__weekValidBetAmount') }}</span>
                  <span class="value">{{ item.weekValidBetAmountLabel }}</span>
                </div>
                <div class="list-item d-flex flex-column align-items-end" style="width: 50%; margin-top: 1rem;">
                  <span class="label" style="padding-bottom: 0.5rem; margin-right: 0px;">{{ $t('__weekPayout') }}</span>
                  <span class="value" :class="{ 'text-red': item.week_payout > 0, 'text-blue': item.week_payout < 0 }">{{ item.weekPayoutLabel }}</span>
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
                  <span class="label" style="width: 50%;">{{ $t('__lastBetTime') }}</span>
                  <span class="value" style="width: 50%; height: 33px; position: relative;">
                    <span v-if="!item.lastBetTime">
                      <button class="el-button bg-yellow el-button--default lastBetTime lastBetTime-38755283" style="position: absolute; top: -6px; left: 0;" @click.stop="onLastBetTime(item)">
                        <span>{{ $t('__watch') }}</span>
                      </button>
                    </span>
                    <span v-else>
                      <span class="value" style="width: 50%;">{{ item.lastBetTime }}</span>
                    </span>
                  </span>
                </div>
                <div class="list-item" style="width: 100%; margin-top: 1rem;">
                  <span class="label">{{ $t('__remark') }}</span>
                </div>
                <div class="list-item" style="width: 100%; margin-top: 1rem;">
                  <span class="value" style="word-break: break-word;">{{ item.remark }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-show="tableData.length <= 0">
            <div class="noInformation">
              <span>{{ `${$t('__noHave')}${$t('__member')}` }}</span>
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
        </div>
      </div>
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
        :form="editForm"
        :agent-name="account"
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
        :title="$t('__memberOneClickRecyclingMsg')"
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
        :confirm="$t('__submit')"
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
        :confirm="$t('__submit')"
        :form="editForm"
        :step-enum="editStepEnum"
        @close="closeDialogEven"
        @editSuccess="createDialogEditSuccess"
      />

      <operateDialog
        ref="lockLoginDialog"
        :visible="curDialogIndex === dialogEnum.lockLogin"
        :title="$t('__memberLockLoginMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="debarBetDialog"
        :visible="curDialogIndex === dialogEnum.debarBet"
        :title="$t('__memberDebarBetMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="weeklyLossSettlementDialog"
        :visible="curDialogIndex === dialogEnum.weeklyLossSettlement"
        :title="$t('__memberWeeklyLossSettlementMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="giftEffectDialog"
        :visible="curDialogIndex === dialogEnum.giftEffect"
        :title="$t('__memberGiftEffectMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="isMuteDialog"
        :visible="curDialogIndex === dialogEnum.isMute"
        :title="$t('__memberIsMuteMsg')"
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

      <treeDialogMobile
        ref="treeDialog"
        :visible="curDialogIndex === dialogEnum.agentInfo"
        :tree-level="agentLevel"
        @close="closeDialogEven"
      />
    </template>
    <template v-else>
      <div class="agent-list is-player">
        <div class="agent-list">
          <div v-if="tableData.length > 0">
            <div
              v-for="(item, index) in tableData"
              :key="index"
              class="list-row"
              style="padding-left: 80px;"
            >
              <div class="d-flex w-100 flex-wrap">
                <div class="item-group-1" style="width: auto; flex-wrap: nowrap; display: flex; margin-left: -80px; margin-right: -20px;">
                  <div class="list-item flex-none index" style="align-self: center;">
                    <span class="value">{{ (index+1) }}</span>
                  </div>
                  <div class="list-item flex-none flex-wrap align-self-center mr-2">
                    <span class="value" style="display: block; width: 35px; white-space: nowrap; margin-right: 0.5rem;">
                      <span class="solid-circle align-self-center clickable small solid-circle align-self-center clickable" :class="`agentManagement-member-${item.id}`">
                        <div class="fas black ">
                          <svg-icon class="fas black" icon-class="top" style="height: 1rem; width: 1rem;" @click.stop="agentInfoClick(item)" />
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="list-item flex-none flex-wrap align-self-center text-link text-golden" style="width: 65px; padding-right: 5px; margin-left: -10px;" @click.stop="changeToAgentTable">
                    <span class="value" style="display: flex; word-break: break-all;">{{ item.agent.nickname }}</span>
                  </div>
                  <div class="list-item flex-none flex-wrap align-self-center" style="width: 200px; padding-right: 10px;">
                    <span class="value" style="display: flex; word-break: break-all;">
                      <div class="fas align-self-center gray-deep mr-1">
                        <svg-icon style="height: 1.25rem; width: 1.25rem;" icon-class="user" />
                      </div>
                      <div class="item-inner">
                        <span>
                          <div class="text-golden pl-1 pb-1">{{ item.name }}</div>
                        </span>
                        <span>
                          <div>{{ `(${$t('__nickname')} : ${item.nick_name})` }}</div>
                        </span>
                      </div>
                    </span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="list-item flex-none flex-wrap align-self-center mr-3 clickable" style="width: auto; white-space: nowrap; margin-bottom: 0.5rem;" @click="onEditBtnClick(item)">
                    <span class="value">
                      <span class="edit">
                        <div class="fas yellow">
                          <img src="@/assets/agentManagement/settings.png" style="height: 1.83333rem; width: 1.83333rem;">
                        </div>
                      </span>
                    </span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="list-item flex-none flex-wrap align-self-center clickable" style="width: auto; margin-bottom: 0.5rem;" @click="onModPasswordBtnClick(item)">
                    <span class="value">
                      <span class="key">
                        <div class="fas yellow">
                          <img src="@/assets/agentManagement/key.png" style="height: 1.83333rem; width: 1.83333rem;">
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="list-item flex-none" style="width: 140px; font-size: 12px; margin-left: 20px; align-self: center;">
                    <div class="two-row-items credit">
                      <div class="items-label text-left mt-1">
                        <span class="label w-100">{{ $t('__balance') }}</span>
                      </div>
                      <div class="items-value d-flex mt-2">
                        <span class="label ml-2">
                          <div class="fas items-label-icon gray-deep">
                            <svg-icon icon-class="coin" class="fas  gray-deep" style="height: 1.08333rem; width: 1.08333rem;" />
                          </div>
                        </span>
                        <span class="value items-label-text" style="display: flex; align-items: center;">
                          <span class="h-t">{{ item.balanceLabel }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="!isAgentSubAccount" class="list-item flex-none align-self-center" style="width: auto; white-space: nowrap; flex-wrap: wrap; margin-left: 0.5rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                    <span class="value" style="margin-right: 0.5rem;">
                      <button class="el-button bg-yellow el-button--default" @click.stop="onDepositBtnClick(item)">
                        <span>{{ $t('__deposit') }}</span>
                      </button>
                    </span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="list-item flex-none align-self-center flex-wrap" style="width: auto; white-space: nowrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                    <span class="value" style="margin-right: 0.5rem;">
                      <button class="el-button bg-yellow video el-button--default" @click.stop="onWithdrawBtnClick(item)">
                        <span>{{ $t('__withdraw') }}</span>
                      </button>
                    </span>
                  </div>
                  <div v-if="!isAgentSubAccount && agentInfo.one_click_recycling === '1'" class="list-item flex-none align-self-center flex-wrap" style="width: auto; white-space: nowrap; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                    <span class="value" style="margin-right: 0.5rem;">
                      <button class="el-button bg-yellow video el-button--default" @click.stop="onOneClickRecyclingBtnClick(item)">
                        <span>{{ $t('__oneClickRecycling') }}</span>
                      </button>
                    </span>
                  </div>
                  <div class="list-item flex-none" style="width: 140px; margin-right: 10px; align-self: center;">
                    <div class="two-row-items">
                      <div class="items-label text-left mt-1">
                        <span class="label w-100">{{ $t('__handicapLimit') }}</span>
                      </div>
                      <div class="items-value d-flex mt-2">
                        <span class="value handicap text-yellow text-link" @click.stop="onLimitBtnClick(item)">
                          <span class="h-t">{{ item.handicaps_info }}</span>
                        </span>
                        <span class="label ml-2">
                          <div class="fas clickable yellow" @click.stop="onLimitBtnClick(item)">
                            <img src="@/assets/agentManagement/updown.png" style="height: 1.16667rem; width: 1.16667rem;">
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="list-item" style="width: 140px;">
                    <span class="value gameHall" style="width: 100%;">
                      <div class="hall-row first">
                        <div class="w-100 hall-title">
                          <div class="hall-item">
                            <span class="value">{{ `${$t('__liveGame')} ` }}</span>
                          </div>
                        </div>
                        <div class="w-100 hall-content">
                          <div class="w-100">
                            <div class="hall-item">
                              <span class="label">{{ `${$t('__rollingRate')}%` }}</span>
                              <span class="value">
                                <span class="">{{ item.liveRollingRateLabel }}%</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div class="list-item flex-none align-self-center" style="width: 110px; white-space: nowrap; padding: 0px; margin-right: 10px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items text-right">
                        <div class="items-label mt-2">{{ $t('__maxWinAmountLimit') }}
                          <span class="font-weight-bold text-black-light">[</span>
                          <template v-if="item.max_win_amount_limit !== '0.00' && Number(item.max_win_amount_limit) < Number(item.total_payout)">
                            <span class="font-weight-bold exceeded">{{ `${$t('__exceeded')}` }}</span>
                          </template>
                          <template v-else>
                            <span class="font-weight-bold text-black-light">{{ `${$t('__noExceeded')}` }}</span>
                          </template>
                          <span class="font-weight-bold text-black-light">]</span>
                        </div>
                        <div class="items-value mt-2 font-weight-bold">{{ checkInfo(item.max_win_amount_limit) }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center" style="width: 110px; white-space: nowrap; padding: 0px; margin-right: 10px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items text-right">
                        <div class="items-label mt-2">{{ $t('__maxLoseAmountLimit') }}
                          <span class="font-weight-bold text-black-light">[</span>
                          <template v-if="item.max_lose_amount_limit !== '0.00' && maxLoseAmountLimitExceededCheck(item)">
                            <span class="font-weight-bold exceeded">{{ `${$t('__exceeded')}` }}</span>
                          </template>
                          <template v-else>
                            <span class="font-weight-bold text-black-light">{{ `${$t('__noExceeded')}` }}</span>
                          </template>
                          <span class="font-weight-bold text-black-light">]</span>
                        </div>
                        <div class="items-value mt-2 font-weight-bold">{{ checkInfo(item.max_lose_amount_limit) }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="item-group-3" style="display: flex; flex-direction: column; align-self: center; flex: 0 1 0%; margin-right: 10px;">
                  <div class="list-item flex-none align-self-center d-flex justify-content-end" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value d-flex">
                      <span>
                        <div class="two-row-items text-right">
                          <div class="items-label mt-2">{{ $t('__timeZone') }}</div>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="list-item flex-none align-self-center" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value">
                      <span>
                        <div class="two-row-items text-right d-block">
                          <div class="items-value mt-2 font-weight-bold">
                            {{ item.cityNameLabel }}
                          </div>
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="item-group-3" style="display: flex; flex-direction: column; align-self: center; flex: 0 1 0%; margin-right: 10px;">
                  <div class="list-item flex-none align-self-center d-flex justify-content-end" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value d-flex">
                      <span>
                        <div class="two-row-items text-right">
                          <div class="items-label mt-2">{{ $t('__currency') }}</div>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="list-item flex-none align-self-center" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value">
                      <span>
                        <div class="two-row-items text-right d-block">
                          <div class="items-value mt-2 font-weight-bold">
                            {{ item.currency }}
                          </div>
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="item-group-3" style="display: flex; flex-direction: column; align-self: center; flex: 0 1 0%; margin-right: 10px;">
                  <div class="list-item flex-none align-self-center d-flex justify-content-end" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value d-flex">
                      <span>
                        <div class="two-row-items text-right">
                          <div class="items-label mt-2">{{ $t('__totalPayout') }}</div>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="list-item flex-none align-self-center" style="width: 120px; white-space: nowrap; padding: 0px;">
                    <span class="value">
                      <span>
                        <div class="two-row-items text-right d-block">
                          <div class="items-value mt-2 font-weight-bold" :class="{ 'text-red': item.total_payout > 0, 'text-blue': item.total_payout < 0 }">
                            {{ item.totalPayoutLabel }}
                          </div>
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="list-item flex-none align-self-center" style="width: 130px; white-space: nowrap; padding: 0px; margin-right: 10px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items text-right">
                        <div class="items-label mt-2">{{ $t('__totalValidBetAmount') }}</div>
                        <div class="items-value mt-2 font-weight-bold">{{ item.totalValidBetAmountLabel }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center" style="width: 130px; white-space: nowrap; padding: 0px; margin-right: 10px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items text-right">
                        <div class="items-label mt-2">{{ $t('__weekPayout') }}</div>
                        <div class="items-value mt-2 font-weight-bold" :class="{ 'text-red': item.week_payout > 0, 'text-blue': item.week_payout < 0 }">{{ item.weekPayoutLabel }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center" style="width: 130px; white-space: nowrap; padding: 0px; margin-right: 10px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items text-right">
                        <div class="items-label mt-2">{{ $t('__weekValidBetAmount') }}</div>
                        <div class="items-value mt-2 font-weight-bold">{{ item.weekValidBetAmountLabel }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="item-group-2" style="width: auto; display: flex; flex-direction: column; justify-content: center;">
                  <div class="list-item flex-none align-self-center" style="width: 100%; white-space: nowrap; padding: 0px;">
                    <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.lockLogin, item)">
                      <span class="el-checkbox red-tick">
                        <span class="el-checkbox__input" :class="{'is-checked': item.lockLogin}">
                          <span class="el-checkbox__inner" />
                        </span>
                      </span>
                      <span class="label">{{ $t('__lockLogin') }}</span>
                    </span>
                  </div>
                  <div class="list-item flex-none align-self-center" style="width: 100%; white-space: nowrap; padding: 5px 0px 0px;">
                    <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.debarBet, item)">
                      <span class="el-checkbox red-tick">
                        <span class="el-checkbox__input" :class="{'is-disabled': agentInfoBetStatusDisabled, 'is-checked': item.debarBet}">
                          <span class="el-checkbox__inner" />
                        </span>
                      </span>
                      <span class="label">{{ $t('__debarBet') }}</span>
                    </span>
                  </div>
                </div>
                <div v-if="!isAgentSubAccount" class="item-group-2" style="width: auto; display: flex; flex-direction: column; justify-content: center;">
                  <div v-if="agentInfo.weekly_loss_settlement === '1'" class="list-item flex-none align-self-center" style="width: 100%; white-space: nowrap; padding: 0px;">
                    <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.weeklyLossSettlement, item)">
                      <span class="el-checkbox red-tick">
                        <span class="el-checkbox__input" :class="{'is-checked': item.weeklyLossSettlement}">
                          <span class="el-checkbox__inner" />
                        </span>
                      </span>
                      <span class="label">{{ $t('__weeklyLossSettlement') }}</span>
                    </span>
                  </div>
                  <div v-if="agentInfo.gift_status === '1'" class="list-item flex-none align-self-center" style="width: 100%; white-space: nowrap; padding: 5px 0px 0px;">
                    <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.giftEffect, item)">
                      <span class="el-checkbox red-tick">
                        <span class="el-checkbox__input" :class="{'is-checked': item.giftEffect}">
                          <span class="el-checkbox__inner" />
                        </span>
                      </span>
                      <span class="label">{{ $t('__giftEffect') }}</span>
                    </span>
                  </div>
                </div>
                <div class="list-item flex-none" style="min-width: 145px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__createdAt') }}</div>
                        <div class="items-value mt-2 font-weight-bold">{{ item.created_at }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none" style="min-width: 145px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__lastLoginAt') }}</div>
                        <div class="items-value mt-2 font-weight-bold">{{ item.lastLoginAt }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center flex-wrap text-center" style="width: 145px; white-space: nowrap; margin-right: 1rem; margin-bottom: 0.5rem;">
                  <span class="value" style="margin-right: 0.5rem;">
                    <div v-if="!item.lastBetTime" class="api-button">
                      <button class="el-button bg-yellow video el-button--default" @click.stop="onLastBetTime(item)">
                        <span>{{ $t('__lastBetTime') }}</span>
                      </button>
                    </div>
                    <div v-else class="items-value mt-2 font-weight-bold">
                      {{ item.lastBetTime }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="force-wrap" />
            </div>
          </div>
          <div v-else class="noInformation">
            <span>{{ `${$t('__noHave')}${$t('__member')}` }}</span>
          </div>
          <treeDialogPC
            ref="treeDialog"
            :visible="curDialogIndex === dialogEnum.agentInfo"
            :tree-level="agentLevel"
            :click-class-name="editForm.className"
            @close="closeDialogEven"
          />
          <div class="force-wrap" />
          <div class="w-100" style="height: 40px;" />
          <pagination
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :total="totalCount"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
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
        :form="editForm"
        :agent-name="account"
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
        :title="$t('__memberOneClickRecyclingMsg')"
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
        :confirm="$t('__submit')"
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
        :confirm="$t('__submit')"
        :form="editForm"
        :step-enum="editStepEnum"
        @close="closeDialogEven"
        @editSuccess="createDialogEditSuccess"
      />

      <operateDialog
        ref="lockLoginDialog"
        :visible="curDialogIndex === dialogEnum.lockLogin"
        :title="$t('__memberLockLoginMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="debarBetDialog"
        :visible="curDialogIndex === dialogEnum.debarBet"
        :title="$t('__memberDebarBetMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="weeklyLossSettlementDialog"
        :visible="curDialogIndex === dialogEnum.weeklyLossSettlement"
        :title="$t('__memberWeeklyLossSettlementMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="giftEffectDialog"
        :visible="curDialogIndex === dialogEnum.giftEffect"
        :title="$t('__memberGiftEffectMsg')"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <operateDialog
        ref="isMuteDialog"
        :visible="curDialogIndex === dialogEnum.isMute"
        :title="$t('__memberIsMuteMsg')"
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
    </template>
  </div>
</template>

<script>
import { memberSearch, memberModPassword, memberGetSetBalanceInfo,
  memberDepositBalance, memberWithdrawBalance, memberModStatus,
  memberModBetStatus, memberGetLastBetTime, memberOneClickRecycling,
  memberWeeklyLossSettlement, memberModGiftStatus, memberModMuteStatus,
  memberTreeSearch } from '@/api/agentManagement/member'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import handlePageChange from '@/mixin/handlePageChange'
import MemberEditDialog from './memberEditDialog'
import LimitDialog from '@/views/agentManagement/limitDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import BalanceDialog from '@/views/agentManagement/balanceDialog'
import OperateDialog from '@/components/OperateDialog'
import PasswordTipDialog from '@/views/agentManagement/passwordTipDialog'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import TreeDialogMobile from '@/components/InfoDialog/treeDialog_mobile'
import TreeDialogPC from '@/components/InfoDialog/treeDialog_pc'
import Pagination from '@/components/Pagination'

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
  components: { MemberEditDialog, LimitDialog, ModPasswordDialog, BalanceDialog, OperateDialog, PasswordTipDialog, TreeDialogMobile, TreeDialogPC, Pagination },
  mixins: [handlePageChange],
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
        'agentInfo': 14
      }),
      agentInfo: {},
      editForm: {},
      editStepEnum: {},
      curDialogIndex: 0,
      account: '',
      agentLevel: []
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount',
      'device'
    ]),
    agentInfoBetStatusDisabled() {
      return this.agentInfo.bet_status === '0'
    },
    fullNameWidth() {
      return this.calculateWidth(this.$t('__member'), 'fullName', 8, 35) + 'px'
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
    checkInfo(info) {
      return (info === 0 || info === '0.00') ? this.$t('__noLimit') : numberFormat(info)
    },
    maxLoseAmountLimitExceededCheck(rowData) {
      return rowData.weekly_loss_settlement === '1'
        ? -Number(rowData.max_lose_amount_limit) > Number(rowData.week_payout) : -Number(rowData.max_lose_amount_limit) > Number(rowData.total_payout)
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
      this.pageSizeCount = 1
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.createDialog.setTimeZone(timezone)
      this.editForm = JSON.parse(JSON.stringify(defaultForm))
      this.editStepEnum = createFormStepEnum
      this.curDialogIndex = this.dialogEnum.create
      this.setDataLoading(false)
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__addMember'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberManagement'), false, () => { }])
      }])
    },
    // 父物件呼叫
    setAgentInfo(agentInfo) {
      this.agentInfo = agentInfo
    },
    // 父物件呼叫
    onSearch(agentId, searchStr) {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberManagement'), false, () => { }])
      this.pageSizeCount = 1
      this.currentPage = 1
      this.onSubmit(agentId, searchStr)
    },
    onSubmit(agentId, accountKeyWord) {
      this.setDataLoading(true)
      memberSearch({ agentId: agentId, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    handleRespone(res) {
      // 設定已經擴展的item
      const open = this.allDataByClient.filter(item => item.open).map(item => item.id)
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.currency = element.currency.code
        element.time_zone = element.timeZone.id
        element.cityNameLabel = element.timeZone.city_name
        element.lockLogin = element.status === '0'
        element.debarBet = element.bet_status === '0'
        element.weeklyLossSettlement = element.weekly_loss_settlement === '1'
        element.giftEffect = element.gift_status === '1'
        element.isMute = element.mute === '1'
        element.weekPayoutLabel = numberFormat(element.week_payout)
        element.balanceLabel = numberFormat(element.balance)
        element.weekValidBetAmountLabel = numberFormat(element.week_valid_bet_amount)
        element.totalPayoutLabel = numberFormat(element.total_payout)
        element.totalValidBetAmountLabel = numberFormat(element.total_valid_bet_amount)
        element.liveRollingRateLabel = numberFormat(element.live_rolling_rate)
        element.lastLoginAt = element.lastLoginAt === '' ? '-' : element.lastLoginAt
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
    changeToAgentTable() {
      this.$emit('onChangeTableIndex', 0)
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      this.editForm = { accountsInfo: res.accountsInfo, gameUrl: res.gameUrl, isCreate: true }
      this.curDialogIndex = this.dialogEnum.passwordTip
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__editMember'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberManagement'), false, () => { }])
      }])
    },
    onLimitBtnClick(rowData) {
      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.editForm.handicaps.forEach(element => {
        element.bet_maxLabel = numberFormat(element.bet_max)
        element.bet_minLabel = numberFormat(element.bet_min)
      });
      this.account = rowData.name
      this.curDialogIndex = this.dialogEnum.limit
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberManagement'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberManagement'), false, () => { }])
      }])
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
      this.editForm = { memberId: rowData.id, amount: numberFormat(0) }
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
      this.editForm = { memberId: rowData.id, amount: numberFormat(0) }
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
    },
    modPassword(data) {
      this.$refs.modPasswordDialog.setDialogLoading(true)
      memberModPassword(data).then((res) => {
        this.handleRespone(res)
        this.$refs.modPasswordDialog.setDialogLoading(false)
        this.editForm = { accountsInfo: [{ account: this.editForm.account, password: data.newPassword }], isCreate: false }
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
    },
    agentInfoClick(rowData) {
      this.closeDialogEven()
      this.$refs.treeDialog.setDialogLoading(true)
      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.editForm.className = `.agentManagement-member-${this.editForm.id}`
      memberTreeSearch({ memberId: this.editForm.id }).then((res) => {
        this.agentLevel = res
        this.curDialogIndex = this.dialogEnum.agentInfo
        this.$refs.treeDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.treeDialog.setDialogLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.noInformation {
  margin-top: 1rem;
  text-align: center;
}

.exceeded {
  color: red;
  display: block;
  line-height: 16px;
}

.mobile {
  .hall-row {
    width: 100vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0px -3.4rem;
    border-bottom: 0.08333rem solid #f9c901;
    border-top: 0rem solid #f9c901;
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
    &.first {
      border-top: 0.08333rem solid #f9c901;
    }
  }
}
.pc {
  .api-button {
    display: inline;
  }
  .agent-list {
    position: relative;
  }
}
</style>
