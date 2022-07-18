<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="false"
  >
    <div class="loginBarcode">
      <img :src="form.dns1d" :alt="$t('__loginBarcode')">
    </div>
    <span v-if="!dialogLoading" slot="footer">
      <a :href="form.dns1d" :download="form.name">
        <el-button class="bg-yellow" size="mini">{{ $t("__loginBarcodeDownload") }}</el-button>
      </a>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'LoginBarcodeDialog',
  mixins: [dialogCommon],
  props: {
    title: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      require: true
    },
    form: {
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
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.loginBarcode {
  background-color: #fff;
  text-align: center;
  padding: 10px;
}

.el-button {
  width: 150px;
  height: 40px;
  font-size: 20px;
}
</style>
