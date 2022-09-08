<template>
  <div v-if="visible" class="agentInfoDialog" :style="`top: ${top}px; left: ${left}px;`">
    <div class="pop-over bg-black">
      <div class="panel flex-column">
        <div
          class="fas icon-close text-link yellow"
          style="height: 1.77778rem; width: 1.77778rem;"
          @click.stop="onClose"
        >
          <svg
            id="close"
            data-name="close"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 47.971 47.971"
            style="height: 0.941176rem; width: 0.941176rem;"
            xml:space="preserve"
          >
            <g>
              <path
                d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,
                0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,
                3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,
                0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
              />
            </g>
          </svg>
        </div>
        <div class="d-flex flex-nowrap">
          <div class="b-right" style="padding: 15px 10px;">
            <div class="notice-tip text-yellow mb-1">{{ `${$t('__superior')} :` }}</div>
            <div>
              <div>
                <div class="bg-lightgray agent-tree is-superior">
                  <el-tree
                    v-loading="agentLevelLoading"
                    :data="agentLevel"
                    :props="agentLevelProps"
                    node-key="selected"
                    :render-content="renderContent"
                    :indent="8"
                    highlight-current
                    :expand-on-click-node="false"
                    default-expand-all
                    :current-node-key="1"
                    @node-click="handleNodeClick"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-loading="agentInfoLoading" class="agent-tree-detail">
            <div class="d-flex flex-column padding-left">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <span class="title-item" style="width: 155px;">{{ $t('__balance') }}</span>
                  <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ agentInfo.balanceLabel }}</span>
                </div>
                <div class="d-flex flex-column">
                  <span class="title-item" style="width: 155px;">{{ $t('__currency') }}</span>
                  <span class="content-item mt-2" style="width: 155px;">{{ agentInfo.currency }}</span>
                </div>
                <div class="d-flex flex-column">
                  <span class="title-item" style="width: 80px; margin-left: 0px;">{{ $t('__handicapLimit') }}</span>
                  <span class="content-item mt-2" style="width: 60px !important; margin-left: 0px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ agentInfo.handicaps_info }}</span>
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
                            <span class="game-hall-item gary" />
                            <span class="sub-title-item gray" style="flex: 1 1 0%;">{{ `${$t('__rate')}%` }}</span>
                            <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ `${agentInfo.liveCommissionRateLabel}%` }}</span>
                            <span class="game-hall-item" />
                          </div>
                          <div class="d-flex flex-column mt-2" style="width: 155px;">
                            <span class="game-hall-item" />
                            <span class="sub-title-item gray" style="flex: 1 1 0%;">{{ `${$t('__rollingRate')}%` }}</span>
                            <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ `${agentInfo.liveRollingRateLabel}%` }}</span>
                            <span class="game-hall-item" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-column game-hall">
                    <span class="title-item gary mt-4">{{ $t('__directPlayerCount') }}</span>
                    <span class="content-item mt-2">{{ agentInfo.directAgentCountLabel }}</span>
                    <span class="content-item mt-2" v-html="'&nbsp;'" />
                    <span class="title-item gary mt-2">{{ $t('__totalPlayerCount') }}</span>
                    <span class="content-item mt-2">{{ agentInfo.directPlayerCountLabel }}</span>
                  </div>
                </div>
                <div class="mt-4" />
                <div class="mt-4" />
              </div>
              <div class="d-flex flex-column" style="max-width: 390px;">
                <span class="title-item" style="width: 50%; flex: 0 0 auto;">{{ $t('__status') }}</span>
                <div class="d-flex flex-wrap">
                  <div v-if="!isAgentSubAccount" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-disabled': parentAgentInfo.totallyDisabled, 'is-checked': agentInfo.totallyDisabled}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__totallyDisabled') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-disabled': parentAgentInfo.debarBet, 'is-checked': agentInfo.debarBet}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__debarBet') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': agentInfo.lockLogin}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__lockLogin') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount && parentAgentInfo.weeklyLossSettlement" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': agentInfo.weeklyLossSettlement}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__weeklyLossSettlement') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount && parentAgentInfo.oneClickRecycling" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': agentInfo.oneClickRecycling}" style="cursor: default !important;">
                            <span class="el-checkbox__inner" />
                          </span>
                        </span>
                      </div>
                    </span>
                    <span class="content-item" style="line-height: 1.5rem;">{{ $t('__oneClickRecycling') }}</span>
                  </div>
                  <div v-if="!isAgentSubAccount && parentAgentInfo.giftEffect" class="mt-2 d-flex stateItem">
                    <span class="white">
                      <div class="cell checkbox text-left">
                        <span class="el-checkbox red-tick">
                          <span class="el-checkbox__input" :class="{'is-checked': agentInfo.giftEffect}">
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
                <div class="d-flex flex-column" style="width: 155px;">
                  <span class="title-item mt-4">{{ $t('__createdAt') }}</span>
                  <span class="content-item mt-2">{{ agentInfo.created_at }}</span>
                </div>
                <div class="d-flex flex-column" style="width: 155px;">
                  <span class="title-item mt-4">{{ $t('__lastLoginAt') }}</span>
                  <span class="content-item mt-2">{{ agentInfo.lastLoginAt }}</span>
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
import { agentTreeSearch, agentInfoSearch } from '@/api/agentManagement/agent'
import { numberFormat } from '@/utils/numberFormat'

