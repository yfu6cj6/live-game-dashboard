<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-date-picker
                v-model="searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__operationTime')}(${$t('__start')})`"
                :end-placeholder="`${$t('__operationTime')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.type" multiple filterable :collapse-tags="typeCollapse" :placeholder="$t('__recordType')">
                <el-option v-for="item in searchItems.type" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" type="url" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.orderNumber" :placeholder="$t('__transactionNumber')" />
            </p>
            <p class="optionItem">
              <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="red-tick" :label="$t('__fuzzyMatching')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agents" multiple filterable :collapse-tags="agentsCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
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
              <el-button class="bg-parent" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">{{ $t("__moreSearch") }}</el-button>
            </p>
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__operationTime')}(${$t('__start')})`"
                :end-placeholder="`${$t('__operationTime')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.type" multiple filterable :collapse-tags="typeCollapse" :placeholder="$t('__recordType')">
                <el-option v-for="item in searchItems.type" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" type="url" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.orderNumber" :placeholder="$t('__transactionNumber')" />
            </p>
            <p class="optionItem">
              <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="red-tick" :label="$t('__fuzzyMatching')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agents" multiple filterable :collapse-tags="agentsCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-parent" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
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
            <div class="content">
              <template v-if="device === 'mobile'">
                <div class="wrap" @click="remarkExpand(item)">
                  <div class="left">
                    <div class="item">
                      <span class="header">{{ $t('__transactionNumber') }}</span>
                      <span>{{ item.order_number }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__operationTime') }}</span>
                      <span>{{ item.operationTime }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__agent') }}</span>
                      <span>{{ item.agent }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__recordType') }}</span>
                      <span>{{ item.type }}</span>
                    </div>
                    <div class="item">
                      <span class="header">IP</span>
                      <span>{{ item.ip }}</span>
                    </div>
                  </div>
                  <div class="expand" @click.stop="remarkExpand(item)">
                    <svg-icon v-if="item.open" icon-class="up" />
                    <svg-icon v-else icon-class="more" />
                  </div>
                </div>
                <div v-if="item.open" class="wrap mobileExpand" @click="remarkExpand(item)">
                  <div class="item">
                    <span class="header">{{ $t('__counterparty') }}</span>
                    <span>{{ item.counterparty }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__superiorAgent') }}</span>
                    <span>{{ item.superiorAgent }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__preTradeBalance') }}</span>
                    <span>{{ item.pre_trade_balance }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__income') }}</span>
                    <span :class="{'front' : item.income > 0}">{{ item.incomeLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__payout') }}</span>
                    <span :class="{'back' : item.payout < 0}">{{ item.payoutLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__balanceAfterTrade') }}</span>
                    <span>{{ item.balance_after_trade }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__operator') }}</span>
                    <span>{{ item.operator }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__operationMessage') }}</span>
                    <span>{{ item.message }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="wrap">
                  <div class="left">
                    <div class="item remark">
                      <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                      <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__transactionNumber') }}</span>
                      <span>{{ item.order_number }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__operationTime') }}</span>
                      <span>{{ item.operationTime }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__agent') }}</span>
                      <span>{{ item.agent }}</span>
                    </div>
                    <div class="item record">
                      <span class="header">{{ $t('__recordType') }}</span>
                      <span>{{ item.type }}</span>
                    </div>
                    <div class="item ip">
                      <span class="header">IP</span>
                      <span>{{ item.ip }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="item.open">
                  <div class="wrap moveright">
                    <div class="item">
                      <span class="header">{{ $t('__counterparty') }}</span>
                      <span>{{ item.counterparty }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__superiorAgent') }}</span>
                      <span>{{ item.superiorAgent }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__operator') }}</span>
                      <span>{{ item.operator }}</span>
                    </div>
                  </div>
                  <div class="wrap moveright">
                    <div class="item">
                      <span class="header">{{ $t('__preTradeBalance') }}</span>
                      <span>{{ item.pre_trade_balance }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__income') }}</span>
                      <span :class="{'front' : item.income > 0}">{{ item.incomeLabel }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__payout') }}</span>
                      <span :class="{'back' : item.payout < 0}">{{ item.payoutLabel }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__balanceAfterTrade') }}</span>
                      <span>{{ item.balance_after_trade }}</span>
                    </div>
                  </div>
                  <div class="wrap moveright">
                    <div class="item">
                      <span class="header">{{ $t('__content') }}</span>
                      <span>{{ item.message }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
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
  </div>
</template>

<script>
import { agentBalanceRecordSearch, agentBalanceRecordExport } from '@/api/agentBalanceRecord'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'AgentBalanceRecord',
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
      searchTime: defaultSearchTime,
      searchForm: {},
      searchItems: {},
      fuzzyMatchingByOrderNumber: false
    }
  },
  computed: {
    typeCollapse() {
      return this.searchForm.type && this.searchForm.type.length > this.selectCollapseCount
    },
    agentsCollapse() {
      return this.searchForm.agents && this.searchForm.agents.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchTime': function() {
      this.$nextTick(() => {
        this.handleCurrentChange(1)
      })
    }
  },
  created() {
    this.handleCurrentChange(this.currentPage)
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.order_number === row.order_number);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const typeLength = (this.searchForm.type && this.searchForm.type.length);
      const typeHeight = this.typeCollapse ? 64 : (typeLength > 1 ? ((typeLength - 1) * 34) : 0);
      const isMarqueeLength = (this.searchForm.is_marquee && this.searchForm.is_marquee.length);
      const isMarqueeHeight = this.isMarqueeCollapse ? 64 : (isMarqueeLength > 1 ? ((isMarqueeLength - 1) * 34) : 0);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(204 + typeHeight + isMarqueeHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `${(102 + ((typeHeight > isMarqueeHeight) ? typeHeight : isMarqueeHeight))}px` : formHeight;
        this.paginationPagerCount = 7;
      } else {
        formHeight = "auto";
        this.paginationPagerCount = 7;
      }
      this.$nextTick(() => {
        this.$refs.seachFormExpand.style.height = `${formHeight}`;
        this.setHeight();
      });
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      agentBalanceRecordExport(data).then((res) => {
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
        export_json_to_excel({ header: tHeader, data: data, filename: 'AgentBalanceRecord_' + getFullDateString(new Date()) })
      })
    },
    onReset() {
      this.searchForm = {}
      this.fuzzyMatchingByOrderNumber = false
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
      data.operationTime = searchTime
      data.fuzzyMatchingByOrderNumber = this.fuzzyMatchingByOrderNumber ? '1' : '0'
    },
    handleRespone(res) {
      this.searchItems = res.searchItems
      this.tableData = res.rows
      this.tableData.forEach(element => {
        element.pre_trade_balance = numberFormat(element.pre_trade_balance)
        element.incomeLabel = numberFormat(element.income)
        element.payoutLabel = numberFormat(element.payout)
      });
      this.totalCount = res.totalCount
      this.dataLoading = false
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize
      this.handleRequest(data)
      agentBalanceRecordSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        position: relative;
        .content {
          display: flex;
          flex-direction: column;
          .wrap {
            .left {
              width: 100%;
              display: flex;
              flex-direction: column;
            }
            .expand {
              position: absolute;
              top: 5px;
              right: 5px;
            }
          }
          .item{
            word-break: break-all;
            &.record {
              min-width: 100px;
              width: 100px;
            }
            &.ip {
              min-width: 130px;
              width: 130px;
            }
          }
          .wrap + .wrap {
            margin-top: 0px;
          }
          .mobileExpand{
            display: flex;
            flex-direction: column;
          }
          .moveright {
            margin-left: 43px;
          }
          .front {
            color: blue;
            font-weight: bolder;
          }
          .back {
            color: red;
            font-weight: bolder;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          .content {
            display: flex;
            flex-direction: column;
            .wrap {
              .left {
                width: 100%;
                flex-direction: row;
                .remark {
                  width: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
