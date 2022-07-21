<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <div ref="seachFormExpand" class="view-container-seachForm-item">
          <p class="view-container-seachForm-item-wrap pc">
            <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.id" type="number" placeholder="ID" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
              <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </p>
        </div>
        <div class="view-container-seachForm-item">
          <div class="view-container-seachForm-item-group">
            <p class="view-container-seachForm-item-wrap pc">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="moreSearch" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
                {{ $t("__moreSearch") }}
              </el-button>
            </p>
          </div>
        </div>
      </div>
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <div class="wrap">
              <template v-if="device === 'mobile'">
                <div class="left">
                  <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                  <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
                </div>
              </template>
              <div class="right">
                <template v-if="device !== 'mobile'">
                  <div class="item">
                    <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                    <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
                  </div>
                </template>
                <div class="item">
                  <span class="header">ID</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__account') }}</span>
                  <span>{{ item.account }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__name') }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__status') }}</span>
                  <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__creator') }}</span>
                  <span>{{ item.creator }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onLoginBarcodeBtnClick(item)">{{ $t("__loginBarcode") }}</el-button>
                  <a :href="item.dns1d" :download="item.name">
                    <el-button class="bg-yellow" size="mini">{{ $t("__loginBarcodeDownload") }}</el-button>
                  </a>
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                </div>
              </div>
            </div>
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
      :title="`${$t('__create')}${$t('__dealer')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :image-list="imageList"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__dealer')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :image-list="imageList"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <loginBarcodeDialog
      :title="$stringFormat(`${$t('__dealer')}${$t('__loginBarcode')} - {0}`, [selectForm.name])"
      :visible="curDialogIndex === dialogEnum.loginBarcode"
      :form="selectForm"
      @close="closeDialogEven"
    />
  </div>
</template>

<script>
import { dealerSearch, dealerCreate, dealerEdit } from '@/api/backstageManagement/dealerManagement';
import common from '@/mixin/common';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';
import LoginBarcodeDialog from './loginBarcodeDialog';

export default {
  name: 'DealerManagement',
  components: { EditDialog, LoginBarcodeDialog },
  mixins: [common, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'loginBarcode': 3
      }),
      curDialogIndex: 0,
      imageList: []
    }
  },
  computed: {
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount;
    }
  },
  watch: {
    'searchForm.status'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const statusHeight = this.statusCollapse ? 32 : ((this.searchForm.status && this.searchForm.status.length) * 32);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(136 + statusHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw <= 992) {
        formHeight = this.searchFormOpen ? `${(68 + statusHeight)}px` : formHeight;
        this.paginationPagerCount = 7;
      } else {
        formHeight = "auto";
        this.paginationPagerCount = 7;
      }

      this.$refs.seachFormExpand.style.height = `${formHeight}`;
      this.setHeight();
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data;
      this.handleCurrentChange(page);
    },
    onSubmit() {
      this.dataLoading = true;
      dealerSearch(this.searchForm).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.closeLoading();
      });
    },
    handleRespone(res) {
      this.$refs.container.scrollTop = 0;
      this.$refs.table.scrollTop = 0;
      this.searchItems = res.searchItems;
      this.totalCount = res.rows.length;
      this.allDataByClient = res.rows;
      this.allDataByClient.forEach(element => {
        const statusItem = this.searchItems.status.find(item => item.key === element.status);
        if (statusItem) {
          element.statusLabel = statusItem.nickname;
        }
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
      this.selectForm = { status: this.searchItems.status[0].key };
      this.imageList = [];
      this.curDialogIndex = this.dialogEnum.create;
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true);
      dealerCreate(data).then((res) => {
        this.handleRespone(res);
      }).catch(() => {
        this.closeLoading();
      });
    },
    onLoginBarcodeBtnClick(tableRowData) {
      this.selectForm = JSON.parse(JSON.stringify(tableRowData));
      this.curDialogIndex = this.dialogEnum.loginBarcode;
    },
    onEditBtnClick(tableRowData) {
      this.selectForm = JSON.parse(JSON.stringify(tableRowData));
      if (this.selectForm.photo_url !== "") {
        this.imageList = [{ name: this.selectForm.name, url: this.selectForm.photo_url }];
      } else {
        this.imageList = [];
      }
      this.curDialogIndex = this.dialogEnum.edit;
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true);
        dealerEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
          .operate {
            width: 250px;
          }
          .dealerPhoto {
            vertical-align: middle;
            width: 105px;
          }
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
            .operate {
              width: 400px;
            }
          }
        }
      }
    }
  }
}
</style>
