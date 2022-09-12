<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="scroll-wrap flex-column flex-fill popup-view">
        <div id="scroll-inner" class="scroll-inner flex-column flex-fill off">
          <div class="bg-black flex-column flex-fill">
            <div class="w-100">
              <div class="handicaps-list">
                <div class="title">{{ $t('__agentInfo') }}</div>
                <div class="content">
                  <div class="item">
                    <label class="preview-item-label">{{ $t('__agentAccount') }}</label>
                    <span class="preview-item-value mr-auto ml-4">{{ agentName }}</span>
                  </div>
                </div>
                <div class="title">{{ $t('__handicapLimit') }}</div>
                <div class="content">
                  <div class="item">
                    <span class="handicap-item ww-5">ID</span>
                    <span class="handicap-item ww-5">{{ $t('__handicapLimit') }}</span>
                    <span class="handicap-item ww-9  text-right">{{ $t('__lowerLimit') }}</span>
                    <span class="handicap-item ww-2 text-center" />
                    <span class="handicap-item ww-10 text-right">{{ $t('__upperLimit') }}</span>
                    <span class="handicap-item ww-5 text-center">{{ $t('__currency') }}</span>
                  </div>
                  <div
                    v-for="(item, index) in form.handicaps"
                    :key="index"
                    class="item"
                  >
                    <span class="handicap-item ww-5">{{ item.id }}</span>
                    <span class="handicap-item ww-5">{{ item.nickname }}</span>
                    <span class="handicap-item ww-9  text-right">
                      <span>{{ item.bet_minLabel }}</span>
                    </span>
                    <span class="handicap-item ww-2 text-center">-</span>
                    <span class="handicap-item ww-10 text-right">
                      <span>{{ item.bet_maxLabel }}</span>
                    </span>
                    <span class="handicap-item ww-5 text-center">
                      <span>
                        {{ item.currency }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp subAgentHandicapsList" style="max-width: 600px;">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div class="popup-title">{{ title }}</div>
          <div class="handicaps-cont">
            <div class="item w-100">
              <label class="text-white">{{ `${$t('__agentAccount')}:` }}</label>
              <span class="text-yellow">{{ agentName }}</span>
            </div>
            <div id="subAgentScroller" class="overlay-scroll-wrap scrolling">
              <backTop
                :inner-class="'.scroll-inner.limitDialog'"
              />
              <div id="scroll-inner" class="scroll-inner on native limitDialog">
                <div class="scroll-view" style="max-height: 70vh;">
                  <div class="w-100 agent-form" style="max-height: calc(100vh - 300px);">
                    <div class="preview">
                      <div class="preview-item">
                        <div class="title">{{ $t('__handicapLimit') }}</div>
                        <div class="v-line" />
                        <div class="content">
                          <div class="item w-100">
                            <span class="handicap-item">ID</span>
                            <span class="handicap-item">{{ $t('__handicapLimit') }}</span>
                            <span class="handicap-item text-right lowerLimit">{{ $t('__lowerLimit') }}</span>
                            <span class="handicap-item text-center to" />
                            <span class="handicap-item text-right upperLimit">{{ $t('__upperLimit') }}</span>
                            <span class="handicap-item text-center default">{{ $t('__currency') }}</span>
                          </div>
                          <div
                            v-for="(item, index) in form.handicaps"
                            :key="index"
                            class="item w-100"
                          >
                            <span class="handicap-item">{{ item.id }}</span>
                            <span class="handicap-item">{{ item.nickname }}</span>
                            <span class="handicap-item text-right lowerLimit">
                              <span class="">{{ item.bet_minLabel }}</span>
                            </span>
                            <span class="handicap-item text-center to">-</span>
                            <span class="handicap-item text-right upperLimit">
                              <span class="">{{ item.bet_maxLabel }}</span>
                            </span>
                            <span class="handicap-item text-center default">
                              <span>
                                {{ item.currency }}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex w-100 justify-content-center popup-buttons" style="margin-top: 20px;">
            <button type="button" class="el-button bg-gray common-button el-button--primary" @click="onClose">
              <span>{{ $t('__close') }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import BackTop from '@/components/BackTop'
import { mapGetters } from 'vuex'

export default {
  name: 'LimitDialog',
  components: { BackTop },
  mixins: [dialogCommon],
  props: {
    'title': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
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
    },
    'agentName': {
      type: String,
      require: true,
      default() {
        return ''
      }
    }
  },
  data: function() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

#app.mobile {
  .limit {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 15px;
    table {
      color: #fff;
      font-size: 18px;
      margin: 0 auto;
      tr {
        th {
          color: $yellow;
        }
        td {
          &.nickname {
            width: 160px;
            min-width: 160px;
          }
          &.bet_min {
            width: 160px;
            min-width: 160px;
          }
          &.bet_max {
            width: 160px;
            min-width: 160px;
          }
          &.currency {
            width: 100px;
            min-width: 100px;
          }
        }
      }
    }
  }
  .handicaps-list {
    color: #fff;
    padding-top: 2.5rem;
    .ww-5 {
      width: 6rem;
    }
    .ww-9 {
      width: 7.5rem;
    }
    .ww-2 {
      width: 1.66667rem;
    }
    .ww-10 {
      width: 8.33333rem;
    }
    .title {
      padding: 0.83333rem 0.83333rem 0.41667rem 0.83333rem;
      border-bottom: 0.08333rem solid #f9c901;
      color: #f9c901;
    }
    .content {
      padding: 0.83333rem 0.83333rem 0 0.83333rem;
      .item {
        padding: 0.41667rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .preview-item-label {
          color: #f9c901;
        }
        .preview-item-value {
          margin-left: auto;
        }
        .handicap-item {
          margin: auto;
          word-break: break-all;
        }
      }
    }
  }
  .popup-view {
    position: fixed;
    top: 3.75rem;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: calc(100vh - 3.75rem);
  }
}
</style>
