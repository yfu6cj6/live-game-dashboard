<template>
  <div>
    <div class="agent-group">
      <div
        v-for="(item, index) in tableData"
        :key="index"
        class="agent-group none-group"
        :class="{even: (index % 2 === 0), odd: (index % 2 !== 0)}"
      >
        <div class="w-100 items">
          <div class="ctrl">
            <div class="item-inner">
              <div class="fas text-gray">
                <div :class="{'d-none': agentInfo.open}">
                  <svg-icon class="fas text-gray" icon-class="more" style="height: 2.5rem; width: 2.5rem;" />
                </div>
                <div :class="{'d-none': !agentInfo.open}">
                  <svg-icon class="fas text-gray" icon-class="up" style="height: 2.33333rem; width: 2.33333rem;" />
                </div>
              </div>
            </div>
          </div>
          <div class="agent-list-basic list-row">
            <div class="list-item d-flex align-items-center" style="width: 100%;">
              <div class="d-flex align-items-center">
                <span class="icon user">
                  <div class="fas gold">
                    <svg-icon class="fas text-gray" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                  </div>
                </span>
                <span class="value text-golden text-underline">{{ tableData.agent }}</span>
              </div>
            </div>
            <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
              <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subAgentTotalBalance') }}</span>




              
            </div>
            <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;"></div>
            <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;"></div>
            <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;"></div>
          </div>
          <div class="agent-list-detail list-row"></div>
          <div class="agent-break-line" />
        </div>
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
