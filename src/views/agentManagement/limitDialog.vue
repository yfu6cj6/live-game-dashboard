<template>
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
          <tr v-for="(item, index) in handicaps" :key="index">
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
    'handicaps': {
      type: Array,
      require: true,
      default() {
        return []
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
</style>
