<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            -
          </div>
          <div class="view-container-seachForm-operate">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__export") }}</el-button>
            </p>
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__export") }}</el-button>
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
              <div class="left" @click="remarkExpand(item)">
                <div class="item">
                  <span class="header">{{ $t('__agent') }}</span>
                  <span class="content">{{ item.agent }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__subordinateAgentsBalance') }}</span>
                  <span class="content">{{ item.subordinateAgentsBalance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__subordinateMembersBalance') }}</span>
                  <span>{{ item.subordinateMembersBalance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__unassignedBalance') }}</span>
                  <span class="content">{{ item.balance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalBalance') }}</span>
                  <span :class="{'front' : item.income > 0}">{{ item.totalBalance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalPlayerCount') }}</span>
                  <span :class="{'back' : item.payout < 0}">{{ item.memberCount }}</span>
                </div>
                <div class="expand" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" icon-class="up" />
                  <svg-icon v-else icon-class="more" />
                </div>
              </div>
              <div class="right" @click="remarkExpand(item)">
                -
              </div>
              <div class="reportType">
                <el-button class="agentInfoFormBtn" :class="{'focus': curTableIndex === tableEnum.agent}" @click="onTableBtnClick(tableEnum.agent)">{{ $t("__agent") }}</el-button>
                <el-button class="agentInfoFormBtn" :class="{'focus': curTableIndex === tableEnum.member}" @click="onTableBtnClick(tableEnum.member)">{{ $t("__member") }}</el-button>
              </div>
              <div v-if="item.open" class="mobileExpand" @click="remarkExpand(item)">
                -
              </div>
            </template>
            <template v-else>
              -
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
        @current-change="handleCurrentChange"
      />
    </div>

    <agent
      v-show="curTableIndex === tableEnum.agent"
      ref="agent"
      :view-height="viewHeight"
      @handleRespone="handleAgentRespone"
      @setDataLoading="setDataLoading"
    />
    <member
      v-show="curTableIndex === tableEnum.member"
      ref="member"
      :view-height="viewHeight"
      @handleRespone="handleMemberRespone"
      @setDataLoading="setDataLoading"
    />

  </div>
</template>

<script>
import { agentBalanceReportExport } from '@/api/agentBalanceReport/agent'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { getFullDateString } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'AgentBalanceReport',
  components: { },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      tableEnum: Object.freeze({
        'agent': 0,
        'member': 1
      }),
      agentInfo: {},
      curTableIndex: 0,
      dataLoading: false,
      agentId: null,
      tempRoute: {}
    }
  },
  computed: {
  },
  created() {
    this.formClassName = ['agentInfoFormData', 'agentInfoForm']
    this.otherHeight = 50
    this.tempRoute = Object.assign({}, this.$route)
    if (this.tempRoute.params?.id !== undefined) {
      this.agentId = parseInt(this.tempRoute.params.id)
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.agentId}`])
    }
    this.$nextTick(() => {
      this.onTableBtnClick(this.tableEnum.agent)
    })
  },
  methods: {
    numberFormatStr(number) {
      return numberFormat(number)
    },
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.agent}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    onExportBtnClick() {
      this.dataLoading = true
      agentBalanceReportExport({ agentId: this.agentId }).then((res) => {
        this.onDataOut(res)
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
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
      multipleSheetExport(excelDatas, 'AgentBalanceReport_' + getFullDateString(new Date()), true, 'xlsx')
    },
    handleAgentRespone(agentInfo) {
      this.agentInfo = agentInfo
      this.setTagsViewTitle()
      this.dataLoading = false
    },
    handleMemberRespone() {
      this.dataLoading = false
    },
    onTableBtnClick(tableEnum) {
      this.curTableIndex = tableEnum
      this.dataLoading = true
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
    setDataLoading(dataLoading) {
      this.dataLoading = dataLoading
    }
  }
}
</script>

<style>
</style>
