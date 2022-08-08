<template>
  <div class="scroll-wrap flex-column flex-fill">
    <div class="scroll-inner flex-column flex-fill">
      <div class="scroll-view flex-column flex-fill">
        <div class="home flex-column flex-fill bg-new-dark-white">
          <div class="scroll-wrap flex-column flex-fill">
            <div class="scroll-inner flex-column flex-fill">
              <div class="scroll-view flex-column flex-fill">
                <div class="notice-container w-100">
                  <div class="notices">
                    <div class="title font-weight-bold pb-3 text-center text-golden ">
                      {{ $t('__agencyAnnouncement') }}
                    </div>
                  </div>
                  <template v-if="showAgentAnnouncements">
                    <div
                      v-for="agentItem in agentAnnouncements"
                      :key="agentItem.id"
                      class="notices"
                    >
                      <div class="title">
                        <div class="inner d-flex">
                          <div class="d-flex flex-column">
                            <span class="label">{{ $t('__announcementTitle') }}:</span>
                            <span class="title">{{ agentItem.title }}</span>
                          </div>
                          <span class="ml-auto dateTime">{{ agentItem.announcement_started_at }}</span>
                        </div>
                      </div>
                      <div class="content">
                        <div class="inner" :class="{expanded: agentItem.open}">
                          <div class="text" :class="{'d-none': agentItem.open}">{{ agentItem.content }}</div>
                          <div class="text" :class="{'d-none': !agentItem.open}">{{ agentItem.fullContent }}</div>
                          <div class="cover lower" />
                        </div>
                      </div>
                      <div class="icon-outter" @click.stop="setAgentAnnouncementsExpanded(agentItem.id)">
                        <div class="fas clickable yellow" :class="{expanded: agentItem.open}">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.08333rem; width: 1.08333rem;"
                          >
                            <title>arrow1</title>
                            <path d="M31.49,30.14c-1.44,1.46-2.84,2.89-4.25,4.3-5.06,5.06-10.15,10.1-15.19,15.18-2,2.05-4.84,2.16-6.37.91A29.08,29.08,0,0,1,.83,45.65c-1.42-1.86-.93-4.42.81-6.2,2.08-2.13,4.2-4.22,6.31-6.33q9.81-9.81,19.63-19.64A5.12,5.12,0,0,1,33.25,12a6,6,0,0,1,2.14,1.38q10.38,10.32,20.7,20.7C57.73,35.7,59.36,37.36,61,39A5.72,5.72,0,0,1,63,42.62a4.48,4.48,0,0,1-1,3.52,47.11,47.11,0,0,1-4.12,4.12,4.87,4.87,0,0,1-6.31-.19c-1.85-1.73-3.61-3.55-5.41-5.33L31.88,30.48C31.78,30.38,31.67,30.3,31.49,30.14Z" />
                          </svg>
                        </div>
                        <div class="fas clickable yellow" :class="{expanded: !agentItem.open}">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.08333rem; width: 1.08333rem;"
                          >
                            <title>arrow2</title>
                            <path d="M31.51,32.86C33,31.4,34.35,30,35.76,28.56,40.82,23.5,45.91,18.46,51,13.38c2-2.05,4.84-2.16,6.37-.91a29.08,29.08,0,0,1,4.85,4.88c1.42,1.86.93,4.42-.81,6.2-2.08,2.13-4.2,4.22-6.31,6.33q-9.81,9.81-19.63,19.64A5.12,5.12,0,0,1,29.75,51a6,6,0,0,1-2.14-1.38Q17.23,39.32,6.91,28.94C5.27,27.3,3.64,25.64,2,24A5.72,5.72,0,0,1,0,20.38a4.48,4.48,0,0,1,1-3.52,47.11,47.11,0,0,1,4.12-4.12,4.87,4.87,0,0,1,6.31.19c1.85,1.73,3.61,3.55,5.41,5.33L31.12,32.52C31.22,32.62,31.33,32.7,31.51,32.86Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="notices">
                      <div class="title font-weight-bold pb-3 text-center text-golden ">
                        {{ $t('__noInformation') }}
                      </div>
                    </div>
                  </template>
                  <div class="notices">
                    <div class="title font-weight-bold pb-3 text-center text-golden ">
                      {{ $t('__gameAnnouncement') }}
                    </div>
                  </div>
                  <template v-if="showGameAnnouncements">
                    <div
                      v-for="gameItem in gameAnnouncements"
                      :key="gameItem.id"
                      class="notices"
                    >
                      <div class="title">
                        <div class="inner d-flex">
                          <div class="d-flex flex-column">
                            <span class="label">{{ $t('__announcementTitle') }}:</span>
                            <span class="title">{{ gameItem.title }}</span>
                          </div>
                          <span class="ml-auto dateTime">{{ gameItem.announcement_started_at }}</span>
                        </div>
                      </div>
                      <div class="content">
                        <div class="inner" :class="{expanded: gameItem.open}">
                          <div class="text" :class="{'d-none': gameItem.open}">{{ gameItem.content }}</div>
                          <div class="text" :class="{'d-none': !gameItem.open}">{{ gameItem.fullContent }}</div>
                          <div class="cover lower" />
                        </div>
                      </div>
                      <div class="icon-outter" @click.stop="setGameAnnouncementsExpanded(gameItem.id)">
                        <div class="fas clickable yellow" :class="{expanded: gameItem.open}">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.08333rem; width: 1.08333rem;"
                          >
                            <title>arrow1</title>
                            <path d="M31.49,30.14c-1.44,1.46-2.84,2.89-4.25,4.3-5.06,5.06-10.15,10.1-15.19,15.18-2,2.05-4.84,2.16-6.37.91A29.08,29.08,0,0,1,.83,45.65c-1.42-1.86-.93-4.42.81-6.2,2.08-2.13,4.2-4.22,6.31-6.33q9.81-9.81,19.63-19.64A5.12,5.12,0,0,1,33.25,12a6,6,0,0,1,2.14,1.38q10.38,10.32,20.7,20.7C57.73,35.7,59.36,37.36,61,39A5.72,5.72,0,0,1,63,42.62a4.48,4.48,0,0,1-1,3.52,47.11,47.11,0,0,1-4.12,4.12,4.87,4.87,0,0,1-6.31-.19c-1.85-1.73-3.61-3.55-5.41-5.33L31.88,30.48C31.78,30.38,31.67,30.3,31.49,30.14Z" />
                          </svg>
                        </div>
                        <div class="fas clickable yellow" :class="{expanded: !gameItem.open}">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.08333rem; width: 1.08333rem;"
                          >
                            <title>arrow2</title>
                            <path d="M31.51,32.86C33,31.4,34.35,30,35.76,28.56,40.82,23.5,45.91,18.46,51,13.38c2-2.05,4.84-2.16,6.37-.91a29.08,29.08,0,0,1,4.85,4.88c1.42,1.86.93,4.42-.81,6.2-2.08,2.13-4.2,4.22-6.31,6.33q-9.81,9.81-19.63,19.64A5.12,5.12,0,0,1,29.75,51a6,6,0,0,1-2.14-1.38Q17.23,39.32,6.91,28.94C5.27,27.3,3.64,25.64,2,24A5.72,5.72,0,0,1,0,20.38a4.48,4.48,0,0,1,1-3.52,47.11,47.11,0,0,1,4.12-4.12,4.87,4.87,0,0,1,6.31.19c1.85,1.73,3.61,3.55,5.41,5.33L31.12,32.52C31.22,32.62,31.33,32.7,31.51,32.86Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="notices">
                      <div class="title font-weight-bold pb-3 text-center text-golden ">
                        {{ $t('__noInformation') }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'gameAnnouncements',
      'agentAnnouncements'
    ]),
    showGameAnnouncements() {
      return this.gameAnnouncements.length > 0
    },
    showAgentAnnouncements() {
      return this.agentAnnouncements.length > 0
    }
  },
  created() {
  },
  methods: {
    setAgentAnnouncementsExpanded(id) {
      const obj = this.agentAnnouncements.find(item => item.id === id)
      obj.open = !obj.open
    },
    setGameAnnouncementsExpanded(id) {
      const obj = this.gameAnnouncements.find(item => item.id === id)
      obj.open = !obj.open
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.home {
  height: 100%;
  width: 100%;
  .notice-container {
    max-width: calc(100% - 1.66667rem);
    margin: 0 auto;
    padding-bottom: 2rem;
    .notices {
      color: #000;
      background-color: #fff;
      position: relative;
      padding: 0.83333rem 0.83333rem 0 0.83333rem;
      margin-top: 1.66667rem;
      -webkit-box-shadow: 0px 1px 3px 1px #a6a6a6;
      box-shadow: 0px 1px 3px 1px #a6a6a6;
      .title {
        width: 100%;
        margin-bottom: 0.83333rem;
        font-size: 1.39944rem;
        line-height: 1.2;
        .inner {
          padding: 0.625rem 0;
          color: #ce9600;
          .label {
            font-weight: bold;
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            padding-right: 0.41667rem;
          }
          .dateTime {
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            padding-left: 0.83333rem;
          }
        }
      }
      .content {
        top: 4.16667rem;
        background-color: #fff;
        overflow: hidden;
        .inner {
          height: 5.8rem;
          line-height: 1.25;
          background-color: #fff;
          position: relative;
          font-size: 1.39944rem;
          .text {
            word-break: break-all;
          }
          .cover {
            width: 100%;
            height: 4.19832rem;
            background-color: #fff;
            position: relative;
          }
          &.expanded {
            height: auto;
          }
        }
      }
      .icon-outter {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        height: 2.09916rem;
        text-align: right;
        padding-right: 0.83333rem;
        .fas {
          display: none;
        }
        .expanded {
          display: block;
        }
      }
    }
  }
}
</style>
