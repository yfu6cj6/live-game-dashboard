<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-input v-model="searchForm.id" type="number" placeholder="ID" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__giftNickname')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in searchItems.currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.value" type="number" :placeholder="$t('__value')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onSortBtnClick()">
                {{ $t("__sort") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-parent" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
                {{ $t("__moreSearch") }}
              </el-button>
            </p>
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.id" type="number" placeholder="ID" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__giftNickname')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple filterable :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in searchItems.currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.value" type="number" :placeholder="$t('__value')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="onSortBtnClick()">
                {{ $t("__sort") }}
              </el-button>
            </p>
          </div>
        </template>
      </div>
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="left">
                <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
              </div>
              <div class="right">
                <div class="item">
                  <span class="header">ID</span>
                  <span class="content">{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__giftNickname') }}</span>
                  <span class="content">{{ item.nickname }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__currency') }}</span>
                  <span class="content">{{ item.currency }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__value') }}</span>
                  <span class="content">{{ item.valueLabel }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__status') }}</span>
                  <span class="status content" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="item">
                <img :src="item.img_address" class="giftPhoto" :alt="$t('__giftImage')">
              </div>
              <div class="item">
                <span class="header">ID</span>
                <span>{{ item.id }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__giftNickname') }}</span>
                <span>{{ item.nickname }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__currency') }}</span>
                <span>{{ item.currency }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__value') }}</span>
                <span>{{ item.valueLabel }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__status') }}</span>
                <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
              </div>
              <div class="operate">
                <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
      </div>
    </div>
    <div class="view-footer">
      <el-pagination
        layout="prev, pager, next, jumper, sizes"
        :total="totalCount"
        background
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :current-page.sync="currentPage"
        @size-change="handleSizeChangeByClient"
        @current-change="handlePageChangeByClient"
      />
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
      :title="$t('__sort')"
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
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { numberFormat } from '@/utils/numberFormat';
import EditDialog from './editDialog';
import SortDialog from './sortDialog';

export default {
  name: 'GiftManagement',
  components: { EditDialog, SortDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'sort': 3
      }),
      curDialogIndex: 0,
      imageList: []
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
    'searchForm.currency'() {
      this.resizeHandler();
    },
    'searchForm.status'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
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
      this.searchItems = res.searchItems;
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
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          width: 40%;
          .giftPhoto {
            vertical-align: middle;
            width: 73px;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 60%;
          .item {
            .header {
              width: 50%;
              min-width: 80px;
            }
          }
        }
        .operate {
          width: 250px;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .view {
    &-container {
      &-table {
        &-row {
          .left,
          .right {
            width: 50%;
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
        &-row {
          .left {
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
          }
          .item {
            width: 110px;
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
