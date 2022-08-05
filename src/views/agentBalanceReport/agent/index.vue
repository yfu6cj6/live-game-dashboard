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
              <div class="left">
                <div class="item">
                  <span class="header">{{ $t('__agent') }}</span>
                  <template slot-scope="scope">
                    <router-link v-if="scope.$index < tableData.length - 2" :to="`/agentBalanceReport/agentBalanceReport/${scope.row.agentId}`">
                      <el-button class="agentBtn" size="mini">
                        {{ scope.row.agent }}
                      </el-button>
                    </router-link>
                    <span v-else>{{ scope.row.agent }}</span>
                  </template>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__subordinateAgentsBalance') }}</span>
                  <span class="content">{{ item.subordinateAgentsBalance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__subordinateMembersBalance') }}</span>
                  <span class="content">{{ item.subordinateMembersBalance }}</span>
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="header">{{ $t('__unassignedBalance') }}</span>
                  <span class="content">{{ item.balance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalBalance') }}</span>
                  <span class="content">{{ item.totalBalance }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__totalPlayerCount') }}</span>
                  <span class="content">{{ item.memberCount }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              -
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
        @current-change="handlePageChangeByClient"
      />
    </div>
  </div>
</template>

<script>
import { agentBalanceReportSearch } from '@/api/agentBalanceReport/agent'
import handlePageChange from '@/mixin/handlePageChange';
import { numberFormat } from '@/utils/numberFormat'
export default {
  name: 'Agent',
  mixins: [handlePageChange],
  props: {
    'viewHeight': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      agentId: 0
    }
  },
  methods: {
    numberFormatStr(number) {
      return numberFormat(number)
    },
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
        agentId: this.agentId
      }
      this.setDataLoading(true)
      agentBalanceReportSearch(data).then((res) => {
        this.tableData = res.rows
        this.totalCount = res.totalCount
        this.$emit('handleRespone', JSON.parse(JSON.stringify(res.agentInfo)))
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

<style lang="scss" scoped>
</style>
