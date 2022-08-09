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
                      <span class="text-link">{{ agentInfo.agent }}</span>
                      <span>
                        {{ `[${$t('__level')}:` }}
                        <span class="text-link">{{ `${$t('__agent')}]` }}</span>
                      </span>
                    </span>
                  </div>
                  <div class="halls">
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
                            <span>{{ agentInfo.betAmount }}</span>
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
                            <span>{{ agentInfo.validBetAmount }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="halls-row d-flex">
                      <div class="halls-col">
                        <div class="halls-label">
                          <div class="d-flex align-items-center justify-content-end" />
                        </div>
                        <div class="halls-value">
                          <div class="d-flex align-items-center justify-content-end">
                            <span style="word-break: keep-all; white-space: nowrap;">
                              <span
                                :class="{
                                  'text-red': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) > 0) || agentInfo.netPL > 0),
                                  'text-blue': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) < 0) || agentInfo.netPL < 0)}"
                              >
                                {{ agentInfo.winLossRateLabel }}
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
                            <span :class="{'text-red': agentInfo.winLoss > 0, 'text-blue': agentInfo.winLoss < 0}">{{ agentInfo.winLossLabel }}</span>
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
                              <span>{{ agentInfo.rollingCommissionLabel }}</span>
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
                            <span :class="{'text-red': Number(agentInfo.rollingCommission) > 0, 'text-blue': Number(agentInfo.rollingCommission) < 0}">{{ agentInfo.rollingCommissionLabel }}</span>
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
                              <span>{{ agentInfo.commissionRate }}</span>
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
                            <span :class="{'text-red': Number(agentInfo.netPL) > 0, 'text-blue': Number(agentInfo.netPL) < 0}">{{ agentInfo.netPLLabel }}</span>
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
                              <span>{{ agentInfo.commitSuperiorsValidBetAmount }}</span>
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
                            <span :class="{'text-red': Number(agentInfo.toSuperior) > 0, 'text-blue': Number(agentInfo.toSuperior) < 0}">{{ agentInfo.toSuperiorLabel }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom-line" />
                  <div class="list-sub-item d-flex align-items-center">
                    <div class="list-item text-right">
                      <span class="label">{{ $t('__validBetAmount') }}</span>
                      <span class="value">
                        <span>{{ agentInfo.validBetAmount }}</span>
                      </span>
                    </div>
                    <div class="list-item text-right">
                      <div class="to-superiors">
                        <span class="label">{{ $t('__result') }}</span>
                        <span class="value" style="position: relative;">
                          <span :class="{'text-red': agentInfo.winLoss > 0, 'text-blue': agentInfo.winLoss < 0}">{{ agentInfo.winLossLabel }}</span>
                          <span class="w-rate">
                            <span
                              :class="{
                                'text-red': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) > 0) || agentInfo.netPL > 0),
                                'text-blue': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) < 0) || agentInfo.netPL < 0)}"
                            >
                              {{ agentInfo.winLossRateLabel }}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div class="ctrl" @click.stop="remarkExpand">
                      <div class="item-inner">
                        <div :class="{'d-none': agentInfo.open}">
                          <svg-icon class="fas text-gray" icon-class="more" />
                        </div>
                        <div :class="{'d-none': !agentInfo.open}">
                          <svg-icon class="fas text-gray" icon-class="up" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="list-sub-item d-flex align-items-center">
                    <div class="list-item text-right">
                      <span class="label">{{ $t('__rollingCommission') }}</span>
                      <span class="value">
                        <span :class="{'text-red': Number(agentInfo.rollingCommission) > 0, 'text-blue': Number(agentInfo.rollingCommission) < 0}">{{ agentInfo.rollingCommissionLabel }}</span>
                      </span>
                    </div>
                    <div class="list-item text-right">
                      <div class="to-superiors">
                        <span class="label">{{ $t('__totalAmount') }}</span>
                        <span class="value">
                          <span :class="{'text-red': Number(agentInfo.netPL) > 0, 'text-blue': Number(agentInfo.netPL) < 0}">{{ agentInfo.netPLLabel }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="list-sub-item d-flex align-items-center">
                    <div class="list-item text-right">
                      <div class="win-loss">
                        <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                        <span class="value">
                          <span>{{ agentInfo.commitSuperiorsValidBetAmount }}</span>
                        </span>
                      </div>
                    </div>
                    <div class="list-item text-right">
                      <div class="to-superiors">
                        <span class="label">{{ $t('__toSuperior') }}</span>
                        <span class="value">
                          <span :class="{'text-red': Number(agentInfo.toSuperior) > 0, 'text-blue': Number(agentInfo.toSuperior) < 0}">{{ agentInfo.toSuperiorLabel }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        <span>{{ agentInfo.validBetAmount }}</span>
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
                        <span :class="{'text-red': agentInfo.winLoss > 0, 'text-blue': agentInfo.winLoss < 0}">{{ agentInfo.winLossLabel }}</span>
                        <span class="w-rate">
                          <span
                            :class="{
                              'text-red': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) > 0) || agentInfo.netPL > 0),
                              'text-blue': (((agentInfo.netPL === 0 || agentInfo.netPL === '-') && Number(agentInfo.winLossRate) < 0) || agentInfo.netPL < 0)}"
                          >
                            {{ agentInfo.winLossRateLabel }}
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
                        <span :class="{'text-red': Number(agentInfo.rollingCommission) > 0, 'text-blue': Number(agentInfo.rollingCommission) < 0}">{{ agentInfo.rollingCommissionLabel }}</span>
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
                        <span :class="{'text-red': Number(agentInfo.netPL) > 0, 'text-blue': Number(agentInfo.netPL) < 0}">{{ agentInfo.netPLLabel }}</span>
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
                        <span>{{ agentInfo.commitSuperiorsValidBetAmount }}</span>
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
                        <span :class="{'text-red': Number(agentInfo.toSuperior) > 0, 'text-blue': Number(agentInfo.toSuperior) < 0}">{{ agentInfo.toSuperiorLabel }}</span>
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
                      <el-button class="bg-yellow betnum ml-auto mr-0 mb-0 mt-0" @click="onBetMemberCount()">
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
                      </el-button>
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
import { agentWinLossReportExport, agentWinLossReportBetMemberCount } from '@/api/winLossReport/agent'
import viewCommon from '@/mixin/viewCommon';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
// import Agent from './agent/index'
// import Member from './member/index'
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'WinLossReport',
  // components: { Agent, Member },
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
      this.agentInfo.winLossRateLabel = `${numberFormat(this.agentInfo.winLossRate)}%`
      this.agentInfo.validBetAmount = numberFormat(this.agentInfo.validBetAmount)
      this.agentInfo.rollingCommissionLabel = numberFormat(this.agentInfo.rollingCommission)
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
    .line-yellow.active {
      background: #f9c901 !important;
      color: #000 !important;
    }
  }
}

.profit-report {
  .superior-summary {
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
                span.label {
                  width: 100%;
                  padding-bottom: 0.5rem;
                  display: block;
                }
              }
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
          .text-link {
            cursor: pointer;
            color: #ce9600;
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
              .svg-icon {
                height: 2.16667rem;
                width: 2.16667rem;
                overflow: hidden;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .total {
        padding-bottom: 0.41667rem;
        position: relative;
      }
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
            }
          }
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
  }
}
</style>
