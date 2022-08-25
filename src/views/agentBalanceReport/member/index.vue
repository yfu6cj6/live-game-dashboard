<template>
  <div>
    <template v-if="tableData.length > 0">
      <div class="agent-group">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="w-100 items"
        >
          <div class="agent-list-basic list-row">
            <div class="list-item d-flex align-items-center" style="width: 50%;">
              <div class="d-flex align-items-center">
                <span class="icon user">
                  <div class="fas gold">
                    <svg-icon class="fas gold" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                  </div>
                </span>
                <span class="value text-golden text-underline">{{ item.member }}</span>
              </div>
            </div>
            <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
              <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateAgentsBalance') }}</span>
              <span class="value">
                <span>{{ item.totalBalanceLabel }}</span>
              </span>
            </div>
          </div>
          <div class="agent-break-line" />
        </div>
      </div>
      <div v-if="totalCount > pageSize" class="text-center view-more-container bg-white">
        <template v-if="tableData.length >= totalCount">
          <span class="border-dark">{{ $t("__noMoreInformation") }}</span>
        </template>
        <template v-else>
          <span class="view-more border-bottom border-dark" @click.stop="moreInfo">{{ $t("__searchMoreValue") }}</span>
        </template>
      </div>
      <div class="page-total">
        <div class="w-100 list-row">
          <div class="list-item">
            <div class="name list-sub-item d-flex align-items-center">
              <span class="text-link text-golden">{{ $t('__subtotalCount') }}</span>
            </div>
            <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
              <div class="page-item mb-2 is-amount" style="width: 200px; margin-left: 175px;">
                <span class="label">{{ $t('__balance') }}</span>
                <span class="value">
                  <span>
                    <span>{{ subtotalInfo.totalBalanceLabel }}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100 list-row">
          <div class="list-item">
            <div class="name list-sub-item d-flex align-items-center">
              <span class="text-link text-golden">{{ $t('__totalCount') }}</span>
            </div>
            <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
              <div class="page-item mb-2 is-amount" style="width: 200px; margin-left: 175px;">
                <span class="label">{{ $t('__balance') }}</span>
                <span class="value">
                  <span>{{ totalData.totalBalanceLabel }}</span>
                </span>
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
</template>

<script>
import { memberBalanceReportSearch } from '@/api/agentBalanceReport/member'
import handlePageChange from '@/mixin/handlePageChange';
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
    }
  },
  data() {
    return {
      agentId: 0,
      subtotalInfo: {},
      totalData: {}
    }
  },
  methods: {
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.pageSizeCount = 1
      this.agentId = agentId
      this.handleCurrentChange(this.currentPage)
    },
    onSubmit() {
      const data = {
        page: this.currentPage,
        rowsCount: this.pageSize * this.pageSizeCount,
        agentId: this.agentId
      }
      this.setDataLoading(true)
      memberBalanceReportSearch(data).then((res) => {
        this.tableData = res.rows.slice(0, res.rows.length - 2)
        this.tableData.forEach(element => {
          element.totalBalanceLabel = numberFormat(element.totalBalance);
        });

        this.subtotalInfo = res.subtotalInfo
        this.subtotalInfo.totalBalanceLabel = numberFormat(this.subtotalInfo.totalBalance);
        this.totalData = res.totalData
        this.totalData.totalBalanceLabel = numberFormat(this.totalData.totalBalance);

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

<style lang="scss" scoped>
.page-total {
  background-color: #e9e9e9;
  padding: 0.83333rem 1.25rem;
  position: relative;
  .list-sub-item{
    margin-top: 0.83333rem;
    &.name {
      font-weight: bold;
      font-size: 1.16667rem;
      width: 100% !important;
      padding-bottom: 0.41667rem;
      border-bottom: 0.08333rem solid #ce9600;
      .text-link {
        font-weight: bold;
      }
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
    .value {
      font-weight: bold;
    }
  }
}
</style>
