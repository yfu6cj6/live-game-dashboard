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
              <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="red-tick checkbox" :label="$t('__fuzzyMatching')" />
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
              <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="red-tick checkbox" :label="$t('__fuzzyMatching')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agents" multiple filterable :collapse-tags="agentsCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
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
              <div class="base">
                <div class="left" @click="remarkExpand(item)">
                  <div class="item">
                    <span class="header">{{ $t('__transactionNumber') }}</span>
                    <span class="content">{{ item.order_number }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__operationTime') }}</span>
                    <span class="content">{{ item.operationTime }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__counterparty') }}</span>
                    <span>{{ item.counterparty }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__agent') }}</span>
                    <span class="content">{{ item.agent }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__income') }}</span>
                    <span :class="{'front' : item.income > 0}">{{ item.incomeLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__payout') }}</span>
                    <span :class="{'back' : item.payout < 0}">{{ item.payoutLabel }}</span>
                  </div>
                  <div class="expand" @click.stop="remarkExpand(item)">
                    <svg-icon v-if="item.open" icon-class="up" />
                    <svg-icon v-else icon-class="more" />
                  </div>
                </div>
                <div class="right" @click="remarkExpand(item)">
                  <div class="item">
                    <span class="header">{{ $t('__operator') }}</span>
                    <span>{{ item.operator }}</span>
                  </div>
                  <div class="item">
                    <span class="header">IP</span>
                    <span class="content">{{ item.ip }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__recordType') }}</span>
                    <span class="content">{{ item.type }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__superiorAgent') }}</span>
                    <span class="content">{{ item.superiorAgent }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__preTradeBalance') }}</span>
                    <span class="content">{{ item.pre_trade_balance }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__balanceAfterTrade') }}</span>
                    <span class="content">{{ item.balance_after_trade }}</span>
                  </div>
                </div>
              </div>
              <div v-if="item.open" class="mobileExpand" @click="remarkExpand(item)">
                <div class="item displayItem">
                  <span class="header">{{ $t('__operator') }}</span>
                  <span>{{ item.operator }}</span>
                </div>
                <div class="item displayItem">
                  <span class="header">IP</span>
                  <span class="content">{{ item.ip }}</span>
                </div>
                <div class="item displayItem">
                  <span class="header">{{ $t('__recordType') }}</span>
                  <span class="content">{{ item.type }}</span>
                </div>
                <div class="item displayItem">
                  <span class="header">{{ $t('__superiorAgent') }}</span>
                  <span class="content">{{ item.superiorAgent }}</span>
                </div>
                <div class="item displayItem">
                  <span class="header">{{ $t('__preTradeBalance') }}</span>
                  <span class="content">{{ item.pre_trade_balance }}</span>
                </div>
                <div class="item displayItem">
                  <span class="header">{{ $t('__balanceAfterTrade') }}</span>
                  <span class="content">{{ item.balance_after_trade }}</span>
                </div>
                <div class="item col">
                  <span class="header">{{ $t('__operationMessage') }}</span>
                  <span class="content">{{ item.message }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="grid">
                <div class="item remark c0">
                  <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                  <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                </div>
                <div class="item c1">
                  <span class="header">{{ $t('__transactionNumber') }}</span>
                  <span class="content">{{ item.order_number }}</span>
                </div>
                <div class="item c2">
                  <span class="header">{{ $t('__operationTime') }}</span>
                  <span class="content">{{ item.operationTime }}</span>
                </div>
                <div class="item c3">
                  <span class="header">{{ $t('__agent') }}</span>
                  <span class="content">{{ item.agent }}</span>
                </div>
                <div class="item c4">
                  <span class="header">{{ $t('__recordType') }}</span>
                  <span class="content">{{ item.type }}</span>
                </div>
                <div class="item c5">
                  <span class="header">IP</span>
                  <span class="content">{{ item.ip }}</span>
                </div>
              </div>
              <template v-if="item.open">
                <div class="grid">
                  <div class="item c1">
                    <span class="header">{{ $t('__counterparty') }}</span>
                    <span class="content">{{ item.counterparty }}</span>
                  </div>
                  <div class="item c2">
                    <span class="header">{{ $t('__superiorAgent') }}</span>
                    <span class="content">{{ item.superiorAgent }}</span>
                  </div>
                  <div class="item c3">
                    <span class="header">{{ $t('__operator') }}</span>
                    <span class="content">{{ item.operator }}</span>
                  </div>
                </div>
                <div class="grid">
                  <div class="item c1">
                    <span class="header">{{ $t('__preTradeBalance') }}</span>
                    <span class="content">{{ item.pre_trade_balance }}</span>
                  </div>
                  <div class="item c2">
                    <span class="header">{{ $t('__income') }}</span>
                    <span :class="{'front' : item.income > 0}">{{ item.incomeLabel }}</span>
                  </div>
                  <div class="item c3">
                    <span class="header">{{ $t('__payout') }}</span>
                    <span :class="{'back' : item.payout < 0}">{{ item.payoutLabel }}</span>
                  </div>
                  <div class="item c4">
                    <span class="header">{{ $t('__balanceAfterTrade') }}</span>
                    <span class="content">{{ item.balance_after_trade }}</span>
                  </div>
                </div>
                <div class="grid contentWrap">
                  <div class="item c1">
                    <span class="header">{{ $t('__content') }}</span>
                    <span class="content">{{ item.message }}</span>
                  </div>
                </div>
              </template>
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
    &-seachForm{
      &-option{
        .checkbox{
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &-table {
      &-row {
        display: flex;
        flex-direction: column;
        position: relative;
        .left{
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .right {
          width: 0%;
          display: none;
        }
        .item {
          .header {
            width: 100px;
            min-width: 100px;
          }
          &.col {
            flex-direction: column;
          }
          &.displayItem {
            display: flex;
          }
        }
        .expand {
          position: absolute;
          top: 5px;
          right: 5px;
        }
        .mobileExpand{
          display: flex;
          flex-direction: column;
        }
        .front {
          color: blue;
          font-weight: bolder;
        }
        .back {
          color: red;
          font-weight: bolder;
        }
        .base + .mobileExpand {
          margin-top: 5px;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .view {
    &-container {
      &-table {
        &-row {
          .base {
            display: flex;
            flex-direction: row;
            .left,
            .right {
              width: 50%;
              display: flex;
              flex-direction: column;
            }
          }
          .mobileExpand {
            .item {
              &.displayItem {
                display: none;
              }
            }
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
          .grid {
            display: grid;
            grid-template-columns: 50px repeat(5, 1fr);
            grid-template-areas:
            "c0 c1 c2 c3 c4 c5";
            .c0 {
              grid-area: c0;
            }
            .c1 {
              grid-area: c1;
            }
            .c2 {
              grid-area: c2;
            }
            .c3 {
              grid-area: c3;
            }
            .c4 {
              grid-area: c4;
            }
            .c5 {
              grid-area: c5;
            }
            &.contentWrap {
              grid-template-areas:
              ". c1 c1 c1 c1 c1";
            }
          }
        }
      }
    }
  }
}
</style>
