<template>
  <div v-loading="dataLoading" class="dashboard-container">
    <div class="dashboard-cover" />
    <div class="scroll-wrap flex-column flex-fill">
      <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
        <div class="game-result flex-column flex-fill" gametype="baccarat">
          <div class="flex-column flex-fill">
            <div class="scroll-wrap flex-column flex-fill">
              <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
                <div class="scroll-view flex-column flex-fill">
                  <div class="bg-black">
                    <div class="pt-3 pl-2 pr-2">
                      <div class="option">
                        <span class="prefix-label" />
                        <div class="comp selected-filter">
                          <select v-model="searchTimeType" class="el-select">
                            <option v-for="item in gameResultTimeType" :key="item.key" :value="item.key">
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
                            :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                            :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="pickerOptions"
                            :format="'yyyy-MM-dd HH:mm'"
                            prefix-icon="''"
                            clear-icon="''"
                          />
                        </div>
                        <span @click.stop="expandSearch">
                          <a class="more-opiton text-link text-underline text-yellow d-flex align-items-center">
                            <svg-icon class="yellow fas label icon align-items-center d-flex" :class="{'d-none': !searchFormOpen}" icon-class="less" />
                            <svg-icon class="yellow fas label icon align-items-center" :class="{'d-none': searchFormOpen}" icon-class="add" />
                            {{ ` ${$t('__options')} ` }}
                          </a>
                        </span>
                      </div>
                    </div>
                    <div class="filters flex-wrap pl-2 pr-2">
                      <div class="d-flex w-100">
                        <div>
                          <div class="filter-options">
                            <div class="options">
                              <div>
                                <div class="option tableType">
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
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                            <div class="options">
                              <div>
                                <div class="option">
                                  <span class="prefix-label" />
                                  <div class="input-filter">
                                    <div class="el-input">
                                      <input v-model="searchForm.round_id" type="text" autocomplete="off" :placeholder="$t('__roundId')" class="el-input__inner">
                                    </div>
                                  </div>
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="filter-options" :class="{'d-none': !searchFormOpen}">
                            <div class="options">
                              <div>
                                <div class="option gameType">
                                  <span class="prefix-label" />
                                  <div class="comp selected-filter custom">
                                    <el-select
                                      v-model="searchForm.gameType"
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
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                            <div class="options">
                              <div>
                                <div class="option status">
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
                                        v-for="item in selectOption.gamePaymentStatus"
                                        :key="item.key"
                                        :label="item.nickname"
                                        :value="item.key"
                                      />
                                    </el-select>
                                  </div>
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                            <div class="options">
                              <div>
                                <div class="option">
                                  <span class="prefix-label" />
                                  <div class="input-filter">
                                    <div class="el-input">
                                      <el-input v-model="searchForm.banker_points" :placeholder="$t('__bankerPoints')" type="number" />
                                    </div>
                                  </div>
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                            <div class="options">
                              <div>
                                <div class="option">
                                  <span class="prefix-label" />
                                  <div class="input-filter">
                                    <div class="el-input">
                                      <el-input v-model="searchForm.player_points" :placeholder="$t('__playerPoints')" type="number" />
                                    </div>
                                  </div>
                                  <span class="suffix-label" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="el-button bg-yellow filter-search el-button--default" @click.stop="onSearch">
                          <span>{{ $t('__search') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-show="tableData.length > 0" id="report-list" class="common-list flex-column flex-fill report-list flex-column flex-fill bg-new-dark-white">
                    <div class="agent-group">
                      <div
                        v-for="(item, index) in tableData"
                        :key="index"
                        class="w-100 items"
                      >
                        <div class="agent-list-basic list-row">
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__game') }}</span>
                            <span class="value">
                              <span>{{ item.game_type }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__tableId') }}</span>
                            <span class="value">
                              <span>{{ item.table_id }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__gameStartTime') }}</span>
                            <span class="value">{{ item.game_start_time }}</span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__gameEndTime') }}</span>
                            <span class="value">
                              <span>{{ item.game_end_time }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__roundId') }}</span>
                            <span class="value">
                              <span>{{ item.round_id }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__status') }}</span>
                            <span class="value">
                              <span>
                                <span :class="{'text-blue': [2, 3, 4, 6, 7].includes(item.game_payment_status), 'text-green': [1, 5].includes(item.game_payment_status)}">{{ item.game_payment_status_name }}</span>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap; margin-right: 0rem;">
                            <span class="label" style="width: 100%; padding-bottom: 1rem;">{{ $t('__gameResult') }}</span>
                            <span class="value">
                              <span v-if="item.gameResult.result !== -1" class="value text-link">
                                <div class="fas videoBtn white">
                                  <i class="el-icon-picture playbackPic" @click="onPlaybackPic(item)" />
                                  <img class="playbackIcon" :src="require(`@/assets/gameResult/playbackUrl.png`)" @click="onPlaybackUrl(item)">
                                </div>
                                <span>
                                  <span class="border-bottom border-dark" @click.stop="gameResultClick(item.round_id)">
                                    <span class="winner" :class="{'BANKER': item.gameResult.result === 0, 'PLAYER': item.gameResult.result === 1, 'TIE': item.gameResult.result === 2}">
                                      {{ item.gameResult.resultLabel }}
                                    </span>
                                    {{ `[${$t('__player')}${item.gameResult.player_point} ${$t('__banker')}${item.gameResult.banker_point}]` }}
                                  </span>
                                </span>
                              </span>
                              <span v-else>-</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                            <div v-if="item.game_payment_status === 2" class="checkboxGroup">
                              -
                            </div>
                            <div v-else>
                              <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.billingStatus, item)">
                                <span class="el-checkbox red-tick">
                                  <span class="el-checkbox__input" :class="{'is-checked': item.invalidRound}">
                                    <span class="el-checkbox__inner" />
                                  </span>
                                </span>
                                <span class="label">{{ $t('__invalidRound') }}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="agent-break-line" />
                      </div>
                    </div>
                    <div v-if="totalCount > pageSize">
                      <div v-if="tableData.length >= totalCount">
                        <span>{{ $t("__noMoreInformation") }}</span>
                      </div>
                      <div v-else>
                        <div class="text-center view-more-container bg-white">
                          <span class="view-more border-bottom border-dark" @click="moreInfo">{{ $t('__searchMoreValue') }}</span>
                          <span style="display: block; width: 100%; height: 3.5rem;" />
                        </div>
                      </div>
                    </div>
                    <div style="display: none;" />
                  </div>
                  <div v-show="tableData.length <= 0">
                    <div class="noInformation">
                      <span>{{ $t('__noInformation') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <operateDialog
        ref="invalidRoundDialog"
        :visible="curDialogIndex === dialogEnum.billingStatus"
        :content="$stringFormat($t('__gameRoundInvalidMsg'), operateDialogMsgParameter)"
        :form="editForm"
        @close="closeDialogEven"
        @onSubmit="operateSubmit"
      />

      <playbackDialog
        v-if="curPlaybackIndex === playbackEnum.pic"
        :title="playbackTitle"
        :visible="curPlaybackIndex === playbackEnum.pic"
        :playback-type="playbackEnum.pic"
        :url="imagePlaybackpic"
        @close="closePlaybackDialogEven"
      />

      <playbackDialog
        v-if="curPlaybackIndex === playbackEnum.video"
        :title="playbackTitle"
        :visible="curPlaybackIndex === playbackEnum.video"
        :playback-type="playbackEnum.video"
        :url="videoPlaybackUrl"
        @close="closePlaybackDialogEven"
      />

      <gameResultDialog
        :visible="curDialogIndex === dialogEnum.resultdialog"
        :round-info="roundInfo"
        :count-info="countInfo"
        :score-cards="scoreCards"
        @close="closeDialogEven"
      />
    </div>
  </div>
</template>

<script>
import { gameResultSearch, gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards, gameResultModBillingStatus } from '@/api/gameResult'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getDayDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
import OperateDialog from '@/views/gameResult/operateDialog'
import PlaybackDialog from '@/components/GameResult/playbackDialog'
import GameResultDialog from '@/components/GameResult/gameResultDialog';

const defaultSearchTimeType = 'startTime'
const defaultSearchTime = getDayDateTime()

export default {
  name: 'GameResult',
  components: { OperateDialog, PlaybackDialog, GameResultDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'billingStatus': 1,
        'resultdialog': 2
      }),
      playbackEnum: Object.freeze({
        'none': 0,
        'pic': 1,
        'video': 2
      }),
      searchTimeType: defaultSearchTimeType,
      searchForm: {},
      searchItems: {},
      selectOption: {},
      playbackPic: undefined,
      playbackUrl: undefined,
      showRoadInfo: false,
      roundInfo: {},
      countInfo: {},
      curDialogIndex: 0,
      editForm: {},
      operateDialogMsgParameter: [],
      playbackTitle: "",
      curPlaybackIndex: 0,
      searchFormOpen: false,
      scoreCards: []
    }
  },
  computed: {
    ...mapGetters([
      'gameResultTimeType'
    ]),
    imagePlaybackpic() {
      return this.playbackPic
    },
    videoPlaybackUrl() {
      return this.playbackUrl
    },
    gameResultPopperClassName() {
      return this.showRoadInfo ? '' : 'display_none'
    },
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    gameTypeCollapse() {
      return this.searchForm.gameType && this.searchForm.gameType.length > this.selectCollapseCount
    },
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    }
  },
  watch: {
  },
  created() {
    this.searchTime = defaultSearchTime
    this.$store.dispatch('gameResult/setGameResultTimeType')
    this.$nextTick(() => {
      this.handleCurrentChange(this.currentPage)
      this.addSelectFilter()
    })
    this.setHeaderStyle()
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameResult'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option tableType', () => {
        this.searchForm.table_id = JSON.parse(JSON.stringify(this.searchItems.tables)).map(item => item.key)
      }, () => {
        this.searchForm.table_id = []
      }, () => {
        this.selectOption.tables = JSON.parse(JSON.stringify(this.searchItems.tables)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option gameType', () => {
        this.searchForm.gameType = JSON.parse(JSON.stringify(this.searchItems.gameType)).map(item => item.key)
      }, () => {
        this.searchForm.gameType = []
      }, () => {
        this.selectOption.gameType = JSON.parse(JSON.stringify(this.searchItems.gameType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.gamePaymentStatus)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.gamePaymentStatus = JSON.parse(JSON.stringify(this.searchItems.gamePaymentStatus)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    expandSearch() {
      this.searchFormOpen = !this.searchFormOpen
    },
    onSearch() {
      this.pageSizeCount = 1
      this.handleCurrentChange(1)
    },
    onOperateCheckboxClick(operateType, rowData) {
      this.editForm = { round_id: rowData.round_id }
      switch (operateType) {
        case this.dialogEnum.billingStatus: {
          this.curDialogIndex = this.dialogEnum.billingStatus
          this.operateDialogMsgParameter = [rowData.round_id]
          break
        }
      }
    },
    operateSubmit(data) {
      switch (this.curDialogIndex) {
        case this.dialogEnum.billingStatus: {
          this.$refs.invalidRoundDialog.setDialogLoading(true)
          gameResultModBillingStatus(data).then((res) => {
            const element = this.tableData.find(item => item.round_id === data.round_id)
            if (element) {
              element.game_payment_status = res.game_payment_status
              element.game_payment_status_name = res.game_payment_status_name
              element.invalidRound = element.game_payment_status === 1
            }
            this.$refs.invalidRoundDialog.setDialogLoading(false)
            this.closeDialogEven()
          }).catch(() => {
            this.$refs.invalidRoundDialog.setDialogLoading(false)
          })
          break
        }
      }
    },
    closeGameResultPopover(round_id) {
      this.$refs[`roadInfo-${round_id}`].doClose()
    },
    gameResultClick(round_id) {
      this.showRoadInfo = false
      this.dataLoading = true
      const data = { round_id: round_id }
      this.countInfo = {}
      gameResultGetScoreCards(data).then((res) => {
        this.roundInfo = res.roundInfo
        this.countInfo = res.countInfo
        this.scoreCards = res.scoreCards
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameResult'), true, () => {
          this.closeDialogEven()
          this.setHeaderStyle()
        }])
        this.curDialogIndex = this.dialogEnum.resultdialog
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onReset() {
      this.pageSizeCount = 1
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
      this.tableData = res.rows
      this.tableData.forEach(element => {
        const winner = this.searchItems.gameResult.find(item => item.key === element.gameResult.result)
        if (winner) {
          element.gameResult.resultLabel = winner.nickname
        }
        const player = this.searchItems.gameResult.find(item => item.key === 1)
        const banker = this.searchItems.gameResult.find(item => item.key === 0)
        if (player && banker) {
          const playerPoint = element.gameResult.player_point
          const bankerPoint = element.gameResult.banker_point
          const pointResult = player.nickname + playerPoint + ' ' + banker.nickname + bankerPoint
          element.gameResultPoints = '[' + pointResult + ']'
        }

        element.invalidRound = element.game_payment_status === 1
      })
      this.totalCount = res.totalCount
      this.dataLoading = false
    },
    onPlaybackPic(row) {
      this.dataLoading = true
      this.playbackTitle = `${this.$t('__gameType')} ${row.game_type} ${this.$t('__tableId')} ${row.table_id} ${this.$t('__roundId')} ${row.round_id}`
      gameResultGetPlaybackPic({ round_id: row.round_id }).then((res) => {
        this.playbackPic = res.playbackPic
        this.curPlaybackIndex = this.playbackEnum.pic
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onPlaybackUrl(row) {
      this.dataLoading = true
      this.playbackTitle = `${this.$t('__gameType')} ${row.game_type} ${this.$t('__tableId')} ${row.table_id} ${this.$t('__roundId')} ${row.round_id}`
      gameResultGetPlaybackUrl({ round_id: row.round_id }).then((res) => {
        this.playbackUrl = res.playbackUrl
        this.curPlaybackIndex = this.playbackEnum.video
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onSubmit() {
      this.searchForm.page = this.currentPage
      this.searchForm.rowsCount = this.pageSize * this.pageSizeCount
      this.handleRequest(this.searchForm)
      gameResultSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    },
    closePlaybackDialogEven() {
      this.curPlaybackIndex = this.playbackEnum.none
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss" scoped>
#app .dashboard-container {
  padding-top: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  max-width: 768px;
  width: 100%;
  height: 100%;
  z-index: 1;
  margin: 0 auto;
}

.dashboard-container {
    margin-left: 0;
}
.dashboard-cover {
    display: none;
}

.filters .filter-options {
    width: 23.33333rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.filters {
  .options {
    width: 11.41667rem;
    margin-right: 0;
  }
}

.filters {
  .filter-search {
    margin-left: 0.5rem !important;
  }
}

.playbackPic {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
    vertical-align: middle;
    color: #f9c901;
    margin-right: 0.8rem;
}

.playbackIcon{
    width: 1.5rem;
    height: 1.5rem;
    color: #f9c901;
    margin-right: 0.2rem;
}

.noInformation {
  margin-top: 1rem;
  text-align: center;
}
</style>
