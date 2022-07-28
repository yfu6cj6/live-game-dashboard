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
                  <router-link :to="`/memberBet/memberBet/${item.member_id}?searchTime=${searchTime}`">
                    <el-button class="bg-normal stroke" size="mini">
                      {{ item.member }}
                    </el-button>
                  </router-link>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__gameType')}` }}</span>
                  <span class="content">{{ item.gameType }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__betAmount')}` }}</span>
                  <span class="content">{{ item.betAmount }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__winLoss')}` }}</span>
                  <span class="content">{{ item.winLoss }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__winLossRate')}` }}</span>
                  <span class="content">{{ item.winLossRate }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__validBetAmount')}` }}</span>
                  <span class="content">{{ item.validBetAmount }}</span>
                </div>
                <template v-if="item.open">
                  <div class="item">
                    <span class="header">{{ `${$t('__rollingRate')}` }}</span>
                    <span class="content">{{ item.rollingRate }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__rollingCommission')}` }}</span>
                    <span class="content">{{ item.rollingCommission }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ `${$t('__totalAmount')}` }}</span>
                    <span class="content">{{ item.netPL }}</span>
                  </div>
                </template>
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
      const obj = this.tableData.find(item => item.member === row.member);
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
      memberWinLossReportSearch(data).then((res) => {
        this.tableData = res.rows
        this.tableData.forEach(element => {
          element.betAmount = numberFormat(element.betAmount)
          element.winLoss = numberFormat(element.winLoss)
          element.validBetAmount = numberFormat(element.validBetAmount)
          element.rollingCommission = numberFormat(element.rollingCommission)
          element.netPL = numberFormat(element.netPL)
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

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          position: relative;
          .item {
            .header {
              width: 50%;
            }
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
</style>
