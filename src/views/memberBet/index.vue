<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-select v-model="searchTimeType" filterable class="memberBetTimeType">
                <el-option v-for="item in memberBetTimeType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="$t('__startDate')"
                :end-placeholder="$t('__endDate')"
                :picker-options="pickerOptions"
                :default-time="['12:00:00', '11:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agent_id" multiple filterable :collapse-tags="agentIdCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.member_id" multiple filterable :collapse-tags="memberIdCollapse" :placeholder="$t('__member')">
                <el-option v-for="item in searchItems.members" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.order_number" :placeholder="$t('__orderNumber')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.game_type" multiple filterable :collapse-tags="gameTypeCollapse" :placeholder="$t('__gameType')">
                <el-option v-for="item in searchItems.gameType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.table_id" multiple filterable :collapse-tags="tableIdCollapse" :placeholder="$t('__tableId')">
                <el-option v-for="item in searchItems.tables" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.gameResult" multiple filterable :collapse-tags="gameResultCollapse" :placeholder="$t('__gameResult')">
                <el-option v-for="item in searchItems.gameResult" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.orderStatus" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.game_play" multiple filterable :collapse-tags="gamePlayCollapse" :placeholder="$t('__gamePlay')">
                <el-option v-for="item in searchItems.game_play" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.bet_amount" type="number" :placeholder="$t('__betAmount')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.payout" type="number" :placeholder="$t('__result')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.valid_bet_amount" type="number" :placeholder="$t('__validBetAmount')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.device" multiple filterable :collapse-tags="deviceCollapse" :placeholder="$t('__device')">
                <el-option v-for="item in searchItems.deviceType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.user_ip" placeholder="IP" />
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-parent" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
                {{ $t("__moreSearch") }}
              </el-button>
            </p>
          </div>
        </template>
      </div>
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="wrap" @click="remarkExpand(item)">
                <div class="expand">
                  <svg-icon v-if="item.open" icon-class="up" @click.stop="remarkExpand(item)" />
                  <svg-icon v-else icon-class="more" @click.stop="remarkExpand(item)" />
                </div>
                <div class="item">
                  <span class="header">{{ $t('__agent') }}</span>
                  <span class="content">{{ item.agent }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__member') }}</span>
                  <span class="content">{{ item.member }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__orderNumber') }}</span>
                  <span class="content">{{ item.order_number }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__betTime') }}</span>
                  <span class="content">{{ item.bet_time }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__payoutTime') }}</span>
                  <span>{{ item.payout_time }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__gameType') }}</span>
                  <span>{{ item.game_type }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__roundId') }}</span>
                  <span>{{ item.round_id }}</span>
                </div>
                <template v-if="item.open">
                  <div class="item">
                    <span class="header">{{ $t('__gameResult') }}</span>
                    <div class="gameResult" @click.stop="gameResultClick(item.round_id)">
                      <span
                        class="mr-5"
                        :class="{
                          'banker': item.gameResult.result === 0,
                          'player': item.gameResult.result === 1,
                          'tie': item.gameResult.result === 2}"
                      >
                        {{ item.gameResult.resultLabel }}
                      </span>
                      <span>{{ "[" }}</span>
                      <span class="mr-5 player">
                        <span>{{ $t('__player') }}</span>
                        <span>{{ item.gameResult.player_point }}</span>
                      </span>
                      <span class="banker">
                        <span>{{ $t('__banker') }}</span>
                        <span>{{ item.gameResult.banker_point }}</span>
                      </span>
                      <span>{{ "]" }}</span>
                    </div>
                    <div>
                      <i class="el-icon-picture playbackIcon" @click.stop="onPlaybackPic(item)" />
                      <img class="playbackIcon" :src="require(`@/assets/gameResult/playbackUrl.png`)" @click.stop="onPlaybackUrl(item)">
                    </div>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__status') }}</span>
                    <span class="status" :class="{'statusOpen': item.status === '已派彩' }">{{ item.status }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__gamePlay') }}</span>
                    <span>{{ item.game_play }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__betAmount') }}</span>
                    <span>{{ item.bet_amount }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__result') }}</span>
                    <span>{{ item.payout }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__validBetAmount') }}</span>
                    <span>{{ item.valid_bet_amount }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__device') }}</span>
                    <span>{{ item.device }}</span>
                  </div>
                  <div class="item">
                    <span class="header">IP</span>
                    <span>{{ item.ip }}</span>
                  </div>
                </template>
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
    <playbackDialog
      v-if="curPlaybackIndex === playbackEnum.pic"
      :title="`${$t('__gameType')}:${selectForm.game_type} ${$t('__roundId')}:${selectForm.round_id}`"
      :visible="curPlaybackIndex === playbackEnum.pic"
      :playback-type="playbackEnum.pic"
      :url="imagePlaybackpic"
      @close="closePlaybackDialogEven"
    />

    <playbackDialog
      v-if="curPlaybackIndex === playbackEnum.video"
      :title="`${$t('__gameType')}:${selectForm.game_type} ${$t('__roundId')}:${selectForm.round_id}`"
      :visible="curPlaybackIndex === playbackEnum.video"
      :playback-type="playbackEnum.video"
      :url="videoPlaybackUrl"
      @close="closePlaybackDialogEven"
    />

    <gameResultDialog
      :visible="curGameResultIndex === gameResultEnum.resultdialog"
      :round-info="roundInfo"
      :count-info="countInfo"
      :score-cards="scoreCards"
      @close="closeGameResultEven"
    />
  </div>
</template>

<script>
import { memberBetSearch, memberBetExport } from '@/api/memberBet'
import { gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards } from '@/api/gameResult'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
import PlaybackDialog from './playbackDialog';
import GameResultDialog from '@/components/GameResult/gameResultDialog';

const defaultSearchTimeType = 'betTime'
const defaultSearchTime = getTodayDateTime()

export default {
  name: 'MemberBet',
  components: { PlaybackDialog, GameResultDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('__yesterday'),
          onClick(picker) {
            picker.$emit('pick', getYesterdayDateTime())
          }
        }, {
          text: this.$t('__today'),
          onClick(picker) {
            picker.$emit('pick', getTodayDateTime())
          }
        }, {
          text: this.$t('__lastWeek'),
          onClick(picker) {
            picker.$emit('pick', getLastWeekDateTime())
          }
        }, {
          text: this.$t('__thisWeek'),
          onClick(picker) {
            picker.$emit('pick', getThisWeekDateTime())
          }
        }, {
          text: this.$t('__lastMonth'),
          onClick(picker) {
            picker.$emit('pick', getLastMonthDateTime())
          }
        }, {
          text: this.$t('__thisMonth'),
          onClick(picker) {
            picker.$emit('pick', getThisMonthDateTime())
          }
        }]
      },
      playbackEnum: Object.freeze({
        'none': 0,
        'pic': 1,
        'video': 2
      }),
      gameResultEnum: Object.freeze({
        'none': 0,
        'resultdialog': 1
      }),
      searchTimeType: defaultSearchTimeType,
      searchTime: defaultSearchTime,
      memberId: null,
      firstCreate: true,
      playbackPic: undefined,
      playbackUrl: undefined,
      curPlaybackIndex: 0,
      curGameResultIndex: 0,
      roundInfo: {},
      countInfo: {},
      scoreCards: []
    }
  },
  computed: {
    ...mapGetters([
      'memberBetTimeType'
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
        if (this.$route.query?.searchTime) {
          this.searchTime = this.$route.query.searchTime.split(',')
          this.$nextTick(() => {
            this.handleCurrentChange(this.currentPage)
          })
        }
        this.$router.replace({ 'query': null })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      if (!this.firstCreate) {
        this.$nextTick(() => {
          this.handleCurrentChange(1)
        })
      }
    }
  },
  created() {
    this.searchFormNormalHeight = "68px";
    this.$store.dispatch('memberBet/setMemberBetTimeType')
    if (this.tempRoute.params?.id !== undefined) {
      this.memberId = parseInt(this.$route.params.id)
      this.searchForm.member_id = [this.memberId]
      this.searchTime = this.tempRoute.query.searchTime?.split(',') || defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.memberId}`])
    }
    this.$router.replace({ 'query': null })
    this.tempRoute.query = null
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.handleCurrentChange(this.currentPage)
      this.firstCreate = false
    })
  },
  methods: {
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
        this.curGameResultIndex = this.gameResultEnum.resultdialog
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
      this.searchItems = res.searchItems
      this.tableData = res.rows
      for (let i = 0, max = this.tableData.length; i < max; i++) {
        if (i >= max - 2) {
          continue
        }
        const element = this.tableData[i]
        const winner = this.searchItems.gameResult.find(item => item.key === element.gameResult.result).nickname
        element.gameResult.resultLabel = winner
        element.game_play = element.game_play.nickname
      }
      this.totalCount = res.totalCount
      this.setTagsViewTitle()
      this.dataLoading = false
    },
    onPlaybackPic(row) {
      this.dataLoading = true
      this.selectForm = JSON.parse(JSON.stringify(row))
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
      this.selectForm = JSON.parse(JSON.stringify(row))
      gameResultGetPlaybackUrl({ round_id: row.round_id }).then((res) => {
        this.playbackUrl = res.playbackUrl
        this.curPlaybackIndex = this.playbackEnum.video
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize
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
    closePlaybackDialogEven() {
      this.curPlaybackIndex = this.playbackEnum.none
    },
    closeGameResultEven() {
      this.curGameResultIndex = this.gameResultEnum.none
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
          position: relative;
          .agentName {
            vertical-align: top;
          }
          .item {
            .header {
              width: 100px;
              min-width: 100px;
            }
          }
        }
      }
    }
  }
}

.gameResult {
  cursor: pointer;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .mr-5 {
    margin-right: 5px;
  }
}
.playbackIcon {
  width: 20px;
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  margin-left: 20px;
  color: $yellow;
}
.expand {
  position: absolute;
  right: 0;
}
</style>
