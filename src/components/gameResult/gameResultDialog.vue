<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
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
    <div class="bigRoadData">
      <table>
        <tr
          v-for="(road, i) in bigRoad.roadData"
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
    <div class="bigEyeRoadData">
      <table>
        <tr
          v-for="(road, i) in bigEyeRoad.roadData"
          :key="i"
        >
          <td
            v-for="(item, j) in road"
            :key="j"
            class="item"
          >
            <div
              :class="{
                'bigEyeRoad-current': item.split('_')[1] === '1'
              }"
            />
            <div
              :class="{
                'bigEyeRoad-winner-banker': item.split('_')[0] === '1',
                'bigEyeRoad-winner-player': item.split('_')[0] === '2'
              }"
            />
          </td>
        </tr>
      </table>
    </div>
    <div class="smallEyeRoadData_cockroachRoadData">
      <div class="smallEyeRoadData">
        <table>
          <tr
            v-for="(road, i) in smallEyeRoad.roadData"
            :key="i"
          >
            <td
              v-for="(item, j) in road"
              :key="j"
              class="item"
            >
              <div
                :class="{
                  'smallEyeRoad-current': item.split('_')[1] === '1'
                }"
              />
              <div
                :class="{
                  'smallEyeRoad-winner-banker': item.split('_')[0] === '1',
                  'smallEyeRoad-winner-player': item.split('_')[0] === '2'
                }"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="cockroachRoadData">
        <table>
          <tr
            v-for="(road, i) in cockroachRoad.roadData"
            :key="i"
          >
            <td
              v-for="(item, j) in road"
              :key="j"
              class="item"
            >
              <div
                :class="{
                  'cockroachRoad-current': item.split('_')[1] === '1'
                }"
              />
              <div
                :class="{
                  'cockroachRoad-winner-banker': item.split('_')[0] === '1',
                  'cockroachRoad-winner-player': item.split('_')[0] === '2'
                }"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="beadRoadData">
      <table>
        <tr
          v-for="(road, i) in beadRoad.roadData"
          :key="i"
        >
          <td
            v-for="(item, j) in road"
            :key="j"
            class="item"
          >
            <div
              :class="{
                'beadRoad-current': item.split('_')[2] === '1'
              }"
            />
            <div
              :class="{
                'beadRoad-winner-banker': item.split('_')[0] === '1',
                'beadRoad-winner-player': item.split('_')[0] === '2',
                'beadRoad-winner-tie': item.split('_')[0] === '3'
              }"
            />
            <div
              :class="{
                'beadRoad-pair-banker': item.split('_')[1] === '1' || item.split('_')[1] === '3',
              }"
            />
            <div
              :class="{
                'beadRoad-pair-player': item.split('_')[1] === '2' || item.split('_')[1] === '3',
              }"
            />
          </td>
        </tr>
      </table>
    </div>
  </Dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'
import { getRoadArray } from '@/utils/roadLogic'

const road = {
  roadData: [[]],
  allData: [[]],
  lastIndex: 0
}

