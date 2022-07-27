<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-date-picker
                v-model="searchTime"
                class="date-picker"
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
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
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
        <div class="view-container-table-row">
          <div class="wrap" @click="remarkExpand()">
            <template v-if="device === 'mobile'">
              <div>
                <svg-icon icon-class="user" />
                <span class="agentName">{{ agentInfo.agent }}</span>
              </div>
              <div class="item">
                <span class="header">{{ `${$t('__gameType')}` }}</span>
                <span>{{ agentInfo.gameType }}</span>
              </div>
              <div class="group">
                <div class="item">
                  <span class="header">{{ `${$t('__betAmount')}` }}</span>
                  <span>{{ agentInfo.betAmount }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__validBetAmount')}` }}</span>
                  <span>{{ agentInfo.validBetAmount }}</span>
                </div>
              </div>
              <div class="group">
                <div class="item">
                  <span class="header">{{ `${$t('__winLoss')}` }}</span>
                  <span>{{ agentInfo.winLoss }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__winLossRate')}` }}</span>
                  <span>{{ agentInfo.winLossRate }}</span>
                </div>
              </div>
              <div v-if="agentInfo.open">
                <div class="group">
                  <div class="item">
                    <span class="header">{{ `${$t('__rollingRate')}` }}</span>
                    <span>{{ agentInfo.rollingRate }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__rollingCommission')}` }}</span>
                    <span>{{ agentInfo.rollingCommission }}</span>
                  </div>
                </div>
                <div class="group">
                  <div class="item">
                    <span class="header">{{ `${$t('__totalAmount')}` }}</span>
                    <span>{{ agentInfo.netPL }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__commissionRate')}` }}</span>
                    <span>{{ agentInfo.commissionRate }}</span>
                  </div>
                </div>
                <div class="group">
                  <div class="item">
                    <span class="header">{{ `${$t('__toSuperior')}` }}</span>
                    <span>{{ agentInfo.toSuperior }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__commitSuperiorsValidBetAmount')}` }}</span>
                    <span>{{ agentInfo.commitSuperiorsValidBetAmount }}</span>
                  </div>
                </div>
                <div class="group">
                  <div class="item">
                    <div class="betMemberCount" size="mini" @click.stop="onBetMemberCount()">
                      <span>{{ `${$t('__betMemberCount')} ` }}</span>
                      <span>{{ agentInfo.betMemberCount }}</span>
                    </div>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__myProfit')}` }}</span>
                    <span>{{ agentInfo.myProfit }}</span>
                  </div>
                </div>
              </div>
              <div class="expand">
                <svg-icon v-if="agentInfo.open" icon-class="up" @click.stop="remarkExpand()" />
                <svg-icon v-else icon-class="more" @click.stop="remarkExpand()" />
              </div>
            </template>
          </div>
        </div>
        <div class="btnGroup">
          <div class="btn">
            <el-button
              class="agentBtn"
              :class="{'focus': curTableIndex === tableEnum.agent}"
              @click="onTableBtnClick(tableEnum.agent)"
            >
              {{ $t("__agent") }}
            </el-button>
          </div>
          <div class="btn">
            <el-button
              class="memberBtn"
              :class="{'focus': curTableIndex === tableEnum.member}"
              @click="onTableBtnClick(tableEnum.member)"
            >
              {{ $t("__member") }}
            </el-button>
          </div>
        </div>
        <agent
          v-show="curTableIndex === tableEnum.agent"
          ref="agent"
          :payout-time="searchTime"
          @handleRespone="handleAgentRespone"
          @setDataLoading="setDataLoading"
        />
        <member
          v-show="curTableIndex === tableEnum.member"
          ref="member"
          :payout-time="searchTime"
          @handleRespone="handleMemberRespone"
          @setDataLoading="setDataLoading"
        />
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
      totalData: {
        index: 1,
        totalLabel: '__totalCount'
      },
      firstCreate: true
    }
  },
  computed: {
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
      this.agentInfo.myProfit = numberFormat(this.agentInfo.myProfit)
      this.agentInfo.winLoss = numberFormat(this.agentInfo.winLoss)
      this.agentInfo.validBetAmount = numberFormat(this.agentInfo.validBetAmount)
      this.agentInfo.rollingCommission = numberFormat(this.agentInfo.rollingCommission)
      this.agentInfo.netPL = numberFormat(this.agentInfo.netPL)
      this.agentInfo.toSuperior = numberFormat(this.agentInfo.toSuperior)
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
          this.$refs.agent.onSearch(this.agentId)
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

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          flex-direction: column;
          position: relative;
          .agentName {
            vertical-align: top;
          }
          .group {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}
.betMemberCount {
  font-weight: bold;
  background-color: $yellow;
  padding: 2px 5px;
}
.btnGroup {
  background-color: #000;
  width: 100%;
  display: flex;
  .btn {
    width: 50%;
  }
  .btn + .btn {
    border-left: 1px solid #fff;
  }
  .agentBtn,
  .memberBtn {
    display: inline-block;
    width: 100%;
    border: none;
    background-color: transparent;
    color: #fff;
    font-weight: bold;
    margin-left: 0;
    &:hover,
    &.focus {
      color: $yellow;
    }
  }
}
.expand {
  position: absolute;
  right: 0;
}
</style>
