<template>
  <div v-loading="dataLoading" class="logManagement">
    <template v-if="device === 'mobile'">
      <div class="bg-black">
        <div class="search_frame">
          <div class="day_frame" @click.once="changeInitCalendarPage">
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
          </div>
          <div v-if="isAdminister" class="pad_frame">
            <el-input v-model="searchForm.ip" class="search_frame_size search_input" placeholder="IP" />
          </div>
          <div class="pad_frame">
            <el-input v-model="searchForm.description" class="search_frame_size search_input sp_search_frame" :placeholder="$t('__description')" />
            <el-button class="bg-yellow sp_search_btn" size="mini" @click.stop="search()">{{ $t("__search") }}</el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="bg-black">
        <div class="search_frame">
          <div class="day_frame" @click.once="changeInitCalendarPage">
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
          </div>
          <div v-if="isAdminister" class="pad_frame">
            <el-input v-model="searchForm.ip" class="search_frame_size search_input" placeholder="IP" />
          </div>
          <div class="pad_frame">
            <el-input v-model="searchForm.description" class="search_frame_size search_input sp_search_frame" :placeholder="$t('__description')" />
            <el-button class="bg-yellow sp_search_btn" size="mini" @click.stop="search()">{{ $t("__search") }}</el-button>
          </div>
        </div>
      </div>
    </template>
    <div v-if="tableData.length > 0">
      <div
        v-for="(item, index) in tableData"
        :key="index"
        :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
      >
        <template v-if="device === 'mobile'">
          <div class="dataContent">
            <div class="base">
              <span class="number">{{ (index+1) }}</span>
              <div class="d-flex info">
                <div class="field">
                  <span class="title">{{ $t('__operator') }}</span>
                  <span class="news">{{ item.userNickName }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__operationTime') }}</span>
                  <span class="news">{{ item.created_at }}</span>
                </div>
                <div class="field">
                  <span class="title line_height">{{ $t('__description') }}</span>
                  <span class="news line_height">{{ item.description }}</span>
                </div>
                <div v-if="isAdminister" :class="{'moreopen': !item.open, 'moreclose': item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" icon-class="up" />
                  <svg-icon v-else icon-class="more" />
                </div>
              </div>
            </div>
            <div v-if="item.open && isAdminister" class="moreInfo">
              <div class="field">
                <span class="title">IP</span>
                <span class="news">{{ item.ip }}</span>
              </div>
              <div class="field">
                <span class="title">Uri</span>
                <span class="news">{{ item.uri }}</span>
              </div>
              <div class="field">
                <span class="title">{{ $t('__method') }}</span>
                <span class="news">{{ item.method }}</span>
              </div>
              <div class="field col">
                <span class="title">{{ $t('__content') }}</span>
                <span class="news">{{ item.request_content }}</span>
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
    </div>
    <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
  </div>
</template>

<script>
import { operationLogSearch, operationLogExport } from '@/api/logManagement/operationLog'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate, getFullDateString, getTodayDateTime } from '@/utils/transDate';
import { mapGetters } from 'vuex'

const defaultSearchTime = getTodayDateTime()

export default {
  name: 'OperationLog',
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      showDetail: false
    }
  },
  computed: {
    ...mapGetters([
      'isAdminister'
    ])
  },
  watch: { },
  created() {
    this.pageSizeCount = 1
    this.searchTime = defaultSearchTime
    this.handleCurrentChange(1)
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
      this.searchForm = {}
      this.pageSizeCount = 1;
      this.handleCurrentChange(1)
    },
    search() {
      this.pageSizeCount = 1;
      this.handleCurrentChange(1)
    },
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    handleRequest(data) {
      this.dataLoading = true
      if (!this.searchTime) {
        this.searchTime = defaultSearchTime
      }
      data.searchTime = []
      this.searchTime.forEach(element => {
        data.searchTime.push(getFullDate(element))
      })
    },
    handleRespone(res) {
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      res.rows.forEach(element => {
        element.open = open.includes(element.id)
      })
      this.tableData = res.rows;
      this.showDetail = res.showDetail
      this.totalCount = res.totalCount
      this.dataLoading = false
    },
    onSubmit() {
      this.searchForm.page = this.currentPage
      this.searchForm.rowsCount = this.pageSize * this.pageSizeCount
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

<style lang="scss">
.logManagement{
  overflow: auto;
  max-height: 100%;
  position: relative;
  .search_frame {
    padding-top: 1.5rem;
    border-bottom: 0.25rem solid #f9c901;
    flex-flow: wrap;
    .day_frame {
      padding: 0.41667rem 0.83333rem;
      .search_frame_size {
        display: flex;
        justify-content: space-evenly;
        .el-range-input {
          font-size: 1rem;
          padding: 0;
          margin: 0 0.1rem;
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
    }
    .pad_frame {
      padding: 0.41667rem 0.83333rem 0.41667rem 0.83333rem;
    }
    .sp_search_frame {
      margin-right: 0.5rem;
    }
    .sp_search_btn {
      width: 5.3rem;
      height: 2.8rem;
      font-weight: bold;
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
  }
  .dataContent {
    padding-left: 4.16667rem;
    .base {
      display: flex;
      flex-direction: row;
      .number {
        font-size: 1.33333rem;
        font-weight: bolder;
        position: absolute;
        top: 50%;
        margin-top: -0.83333rem;
        left: 0rem;
        width: 4.16667rem;
        text-align: center;
      }
      .info {
        width: 90%;
        display: flex;
        flex-direction: column;
      }
    }
    .field {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      margin-top: 0.3rem;
      word-break: break-all;
      padding-right: 0.41667rem;
      padding-top: 0.41667rem;
      padding-bottom: 0.41667rem;
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
      .news {
        font-size: 1.16667rem;
        font-weight: bold;
        word-break: break-all;
        color: #2c3e50;
        &.line_height {
          line-height: 1.5;
        }
      }
    }
    .moreopen {
      position: absolute;
      top: 0.83333rem;
      right: 1.3rem;
      .svg-icon {
        fill: #a3a3a3;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .moreclose {
      position: absolute;
      top: 24.33333rem;
      right: 1.33rem;
      .svg-icon {
        fill: #a3a3a3;
        width: 2.333rem;
        height: 2.333rem;
      }
    }
  }
  .even-row {
    position: relative;
    background-color: #fff;
    padding: 0.625rem 1.16667rem 0.625rem 0;
  }
  .odd-row {
    position: relative;
    background-color: #f4f4f4;
    padding: 0.625rem 1.16667rem 0.625rem 0;
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
}

@media (min-width: 992px) {
  .logManagement {
    .search_frame {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
