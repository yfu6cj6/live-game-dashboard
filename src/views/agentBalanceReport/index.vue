<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="scroll-wrap flex-column flex-fill">
        <div class="scroll-inner flex-column flex-fill off agentBalanceReport">
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
                                        {{ agentInfo.subordinateAgentsBalanceLabel }}
                                      </span>
                                    </div>
                                    <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                      <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__subordinateMembersBalance") }}</span>
                                      <span class="value">
                                        {{ agentInfo.subordinateMembersBalanceLabel }}
                                      </span>
                                    </div>
                                    <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                      <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__unassignedBalance") }}</span>
                                      <span class="value">
                                        {{ agentInfo.balanceLabel }}
                                      </span>
                                    </div>
                                    <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                                      <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__totalBalance") }}</span>
                                      <span class="value">
                                        {{ agentInfo.totalBalanceLabel }}
                                      </span>
                                    </div>
                                  </div>
                                  <div v-if="agentInfo.open" class="agent-list-detail list-row">
                                    <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                                      <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__directlyMember") }}</span>
                                      <span class="value">
                                        {{ agentInfo.memberCountLabel }}
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
    <template v-else>
      <div class="credit-report bg-new-dark-white">
        <div class="w-100">
          <div class="credit-report-list flex-fill flex-nowrap bg-new-dark-white">
            <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
              <backTop ref="backTop" />
              <div id="scroll-inner" class="scroll-inner on native">
                <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
                  <div class="flex-nowrap">
                    <div class="bg-black">
                      <div class="pt-4 w-100" />
                      <div class="sort">
                        <button type="button" class="el-button bg-yellow mr-0 filter-search w-auto el-button--default">
                          <span>{{ $t('__searchAndExport') }}</span>
                        </button>
                      </div>
                    </div>
                    <div id="report-list" class="common-list summary flex-nowrap report-list flex-fill bg-new-dark-white">
                      <div class="w-100">
                        <div class="agent-group">
                          <div class="w-100 items report-list-item-row" :class="{'high-light': agentTap === true}" @click.stop="tapAgent()">
                            <div class="agent-list-basic list-row align-items-center">
                              <div class="list-item d-flex align-items-center" style="width: 140px; margin-left: 35px;">
                                <span class="icon user">
                                  <div class="fas gold">
                                    <svg-icon class="fas gold" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                                  </div>
                                </span>
                                <span class="value text-golden">{{ agentInfo.agent }}</span>
                              </div>
                              <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__subordinateAgentsBalance") }}</span>
                                <span class="value">
                                  <span>{{ agentInfo.subordinateAgentsBalanceLabel }}</span>
                                </span>
                              </div>
                              <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__subordinateMembersBalance") }}</span>
                                <span class="value">
                                  <span>{{ agentInfo.subordinateMembersBalanceLabel }}</span>
                                </span>
                              </div>
                              <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__unassignedBalance") }}</span>
                                <span class="value">
                                  <span>{{ agentInfo.balanceLabel }}</span>
                                </span>
                              </div>
                              <div class="list-item d-flex align-items-start is-amount" style="width: 160px; flex-wrap: wrap;">
                                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__totalBalance") }}</span>
                                <span class="value">
                                  <span>{{ agentInfo.totalBalanceLabel }}</span>
                                </span>
                              </div>
                              <div class="list-item d-flex align-items-start" style="margin-left: 10px; width: 150px; flex-wrap: wrap;">
                                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t("__directlyMember") }}</span>
                                <span class="value">
                                  <span>{{ agentInfo.memberCountLabel }}</span>
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
                              </div>
                              {{ $t("__agent") }}
                            </div>
                          </div>
                          <div class="el-tabs__item" :class="{'is-active':curTableIndex === 1}" @click.stop="onTableBtnClick(tableEnum.member)">
                            <div class="tab-item">
                              <div class="fas black" :class="{'yellow':curTableIndex === 1}">
                                <svg-icon icon-class="member" style="height: 1.33333rem; width: 1.33333rem;" />
                              </div>
                              {{ $t("__member") }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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
import BackTop from '@/components/BackTop'

export default {
  name: 'AgentBalanceReport',
  components: { Agent, Member, BackTop },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      tableEnum: Object.freeze({
        'agent': 0,
        'member': 1
      }),
      agentInfo: {},
      curTableIndex: 0,
      agentId: null,
      agentTap: false
    }
  },
  computed: {
  },
  watch: {
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.$nextTick(() => {
          this.onTableBtnClick(this.curTableIndex)
        })
      }
    }
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
    this.setHeaderStyle()
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      if (this.agentId || this.agentId === 0) {
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentBalanceReport'), true, () => {
          this.$router.go(-1)
        }])
      } else {
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentBalanceReport'), false, () => { }])
      }
    },
    tapAgent() {
      this.agentTap = !this.agentTap
    },
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
    onExportBtnClick() {
      this.setDataLoading(true)
      agentBalanceReportExport({ agentId: this.agentId }).then((res) => {
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
      multipleSheetExport(excelDatas, 'AgentBalanceReport_' + getFullDateString(new Date()), true, 'xlsx')
    },
    handleAgentRespone(agentInfo) {
      this.agentTap = false
      const open = this.agentInfo.open;
      this.agentInfo = agentInfo

      this.agentInfo.balanceLabel = this.agentInfo.balance === '-' ? this.agentInfo.balance : numberFormat(this.agentInfo.balance)
      this.agentInfo.memberCountLabel = numberFormat(this.agentInfo.memberCount, 0)
      this.agentInfo.subordinateAgentsBalanceLabel = numberFormat(this.agentInfo.subordinateAgentsBalance)
      this.agentInfo.subordinateMembersBalanceLabel = numberFormat(this.agentInfo.subordinateMembersBalance)
      this.agentInfo.totalBalanceLabel = numberFormat(this.agentInfo.totalBalance)
      this.agentInfo.open = open;
      this.setTagsViewTitle()
      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }
      this.setDataLoading(false)
    },
    handleMemberRespone() {
      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }
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
          this.$refs.member.onSearch(this.agentId)
          break
        }
      }
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss">
#app.mobile .agentBalanceReport {
  .credit-report {
    .el-tabs {
      border-top: 0;
      .el-tabs__header {
        padding-top: 0;
      }
      .el-tabs__item {
        width: 50%;
        text-align: center;
        padding: 0;
        .tab-item {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          .fas {
            margin-bottom: 0.25rem;
            margin-right: 0.41667rem;
          }
        }
      }
      .el-tabs__nav {
        max-width: 100%;
        width: 100%;
      }
    }
    .summary {
      border-bottom: 0.16667rem solid #000;
    }
    .profit-tabs {
      &.el-tabs {
        &.light {
          .el-tabs__nav {
            .el-tabs__item {
              border-bottom: 0.2rem solid #a3a3a3;
              background-color: #000;
              &.is-active {
                .tab-item {
                  color: #000 !important;
                }
              }
              .tab-item {
                color: #f9c901 !important;
              }
            }
          }
        }
      }
      &.el-tabs.light {
        .el-tabs__nav {
          .el-tabs__item {
            &.is-active {
              background-color: #f9c901;
              border-bottom: 0.16667rem solid #f9c901;
            }
          }
        }
      }
    }
  }

  .report-list {
    background: #d6d6d6;
    .items {
      .ctrl {
        position: absolute;
        right: 0;
        top: 0.83333rem;
        text-align: center;
        -webkit-box-flex: initial;
        -ms-flex: initial;
        flex: initial;
        width: 5rem;
        z-index: 1;
        &.exp {
          top: auto;
          bottom: 0.83333rem;
        }
      }
    }
  }
}
</style>
