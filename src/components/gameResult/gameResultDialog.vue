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
              <img class="poker rotate" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[2]}.png`)" :alt="`${$t('__player')}3`">
            </div>
            <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[0]}.png`)" :alt="`${$t('__player')}1`">
            <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[1]}.png`)" :alt="`${$t('__player')}2`">
          </div>
        </div>
        <div class="pokerArea">
          <div class="banker">{{ $t('__banker') }}</div>
          <div class="pokerInfo">
            <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[0]}.png`)" :alt="`${$t('__banker')}1`">
            <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[1]}.png`)" :alt="`${$t('__banker')}2`">
            <div class="poker3">
              <img class="poker rotate" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[2]}.png`)" :alt="`${$t('__banker')}3`">
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
    <div class="road">
      <table>
        <tr
          v-for="(road, i) in bigRoad"
          :key="i"
        >
          <td
            v-for="(item, j) in road"
            :key="j"
            class="item"
          >
            <div
              :class="{
                'bigRoad-current': item.split('_')[3] === '1'
              }"
            />
            <div
              :class="{
                'bigRoad-winner-banker': item.split('_')[0] === '1',
                'bigRoad-winner-player': item.split('_')[0] === '2'
              }"
            />
            <div
              :class="{
                'bigRoad-pair-banker': item.split('_')[1] === '1' || item.split('_')[1] === '3',
              }"
            />
            <div
              :class="{
                'bigRoad-pair-player': item.split('_')[1] === '2' || item.split('_')[1] === '3',
              }"
            />
            <div
              v-if="item.split('_')[0] === '3' && item.split('_')[2] >= 1"
              class="bigRoad-tieCount"
            >
              {{ (Number(item.split('_')[2]) + 1) }}
            </div>
            <div
              v-else-if="item.split('_')[0] === '3' || item.split('_')[2] === '1'"
              class="bigRoad-winner-tie"
            />
            <div
              v-else-if="item.split('_')[2] > 1"
              class="bigRoad-tieCount"
            >
              {{ item.split('_')[2] }}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import { getRoadArray } from '@/utils/roadLogic'

export default {
  name: 'GameResultDialog',
  mixins: [dialogCommon],
  props: {
    'visible': {
      type: Boolean,
      require: true
    },
    'roundInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'countInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'scoreCards': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    return {
      bigRoad: [[]],
      bigEyeRoad: [[]],
      smallEyeRoad: [[]],
      cockroachRoad: [[]],
      beadRoad: [[]]
    }
  },
  computed: {
  },
  watch: {
    visible() {
      if (this.visible) {
        this.dialogLoading = true
        if (this.roundInfo.result) {
          for (let i = 0; i < 3; i++) {
            if (!this.roundInfo.result.PlayerCard[i]) {
              this.roundInfo.result.PlayerCard[i] = "None"
            }
            if (!this.roundInfo.result.BankerCard[i]) {
              this.roundInfo.result.BankerCard[i] = "None"
            }
          }
        }
        const roadData = this.scoreCards.toString()
        const bigRoad = getRoadArray(0, roadData, this.roundInfo.scoreCardsId)
        var bigRoadLastIndex = 0
        bigRoad.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (bigRoadLastIndex < last) {
            bigRoadLastIndex = last
          }
        })
        if (bigRoadLastIndex < 26) {
          bigRoadLastIndex = 26
        }
        for (let i = 0, max = bigRoad.length; i < max; i++) {
          bigRoad[i] = bigRoad[i].slice(0, bigRoadLastIndex);
        }
        this.bigRoad = bigRoad;

        this.dialogLoading = false
      } else {
        this.bigRoad = [[]]
        this.bigEyeRoad = [[]]
        this.smallEyeRoad = [[]]
        this.cockroachRoad = [[]]
        this.beadRoad = [[]]
        this.roundInfo = {}
        this.countInfo = {}
      }
    }
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
  max-width: 100%;
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

.road {
  overflow: auto;
  table {
    background-color: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    td {
      width: 20px;
      min-width: 20px;
      height: 20px;
      min-height: 20px;
      max-height: 20px;
      border: 1px solid #aaa;
      position: relative;
      .bigRoad {
        &-current {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: change 1s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        &-winner {
          &-banker,
          &-player {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 15px;
            height: 15px;
            border-radius: 50%;
          }
        }
        &-winner {
          &-banker {
            border: 2px solid $red;
          }
          &-player {
            border: 2px solid $blue;
          }
          &-tie {
            position: absolute;
            top: 0;
            left: 9px;
            width: 2px;
            height: 100%;
            transform: rotate(45deg);
            background-color: $green;
          }
        }
        &-pair {
          &-banker,
          &-player {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }
        }
        &-pair {
          &-banker {
            background-color: $darkRed;
            top: 2px;
            left: 2px;
          }
          &-player {
            background-color: $darkBlue;
            bottom: 2px;
            right: 2px;
          }
        }
        &-tieCount {
          position: absolute;
          top: 0;
          left: 0;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      }
      @keyframes change {
        from {
          background-color: #fff;
        }
        to {
          background-color: #fc0;
        }
      }
    }
  }
}
</style>
