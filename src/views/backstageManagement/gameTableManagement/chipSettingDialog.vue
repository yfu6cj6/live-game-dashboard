<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="view-container">
          <div class="flex-column">
            <div class="btnGroup">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick()">{{ $t("__refresh") }}</el-button>
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">{{ $t("__create") }}</el-button>
            </div>
            <div class="table-container">
              <div v-if="chipsData.length > 0" :list="chipsData" v-bind="$attrs">
                <div
                  v-for="(item, index) in chipsData"
                  :key="index"
                  class="item_row"
                >
                  <div class="item">
                    <span class="title">{{ $t('__amount') }}</span>
                    <span class="value">{{ item.amount }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </div>
              <div v-else-if="chipsData.length === 0" class="noData">{{ $t("__noInformation") }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel giftEditDialog backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="w-100 mb-2">
            <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick()">{{ $t("__refresh") }}</el-button>
            <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">{{ $t("__create") }}</el-button>
          </div>
          <div class="data_content">
            <div v-if="chipsData.length > 0" :list="chipsData" v-bind="$attrs">
              <div
                v-for="(item, index) in chipsData"
                :key="index"
                class="item_row"
              >
                <div class="item">
                  <span class="title">{{ $t('__amount') }}</span>
                  <span class="value">{{ item.amount }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                </div>
              </div>
            </div>
            <div v-else-if="chipsData.length === 0" class="noData">{{ $t("__noInformation") }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import common from '@/mixin/common';
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'ChipSettingDialog',
  components: {},
  mixins: [common, dialogCommon],
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
    'chipsData': {
      type: Array,
      require: true,
      default() {
        return []
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
  methods: {
    onSearchBtnClick() {
      this.$emit('search')
    },
    onCreateBtnClick() {
      this.$emit('create')
    },
    onEditBtnClick(item) {
      this.$emit('edit', JSON.parse(JSON.stringify(item)))
    },
    onDeleteBtnClick(item) {
      this.$emit('delete', JSON.parse(JSON.stringify(item)))
    }
  }
}
</script>

<style lang="scss" scoped>

.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: #fff;
  min-height: 10vh;
}

#app.mobile {
  .view-container {
    max-height: 70vh;
    .btnGroup {
      justify-content: flex-start;
      margin-bottom: 20px;
    }
    .table-container {
      background: #000;
      .item_row {
        border-bottom: 0.16667rem solid #fff;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem 0;
        align-items: center;
        margin-top: 0.5rem;
        padding: 0 1rem;
        .title {
          color: #f9c901;
        }
        .value {
          color: #fff;
        }
      }
      .operate {
        margin-bottom: 0.5rem;
      }
    }
  }
}
#app.pc {
  .data_content {
    background: #000;
    .item_row {
      border-bottom: 0.16667rem solid #fff;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.5rem 0;
      align-items: center;
      margin-top: 0.5rem;
      .item {
        width: 225px;
        display: flex;
        justify-content: space-between;
        .title {
          color: #f9c901;
          width: 50px;
          margin-right: 0.5rem;
        }
        .value {
          color: #fff;
          width: auto;
        }
      }
    }
    .operate {
      margin-bottom: 0.5rem;
    }
  }
}

</style>
