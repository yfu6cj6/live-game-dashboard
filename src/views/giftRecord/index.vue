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
                :start-placeholder="$t('__startDate')"
                :end-placeholder="$t('__endDate')"
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '23:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple filterable :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in searchItems.currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agent_id" multiple filterable :collapse-tags="agentIdCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.member_id" multiple filterable :collapse-tags="memberIdCollapse" :placeholder="$t('__member')">
                <el-option v-for="item in searchItems.members" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.dealer_id" multiple filterable :collapse-tags="dealerIdCollapse" :placeholder="$t('__dealer')">
                <el-option v-for="item in searchItems.dealers" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.game_type" multiple filterable :collapse-tags="gameTypeCollapse" :placeholder="$t('__gameType')">
                <el-option v-for="item in searchItems.gameType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.table_id" multiple filterable :collapse-tags="tableIdCollapse" :placeholder="$t('__tableId')">
                <el-option v-for="item in searchItems.tables" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.gift_id" multiple filterable :collapse-tags="giftIdCollapse" :placeholder="$t('__gift')">
                <el-option v-for="item in searchItems.gifts" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.device_id" multiple filterable :collapse-tags="deviceIdCollapse" :placeholder="$t('__device')">
                <el-option v-for="item in searchItems.deviceType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.record_number" :placeholder="$t('__giftNumber')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.value" type="number" :placeholder="$t('__giftValue')" />
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
            </p>
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-date-picker
                v-model="searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="$t('__startDate')"
                :end-placeholder="$t('__endDate')"
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '23:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple filterable :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in searchItems.currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agent_id" multiple filterable :collapse-tags="agentIdCollapse" :placeholder="$t('__agent')">
                <el-option v-for="item in searchItems.agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.member_id" multiple filterable :collapse-tags="memberIdCollapse" :placeholder="$t('__member')">
                <el-option v-for="item in searchItems.members" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.dealer_id" multiple filterable :collapse-tags="dealerIdCollapse" :placeholder="$t('__dealer')">
                <el-option v-for="item in searchItems.dealers" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.game_type" multiple filterable :collapse-tags="gameTypeCollapse" :placeholder="$t('__gameType')">
                <el-option v-for="item in searchItems.gameType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.table_id" multiple filterable :collapse-tags="tableIdCollapse" :placeholder="$t('__tableId')">
                <el-option v-for="item in searchItems.tables" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.gift_id" multiple filterable :collapse-tags="giftIdCollapse" :placeholder="$t('__gift')">
                <el-option v-for="item in searchItems.gifts" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.device_id" multiple filterable :collapse-tags="deviceIdCollapse" :placeholder="$t('__device')">
                <el-option v-for="item in searchItems.deviceType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.record_number" :placeholder="$t('__giftNumber')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.value" type="number" :placeholder="$t('__giftValue')" />
            </p>
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">{{ $t("__searchAndExport") }}</el-button>
            </p>
          </div>
        </template>
      </div>
      <div ref="table" class="view-container-table">
        <template v-if="device !== 'mobile'">
          <div class="record">
            <div class="subtotalCount">
              <div class="record_left">
                <span class="header">{{ $t('__subtotalCount') }}</span>
              </div>
              <div class="record_right">
                <div class="item">
                  <span class="header">{{ $t('__giftAmount') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftValue') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalLength') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
              </div>
            </div>
            <div class="totalCount">
              <div class="record_left">
                <span class="header">{{ $t('__totalCount') }}</span>
              </div>
              <div class="record_right">
                <div class="item">
                  <span class="header">{{ $t('__giftNumber') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftNumber') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftNumber') }}</span>
                  <span class="content">{{ item.record_number }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="gift">
                <div class="item">
                  <span class="header">{{ $t('__gift') }}</span>
                  <span class="content">{{ item.gift }}</span>
                  <img v-if="item.gift_img_address === ''" class="giftImage" src="@/assets/unknown.png" :alt="$t('__gift')">
                  <img v-else :src="item.gift_img_address" class="giftImage" :alt="$t('__gift')">
                </div>
              </div>
              <div class="info">
                <div class="left">
                  <div class="item">
                    <span class="header">{{ $t('__giftNumber') }}</span>
                    <span class="content">{{ item.record_number }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__giftTime') }}</span>
                    <span class="content">{{ item.gift_time }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__gameType') }}</span>
                    <span class="content">{{ item.game_type }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__member') }}</span>
                    <span class="content">{{ item.member }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__agent') }}</span>
                    <span class="content">{{ item.agent }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__dealer') }}</span>
                    <span class="content">{{ item.dealer }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="header">{{ $t('__roundId') }}</span>
                    <span class="content">{{ item.round_id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__giftValue') }}</span>
                    <span class="content">{{ item.value }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__giftAmount') }}</span>
                    <span class="content">{{ item.amount }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__currency') }}</span>
                    <span class="content">{{ item.currency }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__device') }}</span>
                    <span class="content">{{ item.device }}</span>
                  </div>
                  <div class="item">
                    <span class="header">IP</span>
                    <span class="content">{{ item.ip }}</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </template>
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
        @current-change="handlePageChangeByClient"
      />
    </div>
  </div>
</template>

<script>
import { giftRecordSearch, giftRecordExport } from '@/api/giftRecord'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'GiftRecord',
  mixins: [common, viewCommon, handlePageChange],
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
      totalInfo: {
        amount: "0",
        count: 0,
        value: "0.00"
      },
      subtotalInfo: {
        amount: "0",
        count: 0,
        value: "0.00"
      },
      tempRoute: {},
      memberId: null,
      firstCreate: true
    }
  },
  computed: {
    currencyCollapse() {
      return this.searchForm.currency && this.searchForm.currency.length > this.selectCollapseCount
    },
    agentIdCollapse() {
      return this.searchForm.agent_id && this.searchForm.agent_id.length > this.selectCollapseCount
    },
    memberIdCollapse() {
      return this.searchForm.member_id && this.searchForm.member_id.length > this.selectCollapseCount
    },
    dealerIdCollapse() {
      return this.searchForm.dealer_id && this.searchForm.dealer_id.length > this.selectCollapseCount
    },
    gameTypeCollapse() {
      return this.searchForm.game_type && this.searchForm.game_type.length > this.selectCollapseCount
    },
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    giftIdCollapse() {
      return this.searchForm.gift_id && this.searchForm.gift_id.length > this.selectCollapseCount
    },
    deviceIdCollapse() {
      return this.searchForm.device_id && this.searchForm.device_id.length > this.selectCollapseCount
    },
    totalInfoCountString() {
      return this.$t('__total') + ' ' + this.totalInfo.count + ' ' + this.$t('__count')
    }
  },
  watch: {
    '$route.path': function() {
      if (this.tempRoute.path === this.$route.path) {
        if (this.$route.query?.searchTime) {
          this.searchTime = this.$route.query.searchTime.split(',')
          this.$nextTick(() => {
            this.handleCurrentChange(this.currentPage)
          })
        }
        this.$router.replace({ 'query': null })
        this.$store.dispatch('tagsView/updateVisitedView', this.$route)
      }
    },
    'searchTime': function() {
      if (!this.firstCreate) {
        this.$nextTick(() => {
          this.handleCurrentChange(1)
        })
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.tempRoute.params?.id !== undefined) {
      this.memberId = parseInt(this.$route.params.id)
      this.searchForm.member_id = [this.memberId]
      this.searchTime = this.tempRoute.query.searchTime?.split(',') || defaultSearchTime
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.memberId}`])
    }
    this.$router.replace({ 'query': null })
    this.tempRoute.query = null
    this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    this.$nextTick(() => {
      this.handleCurrentChange(this.currentPage)
      this.firstCreate = false
    })
  },
  methods: {
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
      this.dataLoading = true
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
      this.totalInfo = res.totalInfo
      this.subtotalInfo = res.subtotalInfo
      this.searchItems = res.searchItems
      this.tableData = res.rows
      this.totalCount = res.totalCount
      this.setTagsViewTitle()
      this.dataLoading = false
    },
    onSubmit() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      data.page = this.currentPage
      data.rowsCount = this.pageSize
      this.handleRequest(data)
      giftRecordSearch(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onExportBtnClick() {
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      giftRecordExport(data).then((res) => {
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
        export_json_to_excel({ header: tHeader, data: data, filename: 'GiftRecord_' + getFullDateString(new Date()) })
      })
    }
  }
}
</script>

<style>
</style>

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        display: flex;
        flex-direction: column;
        .gift {
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .giftImage {
              vertical-align: middle;
              width: 105px;
            }
          }
        }
        .info {
          width: 100%;
          display: flex;
          flex-direction: row;
          .left,
          .right {
            width: 50%;
            display: flex;
            flex-direction: column;
          }
          .item {
            display: flex;
            flex-direction: column;
            .header {
              min-width: 32px;
              justify-content: flex-end;
            }
            .content {
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
