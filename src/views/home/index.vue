<template>
  <div class="scroll-wrap d-flex flex-column flex-fill">
    <div class="scroll-inner d-flex flex-column flex-fill">
      <div class="scroll-view d-flex flex-column flex-fill">
        <div class="home flex-column d-flex flex-fill bg-new-dark-white">
          <div class="scroll-wrap flex-column flex-fill">
            <div class="scroll-inner flex-column flex-fill">
              <div class="scroll-view flex-column flex-fill">
                <div class="notice-container w-100">
                  <div class="notices">
                    <div class="title font-weight-bold pb-3 text-center text-golden ">
                      {{ $t('__agencyAnnouncement') }}
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
      }
    }
  }
}

.home-container {
  max-width: calc(100% - 1.66667rem);
  margin: 0 auto;
  width: 100%;
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
      color: #ce9600;
      font-weight: 700;
      text-align: center;
      padding-bottom: 1rem;
    }
  }
}
</style>
