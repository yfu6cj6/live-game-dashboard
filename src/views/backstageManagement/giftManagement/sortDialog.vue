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
    <div class="view-container-table">
      <draggable v-if="allDataByClient.length > 0" :list="allDataByClient" v-bind="$attrs" :set-data="setData">
        <div
          v-for="(item, index) in allDataByClient"
          :key="index"
          class="view-container-table-row"
          :class="{'single-row': index % 2 === 0}"
        >
          <div class="wrap">
            <template v-if="device === 'mobile'">
              <div class="left">
                <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
              </div>
            </template>
            <div class="right">
              <template v-if="device !== 'mobile'">
                <div class="item">
                  <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
                </div>
              </template>
              <div class="item">
                <span class="header">ID</span>
                <span>{{ item.id }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__giftNickname') }}</span>
                <span>{{ item.nickname }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__value') }}</span>
                <span>{{ item.valueLabel }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__status') }}</span>
                <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </draggable>
      <div v-else-if="searched && allDataByClient.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
    </div>
    <span v-if="allDataByClient.length > 0 && !dialogLoading" slot="footer">
      <el-button class="bg-yellow confirm" @click="onSubmit()">{{ confirm }}</el-button>
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
      giftSearch({ currency: [this.searchForm.currency] }).then((res) => {
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

.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          .left,
          .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: auto;
          }
          .left {
            align-items: center;
            margin-right: 10px;
          }
          .giftPhoto {
            vertical-align: middle;
            width: 73px;
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

@media screen and (min-width: 768px) and (max-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          .wrap {
            .left,
            .right {
              width: 50%;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        position: relative;
        &-row {
          .wrap {
            .right {
              flex-direction: row;
              align-items: center;
              justify-content: space-evenly;
              width: 100%;
            }
            .item {
              width: 110px;
            }
          }
        }
      }
    }
  }
}
</style>
