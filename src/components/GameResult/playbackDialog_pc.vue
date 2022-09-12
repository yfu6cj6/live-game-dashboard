<template v-if="visible">
  <dragResize
    ref="dragResize"
    class="playbackDialog"
    :auto-init="false"
    :show-stick="false"
    :x="left"
    :y="top"
    :z="1"
    :w="1005"
    :h="598.56"
    :minw="300"
    :minh="200"
    :parent-limitation="true"
    :aspect-ratio="true"
  >
    <div class="pop-over bg-black">
      <div class="panel">
        <div class="fas icon-close text-link yellow" style="height: 1.77778rem; width: 1.77778rem;" @click.stop="onClose">
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
                d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,
                19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,
                42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,
                2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,
                0-4.242L28.228,23.986z"
              />
            </g>
          </svg>
        </div>
        <div class="panel-title pos-r">
          <div class="w-100 d-flex flex-wrap align-items-center">
            <span class="panel-label">{{ $t('__game') }}</span>
            <span class="panel-value">{{ data.game_type }}</span>
            <span class="panel-label">{{ $t('__roundId') }}</span>
            <span class="panel-value">{{ data.round_id }}</span>
          </div>
        </div>
        <div class="videoPlayer">
          <img v-if="playbackType === 1" class="playbackPic" :class="{autoSize: startMove}" :src="url">
          <video v-else-if="playbackType === 2" :class="{autoSize: startMove}" controls controlslist="nodownload" autoplay>
            <source :src="url" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div
          class="fas nwse-resize gray"
          @mousedown.stop.prevent="stickDown($event)"
          @touchstart.stop.prevent="stickDown($event)"
          @touchend.stop.prevent="up($event)"
        >
          <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="height: 1.33333rem; width: 1.33333rem;"
            xml:space="preserve"
          >
            <path
              d="M496,0H304c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16h98.752L64,402.752V304c0-8.832-7.168-16-16-16H16    c-8.832,0-16,7.168-16,
              16v192c0,8.832,7.168,16,16,16h192c8.832,0,16-7.168,16-16v-32c0-8.832-7.168-16-16-16h-98.752L448,109.248    V208c0,8.832,7.168,16,16,
              16h32c8.832,0,16-7.168,16-16V16C512,7.168,504.832,0,496,0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </dragResize>
</template>

<script>
import DragResize from '@/components/DragResize'

export default {
  name: 'PlaybackDialogPC',
  components: { DragResize },
  props: {
    'data': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'visible': {
      type: Boolean,
      require: true,
      default() {
        return false
      }
    },
    'playbackType': {
      type: Number,
      require: true,
      default() {
        return 1
      }
    },
    'url': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'clickClassName': {
      type: String,
      require: true,
      default() {
        return ''
      }
    }
  },
  data: function() {
    return {
      top: 0,
      left: 0,
      startMove: false
    }
  },
  computed: {
  },
  watch: {
    'visible': {
      handler() {
        if (this.visible) {
          this.$nextTick(() => {
            const parentRect = this.$el.parentNode.getBoundingClientRect()
            const clickEl = document.querySelector(this.clickClassName)
            if (clickEl) {
              const clickElRect = clickEl.getBoundingClientRect()
              const top = clickElRect.top - parentRect.top + 30
              let setTop = top
              if ((setTop + 598.56) > parentRect.height) {
                setTop = setTop - 598.56 - 40
              }
              if (setTop < parentRect.top) {
                setTop = top
              }
              this.top = setTop
              this.left = clickElRect.left - parentRect.left
            } else {
              this.top = 0
              this.left = 0
            }
            this.$refs.dragResize.init()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    stickDown(ev) {
      this.$refs.dragResize.bodyDown(ev)
      this.$refs.dragResize.up(ev)
      this.startMove = true
      this.$nextTick(() => {
        this.$refs.dragResize.stickDown('br', ev)
      })
    },
    up(ev) {
      this.$refs.dragResize.up(ev)
    },
    onClose() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
#app.pc {
  .playbackDialog {
    cursor: move;
    .pop-over {
      .panel {
        .videoPlayer {
        display: block;
        width: 100%;
        height: 100%;
        margin-top: 10px;
          video,
          img {
            width: 993px;
            &.autoSize {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
