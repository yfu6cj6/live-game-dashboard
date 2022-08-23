<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div data-v-e681123c="" class="notice-cover" />
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
                        <div />
                        <div class="agent-tree-detail">
                          <div class="d-flex flex-column border-top padding-top">
                            <div class="d-flex flex-wrap">
                              <div class="d-flex  flex-column basis-50">
                                <span class="title-item" style="width: 125px; flex: 1 1 0%;">{{ $t('__balance') }}</span>
                                <span data-v-2125f3d6="" class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ form.balance }}</span>
                              </div>
                              <div class="d-flex  flex-column basis-50">
                                <span class="title-item" style="width: 120px; flex: 1 1 0%;">{{ $t('__currency') }}</span>
                                <span class="content-item mt-2" style="width: 120px; flex: 1 1 0%;">{{ form.currency }}</span>
                              </div>
                              <div class="d-flex  flex-column basis-100 mt-4">
                                <span class="title-item" style="width: 100px; margin-left: 0px; flex: 1 1 0%;">{{ $t('__handicapLimit') }}</span>
                                <span class="content-item mt-2" style="width: 60px !important; margin-left: 0px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ form.handicaps_info }}</span>
                              </div>
                              <div class="d-flex basis-100">
                                <div class="d-flex flex-column basis-50">
                                  <span class="title-item gary mt-4">{{ $t('__directPlayerCount') }}</span>
                                  <span class="content-item mt-2 ">{{ form.directPlayerCount }}</span>
                                </div>
                                <div class="d-flex flex-column basis-50">
                                  <span class="title-item gary mt-4">{{ $t('__totalPlayerCount') }}</span>
                                  <span class="content-item mt-2">{{ form.totalPlayerCount }}</span>
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
                                          <span data-v-2125f3d6="" class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ `${form.live_commission_rate}%` }}</span>
                                          <span class="game-hall-item" />
                                        </div>
                                        <div class="d-flex flex-column mt-2" style="width: 155px;">
                                          <span class="game-hall-item" />
                                          <span class="sub-title-item gray" style="flex: 1 1 0%;">{{ `${$t('__rollingRate')}%` }}</span>
                                          <span data-v-2125f3d6="" class="content-item mt-2" style="flex: 1 1 0%; text-align: start;">{{ `${form.live_rolling_rate}%` }}</span>
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
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="el-checkbox__input" :class="{'unchecked': form.totally_disabled === 0, 'is-checked': form.totally_disabled === 1}" style="cursor: default !important;">
                                          <span class="el-checkbox__inner" />
                                        </span>
                                      </span>
                                    </div>
                                  </span>
                                  <span class="content-item" style="line-height: 1.5rem;">{{ $t('__totallyDisabled') }}</span>
                                </div>
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="unchecked el-checkbox__input" :class="{'unchecked': form.status === 1, 'is-checked': form.status === 0}" style="cursor: default !important;">
                                          <span class="el-checkbox__inner" />
                                        </span>
                                      </span>
                                    </div>
                                  </span>
                                  <span class="content-item" style="line-height: 1.5rem;">{{ $t('__lockLogin') }}</span>
                                </div>
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="unchecked el-checkbox__input" :class="{'unchecked': form.bet_status === 1, 'is-checked': form.bet_status === 0}" style="cursor: default !important;">
                                          <span class="el-checkbox__inner" />
                                        </span>
                                      </span>
                                    </div>
                                  </span>
                                  <span class="content-item" style="line-height: 1.5rem;">{{ $t('__debarBet') }}</span>
                                </div>
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="unchecked el-checkbox__input" :class="{'unchecked': form.weekly_loss_settlement === 0, 'is-checked': form.weekly_loss_settlement === 1}" style="cursor: default !important;">
                                          <span class="el-checkbox__inner" />
                                        </span>
                                      </span>
                                    </div>
                                  </span>
                                  <span class="content-item" style="line-height: 1.5rem;">{{ $t('__weeklyLossSettlement') }}</span>
                                </div>
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="unchecked el-checkbox__input" :class="{'unchecked': form.one_click_recycling === 0, 'is-checked': form.one_click_recycling === 1}" style="cursor: default !important;">
                                          <span class="el-checkbox__inner" />
                                        </span>
                                      </span>
                                    </div>
                                  </span>
                                  <span class="content-item" style="line-height: 1.5rem;">{{ $t('__oneClickRecycling') }}</span>
                                </div>
                                <div class="mt-2 d-flex basis-100 flex-wrap" style="width: 50%; flex: 0 0 auto;">
                                  <span class="white" style="margin-right: 5px;">
                                    <div class="cell checkbox text-left">
                                      <span class="el-checkbox red-tick">
                                        <span class="unchecked el-checkbox__input" :class="{'unchecked': form.gift_status === 0, 'is-checked': form.gift_status === 1}" style="cursor: default !important;">
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
                                <span class="content-item mt-2">{{ form.created_at }}</span>
                              </div>
                              <div class="d-flex flex-column basis-50" style="width: 125px; flex: 1 1 0%;">
                                <span class="title-item mt-4">{{ $t('__lastLoginAt') }}</span>
                                <span class="content-item mt-2">{{ form.lastLoginAt }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="el-loading-mask" style="display: none;">
                            <div class="el-loading-spinner">
                              <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path" /></svg>
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
          <button data-v-e681123c="" type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click="onClose">
            <span>{{ $t('__close') }}</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      -
    </template>
  </div>
</template>

<script>
// import Dialog from '@/components/Dialog'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'

export default {
  name: 'AgentInfoDialog',
  components: { },
  mixins: [dialogCommon, common],
  props: {
    'visible': {
      type: Boolean,
      require: true
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
    }
  },
  watch: {
    visible() {
      // if (!this.visible) {
      // }
    }
  },
  methods: {
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
