<template>
  <div v-loading="dataLoading" class="scroll-wrap flex-column flex-fill">
    <div class="scroll-inner flex-column flex-fill off">
      <div class="scroll-view flex-column flex-fill">
        <div class="credit-report flex-column flex-fill">
          <div class="flex-column flex-fill">
            <div class="credit-report-list flex-column flex-fill bg-new-dark-white">
              <div class="scroll-wrap flex-column flex-fill">
                <div class="scroll-inner flex-column flex-fill off">
                  <div class="scroll-view flex-column flex-fill">
                    <div class="flex-column flex-fill">
                      <div class="bg-black">
                        <div class="mt-4 w-100" />
                      </div>
                      <div class="report-list common-list summary">
                        <div>
                          <div class="agent-group">
                            <div class="w-100 items">
                              <div class="ctrl" :class="{'exp': agentInfo.open}" @click.stop="remarkExpand">
                                <div class="item-inner">
                                  <div class="fas text-gray">
                                    <div :class="{'d-none': agentInfo.open}">
                                      <svg-icon class="fas text-gray" icon-class="more" style="height: 2.5rem; width: 2.5rem;" />
                                    </div>
                                    <div :class="{'d-none': !agentInfo.open}">
                                      <svg-icon class="fas text-gray" icon-class="up" style="height: 2.33333rem; width: 2.33333rem;" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="agent-list-basic list-row">
                                <div class="list-item d-flex align-items-center" style="width: 100%;">
                                  <span class="icon user">
                                    <div class="fas gold">
                                      <svg-icon class="fas gold" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                                    </div>
                                  </span>
                                  <span class="value text-golden">{{ agentInfo.agent }}</span>
                                </div>
                                <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                  <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__subordinateAgentsBalance") }}</span>
                                  <span class="value">
                                    {{ agentInfo.subordinateAgentsBalance }}
                                  </span>
                                </div>
                                <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                  <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__subordinateMembersBalance") }}</span>
                                  <span class="value">
                                    {{ agentInfo.subordinateMembersBalance }}
                                  </span>
                                </div>
                                <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                  <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__unassignedBalance") }}</span>
                                  <span class="value">
                                    {{ agentInfo.balance }}
                                  </span>
                                </div>
                                <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                  <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__totalBalance") }}</span>
                                  <span class="value">
                                    {{ agentInfo.totalBalance }}
                                  </span>
                                </div>
                              </div>
                              <div v-if="agentInfo.open" class="agent-list-detail list-row">
                                <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                                  <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__directlyMember") }}</span>
                                  <span class="value">
                                    {{ agentInfo.memberCount }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="profit-tabs light el-tabs">
                        <div class="el-tabs__header">
                          <div class="el-tabs__nav">
                            <div class="el-tabs__item" :class="{'is-active':curTableIndex === 0}" @click.stop="onTableBtnClick(tableEnum.agent)">
                              <div class="tab-item">
                                <div class="fas black" :class="{'yellow':curTableIndex === 0}">
                                  <svg-icon icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                                  <span> {{ $t("__agent") }} </span>
                                </div>
                              </div>
                            </div>
                            <div class="el-tabs__item" :class="{'is-active':curTableIndex === 1}" @click.stop="onTableBtnClick(tableEnum.member)">
                              <div class="tab-item">
                                <div class="fas black" :class="{'yellow':curTableIndex === 1}">
                                  <svg-icon icon-class="member" style="height: 1.33333rem; width: 1.33333rem;" />
                                  <span> {{ $t("__member") }} </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="common-list report-list flex-column flex-fill bg-new-dark-white">
                        <agent
                          v-show="curTableIndex === tableEnum.agent"
                          ref="agent"
                          @handleRespone="handleAgentRespone"
                          @setDataLoading="setDataLoading"
                        />
                        <member
                          v-show="curTableIndex === tableEnum.member"
                          ref="member"
                          @handleRespone="handleMemberRespone"
                          @setDataLoading="setDataLoading"
                        />
                      </div>

                      <div class="page-total">
                        -
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
// import { agentBalanceReportExport, agentBalanceReportSearch } from '@/api/agentBalanceReport/agent'
import { agentBalanceReportExport } from '@/api/agentBalanceReport/agent'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import Agent from './agent/index';
import Member from './member/index';
import { getFullDateString } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'AgentBalanceReport',
  components: { Agent, Member },
  mixins: [common, viewCommon, handlePageChange],
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
    remarkExpand() {
      this.$nextTick(() => {
        this.agentInfo.open = !this.agentInfo.open;
        this.agentInfo = JSON.parse(JSON.stringify(this.agentInfo))
      })
    },
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
      const open = this.agentInfo.open;
      this.agentInfo = agentInfo
      this.agentInfo.open = open;
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
