<template>
  <div v-loading="dataLoading" class="scroll-wrap memberBalanceRecord">
    <div class="scroll-inner">
      <div class="scroll-view">
        <template v-if="device === 'mobile'">
          <div class="bg-black">
            <div class="search_frame">
              <div class="d-flex align-items-center day_frame" @click.once="changeInitCalendarPage">
                <el-date-picker
                  v-model="searchTime"
                  type="datetimerange"
                  class="search_frame_size"
                  popper-class="ams-timeslot-popper"
                  align="right"
                  :clearable="false"
                  :editable="false"
                  :range-separator="$t('__to')"
                  :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                  :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                  :default-time="['00:00:00', '23:59:59']"
                  :format="'yyyy-MM-dd HH:mm'"
                />
                <span>
                  <div class="d-flex align-items-center more_option text-yellow" @click.stop="searchFormOpen = !searchFormOpen">
                    <svg-icon v-if="searchFormOpen" class="icon" icon-class="less" />
                    <svg-icon v-else class="icon" icon-class="add" />
                    <span>{{ $t('__options') }}</span>
                  </div>
                </span>
              </div>
              <div class="d-flex search_options">
                <div class="d-flex flex-wrap w-100">
                  <div class="d-flex justify-content-between align-items-center search_option_width">

                    <div class="field options select_options">
                      <div>
                        <div class="option">
                          <span class="prefix-label" />
                          <div class="comp selected-filter custom">
                            <el-select
                              v-model="searchForm.type_id"
                              class="d-flex"
                              multiple
                              :popper-append-to-body="false"
                              :collapse-tags="typeCollapse"
                              :placeholder="$t('__recordType')"
                              :popper-class="'custom-dropdown w-auto'"
                            >
                              <el-option
                                v-for="item in selectOption.type"
                                :key="item.key"
                                :label="item.nickname"
                                :value="item.key"
                              />
                            </el-select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <el-input v-model="searchForm.ip" class="d-flex flex-wrap justify-content-between align-items-center option" placeholder="IP" type="url" />
                    </div>
                  </div>
                  <div v-show="searchFormOpen">
                    <div class="d-flex flex-column justify-content-between align-items-center search_option_width">
                      <div class="d-flex justify-content-between align-items-center search_option_width">
                        <div class="field">
                          <el-input v-model="searchForm.orderNumber" class="option" :placeholder="$t('__transactionNumber')" />
                        </div>
                        <div class="field">
                          <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="checkbox option" :label="$t('__fuzzyMatching')" />
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center search_option_width">
                        <div class="field options member_select_options">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.member_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="membersCollapse"
                                  :placeholder="$t('__member')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.members"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="field">
                          <el-input v-model="searchForm.betOrderNumber" class="option" :placeholder="$t('__orderNumber')" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="search_btn_frame">
                    <el-button class="bg-yellow search_btn" size="mini" @click.stop="search()">{{ $t("__search") }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          -
        </template>
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="data_content w-100">
                <div :class="{'expand_ctrl more_open': !item.open, 'expand_ctrl more_close': item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" class="more_close" icon-class="up" />
                  <svg-icon v-else class="more_open" icon-class="more" />
                </div>
                <div class="d-flex flex-wrap justify-content-between base">
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__transactionNumber') }}</span>
                    <span class="news">{{ item.order_number }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__operationTime') }}</span>
                    <span class="news">{{ item.operationTime }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__member') }}</span>
                    <span class="news">{{ item.member }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__superiorAgent') }}</span>
                    <span class="news text-yellow">{{ item.superiorAgent }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__recordType') }}</span>
                    <span class="news">{{ item.type }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title text_align_right">{{ $t('__beforeTradeBalance') }}</span>
                    <span class="news text_align_right">{{ item.pre_trade_balance }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title text_align_right">{{ $t('__income') }}</span>
                    <span :class="{'text_align_right front' : item.income > 0, 'text_align_right news': item.income <= 0}">{{ item.incomeLabel }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title text_align_right">{{ $t('__payout') }}</span>
                    <span :class="{'back text_align_right' : item.payout < 0, 'news text_align_right': item.payout <= 0}">{{ item.payoutLabel }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title text_align_right">{{ $t('__afterTradeBalance') }}</span>
                    <span class="news text_align_right">{{ item.balance_after_trade }}</span>
                  </div>
                </div>
                <div v-if="item.open" class="d-flex flex-wrap justify-content-between expand">
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__orderNumber') }}</span>
                    <span class="news">{{ item.betOrderNumber }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">IP</span>
                    <span class="news text-yellow">{{ item.ip }}</span>
                  </div>
                  <div class="d-flex flex-colum field">
                    <span class="title">{{ $t('__operator') }}</span>
                    <span class="news">{{ item.operator }}</span>
                  </div>
                  <div class="d-flex flex-colum field col">
                    <span class="title">{{ $t('__operationMessage') }}</span>
                    <span class="news">{{ item.message }}</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div v-if="totalCount > pageSize" class="more_btn_space">
            <div v-if="tableData.length >= totalCount" class="search_more">
              <span>{{ $t("__noMoreInformation") }}</span>
            </div>
            <div v-else class="search_more">
              <span class="search_more_btn" @click.stop="moreInfo()">{{ $t("__searchMoreValue") }}</span>
            </div>
          </div>
          <div v-if="tableData.length > 0" class="page-total">
            <div class="w-100 list-row">
              <div class="list-item">
                <div class="name list-sub-item d-flex align-items-center">
                  <span class="text-link text-golden totalCount">{{ $t('__subtotalCount') }}</span>
                </div>
                <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ $t('__totalIncome') }}</span>
                    <span class="value">
                      <span class="news">{{ subtotalInfo.income }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ $t('__totalExpenditure') }}</span>
                    <span class="value">
                      <span class="news">{{ subtotalInfo.payout }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 mt is-amount">
                    <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                    <span class="value">
                      <span class="news">{{ subtotalInfo.incomeAndPayout }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ `${$stringFormat($t('__totalDataAmount'), [subtotalInfo.totalAmount])}` }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100 list-row">
              <div class="list-item">
                <div class="name list-sub-item d-flex align-items-center">
                  <span class="text-link text-golden totalCount">{{ $t('__totalCount') }}</span>
                </div>
                <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ $t('__totalIncome') }}</span>
                    <span class="value">
                      <span class="news">{{ totalInfo.income }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ $t('__totalExpenditure') }}</span>
                    <span class="value">
                      <span class="news">{{ totalInfo.payout }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 mt is-amount">
                    <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                    <span class="value">
                      <span class="news">{{ totalInfo.incomeAndPayout }}</span>
                    </span>
                  </div>
                  <div class="page-item mb-2 is-amount">
                    <span class="label">{{ `${$stringFormat($t('__totalDataAmount'), [totalCount])}` }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberBalanceRecordSearch, memberBalanceRecordExport } from '@/api/memberBalanceRecord'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getTodayDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'AgentBalanceRecord',
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      searchForm: {},
      searchItems: {},
      fuzzyMatchingByOrderNumber: false,
      searchFormOpen: false,
      subtotalInfo: {},
      totalInfo: {},
      selectOption: {}
    }
  },
  computed: {
    typeCollapse() {
      return this.searchForm.type_id && this.searchForm.type_id.length > this.selectCollapseCount
    },
    membersCollapse() {
      return this.searchForm.member_id && this.searchForm.member_id.length > this.selectCollapseCount
    }
  },
  watch: { },
  created() {
    this.pageSizeCount = 1
    this.searchTime = defaultSearchTime
    this.handleCurrentChange(this.currentPage)
    this.$nextTick(() => {
      this.addSelectFilter()
    })
  },
  methods: {
    addSelectFilter() {
      this.addSelectDropDownFilter('field options select_options', () => {
        this.searchForm.type_id = JSON.parse(JSON.stringify(this.searchItems.type)).map(item => item.key)
      }, () => {
        this.searchForm.type_id = []
      }, () => {
        this.selectOption.type = JSON.parse(JSON.stringify(this.searchItems.type)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('field options member_select_options', () => {
        this.searchForm.member_id = JSON.parse(JSON.stringify(this.searchItems.members)).map(item => item.key)
      }, () => {
        this.searchForm.member_id = []
      }, () => {
        this.selectOption.members = JSON.parse(JSON.stringify(this.searchItems.members)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      memberBalanceRecordExport(data).then((res) => {
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
        export_json_to_excel({ header: tHeader, data: data, filename: 'MemberBalanceRecord' + getFullDateString(new Date()) })
      })
    },
    onReset() {
      this.pageSizeCount = 1
      this.searchForm = {}
      this.fuzzyMatchingByOrderNumber = false
      this.searchTime = defaultSearchTime
      this.handleCurrentChange(1)
    },
    search() {
      this.pageSizeCount = 1;
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
      this.subtotalInfo = res.subtotalInfo
      this.subtotalInfo.totalAmount = (this.pageSize * this.pageSizeCount) > res.totalCount ? res.totalCount : (this.pageSize * this.pageSizeCount)
      this.totalInfo = res.totalInfo
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      res.rows.forEach(element => {
        element.open = open.includes(element.id)
      })
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
      data.rowsCount = this.pageSize * this.pageSizeCount
      this.handleRequest(data)
      memberBalanceRecordSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.memberBalanceRecord {
  overflow:auto;
  max-height: 100%;
  position: relative;
  .search_frame {
    padding-top: 1.5rem;
    flex-flow: wrap;
    .day_frame {
      padding: 0.41667rem 0.83333rem;
      .search_frame_size {
        display: flex;
        width: 23.33333rem;
        justify-content: space-evenly;
        padding-right: 1.8rem;
        .el-range-input {
          font-size: 1rem;
          padding: 0;
          margin: 0 0.1rem;
          width: 41%;
        }
        .el-range-separator {
          height: auto !important;
          line-height: 1 !important;
          width: 2.08333rem;
        }
        .el-input__icon.el-range__close-icon {
          display: none;
          &.el-icon-circle-close {
            display: none;
          }
        }
      }
      .more_option {
        width: 5rem;
        cursor: pointer;
        line-height: 1;
        font-size: 1.16667rem;
        justify-content: space-evenly;
        text-decoration: underline;
        .icon {
          height: 0.916667rem;
          width: 0.916667rem;
        }
      }
    }
    .search_options {
      border-bottom: 0.25rem solid #f9c901;
      position: relative;
      padding: 0 0.83333rem 0.41667rem 0.83333rem;
      .option {
        .el-input.el-input--suffix {
          font-size: 1rem;
          height: 100%;
          .el-input__inner {
            height: 100%!important;
          }
        }
        .el-input__inner {
          font-size: 1rem;
          height: 2.7rem;
          padding-left: 0.8rem;
        }
      }
    }
    .search_option_width{
      width: 23.33333rem;
    }
    .field {
      width: 11.41667rem;
      .option {
        width: 100%;
        margin-right: 0.83333rem;
        padding-top: 0.41667rem;
        padding-bottom: 0.41667rem;
        &.el-select {
          height: 3.5rem;
        }
      }
      .checkbox {
        margin-left: 2.66667rem;
        margin-right: auto;
        .el-checkbox__inner {
          background-color: transparent;
          border-color: #f9c901;
        }
        .el-checkbox__label {
          position: absolute;
          left: 1.5rem;
          color: white;
          font-size: 1rem;
        }
        &.is-checked {
          .el-checkbox__inner {
            &:after {
              -webkit-transform: rotate(45deg) scale(1.5);
              transform: rotate(45deg) scale(1.5);
              border: 0.16667rem solid #f9c901;
              width: 0.25rem;
              height: 0.75rem;
              top: -0.25rem;
              left: 0.5rem;
              border-left: 0;
              border-top: 0;
            }
          }
        }
      }
    }
    .search_frame_size {
      width: 23.33333rem;
      height: 2.66667rem;
      &.search_input{
        &.el-input{
          .el-input__inner {
            font-size: 1rem;
            padding-left: 0.83333rem;
            height: 2.66667rem;
            line-height: 2.66667rem;
            width: 100%;
          }
        }
      }
    }
    .search_btn_frame {
      display: flex;
      .search_btn {
        color: #000;
        background: #f9c901;
        border: 0.08333rem solid #f9c901;
        border-radius: 0.25rem;
        padding: 0.70833rem 0.95833rem;
        font-size: 1rem;
        margin: 0.41667rem;
        font-weight: bold;
        position: static !important;
        height: 2.66667rem;
        width: 5.2rem;
        align-self: flex-end;
        margin-left: 0.5rem !important;
      }
    }
  }

  .data_content {
    position: relative;
    padding: 0.625rem 1.16667rem 0.625rem 1.16667rem;
    .expand_ctrl {
      position: absolute;
      right: 1.3rem;
      &.more_open {
        top: 0.83333rem;
      }
      &.more_close {
        top: 23.83333rem;
      }
      .svg-icon {
        fill: #a3a3a3;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .base {
      width: 100%;
      padding: 0;
      align-items: flex-start;
    }
    .field {
      width: 50%;
      flex-wrap: wrap;
      padding-right: 0.41667rem;
      padding-top: 0.41667rem;
      padding-bottom: 0.41667rem;
    }
    .title {
      width: 100%;
      padding-bottom: 0.5rem;
      font-size: 1.16667rem;
      color: #6e6e6e;
      word-break: break-word;
      &.line_height {
        line-height: 1.5;
      }
    }
    .front {
      color: blue;
      font-weight: bolder;
    }
    .back {
      color: red;
      font-weight: bolder;
    }
    .text_align_right {
      width: 100%;
      text-align: right !important;
      padding-right: 0px !important;
    }
  }
  .noInformation {
    margin-top: 1rem;
    text-align: center;
  }
  .even-row {
    position: relative;
    background-color: #fff;
  }
  .odd-row {
    position: relative;
    background-color: #f4f4f4;
  }
  .more_btn_space {
    padding: 1.5rem;
    text-align: center;
    background-color: #fff;
  }
  .search_more {
    width: 100%;
    height: 4.5rem;
    .search_more_btn {
      padding-bottom: 0.01667rem;
      border-bottom: 1px solid #343a40;
    }
  }
  .page-total {
    background-color: #e9e9e9;
    padding: 0.83333rem 1.25rem;
    position: relative;
    .page-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-size: 1.16667rem;
      width: 50%;
      &.is-amount {
        padding-right: 0.83333rem !important;
        .label {
          width: 100%;
          text-align: right !important;
        }
        .value {
          width: 100%;
          text-align: right !important;
        }
      }
      .label {
        width: 100%;
        margin-bottom: 0.41667rem;
        margin-right: 0;
        color: #898989;
      }
    }
  }
  .news {
    font-size: 1.16667rem;
    font-weight: bold;
    word-break: break-all;
    &.line_height {
      line-height: 1.5;
    }
  }
  .totalCount {
    font-weight: bold;
    font-size: 1.16667rem;
    width: 100% !important;
    margin-top: 0.83333rem;
    padding-bottom: 0.41667rem;
    border-bottom: 0.08333rem solid #ce9600;
  }
  .align-items-end {
    align-items: flex-end!important;
  }
  .item-content {
    margin-top: 0.83333rem;
    .page-item {
      padding-right: 0.83333rem !important;
      width: 50%;
      &.mt {
        margin-top: 0.5rem;
      }
    }
  }
  .label {
    width: 100%;
    .value {
      width: 100%;
    }
  }
}
</style>
