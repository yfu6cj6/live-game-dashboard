<template>
  <div v-loading="dataLoading" class="w-100 h-100">
    <div class="view-container">
      <div class="bg-black">
        <template v-if="device === 'mobile'">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" type="number" class="input_size" placeholder="ID" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__giftNickname')" />
              </div>
              <a class="more-opiton text-link text-underline text-yellow align-items-center" @click.stop="onSearchExpand()">
                <div class="fas label icon d-flex align-items-center yellow">
                  <svg-icon :icon-class="searchExpand ? 'less': 'add'" style="height: 1.08333rem;width: 1.08333rem;" />
                </div>
                {{ $t('__options') }}
              </a>
            </div>
            <div v-show="searchExpand">
              <div class="options currency">
                <div class="option options">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.currency"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="currencyCollapse"
                      :placeholder="$t('__currency')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.currency"
                        :key="item.key"
                        :label="item.nickname"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
                <div class="option">
                  <el-input v-model="searchForm.value" type="number" class="input_size" :placeholder="$t('__value')" />
                </div>
              </div>
              <div class="options status">
                <div class="option options">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.status"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="statusCollapse"
                      :placeholder="$t('__status')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.status"
                        :key="item.key"
                        :label="item.nickname"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
              </div>
            </div>
            <div class="options d-flex mt-2">
              <div class="d-flex option_ctrl_left">
                <div class="createBtn mr-1">
                  <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
                </div>
                <el-button class="bg-yellow filter-search" @click="onSortBtnClick()">{{ $t("__sort") }}</el-button>
              </div>
              <div class="d-flex option_ctrl_right">
                <div class="searchBtn">
                  <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(searchForm, 1)" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          -
        </template>
      </div>
      <div class="table-container">
        <template v-if="tableData.length > 0">
          <dir
            v-for="(item, index) in tableData"
            :key="index"
            :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
          >
            <template v-if="device === 'mobile'">
              <span class="number">{{ item.id }}</span>
              <div class="photo">
                <img :src="item.img_address" class="img" :alt="$t('__giftImage')">
              </div>
              <div class="info w-100 pos_relative">
                <div class="item">
                  <span class="title">{{ $t('__giftNickname') }}</span>
                  <span class="value">{{ item.nickname }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__currency') }}</span>
                  <span class="value">{{ item.currency }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__value') }}</span>
                  <span class="value">{{ item.valueLabel }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__status') }}</span>
                  <span class="value" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                </div>
                <div class="operate locate_rb">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                </div>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </dir>
          <div v-if="totalCount > pageSize" class="more_btn_space">
            <div v-if="tableData.length >= totalCount" class="search_more">
              <span>{{ $t("__noMoreInformation") }}</span>
            </div>
            <div v-else class="search_more">
              <span class="search_more_btn" @click.stop="moreInfo()">{{ $t("__searchMoreValue") }}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="noInformation">{{ $t("__noInformation") }}</div>
        </template>
      </div>
    </div>

    <editDialog
      ref="createDialog"
      :title="`${$t('__create')}${$t('__gift')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :search-items="searchItems"
      :image-list="imageList"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__gift')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :search-items="searchItems"
      :image-list="imageList"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <sortDialog
      ref="sortDialog"
      :title="`${$t('__sort')}${$t('__gift')}`"
      :visible="curDialogIndex === dialogEnum.sort"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :currency="searchItems.currency"
      @close="closeDialogEven"
      @confirm="handleRespone"
    />
  </div>
</template>

<script>
import { giftSearch, giftCreate, giftEdit } from '@/api/backstageManagement/giftManagement';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { numberFormat } from '@/utils/numberFormat';
import EditDialog from './editDialog';
import SortDialog from './sortDialog';

export default {
  name: 'GiftManagement',
  components: { EditDialog, SortDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'sort': 3
      }),
      curDialogIndex: 0,
      imageList: [],
      searchExpand: false,
      selectOption: {}
    }
  },
  computed: {
    currencyCollapse() {
      return this.searchForm.currency && this.searchForm.currency.length > this.selectCollapseCount;
    },
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount;
    }
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      this.onSearchBtnClick({}, 1);
      this.addSelectFilter()
      this.setHeaderStyle()
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftManagement'), false, () => { }])
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('options currency', () => {
        this.searchForm.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).map(item => item.key)
      }, () => {
        this.searchForm.currency = []
      }, () => {
        this.selectOption.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.status)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.searchItems.status)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data;
      this.handleCurrentChange(page);
    },
    onSubmit() {
      this.dataLoading = true;
      giftSearch(this.searchForm).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.closeLoading();
      });
    },
    handleRespone(res) {
      res.searchItems.currency.sort((a, b) => { return a.key - b.key });
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      this.totalCount = res.rows.length;
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

      this.closeDialogEven();
      this.closeLoading();
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false);
      this.$refs.editDialog.setDialogLoading(false);
      this.dataLoading = false;
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none;
    },
    onCreateBtnClick() {
      this.selectForm = { currency_id: this.searchItems.currency[0].key, status: this.searchItems.status[0].key };
      this.imageList = [];
      this.curDialogIndex = this.dialogEnum.create;
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__gift')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftManagement'), false, () => { }])
      }])
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true);
      giftCreate(data).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.closeLoading();
      });
    },
    onEditBtnClick(tableRowData) {
      this.selectForm = JSON.parse(JSON.stringify(tableRowData));
      this.imageList = [{ name: this.selectForm.nickname, url: this.selectForm.img_address }];
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__gift')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftManagement'), false, () => { }])
      }])
      this.curDialogIndex = this.dialogEnum.edit;
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true);
        giftEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        });
      });
    },
    onSortBtnClick() {
      this.selectForm = { currency: this.searchItems.currency[0].key };
      this.curDialogIndex = this.dialogEnum.sort;
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__sort')}${this.$t('__gift')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftManagement'), false, () => { }])
      }])
    }
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  .option_ctrl_left {
    justify-content: flex-start;
    .mr-1 {
      margin-right: 1rem;
    }
  }
  .option_ctrl_right {
    justify-content: flex-end;
    width: 100%;
    padding: 0 0.5rem;
  }

  .pos_relative {
    position: relative;
  }

  .locate_rb {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.table-container {
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
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          .item {
            min-width: 150px;
            width: 150px;
            margin-right: 50px;
            .giftPhoto {
              margin: auto;
            }
          }
          .giftPhoto {
            vertical-align: middle;
            width: 73px;
            min-width: 73px;
          }
          .operate {
            width: 110px;
          }
        }
      }
    }
  }
}
</style>
