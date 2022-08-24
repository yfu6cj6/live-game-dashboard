<template>
  <div v-loading="dataLoading">
    <div class="view-container dealerManagement">
      <div class="bg-black">
        <template v-if="device === 'mobile'">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" class="input_size" placeholder="ID" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.account" class="input_size" :placeholder="$t('__account')" />
              </div>
              <div v-if="!isAgentSubAccount" class="createBtn">
                <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
              </div>
            </div>
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
              </div>
              <div class="option options status">
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
              <div class="searchBtn">
                <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(searchForm, 1)" />
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
                <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
              </div>
              <div class="info">
                <div class="item">
                  <span class="title">{{ $t('__account') }}</span>
                  <span class="value">{{ item.account }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__name') }}</span>
                  <span class="value">{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__status') }}</span>
                  <span class="value status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__creator') }}</span>
                  <span class="value">{{ item.creator }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow button" size="mini" @click="onLoginBarcodeBtnClick(item)">{{ $t("__loginBarcode") }}</el-button>
                  <el-button class="bg-yellow button" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
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
import EditDialog from './editDialog';
import LoginBarcodeDialog from './loginBarcodeDialog';
import { mapGetters } from 'vuex'

export default {
  name: 'DealerManagement',
  components: { EditDialog, LoginBarcodeDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'loginBarcode': 3
      }),
      curDialogIndex: 0,
      imageList: [],
      selectOption: {}
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount'
    ]),
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount;
    }
  },
  watch: {
    // 'searchForm.status'() {
    //   this.resizeHandler();
    // }
  },
  created() {
    this.$nextTick(() => {
      this.onSearchBtnClick({}, 1);
      this.addSelectFilter()
      this.setHeaderStyle()
    })
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__dealerManagement'), false, () => { }])
    },
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('options status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.status)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.searchItems.status)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(data, page) {
      this.pageSizeCount = 1
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
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems));
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
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
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__dealer')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__dealerManagement'), false, () => { }])
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [this.$stringFormat(`${this.$t('__edit')}${this.$t('__dealer')}`, [this.selectForm.id]), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__dealerManagement'), false, () => { }])
      }])
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

<style lang="scss">
.dealerManagement {
  .el-button+.el-button {
    margin-left: 0;
  }
}
</style>

<style lang="scss" scoped>
.view-container {
  overflow: auto;
  max-height: calc(100vh - 3.75rem);
  .search-container {
    width: 100%;
    padding-top: 1rem;
    .createBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      width: 2.5rem;
    }
    .searchBtn {
      border-radius: 0.16667rem;
      background-color: #f9c901;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      width: 2.5rem;
    }
    .searchIcon {
      fill: #000 !important;
      height: 1.5rem;
      width: 1.5rem
    }
    &.yellow-border-bottom {
      border-bottom: 0.16667rem solid #f9c901;
    }
    .options {
      display: flex;
      width: 100%;
      justify-content: center;
      .option {
        width: 12.84583rem;
        padding-right: 0;
        padding-left: 0;
        padding-top: 0;
      }
    }
  }
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
    .photo {
      width: 9.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .dealerPhoto {
        vertical-align: middle;
        width: 9rem;
        height: 10.2857rem;
      }
    }
    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.33333rem;
      font-weight: bolder;
      padding: 0 0.5rem;
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
    }
    .operate {
      display: flex;
      flex-wrap: wrap;
      .button {
        margin-right: 0.5rem;
        margin-top: 0.5rem;
      }
    }
    .more_btn_space {
      padding: 1.5rem;
      text-align: center;
      background-color: #fff;
    }
    .search_more {
      width: 100%;
      height: 4.5rem;
      .search_more_btn {
        padding-bottom: 0.01667rem;
        border-bottom: 1px solid #343a40;
      }
    }
    .noInformation {
      margin-top: 1rem;
      text-align: center;
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
          .dealerPhoto {
            margin: auto;
          }
          .item {
            min-width: 150px;
            width: 150px;
            margin-right: 50px;
          }
          .operate {
            justify-content: flex-start;
            width: auto;
            .loginBar {
              margin-right: 32px;
            }
            .download {
              margin-right: 32px;
            }
            .edit {
              margin-right: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
