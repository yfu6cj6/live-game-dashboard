<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="item">
                <span class="header">{{ $t('__member') }}</span>
                <template slot-scope="scope">
                  <router-link v-if="scope.$index < tableData.length - 2" :to="`/giftRecord/giftRecord/${scope.row.member_id}?searchTime=${searchTime}`">
                    <el-button class="memberBtn" size="mini">
                      {{ item.member }}
                    </el-button>
                  </router-link>
                  <span v-else>{{ item.agent }}</span>
                </template>
              </div>
              <div class="item">
                <span class="header">{{ $t('__gameType') }}</span>
                <span class="content">{{ item.gameType }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__giftAmount') }}</span>
                <span class="content">{{ item.amount }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__giftValue') }}</span>
                <span class="content">{{ item.value }}</span>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>
        <div v-else class="no-result">{{ $t("__noInformation") }}</div>
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
import { memberGiftReportSearch } from '@/api/giftReport/member'
import handlePageChange from '@/mixin/handlePageChange';
import { getFullDate } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'Member',
  mixins: [handlePageChange],
  props: {
    'viewHeight': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'giftTime': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      agentId: null
    }
  },
  computed: {
    searchTime() {
      const searchTime = []
      this.giftTime.forEach(element => {
        searchTime.push(getFullDate(element))
      })
      return searchTime
    },
    memberWidth() {
      return this.calculateWidth(this.$t('__member'), 'member', 10, 35) + 'px'
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex >= this.tableData.length - 2) {
        return 'settlement'
      }
      if (rowIndex % 2 === 1) {
        return 'singleRow'
      }
      return ''
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.agentId = agentId
      this.handleCurrentChange(this.currentPage)
    },
    onSubmit() {
      const data = {
        page: this.currentPage,
        rowsCount: this.pageSize,
        giftTime: [],
        agentId: this.agentId
      }
      this.giftTime.forEach(element => {
        data.giftTime.push(getFullDate(element))
      })
      this.setDataLoading(true)
      memberGiftReportSearch(data).then((res) => {
        this.tableData = res.rows
        this.tableData.forEach(element => {
          element.value = numberFormat(element.value)
        })
        this.totalCount = res.totalCount
        this.$emit('handleRespone')
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    setDataLoading(dataLoading) {
      this.$emit('setDataLoading', dataLoading)
    }
  }
}
</script>

<style>
</style>
