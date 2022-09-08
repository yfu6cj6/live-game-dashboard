<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="notice-cover" @click="onClose" />
      <div class="fadeInUp pp notice animated">
        <div class="scroll-wrap float">
          <div class="scroll-inner off">
            <div class="scroll-view loginBarcode" style="display: block; position: static; max-height: 50vh;">
              <img :src="form.dns1d" :alt="$t('__loginBarcode')">
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-center" style="margin-top: 1.5rem;">
          <a :href="form.dns1d" :download="form.name">
            <button type="button" class="el-button bg-yellow common-button el-button--primary" @click.stop="onSubmit">
              <span>{{ $t('__loginBarcodeDownload') }}</span>
            </button>
          </a>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp" style="max-width: 600px; min-width: unset;">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="data_content">
            <div class="scroll-view loginBarcode" style="display: block; position: static; max-height: 50vh;">
              <img :src="form.dns1d" :alt="$t('__loginBarcode')">
            </div>
          </div>
          <div class="operate_content">
            <div class="d-flex w-100 justify-content-center" style="margin-top: 1.5rem;">
              <a :href="form.dns1d" :download="form.name">
                <button type="button" class="el-button bg-yellow common-button el-button--primary" @click.stop="onSubmit">
                  <span>{{ $t('__loginBarcodeDownload') }}</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginBarcodeDialog',
  components: {},
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
    ...mapGetters([
      'sidebar'
    ])
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

#app.pc {
  .backstage_dialog {
    .data_content {
      width: 300px;
      margin-top: 1rem;
    }
  }
}
</style>
