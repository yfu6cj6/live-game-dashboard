<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="rate">
      <table>
        <thead>
          <tr>
            <th align="center">{{ $t('__operator') }}</th>
            <th align="center">{{ title }}</th>
            <th align="center">{{ $t('__createdAt') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="index">
            <td align="center" class="user">{{ item.user }}</td>
            <td v-if="operationType === operationEnum.liveCommissionRate" align="center" class="commission_rate">{{ item.commission_rate }}</td>
            <td v-if="operationType === operationEnum.liveRollingRate" align="center" class="rolling_rate">{{ item.rolling_rate }}</td>
            <td v-if="operationType === operationEnum.liveGiftRate" align="center" class="gift_rate">{{ item.gift_rate }}</td>
            <td align="center" class="created_at">{{ item.created_at }}</td>
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
  name: 'AgentRateLogDialog',
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
</style>
