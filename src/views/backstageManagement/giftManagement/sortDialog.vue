<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :width="formWidth"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="searchForm" :model="searchForm" label-width="80px" label-position="left">
      <el-form-item :label="$t('__currency')" prop="currency">
        <el-select v-model="searchForm.currency">
          <el-option v-for="item in searchItems.currency" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
        <el-button class="bg-yellow" @click="onSearch">{{ $t('__search') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table v-if="searched" :data="tableData" border stripe row-key="id" :max-height="viewHeight">
      <af-table-column prop="id" label="ID" align="center" :fontSize="20" />
      <af-table-column :label="$t('__giftImage')" align="center" :width="150">
        <template slot-scope="scope">
          <img class="giftImage" :src="scope.row.img_address" :alt="$t('__giftImage')">
        </template>
      </af-table-column>
      <af-table-column prop="nickname" :label="$t('__giftNickname')" align="center" :fontSize="20" />
      <af-table-column :label="$t('__value')" align="center" :width="150">
        <template slot-scope="scope">
          <span>{{ numberFormatStr(scope.row.value) }}</span>
        </template>
      </af-table-column>
    </el-table>

    <span v-if="searched && !dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { giftSearch, giftSort } from '@/api/backstageManagement/giftManagement'
import handleDialogWidth from '@/layout/mixin/handleDialogWidth'
import handlePageChange from '@/mixin/handlePageChange'
import handleViewResize from '@/layout/mixin/handleViewResize'
import { numberFormat } from '@/utils/numberFormat'
import Sortable from "sortablejs"

export default {
  name: 'SortDialog',
  mixins: [handleDialogWidth, handlePageChange, handleViewResize],
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
    confirm: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    form: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    searchItems: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
      searchForm: {},
      dialogLoading: false,
      searched: false
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
      }
    }
  },
  methods: {
    initSort() {
      const el = document.querySelectorAll(".el-dialog__body .el-table .el-table__body-wrapper > table > tbody")[0] // 獲取拖拽的容器 .table-list 一定是table上的class 如果是其他上的class名稱，可能會無法拖拽
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        // handle: ".drag-item", // 指定推拽列
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "")
        },
        onEnd: evt => {
          this.$nextTick(() => {
          	// 實現推拽的程式碼，先在原陣列中刪除當前推拽的物件，然後在將它新增到對應的位置
          	// targetObj當前推拽的物件，evt.oldIndex推拽物件原來的下標，evt.newIndex推拽物件要推拽到的下標
            let targetObj = this.tableData.splice(evt.oldIndex, 1)[0]
            this.tableData.splice(evt.newIndex, 0, targetObj)
          })
        }
      })
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    handleRespone(res) {
      this.totalCount = res.rows.length
      res.rows.sort((a, b) => { return a.sort_key - b.sort_key })
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const currencyItem = this.searchItems.currency.find(item => item.key === element.currency_id)
        if (currencyItem) {
          element.currency = currencyItem.nickname
        }
        const statusItem = this.searchItems.status.find(item => item.key === element.status)
        if (statusItem) {
          element.statusLabel = statusItem.nickname
        }
      })
      this.handlePageChangeByClient(this.currentPage)
      this.searched = true;

      this.$nextTick(() => {
        this.initSort()
      })

      this.dialogLoading = false
    },
    onSearch() {
      this.dialogLoading = true
      giftSearch({ currency: [this.searchForm.currency] }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    onSubmit() {
      var gifts = []
      this.tableData.forEach(element => {
        gifts.push(element.id)
      })
      this.dialogLoading = true
      giftSort({ gifts: gifts }).then((res) => {
        this.$emit('confirm', res)
        this.dialogLoading = false
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    onReset() {
      this.searchForm = JSON.parse(JSON.stringify(this.form))
      this.allDataByClient = []
      this.handlePageChangeByClient(this.currentPage)
      this.searched = false;
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
}

.el-select {
  width: 80%;
  margin-right: 10px;
}
</style>
