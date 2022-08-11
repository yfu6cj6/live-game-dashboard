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
                      <router-link :to="`/memberBet/memberBet/${item.member_id}`">
                        <span class="text-link text-underline">{{ item.member }}</span>
                      </router-link>
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
                              <div class="d-flex align-items-center justify-content-end" />
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
              <span class="label">{{ $t('__result') }}</span>
              <span class="value" style="position: relative;">
                <span :class="{'text-red': subtotalCountData.winLoss > 0, 'text-blue': subtotalCountData.winLoss < 0}">{{ subtotalCountData.winLossLabel }}</span>
                <span class="w-rate">
                  <span
                    :class="{
                      'text-red': (((subtotalCountData.netPL === 0 || subtotalCountData.netPL === '-') && Number(subtotalCountData.winLossRate) > 0) || subtotalCountData.netPL > 0),
                      'text-blue': (((subtotalCountData.netPL === 0 || subtotalCountData.netPL === '-') && Number(subtotalCountData.winLossRate) < 0) || subtotalCountData.netPL < 0)}"
                  >
                    {{ subtotalCountData.winLossRateLabel }}
                  </span>
                </span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount" />
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__totalAmount') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(subtotalCountData.netPL) > 0, 'text-blue': Number(subtotalCountData.netPL) < 0}">{{ subtotalCountData.netPLLabel }}</span>
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
              <span class="label">{{ $t('__result') }}</span>
              <span class="value" style="position: relative;">
                <span :class="{'text-red': totalCountData.winLoss > 0, 'text-blue': totalCountData.winLoss < 0}">{{ totalCountData.winLossLabel }}</span>
                <span class="w-rate">
                  <span
                    :class="{
                      'text-red': (((totalCountData.netPL === 0 || totalCountData.netPL === '-') && Number(totalCountData.winLossRate) > 0) || totalCountData.netPL > 0),
                      'text-blue': (((totalCountData.netPL === 0 || totalCountData.netPL === '-') && Number(totalCountData.winLossRate) < 0) || totalCountData.netPL < 0)}"
                  >
                    {{ totalCountData.winLossRateLabel }}
                  </span>
                </span>
              </span>
            </div>
            <div class="page-item mb-2 is-amount" />
            <div class="page-item mb-2 is-amount">
              <span class="label">{{ $t('__totalAmount') }}</span>
              <span class="value">
                <span :class="{'text-red': Number(totalCountData.netPL) > 0, 'text-blue': Number(totalCountData.netPL) < 0}">{{ totalCountData.netPLLabel }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberWinLossReportSearch } from '@/api/winLossReport/member'
import handlePageChange from '@/mixin/handlePageChange'
import { getFullDate } from '@/utils/transDate'
import { numberFormat } from '@/utils/numberFormat'
import { mapGetters } from 'vuex';

export default {
  name: 'Member',
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
    setSearchTime(member_id) {
      localStorage.setItem(`memberBet${member_id}`, this.payoutTime.toString())
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.member === row.member);
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
      memberWinLossReportSearch(data).then((res) => {
        const open = this.tableData.filter(item => item.open).map(item => item.member_id)
        res.rows.forEach(element => {
          element.betAmount = numberFormat(element.betAmount)
          element.winLossLabel = numberFormat(element.winLoss)
          element.winLossRateLabel = `${numberFormat(element.winLossRate)}%`
          element.validBetAmount = numberFormat(element.validBetAmount)
          element.rollingCommissionLabel = numberFormat(element.rollingCommission)
          element.netPLLabel = numberFormat(element.netPL)
          element.open = open.includes(element.member_id)
        })
        this.tableData = res.rows.slice(0, res.rows.length - 2)
        this.subtotalCountData = res.rows[res.rows.length - 2]
        this.totalCountData = res.rows[res.rows.length - 1]
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

<style lang="scss" scoped>
.halls {
  margin-bottom: 0.41667rem;
  .halls-row {
    width: 100%;
    .halls-col {
      padding-right: 0.41667rem;
      padding-top: 0.41667rem;
      padding-bottom: 0.41667rem;
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 45%;
      .halls-label {
        width: 100%;
        padding-bottom: 0.5rem;
        color: #6e6e6e;
        word-break: break-word;
      }
      .halls-value {
        font-weight: bold;
        word-break: break-word;
        width: 100%;
      }
    }
    .hall-name {
      font-size: 1.08333rem;
      color: #000;
      font-weight: bold;
    }
  }
}

#app .profit-report {
  .profit-list {
    background-color: transparent;
  }
  .agent-group {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    background-color: transparent;
    &.odd {
      background-color: #e9e9e9;
    }
    .groups {
      padding: 0.83333rem;
      .in-group {
        background: #fff;
        margin-bottom: 1.25rem;
        -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
        box-shadow: 0px 1px 3px 1px #a6a6a6;
        padding: 0.08333rem 0.41667rem 0.41667rem 0.41667rem !important;
        .agent-list-detail {
          width: 100%;
        }
      }
      .ctrl {
        position: absolute;
        right: 0;
        top: 0.83333rem;
        z-index: 1;
        &.exp {
          top: auto !important;
          bottom: 0.83333rem;
        }
      }
    }
    &.none-group {
      .groups {
        padding: 0 0.83333rem 0.83333rem 0.83333rem;
        .in-group {
          margin-bottom: 0.41667rem;
        }
      }
    }
    &:first-child {
      &.none-group {
        .groups {
          padding: 0.83333rem;
        }
      }
    }
  }
  .list-row {
    padding-top: 0;
    padding-bottom: 0;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    .list-item {
      margin-top: 0.41667rem;
    }
  }
  .list-sub-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    word-break: break-word;
    margin-bottom: 0.83333rem;
    width: 100%;
    margin-top: 0.83333rem;
    .list-sub-item-col {
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      width: 45%;
      padding-right: 0.41667rem;
      .label {
        width: 100%;
        margin-right: 0.41667rem;
        color: #6e6e6e;
        width: 100%;
        display: block;
        padding-bottom: 0.5rem;
      }
      .value {
        width: 100%;
        font-weight: bold;
        width: 100%;
        display: block;
      }
      &.name {
        font-weight: bold;
        font-size: 1.16667rem;
        width: 100% !important;
        padding-bottom: 0.41667rem;
        border-bottom: 0.08333rem solid #ce9600;
      }
    }
    .w-rate {
      position: absolute;
      top: 2px;
      left: 100%;
      white-space: nowrap;
      word-break: keep-all;
      text-align: left;
      padding-left: 0.41667rem;
      -webkit-transform: scale(0.6);
      transform: scale(0.6);
      -webkit-transform-origin: left center;
      transform-origin: left center;
    }
  }
  .bottom-line {
    display: block;
    border-bottom: 0.08333rem solid #ddd;
    width: 85%;
    margin: 0.41667rem auto 0 auto;
    padding: 0rem 0.41667rem;
  }
}

.page-total {
  background-color: #e9e9e9;
  padding: 0.83333rem 1.25rem;
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
  }
}
</style>
