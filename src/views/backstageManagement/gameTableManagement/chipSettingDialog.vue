<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="operate btnGroup">
      <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick()">{{ $t("__refresh") }}</el-button>
      <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">{{ $t("__create") }}</el-button>
    </div>
    <div class="view-container-table">
      <div v-if="chipsData.length > 0" :list="chipsData" v-bind="$attrs">
        <div
          v-for="(item, index) in chipsData"
          :key="index"
          class="view-container-table-row"
          :class="{'single-row': index % 2 === 0}"
        >
          <div class="wrap">
            <div class="left">
              <div class="item">
                <span class="header">{{ $t('__amount') }}</span>
                <span>{{ item.amount }}</span>
              </div>
            </div>
            <div>
              <div class="operate">
                <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="chipsData.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
    </div>
  </el-dialog>
</template>

<script>
import common from '@/mixin/common';
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'ChipSettingDialog',
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
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"${this.$t('__amount')}: ${item.amount}"`]), () => {
        this.$emit('delete', JSON.parse(JSON.stringify(item)))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btnGroup {
  justify-content: start;
  margin-bottom: 20px;
}
.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          .left {
            width: 50%;
            display: flex;
            align-items: center;
          }
        }
      }
      .noInformation {
        color: #fff;
        font-size: 18px;
        padding-bottom: 20px;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          .wrap {
            .item {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