export default {
  name: 'GameResultDialog',
  components: { Dialog },
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
      bigRoad: JSON.parse(JSON.stringify(road)),
      bigEyeRoad: JSON.parse(JSON.stringify(road)),
      smallEyeRoad: JSON.parse(JSON.stringify(road)),
      cockroachRoad: JSON.parse(JSON.stringify(road)),
      beadRoad: JSON.parse(JSON.stringify(road))
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

        this.bigRoad.allData = getRoadArray(0, roadData, this.roundInfo.scoreCardsId);
        this.bigRoad.allData.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (this.bigRoad.lastIndex < last) {
            this.bigRoad.lastIndex = last
          }
        })
        this.bigEyeRoad.allData = getRoadArray(2, roadData, this.roundInfo.scoreCardsId)
        this.bigEyeRoad.allData.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (this.bigEyeRoad.lastIndex < last) {
            this.bigEyeRoad.lastIndex = last
          }
        })
        this.smallEyeRoad.allData = getRoadArray(3, roadData, this.roundInfo.scoreCardsId)
        this.smallEyeRoad.allData.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (this.smallEyeRoad.lastIndex < last) {
            this.smallEyeRoad.lastIndex = last
          }
        })
        this.cockroachRoad.allData = getRoadArray(4, roadData, this.roundInfo.scoreCardsId)
        this.cockroachRoad.allData.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (this.cockroachRoad.lastIndex < last) {
            this.cockroachRoad.lastIndex = last
          }
        })
        this.beadRoad.allData = getRoadArray(1, roadData, this.roundInfo.scoreCardsId)
        this.beadRoad.allData.forEach(element => {
          const info = element.filter(item => { return item !== "" })
          const last = element.lastIndexOf(info[info.length - 1])
          if (this.beadRoad.lastIndex < last) {
            this.beadRoad.lastIndex = last
          }
        })
        this.resizeHandler();

        this.dialogLoading = false
      } else {
        this.bigRoad = JSON.parse(JSON.stringify(road));
        this.bigEyeRoad = JSON.parse(JSON.stringify(road));
        this.smallEyeRoad = JSON.parse(JSON.stringify(road));
        this.cockroachRoad = JSON.parse(JSON.stringify(road));
        this.beadRoad = JSON.parse(JSON.stringify(road));
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      var bigRoadLastIndex = this.bigRoad.lastIndex;
      while (bigRoadLastIndex * 20 < (window.innerWidth - 50)) {
        bigRoadLastIndex++;
      }
      for (let i = 0, max = this.bigRoad.allData.length; i < max; i++) {
        this.bigRoad.roadData[i] = this.bigRoad.allData[i].slice(0, bigRoadLastIndex);
      }
      this.bigRoad.roadData = JSON.parse(JSON.stringify(this.bigRoad.roadData));

      var bigEyeRoadLastIndex = this.bigEyeRoad.lastIndex;
      while (bigEyeRoadLastIndex * 10 < (window.innerWidth - 50)) {
        bigEyeRoadLastIndex++;
      }
      for (let i = 0, max = this.bigEyeRoad.allData.length; i < max; i++) {
        this.bigEyeRoad.roadData[i] = this.bigEyeRoad.allData[i].slice(0, bigEyeRoadLastIndex);
      }
      this.bigEyeRoad.roadData = JSON.parse(JSON.stringify(this.bigEyeRoad.roadData));

      var smallEyeRoadLastIndex = this.smallEyeRoad.lastIndex;
      while (smallEyeRoadLastIndex * 20 < (window.innerWidth - 50) / 2) {
        smallEyeRoadLastIndex++;
      }
      for (let i = 0, max = this.smallEyeRoad.allData.length; i < max; i++) {
        this.smallEyeRoad.roadData[i] = this.smallEyeRoad.allData[i].slice(0, smallEyeRoadLastIndex);
      }
      this.smallEyeRoad.roadData = JSON.parse(JSON.stringify(this.smallEyeRoad.roadData));

      var cockroachRoadLastIndex = this.cockroachRoad.lastIndex
      while (cockroachRoadLastIndex * 20 < (window.innerWidth - 50) / 2) {
        cockroachRoadLastIndex++;
      }
      for (let i = 0, max = this.cockroachRoad.allData.length; i < max; i++) {
        this.cockroachRoad.roadData[i] = this.cockroachRoad.allData[i].slice(0, cockroachRoadLastIndex);
      }
      this.cockroachRoad.roadData = JSON.parse(JSON.stringify(this.cockroachRoad.roadData));

      var beadRoadLastIndex = this.beadRoad.lastIndex
      while (beadRoadLastIndex * 20 < (window.innerWidth - 50)) {
        beadRoadLastIndex++;
      }
      for (let i = 0, max = this.beadRoad.allData.length; i < max; i++) {
        this.beadRoad.roadData[i] = this.beadRoad.allData[i].slice(0, beadRoadLastIndex);
      }
      this.beadRoad.roadData = JSON.parse(JSON.stringify(this.beadRoad.roadData));
    }
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

