<template>
  <div v-loading="dataLoading" class="scroll-wrap flex-column flex-fill">
    <div class="scroll-inner flex-column flex-fill off">
      <div class="scroll-view flex-column flex-fill">
        <div class="report-theme ab-record all-bet bet-record red-packet flex-column flex-fill">
          <div class="flex-column flex-fill">
            <div class="scroll-wrap flex-column flex-fill flex-column flex-fill">
              <div class="scroll-inner flex-column flex-fill off">
                <div class="scroll-view flex-column flex-fill">
                  <div class="comp profit-report flex-column flex-fill">
                    <div class="bg-black w-100">
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
                          <div class="picker datetimerange datetimerange">
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
                              <div class="options gameTypes">
                                <div>
                                  <div class="option">
                                    <span class="prefix-label" />
                                    <div class="comp selected-filter custom">
                                      <el-select
                                        ref="agentSelect"
                                        v-model="searchForm.agent_id"
                                        class="d-flex"
                                        multiple
                                        :popper-append-to-body="false"
                                        :collapse-tags="agentIdCollapse"
                                        :placeholder="$t('__agent')"
                                        :popper-class="'custom-dropdown w-auto'"
                                        @visible-change="test"
                                      >
                                        <el-option
                                          v-for="item in searchItems.agents"
                                          :key="item.key"
                                          :label="item.nickname"
                                          :value="item.key"
                                        />
                                      </el-select>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberBetSearch, memberBetExport } from '@/api/memberBet'
import { gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards } from '@/api/gameResult'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
// import PlaybackDialog from './playbackDialog';
// import GameResultDialog from '@/components/GameResult/gameResultDialog';

const defaultSearchTimeType = 'betTime'
const defaultSearchTime = getTodayDateTime()

export default {
  name: 'MemberBet',
  // components: { PlaybackDialog, GameResultDialog },
  mixins: [common, viewCommon, handlePageChange],
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
      scoreCards: [],
      searchOpen: false
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
    test(test) {
      if (test) {
        const str = document.createElement('div')
        str.className = 'el-filter'
        str.innerHTML = `<input type="text" autocomplete="off" class="el-select__input el-filter_input w-100">
                          <div class="el-filter_option">
                            <div class="select-filter">
                              <div class="inner-box">
                                <div class="w-100 text-right">
                                  <span class="text-link">${this.$t('__selectAll')}</span>
                                  <span class="pl-2 pr-2">|</span>
                                  <span class="text-link">${this.$t('__clear')}</span>
                                </div>
                              </div>
                            </div>
                          </div>`
        document.getElementsByClassName('custom-dropdown')[0].prepend(str)
      }
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
