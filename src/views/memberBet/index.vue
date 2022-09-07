<template>
  <div class="memberBet">
    <template v-if="device === 'mobile'">
      <div class="scroll-wrap flex-column flex-fill">
        <div class="scroll-inner flex-column flex-fill off">
          <div class="scroll-view flex-column flex-fill">
            <div class="report-theme ab-record all-bet bet-record red-packet flex-column flex-fill">
              <div class="flex-column flex-fill">
                <div class="scroll-wrap flex-column flex-fill flex-column flex-fill">
                  <div class="scroll-inner flex-column flex-fill off">
                    <div class="scroll-view flex-column flex-fill">
                      <div class="filter-bar bg-black">
                        <div class="pt-3 pl-2 pr-2">
                          <div class="option">
                            <span class="prefix-label" />
                            <div class="comp selected-filter">
                              <select v-model="searchTimeType" class="el-select">
                                <option v-for="item in memberBetTimeType" :key="item.key" :value="item.key">
                                  {{ $t(item.nickname) }}
                                </option>
                              </select>
                              <div class="fas gray-deep">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 63 63"
                                  style="height: 0.916667rem; width: 0.916667rem;"
                                >
                                  <title>arrow_2</title>
                                  <g id="hGqiqI.tif">
                                    <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="day-range pl-2 pr-2">
                          <div class="date-time-picker-box">
                            <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                              <el-date-picker
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
                                @blur="handleChangePickerClass"
                              />
                            </div>
                            <span>
                              <a class="more-opiton text-link text-underline text-yellow align-items-center" :class="{'d-flex': searchOpen, 'd-none': !searchOpen}" @click.stop="setSearchOpen">
                                <div class="fas label icon d-flex align-items-center yellow">
                                  <svg-icon icon-class="less" style="height: 1.08333rem;width: 1.08333rem;" />
                                </div>
                                {{ $t('__options') }}
                              </a>
                              <a class="more-opiton text-link text-underline text-yellow align-items-center" :class="{'d-flex': !searchOpen, 'd-none': searchOpen}" @click.stop="setSearchOpen">
                                <div class="fas label icon d-flex align-items-center yellow">
                                  <svg-icon icon-class="add" style="height: 1.08333rem;width: 1.08333rem;" />
                                </div>
                                {{ $t('__options') }}
                              </a>
                            </span>
                          </div>
                        </div>
                        <div class="filters flex-wrap pl-2 pr-2">
                          <div class="d-flex w-100">
                            <div>
                              <div class="filter-options">
                                <div class="options agents">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.agent_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="agentIdCollapse"
                                          :placeholder="$t('__agent')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.agents"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options players">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.member_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="memberIdCollapse"
                                          :placeholder="$t('__member')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.members"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options betLog">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.order_number" :placeholder="$t('__orderNumber')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameRoundId">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div v-show="searchOpen" class="filter-options">
                                <div class="options gameTypes">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.game_type"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="gameTypeCollapse"
                                          :placeholder="$t('__gameType')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.gameType"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameTable">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.table_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="tableIdCollapse"
                                          :placeholder="$t('__tableId')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.tables"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options betType">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.game_play"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="gamePlayCollapse"
                                          :placeholder="$t('__gamePlay')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.game_play"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options betAmount">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.bet_amount" type="number" :placeholder="$t('__betAmount')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options winLoss">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.payout" type="number" :placeholder="$t('__result')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options validBetAmount">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.valid_bet_amount" type="number" :placeholder="$t('__validBetAmount')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameResult">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.gameResult"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="gameResultCollapse"
                                          :placeholder="$t('__gameResult')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.gameResult"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameRoundStatus">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.status"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="statusCollapse"
                                          :placeholder="$t('__status')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.orderStatus"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options appType">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.device"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="deviceCollapse"
                                          :placeholder="$t('__device')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.deviceType"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options ip">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.user_ip" placeholder="IP" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <el-button class="bg-yellow filter-search" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
                          </div>
                        </div>
                      </div>
                      <template v-if="tableData.length > 0">
                        <div class="common-list report-list flex-column flex-fill bg-new-dark-white">
                          <div>
                            <div class="agent-group">
                              <div
                                v-for="(item, index) in tableData"
                                :key="index"
                                class="w-100 items"
                              >
                                <div class="agent-list-basic list-row">
                                  <div class="list-item d-flex align-items-start">
                                    <span class="label">{{ $t('__agent') }}</span>
                                    <span class="value text-yellow text-link">
                                      <span>{{ item.agent }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-player">
                                    <span class="label">{{ $t('__member') }}</span>
                                    <span class="value">
                                      <span>{{ item.member }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-betTime">
                                    <span class="label">{{ $t('__betTime') }}</span>
                                    <span class="value">
                                      <span>{{ item.bet_time }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-settleTime">
                                    <span class="label">{{ $t('__payoutTime') }}</span>
                                    <span class="value">
                                      <span>{{ item.payout_time }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-gameTypeCode">
                                    <span class="label">{{ $t('__gameType') }}</span>
                                    <span class="value">
                                      <span>{{ item.game_type }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-gameRoundId">
                                    <span class="label">{{ $t('__roundId') }}</span>
                                    <span class="value text-link">
                                      <span>
                                        <span>{{ item.round_id }}</span>
                                        <!-- <span class="text-underline">{{ item.round_id }}</span> -->
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">none</span>
                                    <span class="value d-none">none</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-betLogId">
                                    <span class="label">{{ $t('__orderNumber') }}</span>
                                    <span class="value">
                                      <span>{{ item.order_number }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start" style="width: 100%; line-height: 1.5;">
                                    <span class="label">{{ $t('__gameResult') }}</span>
                                    <template v-if="item.gameResult.result === -1">
                                      <div>-</div>
                                    </template>
                                    <template v-else>
                                      <span class="value text-link">
                                        <div class="fas videoBtn white">
                                          <i class="el-icon-picture text-yellow mr-2 playbackPicIcon" @click.stop="onPlaybackPic(item)" />
                                        </div>
                                        <div class="fas videoBtn white">
                                          <img :src="require(`@/assets/gameResult/playbackUrl.png`)" style="height: 1.5rem; width: 1.5rem;" @click.stop="onPlaybackUrl(item)">
                                        </div>
                                        <span class="border-bottom border-dark" @click.stop="gameResultClick(item)">
                                          <span
                                            class="mr-1"
                                            :class="{
                                              'text-red': item.gameResult.result === 0,
                                              'text-blue': item.gameResult.result === 1,
                                              'text-green': item.gameResult.result === 2
                                            }"
                                          >
                                            {{ item.gameResult.resultLabel }}
                                          </span>
                                          <span>{{ '[' }}</span>
                                          <span>{{ $t('__player') }}</span>
                                          <span class="mr-1">{{ item.gameResult.player_point }}</span>
                                          <span>{{ $t('__banker') }}</span>
                                          <span>{{ item.gameResult.banker_point }}</span>
                                          <span>{{ ']' }}</span>
                                        </span>
                                      </span>
                                    </template>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-bet">
                                    <span class="label">{{ $t('__gamePlay') }}</span>
                                    <span class="value font-weight-bold winner">
                                      <span
                                        :class="{
                                          'text-red': item.game_play.key === 0,
                                          'text-blue': item.game_play.key === 1,
                                          'text-green': item.game_play.key === 2
                                        }"
                                      >
                                        {{ $t(item.gamePlayLabel) }}
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-betAmount is-amount">
                                    <span class="label">{{ $t('__betAmount') }}</span>
                                    <span class="value">
                                      <span>{{ item.betAmountLabel }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-status">
                                    <span class="label">{{ $t('__status') }}</span>
                                    <span class="value">
                                      <span
                                        :class="{
                                          'text-green': item.status === 1,
                                          'text-blue': item.status === 2
                                        }"
                                      >
                                        {{ $t(item.statusLabel) }}
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-winOrLossAmount is-amount">
                                    <span class="label">{{ $t('__result') }}</span>
                                    <span class="value">
                                      <span
                                        :class="{
                                          'text-red': item.payout > 0,
                                          'text-blue': item.payout < 0
                                        }"
                                      >
                                        {{ item.payoutLabel }}
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-validAmount is-amount">
                                    <span class="label">{{ $t('__validBetAmount') }}</span>
                                    <span class="value">
                                      <span>{{ item.validBetAmountLabel }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-appType" style="width: 30%; flex-wrap: wrap;">
                                    <span class="label">{{ $t('__device') }}</span>
                                    <span class="value">
                                      <span>{{ item.device }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">none</span>
                                    <span class="value d-none">none</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start" style="justify-content: flex-end; text-align: right; width: 40%; flex-wrap: wrap; padding-right: 0.83333rem;">
                                    <span class="label" style="text-align: right; width: 100%; padding-bottom: 0.5rem;">IP</span>
                                    <span class="value">
                                      <div class="ip-detail">
                                        <div class="text-yellow _item">
                                          <div>{{ item.ip }}</div>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <div v-if="index < tableData.length - 1" class="agent-break-line" />
                              </div>
                              <div v-if="totalCount > pageSize" class="text-center view-more-container bg-white">
                                <template v-if="tableData.length >= totalCount">
                                  <span class="border-dark">
                                    {{ $t("__noMoreInformation") }}
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="view-more border-bottom border-dark" @click.stop="moreInfo">{{ $t("__searchMoreValue") }}</span>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <div v-else class="no-result">{{ $t('__noInformation') }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <playbackDialogMobile
          v-if="curDialogIndex === dialogEnum.pic"
          :data="selectForm"
          :visible="curDialogIndex === dialogEnum.pic"
          :playback-type="dialogEnum.pic"
          :url="imagePlaybackpic"
          :group-rect="groupRect"
          :select-el-rect="selectElRect"
          @close="closeDialogEven"
        />

        <playbackDialogMobile
          v-if="curDialogIndex === dialogEnum.video"
          :data="selectForm"
          :visible="curDialogIndex === dialogEnum.video"
          :playback-type="dialogEnum.video"
          :url="videoPlaybackUrl"
          :group-rect="groupRect"
          :select-el-rect="selectElRect"
          @close="closeDialogEven"
        />

        <gameResultDialogMobile
          :visible="openResultdialog"
          :round-info="roundInfo"
          :count-info="countInfo"
          :score-cards="scoreCards"
          :group-rect="groupRect"
          :select-el-rect="selectElRect"
          @close="setResultdialogActive(false)"
        />
      </div>
    </template>
    <template v-else>
      <div class="report-theme ab-record all-bet rpa-record red-packet">
        <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
          <backTop ref="backTop" />
          <div class="scroll-inner on native">
            <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
              <div class="filter-bar bg-black pt-3">
                <div class="filter-outer">
                  <div class="filters flex-wrap">
                    <div class="filter-inner">
                      <div class="filter-options">
                        <div class="mr-3" style="width: 100px;">
                          <div class="option">
                            <span class="prefix-label" />
                            <div class="comp selected-filter">
                              <select v-model="searchTimeType" class="el-select">
                                <option v-for="item in memberBetTimeType" :key="item.key" :value="item.key">
                                  {{ $t(item.nickname) }}
                                </option>
                              </select>
                              <div class="fas gray-deep">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 63 63"
                                  style="height: 0.916667rem; width: 0.916667rem;"
                                >
                                  <title>arrow_2</title>
                                  <g id="hGqiqI.tif">
                                    <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="day-range">
                          <div class="date-time-picker-box">
                            <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                              <el-date-picker
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
                                @blur="handleChangePickerClass"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="options agents">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.agent_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="agentIdCollapse"
                                  :placeholder="$t('__agent')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.agents"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options players">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.member_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="memberIdCollapse"
                                  :placeholder="$t('__member')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.members"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options betLog">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.order_number" :placeholder="$t('__orderNumber')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameRoundId">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameTypes">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.game_type"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="gameTypeCollapse"
                                  :placeholder="$t('__gameType')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.gameType"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameTable">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.table_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="tableIdCollapse"
                                  :placeholder="$t('__tableId')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.tables"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options betType">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.game_play"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="gamePlayCollapse"
                                  :placeholder="$t('__gamePlay')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.game_play"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options betAmount">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.bet_amount" type="number" :placeholder="$t('__betAmount')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options winLoss">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.payout" type="number" :placeholder="$t('__result')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options validBetAmount">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.valid_bet_amount" type="number" :placeholder="$t('__validBetAmount')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameResult">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.gameResult"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="gameResultCollapse"
                                  :placeholder="$t('__gameResult')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.gameResult"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameRoundStatus">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.status"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="statusCollapse"
                                  :placeholder="$t('__status')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.orderStatus"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options appType">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.device"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="deviceCollapse"
                                  :placeholder="$t('__device')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.deviceType"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options ip">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.user_ip" placeholder="IP" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <el-button class="bg-yellow filter-search mr-4" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
                        <el-button class="bg-yellow filter-search" @click="onExportBtnClick">{{ $t("__searchAndExport") }}</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="tableData.length > 0">
                <div class="page-total2 bg-gray-white-light small">
                  <div class="w-100 list-row totals">
                    <div class="list-item" style="position: relative;">
                      <div class="name list-sub-item d-flex align-items-center">
                        <span>{{ $t('__totalCount') }}</span>
                      </div>
                      <div class="d-flex w-100" style="padding-left: 50px !important;">
                        <div class="d-flex" style="position: relative;">
                          <div class="list-item align-items-center text-right is-amount page-item item-agentIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-agent">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-playerIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-player">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betLogId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-settleTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameTypeCode">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameRoundId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-result">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-status">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-bet">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betAmount relative-target">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__betAmount') }}</div>
                                <div class="value">
                                  <span>{{ totalInfo.betAmountLabel }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-winOrLossAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__result') }}</div>
                                <div class="value">
                                  <span
                                    :class="{
                                      'text-red': totalInfo.payout > 0,
                                      'text-blue': totalInfo.payout < 0
                                    }"
                                  >
                                    {{ totalInfo.payoutLabel }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-validAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__validBetAmount') }}</div>
                                <div class="value">
                                  <span>{{ totalInfo.validBetAmountLabel }}</span>
                                </div>
                                <div class="page-item flex-column justify-content-between ab-record-total-record">
                                  <div class="label">
                                    {{ `${$t('__gong')} ` }}
                                    <span style="font-weight:bold">{{ totalInfo.count }}</span>
                                    {{ ` ${$t('__bi')}` }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-appType">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="agent-break-line" style="border-bottom: 1px solid rgb(51, 51, 51); background-color: black;" />
                  <div class="flex-nowrap report-list bg-new-dark-white has-index">
                    <div class="w-100">
                      <div class="agent-group">
                        <div class="w-100 items pb-0">
                          <div class="agent-list-basic list-row pb-2">
                            <span class="index" />
                            <div class="list-item d-flex align-items-center item-agentIcon">
                              <span class="label font-weight-bold text-black" v-html="'&nbsp;'" />
                            </div>
                            <div class="list-item d-flex align-items-center item-agent">
                              <span class="label font-weight-bold text-black">{{ $t('__agent') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-playerIcon">
                              <span class="label font-weight-bold text-black" v-html="'&nbsp;'" />
                            </div>
                            <div class="list-item d-flex align-items-center item-player">
                              <span class="label font-weight-bold text-black">{{ $t('__member') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-betLogId">
                              <span class="label font-weight-bold text-black">{{ $t('__orderNumber') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-betTime">
                              <span class="label font-weight-bold text-black">{{ $t('__betTime') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-settleTime">
                              <span class="label font-weight-bold text-black">{{ $t('__payoutTime') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-gameTypeCode">
                              <span class="label font-weight-bold text-black">{{ $t('__gameType') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-gameRoundId">
                              <span class="label font-weight-bold text-black">{{ $t('__roundId') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-result">
                              <span class="label font-weight-bold text-black">{{ $t('__gameResult') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-status">
                              <span class="label font-weight-bold text-black">{{ $t('__status') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-bet">
                              <span class="label font-weight-bold text-black">{{ $t('__gamePlay') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-betAmount is-amount">
                              <span class="label font-weight-bold text-black">{{ $t('__betAmount') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-winOrLossAmount is-amount">
                              <span class="label font-weight-bold text-black">{{ $t('__result') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-validAmount is-amount">
                              <span class="label font-weight-bold text-black">{{ $t('__validBetAmount') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-appType">
                              <span class="label font-weight-bold text-black">{{ $t('__device') }}</span>
                            </div>
                            <div class="list-item d-flex align-items-center item-ip">
                              <span class="label font-weight-bold text-black">IP</span>
                            </div>
                          </div>
                          <div class="agent-break-line" style="border-bottom: 1px solid rgb(51, 51, 51);" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-nowrap report-list flex-fill bg-new-dark-white has-index">
                  <div class="w-100">
                    <div class="agent-group memberBet-table">
                      <div
                        v-for="(item, index) in tableData"
                        :key="index"
                        class="w-100 items report-list-item-row"
                        :class="{'high-light': item.tap}"
                        @click.stop="tapRow(item)"
                      >
                        <div class="agent-list-basic list-row align-items-center">
                          <span>
                            <span class="index" style="font-size:17px!important;margin-top:-8.5px!important">{{ index + 1 }}</span>
                          </span>
                          <div class="list-item d-flex align-items-start item-agentIcon">
                            <span class="value d-flex">
                              <span class="solid-circle align-self-center clickable small">
                                <div class="fas black">
                                  <svg-icon icon-class="top" style="height: 1rem; width: 1rem;" />
                                </div>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-agent">
                            <span class="value text-black">
                              <span>{{ item.agent }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-playerIcon">
                            <span class="value d-flex">
                              <span class="solid-circle align-self-center clickable small">
                                <div class="fas black">
                                  <svg-icon icon-class="info" style="height: 1.25rem; width: 1.25rem;" />
                                </div>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-player">
                            <span class="value">
                              <span>{{ item.member }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-betLogId">
                            <span class="value">
                              <span>{{ item.order_number }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-betTime">
                            <span class="value flex-column">
                              <span style="color: rgb(110, 110, 110);">{{ item.bet_time.split(' ')[0] }}</span>
                              <span>{{ item.bet_time.split(' ')[1] }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-settleTime">
                            <span class="value flex-column">
                              <span style="color: rgb(110, 110, 110);">{{ item.payout_time.split(' ')[0] }}</span>
                              <span>{{ item.payout_time.split(' ')[1] }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-gameTypeCode">
                            <span class="value">
                              <span>{{ item.game_type }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-gameRoundId">
                            <span class="value text-link">
                              <span>
                                <span class="text-underline">{{ item.round_id }}</span>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-result">
                            <span class="value gameResultAndVideo" :class="`gameResult-${item.id}`">
                              <template v-if="item.gameResult.result === -1">
                                <div>-</div>
                              </template>
                              <template v-else>
                                <div class="fas videoBtn text-link white">
                                  <i class="el-icon-picture text-yellow mr-2 playbackPicIcon" @click.stop="onPlaybackPic(item)" />
                                </div>
                                <div class="fas videoBtn text-link white">
                                  <img :src="require(`@/assets/gameResult/playbackUrl.png`)" style="height: 1.5rem; width: 1.5rem;" @click.stop="onPlaybackUrl(item)">
                                </div>
                                <span class="border-bottom border-dark text-link" @click.stop="gameResultClick(item)">
                                  <span
                                    class="mr-1"
                                    :class="{
                                      'text-red': item.gameResult.result === 0,
                                      'text-blue': item.gameResult.result === 1,
                                      'text-green': item.gameResult.result === 2
                                    }"
                                  >
                                    {{ item.gameResult.resultLabel }}
                                  </span>
                                  <span>{{ '[' }}</span>
                                  <span>{{ $t('__player') }}</span>
                                  <span class="mr-1">{{ item.gameResult.player_point }}</span>
                                  <span>{{ $t('__banker') }}</span>
                                  <span>{{ item.gameResult.banker_point }}</span>
                                  <span>{{ ']' }}</span>
                                </span>
                              </template>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-status">
                            <span class="value text-center w-100">
                              <span>
                                <span
                                  :class="{
                                    'text-green': item.status === 1,
                                    'text-blue': item.status === 2
                                  }"
                                >
                                  {{ $t(item.statusLabel) }}
                                </span>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-bet">
                            <span class="value font-weight-bold winner PLAYER">
                              <span
                                :class="{
                                  'text-red': item.game_play.key === 0,
                                  'text-blue': item.game_play.key === 1,
                                  'text-green': item.game_play.key === 2
                                }"
                              >
                                {{ $t(item.gamePlayLabel) }}
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-betAmount is-amount">
                            <span class="value">
                              <span>{{ item.betAmountLabel }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-winOrLossAmount is-amount">
                            <span class="value">
                              <span
                                :class="{
                                  'text-red': item.payout > 0,
                                  'text-blue': item.payout < 0
                                }"
                              >
                                {{ item.payoutLabel }}
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-validAmount is-amount">
                            <span class="value">
                              <span class="">{{ item.validBetAmountLabel }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-appType">
                            <span class="value">
                              <span>{{ item.device }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-ip">
                            <span class="value">
                              <span class="text-yellow">{{ item.ip }}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <playbackDialogPC
                        v-if="curDialogIndex === dialogEnum.pic"
                        :data="selectForm"
                        :visible="curDialogIndex === dialogEnum.pic"
                        :playback-type="dialogEnum.pic"
                        :url="imagePlaybackpic"
                        :group-rect="groupRect"
                        :select-el-rect="selectElRect"
                        @close="closeDialogEven"
                      />
                      <playbackDialogPC
                        v-if="curDialogIndex === dialogEnum.video"
                        :data="selectForm"
                        :visible="curDialogIndex === dialogEnum.video"
                        :playback-type="dialogEnum.video"
                        :url="videoPlaybackUrl"
                        :group-rect="groupRect"
                        :select-el-rect="selectElRect"
                        @close="closeDialogEven"
                      />
                      <gameResultDialogPC
                        :visible="openResultdialog"
                        :round-info="roundInfo"
                        :count-info="countInfo"
                        :score-cards="scoreCards"
                        :group-rect="groupRect"
                        :select-el-rect="selectElRect"
                        @close="setResultdialogActive(false)"
                      />
                    </div>
                  </div>
                  <pagination
                    :page-size="pageSize"
                    :page-sizes="pageSizes"
                    :total="totalCount"
                    :current-page.sync="currentPage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
                <div class="page-total2">
                  <div class="agent-break-line" style="border-bottom: 1px solid rgb(206, 150, 0);" />
                  <div class="w-100 list-row totals">
                    <div class="list-item" style="position: relative;">
                      <div class="name list-sub-item d-flex align-items-center">
                        <span>{{ $t('__subtotalCount') }}</span>
                      </div>
                      <div class="d-flex w-100" style="padding-left: 50px !important;">
                        <div class="d-flex" style="position: relative;">
                          <div class="list-item align-items-center text-right is-amount page-item item-agentIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-agent">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-playerIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-player">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betLogId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-settleTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameTypeCode">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameRoundId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-result">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-status">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-bet">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betAmount relative-target">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__betAmount') }}</div>
                                <div class="value">
                                  <span>{{ subtotalInfo.betAmountLabel }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-winOrLossAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__result') }}</div>
                                <div class="value">
                                  <span
                                    :class="{
                                      'text-red': subtotalInfo.payout > 0,
                                      'text-blue': subtotalInfo.payout < 0
                                    }"
                                  >
                                    {{ subtotalInfo.payoutLabel }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-validAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="page-item mb-2 flex-column justify-content-between">
                                  <div class="label">{{ $t('__validBetAmount') }}</div>
                                  <div class="value">
                                    <span>{{ subtotalInfo.validBetAmountLabel }}</span>
                                  </div>
                                  <div class="page-item flex-column justify-content-between ab-record-total-record">
                                    <div class="label">
                                      {{ `${$t('__gong')} ` }}
                                      <span style="font-weight:bold">{{ subtotalInfo.count }}</span>
                                      {{ ` ${$t('__bi')}` }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-appType">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betMethod">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="agent-break-line" style="border-bottom: 1px solid rgb(206, 150, 0);" />
                  <div class="w-100 list-row totals">
                    <div class="list-item" style="position: relative;">
                      <div class="name list-sub-item d-flex align-items-center">
                        <span>{{ $t('__totalCount') }}</span>
                      </div>
                      <div class="d-flex w-100" style="padding-left: 50px !important;">
                        <div class="d-flex" style="position: relative;">
                          <div class="list-item align-items-center text-right is-amount page-item item-agentIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-agent">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-playerIcon">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-player">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betLogId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-settleTime">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameTypeCode">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-gameRoundId">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-result">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-status">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-bet">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betAmount relative-target">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__betAmount') }}</div>
                                <div class="value">
                                  <span>{{ totalInfo.betAmountLabel }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-winOrLossAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="label">{{ $t('__result') }}</div>
                                <div class="value">
                                  <span
                                    :class="{
                                      'text-red': totalInfo.payout > 0,
                                      'text-blue': totalInfo.payout < 0
                                    }"
                                  >
                                    {{ totalInfo.payoutLabel }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-validAmount">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between">
                                <div class="page-item mb-2 flex-column justify-content-between">
                                  <div class="label">{{ $t('__validBetAmount') }}</div>
                                  <div class="value">
                                    <span>{{ totalInfo.validBetAmountLabel }}</span>
                                  </div>
                                  <div class="page-item flex-column justify-content-between ab-record-total-record">
                                    <div class="label">
                                      {{ `${$t('__gong')} ` }}
                                      <span style="font-weight:bold">{{ totalInfo.count }}</span>
                                      {{ ` ${$t('__bi')}` }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-appType">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                          <div class="list-item align-items-center text-right is-amount page-item item-betMethod">
                            <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                              <div class="page-item mb-2 flex-column justify-content-between" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="no-result">{{ $t('__noInformation') }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { memberBetSearch, memberBetExport } from '@/api/memberBet'
import { gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards } from '@/api/gameResult'
import common from '@/mixin/common'
import viewCommon from '@/mixin/viewCommon'
import handlePageChange from '@/mixin/handlePageChange'
import { getFullDate, getFullDateString, getDayDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import PlaybackDialogPC from '@/components/GameResult/playbackDialog_pc'
import PlaybackDialogMobile from '@/components/GameResult/playbackDialog_mobile'
import GameResultDialogPC from '@/components/GameResult/gameResultDialog_pc'
import GameResultDialogMobile from '@/components/GameResult/gameResultDialog_mobile'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

const defaultSearchTimeType = 'betTime'
const defaultSearchTime = getDayDateTime()

export default {
  name: 'MemberBet',
  components: { PlaybackDialogPC, PlaybackDialogMobile, GameResultDialogPC, GameResultDialogMobile, BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'pic': 1,
        'video': 2
      }),
      openResultdialog: false,
      searchTimeType: defaultSearchTimeType,
      memberId: null,
      playbackPic: undefined,
      playbackUrl: undefined,
      curDialogIndex: 0,
      roundInfo: {},
      countInfo: {},
      scoreCards: [],
      searchOpen: false,
      selectOption: {},
      subtotalInfo: {},
      groupRect: {},
      selectElRect: {}
    }
  },
  computed: {
    ...mapGetters([
      'memberBetTimeType',
      'statusType',
      'game_play'
    ]),
    imagePlaybackpic() {
      return this.playbackPic
    },
    videoPlaybackUrl() {
      return this.playbackUrl
    },
    agentIdCollapse() {
      return this.searchForm.agent_id && this.searchForm.agent_id.length > this.selectCollapseCount
    },
    memberIdCollapse() {
      return this.searchForm.member_id && this.searchForm.member_id.length > this.selectCollapseCount
    },
    gameTypeCollapse() {
      return this.searchForm.game_type && this.searchForm.game_type.length > this.selectCollapseCount
    },
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    gameResultCollapse() {
      return this.searchForm.gameResult && this.searchForm.gameResult.length > this.selectCollapseCount
    },
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    },
    gamePlayCollapse() {
      return this.searchForm.game_play && this.searchForm.game_play.length > this.selectCollapseCount
    },
    deviceCollapse() {
      return this.searchForm.device && this.searchForm.device.length > this.selectCollapseCount
    }
  },
  watch: {
    '$route.path': function() {
      if (this.tempRoute.path === this.$route.path) {
        const searchTime = localStorage.getItem(`memberBet${this.memberId}`)
        this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
        this.$nextTick(() => {
          this.handleCurrentChange(this.currentPage)
        })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      localStorage.setItem(`memberBet${this.memberId}`, this.searchTime.toString())
    },
    'device': function() {
      if (this.tempRoute.path === this.$route.path) {
        this.closeDialogEven()
        this.setResultdialogActive(false)
        this.$nextTick(() => {
          this.handleCurrentChange(1)
          this.addSelectFilter()
        })
      }
    }
  },
  created() {
    this.searchTime = defaultSearchTime
    this.$store.dispatch('memberBet/setMemberBetTimeType')
    this.tempRoute = Object.assign({}, this.$route)
    if (this.tempRoute.params?.id !== undefined) {
      this.memberId = parseInt(this.$route.params.id)
      this.searchForm.member_id = [this.memberId]
      const searchTime = localStorage.getItem(`memberBet${this.memberId}`)
      this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.memberId}`])
    }
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.handleCurrentChange(this.currentPage)
      this.addSelectFilter()
    })
    this.setHeaderStyle()
  },
  activated() {
    this.closeDialogEven()
  },
  methods: {
    tapRow(row) {
      row.tap = !row.tap
      this.tableData = Object.assign([], this.tableData)
    },
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__memberBet'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('options agents', () => {
        this.searchForm.agent_id = JSON.parse(JSON.stringify(this.searchItems.agents)).map(item => item.key)
      }, () => {
        this.searchForm.agent_id = []
      }, () => {
        this.selectOption.agents = JSON.parse(JSON.stringify(this.searchItems.agents)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options players', () => {
        this.searchForm.member_id = JSON.parse(JSON.stringify(this.searchItems.members)).map(item => item.key)
      }, () => {
        this.searchForm.member_id = []
      }, () => {
        this.selectOption.members = JSON.parse(JSON.stringify(this.searchItems.members)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameTypes', () => {
        this.searchForm.game_type = JSON.parse(JSON.stringify(this.searchItems.gameType)).map(item => item.key)
      }, () => {
        this.searchForm.game_type = []
      }, () => {
        this.selectOption.gameType = JSON.parse(JSON.stringify(this.searchItems.gameType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameTable', () => {
        this.searchForm.table_id = JSON.parse(JSON.stringify(this.searchItems.tables)).map(item => item.key)
      }, () => {
        this.searchForm.table_id = []
      }, () => {
        this.selectOption.tables = JSON.parse(JSON.stringify(this.searchItems.tables)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options betType', () => {
        this.searchForm.game_play = JSON.parse(JSON.stringify(this.searchItems.game_play)).map(item => item.key)
      }, () => {
        this.searchForm.game_play = []
      }, () => {
        this.selectOption.game_play = JSON.parse(JSON.stringify(this.searchItems.game_play)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameResult', () => {
        this.searchForm.gameResult = JSON.parse(JSON.stringify(this.searchItems.gameResult)).map(item => item.key)
      }, () => {
        this.searchForm.gameResult = []
      }, () => {
        this.selectOption.gameResult = JSON.parse(JSON.stringify(this.searchItems.gameResult)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameRoundStatus', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.orderStatus)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.orderStatus = JSON.parse(JSON.stringify(this.searchItems.orderStatus)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options appType', () => {
        this.searchForm.device = JSON.parse(JSON.stringify(this.searchItems.deviceType)).map(item => item.key)
      }, () => {
        this.searchForm.device = []
      }, () => {
        this.selectOption.deviceType = JSON.parse(JSON.stringify(this.searchItems.deviceType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    setSearchOpen() {
      this.searchOpen = !this.searchOpen
    },
    setTagsViewTitle() {
      if (this.memberId !== null) {
        const title = this.$t(this.tempRoute.meta.title)
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.searchItems.members.find(item => item.key === this.memberId).nickname}` })
        this.$store.dispatch('tagsView/updateVisitedView', route)
      }
    },
    gameResultClick(row) {
      this.setLoading(true)
      if (this.selectForm.id !== row.id) {
        this.closeDialogEven()
      }
      this.selectForm = JSON.parse(JSON.stringify(row))
      this.setResultdialogActive(false)
      gameResultGetScoreCards({ round_id: row.round_id }).then((res) => {
        this.roundInfo = res.roundInfo
        this.countInfo = res.countInfo
        this.scoreCards = res.scoreCards
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameResult'), true, () => {
          this.setResultdialogActive(false)
          this.setHeaderStyle()
        }])
        this.setResultdialogActive(true)
        this.getRowPos(this.selectForm)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onReset() {
      this.searchForm = {}
      this.searchTimeType = defaultSearchTimeType
      this.searchTime = defaultSearchTime
      this.handleCurrentChange(1)
    },
    handleRequest(data) {
      this.setLoading(true)
      const searchTime = []
      if (!this.searchTime) {
        this.searchTime = defaultSearchTime
      }
      this.searchTime.forEach(element => {
        searchTime.push(getFullDate(element))
      })
      data[this.searchTimeType] = searchTime
    },
    handleRespone(res) {
      this.searchForm[this.searchTimeType] = undefined
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      this.tableData = res.rows.slice(0, res.rows.length - 2)
      this.tableData.forEach(element => {
        element.betAmountLabel = numberFormat(element.bet_amount)
        element.payoutLabel = numberFormat(element.payout)
        element.validBetAmountLabel = numberFormat(element.valid_bet_amount)
        const winner = this.searchItems.gameResult.find(item => item.key === element.gameResult.result).nickname
        element.gameResult.resultLabel = winner
        const player = this.searchItems.gameResult.find(item => item.key === 1).nickname
        const playerPoint = element.gameResult.player_point
        const banker = this.searchItems.gameResult.find(item => item.key === 0).nickname
        const bankerPoint = element.gameResult.banker_point
        const pointResult = player + playerPoint + ' ' + banker + bankerPoint
        element.gameResultPoints = '[' + pointResult + ']'
        element.gamePlayLabel = this.game_play.find(item => item.key === element.game_play.key).nickname
        element.statusLabel = this.statusType.find(item => item.key === element.status.toString()).nickname
      })
      this.subtotalInfo = res.subtotalInfo
      this.subtotalInfo.betAmountLabel = numberFormat(this.subtotalInfo.bet_amount)
      this.subtotalInfo.payoutLabel = numberFormat(this.subtotalInfo.payout)
      this.subtotalInfo.validBetAmountLabel = numberFormat(this.subtotalInfo.valid_bet_amount)
      this.totalInfo = res.totalInfo
      this.totalInfo.betAmountLabel = numberFormat(this.totalInfo.bet_amount)
      this.totalInfo.payoutLabel = numberFormat(this.totalInfo.payout)
      this.totalInfo.validBetAmountLabel = numberFormat(this.totalInfo.valid_bet_amount)
      this.totalCount = res.totalCount
      this.setTagsViewTitle()
      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }
      this.closeDialogEven()
      this.setResultdialogActive(false)
      this.setLoading(false)
    },
    getRowPos(row) {
      const parent = document.querySelector('.memberBet-table')
      const el = document.querySelector(`.gameResult-${row.id}`)
      if (parent && el) {
        this.groupRect = JSON.parse(JSON.stringify(parent.getBoundingClientRect()))
        this.selectElRect = JSON.parse(JSON.stringify(el.getBoundingClientRect()))
      } else {
        this.$nextTick(() => {
          this.groupRect = {}
          this.selectElRect = {}
        })
      }
    },
    onPlaybackPic(row) {
      this.setLoading(true)
      if (this.selectForm.id !== row.id) {
        this.setResultdialogActive(false)
      }
      this.selectForm = JSON.parse(JSON.stringify(row))
      this.closeDialogEven()
      gameResultGetPlaybackPic({ round_id: row.round_id }).then((res) => {
        this.playbackPic = res.playbackPic
        this.curDialogIndex = this.dialogEnum.pic
        this.getRowPos(this.selectForm)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onPlaybackUrl(row) {
      this.setLoading(true)
      if (this.selectForm.id !== row.id) {
        this.setResultdialogActive(false)
      }
      this.selectForm = JSON.parse(JSON.stringify(row))
      this.closeDialogEven()
      gameResultGetPlaybackUrl({ round_id: row.round_id }).then((res) => {
        this.playbackUrl = res.playbackUrl
        this.curDialogIndex = this.dialogEnum.video
        this.getRowPos(this.selectForm)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize * this.pageSizeCount
      this.handleRequest(data)
      memberBetSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      memberBetExport(data).then((res) => {
        this.searchForm[this.searchTimeType] = undefined
        this.onDataOut(res.rows)
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    },
    onDataOut(tableData) {
      require.ensure([], () => {
        const { export_json_to_excel, formatJson } = require('@/vendor/Export2Excel')
        const tHeader = []
        const filterVal = []
        for (const item in tableData[0]) {
          tHeader.push(tableData[0][item])
          filterVal.push(item)
        }
        tableData.splice(0, 1)
        const list = JSON.parse(JSON.stringify(tableData))
        const data = formatJson(filterVal, list)
        export_json_to_excel({ header: tHeader, data: data, filename: 'MemberBet_' + getFullDateString(new Date()) })
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
      this.setHeaderStyle()
    },
    setResultdialogActive(active) {
      this.openResultdialog = active
    },
    setLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss">
#app {
  .memberBet {
    .playbackPicIcon {
      transform: scale(1.3);
      vertical-align: middle;
    }
  }
}
#app.mobile {
  .memberBet {
    width: 100%;
    height: 100%;
    .ip-detail {
      ._item {
        line-height: 1.5;
      }
    }
  }
}
#app.pc {
  .memberBet {
    .page-total2 {
      background-color: #e9e9e9;
      padding: 0px;
      position: relative;
      z-index: 0;
      &.bg-gray-white-light {
        background: #f4f4f4;
      }
      .totals {
        min-height: 50px;
        padding-top: 5px;
      }
      &.small {
        .totals {
          min-height: 41px;
          padding-top: 2px;
          .label {
            font-size: 12px;
            padding-top: 3px;
          }
        }
      }
      .list-sub-item {
        margin-top: 0px !important;
        &.name {
          position: absolute;
          top: 0;
          left: 0;
          font-weight: bold;
          width: 100% !important;
          margin-bottom: -30px !important;
          padding: 10px 15px 10px 15px !important;
          font-size: 16px;
          color: #000;
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
        width: 180px;
        position: relative;
        padding: 0 !important;
        -ms-flex-item-align: stretch;
        align-self: stretch;
        .label {
          width: 100%;
          margin-bottom: 0.41667rem;
          margin-right: 0;
          color: #898989;
        }
        .value {
          font-weight: bold;
        }
        &.is-amount {
          padding-right: 5px !important;
          .label,
          .value {
            width: 100%;
            text-align: right !important;
          }
        }
      }
    }
    .ab-record {
      .page-total2,
      .report-list {
        .list-sub-item {
          width: 100%;
        }
        .list-item {
          width: 100px;
          min-width: 100px;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          margin-right: 5px;
          &.item-agentIcon,
          &.item-playerIcon {
            width: 25px;
            min-width: 25px;
          }
          &.item-appType,
          &.item-bet {
            width: 75px;
            min-width: 75px;
          }
          &.item-gameRoundId {
            width: 85px;
            min-width: 85px;
          }
          &.item-agent {
            width: 95px;
            min-width: 95px;
          }
          &.item-status {
            width: 100px;
            min-width: 100px;
            text-align: center;
            .label {
              width: 100%;
            }
          }
          &.item-settleTime,
          &.item-betTime {
            width: 120px;
            min-width: 120px;
          }
          &.item-result,
          &.item-ip {
            width: 145px;
            min-width: 145px;
          }
          &.item-validAmount,
          &.item-winOrLossAmount,
          &.item-betAmount,
          &.item-gameTypeCode {
            width: 160px;
            min-width: 160px;
          }
          &.item-betLogId,
          &.item-player {
            width: 185px;
            min-width: 185px;
          }
          .videoBtn {
            display: inline;
            margin-right: 0.20833rem;
          }
        }
      }
      .agent-group {
        position: relative;
      }
    }
    .no-result {
      color: #fff;
    }
  }
}
</style>
