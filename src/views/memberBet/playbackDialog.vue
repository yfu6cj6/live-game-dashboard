<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <img v-if="playbackType === 1" class="playbackPic" :src="url">
    <div v-else-if="playbackType === 2" class="playbackUrl">
      <video class="video" controls>
        <source :src="url" type="video/mp4">
      </video>
    </div>
  </Dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'PlaybackDialog',
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
