<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="false"
  >
    <el-form :model="searchForm">
      <el-form-item :label="$t('__currency')" prop="currency">
        <el-select v-model="searchForm.currency">
          <el-option v-for="item in currency" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
        <el-button class="bg-yellow search" @click="onSearch()">{{ $t('__search') }}</el-button>
      </el-form-item>
    </el-form>
    <template v-if="searched">
      <draggable :list="tableData" v-bind="$attrs" class="test" :set-data="setData">
        <div
          v-for="(item, index) in tableData"
          :key="index"
        >
          <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
          <span>{{ item.id }}</span>
          <span>{{ item.nickname }}</span>
          <span>{{ item.value }}</span>
        </div>
      </draggable>
    </template>
    <span v-if="searched && !dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onSubmit()">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { giftSearch } from '@/api/backstageManagement/giftManagement'
import draggable from 'vuedraggable'
import dialogCommon from '@/mixin/dialogCommon'
import handlePageChange from '@/mixin/handlePageChange'

export default {
  name: 'SortDialog',
  components: { draggable },
  mixins: [dialogCommon, handlePageChange],
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
    currency: {
      type: Array,
      require: true,
      default() {
        return [];
      }
    }
  },
  data: function() {
    return {
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
    handleRespone(res) {
      this.searchItems = res.searchItems;
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

      this.dialogLoading = false
    },
    onSearch() {
      this.dialogLoading = true;
      giftSearch({ currency: [this.form.currency] }).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.dialogLoading = false;
      })
    },
    onReset() {
      this.searchForm = JSON.parse(JSON.stringify(this.form))
      this.allDataByClient = []
      this.handlePageChangeByClient(this.currentPage)
      this.searched = false;
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-select {
    max-width: calc(100% - 70px);
    padding-right: 10px;
  }
  .search {
    height: 30px;
    line-height: 0;
  }
}

.test {
  height: 200px;
  overflow: hidden;
}
</style>
