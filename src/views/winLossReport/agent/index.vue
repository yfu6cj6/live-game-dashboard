<template>
  <div>
    <div class="profit-list">
      <div>
        <template v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="agent-group none-group"
            :class="{even: (index % 2 === 0), odd: (index % 2 !== 0)}"
          >
            <div class="groups">
              <div class="w-100 d-flex list-row in-group">
                <div class="list-item info">
                  <div class="name list-sub-item d-flex align-items-center">
                    <span class="icon">
                      <div class="fas gold">
                        <svg-icon icon-class="user" style="height: 1.5rem;width: 1.5rem;" />
                      </div>
                    </span>
                    <span>
                      <router-link :to="`/winLossReport/winLossReport/${item.agentId}`">
                        <span class="text-link text-underline" @click.stop="setSearchTime(item.agentId)">{{ item.agent }}</span>
                      </router-link>
                      <span>
                        {{ `[${$t('__level')}:` }}
                        <span class="text-link">{{ `${$t('__agent')}]` }}</span>
                      </span>
                    </span>
                  </div>
                  <div class="agent-list-detail">
                    <div class="game-halls">
                      <div v-if="item.open" class="halls">
                        <div class="halls-row d-flex">
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span class="hall-name">{{ $t('__liveGame') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end" />
                            </div>
                          </div>
                        </div>
                        <div class="halls-row d-flex">
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__betAmount') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ item.betAmount }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__validBetAmount') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ item.validBetAmount }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="halls-row d-flex">
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span class="text-parent">none</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span style="word-break: keep-all; white-space: nowrap;">
                                  <span
                                    :class="{
                                      'text-red': (((item.netPL === 0 || item.netPL === '-') && Number(item.winLossRate) > 0) || item.netPL > 0),
                                      'text-blue': (((item.netPL === 0 || item.netPL === '-') && Number(item.winLossRate) < 0) || item.netPL < 0)}"
                                  >
                                    {{ item.winLossRateLabel }}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__result') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span :class="{'text-red': item.winLoss > 0, 'text-blue': item.winLoss < 0}">{{ item.winLossLabel }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="halls-row d-flex">
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ `${$t('__rollingRate')}%` }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span style="word-break: keep-all; white-space: nowrap;">
                                  <span>{{ item.rollingCommissionLabel }}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__rollingCommission') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span :class="{'text-red': Number(item.rollingCommission) > 0, 'text-blue': Number(item.rollingCommission) < 0}">{{ item.rollingCommissionLabel }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="halls-row d-flex align-items-end">
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ `${$t('__rate')}%` }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>
                                  <span>{{ item.commissionRate }}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="halls-col">
                            <div class="halls-label">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__totalAmount') }}</span>
                              </div>
                            </div>
                            <div class="halls-value">
                              <div class="d-flex align-items-center justify-content-end">
                                <span :class="{'text-red': Number(item.netPL) > 0, 'text-blue': Number(item.netPL) < 0}">{{ item.netPLLabel }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="halls-row d-flex">
                          <div class="halls-col align-items-end">
                            <div class="halls-label text-right">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                              </div>
                            </div>
                            <div class="halls-value text-right">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>
                                  <span>{{ item.commitSuperiorsValidBetAmount }}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="halls-col align-items-end">
                            <div class="halls-label text-right">
                              <div class="d-flex align-items-center justify-content-end">
                                <span>{{ $t('__toSuperior') }}</span>
                              </div>
                            </div>
                            <div class="halls-value text-right">
                              <div class="d-flex align-items-center justify-content-end">
                                <span :class="{'text-red': Number(item.toSuperior) > 0, 'text-blue': Number(item.toSuperior) < 0}">{{ item.toSuperiorLabel }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="item.open" class="bottom-line" />
                    </div>
                    <div class="list-sub-item d-flex align-items-center">
                      <div class="list-sub-item-col text-right">
                        <span class="label">{{ $t('__validBetAmount') }}</span>
                        <span class="value">
                          <span>{{ item.validBetAmount }}</span>
                        </span>
                      </div>
                      <div class="win-loss list-sub-item-col text-right">
                        <div class="to-superiors">
                          <span class="label">{{ $t('__result') }}</span>
                          <span class="value" style="position: relative;">
                            <span :class="{'text-red': item.winLoss > 0, 'text-blue': item.winLoss < 0}">{{ item.winLossLabel }}</span>
                            <span class="w-rate">
                              <span
                                :class="{
                                  'text-red': (((item.netPL === 0 || item.netPL === '-') && Number(item.winLossRate) > 0) || item.netPL > 0),
                                  'text-blue': (((item.netPL === 0 || item.netPL === '-') && Number(item.winLossRate) < 0) || item.netPL < 0)}"
                              >
                                {{ item.winLossRateLabel }}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div class="list-sub-item-icon-col-with-icon">
                        <div class="ctrl" :class="{'exp': item.open}" @click.stop="remarkExpand(item)">
                          <div class="item-inner">
                            <div :class="{'d-none': item.open}">
                              <svg-icon class="fas text-gray" icon-class="more" style="height: 2.16667rem;width: 2.16667rem;" />
                            </div>
                            <div :class="{'d-none': !item.open}">
                              <svg-icon class="fas text-gray" icon-class="up" style="height: 1.83333rem;width: 1.83333rem;" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="list-sub-item d-flex align-items-end">
                      <div class="win-loss list-sub-item-col text-right">
                        <span class="label">{{ $t('__rollingCommission') }}</span>
                        <span class="value">
                          <span :class="{'text-red': Number(item.rollingCommission) > 0, 'text-blue': Number(item.rollingCommission) < 0}">{{ item.rollingCommissionLabel }}</span>
                        </span>
                      </div>
                      <div class="to-superiors list-sub-item-col text-right">
                        <div class="to-superiors">
                          <span class="label">{{ $t('__totalAmount') }}</span>
                          <span class="value">
                            <span :class="{'text-red': Number(item.netPL) > 0, 'text-blue': Number(item.netPL) < 0}">{{ item.netPLLabel }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="list-sub-item d-flex align-items-end">
                      <div class="win-loss list-sub-item-col text-right">
                        <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
                        <span class="value">
                          <span>{{ item.commitSuperiorsValidBetAmount }}</span>
                        </span>
                      </div>
                      <div class="to-superiors list-sub-item-col text-right">
                        <div class="to-superiors">
                          <span class="label">{{ $t('__toSuperior') }}</span>
                          <span class="value">
                            <span :class="{'text-red': Number(item.toSuperior) > 0, 'text-blue': Number(item.toSuperior) < 0}">{{ item.toSuperiorLabel }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </template>
        <div v-else class="no-result">{{ $t('__noInformation') }}</div>
      </div>
    </div>
    <div v-if="tableData.length > 0" class="page-total">
      <div class="w-100 list-row">
        <div class="list-item">
          <div class="name list-sub-item d-flex align-items-center">
            <span class="text-link text-golden">{{ $t('__subtotalCount') }}</span>
          </div>
          <div class="item-content list-sub-item d-flex flex-wrap align-items-end">
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__validBetAmount') }}</span>
              <span class="value">
                <span>{{ subtotalCountData.validBetAmount }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__totalAmount') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(subtotalCountData.netPL) > 0, 'text-blue': Number(subtotalCountData.netPL) < 0}">{{ subtotalCountData.netPLLabel }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
              <span class="value">
                <span>{{ subtotalCountData.commitSuperiorsValidBetAmount }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__toSuperior') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(subtotalCountData.toSuperior) > 0, 'text-blue': Number(subtotalCountData.toSuperior) < 0}">{{ subtotalCountData.toSuperiorLabel }}</span>
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
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__validBetAmount') }}</span>
              <span class="value">
                <span>{{ totalCountData.validBetAmount }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__totalAmount') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(totalCountData.netPL) > 0, 'text-blue': Number(totalCountData.netPL) < 0}">{{ totalCountData.netPLLabel }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__commitSuperiorsValidBetAmount') }}</span>
              <span class="value">
                <span>{{ totalCountData.commitSuperiorsValidBetAmount }}</span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__toSuperior') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(totalCountData.toSuperior) > 0, 'text-blue': Number(totalCountData.toSuperior) < 0}">{{ totalCountData.toSuperiorLabel }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { agentWinLossReportSearch } from '@/api/winLossReport/agent'
import handlePageChange from '@/mixin/handlePageChange'
import { getFullDate } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'
import { mapGetters } from 'vuex';

export default {
  name: 'Agent',
  mixins: [handlePageChange],
  props: {
    'payoutTime': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      agentId: null,
      subtotalCountData: {},
      totalCountData: {}
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ])
  },
  methods: {
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1)
    },
    setSearchTime(agentId) {
      localStorage.setItem(`winLossReportSearchTime${agentId}`, this.payoutTime.toString())
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.agentId === row.agentId);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
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
        payoutTime: [],
        agentId: this.agentId
      }
      this.payoutTime.forEach(element => {
        data.payoutTime.push(getFullDate(element))
      })
      this.setDataLoading(true)
      agentWinLossReportSearch(data).then((res) => {
        res.rows.forEach(element => {
          element.betAmount = numberFormat(element.betAmount)
          element.winLossLabel = numberFormat(element.winLoss)
          element.winLossRateLabel = `${numberFormat(element.winLossRate)}%`
          element.validBetAmount = numberFormat(element.validBetAmount)
          element.rollingCommissionLabel = numberFormat(element.rollingCommission)
          element.netPLLabel = numberFormat(element.netPL)
          element.toSuperiorLabel = numberFormat(element.toSuperior)
          element.commitSuperiorsValidBetAmount = numberFormat(element.commitSuperiorsValidBetAmount)
        })
        this.tableData = res.rows.slice(0, res.rows.length - 2)
        this.subtotalCountData = res.rows[res.rows.length - 2]
        this.totalCountData = res.rows[res.rows.length - 1]
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

#app .profit-report .profit-list {
    background-color: transparent;
}

</style>
