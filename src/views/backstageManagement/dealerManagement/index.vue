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
              <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
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
              <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
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
          </div>
        </template>
      </div>
      <div ref="table" class="view-container-table">
        <template v-if="tableData.length > 0">
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
                <div class="right">
                  <div class="item">
                    <span class="header">ID</span>
                    <span class="content">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__account') }}</span>
                    <span class="content">{{ item.account }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__name') }}</span>
                    <span class="content">{{ item.name }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__status') }}</span>
                    <span class="content status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__creator') }}</span>
                    <span class="content">{{ item.creator }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onLoginBarcodeBtnClick(item)">{{ $t("__loginBarcode") }}</el-button>
                    <a :href="item.dns1d" :download="item.name">
                      <el-button class="bg-yellow" size="mini">{{ $t("__loginBarcodeDownload") }}</el-button>
                    </a>
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="left">
                  <div class="item">
                    <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                    <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
                  </div>
                  <div class="item">
                    <span class="header">ID</span>
                    <span class="content">{{ item.id }}</span>
                  </div>
                  <div class="item account">
                    <span class="header">{{ $t('__account') }}</span>
                    <span class="content">{{ item.account }}</span>
                  </div>
                  <div class="item name">
                    <span class="header">{{ $t('__name') }}</span>
                    <span class="content">{{ item.name }}</span>
                  </div>
                  <div class="item status">
                    <span class="header">{{ $t('__status') }}</span>
                    <span class="status content" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                  </div>
                  <div class="item creator">
                    <span class="header">{{ $t('__creator') }}</span>
                    <span class="content">{{ item.creator }}</span>
                  </div>
                  <div class="operate">
                    <div class="loginBar">
                      <el-button class="bg-yellow loginBar" size="mini" @click="onLoginBarcodeBtnClick(item)">{{ $t("__loginBarcode") }}</el-button>
                    </div>
                    <div class="download">
                      <a :href="item.dns1d" :download="item.name">
                        <el-button class="bg-yellow download" size="mini">{{ $t("__loginBarcodeDownload") }}</el-button>
                      </a>
                    </div>
                    <div class="edit">
                      <el-button class="bg-yellow edit" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
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
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';
import LoginBarcodeDialog from './loginBarcodeDialog';

export default {
  name: 'DealerManagement',
  components: { EditDialog, LoginBarcodeDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
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
            justify-content: left;
            align-items: center;
            margin-right: 10px;
          }
          .item {
            .header {
              width: 60px;
              min-width: 60px;
            }
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
            .left {
              flex-direction: row;
              align-items: center;
              justify-content: left;
              width: 100%;
            }
            .item {
              margin-right: 50px;
              min-width: 110px;
              width: 110px;
              &.account {
                min-width: 120px;
                width: 120px;
              }
              &.name {
                min-width: 120px;
                width: 120px;
              }
              &.status {
                min-width: 80px;
                width: 80px;
              }
              &.creator {
                min-width: 120px;
                width: 120px;
              }
            }
            .operate {
              justify-content: flex-start;
              width: 400px;
              .loginBar {
                width: 112px;
                min-width: 112px;
                margin-right: 32px;
              }
              .download {
                width: 152px;
                min-width: 152px;
                margin-right: 32px;
              }
              .edit {
                width: 72px;
                min-width: 72px;
                margin-right: 32px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