@keyframes change {
  from {
    background-color: #fff;
  }
  to {
    background-color: #fc0;
  }
}

.bigRoadData {
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: hidden;
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
    }
  }
}
.bigEyeRoadData {
  overflow-x: auto;
  overflow-y: hidden;
  table {
    background-color: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    &:first-child {
      border-top: 1px solid #aaa;
    }
    tr {
      border-left: 1px solid #aaa;
      border-right: 1px solid #aaa;
      &:nth-child(even) {
        border-bottom: 1px solid #aaa;
      }
      td {
        &:nth-child(even) {
          border-right: 1px solid #aaa;
        }
        width: 10px;
        min-width: 10px;
        height: 10px;
        min-height: 10px;
        max-height: 10px;
        position: relative;
        .bigEyeRoad {
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
              width: calc(100% - 3px);
              height: calc(100% - 3px);
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
          }
        }
      }
    }
  }
}
.smallEyeRoadData_cockroachRoadData {
  display: flex;
}
.smallEyeRoadData {
  max-width: 50%;
  overflow-x: auto;
  overflow-y: hidden;
  border-right: 1px solid #aaa;
  table {
    background-color: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    &:first-child {
      border-top: 1px solid #aaa;
    }
    tr {
      border-left: 1px solid #aaa;
      &:nth-child(even) {
        border-bottom: 1px solid #aaa;
      }
      td {
        &:nth-child(even) {
          border-right: 1px solid #aaa;
        }
        width: 10px;
        min-width: 10px;
        height: 10px;
        min-height: 10px;
        max-height: 10px;
        position: relative;
        .smallEyeRoad {
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
              width: calc(100% - 3px);
              height: calc(100% - 3px);
              border-radius: 50%;
            }
          }
          &-winner {
            &-banker {
              background-color: $red;
            }
            &-player {
              background-color: $blue;
            }
          }
        }
      }
    }
  }
}
.cockroachRoadData {
  max-width: 50%;
  overflow-x: auto;
  overflow-y: hidden;
  table {
    background-color: #fff;
    border-spacing: 0;
    border-collapse: collapse;
    &:first-child {
      border-top: 1px solid #aaa;
    }
    tr {
      border-right: 1px solid #aaa;
      &:nth-child(even) {
        border-bottom: 1px solid #aaa;
      }
      td {
        &:nth-child(even) {
          border-right: 1px solid #aaa;
        }
        width: 10px;
        min-width: 10px;
        height: 10px;
        min-height: 10px;
        max-height: 10px;
        position: relative;
        .cockroachRoad {
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
              transform: translateX(-25%) translateY(-25%) rotate(45deg);
              width: calc(100% - 1px);
              height: calc(100% - 1px);
            }
          }
          &-winner {
            &-banker {
              border-left: 2px solid $red;
            }
            &-player {
              border-left: 2px solid $blue;
            }
          }
        }
      }
    }
  }
}
.beadRoadData {
  overflow-x: auto;
  overflow-y: hidden;
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
      .beadRoad {
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
          &-player,
          &-tie {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 15px;
            height: 15px;
            border-radius: 50%;
            &::after {
              position: absolute;
              color: #fff;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%) scale(0.8);
            }
          }
        }
        &-winner {
          &-banker {
            background-color: $red;
            &::after {
              content: "莊";
            }
          }
          &-player {
            background-color: $blue;
            &::after {
              content: "閒";
            }
          }
          &-tie {
            background-color: $green;
            &::after {
              content: "和";
            }
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
            top: 1px;
            left: 1px;
          }
          &-player {
            background-color: $darkBlue;
            bottom: 1px;
            right: 1px;
          }
        }
      }
    }
  }
}
</style>
