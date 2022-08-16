<template>
  <div v-loading="dataLoading" class="scroll-wrap flex-column flex-fill">
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
                          <select class="el-select">
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
                            popper-class="ams-timeslot-popper"
                            align="right"
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
                              <div class="list-item d-flex align-items-start item-shoeAndGameRoundNum">
                                <span class="label d-none">{{ $t('__round') }}</span>
                                <span class="value d-none">
                                  <span>
                                    <span class="text-underline">{{ $t('__round') }}</span>
                                  </span>
                                </span>
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
                                      <i class="el-icon-picture text-yellow mr-2 playbackPic" @click.stop="onPlaybackPic(item)" />
                                    </div>
                                    <div class="fas videoBtn white">
                                      <img :src="require(`@/assets/gameResult/playbackUrl.png`)" style="height: 1.5rem; width: 1.5rem;" @click.stop="onPlaybackUrl(item)">
                                    </div>
                                    <span class="border-bottom border-dark" @click.stop="gameResultClick(item.round_id)">
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
                              <div class="list-item d-flex align-items-start item-betMethod" style="width: 30%; flex-wrap: wrap;">
                                <span class="label d-none">{{ $t('__device') }}</span>
                                <span class="value d-none">
                                  <span>{{ item.device }}</span>
                                </span>
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
    <playbackDialog
      v-if="curDialogIndex === dialogEnum.pic"
      :title="`${$t('__gameType')}:${selectForm.game_type} ${$t('__roundId')}:${selectForm.round_id}`"
      :visible="curDialogIndex === dialogEnum.pic"
      :playback-type="dialogEnum.pic"
      :url="imagePlaybackpic"
      @close="closeDialogEven"
    />

    <playbackDialog
      v-if="curDialogIndex === dialogEnum.video"
      :title="`${$t('__gameType')}:${selectForm.game_type} ${$t('__roundId')}:${selectForm.round_id}`"
      :visible="curDialogIndex === dialogEnum.video"
      :playback-type="dialogEnum.video"
      :url="videoPlaybackUrl"
      @close="closeDialogEven"
    />

    <gameResultDialog
      :visible="curDialogIndex === dialogEnum.resultdialog"
      :round-info="roundInfo"
      :count-info="countInfo"
      :score-cards="scoreCards"
      @close="closeDialogEven"
    />
  </div>
</template>

<script>
import { memberBetSearch, memberBetExport } from '@/api/memberBet'
import { gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards } from '@/api/gameResult'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getDayDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import PlaybackDialog from './playbackDialog';
import GameResultDialog from '@/components/GameResult/gameResultDialog';

const defaultSearchTimeType = 'betTime'
const defaultSearchTime = getDayDateTime()

export default {
  name: 'MemberBet',
  components: { PlaybackDialog, GameResultDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'pic': 1,
        'video': 2,
        'resultdialog': 3
      }),
      searchTimeType: defaultSearchTimeType,
      memberId: null,
      playbackPic: undefined,
      playbackUrl: undefined,
      curDialogIndex: 0,
      roundInfo: {},
      countInfo: {},
      scoreCards: [],
      searchOpen: false,
      selectOption: {}
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
  },
  methods: {
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
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.order_number === row.order_number);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    setTagsViewTitle() {
      if (this.memberId !== null) {
        const title = this.$t(this.tempRoute.meta.title)
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.searchItems.members.find(item => item.key === this.memberId).nickname}` })
        this.$store.dispatch('tagsView/updateVisitedView', route)
      }
    },
    gameResultClick(round_id) {
      this.dataLoading = true
      gameResultGetScoreCards({ round_id: round_id }).then((res) => {
        this.roundInfo = res.roundInfo
        this.countInfo = res.countInfo
        this.scoreCards = res.scoreCards
        this.curDialogIndex = this.dialogEnum.resultdialog
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onReset() {
      this.searchForm = {}
      this.searchTimeType = defaultSearchTimeType
      this.searchTime = defaultSearchTime
      this.handleCurrentChange(1)
    },
    handleRequest(data) {
      this.dataLoading = true
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
      this.totalCount = res.totalCount
      this.setTagsViewTitle()
      this.dataLoading = false
    },
    onPlaybackPic(row) {
      this.dataLoading = true
      this.selectForm = JSON.parse(JSON.stringify(row))
      gameResultGetPlaybackPic({ round_id: row.round_id }).then((res) => {
        this.playbackPic = res.playbackPic
        this.curDialogIndex = this.dialogEnum.pic
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onPlaybackUrl(row) {
      this.dataLoading = true
      this.selectForm = JSON.parse(JSON.stringify(row))
      gameResultGetPlaybackUrl({ round_id: row.round_id }).then((res) => {
        this.playbackUrl = res.playbackUrl
        this.curDialogIndex = this.dialogEnum.video
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
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
        this.dataLoading = false
      })
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      memberBetExport(data).then((res) => {
        this.searchForm[this.searchTimeType] = undefined
        this.onDataOut(res.rows)
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.ip-detail {
  ._item {
    line-height: 1.5;
  }
}

.no-result {
  min-height: 50vh;
  padding: 1.66667rem;
  text-align: center;
}

.playbackPic {
  transform: scale(1.3);
  vertical-align: middle;
}
</style>
