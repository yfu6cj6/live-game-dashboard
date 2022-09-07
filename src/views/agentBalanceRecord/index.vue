<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="scroll-wrap agentBalanceRecord">
        <div class="scroll-inner">
          <div class="scroll-view">
            <div class="bg-black">
              <div class="search_frame">
                <div class="d-flex align-items-center day_frame" @click.once="changeInitCalendarPage">
                  <el-date-picker
                    v-model="searchTime"
                    type="datetimerange"
                    class="search_frame_size"
                    popper-class="ams-timeslot-popper mobilePicker"
                    align="right"
                    :clearable="false"
                    :editable="false"
                    time-arrow-control
                    :range-separator="$t('__to')"
                    :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                    :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                    :default-time="['00:00:00', '23:59:59']"
                    :picker-options="pickerOptions"
                    :format="'yyyy-MM-dd HH:mm'"
                    prefix-icon="d-none"
                    clear-icon="''"
                    @blur="handleChangePickerClass"
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
                                v-model="searchForm.type"
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
                          <div class="field options agent_select_options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="comp selected-filter custom">
                                  <el-select
                                    v-model="searchForm.agents"
                                    class="d-flex"
                                    multiple
                                    :popper-append-to-body="false"
                                    :collapse-tags="agentsCollapse"
                                    :placeholder="$t('__agent')"
                                    :popper-class="'custom-dropdown w-auto'"
                                  >
                                    <el-option
                                      v-for="item in selectOption.agents"
                                      :key="item.key"
                                      :label="item.nickname"
                                      :value="item.key"
                                    />
                                  </el-select>
                                </div>
                              </div>
                            </div>
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
            <div v-if="tableData.length > 0">
              <div
                v-for="(item, index) in tableData"
                :key="index"
                :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
              >
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
                      <span class="title">{{ $t('__agent') }}</span>
                      <span class="news text-yellow">{{ item.agent }}</span>
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
                      <span class="news text_align_right">{{ item.pre_trade_balanceLabel }}</span>
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
                      <span class="news text_align_right">{{ item.balance_after_tradeLabel }}</span>
                    </div>
                  </div>
                  <div v-if="item.open" class="d-flex flex-wrap justify-content-between expand">
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
                          <span class="news">{{ subtotalInfo.incomeLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 is-amount">
                        <span class="label">{{ $t('__totalExpenditure') }}</span>
                        <span class="value">
                          <span class="news">{{ subtotalInfo.payoutLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 mt is-amount">
                        <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                        <span class="value">
                          <span class="news">{{ subtotalInfo.incomeAndPayoutLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 is-amount">
                        <span class="label">{{ `${$stringFormat($t('__totalDataAmount'), [subtotalInfo.totalAmountLabel])}` }}</span>
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
                          <span class="news">{{ totalInfo.incomeLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 is-amount">
                        <span class="label">{{ $t('__totalExpenditure') }}</span>
                        <span class="value">
                          <span class="news">{{ totalInfo.payoutLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 mt is-amount">
                        <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                        <span class="value">
                          <span class="news">{{ totalInfo.incomeAndPayoutLabel }}</span>
                        </span>
                      </div>
                      <div class="page-item mb-2 is-amount">
                        <span class="label">{{ `${$stringFormat($t('__totalDataAmount'), [totalCountLabel])}` }}</span>
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
    <template v-else>
      <div class="comp credit-records SubAgentCreditRecords agentBalanceRecord">
        <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
          <backTop ref="backTop" />
          <div id="scroll-inner" class="scroll-inner on native">
            <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
              <div class="flex-column flex-fill flex-nowrap bg-new-dark-white">
                <div class="filter-bar bg-black pt-3">
                  <div class="filter-outer">
                    <div class="filters flex-wrap">
                      <div class="filter-inner">
                        <div class="filter-options">
                          <div class="day-range">
                            <div class="date-time-picker-box">
                              <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                                <el-date-picker
                                  v-model="searchTime"
                                  type="datetimerange"
                                  popper-class="ams-timeslot-popper pcPicker"
                                  :clearable="false"
                                  :editable="false"
                                  time-arrow-control
                                  :range-separator="$t('__to')"
                                  :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                                  :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                                  :default-time="['00:00:00', '23:59:59']"
                                  :picker-options="pickerOptions"
                                  :format="'yyyy-MM-dd HH:mm'"
                                  prefix-icon="''"
                                  clear-icon="''"
                                  @blur="handleChangePickerClass"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="options select_options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="comp selected-filter custom">
                                  <el-select
                                    v-model="searchForm.type"
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
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <div class="options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="input-filter">
                                  <div class="el-input">
                                    <input v-model="searchForm.ip" type="url" autocomplete="off" placeholder="IP" class="el-input__inner">
                                  </div>
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <div class="options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="input-filter">
                                  <div class="el-input">
                                    <input v-model="searchForm.orderNumber" type="text" autocomplete="off" placeholder="交易单号" class="el-input__inner">
                                  </div>
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <div class="options dim">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="field">
                                  <el-checkbox v-model="fuzzyMatchingByOrderNumber" class="checkbox option" :label="$t('__fuzzyMatching')" />
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <div class="options agent_select_options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="comp selected-filter custom">
                                  <el-select
                                    v-model="searchForm.agents"
                                    class="d-flex"
                                    multiple
                                    :popper-append-to-body="false"
                                    :collapse-tags="agentsCollapse"
                                    :placeholder="$t('__agent')"
                                    :popper-class="'custom-dropdown w-auto'"
                                  >
                                    <el-option
                                      v-for="item in selectOption.agents"
                                      :key="item.key"
                                      :label="item.nickname"
                                      :value="item.key"
                                    />
                                  </el-select>
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <button type="button" class="el-button bg-yellow filter-search mr-4 el-button--default" @click.stop="search()">
                            <span>{{ $t("__search") }}</span>
                          </button>
                          <button type="button" class="el-button bg-yellow mr-2 filter-search w-auto el-button--default" @click.stop="onExportBtnClick()">
                            <span>{{ $t("__searchAndExport") }}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-nowrap report-list bg-new-dark-white has-index">
                  <div class="w-100">
                    <div class="agent-group">
                      <div class="w-100 items">
                        <div class="agent-list-basic list-row">
                          <span class="index" />
                          <div class="list-item d-flex align-items-center" style="width: 160px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__transactionNumber') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 95px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__operationTime') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 95px; flex-wrap: wrap; margin-left: -10px;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__superiorAgent') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 30px; min-width: 40px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" />
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 95px; flex-wrap: wrap; margin-left: -10px;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__agent') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 125px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">IP</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 90px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__recordType') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center is-amount" style="width: 125px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__beforeTradeBalance') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center is-amount" style="width: 120px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__income') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center is-amount" style="width: 120px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__payout') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center is-amount" style="width: 125px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__afterTradeBalance') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 245px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__operator') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center" style="width: 150px; flex-wrap: wrap;">
                            <span class="label font-weight-bold text-black" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__operationMessage') }}</span>
                          </div>
                        </div>
                        <div class="agent-break-line" style="border-bottom: 1px solid rgb(51, 51, 51);" />
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="tableData.length > 0">
                  <div id="report-list" class="common-list flex-nowrap report-list flex-fill bg-new-dark-white has-index">
                    <div class="w-100">
                      <div class="agent-group">
                        <div
                          v-for="(item, index) in tableData"
                          :key="index"
                          class="w-100 items report-list-item-row"
                          :class="{'high-light': item.tap === true}"
                          @click.stop="tapRow(item)"
                        >
                          <div class="agent-list-basic list-row align-items-center">
                            <span>
                              <span class="index" style="font-size:17px!important;margin-top:-8.5px!important">{{ (index+1) }}</span>
                            </span>
                            <div class="list-item d-flex align-items-start" style="width: 160px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.order_number }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 95px; flex-wrap: wrap;">
                              <span class="value">{{ item.operationTime }}</span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 95px; flex-wrap: wrap; margin-left: -10px;">
                              <span class="value text-black">
                                <span>{{ item.superiorAgent }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 30px; min-width: 40px; flex-wrap: wrap;">
                              <span class="value d-flex">
                                <span class="solid-circle align-self-center clickable small">
                                  <div class="fas black">
                                    <svg-icon class="fas black" icon-class="top" style="height: 1rem; width: 1rem;" />
                                  </div>
                                </span>
                                <span />
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 95px; flex-wrap: wrap; margin-left: -10px;">
                              <span class="value text-black">
                                <span>{{ item.agent }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 125px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.ip }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 90px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.type }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start is-amount" style="width: 125px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.pre_trade_balanceLabel }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start is-amount" style="width: 120px; flex-wrap: wrap;">
                              <span class="value" :class="{'text-blue': item.income > 0}">
                                <span>{{ item.incomeLabel }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start is-amount" style="width: 120px; flex-wrap: wrap;">
                              <span class="value" :class="{'text-red': item.payout < 0}">
                                <span>{{ item.payoutLabel }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start is-amount" style="width: 125px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.balance_after_tradeLabel }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 245px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.operator }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start" style="width: 150px; flex-wrap: wrap;">
                              <span class="value">
                                <span>{{ item.message }}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <pagination
                      :page-size="pageSize"
                      :page-sizes="pageSizes"
                      :total="totalCount"
                      :current-page.sync="currentPage"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                  <div class="page-total2">
                    <div class="agent-break-line" style="border-bottom: 1px solid rgb(206, 150, 0);" />
                    <div class="w-100 list-row totals">
                      <div class="list-item" style="position: relative;">
                        <div class="name list-sub-item d-flex align-items-center">
                          <span>{{ $t("__subtotalCount") }}</span>
                        </div>
                        <div class="d-flex w-100" style="padding-left: 50px !important;">
                          <div class="d-flex" style="position: relative;">
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 160px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap; margin-left: -10px;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 30px; min-width: 40px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap; margin-left: -10px;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 90px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 125px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item relative-target" style="width: 120px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="income" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__totalIncome') }}</span>
                                  <span class="value">
                                    <span>{{ subtotalInfo.incomeLabel }}</span>
                                  </span>
                                </div>
                              </div>
                              <div class="item-content list-sub-item d-flex align-items-start cny" style="position: absolute; bottom: 0px; right: calc(100% + 50px);" />
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 120px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="outcome" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__totalExpenditure') }}</span>
                                  <span class="value">
                                    <span>{{ subtotalInfo.payoutLabel }}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 125px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="creditAfter" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                                  <span class="value">
                                    <span>{{ subtotalInfo.incomeAndPayoutLabel }}</span>
                                  </span>
                                </div>
                                <span class="label sum-total-record w-auto">
                                  {{ `${$t('__gong') } ` }}
                                  <span style="font-weight:bold">{{ subtotalInfo.totalAmountLabel }}</span>
                                  {{ ` ${$t('__bi') }` }}
                                </span>
                              </div>
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 245px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 150px; flex-wrap: wrap;" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="agent-break-line" style="border-bottom: 1px solid rgb(206, 150, 0);" />
                    <div class="w-100 list-row totals">
                      <div class="list-item" style="position: relative;">
                        <div class="name list-sub-item d-flex align-items-center">
                          <span>{{ $t('__totalCount') }}</span>
                        </div>
                        <div class="d-flex w-100" style="padding-left: 50px !important;">
                          <div class="d-flex" style="position: relative;">
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 160px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap; margin-left: -10px;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 30px; min-width: 40px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 95px; flex-wrap: wrap; margin-left: -10px;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 90px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 125px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item relative-target" style="width: 120px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="income" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__totalIncome') }}</span>
                                  <span class="value">
                                    <span>{{ totalInfo.incomeLabel }}</span>
                                  </span>
                                </div>
                              </div>
                              <div class="item-content list-sub-item d-flex align-items-start cny" style="position: absolute; bottom: 0px; right: calc(100% + 50px);" />
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 120px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="outcome" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__totalExpenditure') }}</span>
                                  <span class="value">
                                    <span>{{ totalInfo.payoutLabel }}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 125px; flex-wrap: wrap;">
                              <div class="item-content list-sub-item d-flex align-items-start" style="position: relative; z-index: 10;">
                                <div data-itemname="creditAfter" class="page-item mb-2 flex-column justify-content-between is-amount">
                                  <span class="label">{{ $t('__incomeAndExpenditure') }}</span>
                                  <span class="value">
                                    <span>{{ totalInfo.incomeAndPayoutLabel }}</span>
                                  </span>
                                </div>
                                <span class="label sum-total-record w-auto">
                                  {{ `${$t('__gong') } ` }}
                                  <span style="font-weight:bold">{{ totalCountLabel }}</span>
                                  {{ ` ${$t('__bi') }` }}
                                </span>
                              </div>
                            </div>
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 245px; flex-wrap: wrap;" />
                            <div class="list-item align-items-center text-right is-amount page-item" style="width: 150px; flex-wrap: wrap;" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="no-result">{{ $t('__noInformation') }}</div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { agentBalanceRecordSearch, agentBalanceRecordExport } from '@/api/agentBalanceRecord'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getTodayDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'AgentBalanceRecord',
  components: { BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      fuzzyMatchingByOrderNumber: false,
      searchFormOpen: false,
      subtotalInfo: {},
      totalInfo: {},
      selectOption: {},
      totalCountLabel: ''
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
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.$nextTick(() => {
          this.search()
          this.addSelectFilter()
        })
      }
    }
  },
  created() {
    this.pageSizeCount = 1
    this.searchTime = defaultSearchTime
    this.handleCurrentChange(this.currentPage)
    this.$nextTick(() => {
      this.addSelectFilter()
    })
    this.setHeaderStyle()
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__agentBalanceRecord'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('options select_options', () => {
        this.searchForm.type = JSON.parse(JSON.stringify(this.searchItems.type)).map(item => item.key)
      }, () => {
        this.searchForm.type = []
      }, () => {
        this.selectOption.type = JSON.parse(JSON.stringify(this.searchItems.type)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options agent_select_options', () => {
        this.searchForm.agents = JSON.parse(JSON.stringify(this.searchItems.agents)).map(item => item.key)
      }, () => {
        this.searchForm.agents = []
      }, () => {
        this.selectOption.agents = JSON.parse(JSON.stringify(this.searchItems.agents)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
      })
    },
    tapRow(row) {
      row.tap = !row.tap
      this.tableData = Object.assign([], this.tableData)
    },
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      agentBalanceRecordExport(data).then((res) => {
        this.onDataOut(res.rows)
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
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
      this.pageSizeCount = 1
      this.searchForm = {}
      this.fuzzyMatchingByOrderNumber = false
      this.searchTime = defaultSearchTime
      this.handleCurrentChange(1)
    },
    search() {
      this.pageSizeCount = 1
      this.handleCurrentChange(1)
    },
    handleRequest(data) {
      this.setDataLoading(true)
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
      this.subtotalInfo.incomeLabel = numberFormat(this.subtotalInfo.income)
      this.subtotalInfo.payoutLabel = numberFormat(this.subtotalInfo.payout)
      this.subtotalInfo.incomeAndPayoutLabel = numberFormat(this.subtotalInfo.incomeAndPayout)
      this.subtotalInfo.totalAmount = (this.pageSize * this.pageSizeCount) > res.totalCount ? res.totalCount : (this.pageSize * this.pageSizeCount)
      this.subtotalInfo.totalAmountLabel = numberFormat(this.subtotalInfo.totalAmount, 0)

      this.totalInfo = res.totalInfo
      this.totalInfo.incomeLabel = numberFormat(this.totalInfo.income)
      this.totalInfo.payoutLabel = numberFormat(this.totalInfo.payout)
      this.totalInfo.incomeAndPayoutLabel = numberFormat(this.totalInfo.incomeAndPayout)

      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      res.rows.forEach(element => {
        element.open = open.includes(element.id)
      })
      this.tableData = res.rows
      this.tableData.forEach(element => {
        element.tap = false
        element.pre_trade_balanceLabel = numberFormat(element.pre_trade_balance)
        element.balance_after_tradeLabel = numberFormat(element.balance_after_trade)
        element.incomeLabel = '+' + numberFormat(element.income)
        element.payoutLabel = numberFormat(element.payout)
      });
      this.totalCount = res.totalCount
      this.totalCountLabel = numberFormat(this.totalCount, 0)
      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }
      this.setDataLoading(false)
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize * this.pageSizeCount
      this.handleRequest(data)
      agentBalanceRecordSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss">
#app.mobile {
  .agentBalanceRecord {
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
          top: 25.83333rem;
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
}
#app.pc {
  .agentBalanceRecord {
    .page-total2 {
      .totals {
        min-height: 50px;
        padding-top: 5px;
        .label {
          margin-top: 0px !important;
        }
      }
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
        width: 180px;
        position: relative;
        padding: 0 !important;
        -ms-flex-item-align: stretch;
        align-self: stretch;
        .label {
          width: 100%;
          margin-bottom: 0.41667rem;
          margin-right: 0;
          color: #898989;
        }
        .value {
          font-weight: bold;
        }
        &.is-amount {
          padding-right: 5px !important;
          .label,
          .value {
            width: 100%;
            text-align: right !important;
          }
        }
        &.relative-target {
          z-index: 1;
        }
      }
      .list-sub-item {
        margin-top: 0px !important;
        &.name {
          position: absolute;
          top: 0;
          left: 0;
          color: #ce9600;
          font-weight: bold;
          font-size: 1.16667rem;
          width: 100% !important;
          margin-bottom: -30px !important;
          padding: 10px 15px 10px 15px !important;
        }
      }
      .sum-total-record {
        position: absolute;
        top: 0;
        left: calc(100% + 50px);
        white-space: nowrap;
      }
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      margin-right: 0;
      font-weight: normal;
    }
  }
}
</style>
