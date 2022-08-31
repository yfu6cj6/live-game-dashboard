<template>
  <div>
    <template v-if="device === 'mobile'">
      <template v-if="tableData.length > 0">
        <div class="agent-group">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="w-100 items"
          >
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
                <router-link :to="`/agentBalanceReport/agentBalanceReport/${item.agentId}`">
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
                  <span>{{ item.subordinateAgentsBalanceLabel }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateMembersBalance') }}</span>
                <span class="value">
                  <span>{{ item.subordinateMembersBalanceLabel }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__unassignedBalance') }}</span>
                <span class="value">
                  <span>{{ item.balanceLabel }}</span>
                </span>
              </div>
              <div class="list-item d-flex align-items-start is-amount" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalBalance') }}</span>
                <span class="value">
                  <span>{{ item.totalBalanceLabel }}</span>
                </span>
              </div>
            </div>
            <div v-if="item.open" class="agent-list-detail list-row">
              <div class="list-item d-flex align-items-start" style="width: 50%; flex-wrap: wrap;">
                <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalPlayerCount') }}</span>
                <span class="value">
                  <span>{{ item.memberCountLabel }}</span>
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
                <span class="text-link text-golden">{{ $t("__subtotalCount") }}</span>
              </div>
              <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__totalBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.totalBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.subordinateAgentsBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.subordinateMembersBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__unassignedBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.balanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount text-left" style="margin-left: 10px;">
                  <span class="label">{{ $t("__totalPlayerCount") }}</span>
                  <span class="value">{{ subtotalInfo.memberCountLabel }}</span>
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
                    <span>{{ totalData.totalBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.subordinateAgentsBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.subordinateMembersBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__unassignedBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.balanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount text-left" style="margin-left: 10px;">
                  <span class="label">{{ $t("__totalPlayerCount") }}</span>
                  <span class="value">{{ totalData.memberCountLabel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-result">{{ $t('__noInformation') }}</div>
      </template>
    </template>
    <template v-else>
      <template v-if="tableData.length > 0">
        <div id="report-list" class="flex-nowrap report-list flex-fill bg-new-dark-white has-index">
          <div class="w-100">
            <div class="agent-group">
              <div
                v-for="(item, index) in tableData"
                :key="index"
                class="w-100 items report-list-item-row"
              >
                <div class="agent-list-basic list-row align-items-center">
                  <span>
                    <span class="index" style="font-size:17px!important;margin-top:-8.5px!important">{{ (index+1) }}</span>
                  </span>
                  <router-link :to="`/agentBalanceReport/agentBalanceReport/${item.agentId}`">
                    <div class="list-item d-flex align-items-center" style="width: 140px;">
                      <div class="d-flex align-items-center text-link">
                        <span class="icon user">
                          <div>
                            <svg-icon class="fas gold" icon-class="user" style="height: 1.33333rem; width: 1.33333rem;" />
                          </div>
                        </span>
                        <span class="value text-golden text-underline">{{ item.agent }}</span>
                      </div>
                    </div>
                  </router-link>
                  <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                    <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateAgentsBalance') }}</span>
                    <span class="value">
                      <span>{{ item.subordinateAgentsBalanceLabel }}</span>
                    </span>
                  </div>
                  <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                    <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__subordinateMembersBalance') }}</span>
                    <span class="value">
                      <span>{{ item.subordinateMembersBalanceLabel }}</span>
                    </span>
                  </div>
                  <div class="list-item d-flex align-items-start is-amount" style="width: 220px; flex-wrap: wrap;">
                    <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__unassignedBalance') }}</span>
                    <span class="value">
                      <span>{{ item.balanceLabel }}</span>
                    </span>
                  </div>
                  <div class="list-item d-flex align-items-start is-amount" style="width: 160px; flex-wrap: wrap;">
                    <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalBalance') }}</span>
                    <span class="value">
                      <span>{{ item.totalBalanceLabel }}</span>
                    </span>
                  </div>
                  <div class="list-item d-flex align-items-start" style="margin-left: 10px; width: 150px; flex-wrap: wrap;">
                    <span class="label" style="width: 100%; padding-bottom: 0.5rem;">{{ $t('__totalPlayerCount') }}</span>
                    <span class="value">
                      <span>{{ item.memberCountLabel }}</span>
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
        <div class="page-total">
          <div class="w-100 list-row">
            <div class="list-item">
              <div class="name list-sub-item d-flex align-items-center">
                <span class="text-golden">{{ $t("__subtotalCount") }}</span>
              </div>
              <div class="item-content list-sub-item d-flex flex-nowrap align-items-end">
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__totalBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.totalBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.subordinateAgentsBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.subordinateMembersBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__unassignedBalance") }}</span>
                  <span class="value">
                    <span>{{ subtotalInfo.balanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 text-left" style="margin-left: 10px;">
                  <span class="label" style="width: 100%;">{{ $t("__totalPlayerCount") }}</span>
                  <span class="value">{{ subtotalInfo.memberCountLabel }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-100 list-row">
            <div class="list-item">
              <div class="name list-sub-item d-flex align-items-center">
                <span class="text-golden">{{ $t("__totalCount") }}</span>
              </div>
              <div class="item-content list-sub-item d-flex flex-nowrap align-items-end">
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__totalBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.totalBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateAgentsBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.subordinateAgentsBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__subordinateMembersBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.subordinateMembersBalanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 is-amount">
                  <span class="label">{{ $t("__unassignedBalance") }}</span>
                  <span class="value">
                    <span>{{ totalData.balanceLabel }}</span>
                  </span>
                </div>
                <div class="page-item mb-2 text-left" style="margin-left: 10px;">
                  <span class="label" style="width: 100%;">{{ $t("__totalPlayerCount") }}</span>
                  <span class="value">{{ totalData.memberCountLabel }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-100 list-row" />
          <div class="w-100 list-row" />
        </div>
      </template>
      <template v-else>
        <div class="no-result">{{ $t('__noInformation') }}</div>
      </template>
    </template>
  </div>
</template>

<script>
import { agentBalanceReportSearch } from '@/api/agentBalanceReport/agent'
import handlePageChange from '@/mixin/handlePageChange';
import { numberFormat } from '@/utils/numberFormat'
import viewCommon from '@/mixin/viewCommon';
import Pagination from '@/components/Pagination'

export default {
  name: 'Agent',
  components: { Pagination },
  mixins: [viewCommon, handlePageChange],
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
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.agentId === row.agentId);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
      })
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
          element.balanceLabel = element.balance === '-' ? element.balance : numberFormat(element.balance)
          element.memberCountLabel = numberFormat(element.memberCount, 0)
          element.subordinateAgentsBalanceLabel = numberFormat(element.subordinateAgentsBalance)
          element.subordinateMembersBalanceLabel = numberFormat(element.subordinateMembersBalance)
          element.totalBalanceLabel = numberFormat(element.totalBalance)

          element.open = open.includes(element.agentId)
        });
        this.tableData = res.rows.slice(0, res.rows.length - 2)
        this.subtotalInfo = res.subtotalInfo
        this.subtotalInfo.balanceLabel = this.subtotalInfo.balance === '-' ? this.subtotalInfo.balance : numberFormat(this.subtotalInfo.balance)
        this.subtotalInfo.memberCountLabel = numberFormat(this.subtotalInfo.memberCount, 0)
        this.subtotalInfo.subordinateAgentsBalanceLabel = numberFormat(this.subtotalInfo.subordinateAgentsBalance)
        this.subtotalInfo.subordinateMembersBalanceLabel = numberFormat(this.subtotalInfo.subordinateMembersBalance)
        this.subtotalInfo.totalBalanceLabel = numberFormat(this.subtotalInfo.totalBalance)

        this.totalData = res.totalData
        this.totalData.balanceLabel = this.totalData.balance === '-' ? this.totalData.balance : numberFormat(this.totalData.balance)
        this.totalData.memberCountLabel = numberFormat(this.totalData.memberCount, 0)
        this.totalData.subordinateAgentsBalanceLabel = numberFormat(this.totalData.subordinateAgentsBalance)
        this.totalData.subordinateMembersBalanceLabel = numberFormat(this.totalData.subordinateMembersBalance)
        this.totalData.totalBalanceLabel = numberFormat(this.totalData.totalBalance)

        this.totalCount = res.totalCount
        this.$emit('handleRespone', JSON.parse(JSON.stringify(res.agentInfo)))
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    setDataLoading(loading) {
      this.$emit('setDataLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
#app.mobile {
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
}
#app.pc {
  .page-total {
    background-color: #e9e9e9;
    padding: 10px 15px;
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
      width: 180px;
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
    }
    .list-sub-item {
      margin-top: 0.83333rem;
      &.name {
        font-weight: bold;
        font-size: 1.16667rem;
        width: 100% !important;
        padding-bottom: 0.41667rem;
        border-bottom: 0.08333rem solid #ce9600;
      }
    }
  }
}
</style>
