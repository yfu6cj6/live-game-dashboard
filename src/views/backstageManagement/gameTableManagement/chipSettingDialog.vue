<template>
  <el-dialog v-loading="dialogLoading" :title="title" :visible.sync="visible" :width="formWidth" :before-close="onClose" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick()">{{ $t("__refresh") }}</el-button>
    <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">{{ $t("__create") }}</el-button>
    <el-table :data="chipsData" tooltip-effect="dark" header-cell-class-name="bg-black_table_header" row-class-name="bg-black_table_col" style="background: black; margin-top:15px;">
      <el-table-column prop="amount" :label="$t('__amount')" align="center" :show-overflow-tooltip="true" />
      <el-table-column :label="$t('__operate')" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(scope.row)">{{ $t("__edit") }}</el-button>
          <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(scope.row)">{{ $t("__delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import handleDialogWidth from '@/layout/mixin/handleDialogWidth'
import common from '@/layout/mixin/common'

export default {
  name: 'ChipSettingDialog',
  mixins: [handleDialogWidth, common],
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
      dialogLoading: false
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
    },
    onClose() {
      this.$emit('close')
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    }
  }
}
</script>

<style scoped>
.el-table--fit {
  padding: 0 0 10px 0
}
</style>
