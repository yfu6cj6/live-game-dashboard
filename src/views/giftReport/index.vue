<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
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
              :default-time="['00:00:00', '23:59:59']"
            />
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onTableBtnClick(curTableIndex)">{{ $t("__search") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.yesterday)">{{ $t("__yesterday") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.today)">{{ $t("__today") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.lastWeek)">{{ $t("__lastWeek") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.thisWeek)">{{ $t("__thisWeek") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.lastMonth)">{{ $t("__lastMonth") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.thisMonth)">{{ $t("__thisMonth") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            -
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
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
              :default-time="['00:00:00', '23:59:59']"
            />
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onTableBtnClick(curTableIndex)">{{ $t("__search") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.yesterday)">{{ $t("__yesterday") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.today)">{{ $t("__today") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.lastWeek)">{{ $t("__lastWeek") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.thisWeek)">{{ $t("__thisWeek") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.lastMonth)">{{ $t("__lastMonth") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-black" size="mini" @click="onDateBtnClick(dateEnum.thisMonth)">{{ $t("__thisMonth") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
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
              <div class="baseTable">
                <div class="item">
                  <span class="header">{{ $t('__agent') }}</span>
                  <template slot-scope="scope">
                    <p v-if="scope.row.index===0">{{ scope.row.agent }}</p>
                    <p v-else>{{ $t(scope.row.totalLabel) }}</p>
                  </template>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__gameType') }}</span>
                  <template slot-scope="scope">
                    <p v-if="scope.row.index===0">{{ scope.row.gameType }}</p>
                    <p v-else>
                      <el-button class="labelButton bg-yellow" size="mini" @click="onGiftMemberCount(scope.row)">
                        <p>{{ $t('__giftMemberCount') }}</p>
                        <p>{{ agentInfo.giftMemberCount }}</p>
                      </el-button>
                    </p>
                  </template>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftAmount') }}</span>
                  <template slot-scope="scope">
                    <p v-if="scope.row.index===0">{{ scope.row.amount }}</p>
                    <p v-else>
                      <span>{{ $t('__myProfit') }}</span>
                      <span :class="{positive: agentInfo.myProfit >= 0, negative: agentInfo.myProfit < 0}">{{ agentInfo.myProfitLabel }}</span>
                    </p>
                  </template>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftValue') }}</span>
                  <span class="content">{{ item.value }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftRate') }}</span>
                  <span>{{ item.giftRate }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalAmount') }}</span>
                  <template slot-scope="scope">
                    <p>
                      <span :class="{positive: scope.row.toSuperior >= 0, negative: scope.row.toSuperior < 0}">{{ scope.row.toSuperiorLabel }}</span>
                    </p>
                  </template>
                </div>
              </div>
              <div class="reportType">
                <el-button class="agentInfoFormBtn" :class="{'focus': curTableIndex === tableEnum.agent}" @click="onTableBtnClick(tableEnum.agent)">{{ $t("__agent") }}</el-button>
                <el-button class="agentInfoFormBtn" :class="{'focus': curTableIndex === tableEnum.member}" @click="onTableBtnClick(tableEnum.member)">{{ $t("__member") }}</el-button>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>
        <div v-else class="no-result">{{ $t("__noInformation") }}</div>
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
        @current-change="handleCurrentChange"
      />
    </div>

    <agent
      v-show="curTableIndex === tableEnum.agent"
      ref="agent"
      :view-height="viewHeight"
      :gift-time="searchTime"
      @handleRespone="handleAgentRespone"
      @setDataLoading="setDataLoading"
    />
    <member
      v-show="curTableIndex === tableEnum.member"
      ref="member"
      :view-height="viewHeight"
      :gift-time="searchTime"
      @handleRespone="handleMemberRespone"
      @setDataLoading="setDataLoading"
    />

  </div>
</template>

<script>
import { agentGiftReportExport, agentGiftReportGiftMemberCount } from '@/api/giftReport/agent'
import Agent from './agent/index'
import Member from './member/index'
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'GiftReport',
  components: { Agent, Member },
  mixins: [],
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
      dataLoading: false,
      searchTime: defaultSearchTime,
      agentId: null,
      tempRoute: {},
      totalData: {
        index: 1,
        totalLabel: '__totalCount'
      },
      firstCreate: true
    }
  },
  computed: {
    agentWidth() {
      const titleWidth = this.$t('__agent').length * 20
      const contentWidth = `${this.agentInfo.agent}`.length * 8
      return titleWidth > contentWidth ? `${titleWidth}px` : `${contentWidth}px`
    },
    gameTypeWidth() {
      const titleWidth = this.$t('__gameType').length * 20
      const contentWidth = `${this.agentInfo.gameType}`.length * 10
      return titleWidth > contentWidth ? `${titleWidth}px` : `${contentWidth}px`
    },
    giftAmountWidth() {
      const titleWidth = this.$t('__giftAmount').length * 20
      const contentWidth = `${this.agentInfo.amount}`.length * 8
      return titleWidth > contentWidth ? `${titleWidth}px` : `${contentWidth}px`
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
    this.formClassName = ['agentInfoFormData', 'agentInfoForm']
    this.otherHeight = 60 // 上面的table高度

    this.tempRoute = Object.assign({}, this.$route)
    if (this.tempRoute.params?.id !== undefined) {
      this.agentId = parseInt(this.$route.params.id)
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
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.agent}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    getData() {
      const data = {
        giftTime: [],
        agentId: this.agentId
      }
      if (!this.searchTime) {
        this.searchTime = defaultSearchTime
      }
      this.searchTime.forEach(element => {
        data.giftTime.push(getFullDate(element))
      })
      return data
    },
    onGiftMemberCount() {
      const data = this.getData()
      this.setDataLoading(true)
      agentGiftReportGiftMemberCount(data).then((res) => {
        this.agentInfo.giftMemberCount = res.count
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
      agentGiftReportExport(data).then((res) => {
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
      multipleSheetExport(excelDatas, 'GiftReport_' + getFullDateString(new Date()), true, 'xlsx')
    },
    handleAgentRespone(agentInfo) {
      this.agentInfo = agentInfo
      this.agentInfo.index = 0
      this.agentInfo.myProfitLabel = numberFormat(this.agentInfo.myProfit)
      this.agentInfo.value = numberFormat(this.agentInfo.value)
      this.agentInfo.netPLLabel = numberFormat(this.agentInfo.netPL)
      this.agentInfo.toSuperiorLabel = numberFormat(this.agentInfo.toSuperior)
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

<style>
</style>
