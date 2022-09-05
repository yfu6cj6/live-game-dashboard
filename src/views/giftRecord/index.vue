<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="scroll-wrap flex-column flex-fill">
        <div class="scroll-inner flex-column flex-fill off">
          <div class="scroll-view flex-column flex-fill">
            <div class="report-theme ab-record all-bet bet-record red-packet flex-column flex-fill">
              <div class="flex-column flex-fill">
                <div class="scroll-wrap flex-column flex-fill flex-column flex-fill">
                  <div class="scroll-inner flex-column flex-fill off">
                    <div class="scroll-view flex-column flex-fill">
                      <div class="filter-bar bg-black">
                        <div class="day-range pt-3 pl-2 pr-2">
                          <div class="date-time-picker-box">
                            <div class="picker datetimerange datetimerange" @click.once="changeInitCalendarPage">
                              <el-date-picker
                                v-model="searchTime"
                                type="datetimerange"
                                popper-class="ams-timeslot-popper mobilePicker"
                                :clearable="false"
                                :editable="false"
                                time-arrow-control
                                :range-separator="$t('__to')"
                                :start-placeholder="$t('__startDate')"
                                :end-placeholder="$t('__endDate')"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="pickerOptions"
                                :format="'yyyy-MM-dd HH:mm'"
                                prefix-icon="''"
                                clear-icon="''"
                                @blur="handleChangePickerClass"
                              />
                            </div>
                            <span>
                              <a class="more-opiton text-link text-underline text-yellow align-items-center" :class="{'d-flex': searchOpen, 'd-none': !searchOpen}" @click.stop="setSearchOpen">
                                <div class="fas label icon d-flex align-items-center yellow">
                                  <svg-icon icon-class="less" style="height: 1.08333rem;width: 1.08333rem;" />
                                </div>
                                {{ $t('__options') }}
                              </a>
                              <a class="more-opiton text-link text-underline text-yellow align-items-center" :class="{'d-flex': !searchOpen, 'd-none': searchOpen}" @click.stop="setSearchOpen">
                                <div class="fas label icon d-flex align-items-center yellow">
                                  <svg-icon icon-class="add" style="height: 1.08333rem;width: 1.08333rem;" />
                                </div>
                                {{ $t('__options') }}
                              </a>
                            </span>
                          </div>
                        </div>
                        <div class="filters flex-wrap pl-2 pr-2">
                          <div class="d-flex w-100">
                            <div>
                              <div class="filter-options">
                                <div class="options agents">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.agent_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="agentIdCollapse"
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
                                <div class="options players">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.member_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="memberIdCollapse"
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
                                <div class="options dealer">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.dealer_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="dealerIdCollapse"
                                          :placeholder="$t('__dealer')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.dealers"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options giftNumber">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.record_number" type="number" :placeholder="$t('__giftNumber')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameRoundId">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.round_id" type="number" :placeholder="$t('__roundId')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gameTypes">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.game_type"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="gameTypeCollapse"
                                          :placeholder="$t('__gameType')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.gameType"
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
                              <div v-show="searchOpen" class="filter-options">
                                <div class="options gameTable">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.table_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="tableIdCollapse"
                                          :placeholder="$t('__tableId')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.tables"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options gift">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.gift_id"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="giftIdCollapse"
                                          :placeholder="$t('__gift')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.gifts"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options giftValue">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.value" type="number" :placeholder="$t('__giftValue')" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options currency">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.currency"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="currencyCollapse"
                                          :placeholder="$t('__currency')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.currency"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options appType">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="comp selected-filter custom">
                                        <el-select
                                          v-model="searchForm.device"
                                          class="d-flex"
                                          multiple
                                          :popper-append-to-body="false"
                                          :collapse-tags="deviceCollapse"
                                          :placeholder="$t('__device')"
                                          :popper-class="'custom-dropdown w-auto'"
                                        >
                                          <el-option
                                            v-for="item in selectOption.deviceType"
                                            :key="item.key"
                                            :label="item.nickname"
                                            :value="item.key"
                                          />
                                        </el-select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="options ip">
                                  <div>
                                    <div class="option">
                                      <span class="prefix-label" />
                                      <div class="input-filter">
                                        <el-input v-model="searchForm.user_ip" placeholder="IP" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <el-button class="bg-yellow filter-search" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
                          </div>
                        </div>
                      </div>
                      <template v-if="tableData.length > 0">
                        <div class="common-list report-list flex-column flex-fill bg-new-dark-white">
                          <div>
                            <div class="agent-group">
                              <div
                                v-for="(item, index) in tableData"
                                :key="index"
                                class="w-100 items"
                              >
                                <div class="agent-list-basic list-row">
                                  <div class="list-item d-flex align-items-start item-agent">
                                    <span class="label">{{ $t('__agent') }}</span>
                                    <span class="value text-yellow text-link">
                                      <span>{{ item.agent }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-player">
                                    <span class="label">{{ $t('__member') }}</span>
                                    <span class="value">
                                      <span>{{ item.member }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-dealer">
                                    <span class="label">{{ $t('__dealer') }}</span>
                                    <span class="value">
                                      <span>{{ item.dealer }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-giftTime">
                                    <span class="label">{{ $t('__giftTime') }}</span>
                                    <span class="value">
                                      <span>{{ item.gift_time }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-gameType">
                                    <span class="label">{{ $t('__gameType') }}</span>
                                    <span class="value">
                                      <span>{{ item.game_type }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-gameRoundId">
                                    <span class="label">{{ $t('__roundId') }}</span>
                                    <span class="value text-link">
                                      <span>
                                        <span>{{ item.round_id }}</span>
                                        <!-- <span class="text-underline">{{ item.round_id }}</span> -->
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label">{{ $t('__gift') }}</span>
                                    <span class="value">
                                      <span>{{ item.gift }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-giftNumber">
                                    <span class="label">{{ $t('__giftNumber') }}</span>
                                    <span class="value">
                                      <span>{{ item.record_number }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="giftImage">
                                      <img :src="item.gift_img_address" :alt="item.gift">
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-giftAmount">
                                    <span class="label">{{ $t('__giftAmount') }}</span>
                                    <span class="value">
                                      <span>{{ item.amount }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">space</span>
                                    <span class="value d-none">space</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-giftValue">
                                    <span class="label">{{ $t('__giftValue') }}</span>
                                    <span class="value">
                                      <span
                                        :class="{
                                          'text-red': item.value > 0,
                                          'text-blue': item.value < 0
                                        }"
                                      >
                                        {{ item.valueLabel }}
                                      </span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">space</span>
                                    <span class="value d-none">space</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-currency">
                                    <span class="label">{{ $t('__currency') }}</span>
                                    <span class="value">
                                      <span>{{ item.currency }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">space</span>
                                    <span class="value d-none">space</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-w6" style="width: 30%; flex-wrap: wrap;">
                                    <span class="label">{{ $t('__device') }}</span>
                                    <span class="value">
                                      <span>{{ item.device }}</span>
                                    </span>
                                  </div>
                                  <div class="list-item d-flex align-items-start item-none">
                                    <span class="label d-none">space</span>
                                    <span class="value d-none">space</span>
                                  </div>
                                  <div class="list-item d-flex align-items-start" style="justify-content: flex-end; text-align: right; width: 40%; flex-wrap: wrap; padding-right: 0.83333rem;">
                                    <span class="label" style="text-align: right; width: 100%; padding-bottom: 0.5rem;">IP</span>
                                    <span class="value">
                                      <div class="ip-detail">
                                        <div class="text-yellow _item">
                                          <div>{{ item.ip }}</div>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <div v-if="index < tableData.length - 1" class="agent-break-line" />
                              </div>
                              <div v-if="totalCount > pageSize" class="text-center view-more-container bg-white">
                                <template v-if="tableData.length >= totalCount">
                                  <span class="border-dark">
                                    {{ $t("__noMoreInformation") }}
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="view-more border-bottom border-dark" @click.stop="moreInfo">{{ $t("__searchMoreValue") }}</span>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <div v-else class="no-result">{{ $t('__noInformation') }}</div>
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
      <div class="report-theme ab-record all-bet rpa-record red-packet">
        <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
          <backTop />
          <div id="scroll-inner" class="scroll-inner on native hasPage">
            <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
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
                                :start-placeholder="$t('__startDate')"
                                :end-placeholder="$t('__endDate')"
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
                        <div class="options agents">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.agent_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="agentIdCollapse"
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
                        <div class="options players">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.member_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="memberIdCollapse"
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
                        <div class="options dealer">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.dealer_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="dealerIdCollapse"
                                  :placeholder="$t('__dealer')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.dealers"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options giftNumber">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <div class="el-input">
                                  <input v-model="searchForm.record_number" type="number" autocomplete="off" :placeholder="$t('__giftNumber')" class="el-input__inner">
                                </div>
                              </div>
                              <span class="suffix-label" />
                            </div>
                          </div>
                        </div>
                        <div class="options gameRoundId">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.round_id" type="number" :placeholder="$t('__roundId')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameTypes">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.game_type"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="gameTypeCollapse"
                                  :placeholder="$t('__gameType')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.gameType"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gameTable">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.table_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="tableIdCollapse"
                                  :placeholder="$t('__tableId')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.tables"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options gift">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.gift_id"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="giftIdCollapse"
                                  :placeholder="$t('__gift')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.gifts"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options giftValue">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.value" type="number" :placeholder="$t('__giftValue')" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options currency">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.currency"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="currencyCollapse"
                                  :placeholder="$t('__currency')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.currency"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options appType">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="comp selected-filter custom">
                                <el-select
                                  v-model="searchForm.device"
                                  class="d-flex"
                                  multiple
                                  :popper-append-to-body="false"
                                  :collapse-tags="deviceCollapse"
                                  :placeholder="$t('__device')"
                                  :popper-class="'custom-dropdown w-auto'"
                                >
                                  <el-option
                                    v-for="item in selectOption.deviceType"
                                    :key="item.key"
                                    :label="item.nickname"
                                    :value="item.key"
                                  />
                                </el-select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="options ip">
                          <div>
                            <div class="option">
                              <span class="prefix-label" />
                              <div class="input-filter">
                                <el-input v-model="searchForm.user_ip" placeholder="IP" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="el-button bg-yellow filter-search mr-4 el-button--default" @click="handleCurrentChange(1)">
                          <span>{{ $t("__search") }}</span>
                        </button>
                        <button type="button" class="el-button bg-yellow mr-0 filter-search w-auto el-button--default" @click.stop="onExportBtnClick()">
                          <span>{{ $t("__searchAndExport") }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-total2 bg-gray-white-light small">
                <div class="flex-nowrap report-list bg-new-dark-white has-index">
                  <div class="w-100">
                    <div class="agent-group">
                      <div class="w-100 items pb-0">
                        <div class="agent-list-basic list-row pb-2">
                          <span class="index" />
                          <div class="list-item d-flex align-items-center item-agentIcon">
                            <span class="label font-weight-bold text-black" />
                          </div>
                          <div class="list-item d-flex align-items-center item-agent">
                            <span class="label font-weight-bold text-black">{{ $t('__agent') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-playerIcon">
                            <span class="label font-weight-bold text-black" />
                          </div>
                          <div class="list-item d-flex align-items-center item-player">
                            <span class="label font-weight-bold text-black">{{ $t('__member') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-player">
                            <span class="label font-weight-bold text-black">{{ $t('__dealer') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w1">
                            <span class="label font-weight-bold text-black">{{ $t('__giftTime') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w2">
                            <span class="label font-weight-bold text-black">{{ $t('__gameType') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w3">
                            <span class="label font-weight-bold text-black">{{ $t('__roundId') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w3">
                            <span class="label font-weight-bold text-black">{{ $t('__gift') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w6">
                            <span class="label font-weight-bold text-black" />
                          </div>
                          <div class="list-item d-flex align-items-center item-w8">
                            <span class="label font-weight-bold text-black">{{ $t('__giftNumber') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w4">
                            <span class="label font-weight-bold text-black">{{ $t('__giftAmount') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w5 is-amount">
                            <span class="label font-weight-bold text-black">{{ $t('__giftValue') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w6">
                            <span class="label font-weight-bold text-black">{{ $t('__currency') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w6">
                            <span class="label font-weight-bold text-black">{{ $t('__device') }}</span>
                          </div>
                          <div class="list-item d-flex align-items-center item-w0">
                            <span class="label font-weight-bold text-black">IP</span>
                          </div>
                        </div>
                        <div class="agent-break-line" style="border-bottom: 1px solid rgb(51, 51, 51);" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="report-list" class="flex-nowrap report-list flex-fill bg-new-dark-white has-index">
                <template v-if="tableData.length > 0">
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
                          <div class="list-item d-flex align-items-start item-agentIcon">
                            <span class="value d-flex">
                              <span class="solid-circle align-self-center clickable small">
                                <div class="fas black">
                                  <svg-icon class="fas black" icon-class="top" style="height: 1rem; width: 1rem;" />
                                </div>
                              </span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-agent">
                            <span class="value  text-yellow">
                              <span>{{ item.agent }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-playerIcon">
                            <span class="value d-flex">
                              <span class="solid-circle align-self-center clickable small">
                                <div class="fas black">
                                  <svg-icon class="fas black" icon-class="info" style="height: 1.25rem; width: 1.25rem;" />
                                </div>
                              </span>
                              <span />
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-player">
                            <span class="value">
                              <span>{{ item.member }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-player">
                            <span class="value">
                              <span>{{ item.dealer }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w1">
                            <span class="value">
                              <span>{{ item.gift_time }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w2">
                            <span class="value">
                              <span>{{ item.game_type }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w3">
                            <span class="value">
                              <span>{{ item.round_id }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w3 align-items-center">
                            <span class="value mr-3">
                              <span>{{ item.gift }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w6 align-items-center">
                            <span class="giftImage">
                              <img :src="item.gift_img_address" :alt="item.gift">
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w8">
                            <span class="value">
                              <span>{{ item.record_number }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w4">
                            <span class="value">
                              <span>{{ item.amount }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w5 is-amount">
                            <span class="value">
                              <span :class="{'text-red': item.value > 0, 'text-blue': item.value < 0}">{{ item.valueLabel }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w6">
                            <span class="value">
                              <span>{{ item.currency }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w6">
                            <span class="value">
                              <span>{{ item.device }}</span>
                            </span>
                          </div>
                          <div class="list-item d-flex align-items-start item-w0">
                            <span class="value text-yellow">
                              <span>{{ item.ip }}</span>
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
import { giftRecordSearch, giftRecordExport } from '@/api/giftRecord'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getDayDateTime } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

const defaultSearchTime = getDayDateTime()

export default {
  name: 'GiftRecord',
  components: { BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      memberId: null,
      searchOpen: false,
      selectOption: {}
    }
  },
  computed: {
    agentIdCollapse() {
      return this.searchForm.agent_id && this.searchForm.agent_id.length > this.selectCollapseCount
    },
    memberIdCollapse() {
      return this.searchForm.member_id && this.searchForm.member_id.length > this.selectCollapseCount
    },
    dealerIdCollapse() {
      return this.searchForm.dealer_id && this.searchForm.dealer_id.length > this.selectCollapseCount
    },
    currencyCollapse() {
      return this.searchForm.currency && this.searchForm.currency.length > this.selectCollapseCount
    },
    giftIdCollapse() {
      return this.searchForm.gift_id && this.searchForm.gift_id.length > this.selectCollapseCount
    },
    gameTypeCollapse() {
      return this.searchForm.game_type && this.searchForm.game_type.length > this.selectCollapseCount
    },
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    deviceCollapse() {
      return this.searchForm.device && this.searchForm.device.length > this.selectCollapseCount
    }
  },
  watch: {
    '$route.path': function() {
      if (this.tempRoute.path === this.$route.path) {
        const searchTime = localStorage.getItem(`giftRecord${this.memberId}`)
        this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
        this.$nextTick(() => {
          this.handleCurrentChange(this.currentPage)
        })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      localStorage.setItem(`giftRecord${this.memberId}`, this.searchTime.toString())
    },
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.$nextTick(() => {
          this.handleCurrentChange(1)
          this.addSelectFilter()
        })
      }
    }
  },
  created() {
    this.searchTime = defaultSearchTime
    this.tempRoute = Object.assign({}, this.$route)
    if (this.tempRoute.params?.id !== undefined) {
      this.memberId = parseInt(this.$route.params.id)
      this.searchForm.member_id = [this.memberId]
      const searchTime = localStorage.getItem(`giftRecord${this.memberId}`)
      this.searchTime = searchTime ? searchTime.split(',') : defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.memberId}`])
    }
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.handleCurrentChange(this.currentPage)
      this.addSelectFilter()
    })
    this.setHeaderStyle()
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftRecord'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('options agents', () => {
        this.searchForm.agent_id = JSON.parse(JSON.stringify(this.searchItems.agents)).map(item => item.key)
      }, () => {
        this.searchForm.agent_id = []
      }, () => {
        this.selectOption.agents = JSON.parse(JSON.stringify(this.searchItems.agents)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options players', () => {
        this.searchForm.member_id = JSON.parse(JSON.stringify(this.searchItems.members)).map(item => item.key)
      }, () => {
        this.searchForm.member_id = []
      }, () => {
        this.selectOption.members = JSON.parse(JSON.stringify(this.searchItems.members)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options dealer', () => {
        this.searchForm.dealer_id = JSON.parse(JSON.stringify(this.searchItems.dealers)).map(item => item.key)
      }, () => {
        this.searchForm.dealer_id = []
      }, () => {
        this.selectOption.dealers = JSON.parse(JSON.stringify(this.searchItems.dealers)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameTypes', () => {
        this.searchForm.game_type = JSON.parse(JSON.stringify(this.searchItems.gameType)).map(item => item.key)
      }, () => {
        this.searchForm.game_type = []
      }, () => {
        this.selectOption.gameType = JSON.parse(JSON.stringify(this.searchItems.gameType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gameTable', () => {
        this.searchForm.table_id = JSON.parse(JSON.stringify(this.searchItems.tables)).map(item => item.key)
      }, () => {
        this.searchForm.table_id = []
      }, () => {
        this.selectOption.tables = JSON.parse(JSON.stringify(this.searchItems.tables)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options gift', () => {
        this.searchForm.gift_id = JSON.parse(JSON.stringify(this.searchItems.gifts)).map(item => item.key)
      }, () => {
        this.searchForm.gift_id = []
      }, () => {
        this.selectOption.gifts = JSON.parse(JSON.stringify(this.searchItems.gifts)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options currency', () => {
        this.searchForm.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).map(item => item.key)
      }, () => {
        this.searchForm.currency = []
      }, () => {
        this.selectOption.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options appType', () => {
        this.searchForm.device = JSON.parse(JSON.stringify(this.searchItems.deviceType)).map(item => item.key)
      }, () => {
        this.searchForm.device = []
      }, () => {
        this.selectOption.deviceType = JSON.parse(JSON.stringify(this.searchItems.deviceType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    tapRow(row) {
      row.tap = !row.tap
      this.tableData = Object.assign([], this.tableData)
    },
    setSearchOpen() {
      this.searchOpen = !this.searchOpen
    },
    setTagsViewTitle() {
      if (this.memberId !== null) {
        const title = this.$t(this.tempRoute.meta.title)
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.searchItems.members.find(item => item.key === this.memberId).nickname}` })
        this.$store.dispatch('tagsView/updateVisitedView', route)
      }
    },
    onReset() {
      this.searchForm = {}
      this.searchTime = defaultSearchTime
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
      data.giftTime = searchTime
    },
    handleRespone(res) {
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      this.tableData = res.rows.slice(0, res.rows.length - 2)
      this.tableData.forEach(element => {
        element.valueLabel = numberFormat(element.value)
      });
      this.totalCount = res.totalCount
      this.setTagsViewTitle()
      this.setDataLoading(false)
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize * this.pageSizeCount
      this.handleRequest(data)
      giftRecordSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      giftRecordExport(data).then((res) => {
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
        export_json_to_excel({ header: tHeader, data: data, filename: 'MemberBet_' + getFullDateString(new Date()) })
      })
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
#app.mobile {
  .giftImage {
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 5rem;
      height: 5rem;
    }
  }
  .ip-detail {
    ._item {
      line-height: 1.5;
    }
  }
}
#app.pc {
  .giftImage {
    img {
      width: 5rem;
      height: 5rem;
    }
  }

  .ab-record {
    .agent-break-line {
      border-bottom: 1px solid #333;
      background-color: black;
    }
    .page-item {
      &.ab-record-total-record {
        position: absolute !important;
        top: 0;
        left: 100%;
        width: 100px !important;
      }
    }
    .list-item {
      width: 100px;
      min-width: 100px;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: 5px;
      &.item-agentIcon,
      &.item-playerIcon {
        width: 25px;
        min-width: 25px;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: 5px;
      }
      &.item-agent,
      &.item-player {
        width: 95px;
        min-width: 95px;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: 5px;
      }
      &.item-w0  {
        width: 145px;
      }
      &.item-w1  {
        width: 95px;
      }
      &.item-w2 {
        width: 120px;
      }
      &.item-w3 {
        width: 85px;
      }
      &.item-w4 {
        width: 70px;
        text-align: center;
      }
      &.item-w5 {
        width: 160px;
      }
      &.item-w6 {
        width: 75px;
      }
      &.item-w8 {
        width: 185px;
      }
    }
  }

}
</style>