export default {
  name: 'AgentInfoDialog',
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
      agentLevelProps: {
        children: 'SubAgentLevelInfos',
        label: 'AgentName'
      },
      agentLevelLoading: false,
      agentInfoLoading: false,
      agentInfo: {},
      parentAgentInfo: {},
      agentLevel: [],
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
            this.agentTreeSearch(this.agentId)
            const parentRect = this.$el.parentNode.getBoundingClientRect()
            const clickEl = document.querySelector(this.clickClassName)
            if (clickEl) {
              const clickElRect = clickEl.getBoundingClientRect()
              const top = clickElRect.top - parentRect.top + 30
              let setTop = top
              if ((setTop + 300) > parentRect.height) {
                setTop = setTop - 300 - 60
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
          this.agentInfo = {}
          this.parentAgentInfo = {}
          this.agentLevel = []
        }
      },
      immediate: true
    }
  },
  methods: {
    agentTreeSearch(agentId) {
      this.agentLevelLoading = true
      this.agentInfoLoading = true
      agentTreeSearch({ agentId: agentId }).then((res) => {
        this.agentLevel = res
        this.agentLevelLoading = false
        agentInfoSearch({ agentId: agentId }).then((res) => {
          this.agentInfo = res
          this.agentInfo.balanceLabel = numberFormat(this.agentInfo.balance)
          this.agentInfo.liveCommissionRateLabel = numberFormat(this.agentInfo.live_commission_rate)
          this.agentInfo.liveRollingRateLabel = numberFormat(this.agentInfo.live_rolling_rate)
          this.agentInfo.directAgentCountLabel = numberFormat(this.agentInfo.directAgentCount, 0)
          this.agentInfo.directPlayerCountLabel = numberFormat(this.agentInfo.directPlayerCount, 0)
          this.agentInfo.currency = this.agentInfo.currency.code
          this.agentInfo.totallyDisabled = this.agentInfo.totally_disabled === '1'
          this.agentInfo.debarBet = this.agentInfo.bet_status === '0'
          this.agentInfo.lockLogin = this.agentInfo.status === '0'
          this.agentInfo.weeklyLossSettlement = this.agentInfo.weekly_loss_settlement === '1'
          this.agentInfo.oneClickRecycling = this.agentInfo.one_click_recycling === '1'
          this.agentInfo.giftEffect = this.agentInfo.gift_status === '1'
          this.agentInfo.handicaps.forEach(element => {
            element.betMinLabel = numberFormat(element.bet_min)
            element.betMaxLabel = numberFormat(element.bet_max)
          });
          let limit = ''
          for (let i = 0, max = this.agentInfo.handicaps.length; i < max; i++) {
            limit += this.agentInfo.handicaps[i].nickname
            if (i < this.agentInfo.handicaps.length - 1) {
              limit += ','
            }
          }
          this.agentInfo.handicaps_info = limit;
          agentInfoSearch({ agentId: this.agentInfo.parent.id }).then((res) => {
            this.parentAgentInfo = res
            this.parentAgentInfo.balanceLabel = numberFormat(this.parentAgentInfo.balance)
            this.parentAgentInfo.liveCommissionRateLabel = numberFormat(this.parentAgentInfo.live_commission_rate)
            this.parentAgentInfo.liveRollingRateLabel = numberFormat(this.parentAgentInfo.live_rolling_rate)
            this.parentAgentInfo.directAgentCountLabel = numberFormat(this.parentAgentInfo.directAgentCount, 0)
            this.parentAgentInfo.directPlayerCountLabel = numberFormat(this.parentAgentInfo.directPlayerCount, 0)
            this.parentAgentInfo.currency = this.parentAgentInfo.currency.code
            this.parentAgentInfo.totallyDisabled = this.parentAgentInfo.totally_disabled === '1'
            this.parentAgentInfo.debarBet = this.parentAgentInfo.bet_status === '0'
            this.parentAgentInfo.lockLogin = this.parentAgentInfo.status === '0'
            this.parentAgentInfo.weeklyLossSettlement = this.parentAgentInfo.weekly_loss_settlement === '1'
            this.parentAgentInfo.oneClickRecycling = this.parentAgentInfo.one_click_recycling === '1'
            this.parentAgentInfo.giftEffect = this.parentAgentInfo.gift_status === '1'
            this.parentAgentInfo.handicaps.forEach(element => {
              element.betMinLabel = numberFormat(element.bet_min)
              element.betMaxLabel = numberFormat(element.bet_max)
            });
            let limit = ''
            for (let i = 0, max = this.parentAgentInfo.handicaps.length; i < max; i++) {
              limit += this.parentAgentInfo.handicaps[i].nickname
              if (i < this.parentAgentInfo.handicaps.length - 1) {
                limit += ','
              }
            }
            this.parentAgentInfo.handicaps_info = limit;

            this.agentInfoLoading = false
          }).catch(() => {})
        }).catch(() => {})
      }).catch(() => {})
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='font-size: 1.16667rem'>
          {data.AgentName}
        </span>
      )
    },
    handleNodeClick(data, node, com) {
      node.expanded = true
      if (data.AgentId !== null) {
        this.$emit('agent-click', JSON.parse(JSON.stringify(data.AgentId)))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.agentInfoDialog {
  position: absolute;
  z-index: 1;
  .b-right {
    border-right: 1px solid #f9c901 !important;
  }
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
}

</style>
