<template>
  <div v-if="visible" class="memberInfoDialog" :style="`top: ${top}px; left: ${left}px;`">
    <div class="pop-over bg-black">
      <div class="panel flex-column">
        <div
          class="fas icon-close text-link yellow"
          style="height: 1.77778rem; width: 1.77778rem;"
          @click.stop="onClose"
        >
          <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" />
        </div>
        <div class="d-flex flex-nowrap">
          <div v-loading="memberInfoLoading" class="agent-tree-detail">
            <div class="d-flex flex-column padding-left">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <span class="title-item" style="width: 155px;">{{ $t('__balance') }}</span>
                  <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ memberInfo.balanceLabel }}</span>
                </div>
                <div class="d-flex flex-column">
                  <span class="title-item" style="width: 155px;">{{ $t('__currency') }}</span>
                  <span class="content-item mt-2" style="width: 155px;">{{ memberInfo.currency }}</span>
                </div>
                <div class="d-flex flex-column handicaps-item is-float">
                  <span class="title-item" style="width: 80px; margin-left: 0px;">{{ $t('__handicapLimit') }}</span>
                  <div class="content-item d-flex flex-column">
                    <span
                      v-for="(handicap, index) in memberInfo.handicaps"
                      :key="index"
                      class="content-item mt-2"
                      style="width: auto !important; margin-left: 0px;"
                    >{{ `${handicap.nickname} (` }}<span class="content-item mt-2">{{ handicap.betMinLabel }}</span>{{ ` - ` }}<span class="content-item mt-2">{{ handicap.betMaxLabel }}</span>{{ `)` }}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div class="d-flex">
                  <div class="d-flex flex-column game-hall mt-4">
                    <div class="d-flex" style="width: 155px;">
                      <div class="d-flex flex-column">
                        <div>
                          <div class="game-hall-item" />
                          <span class="title-item">{{ $t('__liveGame') }}</span>
                        </div>
                        <div class="d-flex flex-column game-hall-item">
                          <div class="d-flex flex-column mt-2" style="width: 155px;">
                            <span class="game-hall-item" />
                            <span class="sub-title-item gray" style="flex: 1 1 0%;">{{ `${$t('__rollingRate')}%` }}</span>
                            <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ `${memberInfo.liveRollingRateLabel}%` }}</span>
                            <span class="game-hall-item" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="d-flex">
                    <div class="d-flex flex-column" style="width: 155px;">
                      <div class="d-flex flex-column">
                        <span class="title-item">
                          {{ `${$t('__maxWinAmountLimit')}[` }}<span v-if="memberInfo.maxWinAmountExceeded" class="text-white">{{ `${$t('__exceeded')}` }}</span><span v-else class="text-white">{{ `${$t('__noExceeded')}` }}</span>{{ `]` }}
                        </span>
                        <span class="content-item mt-2" style="flex: 1 1 0%;">{{ checkInfo(memberInfo.max_win_amount_limit) }}</span>
                      </div>
                      <div class="d-flex flex-column mt-4">
                        <span class="title-item">
                          {{ `${$t('__maxLoseAmountLimit')}[` }}<span v-if="memberInfo.maxLoseAmountExceeded" class="text-white">{{ `${$t('__exceeded')}` }}</span><span v-else class="text-white">{{ `${$t('__noExceeded')}` }}</span>{{ `]` }}
                        </span>
                        <span class="content-item mt-2" style="flex: 2 1 0%;">{{ checkInfo(memberInfo.max_lose_amount_limit) }}</span>
                      </div>
                    </div>
                    <div class="d-flex flex-column" style="width: 155px;">
                      <div class="d-flex flex-column">
                        <span class="title-item">{{ $t('__totalValidBetAmount') }}</span>
                        <span class="content-item mt-2" style="flex: 1 1 0%;">{{ memberInfo.totalValidBetAmountLabel }}</span>
                      </div>
                      <div class="d-flex flex-column mt-4">
                        <span class="title-item">{{ $t('__totalPayout') }}</span>
                        <div class="pt-2">
                          <span
                            class="d-block content-item w-100 pr-1"
                            :class="{ 'text-red': memberInfo.total_payout > 0, 'text-blue': memberInfo.total_payout < 0 }"
                          >
                            {{ memberInfo.totalPayoutLabel }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4" />
              </div>
              <div class="d-flex flex-column" style="max-width: 390px;">
                <span class="title-item" style="width: 50%; flex: 0 0 auto;">{{ $t('__status') }}</span>
                <div class="d-flex flex-wrap">
                  <div v-if="!isAgentSubAccount" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': memberInfo.lockLogin}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__lockLogin') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-disabled': parentAgentInfo.debarBet, 'is-checked': memberInfo.debarBet}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__debarBet') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount && parentAgentInfo.weeklyLossSettlement" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': memberInfo.weeklyLossSettlement}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__weeklyLossSettlement') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount && parentAgentInfo.giftEffect" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': memberInfo.giftEffect}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__giftEffect') }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="d-flex flex-column stateItem">
                  <span class="title-item mt-4">{{ $t('__createdAt') }}</span>
                  <span class="content-item mt-2">{{ memberInfo.created_at }}</span>
                </div>
                <div class="d-flex flex-column stateItem">
                  <span class="title-item mt-4">{{ $t('__lastLoginAt') }}</span>
                  <span class="content-item mt-2">{{ memberInfo.lastLoginAt }}</span>
                </div>
                <div class="d-flex flex-column stateItem">
                  <span class="title-item mt-4">{{ $t('__lastBetTime') }}</span>
                  <span class="content-item mt-2">{{ memberInfo.lastBetTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { mapGetters } from 'vuex'
import { agentInfoSearch } from '@/api/agentManagement/agent'
import { memberInfoSearch, memberGetLastBetTime } from '@/api/agentManagement/member'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'MemberInfoDialog',
  components: { },
  mixins: [dialogCommon, common],
  props: {
    'visible': {
      type: Boolean,
      require: true
    },
    'agentId': {
      type: Number,
      require: true,
      default() {
        return NaN
      }
    },
    'memberId': {
      type: Number,
      require: true,
      default() {
        return NaN
      }
    },
    'clickClassName': {
      type: String,
      require: true,
      default() {
        return ''
      }
    }
  },
  data: function() {
    return {
      memberInfo: {},
      parentAgentInfo: {},
      memberInfoLoading: false,
      top: 0,
      left: 0
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount'
    ])
  },
  watch: {
    'visible': {
      handler() {
        if (this.visible) {
          this.$nextTick(() => {
            this.memberInfoSearch(this.agentId, this.memberId)
            const parentRect = this.$el.parentNode.getBoundingClientRect()
            const clickEl = document.querySelector(this.clickClassName)
            if (clickEl) {
              const clickElRect = clickEl.getBoundingClientRect()
              const top = clickElRect.top - parentRect.top + 30
              let setTop = top
              if ((setTop + 400) > parentRect.height) {
                setTop = setTop - 400 - 40
              }
              if (setTop < parentRect.top) {
                setTop = top
              }
              this.top = setTop
              this.left = clickElRect.left - parentRect.left + 30
            } else {
              this.top = 0
              this.left = 0
            }
          })
        } else {
          this.memberInfo = {}
          this.parentAgentInfo = {}
        }
      },
      immediate: true
    }
  },
  methods: {
    memberInfoSearch(agentId, memberId) {
      agentInfoSearch({ agentId: agentId }).then((res) => {
        this.parentAgentInfo = res
        this.parentAgentInfo.totallyDisabled = this.parentAgentInfo.totally_disabled === '1'
        this.parentAgentInfo.debarBet = this.parentAgentInfo.bet_status === '0'
        this.parentAgentInfo.lockLogin = this.parentAgentInfo.status === '0'
        this.parentAgentInfo.weeklyLossSettlement = this.parentAgentInfo.weekly_loss_settlement === '1'
        this.parentAgentInfo.oneClickRecycling = this.parentAgentInfo.one_click_recycling === '1'
        this.parentAgentInfo.giftEffect = this.parentAgentInfo.gift_status === '1'
        memberInfoSearch({ memberId: memberId }).then((res) => {
          this.memberInfo = res
          this.memberInfo.currency = this.memberInfo.currency.code
          this.memberInfo.time_zone = this.memberInfo.timeZone.id
          this.memberInfo.cityNameLabel = this.memberInfo.timeZone.city_name
          this.memberInfo.lockLogin = this.memberInfo.status === '0'
          this.memberInfo.debarBet = this.memberInfo.bet_status === '0'
          this.memberInfo.weeklyLossSettlement = this.memberInfo.weekly_loss_settlement === '1'
          this.memberInfo.giftEffect = this.memberInfo.gift_status === '1'
          this.memberInfo.isMute = this.memberInfo.mute === '1'
          this.memberInfo.weekPayoutLabel = numberFormat(this.memberInfo.week_payout)
          this.memberInfo.balanceLabel = numberFormat(this.memberInfo.balance)
          this.memberInfo.weekValidBetAmountLabel = numberFormat(this.memberInfo.week_valid_bet_amount)
          this.memberInfo.totalPayoutLabel = numberFormat(this.memberInfo.total_payout)
          this.memberInfo.totalValidBetAmountLabel = numberFormat(this.memberInfo.total_valid_bet_amount)
          this.memberInfo.liveRollingRateLabel = numberFormat(this.memberInfo.live_rolling_rate)
          this.memberInfo.lastLoginAt = this.memberInfo.lastLoginAt === '' ? '-' : this.memberInfo.lastLoginAt
          this.memberInfo.maxWinAmountExceeded = (this.memberInfo.max_win_amount_limit !== '0.00' && Number(this.memberInfo.max_win_amount_limit) < Number(this.memberInfo.total_payout))
          this.memberInfo.maxLoseAmountExceeded = (this.memberInfo.max_lose_amount_limit !== '0.00' && (this.memberInfo.weeklyLossSettlement ? -Number(this.memberInfo.max_lose_amount_limit) > Number(this.memberInfo.week_payout) : -Number(this.memberInfo.max_lose_amount_limit) > Number(this.memberInfo.total_payout)))
          this.memberInfo.handicaps.forEach(element => {
            element.betMinLabel = numberFormat(element.bet_min)
            element.betMaxLabel = numberFormat(element.bet_max)
          });
          memberGetLastBetTime({ member_id: memberId }).then((res) => {
            this.memberInfo.lastBetTime = res.lastBetTime
            this.$nextTick(() => {
              this.memberInfo = Object.assign({}, this.memberInfo)
            })
          }).catch(() => {})
        }).catch(() => {})
      }).catch(() => {})
    },
    checkInfo(info) {
      return (info === 0 || info === '0.00') ? this.$t('__noLimit') : numberFormat(info)
    }
  }
}
</script>

<style lang="scss" scoped>
.memberInfoDialog {
  position: absolute;
  z-index: 1;
  .stateItem {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5) {
      width: 155px;
    }
    &:nth-child(3),
    &:nth-child(6) {
      width: auto !important;
      margin-left: 0px;
    }
  }
  .agent-tree-detail {
    .handicaps-item {
      &.is-float {
        .content-item {
          height: 20px;
        }
      }
    }
}
}
</style>
