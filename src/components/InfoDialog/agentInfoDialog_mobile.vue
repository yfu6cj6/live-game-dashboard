<template>
  <div v-if="visible">
    <div class="notice-cover" @click.stop="onClose" />
    <div class="fadeInUp pp notice animated">
      <div class="scroll-wrap float">
        <div id="scroll-inner" class="scroll-inner off">
          <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
            <div class="w-100">
              <div class="notice-tip">{{ `${$t('__superior')} :` }}</div>
              <div class="notice-text">
                <div class="scroll-wrap float" style="height: auto;">
                  <div id="scroll-inner" class="scroll-inner off">
                    <div class="scroll-view" style="position: static;">
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
                      <div v-loading="agentInfoLoading" class="agent-tree-detail">
                        <div class="d-flex flex-column border-top padding-top" style="overflow: hidden;">
                          <div class="d-flex flex-wrap">
                            <div class="d-flex  flex-column basis-50">
                              <span class="title-item" style="width: 125px; flex: 1 1 0%;">{{ $t('__balance') }}</span>
                              <span class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ agentInfo.balanceLabel }}</span>
                            </div>
                            <div class="d-flex  flex-column basis-50">
                              <span class="title-item" style="width: 120px; flex: 1 1 0%;">{{ $t('__currency') }}</span>
                              <span class="content-item mt-2" style="width: 120px; flex: 1 1 0%;">{{ agentInfo.currency }}</span>
                            </div>
                            <div class="d-flex  flex-column basis-100 mt-4">
                              <span class="title-item" style="width: 100px; margin-left: 0px; flex: 1 1 0%;">{{ $t('__handicapLimit') }}</span>
                              <span class="content-item mt-2" style="width: 60px !important; margin-left: 0px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ agentInfo.handicaps_info }}</span>
                            </div>
                            <div class="d-flex basis-100">
                              <div class="d-flex flex-column basis-50">
                                <span class="title-item gary mt-4">{{ $t('__directPlayerCount') }}</span>
                                <span class="content-item mt-2 ">{{ agentInfo.directAgentCountLabel }}</span>
                              </div>
                              <div class="d-flex flex-column basis-50">
                                <span class="title-item gary mt-4">{{ $t('__totalPlayerCount') }}</span>
                                <span class="content-item mt-2">{{ agentInfo.directPlayerCountLabel }}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="d-flex">
                              <div class="d-flex flex-column game-hall mt-4 basis-50">
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
                            </div>
                            <div class="mt-4" />
                            <div class="mt-4" />
                          </div>
                          <div class="d-flex flex-column">
                            <span class="title-item" style="width: 50%; flex: 0 0 auto;">{{ $t('__status') }}</span>
                            <div class="d-flex flex-wrap flex-wrap overflow-hidden">
                              <div v-if="!isAgentSubAccount" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
                                      <span class="el-checkbox__input" :class="{'is-disabled': parentAgentInfo.totallyDisabled, 'is-checked': agentInfo.totallyDisabled}" style="cursor: default !important;">
                                        <span class="el-checkbox__inner" />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <span class="content-item" style="line-height: 1.5rem;">{{ $t('__totallyDisabled') }}</span>
                              </div>
                              <div v-if="!isAgentSubAccount" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
                                      <span class="el-checkbox__input" :class="{'is-disabled': parentAgentInfo.debarBet, 'is-checked': agentInfo.debarBet}" style="cursor: default !important;">
                                        <span class="el-checkbox__inner" />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <span class="content-item" style="line-height: 1.5rem;">{{ $t('__debarBet') }}</span>
                              </div>
                              <div v-if="!isAgentSubAccount" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
                                      <span class="el-checkbox__input" :class="{'is-checked': agentInfo.lockLogin}" style="cursor: default !important;">
                                        <span class="el-checkbox__inner" />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <span class="content-item" style="line-height: 1.5rem;">{{ $t('__lockLogin') }}</span>
                              </div>
                              <div v-if="!isAgentSubAccount && parentAgentInfo.weeklyLossSettlement" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
                                      <span class="el-checkbox__input" :class="{'is-checked': agentInfo.weeklyLossSettlement}" style="cursor: default !important;">
                                        <span class="el-checkbox__inner" />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <span class="content-item" style="line-height: 1.5rem;">{{ $t('__weeklyLossSettlement') }}</span>
                              </div>
                              <div v-if="!isAgentSubAccount && parentAgentInfo.oneClickRecycling" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
                                      <span class="el-checkbox__input" :class="{'is-checked': agentInfo.oneClickRecycling}" style="cursor: default !important;">
                                        <span class="el-checkbox__inner" />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <span class="content-item" style="line-height: 1.5rem;">{{ $t('__oneClickRecycling') }}</span>
                              </div>
                              <div v-if="!isAgentSubAccount && parentAgentInfo.giftEffect" class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                <span class="white" style="margin-right: 5px;">
                                  <div class="cell checkbox text-left">
                                    <span class="el-checkbox red-tick" style="margin: 0;">
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
                            <div class="d-flex flex-column basis-50" style="width: 125px; flex: 1 1 0%;">
                              <span class="title-item mt-4">{{ $t('__createdAt') }}</span>
                              <span class="content-item mt-2">{{ agentInfo.created_at }}</span>
                            </div>
                            <div class="d-flex flex-column basis-50" style="width: 125px; flex: 1 1 0%;">
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
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
        <button type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click.stop="onClose">
          <span>{{ $t('__close') }}</span>
        </button>
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
      agentLevel: []
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
    async handleNodeClick(data, node, com) {
      node.expanded = true
      if (data.AgentId !== null) {
        await this.$router.push({ path: `/agentManagement/agentManagement/${data.AgentId}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0,0,0,0.5);
  z-index: 3;
}
.notice {
  background-color: #000;
  padding: 1.66667rem 1.66667rem 1.66667rem 1.66667rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  border-top: 0.25rem solid #f9c901;
  height: auto;
}

.p-buttons {
  padding-top: 0.41667rem;
  padding-bottom: 0.41667rem;
}
</style>
