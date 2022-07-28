<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                :picker-options="pickerOptions"
                :default-time="['12:00:00', '11:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.description" :placeholder="$t('__description')" />
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="handleCurrentChange(1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">
                {{ $t("__searchAndExport") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-parent" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
                {{ $t("__moreSearch") }}
              </el-button>
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
                v-model="searchForm.searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                :picker-options="pickerOptions"
                :default-time="['12:00:00', '11:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.description" :placeholder="$t('__description')" />
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="handleCurrentChange(1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onExportBtnClick()">
                {{ $t("__searchAndExport") }}
              </el-button>
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
                <div class="wrap">
                  <div class="left">
                    <div class="item">
                      <span class="header">{{ $t('__operator') }}</span>
                      <span>{{ item.userNickName }}</span>
                    </div>
                    <div class="item">
                      <span class="header">IP</span>
                      <span>{{ item.ip }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__description') }}</span>
                      <span>{{ item.description }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__operationTime') }}</span>
                      <span>{{ item.created_at }}</span>
                    </div>
                    <div class="item">
                      <span class="header">Uri</span>
                      <span v-if="isAdminister">{{ item.uri }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__method') }}</span>
                      <span v-if="isAdminister">{{ item.method }}</span>
                    </div>
                    <div class="item">
                      <el-button v-if="item.open" class="bg-yellow" size="mini" icon="el-icon-arrow-up" @click="remarkExpand(item)">
                        {{ $t("__content") }}
                      </el-button>
                      <el-button v-else class="bg-yellow" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)">
                        {{ $t("__content") }}
                      </el-button>
                    </div>
                  </div>
                </div>
                <div v-if="item.open" class="wrap">
                  <div class="item">
                    <span class="header">{{ $t('__content') }}</span>
                    <span>
                      {{ item.request_content }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="content">
                  <div class="wrap">
                    <div class="left">
                      <div class="item remark">
                        <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                        <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__operator') }}</span>
                        <span>{{ item.userNickName }}</span>
                      </div>
                      <div class="item">
                        <span class="header">IP</span>
                        <span>{{ item.ip }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__description') }}</span>
                        <span>{{ item.description }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__operationTime') }}</span>
                        <span>{{ item.created_at }}</span>
                      </div>
                      <div class="item">
                        <span class="header">Uri</span>
                        <span v-if="isAdminister">{{ item.uri }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__method') }}</span>
                        <span v-if="isAdminister">{{ item.method }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.open" class="wrap">
                    <div class="item">
                      <span class="header">{{ $t('__content') }}</span>
                      <span>
                        {{ item.request_content }}
                      </span>
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
import { operationLogSearch, operationLogExport } from '@/api/logManagement/operationLog'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { getFullDate, getFullDateString, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate';
import { mapGetters } from 'vuex'

const defaultForm = {
  searchTime: getTodayDateTime()
}

export default {
  name: 'OperationLog',
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
      showDetail: false
    }
  },
  computed: {
    ...mapGetters([
      'isAdminister'
    ])
  },
  watch: {
    'searchForm.searchTime': function() {
      this.$nextTick(() => {
        this.handleCurrentChange(1)
      })
    }
  },
  created() {
    this.searchForm = JSON.parse(JSON.stringify(defaultForm));
    this.handleCurrentChange(this.currentPage)
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    onReset() {
      this.searchForm = JSON.parse(JSON.stringify(defaultForm))
      this.handleCurrentChange(1)
    },
    handleRequest(data) {
      this.dataLoading = true
      if (!data.searchTime) {
        data.searchTime = JSON.parse(JSON.stringify(defaultForm)).searchTime
      }
      for (let i = 0, max = data.searchTime.length; i < max; i++) {
        data.searchTime[i] = getFullDate(data.searchTime[i])
      }
    },
    handleRespone(res) {
      this.tableData = res.rows
      this.showDetail = res.showDetail
      this.totalCount = res.totalCount
      this.dataLoading = false
    },
    onSubmit() {
      this.searchForm.page = this.currentPage
      this.searchForm.rowsCount = this.pageSize
      this.handleRequest(this.searchForm)
      operationLogSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onExportBtnClick() {
      this.dataLoading = true
      this.handleRequest(this.searchForm)
      operationLogExport(this.searchForm).then((res) => {
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
        export_json_to_excel({ header: tHeader, data: data, filename: 'OperationLog_' + getFullDateString(new Date()) })
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
        .content {
          display: flex;
          flex-direction: column;
          .wrap {
            .left{
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }
          .wrap + .wrap {
            margin-top: 10px;
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
