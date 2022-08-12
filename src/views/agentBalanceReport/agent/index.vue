<template>
  <div>
    <template v-if="tableData.length > 0">
      <div class="agent-group">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="agent-group none-group"
          :class="{even: (index % 2 === 0), odd: (index % 2 !== 0)}"
        >
          <div class="w-100 items">
            <div class="ctrl" :class="{'exp': item.open}" @click.stop="remarkExpand(item)">
              <div class="item-inner">
                <div class="fas text-gray">
                  <div :class="{'d-none': item.open}">
                    <svg-icon class="fas text-gray" icon-class="more" style="height: 2.5rem; width: 2.5rem;" />
                  </div>
                  <div :class="{'d-none': !item.open}">
                    <svg-icon class="fas text-gray" icon-class="up" style="height: 2.33333rem; width: 2.33333rem;" />
                  </div>
                </div>
              </div>
            </div>
            <div class="agent-list-basic list-row">
              <div class="list-item d-flex align-items-center" style="width: 100%;">
                <router-link v-if="index < tableData.length" :to="`/agentBalanceReport/agentBalanceReport/${item.agentId}`">
                  <div class="d-flex align-items-center">
                    <span class="icon user">
                      <div class="fas gold">
                        <svg-icon class="fas gold" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                      </div>
                    </span>
                    <span class="value text-golden text-underline">{{ item.agent }}</span>
                  </div>
                </router-link>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateAgentsBalance') }}</span>
                <span class="value">
                  <span>{{ item.subordinateAgentsBalance }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateMembersBalance') }}</span>
                <span class="value">
                  <span>{{ item.subordinateMembersBalance }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__unassignedBalance') }}</span>
                <span class="value">
                  <span>{{ item.balance }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalBalance') }}</span>
                <span class="value">
                  <span>{{ item.totalBalance }}</span>
                </span>
              </div>
            </div>
            <div v-if="item.open" class="agent-list-detail list-row">
              <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalPlayerCount') }}</span>
                <span class="value">
                  <span>{{ item.memberCount }}</span>
                </span>
              </div>
            </div>
            <div class="agent-break-line" />
          </div>
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
              <span class="text-link text-golden">{{ $t("__subtotalCount") }}</span>
            </div>
            <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__totalBalance") }}</span>
                <span class="value">
                  <span>{{ subtotalInfo.totalBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                <span class="value">
                  <span>{{ subtotalInfo.subordinateAgentsBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                <span class="value">
                  <span>{{ subtotalInfo.subordinateMembersBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__unassignedBalance") }}</span>
                <span class="value">
                  <span>{{ subtotalInfo.balance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount text-left" style="margin-left: 10px;">
                <span class="label">{{ $t("__totalPlayerCount") }}</span>
                <span class="value">{{ subtotalInfo.memberCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100 list-row">
          <div class="list-item">
            <div class="name list-sub-item d-flex align-items-center">
              <span class="text-link text-golden">{{ $t("__totalCount") }}</span>
            </div>
            <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__totalBalance") }}</span>
                <span class="value">
                  <span>{{ totalData.totalBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                <span class="value">
                  <span>{{ totalData.subordinateAgentsBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                <span class="value">
                  <span>{{ totalData.subordinateMembersBalance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount">
                <span class="label">{{ $t("__unassignedBalance") }}</span>
                <span class="value">
                  <span>{{ totalData.balance }}</span>
                </span>
              </div>
              <div class="page-item mb-2 is-amount text-left" style="margin-left: 10px;">
                <span class="label">{{ $t("__totalPlayerCount") }}</span>
                <span class="value">{{ totalData.memberCount }}</span>
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
      agentId: 0,
      subtotalInfo: {},
      totalData: {}
    }
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.agentId === row.agentId);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
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
      agentBalanceReportSearch(data).then((res) => {
        const open = this.tableData.filter(item => item.open).map(item => item.agentId)
        res.rows.forEach(element => {
          element.open = open.includes(element.agentId)
        });
        this.tableData = res.rows.slice(0, res.rows.length - 2)
        this.subtotalInfo = res.subtotalInfo
        this.totalData = res.totalData
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
