<template>
  <dragResize
    v-if="visible"
    class="gameResultDialog gameResultDialogPC"
    :is-active="true"
    :x="left"
    :y="top"
    :z="1"
    :w="672"
    :h="618.7"
    :parent-limitation="true"
    :is-resizable="false"
  >
    <div class="pop-over bg-black">
      <div class="panel">
        <div
          class="fas icon-close text-link yellow"
          style="height: 1.77778rem; width: 1.77778rem;"
          @click.stop="onClose"
        >
          <svg
            id="close"
            data-name="close"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 47.971 47.971"
            style="height: 0.941176rem; width: 0.941176rem;"
            xml:space="preserve"
          >
            <g>
              <path
                d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,
                0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,
                3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,
                0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
              />
            </g>
          </svg>
        </div>
        <div class="game-result-detail">
          <div class="panel-title pos-r">
            <div class="w-100 d-flex flex-wrap align-items-center">
              <span class="panel-label">{{ $t('__game') }}</span>
              <span class="panel-value">{{ roundInfo.gameType }}</span>
              <span class="panel-label">{{ $t('__roundId') }}</span>
              <span class="panel-value">{{ roundInfo.roundId }}</span>
              <div class="w-100 d-flex flex-wrap">
                <div class="w-auto d-flex">
                  <span class="panel-label">{{ $t('__gameStartTime') }}</span>
                  <span class="panel-value">{{ roundInfo.startTime }}</span>
                </div>
                <div class="w-auto d-flex">
                  <span class="panel-label">{{ $t('__gameEndTime') }}</span>
                  <span class="panel-value">{{ roundInfo.endTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="comp">
            <div class="result-detail-container ">
              <div class="result-detail" style="width: 650px;">
                <div class="d-flex cards flex-wrap" style="margin-bottom: -1.1rem;">
                  <div class="player">
                    <div class="w-100 mt-3" />
                    <div class="text-blue text-left">{{ $t('__player') }}</div>
                    <div class="d-flex">
                      <div class="poker-box  text-center" style="height: 6.15rem; width: 6.15rem; margin-top: 1.025rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[2]}.png`)" class="poker back" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                      <div class="poker-box  text-center" style="height: 6.15rem; width: 4.1rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[0]}.png`)" class="poker yellow mr-1" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                      <div class="poker-box  text-center" style="height: 6.15rem; width: 4.1rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[1]}.png`)" class="poker yellow mr-1" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                    </div>
                  </div>
                  <div style="height: 80%; border-right: 1px solid rgb(206, 150, 0); margin: auto 15px auto 10px;" />
                  <div class="banker pr-3 mr-3">
                    <div class="w-100 mt-3" />
                    <div class="text-red text-right">{{ $t('__banker') }}</div>
                    <div class="d-flex">
                      <div class="poker-box  text-center" style="height: 6.15rem; width: 4.1rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.BankerCard[0]}.png`)" class="poker yellow mr-1" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                      <div class="poker-box  text-center" style="height: 6.15rem; width: 4.1rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.BankerCard[1]}.png`)" class="poker yellow mr-1" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                      <div class="poker-box  text-center mr-0" style="height: 6.15rem; width: 6.15rem; margin-top: 1.025rem;">
                        <img :src="require(`@/assets/poker/${roundInfo.result.BankerCard[2]}.png`)" class="poker back" style="height: 6.15rem; width: 4.1rem;">
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="w-100 mt-3" />
                    <div class="desc">
                      <div class="d-flex">
                        <div class="d">
                          <span class="info">
                            <span class="text-yellow">{{ `${$t('__totalLength')}：` }}</span>
                            {{ `${countInfo.total} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-red">{{ `${$t('__banker')}：` }}</span>
                            {{ `${countInfo.banker} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-red">{{ `${$t('__bankerPair')}：` }}</span>
                            {{ `${countInfo.bankerPair} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-red">{{ `${$t('__bankerContinuousWin')}：` }}</span>
                            {{ `${countInfo.bankerInstantWin} ${$t('__round')}` }}
                          </span>
                        </div>
                        <div class="d">
                          <span class="info">
                            <span class="text-green">{{ `${$t('__tie')}：` }}</span>
                            {{ `${countInfo.tie} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-blue">{{ `${$t('__player')}：` }}</span>
                            {{ `${countInfo.player} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-blue">{{ `${$t('__playerPair')}：` }}</span>
                            {{ `${countInfo.playerPair} ${$t('__round')}` }}
                          </span>
                          <span class="info">
                            <span class="text-blue">{{ `${$t('__playerContinuousWin')}：` }}</span>
                            {{ `${countInfo.playerInstantWin} ${$t('__round')}` }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-100 mt-3" />
                <div class="road-card ml-0">
                  <div class="road road-comp is-column w-100">
                    <div class="main">
                      <div class="pan-container w-100" style="padding-top: 17.6471%;">
                        <div class="pan-body" :style="`width: ${bigRoad.roadData[0].length * 2.9}%;`">
                          <svg :viewBox="`0 0 ${bigRoad.roadData[0].length * 10} 60`" class="bigRoad" />
                        </div>
                      </div>
                      <div class="pan-container w-100" style="padding-top: 8.82355%;">
                        <div class="pan-body" :style="`width: ${bigEyeRoad.roadData[0].length * 1.45}%;`">
                          <svg :viewBox="`0 0 ${bigEyeRoad.roadData[0].length * 5} 30`" class="bigEyeRoad" />
                        </div>
                      </div>
                      <div class="d-flex">
                        <div class="pan-container" style="padding-top: 8.82355%;">
                          <div class="pan-body" :style="`width: ${smallEyeRoad.roadData[0].length * 2.9}%;`">
                            <svg :viewBox="`0 0 ${smallEyeRoad.roadData[0].length * 5} 30`" class="smallRoad" />
                          </div>
                        </div>
                        <div class="pan-container" style="padding-top: 8.82355%;">
                          <div class="pan-body" :style="`width: ${cockroachRoad.roadData[0].length * 2.9}%;`">
                            <svg :viewBox="`0 0 ${cockroachRoad.roadData[0].length * 5} 30`" class="cockroachRoad" />
                          </div>
                        </div>
                      </div>
                      <div class="pan-container w-100" style="padding-top: 35.2942%;">
                        <div class="pan-body" :style="`width: ${beadRoad.roadData[0].length * 5.8}%;`">
                          <svg :viewBox="`0 0 ${beadRoad.roadData[0].length * 20} 120`" class="beadRoad" />
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
  </dragResize>
</template>

<script>
import { getRoadArray } from '@/utils/roadLogic'
import DragResize from '@/components/DragResize'

const road = {
  roadData: [[]],
  allData: [[]],
  lastIndex: 0
}

export default {
  name: 'GameResultDialogPC',
  components: { DragResize },
  props: {
    'visible': {
      type: Boolean,
      require: true,
      default() {
        return false
      }
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
    },
    'groupRect': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'selectElRect': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
      bigRoad: JSON.parse(JSON.stringify(road)),
      bigEyeRoad: JSON.parse(JSON.stringify(road)),
      smallEyeRoad: JSON.parse(JSON.stringify(road)),
      cockroachRoad: JSON.parse(JSON.stringify(road)),
      beadRoad: JSON.parse(JSON.stringify(road)),
      top: 0,
      left: 0
    }
  },
  computed: {
  },
  watch: {
    'visible': {
      handler() {
        if (this.visible) {
          this.$nextTick(() => {
            const el = document.querySelector('.gameResultDialogPC')
            if (el) {
              const elPos = el.getBoundingClientRect()
              let top = this.selectElRect.top - this.groupRect.top + 30
              if ((top + elPos.height) > this.groupRect.height) {
                top = top - elPos.height - 40
              }
              this.top = top
              this.left = this.selectElRect.left - this.groupRect.left - elPos.width - 30
            } else {
              this.top = 0
              this.left = 0
            }
          })
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
          this.drawing();
        } else {
          this.bigRoad = JSON.parse(JSON.stringify(road));
          this.bigEyeRoad = JSON.parse(JSON.stringify(road));
          this.smallEyeRoad = JSON.parse(JSON.stringify(road));
          this.cockroachRoad = JSON.parse(JSON.stringify(road));
          this.beadRoad = JSON.parse(JSON.stringify(road));
        }
      },
      immediate: true
    }
  },
  methods: {
    drawing() {
      var bigRoadLastIndex = this.bigRoad.lastIndex;
      if (bigRoadLastIndex < 34) {
        bigRoadLastIndex = 34
      }
      for (let i = 0, max = this.bigRoad.allData.length; i < max; i++) {
        this.bigRoad.roadData[i] = this.bigRoad.allData[i].slice(0, bigRoadLastIndex + 1);
      }
      this.bigRoad.roadData = JSON.parse(JSON.stringify(this.bigRoad.roadData));
      this.$nextTick(() => {
        const bigRoadEl = document.getElementsByClassName('bigRoad')[0]
        const width = this.bigRoad.roadData[0].length * 10
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('width', width)
        rect.setAttribute('height', 60)
        rect.setAttribute('class', 'frame')
        rect.setAttribute('style', 'fill: rgb(255, 255, 255);')
        bigRoadEl.appendChild(rect)
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let points = ''
        for (let i = 0, max = this.bigRoad.roadData[0].length + 1; i < max; i++) {
          const x = i * 10
          points += i % 2 === 0 ? `${x},60 ${x},0 ` : `${x},0 ${x},60 `
        }
        for (let i = 0, max = this.bigRoad.roadData.length; i < max; i++) {
          const y = i * 10
          points += i % 2 === 0 ? `${width},${y} 0,${y} ` : `0,${y} ${width},${y} `
        }
        polyline.setAttribute('points', points)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('class', 'grid-line')
        polyline.setAttribute('style', 'stroke: rgb(170, 170, 170); stroke-width: 0.3;')
        bigRoadEl.appendChild(polyline)
        for (let i = 0, max = this.bigRoad.roadData.length; i < max; i++) {
          for (let j = 0, jMax = this.bigRoad.roadData[i].length; j < jMax; j++) {
            const item = this.bigRoad.roadData[i][j]
            const cell = document.createElementNS("http://www.w3.org/2000/svg", "g")
            cell.setAttribute('class', 'cell')
            const ball = document.createElementNS("http://www.w3.org/2000/svg", "g")
            ball.setAttribute('class', 'ball')
            if (item.split('_')[3] === '1') {
              const currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
              currentRect.setAttribute('class', 'frame current')
              currentRect.setAttribute('x', `${j * 10}`)
              currentRect.setAttribute('y', `${i * 10}`)
              currentRect.setAttribute('width', 10)
              currentRect.setAttribute('height', 10)
              ball.appendChild(currentRect)
            }
            const winnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            let winnerCircleClassName = ''
            if (item.split('_')[0] === '1') {
              winnerCircleClassName += 'banker-hollow'
            } else if (item.split('_')[0] === '2') {
              winnerCircleClassName += 'player-hollow'
            }
            winnerCircle.setAttribute('class', winnerCircleClassName)
            winnerCircle.setAttribute('cx', `${5 + (j * 10)}`)
            winnerCircle.setAttribute('cy', `${5 + (i * 10)}`)
            winnerCircle.setAttribute('r', '3.5')
            ball.appendChild(winnerCircle)
            if (item.split('_')[1] === '1' || item.split('_')[1] === '3') {
              const bankerPairCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
              bankerPairCircle.setAttribute('class', 'banker-solid')
              bankerPairCircle.setAttribute('cx', `${2.5 + (j * 10)}`)
              bankerPairCircle.setAttribute('cy', `${2.5 + (i * 10)}`)
              bankerPairCircle.setAttribute('r', '1')
              ball.appendChild(bankerPairCircle)
            }
            if (item.split('_')[1] === '2' || item.split('_')[1] === '3') {
              const playerPairCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
              playerPairCircle.setAttribute('class', 'player-solid')
              playerPairCircle.setAttribute('cx', `${7.5 + (j * 10)}`)
              playerPairCircle.setAttribute('cy', `${7.5 + (i * 10)}`)
              playerPairCircle.setAttribute('r', '1')
              ball.appendChild(playerPairCircle)
            }
            if (item.split('_')[0] === '3' || item.split('_')[2] === '1') {
              const winnerTieLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
              winnerTieLine.setAttribute('class', 'tie-hollow')
              winnerTieLine.setAttribute('x1', `${7 + (j * 10)}`)
              winnerTieLine.setAttribute('y1', `${3 + (i * 10)}`)
              winnerTieLine.setAttribute('x2', `${3 + (j * 10)}`)
              winnerTieLine.setAttribute('y2', `${7 + (i * 10)}`)
              ball.appendChild(winnerTieLine)
            }
            if (item.split('_')[0] === '3' && Number(item.split('_')[2]) >= 1) {
              const tieCount = document.createElementNS("http://www.w3.org/2000/svg", "text")
              tieCount.setAttribute('class', 'tieCount')
              tieCount.setAttribute('x', `${2.5 + (j * 10)}`)
              tieCount.setAttribute('y', `${8 + (i * 10)}`)
              tieCount.setAttribute('font-size', 8)
              tieCount.innerHTML = `${Number(item.split('_')[2]) + 1}`
              ball.appendChild(tieCount)
            } else if (Number(item.split('_')[2]) > 1) {
              const tieCount = document.createElementNS("http://www.w3.org/2000/svg", "text")
              tieCount.setAttribute('class', 'tieCount')
              tieCount.setAttribute('x', `${2.5 + (j * 10)}`)
              tieCount.setAttribute('y', `${8 + (i * 10)}`)
              tieCount.setAttribute('font-size', 8)
              tieCount.innerHTML = `${Number(item.split('_')[2])}`
              ball.appendChild(tieCount)
            }
            cell.appendChild(ball)
            bigRoadEl.appendChild(cell)
          }
        }
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', 0)
        line1.setAttribute('y1', 0)
        line1.setAttribute('x2', width)
        line1.setAttribute('y2', 0)
        line1.setAttribute('stroke', '#333')
        line1.setAttribute('stroke-width', '0.6')
        bigRoadEl.appendChild(line1)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', 0)
        line2.setAttribute('y1', 59.7)
        line2.setAttribute('x2', width)
        line2.setAttribute('y2', 59.7)
        line2.setAttribute('stroke', '#333')
        line2.setAttribute('stroke-width', '0.6')
        bigRoadEl.appendChild(line2)
      })

      var bigEyeRoadLastIndex = this.bigEyeRoad.lastIndex;
      if (bigEyeRoadLastIndex < 68) {
        bigEyeRoadLastIndex = 68
      }
      for (let i = 0, max = this.bigEyeRoad.allData.length; i < max; i++) {
        this.bigEyeRoad.roadData[i] = this.bigEyeRoad.allData[i].slice(0, bigEyeRoadLastIndex + 1);
      }
      this.bigEyeRoad.roadData = JSON.parse(JSON.stringify(this.bigEyeRoad.roadData));
      this.$nextTick(() => {
        const bigEyeRoadEl = document.getElementsByClassName('bigEyeRoad')[0]
        const width = this.bigEyeRoad.roadData[0].length * 10
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('width', width)
        rect.setAttribute('height', 30)
        rect.setAttribute('class', 'frame')
        rect.setAttribute('style', 'fill: rgb(255, 255, 255);')
        bigEyeRoadEl.appendChild(rect)
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let points = ''
        for (let i = 0, max = this.bigEyeRoad.roadData[0].length + 1; i < max; i++) {
          const x = i * 10
          points += i % 2 === 0 ? `${x},30 ${x},0 ` : `${x},0 ${x},30 `
        }
        for (let i = 0, max = this.bigEyeRoad.roadData.length; i < max; i++) {
          const y = i * 10
          points += i % 2 === 0 ? `${width},${y} 0,${y} ` : `0,${y} ${width},${y} `
        }
        polyline.setAttribute('points', points)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('class', 'grid-line')
        polyline.setAttribute('style', 'stroke: rgb(170, 170, 170); stroke-width: 0.3;')
        bigEyeRoadEl.appendChild(polyline)
        for (let i = 0, max = this.bigEyeRoad.roadData.length; i < max; i++) {
          for (let j = 0, jMax = this.bigEyeRoad.roadData[i].length; j < jMax; j++) {
            const item = this.bigEyeRoad.roadData[i][j]
            const cell = document.createElementNS("http://www.w3.org/2000/svg", "g")
            cell.setAttribute('class', 'cell')
            const ball = document.createElementNS("http://www.w3.org/2000/svg", "g")
            ball.setAttribute('class', 'threeSmallRoadBall')
            ball.setAttribute('style', 'stroke-width: 0.7;')
            if (item.split('_')[1] === '1') {
              const currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
              currentRect.setAttribute('class', 'frame current')
              currentRect.setAttribute('x', `${j * 5}`)
              currentRect.setAttribute('y', `${i * 5}`)
              currentRect.setAttribute('width', 5)
              currentRect.setAttribute('height', 5)
              ball.appendChild(currentRect)
            }
            const winnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            let winnerCircleClassName = ''
            if (item.split('_')[0] === '1') {
              winnerCircleClassName += 'banker-hollow'
            } else if (item.split('_')[0] === '2') {
              winnerCircleClassName += 'player-hollow'
            }
            winnerCircle.setAttribute('class', winnerCircleClassName)
            winnerCircle.setAttribute('cx', `${2.5 + (j * 5)}`)
            winnerCircle.setAttribute('cy', `${2.5 + (i * 5)}`)
            winnerCircle.setAttribute('r', '1.7')
            ball.appendChild(winnerCircle)
            cell.appendChild(ball)
            bigEyeRoadEl.appendChild(cell)
          }
        }
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', 0)
        line1.setAttribute('y1', 0)
        line1.setAttribute('x2', width)
        line1.setAttribute('y2', 0)
        line1.setAttribute('stroke', '#333')
        line1.setAttribute('stroke-width', '0.6')
        bigEyeRoadEl.appendChild(line1)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', 0)
        line2.setAttribute('y1', 29.7)
        line2.setAttribute('x2', width)
        line2.setAttribute('y2', 29.7)
        line2.setAttribute('stroke', '#333')
        line2.setAttribute('stroke-width', '0.6')
        bigEyeRoadEl.appendChild(line2)
      })

      var smallEyeRoadLastIndex = this.smallEyeRoad.lastIndex;
      if (smallEyeRoadLastIndex < 34) {
        smallEyeRoadLastIndex = 34
      }
      for (let i = 0, max = this.smallEyeRoad.allData.length; i < max; i++) {
        this.smallEyeRoad.roadData[i] = this.smallEyeRoad.allData[i].slice(0, smallEyeRoadLastIndex + 1);
      }
      this.smallEyeRoad.roadData = JSON.parse(JSON.stringify(this.smallEyeRoad.roadData));
      this.$nextTick(() => {
        const smallRoadEl = document.getElementsByClassName('smallRoad')[0]
        const width = this.smallEyeRoad.roadData[0].length * 10
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('width', width)
        rect.setAttribute('height', 30)
        rect.setAttribute('class', 'frame')
        rect.setAttribute('style', 'fill: rgb(255, 255, 255);')
        smallRoadEl.appendChild(rect)
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let points = ''
        for (let i = 0, max = this.smallEyeRoad.roadData[0].length + 1; i < max; i++) {
          const x = i * 10
          points += i % 2 === 0 ? `${x},30 ${x},0 ` : `${x},0 ${x},30 `
        }
        for (let i = 0, max = this.smallEyeRoad.roadData.length; i < max; i++) {
          const y = i * 10
          points += i % 2 === 0 ? `${width},${y} 0,${y} ` : `0,${y} ${width},${y} `
        }
        polyline.setAttribute('points', points)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('class', 'grid-line')
        polyline.setAttribute('style', 'stroke: rgb(170, 170, 170); stroke-width: 0.3;')
        smallRoadEl.appendChild(polyline)
        for (let i = 0, max = this.smallEyeRoad.roadData.length; i < max; i++) {
          for (let j = 0, jMax = this.smallEyeRoad.roadData[i].length; j < jMax; j++) {
            const item = this.smallEyeRoad.roadData[i][j]
            const cell = document.createElementNS("http://www.w3.org/2000/svg", "g")
            cell.setAttribute('class', 'cell')
            const ball = document.createElementNS("http://www.w3.org/2000/svg", "g")
            ball.setAttribute('class', 'threeSmallRoadBall')
            if (item.split('_')[1] === '1') {
              const currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
              currentRect.setAttribute('class', 'frame current')
              currentRect.setAttribute('x', `${j * 5}`)
              currentRect.setAttribute('y', `${i * 5}`)
              currentRect.setAttribute('width', 5)
              currentRect.setAttribute('height', 5)
              ball.appendChild(currentRect)
            }
            const winnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            let winnerCircleClassName = ''
            if (item.split('_')[0] === '1') {
              winnerCircleClassName += 'banker-solid'
            } else if (item.split('_')[0] === '2') {
              winnerCircleClassName += 'player-solid'
            }
            winnerCircle.setAttribute('class', winnerCircleClassName)
            winnerCircle.setAttribute('cx', `${2.5 + (j * 5)}`)
            winnerCircle.setAttribute('cy', `${2.5 + (i * 5)}`)
            winnerCircle.setAttribute('r', '1.2')
            ball.appendChild(winnerCircle)
            cell.appendChild(ball)
            smallRoadEl.appendChild(cell)
          }
        }
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', 0)
        line1.setAttribute('y1', 0)
        line1.setAttribute('x2', width)
        line1.setAttribute('y2', 0)
        line1.setAttribute('stroke', '#333')
        line1.setAttribute('stroke-width', '0.6')
        smallRoadEl.appendChild(line1)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', 0)
        line2.setAttribute('y1', 29.7)
        line2.setAttribute('x2', width)
        line2.setAttribute('y2', 29.7)
        line2.setAttribute('stroke', '#333')
        line2.setAttribute('stroke-width', '0.6')
        smallRoadEl.appendChild(line2)
        const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line3.setAttribute('x1', (width / 2) - 0.3)
        line3.setAttribute('y1', 0)
        line3.setAttribute('x2', (width / 2) - 0.3)
        line3.setAttribute('y2', 30)
        line3.setAttribute('stroke', '#333')
        line3.setAttribute('stroke-width', '0.6')
        smallRoadEl.appendChild(line3)
      })

      var cockroachRoadLastIndex = this.cockroachRoad.lastIndex
      if (cockroachRoadLastIndex < 34) {
        cockroachRoadLastIndex = 34
      }
      for (let i = 0, max = this.cockroachRoad.allData.length; i < max; i++) {
        this.cockroachRoad.roadData[i] = this.cockroachRoad.allData[i].slice(0, cockroachRoadLastIndex + 1);
      }
      this.cockroachRoad.roadData = JSON.parse(JSON.stringify(this.cockroachRoad.roadData));
      this.$nextTick(() => {
        const cockroachRoadEl = document.getElementsByClassName('cockroachRoad')[0]
        const width = this.cockroachRoad.roadData[0].length * 10
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('width', width)
        rect.setAttribute('height', 30)
        rect.setAttribute('class', 'frame')
        rect.setAttribute('style', 'fill: rgb(255, 255, 255);')
        cockroachRoadEl.appendChild(rect)
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let points = ''
        for (let i = 0, max = this.cockroachRoad.roadData[0].length + 1; i < max; i++) {
          const x = i * 10
          points += i % 2 === 0 ? `${x},30 ${x},0 ` : `${x},0 ${x},30 `
        }
        for (let i = 0, max = this.cockroachRoad.roadData.length; i < max; i++) {
          const y = i * 10
          points += i % 2 === 0 ? `${width},${y} 0,${y} ` : `0,${y} ${width},${y} `
        }
        polyline.setAttribute('points', points)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('class', 'grid-line')
        polyline.setAttribute('style', 'stroke: rgb(170, 170, 170); stroke-width: 0.3;')
        cockroachRoadEl.appendChild(polyline)
        for (let i = 0, max = this.cockroachRoad.roadData.length; i < max; i++) {
          for (let j = 0, jMax = this.cockroachRoad.roadData[i].length; j < jMax; j++) {
            const item = this.cockroachRoad.roadData[i][j]
            const cell = document.createElementNS("http://www.w3.org/2000/svg", "g")
            cell.setAttribute('class', 'cell')
            const ball = document.createElementNS("http://www.w3.org/2000/svg", "g")
            ball.setAttribute('class', 'threeSmallRoadBall')
            if (item.split('_')[1] === '1') {
              const currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
              currentRect.setAttribute('class', 'frame current')
              currentRect.setAttribute('x', `${j * 5}`)
              currentRect.setAttribute('y', `${i * 5}`)
              currentRect.setAttribute('width', 5)
              currentRect.setAttribute('height', 5)
              ball.appendChild(currentRect)
            }
            const winnerLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
            let winnerLineClassName = ''
            if (item.split('_')[0] === '1') {
              winnerLineClassName += 'banker-hollow'
            } else if (item.split('_')[0] === '2') {
              winnerLineClassName += 'player-hollow'
            }
            winnerLine.setAttribute('class', winnerLineClassName)
            winnerLine.setAttribute('x1', `${4 + (j * 5)}`)
            winnerLine.setAttribute('y1', `${1 + (i * 5)}`)
            winnerLine.setAttribute('x2', `${1 + (j * 5)}`)
            winnerLine.setAttribute('y2', `${4 + (i * 5)}`)
            ball.appendChild(winnerLine)
            cell.appendChild(ball)
            cockroachRoadEl.appendChild(cell)
          }
        }
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', 0)
        line1.setAttribute('y1', 0)
        line1.setAttribute('x2', width)
        line1.setAttribute('y2', 0)
        line1.setAttribute('stroke', '#333')
        line1.setAttribute('stroke-width', '0.6')
        cockroachRoadEl.appendChild(line1)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', 0)
        line2.setAttribute('y1', 29.7)
        line2.setAttribute('x2', width)
        line2.setAttribute('y2', 29.7)
        line2.setAttribute('stroke', '#333')
        line2.setAttribute('stroke-width', '0.6')
        cockroachRoadEl.appendChild(line2)
      })

      var beadRoadLastIndex = this.beadRoad.lastIndex
      if (beadRoadLastIndex < 17) {
        beadRoadLastIndex = 17
      }
      for (let i = 0, max = this.beadRoad.allData.length; i < max; i++) {
        this.beadRoad.roadData[i] = this.beadRoad.allData[i].slice(0, beadRoadLastIndex + 1);
      }
      this.beadRoad.roadData = JSON.parse(JSON.stringify(this.beadRoad.roadData));
      this.$nextTick(() => {
        const beadRoadEl = document.getElementsByClassName('beadRoad')[0]
        const width = this.beadRoad.roadData[0].length * 20
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('width', width)
        rect.setAttribute('height', 120)
        rect.setAttribute('class', 'frame')
        rect.setAttribute('style', 'fill: rgb(255, 255, 255);')
        beadRoadEl.appendChild(rect)
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let points = ''
        for (let i = 0, max = this.beadRoad.roadData[0].length + 1; i < max; i++) {
          const x = i * 20
          points += i % 2 === 0 ? `${x},120 ${x},0 ` : `${x},0 ${x},120 `
        }
        for (let i = 0, max = this.beadRoad.roadData.length; i < max; i++) {
          const y = i * 20
          points += i % 2 === 0 ? `${width},${y} 0,${y} ` : `0,${y} ${width},${y} `
        }
        polyline.setAttribute('points', points)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('class', 'grid-line')
        polyline.setAttribute('style', 'stroke: rgb(170, 170, 170); stroke-width: 0.3;')
        beadRoadEl.appendChild(polyline)
        for (let i = 0, max = this.beadRoad.roadData.length; i < max; i++) {
          for (let j = 0, jMax = this.beadRoad.roadData[i].length; j < jMax; j++) {
            const item = this.beadRoad.roadData[i][j]
            const cell = document.createElementNS("http://www.w3.org/2000/svg", "g")
            cell.setAttribute('class', 'cell')
            const ball = document.createElementNS("http://www.w3.org/2000/svg", "g")
            ball.setAttribute('class', 'ball')
            if (item.split('_')[2] === '1') {
              const currentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
              currentRect.setAttribute('class', 'frame current')
              currentRect.setAttribute('x', `${j * 20}`)
              currentRect.setAttribute('y', `${i * 20}`)
              currentRect.setAttribute('width', 20)
              currentRect.setAttribute('height', 20)
              ball.appendChild(currentRect)
            }
            const winnerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            let winnerCircleClassName = ''
            let winnerText = ''
            if (item.split('_')[0] === '1') {
              winnerCircleClassName += 'banker-solid'
              winnerText = this.$t('__banker')
            } else if (item.split('_')[0] === '2') {
              winnerCircleClassName += 'player-solid'
              winnerText = this.$t('__player')
            } else if (item.split('_')[0] === '3') {
              winnerCircleClassName += 'tie-solid'
              winnerText = this.$t('__tie')
            }
            winnerCircle.setAttribute('class', winnerCircleClassName)
            winnerCircle.setAttribute('cx', `${10 + (j * 20)}`)
            winnerCircle.setAttribute('cy', `${10 + (i * 20)}`)
            winnerCircle.setAttribute('r', '7')
            winnerCircle.setAttribute('style', 'stroke: none; stroke-width: 0.5;')
            ball.appendChild(winnerCircle)
            if (item.split('_')[1] === '1' || item.split('_')[1] === '3') {
              const bankerPairCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
              bankerPairCircle.setAttribute('cx', `${5 + (j * 20)}`)
              bankerPairCircle.setAttribute('cy', `${5 + (i * 20)}`)
              bankerPairCircle.setAttribute('r', '2')
              bankerPairCircle.setAttribute('style', 'fill: rgb(255, 32, 23); stroke: rgb(255, 255, 255); stroke-width: 0.1;')
              ball.appendChild(bankerPairCircle)
            }
            if (item.split('_')[1] === '2' || item.split('_')[1] === '3') {
              const playerPairCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
              playerPairCircle.setAttribute('cx', `${15 + (j * 20)}`)
              playerPairCircle.setAttribute('cy', `${15 + (i * 20)}`)
              playerPairCircle.setAttribute('r', '2')
              playerPairCircle.setAttribute('style', 'fill: rgb(0, 144, 255); stroke: rgb(255, 255, 255); stroke-width: 0.1;')
              ball.appendChild(playerPairCircle)
            }
            const winnerTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
            winnerTextEl.setAttribute('class', 'winnerText')
            winnerTextEl.setAttribute('x', `${10 + (j * 20)}`)
            winnerTextEl.setAttribute('y', `${14 + (i * 20)}`)
            winnerTextEl.setAttribute('text-anchor', 'middle')
            winnerTextEl.setAttribute('style', 'font-size: 10px; font-weight: bolder;')
            winnerTextEl.innerHTML = winnerText
            ball.appendChild(winnerTextEl)
            cell.appendChild(ball)
            beadRoadEl.appendChild(cell)
          }
        }
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', 0)
        line1.setAttribute('y1', 0)
        line1.setAttribute('x2', width)
        line1.setAttribute('y2', 0)
        line1.setAttribute('stroke', '#333')
        line1.setAttribute('stroke-width', '0.6')
        beadRoadEl.appendChild(line1)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', 0)
        line2.setAttribute('y1', 119.7)
        line2.setAttribute('x2', width)
        line2.setAttribute('y2', 119.7)
        line2.setAttribute('stroke', '#333')
        line2.setAttribute('stroke-width', '0.6')
        beadRoadEl.appendChild(line2)
      })
    },
    onClose() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
#app.pc {
  .gameResultDialog {
    cursor: move;
    .pop-over {
      .panel {
        .game-result-detail {
          padding-left: 5px;
          padding-right: 5px;
          .result-detail {
            width: 100%;
            margin: 0 auto;
            font-weight: bold;
            .poker-box {
              margin-right: 5px;
              .poker {
                &.back {
                  -webkit-transform: rotate(90deg);
                  transform: rotate(90deg);
                  -webkit-transform-origin: center;
                  transform-origin: center;
                }
              }
            }
            .desc {
              color: #fff;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              white-space: nowrap;
              word-break: keep-all;
              .info {
                margin-right: 0.83333rem;
                margin-bottom: 0.83333rem;
                white-space: nowrap;
                word-break: keep-all;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
              }
            }
            .road-card {
              //整個滾動條
              ::-webkit-scrollbar {
                width: 4px;
                height: 4px;
                //滾動條上的滾動滑塊
                &-thumb {
                  border-radius: 3px;
                  // border: none;
                  border-top: 1px solid rgba(0, 0, 0, 0);
                  border-right: none;
                  border-bottom: none;
                  border-left: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
