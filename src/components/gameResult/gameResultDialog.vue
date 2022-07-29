<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="dialogheader">
      <div class="dialogheader-row">
        <div class="dialogheader-row-item">
          <span class="dialogheader-row-item-header">
            {{ $t('__gameType') }}
          </span>
          <span class="dialogheader-row-item-content">
            {{ roundInfo.gameType }}
          </span>
        </div>
        <div class="dialogheader-row-item">
          <span class="dialogheader-row-item-header">
            {{ $t('__roundId') }}
          </span>
          <span class="dialogheader-row-item-content">
            {{ roundInfo.roundId }}
          </span>
        </div>
      </div>
      <div class="dialogheader-row">
        <div class="dialogheader-row-item">
          <span class="dialogheader-row-item-header">
            {{ $t('__gameStartTime') }}
          </span>
          <span class="dialogheader-row-item-content">
            {{ roundInfo.startTime }}
          </span>
        </div>
        <div class="dialogheader-row-item">
          <span class="dialogheader-row-item-header">
            {{ $t('__gameEndTime') }}
          </span>
          <span class="dialogheader-row-item-content">
            {{ roundInfo.endTime }}
          </span>
        </div>
      </div>
    </div>
    <div class="roundData">
      <div v-if="roundInfo.result" class="pokerData">
        <div class="pokerArea">
          <div class="player">{{ $t('__player') }}</div>
          <div class="pokerInfo">
            <div class="poker3">
              <img class="poker rotate" :src="require(`@/assets/poker/${playerCard3}.png`)" :alt="`${$t('__player')}3`">
            </div>
            <img class="poker" :src="require(`@/assets/poker/${playerCard1}.png`)" :alt="`${$t('__player')}1`">
            <img class="poker" :src="require(`@/assets/poker/${playerCard2}.png`)" :alt="`${$t('__player')}2`">
          </div>
        </div>
        <div class="pokerArea">
          <div class="banker">{{ $t('__banker') }}</div>
          <div class="pokerInfo">
            <img class="poker" :src="require(`@/assets/poker/${bankerCard1}.png`)" :alt="`${$t('__banker')}1`">
            <img class="poker" :src="require(`@/assets/poker/${bankerCard2}.png`)" :alt="`${$t('__banker')}2`">
            <div class="poker3">
              <img class="poker rotate" :src="require(`@/assets/poker/${bankerCard3}.png`)" :alt="`${$t('__banker')}3`">
            </div>
          </div>
        </div>
      </div>
      <table class="roundInfo">
        <tr>
          <td class="yellow-color">
            {{ `${$t('__totalLength')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.total }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
          <td class="green-color">
            {{ `${$t('__tie')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.tie }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
        </tr>
        <tr>
          <td class="red-color">
            {{ `${$t('__banker')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.banker }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
          <td class="blue-color">
            {{ `${$t('__player')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.player }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
        </tr>
        <tr>
          <td class="red-color">
            {{ `${$t('__bankerPair')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.bankerPair }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
          <td class="blue-color">
            {{ `${$t('__playerPair')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.playerPair }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
        </tr>
        <tr>
          <td class="red-color">
            {{ `${$t('__bankerContinuousWin')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.bankerInstantWin }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
          <td class="blue-color">
            {{ `${$t('__playerContinuousWin')}: ` }}
          </td>
          <td class="floatRight">
            {{ countInfo.playerInstantWin }}
          </td>
          <td>
            {{ $t('__round') }}
          </td>
        </tr>
      </table>
    </div>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
// import { getRoadArray } from '@/utils/roadLogic'

export default {
  name: 'GameResultDialog',
  mixins: [dialogCommon],
  props: {
    visible: {
      type: Boolean,
      require: true,
      default() {
        return false
      }
    },
    roundInfo: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    countInfo: {
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
  computed: {
    playerCard1() {
      return this.roundInfo.result.PlayerCard[0] ? this.roundInfo.result.PlayerCard[0] : "None"
    },
    playerCard2() {
      return this.roundInfo.result.PlayerCard[1] ? this.roundInfo.result.PlayerCard[1] : "None"
    },
    playerCard3() {
      return this.roundInfo.result.PlayerCard[2] ? this.roundInfo.result.PlayerCard[2] : "None"
    },
    bankerCard1() {
      return this.roundInfo.result.BankerCard[0] ? this.roundInfo.result.BankerCard[0] : "None"
    },
    bankerCard2() {
      return this.roundInfo.result.BankerCard[1] ? this.roundInfo.result.BankerCard[1] : "None"
    },
    bankerCard3() {
      return this.roundInfo.result.BankerCard[2] ? this.roundInfo.result.BankerCard[2] : "None"
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.dialogheader {
  color: #fff;
  &-row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    &-item {
      width: 100%;
      padding: 2px;
      display: flex;
      &-header {
        color: $yellow;
        font-weight: bold;
        width: 100px;
      }
    }
  }
}

.roundData {
  display: flex;
  flex-wrap: wrap;
  .pokerData {
    display: flex;
    margin-right: 50px;
    margin-top: 10px;
    .pokerArea {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .banker {
        text-align: right;
      }
      .pokerInfo {
        display: flex;
        justify-content: space-between;
        width: 150px;
        .poker {
          width: 40px;
          height: 60px;
          &.rotate {
            transform: translateY(10px) rotate(90deg);
          }
        }
        .poker3 {
          width: 60px;
          height: 40px;
          display: flex;
          justify-content: center;
        }
      }
    }
    .pokerArea + .pokerArea {
      margin-left: 20px;
    }
  }
  .roundInfo {
    font-weight: bold;
    color: #fff;
    margin-top: 10px;
    tr {
      .floatRight {
        float: right;
      }
      td + td {
        padding-left: 5px;
      }
    }
    tr {
      line-height: 20px;
    }
  }
}
</style>
