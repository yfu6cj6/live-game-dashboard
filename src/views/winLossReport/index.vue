<template>
  <div class="winLossReport">
    <template v-if="device === 'mobile'">
      <div class="scroll-wrap flex-column flex-fill">
        <div class="scroll-inner flex-column flex-fill off">
          <div class="scroll-view flex-column flex-fill">
            <div class="flex-column flex-fill">
              <div class="flex-column flex-fill">
                <div class="scroll-wrap flex-column flex-fill flex-column flex-fill">
                  <div class="scroll-inner flex-column flex-fill off">
                    <div class="scroll-view flex-column flex-fill">
                      <div class="comp profit-report flex-column flex-fill">
                        <div class="bg-black w-100 pt-4">
                          <div class="day-range">
                            <div class="date-time-picker-box">
                              <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                                <el-date-picker
                                  ref="datePicker"
                                  v-model="searchTime"
                                  type="datetimerange"
                                  popper-class="ams-timeslot-popper mobilePicker"
                                  :clearable="false"
                                  :editable="false"
                                  time-arrow-control
                                  :range-separator="$t('__to')"
                                  :start-placeholder="$t('__startDate')"
                                  :end-placeholder="$t('__endDate')"
                                  :default-time="['00:00:00', '23:59:59']"
                                  :picker-options="pickerOptions"
                                  :format="'yyyy-MM-dd HH:mm'"
                                  prefix-icon="''"
                                  clear-icon="''"
                                />
                              </div>
                              <el-button class="bg-yellow ml-auto mr-0 search-range" @click="onTableBtnClick(curTableIndex)">
                                {{ $t("__search") }}
                              </el-button>
                            </div>
                            <div class="day-range-options">
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.yesterday}" @click="onDateBtnClick(dateEnum.yesterday)">
                                {{ $t("__yesterday") }}
                              </el-button>
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.today}" @click="onDateBtnClick(dateEnum.today)">
                                {{ $t("__today") }}
                              </el-button>
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.lastWeek}" @click="onDateBtnClick(dateEnum.lastWeek)">
                                {{ $t("__lastWeek") }}
                              </el-button>
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.thisWeek}" @click="onDateBtnClick(dateEnum.thisWeek)">
                                {{ $t("__thisWeek") }}
                              </el-button>
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.lastMonth}" @click="onDateBtnClick(dateEnum.lastMonth)">
                                {{ $t("__lastMonth") }}
                              </el-button>
                              <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.thisMonth}" @click="onDateBtnClick(dateEnum.thisMonth)">
                                {{ $t("__thisMonth") }}
                              </el-button>
                            </div>
                          </div>
                        </div>
                        <div style="border-bottom: 0.25rem solid rgb(249, 201, 1);" />
                        <div class="profit-content flex-fill bg-new-dark-white">
                          <div class="superior-summary">
                            <div class="report-summary w-100">
                              <template v-if="showAgent">
                                <div class="w-100 summaryDate">
                                  <div class="agent-type">
                                    <span class="font-weight-bold">{{ $t('__timeRange') }}</span>
                                    <span class="font-weight-bold">{{ timeRange[0] }}</span>
                                    <span class="font-weight-bold">{{ $t('__to') }}</span>
                                    <span class="font-weight-bold">{{ timeRange[1] }}</span>
                                  </div>
                                </div>
                                <div class="w-100">
                                  <span class="agent-type">{{ $t('__agentWinLossTotal') }}</span>
                                </div>
                                <div class="groups">
                                  <div class="w-100 d-flex list-row in-group">
                                    <div class="list-item info">
                                      <div class="name list-sub-item d-flex align-items-center">
                                        <span class="icon">
                                          <div class="fas gold">
                                            <svg-icon icon-class="user" />
                                          </div>
                                        </span>
                                        <span>
                                          <span class="text-link">{{ agentInfo.agent.agent }}</span>
                                          <span>
                                            {{ `[${$t('__level')}:` }}
                                            <span class="text-link">{{ `${$t('__agent')}` }}</span>
                                            {{ ']' }}
                                          </span>
                                        </span>
                                      </div>
                                      <div v-if="agentInfo.agent.open" class="halls">
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span class="hall-name">{{ $t('__liveGame') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end" />
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__betAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ agentInfo.agent.betAmountLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__validBetAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ agentInfo.agent.validBetAmount }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span class="text-parent">none</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span style="word-break: keep-all; white-space: nowrap;">
                                                  <span
                                                    :class="{
                                                      'text-red': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) > 0) || agentInfo.agent.netPL > 0),
                                                      'text-blue': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) < 0) || agentInfo.agent.netPL < 0)}"
                                                  >
                                                    {{ agentInfo.agent.winLossRateLabel }}
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__result') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': agentInfo.agent.winLoss > 0, 'text-blue': agentInfo.agent.winLoss < 0}">{{ agentInfo.agent.winLossLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ `${$t('__rollingRate')}%` }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span style="word-break: keep-all; white-space: nowrap;">
                                                  <span>{{ agentInfo.agent.rollingRateLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__rollingCommission') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.agent.rollingCommission) > 0, 'text-blue': Number(agentInfo.agent.rollingCommission) < 0}">{{ agentInfo.agent.rollingCommissionLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex align-items-end">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ `${$t('__rate')}%` }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span>{{ agentInfo.agent.commissionRate }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__totalAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.agent.netPL) > 0, 'text-blue': Number(agentInfo.agent.netPL) < 0}">{{ agentInfo.agent.netPLLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span>{{ agentInfo.agent.commitSuperiorsValidBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__toSuperior') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.agent.toSuperior) > 0, 'text-blue': Number(agentInfo.agent.toSuperior) < 0}">{{ agentInfo.agent.toSuperiorLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__giftValue') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span :class="{'text-red': Number(agentInfo.agent.giftValue) > 0, 'text-blue': Number(agentInfo.agent.giftValue) < 0}">{{ agentInfo.agent.giftValueLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div v-if="agentInfo.agent.open" class="bottom-line" />
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <span class="label">{{ $t('__validBetAmount') }}</span>
                                          <span class="value">
                                            <span>{{ agentInfo.agent.validBetAmount }}</span>
                                          </span>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__result') }}</span>
                                            <span class="value" style="position: relative;">
                                              <span :class="{'text-red': agentInfo.agent.winLoss > 0, 'text-blue': agentInfo.agent.winLoss < 0}">{{ agentInfo.agent.winLossLabel }}</span>
                                              <span class="w-rate">
                                                <span
                                                  :class="{
                                                    'text-red': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) > 0) || agentInfo.agent.netPL > 0),
                                                    'text-blue': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) < 0) || agentInfo.agent.netPL < 0)}"
                                                >
                                                  {{ agentInfo.agent.winLossRateLabel }}
                                                </span>
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                        <div class="ctrl" :class="{'exp': agentInfo.agent.open}" @click.stop="remarkExpand('agent')">
                                          <div class="item-inner">
                                            <div :class="{'d-none': agentInfo.agent.open}">
                                              <svg-icon class="fas text-gray" icon-class="more" style="height: 2.16667rem;width: 2.16667rem;" />
                                            </div>
                                            <div :class="{'d-none': !agentInfo.agent.open}">
                                              <svg-icon class="fas text-gray" icon-class="up" style="height: 1.83333rem;width: 1.83333rem;" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <span class="label">{{ $t('__rollingCommission') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.agent.rollingCommission) > 0, 'text-blue': Number(agentInfo.agent.rollingCommission) < 0}">{{ agentInfo.agent.rollingCommissionLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__totalAmount') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.agent.netPL) > 0, 'text-blue': Number(agentInfo.agent.netPL) < 0}">{{ agentInfo.agent.netPLLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <div class="win-loss">
                                            <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                            <span class="value">
                                              <span>{{ agentInfo.agent.commitSuperiorsValidBetAmount }}</span>
                                            </span>
                                          </div>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__toSuperior') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.agent.toSuperior) > 0, 'text-blue': Number(agentInfo.agent.toSuperior) < 0}">{{ agentInfo.agent.toSuperiorLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <div class="gift-value">
                                            <span class="label">{{ $t('__giftValue') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.agent.giftValue) > 0, 'text-blue': Number(agentInfo.agent.giftValue) < 0}">{{ agentInfo.agent.giftValueLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-if="showMember">
                                <div class="w-100 summaryDate">
                                  <div class="agent-type">
                                    <span class="font-weight-bold">{{ $t('__timeRange') }}</span>
                                    <span class="font-weight-bold">{{ timeRange[0] }}</span>
                                    <span class="font-weight-bold">{{ $t('__to') }}</span>
                                    <span class="font-weight-bold">{{ timeRange[1] }}</span>
                                  </div>
                                </div>
                                <div class="w-100">
                                  <span class="agent-type">{{ $t('__memberWinLossTotal') }}</span>
                                </div>
                                <div class="groups">
                                  <div class="w-100 d-flex list-row in-group">
                                    <div class="list-item info">
                                      <div class="name list-sub-item d-flex align-items-center">
                                        <span class="icon">
                                          <div class="fas gold">
                                            <svg-icon icon-class="user" />
                                          </div>
                                        </span>
                                        <span>
                                          <span class="text-link">{{ agentInfo.member.agent }}</span>
                                          <span>
                                            {{ `[${$t('__level')}:` }}
                                            <span class="text-link">{{ `${$t('__agent')}` }}</span>
                                            {{ ']' }}
                                          </span>
                                        </span>
                                      </div>
                                      <div v-if="agentInfo.member.open" class="halls">
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span class="hall-name">{{ $t('__liveGame') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end" />
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__betAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ agentInfo.member.betAmountLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__validBetAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ agentInfo.member.validBetAmount }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span class="text-parent">none</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span style="word-break: keep-all; white-space: nowrap;">
                                                  <span
                                                    :class="{
                                                      'text-red': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) > 0) || agentInfo.member.netPL > 0),
                                                      'text-blue': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) < 0) || agentInfo.member.netPL < 0)}"
                                                  >
                                                    {{ agentInfo.member.winLossRateLabel }}
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__result') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': agentInfo.member.winLoss > 0, 'text-blue': agentInfo.member.winLoss < 0}">{{ agentInfo.member.winLossLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ `${$t('__rollingRate')}%` }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span style="word-break: keep-all; white-space: nowrap;">
                                                  <span>{{ agentInfo.member.rollingRateLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__rollingCommission') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.member.rollingCommission) > 0, 'text-blue': Number(agentInfo.member.rollingCommission) < 0}">{{ agentInfo.member.rollingCommissionLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex align-items-end">
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ `${$t('__rate')}%` }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span>{{ agentInfo.member.commissionRate }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col">
                                            <div class="halls-label">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__totalAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.member.netPL) > 0, 'text-blue': Number(agentInfo.member.netPL) < 0}">{{ agentInfo.member.netPLLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span>{{ agentInfo.member.commitSuperiorsValidBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__toSuperior') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span :class="{'text-red': Number(agentInfo.member.toSuperior) > 0, 'text-blue': Number(agentInfo.member.toSuperior) < 0}">{{ agentInfo.member.toSuperiorLabel }}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="halls-row d-flex">
                                          <div class="halls-col align-items-end">
                                            <div class="halls-label text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>{{ $t('__giftValue') }}</span>
                                              </div>
                                            </div>
                                            <div class="halls-value text-right">
                                              <div class="d-flex align-items-center justify-content-end">
                                                <span>
                                                  <span :class="{'text-red': Number(agentInfo.member.giftValue) > 0, 'text-blue': Number(agentInfo.member.giftValue) < 0}">{{ agentInfo.member.giftValueLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div v-if="agentInfo.member.open" class="bottom-line" />
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <span class="label">{{ $t('__validBetAmount') }}</span>
                                          <span class="value">
                                            <span>{{ agentInfo.member.validBetAmount }}</span>
                                          </span>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__result') }}</span>
                                            <span class="value" style="position: relative;">
                                              <span :class="{'text-red': agentInfo.member.winLoss > 0, 'text-blue': agentInfo.member.winLoss < 0}">{{ agentInfo.member.winLossLabel }}</span>
                                              <span class="w-rate">
                                                <span
                                                  :class="{
                                                    'text-red': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) > 0) || agentInfo.member.netPL > 0),
                                                    'text-blue': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) < 0) || agentInfo.member.netPL < 0)}"
                                                >
                                                  {{ agentInfo.member.winLossRateLabel }}
                                                </span>
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                        <div class="ctrl" :class="{'exp': agentInfo.member.open}" @click.stop="remarkExpand('member')">
                                          <div class="item-inner">
                                            <div :class="{'d-none': agentInfo.member.open}">
                                              <svg-icon class="fas text-gray" icon-class="more" style="height: 2.16667rem;width: 2.16667rem;" />
                                            </div>
                                            <div :class="{'d-none': !agentInfo.member.open}">
                                              <svg-icon class="fas text-gray" icon-class="up" style="height: 1.83333rem;width: 1.83333rem;" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <span class="label">{{ $t('__rollingCommission') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.member.rollingCommission) > 0, 'text-blue': Number(agentInfo.member.rollingCommission) < 0}">{{ agentInfo.member.rollingCommissionLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__totalAmount') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.member.netPL) > 0, 'text-blue': Number(agentInfo.member.netPL) < 0}">{{ agentInfo.member.netPLLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <div class="win-loss">
                                            <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                            <span class="value">
                                              <span>{{ agentInfo.member.commitSuperiorsValidBetAmount }}</span>
                                            </span>
                                          </div>
                                        </div>
                                        <div class="list-item text-right">
                                          <div class="to-superiors">
                                            <span class="label">{{ $t('__toSuperior') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.member.toSuperior) > 0, 'text-blue': Number(agentInfo.member.toSuperior) < 0}">{{ agentInfo.member.toSuperiorLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="list-sub-item d-flex align-items-center">
                                        <div class="list-item text-right">
                                          <div class="gift-value">
                                            <span class="label">{{ $t('__giftValue') }}</span>
                                            <span class="value">
                                              <span :class="{'text-red': Number(agentInfo.member.giftValue) > 0, 'text-blue': Number(agentInfo.member.giftValue) < 0}">{{ agentInfo.member.giftValueLabel }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <div class="total">
                                <div class="total-details">
                                  <div class="details-row d-flex flex-wrap">
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__validBetAmount') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ agentInfo.total.validBetAmount }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__result') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': agentInfo.total.winLoss > 0, 'text-blue': agentInfo.total.winLoss < 0}">{{ agentInfo.total.winLossLabel }}</span>
                                          <span class="w-rate">
                                            <span
                                              :class="{
                                                'text-red': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) > 0) || agentInfo.total.netPL > 0),
                                                'text-blue': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) < 0) || agentInfo.total.netPL < 0)}"
                                            >
                                              {{ agentInfo.total.winLossRateLabel }}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__rollingCommission') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': Number(agentInfo.total.rollingCommission) > 0, 'text-blue': Number(agentInfo.total.rollingCommission) < 0}">{{ agentInfo.total.rollingCommissionLabel }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__totalAmount') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': Number(agentInfo.total.netPL) > 0, 'text-blue': Number(agentInfo.total.netPL) < 0}">{{ agentInfo.total.netPLLabel }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col align-items-end">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value align-items-end">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span>{{ agentInfo.total.commitSuperiorsValidBetAmount }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__toSuperior') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': Number(agentInfo.total.toSuperior) > 0, 'text-blue': Number(agentInfo.total.toSuperior) < 0}">{{ agentInfo.total.toSuperiorLabel }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__giftValue') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': Number(agentInfo.total.giftValue) > 0, 'text-blue': Number(agentInfo.total.giftValue) < 0}">{{ agentInfo.total.giftValueLabel }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__betMemberCount') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <span class="el-button bg-yellow betnum ml-auto mr-0 mb-0 mt-0" @click.stop="onBetMemberCount">
                                          <div class="fas text-link ml-auto mr-auto text-black">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 63 63"
                                              style="height: 1.08333rem; width: 1.08333rem;"
                                            >
                                              <title>ppl</title>
                                              <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                                              <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                                              <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                                              <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                                            </svg>
                                          </div>
                                          <span v-if="showTotalBetMemberCount" class="text-black font-weight-bold ml-2 mr-auto">{{ agentInfo.total.betMemberCountLabel }}</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="details-col">
                                      <div class="details-label">
                                        <div class="d-flex align-items-center justify-content-end text-right">
                                          <span>{{ $t('__myProfit') }}</span>
                                        </div>
                                      </div>
                                      <div class="details-value">
                                        <div class="d-flex align-items-center justify-content-end text-right" style="position: relative;">
                                          <span :class="{'text-red': Number(agentInfo.total.myProfit) > 0, 'text-blue': Number(agentInfo.total.myProfit) < 0}">{{ agentInfo.total.myProfitLabel }}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="profit-tabs light el-tabs">
                            <div class="el-tabs__header">
                              <div class="el-tabs__nav">
                                <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.agent}" @click.stop="onTableBtnClick(tableEnum.agent)">
                                  <div class="tab-item">
                                    <div class="fas" :class="{'yellow': curTableIndex !== tableEnum.agent, 'black': curTableIndex === tableEnum.agent}">
                                      <svg-icon icon-class="user" style="height: 1.33333rem;width: 1.33333rem;" />
                                    </div>
                                    {{ $t('__agent') }}
                                  </div>
                                </div>
                                <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.member}" @click.stop="onTableBtnClick(tableEnum.member)">
                                  <div class="tab-item">
                                    <div class="fas" :class="{'yellow': curTableIndex !== tableEnum.member, 'black': curTableIndex === tableEnum.member}">
                                      <svg-icon icon-class="member" style="height: 1.33333rem;width: 1.33333rem;" />
                                    </div>
                                    {{ $t('__member') }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <agent
                            v-show="curTableIndex === tableEnum.agent"
                            ref="agent"
                            :payout-time="searchTime"
                            @handleRespone="handleAgentRespone"
                            @setLoading="setLoading"
                          />
                          <member
                            v-show="curTableIndex === tableEnum.member"
                            ref="member"
                            :payout-time="searchTime"
                            @handleRespone="handleMemberRespone"
                            @setLoading="setLoading"
                          />
                        </div>
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
    <template v-else>
      <div class="w-100">
        <div>
          <div class="comp profit-report">
            <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
              <backTop />
              <div class="scroll-inner on native">
                <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
                  <div class="comp profit-report normal flex-column flex-fill">
                    <div class="mt-4">
                      <div class="day-range">
                        <div class="date-time-picker-box flex-nowrap">
                          <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                            <el-date-picker
                              ref="datePicker"
                              v-model="searchTime"
                              type="datetimerange"
                              popper-class="ams-timeslot-popper pcPicker"
                              :clearable="false"
                              :editable="false"
                              time-arrow-control
                              :range-separator="$t('__to')"
                              :start-placeholder="$t('__startDate')"
                              :end-placeholder="$t('__endDate')"
                              :default-time="['00:00:00', '23:59:59']"
                              :picker-options="pickerOptions"
                              :format="'yyyy-MM-dd HH:mm'"
                              prefix-icon="''"
                              clear-icon="''"
                            />
                          </div>
                          <el-button class="bg-yellow ml-auto mr-0 search-range" @click="onTableBtnClick(curTableIndex)">
                            {{ $t("__search") }}
                          </el-button>
                          <div class="pl-3" />
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.yesterday}" @click="onDateBtnClick(dateEnum.yesterday)">
                            {{ $t("__yesterday") }}
                          </el-button>
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.today}" @click="onDateBtnClick(dateEnum.today)">
                            {{ $t("__today") }}
                          </el-button>
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.lastWeek}" @click="onDateBtnClick(dateEnum.lastWeek)">
                            {{ $t("__lastWeek") }}
                          </el-button>
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.thisWeek}" @click="onDateBtnClick(dateEnum.thisWeek)">
                            {{ $t("__thisWeek") }}
                          </el-button>
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.lastMonth}" @click="onDateBtnClick(dateEnum.lastMonth)">
                            {{ $t("__lastMonth") }}
                          </el-button>
                          <el-button class="line-yellow" :class="{active: curDateEnumIndex === dateEnum.thisMonth}" @click="onDateBtnClick(dateEnum.thisMonth)">
                            {{ $t("__thisMonth") }}
                          </el-button>
                          <div class="p-3" />
                          <el-button class="bg-yellow ml-auto mr-0 search-range font-weight" @click="onExportBtnClick">
                            {{ $t("__searchAndExport") }}
                          </el-button>
                        </div>
                      </div>
                    </div>
                    <div style="border-bottom: 0.25rem solid rgb(249, 201, 1);" />
                    <div class="profit-content flex-fill">
                      <div class="superior-summary">
                        <div class="agent-group group-ui mb-0">
                          <template v-if="showAgent">
                            <div class="report-summary w-100">
                              <div class="agent-group-title w-100 summaryDate">
                                <div class="title">
                                  <span class="font-weight-bold">{{ $t('__timeRange') }}: </span>
                                  <span class="font-weight-bold">{{ timeRange[0] }}</span>
                                  <span class="font-weight-bold">{{ `${$t('__to')}: ` }}</span>
                                  <span class="font-weight-bold">{{ timeRange[1] }}</span>
                                </div>
                              </div>
                              <div class="agent-group-title w-100">
                                <div class="title" style="padding-top: 5px !important;">{{ $t('__agentWinLossTotal') }}</div>
                              </div>
                              <div class="groups">
                                <div class="w-100 d-flex list-row in-group">
                                  <div class="list-item info m-0">
                                    <div class="list-sub-item d-flex align-items-center m-0">
                                      <div class="name list-sub-item-col text-center justify-content-center" style="width: 140px; flex: 0 0 auto;">
                                        <span class="icon">
                                          <div class="fas gold">
                                            <svg-icon icon-class="user" style="height: 1.5rem; width: 1.5rem;" />
                                          </div>
                                        </span>
                                        <span class="text-link text-underline">{{ agentInfo.agent.agent }}</span>
                                        <div class="w-100">
                                          {{ `[${$t('__level')}:` }}
                                          <span class="text-link">{{ `${$t('__agent')}` }}</span>
                                          {{ ']' }}
                                        </div>
                                      </div>
                                      <div class="agent-list-detail">
                                        <div>
                                          <div class="halls table-head">
                                            <div class="left d-flex align-items-center" style="width: 70px;">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col w-100">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-center" />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="right">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col" style="width: 70px;" />
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__betAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__result') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end" />
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__validBetAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ `${$t('__rollingRate')}%` }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__rollingCommission') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__totalAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ `${$t('__rate')}%` }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__toSuperior') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__giftValue') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bottom-line mt-0" />
                                          <div class="halls">
                                            <div class="left d-flex align-items-center" style="width: 70px;">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col w-100">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-center">
                                                      <span class="hall-name text-center">{{ $t('__liveGame') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="right">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col" style="width: 70px;" />
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span class="">{{ agentInfo.agent.betAmountLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': agentInfo.agent.winLoss > 0, 'text-blue': agentInfo.agent.winLoss < 0}">{{ agentInfo.agent.winLossLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span style="word-break: keep-all; white-space: nowrap;">
                                                        <span
                                                          :class="{
                                                            'text-red': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) > 0) || agentInfo.agent.netPL > 0),
                                                            'text-blue': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) < 0) || agentInfo.agent.netPL < 0)}"
                                                        >
                                                          {{ agentInfo.agent.winLossRateLabel }}
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.agent.validBetAmount }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.agent.rollingRateLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.agent.rollingCommission) > 0, 'text-blue': Number(agentInfo.agent.rollingCommission) < 0}">{{ agentInfo.agent.rollingCommissionLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.agent.netPL) > 0, 'text-blue': Number(agentInfo.agent.netPL) < 0}">{{ agentInfo.agent.netPLLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.agent.commissionRate }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.agent.toSuperior) > 0, 'text-blue': Number(agentInfo.agent.toSuperior) < 0}">{{ agentInfo.agent.toSuperiorLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.agent.commitSuperiorsValidBetAmount }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.agent.giftValue) > 0, 'text-blue': Number(agentInfo.agent.giftValue) < 0}">{{ agentInfo.agent.giftValueLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bottom-line m-0" />
                                        </div>
                                        <div class="list-sub-item d-flex align-items-center total">
                                          <div class="left" style="flex: 0 0 auto; width: 70px;">
                                            <div class="list-sub-item-col text-center title">
                                              <span>{{ $t('__gross') }}</span>
                                            </div>
                                          </div>
                                          <div class="right d-flex">
                                            <div class="list-item" style="margin-left: 70px; width: 160px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span class="">{{ agentInfo.agent.betAmountLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span :class="{'text-red': agentInfo.agent.winLoss > 0, 'text-blue': agentInfo.agent.winLoss < 0}">{{ agentInfo.agent.winLossLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="width: 70px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span style="word-break: keep-all; white-space: nowrap;">
                                                    <span
                                                      :class="{
                                                        'text-red': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) > 0) || agentInfo.agent.netPL > 0),
                                                        'text-blue': (((agentInfo.agent.netPL === 0 || agentInfo.agent.netPL === '-') && Number(agentInfo.agent.winLossRate) < 0) || agentInfo.agent.netPL < 0)}"
                                                    >
                                                      {{ agentInfo.agent.winLossRateLabel }}
                                                    </span>
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="width: 160px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span>{{ agentInfo.agent.validBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="margin-left: 70px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.agent.rollingCommission) > 0, 'text-blue': Number(agentInfo.agent.rollingCommission) < 0}">{{ agentInfo.agent.rollingCommissionLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 win-loss text-right">
                                                <span class="label d-none">{{ $t('__totalAmount') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.agent.netPL) > 0, 'text-blue': Number(agentInfo.agent.netPL) < 0}">{{ agentInfo.agent.netPLLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="margin-left: 70px;">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__toSuperior') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.agent.toSuperior) > 0, 'text-blue': Number(agentInfo.agent.toSuperior) < 0}">{{ agentInfo.agent.toSuperiorLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                                <span class="value">
                                                  <span>{{ agentInfo.agent.commitSuperiorsValidBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__giftValue') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.agent.giftValue) > 0, 'text-blue': Number(agentInfo.agent.giftValue) < 0}">{{ agentInfo.agent.giftValueLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <template v-if="!showMember">
                                  <div class="total">
                                    <div class="group-row d-flex">
                                      <div class="group-item text-center" style="width: 70px; margin-left: 125px; flex: 0 0 auto; padding-left: 0px; padding-right: 5px;">
                                        <div class="w-100 text-center font-weight-bold">{{ $t('__totalCount') }}</div>
                                      </div>
                                      <div class="d-flex">
                                        <div class="group-item align-items-center is-amount p-0" style="width: 70px;">
                                          <span class="label">{{ $t('__betMemberCount') }}</span>
                                          <span class="value">
                                            <span class="el-button bg-yellow betnum mt-0 ml-auto mr-0" @click.stop="onBetMemberCount">
                                              <div class="fas text-link ml-auto mr-auto text-black">
                                                <svg
                                                  id="圖層_1"
                                                  data-name="圖層 1"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 63 63"
                                                  style="height: 1.33333rem; width: 1.33333rem;"
                                                >
                                                  <title>ppl</title>
                                                  <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                                                  <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                                                  <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                                                  <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                                                </svg>
                                              </div>
                                              <span v-if="showTotalBetMemberCount" class="text-black font-weight-bold ml-2 mr-auto">{{ agentInfo.total.betMemberCountLabel }}</span>
                                            </span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount" style="width: 160px;">
                                          <span class="label">{{ $t('__myProfit') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.total.myProfit) > 0, 'text-blue': Number(agentInfo.total.myProfit) < 0}">{{ agentInfo.total.myProfitLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount">
                                          <span class="label">{{ $t('__result') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': agentInfo.total.winLoss > 0, 'text-blue': agentInfo.total.winLoss < 0}">{{ agentInfo.total.winLossLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount" style="width: 70px;">
                                          <span class="label" v-html="'&nbsp;'" />
                                          <span class="value">
                                            <span style="word-break: keep-all; white-space: nowrap;">
                                              <span
                                                :class="{
                                                  'text-red': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) > 0) || agentInfo.total.netPL > 0),
                                                  'text-blue': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) < 0) || agentInfo.total.netPL < 0)}"
                                              >
                                                {{ agentInfo.total.winLossRateLabel }}
                                              </span>
                                            </span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount" style="width: 160px;">
                                          <span class="label">{{ $t('__validBetAmount') }}</span>
                                          <span class="value">
                                            <span>{{ agentInfo.total.validBetAmount }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                          <span class="label">{{ $t('__rollingCommission') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.total.rollingCommission) > 0, 'text-blue': Number(agentInfo.total.rollingCommission) < 0}">{{ agentInfo.total.rollingCommissionLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount">
                                          <span class="label">{{ $t('__totalAmount') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.total.netPL) > 0, 'text-blue': Number(agentInfo.total.netPL) < 0}">{{ agentInfo.total.netPLLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                          <span class="label">{{ $t('__toSuperior') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.total.toSuperior) > 0, 'text-blue': Number(agentInfo.total.toSuperior) < 0}">{{ agentInfo.total.toSuperiorLabel }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount">
                                          <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                          <span class="value">
                                            <span>{{ agentInfo.total.commitSuperiorsValidBetAmount }}</span>
                                          </span>
                                        </div>
                                        <div class="group-item align-items-center is-amount">
                                          <span class="label">{{ $t('__giftValue') }}</span>
                                          <span class="value">
                                            <span :class="{'text-red': Number(agentInfo.total.giftValue) > 0, 'text-blue': Number(agentInfo.total.giftValue) < 0}">{{ agentInfo.total.giftValueLabel }}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </div>
                            </div>
                          </template>
                          <template v-if="showMember">
                            <div class="report-summary w-100">
                              <div class="agent-group-title w-100 summaryDate">
                                <div class="title">
                                  <span class="font-weight-bold">{{ $t('__timeRange') }}: </span>
                                  <span class="font-weight-bold">{{ timeRange[0] }}</span>
                                  <span class="font-weight-bold">{{ `${$t('__to')}: ` }}</span>
                                  <span class="font-weight-bold">{{ timeRange[1] }}</span>
                                </div>
                              </div>
                              <div class="agent-group-title w-100">
                                <div class="title" style="padding-top: 5px !important;">{{ $t('__memberWinLossTotal') }}</div>
                              </div>
                              <div class="groups">
                                <div class="w-100 d-flex list-row in-group">
                                  <div class="list-item info m-0">
                                    <div class="list-sub-item d-flex align-items-center m-0">
                                      <div class="name list-sub-item-col text-center justify-content-center" style="width: 140px; flex: 0 0 auto;">
                                        <span class="icon">
                                          <div class="fas gold">
                                            <svg-icon icon-class="user" style="height: 1.5rem; width: 1.5rem;" />
                                          </div>
                                        </span>
                                        <span class="text-link text-underline">{{ agentInfo.member.agent }}</span>
                                        <div class="w-100">
                                          {{ `[${$t('__level')}:` }}
                                          <span class="text-link">{{ `${$t('__agent')}` }}</span>
                                          {{ ']' }}
                                        </div>
                                      </div>
                                      <div class="agent-list-detail">
                                        <div>
                                          <div class="halls table-head">
                                            <div class="left d-flex align-items-center" style="width: 70px;">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col w-100">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-center" />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="right">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col" style="width: 70px;" />
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__betAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__result') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end" />
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__validBetAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ `${$t('__rollingRate')}%` }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__rollingCommission') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__totalAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ `${$t('__rate')}%` }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__toSuperior') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-label text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ $t('__giftValue') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bottom-line mt-0" />
                                          <div class="halls">
                                            <div class="left d-flex align-items-center" style="width: 70px;">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col w-100">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-center">
                                                      <span class="hall-name text-center">{{ $t('__liveGame') }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="right">
                                              <div class="halls-row d-flex">
                                                <div class="halls-col" style="width: 70px;" />
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span class="">{{ agentInfo.member.betAmountLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': agentInfo.member.winLoss > 0, 'text-blue': agentInfo.member.winLoss < 0}">{{ agentInfo.member.winLossLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span style="word-break: keep-all; white-space: nowrap;">
                                                        <span
                                                          :class="{
                                                            'text-red': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) > 0) || agentInfo.member.netPL > 0),
                                                            'text-blue': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) < 0) || agentInfo.member.netPL < 0)}"
                                                        >
                                                          {{ agentInfo.member.winLossRateLabel }}
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 160px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.member.validBetAmount }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.member.rollingRateLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.member.rollingCommission) > 0, 'text-blue': Number(agentInfo.member.rollingCommission) < 0}">{{ agentInfo.member.rollingCommissionLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.member.netPL) > 0, 'text-blue': Number(agentInfo.member.netPL) < 0}">{{ agentInfo.member.netPLLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col" style="width: 70px;">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.member.commissionRate }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.member.toSuperior) > 0, 'text-blue': Number(agentInfo.member.toSuperior) < 0}">{{ agentInfo.member.toSuperiorLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span>{{ agentInfo.member.commitSuperiorsValidBetAmount }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="halls-col">
                                                  <div class="halls-value text-right">
                                                    <div class="d-flex align-items-center justify-content-end">
                                                      <span :class="{'text-red': Number(agentInfo.member.giftValue) > 0, 'text-blue': Number(agentInfo.member.giftValue) < 0}">{{ agentInfo.member.giftValueLabel }}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bottom-line m-0" />
                                        </div>
                                        <div class="list-sub-item d-flex align-items-center total">
                                          <div class="left" style="flex: 0 0 auto; width: 70px;">
                                            <div class="list-sub-item-col text-center title">
                                              <span>{{ $t('__gross') }}</span>
                                            </div>
                                          </div>
                                          <div class="right d-flex">
                                            <div class="list-item" style="margin-left: 70px; width: 160px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span class="">{{ agentInfo.member.betAmountLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span :class="{'text-red': agentInfo.member.winLoss > 0, 'text-blue': agentInfo.member.winLoss < 0}">{{ agentInfo.member.winLossLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="width: 70px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span style="word-break: keep-all; white-space: nowrap;">
                                                    <span
                                                      :class="{
                                                        'text-red': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) > 0) || agentInfo.member.netPL > 0),
                                                        'text-blue': (((agentInfo.member.netPL === 0 || agentInfo.member.netPL === '-') && Number(agentInfo.member.winLossRate) < 0) || agentInfo.member.netPL < 0)}"
                                                    >
                                                      {{ agentInfo.member.winLossRateLabel }}
                                                    </span>
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="width: 160px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span>{{ agentInfo.member.validBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="margin-left: 70px;">
                                              <div class="w-100 text-right">
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.member.rollingCommission) > 0, 'text-blue': Number(agentInfo.member.rollingCommission) < 0}">{{ agentInfo.member.rollingCommissionLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 win-loss text-right">
                                                <span class="label d-none">{{ $t('__totalAmount') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.member.netPL) > 0, 'text-blue': Number(agentInfo.member.netPL) < 0}">{{ agentInfo.member.netPLLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item" style="margin-left: 70px;">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__toSuperior') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.member.toSuperior) > 0, 'text-blue': Number(agentInfo.member.toSuperior) < 0}">{{ agentInfo.member.toSuperiorLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                                <span class="value">
                                                  <span>{{ agentInfo.member.commitSuperiorsValidBetAmount }}</span>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="list-item">
                                              <div class="w-100 to-superiors text-right">
                                                <span class="label d-none">{{ $t('__giftValue') }}</span>
                                                <span class="value">
                                                  <span :class="{'text-red': Number(agentInfo.member.giftValue) > 0, 'text-blue': Number(agentInfo.member.giftValue) < 0}">{{ agentInfo.member.giftValueLabel }}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="total">
                                  <div class="group-row d-flex">
                                    <div class="group-item text-center" style="width: 70px; margin-left: 125px; flex: 0 0 auto; padding-left: 0px; padding-right: 5px;">
                                      <div class="w-100 text-center font-weight-bold">{{ $t('__totalCount') }}</div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="group-item align-items-center is-amount p-0" style="width: 70px;">
                                        <span class="label">{{ $t('__betMemberCount') }}</span>
                                        <span class="value">
                                          <span class="el-button bg-yellow betnum mt-0 ml-auto mr-0" @click.stop="onBetMemberCount">
                                            <div class="fas text-link ml-auto mr-auto text-black">
                                              <svg
                                                id="圖層_1"
                                                data-name="圖層 1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 63 63"
                                                style="height: 1.33333rem; width: 1.33333rem;"
                                              >
                                                <title>ppl</title>
                                                <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                                                <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                                                <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                                                <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                                              </svg>
                                            </div>
                                            <span v-if="showTotalBetMemberCount" class="text-black font-weight-bold ml-2 mr-auto">{{ agentInfo.total.betMemberCountLabel }}</span>
                                          </span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 160px;">
                                        <span class="label">{{ $t('__myProfit') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.myProfit) > 0, 'text-blue': Number(agentInfo.total.myProfit) < 0}">{{ agentInfo.total.myProfitLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__result') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': agentInfo.total.winLoss > 0, 'text-blue': agentInfo.total.winLoss < 0}">{{ agentInfo.total.winLossLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 70px;">
                                        <span class="label" v-html="'&nbsp;'" />
                                        <span class="value">
                                          <span style="word-break: keep-all; white-space: nowrap;">
                                            <span
                                              :class="{
                                                'text-red': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) > 0) || agentInfo.total.netPL > 0),
                                                'text-blue': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) < 0) || agentInfo.total.netPL < 0)}"
                                            >
                                              {{ agentInfo.total.winLossRateLabel }}
                                            </span>
                                          </span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 160px;">
                                        <span class="label">{{ $t('__validBetAmount') }}</span>
                                        <span class="value">
                                          <span>{{ agentInfo.total.validBetAmount }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                        <span class="label">{{ $t('__rollingCommission') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.rollingCommission) > 0, 'text-blue': Number(agentInfo.total.rollingCommission) < 0}">{{ agentInfo.total.rollingCommissionLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__totalAmount') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.netPL) > 0, 'text-blue': Number(agentInfo.total.netPL) < 0}">{{ agentInfo.total.netPLLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                        <span class="label">{{ $t('__toSuperior') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.toSuperior) > 0, 'text-blue': Number(agentInfo.total.toSuperior) < 0}">{{ agentInfo.total.toSuperiorLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                        <span class="value">
                                          <span>{{ agentInfo.total.commitSuperiorsValidBetAmount }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__giftValue') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.giftValue) > 0, 'text-blue': Number(agentInfo.total.giftValue) < 0}">{{ agentInfo.total.giftValueLabel }}</span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                          <template v-if="!showAgent && !showMember">
                            <div class="report-summary w-100">
                              <div class="groups">
                                <div class="total">
                                  <div class="group-row d-flex">
                                    <div class="group-item text-center" style="width: 70px; margin-left: 125px; flex: 0 0 auto; padding-left: 0px; padding-right: 5px;">
                                      <div class="w-100 text-center font-weight-bold">{{ $t('__totalCount') }}</div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="group-item align-items-center is-amount p-0" style="width: 70px;">
                                        <span class="label">{{ $t('__betMemberCount') }}</span>
                                        <span class="value">
                                          <span class="el-button bg-yellow betnum mt-0 ml-auto mr-0" @click.stop="onBetMemberCount">
                                            <div class="fas text-link ml-auto mr-auto text-black">
                                              <svg
                                                id="圖層_1"
                                                data-name="圖層 1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 63 63"
                                                style="height: 1.33333rem; width: 1.33333rem;"
                                              >
                                                <title>ppl</title>
                                                <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                                                <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                                                <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                                                <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                                              </svg>
                                            </div>
                                            <span v-if="showTotalBetMemberCount" class="text-black font-weight-bold ml-2 mr-auto">{{ agentInfo.total.betMemberCountLabel }}</span>
                                          </span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 160px;">
                                        <span class="label">{{ $t('__myProfit') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.myProfit) > 0, 'text-blue': Number(agentInfo.total.myProfit) < 0}">{{ agentInfo.total.myProfitLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__result') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': agentInfo.total.winLoss > 0, 'text-blue': agentInfo.total.winLoss < 0}">{{ agentInfo.total.winLossLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 70px;">
                                        <span class="label" v-html="'&nbsp;'" />
                                        <span class="value">
                                          <span style="word-break: keep-all; white-space: nowrap;">
                                            <span
                                              :class="{
                                                'text-red': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) > 0) || agentInfo.total.netPL > 0),
                                                'text-blue': (((agentInfo.total.netPL === 0 || agentInfo.total.netPL === '-') && Number(agentInfo.total.winLossRate) < 0) || agentInfo.total.netPL < 0)}"
                                            >
                                              {{ agentInfo.total.winLossRateLabel }}
                                            </span>
                                          </span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="width: 160px;">
                                        <span class="label">{{ $t('__validBetAmount') }}</span>
                                        <span class="value">
                                          <span>{{ agentInfo.total.validBetAmount }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                        <span class="label">{{ $t('__rollingCommission') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.rollingCommission) > 0, 'text-blue': Number(agentInfo.total.rollingCommission) < 0}">{{ agentInfo.total.rollingCommissionLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__totalAmount') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.netPL) > 0, 'text-blue': Number(agentInfo.total.netPL) < 0}">{{ agentInfo.total.netPLLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount" style="margin-left: 70px;">
                                        <span class="label">{{ $t('__toSuperior') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.toSuperior) > 0, 'text-blue': Number(agentInfo.total.toSuperior) < 0}">{{ agentInfo.total.toSuperiorLabel }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                                        <span class="value">
                                          <span>{{ agentInfo.total.commitSuperiorsValidBetAmount }}</span>
                                        </span>
                                      </div>
                                      <div class="group-item align-items-center is-amount">
                                        <span class="label">{{ $t('__giftValue') }}</span>
                                        <span class="value">
                                          <span :class="{'text-red': Number(agentInfo.total.giftValue) > 0, 'text-blue': Number(agentInfo.total.giftValue) < 0}">{{ agentInfo.total.giftValueLabel }}</span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                      <div class="profit-tabs light el-tabs">
                        <div class="el-tabs__header">
                          <div class="el-tabs__nav">
                            <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.agent}" @click.stop="onTableBtnClick(tableEnum.agent)">
                              <div class="tab-item">
                                <div class="fas" :class="{'yellow': curTableIndex !== tableEnum.agent, 'black': curTableIndex === tableEnum.agent}">
                                  <svg-icon icon-class="user" style="height: 1.33333rem;width: 1.33333rem;" />
                                </div>
                                {{ $t('__agent') }}
                              </div>
                            </div>
                            <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.member}" @click.stop="onTableBtnClick(tableEnum.member)">
                              <div class="tab-item">
                                <div class="fas" :class="{'yellow': curTableIndex !== tableEnum.member, 'black': curTableIndex === tableEnum.member}">
                                  <svg-icon icon-class="member" style="height: 1.33333rem;width: 1.33333rem;" />
                                </div>
                                {{ $t('__member') }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <agent
                        v-show="curTableIndex === tableEnum.agent"
                        ref="agent"
                        :payout-time="searchTime"
                        @handleRespone="handleAgentRespone"
                        @setLoading="setLoading"
                      />
                      <member
                        v-show="curTableIndex === tableEnum.member"
                        ref="member"
                        :payout-time="searchTime"
                        @handleRespone="handleMemberRespone"
                        @setLoading="setLoading"
                      />
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
import { agentWinLossReportExport, agentWinLossReportBetMemberCount } from '@/api/winLossReport/agent'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import Agent from './agent/index'
import Member from './member/index'
import { getFullDate, getFullDateString, getMonthDateTime, getDayDateTime, getWeekDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'
import BackTop from '@/components/BackTop'

const defaultSearchTime = getDayDateTime()

export default {
  name: 'WinLossReport',
  components: { Agent, Member, BackTop },
  mixins: [common, viewCommon],
  data() {
    return {
      tableEnum: Object.freeze({
        'agent': 0,
        'member': 1
      }),
      dateEnum: Object.freeze({
        'none': 0,
        'yesterday': 1,
        'today': 2,
        'lastWeek': 3,
        'thisWeek': 4,
        'lastMonth': 5,
        'thisMonth': 6
      }),
      curDateEnumIndex: 0,
      agentInfo: {
        agent: {},
        member: {},
        total: {}
      },
      curTableIndex: 0,
      agentId: null
    }
  },
  computed: {
    timeRange() {
      const timeRange = [];
      this.searchTime.forEach(element => {
        timeRange.push(getFullDate(element))
      });
      return timeRange
    },
    showAgent() {
      return Number(this.agentInfo.agent.betAmountLabel) !== 0 || Number(this.agentInfo.agent.giftValue) !== 0
    },
    showMember() {
      return Number(this.agentInfo.member.betAmountLabel) !== 0 || Number(this.agentInfo.member.giftValue) !== 0
    },
    showTotalBetMemberCount() {
      return this.agentInfo.total.betMemberCount !== undefined && this.agentInfo.total.betMemberCount !== null
    }
  },
  watch: {
    '$route.path': function() {
      if (this.tempRoute.path === this.$route.path) {
        const searchTime = localStorage.getItem(`winLossReportSearchTime${this.agentId}`)
        this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
        this.$nextTick(() => {
          this.onTableBtnClick(this.curTableIndex)
        })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      localStorage.setItem(`winLossReportSearchTime${this.agentId}`, this.searchTime.toString())

      let hasSet = false
      const yesterday = getDayDateTime(-1)
      if (!hasSet && getFullDate(yesterday[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(yesterday[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.yesterday
      }
      const today = getDayDateTime()
      if (!hasSet && getFullDate(today[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(today[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.today
      }
      const lastWeek = getWeekDateTime(-1)
      if (!hasSet && getFullDate(lastWeek[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(lastWeek[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.lastWeek
      }
      const thisWeek = getWeekDateTime()
      if (!hasSet && getFullDate(thisWeek[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(thisWeek[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.thisWeek
      }
      const lastMonth = getMonthDateTime(-1)
      if (!hasSet && getFullDate(lastMonth[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(lastMonth[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.lastMonth
      }
      const thisMonth = getMonthDateTime()
      if (!hasSet && getFullDate(thisMonth[0]) === getFullDate(this.searchTime[0]) &&
        getFullDate(thisMonth[1]) === getFullDate(this.searchTime[1])) {
        hasSet = true
        this.curDateEnumIndex = this.dateEnum.thisMonth
      }
      if (!hasSet) {
        this.curDateEnumIndex = this.dateEnum.none
      }
    },
    'device': function() {
      if (this.tempRoute.path === this.$route.path) {
        this.$nextTick(() => {
          this.onTableBtnClick(this.curTableIndex)
        })
      }
    }
  },
  created() {
    if (this.tempRoute.params?.id !== undefined) {
      this.agentId = parseInt(this.tempRoute.params.id)
      const searchTime = localStorage.getItem(`winLossReportSearchTime${this.agentId}`)
      this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.agentId}`])
    } else {
      this.searchTime = defaultSearchTime
    }
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.onTableBtnClick(this.curTableIndex)
    })
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      const viewTitle = (this.agentInfo.agent && this.agentInfo.agent.agent) ? `${this.agentInfo.agent.agent}[${this.$t('__agent')}]` : ''
      if (this.agentId || this.agentId === 0) {
        this.$store.dispatch('common/setHeaderStyle', [`${viewTitle}${this.$t('__winLossReport')}`, true, () => {
          this.$router.go(-1)
        }])
      } else {
        this.$store.dispatch('common/setHeaderStyle', [`${viewTitle}${this.$t('__winLossReport')}`, false, () => { }])
      }
    },
    remarkExpand(key) {
      this.$nextTick(() => {
        this.agentInfo[key].open = !this.agentInfo[key].open;
        this.agentInfo[key] = JSON.parse(JSON.stringify(this.agentInfo[key]))
      })
    },
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.agent.agent}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    getData() {
      const data = {
        payoutTime: [],
        agentId: this.agentId
      }
      if (!this.searchTime) {
        this.searchTime = defaultSearchTime
      }
      this.searchTime.forEach(element => {
        data.payoutTime.push(getFullDate(element))
      })
      return data
    },
    onBetMemberCount() {
      const data = this.getData()
      this.setLoading(true)
      agentWinLossReportBetMemberCount(data).then((res) => {
        this.agentInfo.total.betMemberCount = res.count
        this.agentInfo.total = JSON.parse(JSON.stringify(this.agentInfo.total))
        this.agentInfo.total.betMemberCountLabel = numberFormat(res.count, 0)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onDateBtnClick(dateType) {
      switch (dateType) {
        case (this.dateEnum.yesterday):
        {
          this.searchTime = getDayDateTime(-1);
          break;
        }
        case (this.dateEnum.today):
        {
          this.searchTime = getDayDateTime();
          break;
        }
        case (this.dateEnum.lastWeek):
        {
          this.searchTime = getWeekDateTime(-1);
          break;
        }
        case (this.dateEnum.thisWeek):
        {
          this.searchTime = getWeekDateTime();
          break;
        }
        case (this.dateEnum.lastMonth):
        {
          this.searchTime = getMonthDateTime(-1);
          break;
        }
        case (this.dateEnum.thisMonth):
        {
          this.searchTime = getMonthDateTime();
          break;
        }
      }
      this.$nextTick(() => {
        this.onTableBtnClick(this.curTableIndex)
      })
    },
    onExportBtnClick() {
      const data = this.getData()
      this.setLoading(true)
      agentWinLossReportExport(data).then((res) => {
        this.onDataOut(res)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onDataOut(tablesData) {
      const excelDatas = []
      for (var tableData in tablesData) {
        const tHeader = []
        const filterVal = []
        for (const item in tablesData[tableData][0]) {
          tHeader.push(tablesData[tableData][0][item])
          filterVal.push(item)
        }
        const tableDatas = tablesData[tableData].slice(1, tablesData[tableData].length)
        excelDatas.push({
          tHeader: tHeader,
          filterVal: filterVal,
          tableDatas: tableDatas,
          sheetName: tableData
        })
      }
      const { multipleSheetExport } = require('@/vendor/Export2Excel')
      multipleSheetExport(excelDatas, 'WinLossReport_' + getFullDateString(new Date()), true, 'xlsx')
    },
    handleAgentRespone(agentInfo) {
      this.agentInfo = agentInfo
      this.setAgentInfo(this.agentInfo.agent)
      this.setAgentInfo(this.agentInfo.member)
      this.setAgentInfo(this.agentInfo.total)
      this.setTagsViewTitle()
      this.setLoading(false)
      this.setHeaderStyle()
    },
    setAgentInfo(data) {
      data.betAmountLabel = numberFormat(data.betAmount)
      data.myProfitLabel = numberFormat(data.myProfit)
      data.winLossLabel = numberFormat(data.winLoss)
      data.winLossRateLabel = `${numberFormat(data.winLossRate)}%`
      data.validBetAmount = numberFormat(data.validBetAmount)
      data.rollingCommissionLabel = numberFormat(data.rollingCommission)
      data.netPLLabel = numberFormat(data.netPL)
      data.toSuperiorLabel = numberFormat(data.toSuperior)
      data.commitSuperiorsValidBetAmount = numberFormat(data.commitSuperiorsValidBetAmount)
      data.giftValueLabel = numberFormat(data.giftValue)
      data.rollingRateLabel = numberFormat(data.rollingRate)
    },
    handleMemberRespone() {
      this.setLoading(false)
      this.$refs.agent.onSearch(this.agentId)
    },
    onTableBtnClick(tableEnum) {
      this.curTableIndex = tableEnum
      this.setLoading(true)
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          this.$refs.agent.onSearch(this.agentId)
          break
        }
        case this.tableEnum.member: {
          this.$refs.member.onSearch(this.agentId)
          break
        }
      }
    },
    setLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss">
#app.mobile {
  .winLossReport {
    width: 100%;
    height: 100%;
    .superior-summary {
      background-color: #fff;
    }
    .report-summary {
      background-color: #fdf3c9;
      .agent-type {
        font-size: 1rem;
        padding: 0.41667rem 1.66667rem 0.41667rem 0.83333rem;
        background-color: transparent !important;
        position: relative;
        overflow: hidden;
        display: inline-block;
      }
      .groups {
        padding: 0.83333rem;
        .in-group {
          background: #fff;
          -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
          box-shadow: 0px 1px 3px 1px #a6a6a6;
          padding: 0.41667rem 0.41667rem 0.41667rem 0.41667rem !important;
        }
      }
      .list-row {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0.41667rem 1.25rem;
        .list-item {
          position: relative;
          width: 100%;
          &.info {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            .list-sub-item {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-word;
              margin-bottom: 0.83333rem;
              width: 100%;
              .list-item {
                width: 45%;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                padding-right: 0.41667rem;
                span {
                  &.label {
                    width: 100%;
                    padding-bottom: 0.5rem;
                    display: block;
                  }
                }
              }
            }
            .name {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-all;
              margin-bottom: 0.83333rem;
              .icon,
              .fas,
              .text-link {
                color: #ce9600;
              }
            }
            .bottom-line {
              display: block;
              border-bottom: 0.08333rem solid #ddd;
              width: 100%;
              margin: 0.83333rem auto;
              padding: 0rem 0.83333rem;
            }
          }
          .icon {
            margin-right: 0.41667rem;
          }
          .label {
            width: 5rem;
            margin-right: 0.41667rem;
            color: #6e6e6e;
          }
          .value {
            font-weight: bold;
            .w-rate {
              position: absolute;
              top: 2px;
              left: 100%;
              white-space: nowrap;
              word-break: keep-all;
              text-align: left;
              padding-left: 0.41667rem;
              -webkit-transform: scale(0.6);
              transform: scale(0.6);
              -webkit-transform-origin: left center;
              transform-origin: left center;
            }
          }
          .ctrl {
            position: absolute;
            right: 0;
            top: 0.66667rem;
            text-align: center;
            -webkit-box-flex: initial;
            -ms-flex: initial;
            flex: initial;
            width: 3.33333rem;
            .item-inner {
              padding: 0 0.41667rem;
            }
            &.exp {
              top: auto;
              bottom: 0.66667rem;
            }
          }
        }
      }
    }
    .halls {
      margin-bottom: 0.41667rem;
      .halls-row {
        width: 100%;
        .halls-col {
          padding-right: 0.41667rem;
          padding-top: 0.41667rem;
          padding-bottom: 0.41667rem;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 45%;
          .halls-label {
            width: 100%;
            padding-bottom: 0.5rem;
            color: #6e6e6e;
            word-break: break-word;
          }
          .halls-value {
            font-weight: bold;
            word-break: break-word;
            width: 100%;
          }
        }
      }
      .hall-name {
        color: #000;
        font-weight: bold;
        font-size: 1.08333rem;
      }
    }
    .total {
      padding-bottom: 0.41667rem;
      position: relative;
      .total-details {
        padding-bottom: 0.41667rem;
        .details-row {
          padding: 0rem 1.25rem 0rem 1.25rem;
          margin-right: 0.41667rem;
          .details-col {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            width: 45%;
            margin-bottom: 0.41667rem;
            margin-top: 0.41667rem;
            .details-label {
              width: 100%;
              padding-bottom: 0.5rem;
              color: #6e6e6e;
            }
            .details-value {
              width: 100%;
              margin-left: auto;
              font-weight: bold;
              .w-rate {
                position: absolute;
                top: 0;
                left: 100%;
                white-space: nowrap;
                word-break: keep-all;
                text-align: left;
                padding-left: 0.41667rem;
                -webkit-transform: scale(0.75);
                transform: scale(0.75);
                -webkit-transform-origin: left center;
                transform-origin: left center;
              }
            }
          }
        }
      }
      .betnum {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 7.5rem;
      }
    }
    .profit-report {
      .el-button {
        margin: 0.41667rem;
        font-size: .91667rem;
        font-weight: bold;
      }
      .el-tabs {
        border-top: 0.25rem solid #000;
        .el-tabs__header {
          padding: 0;
          margin: 0;
        }
        .el-tabs__nav {
          max-width: 100%;
          width: 100%;
        }
        .el-tabs__item {
          width: 50%;
          text-align: center;
          padding: 0;
          .tab-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            .fas {
              margin-bottom: 0.25rem;
              margin-right: 0.41667rem;
            }
          }
        }
      }
      .profit-tabs {
        &.el-tabs {
          &.light {
            .el-tabs__nav {
              .el-tabs__item {
                border-bottom: 0.2rem solid #a3a3a3;
                background-color: #000;
                .tab-item {
                  color: #f9c901;
                }
                &.is-active {
                  background-color: #f9c901;
                  border-bottom: 0.16667rem solid #f9c901;
                  .tab-item {
                    color: #000;
                  }
                }
              }
              &:after {
                border: none;
              }
            }
          }
        }
      }
      .profit-list {
        background: #fff;
        background-color: transparent;
        .agent-group {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          background-color: transparent;
          &.odd {
            background-color: #e9e9e9;
          }
          .groups {
            padding: 0.83333rem;
            .in-group {
              background: #fff;
              margin-bottom: 1.25rem;
              -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
              box-shadow: 0px 1px 3px 1px #a6a6a6;
              padding: 0.08333rem 0.41667rem 0.41667rem 0.41667rem !important;
              .agent-list-detail {
                width: 100%;
              }
            }
            .ctrl {
              position: absolute;
              right: 0;
              top: 0.83333rem;
              z-index: 1;
              &.exp {
                top: auto !important;
                bottom: 0.83333rem;
              }
            }
          }
          &.none-group {
            .groups {
              padding: 0 0.83333rem 0.83333rem 0.83333rem;
              .in-group {
                margin-bottom: 0.41667rem;
              }
            }
          }
          &:first-child {
            &.none-group {
              .groups {
                padding: 0.83333rem;
              }
            }
          }
        }
        .list-row {
          padding-top: 0;
          padding-bottom: 0;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          .list-item {
            margin-top: 0.41667rem;
            position: relative;
            width: 100%;
            &.info {
              -webkit-box-flex: 1;
              -ms-flex: 1;
              flex: 1;
              .list-sub-item {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                word-break: break-all;
                margin-right: 0.83333rem;
              }
              .name {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                word-break: break-all;
                .fas,
                .text-link,
                .icon {
                  color: #ce9600;
                }
              }
            }
            .icon {
              margin-right: 0.41667rem;
            }
            .label {
              margin-right: 0.41667rem;
              color: #6e6e6e;
            }
            .list-sub-item {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-word;
              margin-bottom: 0.83333rem;
              width: 100%;
              margin-top: 0.83333rem;
              .list-sub-item-col {
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                width: 45%;
                padding-right: 0.41667rem;
                .label {
                  width: 100%;
                  margin-right: 0.41667rem;
                  color: #6e6e6e;
                  width: 100%;
                  display: block;
                  padding-bottom: 0.5rem;
                }
                .value {
                  width: 100%;
                  font-weight: bold;
                  width: 100%;
                  display: block;
                }
                &.name {
                  font-weight: bold;
                  font-size: 1.16667rem;
                  width: 100% !important;
                  padding-bottom: 0.41667rem;
                  border-bottom: 0.08333rem solid #ce9600;
                }
              }
              .w-rate {
                position: absolute;
                top: 2px;
                left: 100%;
                white-space: nowrap;
                word-break: keep-all;
                text-align: left;
                padding-left: 0.41667rem;
                -webkit-transform: scale(0.6);
                transform: scale(0.6);
                -webkit-transform-origin: left center;
                transform-origin: left center;
              }
            }
          }
        }
      }
      .bottom-line {
        display: block;
        border-bottom: 0.08333rem solid #ddd;
        width: 85%;
        margin: 0.41667rem auto 0 auto;
        padding: 0rem 0.41667rem;
      }
      .page-total {
        padding: 0.83333rem 1.25rem;
        position: relative;
        background-color: #fff !important;
        -webkit-box-shadow: 0px 2px 3px 1px #a6a6a6;
        box-shadow: 0px 2px 3px 1px #a6a6a6;
        .list-sub-item {
          margin-right: 0rem !important;
          margin-top: 0.83333rem;
          &.name {
            font-weight: bold;
            font-size: 1.16667rem;
            width: 100% !important;
            padding-bottom: 0.41667rem;
            border-bottom: 0.08333rem solid #ce9600;
            .text-link {
              font-weight: bold;
            }
          }
          .page-item {
            width: 45%;
            padding-right: 0.41667rem !important;
            &.is-amount {
              padding-right: 0.41667rem !important;
            }
            .label {
              color: #616161;
            }
          }
        }
        .page-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-size: 1.16667rem;
          width: 45% !important;
          &.is-amount {
            padding-right: 0.83333rem !important;
            .label {
              width: 100%;
              text-align: right !important;
            }
            .value {
              width: 100%;
              text-align: right !important;
            }
          }
          .label {
            width: 100%;
            margin-bottom: 0.41667rem;
            margin-right: 0;
            color: #898989;
          }
          .value {
            font-weight: bold;
          }
        }
      }
    }
  }
}

#app.pc {
  .winLossReport {
    .profit-report {
      .el-button {
        margin: 0.41667rem;
        font-size: .91667rem;
        font-weight: bold;
      }
      &.normal {
        .profit-content {
          background: #d6d6d6 !important;
          .superior-summary {
            background: #d6d6d6 !important;
          }
        }
        .agent-group {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          background-color: #fdf3c9;
          -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
          box-shadow: 0px 1px 3px 1px #a6a6a6;
          margin-bottom: 15px;
          .agent-group-title {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            .title {
              background-color: transparent !important;
              font-weight: normal !important;
              font-size: 14px;
              line-height: 1.4;
              padding-top: 10px !important;
              padding-bottom: 0px !important;
              padding: 0.5rem 1.66667rem 0.5rem 0.83333rem;
              position: relative;
              overflow: hidden;
            }
          }
          .groups {
            padding: 10px 15px 0px 15px;
            .in-group {
              background: #fff;
              margin-bottom: 15px;
              -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
              box-shadow: 0px 1px 3px 1px #a6a6a6;
              padding: 0;
              .agent-list-detail {
                border-left: 1px solid #ddd;
                width: calc(100% - 140px);
              }
              .total {
                border-left: 1px solid #ddd;
                background-color: #f7f7f7;
                padding-top: 10px;
                padding-bottom: 10px;
                .title {
                  margin-right: 140px;
                  width: 80px !important;
                  text-align: center;
                  color: #000 !important;
                  font-weight: bold;
                }
              }
            }
            .group-item {
              margin-bottom: 5px;
            }
          }
        }
      }
      .list-row {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0.41667rem 1.25rem;
        .list-item {
          position: relative;
          &.info {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            .list-sub-item {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-word;
              margin-right: 0.83333rem;
              .list-item {
                width: 140px;
                padding-right: 0.41667rem;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
              }
            }
            .name {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-all;
              margin-bottom: 0.83333rem;
              .icon,
              .fas,
              .text-link {
                color: #ce9600;
              }
            }
          }
          .icon {
            margin-right: 0.41667rem;
          }
        }
      }
      .list-row {
        .list-item {
          margin-top: 0.41667rem;
          .value {
            font-weight: bold;
          }
        }
      }
      .list-sub-item {
        width: 100%;
        .list-sub-item-col {
          padding-right: 0.41667rem;
          width: 140px;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }
      }
    }
    .halls {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .halls-row {
        width: 100%;
        .halls-col {
          padding-right: 0.41667rem;
          padding-top: 0.41667rem;
          padding-bottom: 0.41667rem;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 140px;
          .halls-label {
            width: 100%;
            padding-bottom: 0.5rem;
            color: #6e6e6e;
            word-break: break-word;
          }
          .halls-value {
            font-weight: bold;
            word-break: break-word;
            width: 100%;
          }
        }
      }
      &.table-head {
        background: #f7f7f7;
        border-left: 1px solid #ddd;
        .halls-label {
          padding-bottom: 0px !important;
        }
      }
      .left {
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
      }
      .left,
      .right {
        width: 100%;
        padding-top: 0.41667rem;
        padding-bottom: 0.41667rem;
      }
    }
    .bottom-line {
      display: block;
      border-bottom: 0.08333rem solid #ddd;
      width: 100%;
      margin: 0.41667rem auto 0 auto;
      padding: 0rem 0.41667rem;
    }
    .total {
      background-color: #fdf3c9;
      .group-row {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 0 1.25rem;
        .group-item {
          width: 140px;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          position: relative;
          margin-bottom: 10px;
          padding: 0.16667rem 0.41667rem 0.41667rem 0.83333rem;
          .label {
            width: 100%;
            margin-right: 0.41667rem;
            color: #6e6e6e;
            width: 100%;
            display: block;
            padding-bottom: 0.5rem;
          }
          .value {
            width: 100%;
            font-weight: bold;
            width: 100%;
            display: block;
          }
          .label,
          .value {
            width: 100%;
            text-align: right !important;
            padding-right: 0px !important;
          }
        }
        .betnum {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 5.83333rem;
          padding: 0.4rem 0.5rem !important;
          margin-left: 0.83333rem;
        }
      }
    }
    .el-tabs {
      border-top: 0.25rem solid #000;
      .el-tabs__header {
        padding-top: 0;
        .el-tabs__nav {
          float: none;
          background-color: #ffffff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          position: relative;
          max-width: 100%;
          width: 100%;
          .el-tabs__item {
            width: 50%;
            text-align: center;
            padding: 0;
            border-bottom: 0.2rem solid #a3a3a3;
            background-color: #000;
            .tab-item {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              color: #f9c901;
              .fas {
                margin-bottom: 0.25rem;
                margin-right: 0.41667rem;
              }
            }
            &.is-active {
              background-color: #f9c901;
              border-bottom: 0.16667rem solid #f9c901;
              .tab-item {
                color: #000;
              }
            }
          }
        }
      }
    }
    .profit-list {
      background: #d6d6d6 !important;
      .agent-group {
        &.group-ui {
          &.none-group {
            background-color: transparent !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            margin-bottom: 15px;
            &.padding-top {
              padding-top: 15px;
            }
            .groups {
              padding: 0px 15px;
            }
            &.player {
              .list-row {
                .list-item {
                  .list-sub-item {
                    .list-sub-item-col {
                      margin-bottom: 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .page-total {
      padding: 10px 15px;
      position: relative;
      background-color: #fff !important;
      -webkit-box-shadow: 0px 2px 3px 1px #a6a6a6;
      box-shadow: 0px 2px 3px 1px #a6a6a6;
      padding-right: 0 !important;
      .list-row {
        padding: 0;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        .list-sub-item {
          margin-top: 0.83333rem;
          width: 100%;
          &.name {
            font-weight: bold;
            font-size: 1.16667rem;
            width: 100% !important;
            padding-bottom: 0.41667rem;
            border-bottom: 0.08333rem solid #ce9600;
          }
          &.item-content {
            padding-left: 140px;
          }
        }
      }
      .page-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 1.16667rem;
        width: 140px;
        padding-right: 0.41667rem !important;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        position: relative;
        margin-bottom: 10px;
        &:first-child {
          width: 160px;
          margin-left: 511px;
          -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
          order: 1;
        }
        &:nth-child(2) {
          margin-left: 210px;
          -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
          order: 2;
        }
        &:nth-child(3) {
          -webkit-box-ordinal-group: 5;
          -ms-flex-order: 4;
          order: 4;
        }
        &:nth-child(4) {
          margin-left: 70px;
          -webkit-box-ordinal-group: 4;
          -ms-flex-order: 3;
          order: 3;
        }
        &:nth-child(5) {
          margin-left: 0px;
          -webkit-box-ordinal-group: 4;
          -ms-flex-order: 5;
          order: 5;
        }
        &.is-amount {
          padding-right: 0.41667rem !important;
          .label,
          .value {
            width: 100%;
            text-align: right !important;
          }
        }
        .label {
          width: 100%;
          margin-bottom: 0.41667rem;
          margin-right: 0;
          color: #898989;
        }
        .value {
          font-weight: bold;
        }
      }
      &.player {
        .page-item {
          &:first-child {
            margin-left: 281px;
            -webkit-box-ordinal-group: 2;
            -ms-flex-order: 1;
            order: 1;
          }
          &:nth-child(2) {
            margin-left: 0px;
            text-align: right;
            width: 70px;
            -webkit-box-ordinal-group: 3;
            -ms-flex-order: 2;
            order: 2;
          }
          &:nth-child(3) {
            width: 160px;
            margin-left: 0px;
            -webkit-box-ordinal-group: 4;
            -ms-flex-order: 3;
            order: 3;
          }
          &:nth-child(4) {
            margin-left: 210px;
            -webkit-box-ordinal-group: 5;
            -ms-flex-order: 4;
            order: 4;
          }
          &:last-child {
            margin-left: 210px;
            -webkit-box-ordinal-group: 6;
            -ms-flex-order: 5;
            order: 5;
          }
        }
      }
    }
  }
}
</style>
