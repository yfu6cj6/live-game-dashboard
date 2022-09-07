<template>
  <div v-if="visible" class="playbackDialog">
    <div class="videoPlayer">
      <div class="video-wrap">
        <div class="video-cover" @click.stop="onClose" />
        <img v-if="playbackType === 1" :src="url">
        <video v-else-if="playbackType === 2" controls="controls" controlslist="nodownload">
          <source :src="url" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <div class="video-cover" @click.stop="onClose" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaybackDialogMobile',
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
    }
  },
  data: function() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onClose() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
#app.mobile {
  .playbackDialog {
    .videoPlayer {
      display: block;
      width: 100%;
      height: 100%;
      .video-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
        z-index: 10;
        .video-cover {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 100%;
          height: auto;
        }
        video,
        img {
          width: 90%;
          margin: 0 10%;
        }
      }
    }
  }
}
</style>
