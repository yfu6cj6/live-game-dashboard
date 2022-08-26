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
              <div v-else-if="chipsData.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
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
              <div class="item">
                <span class="header">{{ $t('__amount') }}</span>
                <span class="amount">{{ item.amount }}</span>
              </div>
              <div class="operate">
                <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
              </div>
            </div>
          </div>
          <div v-else-if="chipsData.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
        </div>
      </Dialog>
    </template>
  </div>
</template>

<script>
import common from '@/mixin/common';
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'ChipSettingDialog',
  components: { Dialog },
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

</style>
