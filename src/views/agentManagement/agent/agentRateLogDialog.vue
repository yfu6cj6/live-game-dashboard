<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div>
        <div class="notice-cover" @click.stop="onClose" />
        <div class="fadeInUp pp notice animated">
          <div class="w-100 pb-2 text-yellow">{{ title }}</div>
          <div class="scroll-wrap float">
            <div id="scroll-inner" class="scroll-inner off">
              <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
                <div class="history-list">
                  <div class="w-100 list-row">
                    <span class="w-25 cell">{{ $t('__index') }}</span>
                    <span class="w-25 cell">{{ `${$t('__rate')}%` }}</span>
                    <span class="w-50 cell">{{ $t('__updateDate') }}</span>
                  </div>
                  <div>
                    <div
                      v-for="(item, index) in listData"
                      :key="index"
                      class="w-100 list-row"
                    >
                      <span class="w-25 cell">{{ (index+1) }}</span>
                      <span v-if="operationType === operationEnum.liveCommissionRate" class="w-25 cell">
                        <span>{{ `${item.commission_rate}` }}</span>
                      </span>
                      <span v-if="operationType === operationEnum.liveRollingRate" class="w-25 cell">
                        <span>{{ `${item.rolling_rate}` }}</span>
                      </span>
                      <span class="w-50 cell">{{ item.created_at }}</span>
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
    <template v-else>
      <div class="agent-pop-up-panel">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div class="text-yellow p-2">{{ title }}</div>
          <div class="overlay-scroll-wrap scrolling pos-r">
            <backTop
              :inner-class="'.scroll-inner.rateDialog'"
            />
            <div id="scroll-inner" class="scroll-inner on native rateDialog">
              <div class="scroll-view" style="max-height: 70vh">
                <div class="history-list">
                  <div class="w-100 list-row">
                    <span class="w-25 cell">{{ $t('__index') }}</span>
                    <span class="w-25 cell">{{ `${$t('__rate')}%` }}</span>
                    <span class="w-50 cell">{{ $t('__updateDate') }}</span>
                  </div>
                  <div>
                    <div
                      v-for="(item, index) in listData"
                      :key="index"
                      class="w-100 list-row"
                    >
                      <span class="w-25 cell">{{ (index+1) }}</span>
                      <span v-if="operationType === operationEnum.liveCommissionRate" class="w-25 cell">
                        <span>{{ `${item.commission_rate}` }}</span>
                      </span>
                      <span v-if="operationType === operationEnum.liveRollingRate" class="w-25 cell">
                        <span>{{ `${item.rolling_rate}` }}</span>
                      </span>
                      <span class="w-50 cell">{{ item.created_at }}</span>
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

export default {
  name: 'AgentRateLogDialog',
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
    'listData': {
      type: Array,
      require: true,
      default() {
        return {}
      }
    },
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
  data: function() {
    return {
      operationEnum: Object.freeze({
        'liveCommissionRate': 1,
        'liveRollingRate': 2,
        'liveGiftRate': 3
      })
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.rate {
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
        &.user,
        &.commission_rate,
        &.rolling_rate,
        &.gift_rate,
        &.created_at {
          width: 200px;
          min-width: 200px;
        }
      }
    }
  }
}

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
    font-weight: bold;
    font-size: 1.16667rem;
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

.history-list {
  padding-bottom: 1.66667rem;
  .list-row {
    background-color: transparent;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding: 0.83333rem 0.41667rem;
    margin: 0;
    position: relative;
    padding-right: 3.75rem;
    .cell {
      color: #fff;
      text-align: center;
    }
  }
}

.p-buttons {
    padding-top: 0.41667rem;
    padding-bottom: 0.41667rem;
}
</style>
