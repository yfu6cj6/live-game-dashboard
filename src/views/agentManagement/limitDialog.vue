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
                      <span>{{ item.bet_min }}</span>
                    </span>
                    <span class="handicap-item ww-2 text-center">-</span>
                    <span class="handicap-item ww-10 text-right">
                      <span>{{ item.bet_max }}</span>
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
      <Dialog
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
      >
        <div class="limit">
          <table>
            <thead>
              <tr>
                <th align="center">{{ $t('__nickname') }}</th>
                <th align="center">{{ $t('__betMin') }}</th>
                <th align="center">{{ $t('__betMax') }}</th>
                <th align="center">{{ $t('__currency') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.handicaps" :key="index">
                <td align="center" class="nickname">{{ item.nickname }}</td>
                <td align="center" class="bet_min">{{ item.bet_min }}</td>
                <td align="center" class="bet_max">{{ item.bet_max }}</td>
                <td align="center" class="currency">{{ item.currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'LimitDialog',
  components: { Dialog },
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

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

.popup-view {
  position: fixed;
  top: 3.75rem;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: calc(100vh - 3.75rem);
}
.handicaps-list {
  .ww-5 {
    width: 6rem;
  }
}
</style>
