<template>
  <div>
    <div class="comp profit-report flex-column flex-fill bg-black">
      <div class="bg-black w-100 pt-4">
        <div class="day-range">
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
            <el-button class="bg-yellow ml-auto mr-0 search-range" @click="onTableBtnClick(curTableIndex)">
              {{ $t("__search") }}
            </el-button>
          </div>
          <div class="day-range-options">
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.yesterday)">
              {{ $t("__yesterday") }}
            </el-button>
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.today)">
              {{ $t("__today") }}
            </el-button>
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.lastWeek)">
              {{ $t("__lastWeek") }}
            </el-button>
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.thisWeek)">
              {{ $t("__thisWeek") }}
            </el-button>
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.lastMonth)">
              {{ $t("__lastMonth") }}
            </el-button>
            <el-button class="line-yellow" @click="onDateBtnClick(dateEnum.thisMonth)">
              {{ $t("__thisMonth") }}
            </el-button>
          </div>
        </div>
      </div>
      <div style="border-bottom: 0.25rem solid rgb(249, 201, 1);" />
      <div class="profit-content flex-fill bg-new-dark-white">
        <div class="superior-summary">
          <div class="report-summary w-100">
            <div class="w-100 summaryDate">
              <div class="agent-type">
                <span class="font-weight-bold">{{ $t('__timeRange') }}</span>
                <span class="font-weight-bold">{{ timeRange[0] }}</span>
                <span class="font-weight-bold">{{ $t('__to')}}</span>
                <span class="font-weight-bold">{{ timeRange[1] }}</span>
              </div>
            </div>
            <div class="w-100">
              <span class="agent-type">{{ $t('__agentWinLossTotal') }}</span>
            </div>
            <div class="group">
              <div class="w-100 d-flex list-row in-group">
                <div class="list-item info">
                  <div class="name list-sub-item d-flex align-items-center">
                    <span class="icon">
                      <div class="fas gold">
                        <svg-icon icon-class="user" />
                      </div>
                    </span>
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
import { agentWinLossReportExport, agentWinLossReportBetMemberCount } from '@/api/winLossReport/agent'
import viewCommon from '@/mixin/viewCommon';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import Agent from './agent/index'
import Member from './member/index'
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'WinLossReport',
  components: { Agent, Member },
  mixins: [viewCommon, handleSearchFormOpen],
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
      agentInfo: {},
      curTableIndex: 0,
      searchTime: defaultSearchTime,
      agentId: null,
      firstCreate: true
    }
  },
  computed: {
    timeRange() {
      const timeRange = [];
      this.searchTime.forEach(element => {
        timeRange.push(getFullDate(element))
      });
      return timeRange
    }
  },
  watch: {
    '$route.path': function() {
      if (this.tempRoute.path === this.$route.path) {
        if (this.$route.query?.searchTime) {
          this.searchTime = this.$route.query.searchTime.split(',')
          this.$nextTick(() => {
            this.onTableBtnClick(this.curTableIndex)
          })
        }
        this.$router.replace({ 'query': null })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      if (!this.firstCreate) {
        this.$nextTick(() => {
          this.onTableBtnClick(this.curTableIndex)
        })
      }
    }
  },
  created() {
    this.searchFormNormalHeight = "auto";

    if (this.tempRoute.params?.id !== undefined) {
      this.agentId = parseInt(this.tempRoute.params.id)
      this.searchTime = this.tempRoute.query.searchTime?.split(',') || defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.agentId}`])
    }
    this.$router.replace({ 'query': null })
    this.tempRoute.query = null
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.onTableBtnClick(this.curTableIndex)
      this.firstCreate = false
      this.resizeHandler();
    })
  },
  methods: {
    remarkExpand() {
      this.$nextTick(() => {
        this.agentInfo.open = !this.agentInfo.open;
        this.agentInfo = JSON.parse(JSON.stringify(this.agentInfo))
      })
    },
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.agent}` })
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
      this.setDataLoading(true)
      agentWinLossReportBetMemberCount(data).then((res) => {
        this.agentInfo.betMemberCount = res.count
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onDateBtnClick(dateType) {
      switch (dateType) {
        case (this.dateEnum.yesterday):
        {
          this.searchTime = getYesterdayDateTime();
          break;
        }
        case (this.dateEnum.today):
        {
          this.searchTime = getTodayDateTime();
          break;
        }
        case (this.dateEnum.lastWeek):
        {
          this.searchTime = getLastWeekDateTime();
          break;
        }
        case (this.dateEnum.thisWeek):
        {
          this.searchTime = getThisWeekDateTime();
          break;
        }
        case (this.dateEnum.lastMonth):
        {
          this.searchTime = getLastMonthDateTime();
          break;
        }
        case (this.dateEnum.thisMonth):
        {
          this.searchTime = getThisMonthDateTime();
          break;
        }
      }
    },
    onExportBtnClick() {
      const data = this.getData()
      this.setDataLoading(true)
      agentWinLossReportExport(data).then((res) => {
        this.onDataOut(res)
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
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
      this.agentInfo.index = 0
      this.agentInfo.betAmount = numberFormat(this.agentInfo.betAmount)
      this.agentInfo.myProfitLabel = numberFormat(this.agentInfo.myProfit)
      this.agentInfo.winLossLabel = numberFormat(this.agentInfo.winLoss)
      this.agentInfo.validBetAmount = numberFormat(this.agentInfo.validBetAmount)
      this.agentInfo.rollingCommission = numberFormat(this.agentInfo.rollingCommission)
      this.agentInfo.netPLLabel = numberFormat(this.agentInfo.netPL)
      this.agentInfo.toSuperiorLabel = numberFormat(this.agentInfo.toSuperior)
      this.agentInfo.commitSuperiorsValidBetAmount = numberFormat(this.agentInfo.commitSuperiorsValidBetAmount)
      this.setTagsViewTitle()
      this.setDataLoading(false)
    },
    handleMemberRespone() {
      this.setDataLoading(false)
    },
    onTableBtnClick(tableEnum) {
      this.curTableIndex = tableEnum
      this.setDataLoading(true)
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          // this.$refs.agent.onSearch(this.agentId)
          break
        }
        case this.tableEnum.member: {
          this.$refs.agent.onSearch(this.agentId)
          this.$refs.member.onSearch(this.agentId)
          break
        }
      }
    },
    setDataLoading(dataLoading) {
      this.dataLoading = dataLoading
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.day-range {
  width: 100%;
  padding: 0.41667rem 1.25rem;
  .date-time-picker-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .picker {
      width: 23.33333rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .el-date-editor {
      height: 2.66667rem;
      width: 100%;
      input {
        font-size: 1rem;
        height: 100%;
        width: 100%;
        padding: 0 !important;
      }
      .el-range-separator {
        height: auto !important;
        line-height: 1 !important;
        width: 2.08333rem;
      }
    }
    .search-range {
      margin-left: 0.5rem !important;
    }
  }
  .day-range-options {
    width: 100%;
    padding: 0.83333rem 0rem 0.41667rem 0rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    .el-button:first-child {
      margin-left: 0 !important;
    }
  }
}

.profit-report {
  .superior-summary {
    background-color: #fff;
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
            }
            .name {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              word-break: break-all;
              margin-bottom: 0.83333rem;
              .icon {
                color: #ce9600;
              }
            }
          }
          .icon {
            margin-right: 0.41667rem;
          }
        }
      }
    }
  }
}
</style>
