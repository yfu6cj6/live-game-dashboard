<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <img v-if="playbackType === 1" class="playbackPic" :src="url">
    <div v-else-if="playbackType === 2" class="playbackUrl">
      <video class="video" controls>
        <source :src="url" type="video/mp4">
      </video>
    </div>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'PlaybackDialog',
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
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.playbackPic {
  width: 100%;
}

.playbackUrl {
  text-align: center;

  .video {
    width: 1080px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
