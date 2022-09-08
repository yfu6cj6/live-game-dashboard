<template>
  <div v-if="visible" class="gift_sort_dialog">
    <template v-if="device === 'mobile'">
      <div v-loading="dialogLoading" class="black_bg">
        <div class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="selectBar">
            <div class="el-form-item__content item w-100">
              <div class="label-group">
                <label class="form-item-label text-yellow font-weight-bold">{{ $t('__currency') }}</label>
              </div>
              <div class="option">
                <div class="comp selected-filter">
                  <select v-model="searchForm.currency" class="el-select">
                    <option v-for="item in currency" :key="item.key" :value="item.key">
                      {{ $t(item.nickname) }}
                    </option>
                  </select>
                  <div class="fas gray-deep">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 63 63"
                      style="height: 0.916667rem; width: 0.916667rem;"
                    >
                      <title>arrow_2</title>
                      <g id="hGqiqI.tif">
                        <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="searchBtn">
              <button type="button" class="el-button bg-yellow el-button--primary" @click="onSearch()">
                <span>{{ $t('__search') }}</span>
              </button>
            </div>
          </div>
          <div class="table-container">
            <draggable v-if="allDataByClient.length > 0" :list="allDataByClient" v-bind="$attrs" :set-data="setData">
              <div
                v-for="(item, index) in allDataByClient"
                :key="index"
                class="table_row_item"
                :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
              >
                <span class="number">{{ item.id }}</span>
                <div class="photo">
                  <img :src="item.img_address" class="img" :alt="$t('__giftImage')">
                </div>
                <div class="info">
                  <div class="item">
                    <span class="title">{{ $t('__giftNickname') }}</span>
                    <span class="value">{{ item.nickname }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__value') }}</span>
                    <span class="value">{{ item.valueLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__status') }}</span>
                    <span class="value status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                  </div>
                </div>
              </div>
            </draggable>
            <div v-else-if="searched && allDataByClient.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
          </div>
        </div>
        <div v-if="allDataByClient.length > 0 && !dialogLoading" class="operate_ctrl">
          <button type="button" class="el-button bg-yellow el-button--primary confirm" @click="onSubmit()">
            <span>{{ confirm }}</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp" style="max-width: 600px; min-width: 380px;">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="data_content">
            <div class="w-100 d-flex justify-content-center font-weight-bold font-1_5">
              <span class="text-yellow ">{{ title }}</span>
            </div>
            <div class="selectBar">
              <div class="el-form-item__content item w-100">
                <div class="label-group">
                  <label class="form-item-label text-yellow font-weight-bold">{{ $t('__currency') }}</label>
                </div>
                <div class="option">
                  <div class="comp selected-filter">
                    <select v-model="searchForm.currency" class="el-select">
                      <option v-for="item in currency" :key="item.key" :value="item.key">
                        {{ $t(item.nickname) }}
                      </option>
                    </select>
                    <div class="fas gray-deep">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 63 63"
                        style="height: 0.916667rem; width: 0.916667rem;"
                      >
                        <title>arrow_2</title>
                        <g id="hGqiqI.tif">
                          <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="searchBtn">
                <button type="button" class="el-button bg-yellow el-button--primary" @click="onSearch()">
                  <span>{{ $t('__search') }}</span>
                </button>
              </div>
            </div>
            <div class="table-container">
              <draggable v-if="allDataByClient.length > 0" :list="allDataByClient" v-bind="$attrs" :set-data="setData">
                <div
                  v-for="(item, index) in allDataByClient"
                  :key="index"
                  class="table_row_item"
                  :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
                >
                  <span class="number">{{ item.id }}</span>
                  <div class="photo">
                    <img :src="item.img_address" class="img" :alt="$t('__giftImage')">
                  </div>
                  <div class="info">
                    <div class="item">
                      <span class="title">{{ $t('__giftNickname') }}</span>
                      <span class="value">{{ item.nickname }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ $t('__value') }}</span>
                      <span class="value">{{ item.valueLabel }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ $t('__status') }}</span>
                      <span class="value status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                    </div>
                  </div>
                </div>
              </draggable>
              <div v-else-if="searched && allDataByClient.length === 0" class="noInformation">{{ $t("__noInformation") }}</div>
            </div>
          </div>
          <div class="operate_content">
            <div v-if="allDataByClient.length > 0 && !dialogLoading" class="operate_ctrl">
              <button type="button" class="el-button bg-yellow el-button--primary confirm" @click="onSubmit()">
                <span>{{ confirm }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { giftSearch, giftSort } from '@/api/backstageManagement/giftManagement'
import draggable from 'vuedraggable'
import { numberFormat } from '@/utils/numberFormat';
import dialogCommon from '@/mixin/dialogCommon'
import handlePageChange from '@/mixin/handlePageChange'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters([
      'sidebar'
    ])
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
#app.mobile .gift_sort_dialog {
  .data_content {
    height: calc(100vh - 3.75rem - 1.5rem - 3.5rem);
  }
}

.gift_sort_dialog {
  .data_content {
    .table-container {
      .even-row {
        display: flex;
        background-color: #fff;
        padding: 0.625rem 1.16667rem 0.625rem 0;
        margin: 0;
      }
      .odd-row {
        display: flex;
        background-color: #f4f4f4;
        padding: 0.625rem 1.16667rem 0.625rem 0;
        margin: 0;
      }
      .table_row_item {
        .photo {
          width: 9.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .img {
            vertical-align: middle;
            width: 5.9rem;
            height: 5.9rem;
          }
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.33333rem;
          font-weight: bolder;
          padding: 0 0.5rem;
          width: 3rem;
        }
        .info {
          padding-left: 0.5rem;
          .item {
            display: flex;
            flex-direction: column;
            padding-bottom: 0.2rem;
            .title {
              width: 100%;
              font-size: 1.16667rem;
              color: #6e6e6e;
              word-break: break-word;
              margin-bottom: 0.1rem;
            }
            .value {
              font-size: 1.16667rem;
              font-weight: bold;
              word-break: break-all;
            }
          }
          .item+.item {
            margin-top: 0.3rem;
          }
        }
      }
    }
  }
  .selectBar {
    display: flex;
    width: 100%;
    .searchBtn {
      display: flex;
      width: 9rem;
      align-items: flex-end;
      padding-bottom: 0.4rem;
      justify-content: center;
    }
  }
  .operate_ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    .confirm {
      width: 10rem;
    }
  }
  .noInformation {
    color: #fff;
  }
}
</style>
