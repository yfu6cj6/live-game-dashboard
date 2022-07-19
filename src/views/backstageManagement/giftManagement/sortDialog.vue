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
    <draggable v-if="searched" class="view-container-table" :list="allDataByClient" v-bind="$attrs" :set-data="setData">
      <div
        v-for="(item, index) in allDataByClient"
        :key="index"
        class="view-container-table-row"
        :class="{'single-row': index % 2 === 0}"
      >
        <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
        <table>
          <tr>
            <td>
              <span class="header">ID:</span>
              <span>{{ item.id }}</span>
            </td>
            <td>
              <span class="header">{{ $t('__giftNickname') }}:</span>
              <span>{{ item.nickname }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="header">{{ $t('__value') }}:</span>
              <span>{{ item.valueLabel }}</span>
            </td>
            <td>
              <span class="header">{{ $t('__activated') }}:</span>
              <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
            </td>
          </tr>
        </table>
      </div>
    </draggable>
    <span v-if="searched && !dialogLoading" slot="footer">
      <el-button class="bg-yellow" @click="onSubmit()">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { giftSearch, giftSort } from '@/api/backstageManagement/giftManagement'
import draggable from 'vuedraggable'
import { numberFormat } from '@/utils/numberFormat';
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
        this.onReset();
      }
    }
  },
  methods: {
    handleRespone(res) {
      this.searchItems = res.searchItems;
      this.totalCount = res.rows.length;
      res.rows.sort((a, b) => { return a.sort_key - b.sort_key });
      this.allDataByClient = res.rows;
      this.allDataByClient.forEach(element => {
        const currencyItem = this.searchItems.currency.find(item => item.key === element.currency_id);
        if (currencyItem) {
          element.currency = currencyItem.nickname;
        }
        const statusItem = this.searchItems.status.find(item => item.key === element.status);
        if (statusItem) {
          element.statusLabel = statusItem.nickname;
        }
        element.valueLabel = numberFormat(element.value);
      });
      this.handlePageChangeByClient(this.currentPage);
      this.searched = true;

      this.dialogLoading = false;
    },
    onSearch() {
      this.dialogLoading = true;
      giftSearch({ currency: [this.form.currency] }).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.dialogLoading = false;
      });
    },
    onSubmit() {
      var gifts = [];
      this.allDataByClient.forEach(element => {
        gifts.push(element.id);
      });
      this.dialogLoading = true;
      giftSort({ gifts: gifts }).then((res) => {
        this.$emit('confirm', res);
        this.dialogLoading = false;
      }).catch(() => {
        this.dialogLoading = false;
      });
    },
    onReset() {
      this.searchForm = JSON.parse(JSON.stringify(this.form));
      this.allDataByClient = [];
      this.handlePageChangeByClient(this.currentPage);
      this.searched = false;
    },
    setData(dataTransfer) {
      dataTransfer.setData('Text', '');
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

.view-container-table {
  &-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .giftPhoto {
      vertical-align: middle;
      max-width: 73px;
    }
    table {
      width: 150px;
      tr {
        display: flex;
        flex-direction: column;
        td {
          line-height: 20px;
          .header {
            font-weight: bold;
            margin-right: 5px;
          }
          .status {
            color: #f00;
            font-weight: bold;
          }
          .statusOpen {
            color: #090;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .view-container-table {
    &-row {
      table {
        display: flex;
        justify-content: space-between;
        width: 350px;
        tr {
          td {
            font-size: 18px;
            line-height: 30px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .view-container-table {
    position: relative;
    &-row {
      table {
        display: flex;
        justify-content: space-between;
        width: 350px;
        tr {
          td {
            font-size: 20px;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
