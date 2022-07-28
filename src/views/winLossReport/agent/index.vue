<template>
  <div>
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
              <div class="wrap" @click="remarkExpand(item)">
                <div class="expand">
                  <svg-icon v-if="item.open" icon-class="up" @click.stop="remarkExpand(item)" />
                  <svg-icon v-else icon-class="more" @click.stop="remarkExpand(item)" />
                </div>
                <div>
                  <svg-icon icon-class="user" />
                  <router-link :to="`/winLossReport/winLossReport/${item.agentId}?searchTime=${searchTime}`">
                    <el-button class="bg-normal stroke" size="mini">
                      {{ item.agent }}
                    </el-button>
                  </router-link>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__gameType')}` }}</span>
                  <span>{{ item.gameType }}</span>
                </div>
                <div class="wrap-layout">
                  <div class="left">
                    <div class="item">
                      <span class="header">{{ `${$t('__betAmount')}` }}</span>
                      <span class="content">{{ agentInfo.betAmount }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__winLoss')}` }}</span>
                      <span class="content">{{ agentInfo.winLoss }}</span>
                    </div>
                  </div>
                  <div class="right">
                    <div class="item">
                      <span class="header">{{ `${$t('__validBetAmount')}` }}</span>
                      <span class="content">{{ agentInfo.validBetAmount }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__winLossRate')}` }}</span>
                      <span class="content">{{ agentInfo.winLossRate }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="agentInfo.open" class="wrap-layout">
                  <div class="left">
                    <div class="item">
                      <span class="header">{{ `${$t('__rollingRate')}` }}</span>
                      <span class="content">{{ agentInfo.rollingRate }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__totalAmount')}` }}</span>
                      <span class="content">{{ agentInfo.netPL }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__toSuperior')}` }}</span>
                      <span class="content">{{ agentInfo.toSuperior }}</span>
                    </div>
                    <div class="item">
                      <div class="betMember" size="mini" @click.stop="onBetMemberCount()">
                        <span>{{ `${$t('__betMemberCount')} ` }}</span>
                        <span>{{ agentInfo.betMemberCount }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <div class="item">
                      <span class="header">{{ `${$t('__rollingCommission')}` }}</span>
                      <span class="content">{{ agentInfo.rollingCommission }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__commissionRate')}` }}</span>
                      <span class="content">{{ agentInfo.commissionRate }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__commitSuperiorsValidBetAmount')}` }}</span>
                      <span class="content">{{ agentInfo.commitSuperiorsValidBetAmount }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ `${$t('__myProfit')}` }}</span>
                      <span>{{ agentInfo.myProfit }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="wrap">
                <div class="item c0">
                  <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click.stop="remarkExpand(item)" />
                  <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click.stop="remarkExpand(item)" />
                </div>
                <div class="item c1">
                  <svg-icon icon-class="user" />
                  <router-link :to="`/winLossReport/winLossReport/${item.agentId}?searchTime=${searchTime}`">
                    <el-button class="bg-normal stroke" size="mini">
                      {{ item.agent }}
                    </el-button>
                  </router-link>
                </div>
                <div class="item c2">
                  <span class="header">{{ `${$t('__gameType')}` }}</span>
                  <span>{{ item.gameType }}</span>
                </div>
                <div class="item c3">
                  <span class="header">{{ `${$t('__betAmount')}` }}</span>
                  <span>{{ item.betAmount }}</span>
                </div>
                <div class="item c4">
                  <span class="header">{{ `${$t('__validBetAmount')}` }}</span>
                  <span>{{ item.validBetAmount }}</span>
                </div>
                <div class="item c5">
                  <span class="header">{{ `${$t('__winLoss')}` }}</span>
                  <span>{{ item.winLoss }}</span>
                </div>
                <div class="item c6">
                  <span class="header">{{ `${$t('__winLossRate')}` }}</span>
                  <span>{{ item.winLossRate }}</span>
                </div>
              </div>
              <div v-if="item.open" class="wrap">
                <div class="item c1">
                  <span class="header">{{ `${$t('__rollingRate')}` }}</span>
                  <span>{{ item.rollingRate }}</span>
                </div>
                <div class="item c2">
                  <span class="header">{{ `${$t('__rollingCommission')}` }}</span>
                  <span>{{ item.rollingCommission }}</span>
                </div>
                <div class="item c3">
                  <span class="header">{{ `${$t('__totalAmount')}` }}</span>
                  <span>{{ item.netPL }}</span>
                </div>
                <div class="item c4">
                  <span class="header">{{ `${$t('__commissionRate')}` }}</span>
                  <span>{{ item.commissionRate }}</span>
                </div>
                <div class="item c5">
                  <span class="header">{{ `${$t('__toSuperior')}` }}</span>
                  <span>{{ item.toSuperior }}</span>
                </div>
                <div class="item c6">
                  <span class="header">{{ `${$t('__commitSuperiorsValidBetAmount')}` }}</span>
                  <span>{{ item.commitSuperiorsValidBetAmount }}</span>
                </div>
              </div>
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
      agentId: null
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    searchTime() {
      const searchTime = []
      this.payoutTime.forEach(element => {
        searchTime.push(getFullDate(element))
      })
      return searchTime
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
    // 父物件呼叫
    onSearch(agentId) {
      this.agentId = agentId
      this.handleCurrentChange(this.currentPage)
    },
    onSubmit() {
      const data = {
        page: this.currentPage,
        rowsCount: this.pageSize,
        payoutTime: [],
        agentId: this.agentId
      }
      this.payoutTime.forEach(element => {
        data.payoutTime.push(getFullDate(element))
      })
      this.setDataLoading(true)
      agentWinLossReportSearch(data).then((res) => {
        this.tableData = res.rows
        this.tableData.forEach(element => {
          element.betAmount = numberFormat(element.betAmount)
          element.winLoss = numberFormat(element.winLoss)
          element.validBetAmount = numberFormat(element.validBetAmount)
          element.rollingCommission = numberFormat(element.rollingCommission)
          element.netPL = numberFormat(element.netPL)
          element.toSuperior = numberFormat(element.toSuperior)
          element.commitSuperiorsValidBetAmount = numberFormat(element.commitSuperiorsValidBetAmount)
        })
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
.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          flex-direction: column;
          position: relative;
          .group {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}

.expand {
  position: absolute;
  right: 0;
}

.stroke {
  padding: 0;
  font-size: 16px;
  color: #ce9600;
  font-weight: bold;
  border-bottom: 1px solid #ce9600;
  vertical-align: top;
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          .wrap {
            display: grid;
            grid-template-columns: 50px repeat(6, 1fr);
            grid-template-areas: "c0 c1 c2 c3 c4 c5 c6";
            .c0 {
              grid-area: c0;
            }
            .c1 {
              grid-area: c1;
            }
            .c2 {
              grid-area: c2;
            }
            .c3 {
              grid-area: c3;
            }
            .c4 {
              grid-area: c4;
            }
            .c5 {
              grid-area: c5;
            }
            .c6 {
              grid-area: c6;
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
</style>
