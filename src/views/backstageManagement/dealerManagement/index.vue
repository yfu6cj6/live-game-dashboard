<template>
  <div class="w-100 h-100 bg-new-dark-white">
    <template v-if="device === 'mobile'">
      <div class="view-container dealerManagement">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" class="input_size" placeholder="ID" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
              </div>
              <a class="more-opiton text-link text-underline text-yellow align-items-center" @click.stop="onSearchExpand()">
                <div class="fas label icon d-flex align-items-center yellow">
                  <svg-icon :icon-class="searchExpand ? 'less': 'add'" style="height: 1.08333rem;width: 1.08333rem;" />
                </div>
                {{ $t('__options') }}
              </a>
            </div>
            <div v-show="searchExpand === true">
              <div class="options">
                <div class="option">
                  <el-input v-model="searchForm.account" class="input_size" :placeholder="$t('__account')" />
                </div>
                <div class="option status d-flex">
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
              <div class="d-flex">
                <div v-if="!isAgentSubAccount" class="createBtn">
                  <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
                </div>
              </div>
              <div class="d-flex option_ctrl_right">
                <div class="searchBtn">
                  <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(1)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-container">
          <template v-if="tableData.length > 0">
            <div
              v-for="(item, index) in tableData"
              :key="index"
              :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
            >
              <span class="custom-number">{{ item.id }}</span>
              <div class="photo">
                <img v-if="item.photo_url === ''" class="img" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                <img v-else :src="item.photo_url" class="img" :alt="$t('__dealerPhoto')">
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
            </div>
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
            <div class="no-result">{{ $t("__noInformation") }}</div>
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
    </template>
    <template v-else>
      <div class="pos-r">
        <backTop
          ref="backTop"
          :inner-class="'.view-container'"
          :view-class="'.scroll_view'"
        />
        <div class="view-container" style="height: calc((100vh - 6.25rem) - 30px);">
          <div class="scroll_view">
            <div class="bg-black">
              <div class="yellow-border-bottom search-container">
                <div class="options">
                  <div class="option">
                    <el-input v-model="searchForm.id" class="input_size" placeholder="ID" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.account" class="input_size" :placeholder="$t('__account')" />
                  </div>
                  <div class="option status d-flex">
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
                  <div class="d-flex">
                    <div v-if="!isAgentSubAccount">
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__dealer')}` }}</button>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="searchBtn">
                      <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(1)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-container">
              <template v-if="tableData.length > 0">
                <div
                  v-for="(item, index) in tableData"
                  :key="index"
                  :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
                >
                  <span class="custom-number mr-4">{{ item.id }}</span>
                  <div class="photo" style="margin-right: 2rem;">
                    <img v-if="item.photo_url === ''" class="img" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
                    <img v-else :src="item.photo_url" class="img" :alt="$t('__dealerPhoto')">
                  </div>
                  <div class="d-flex">
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__account') }}</span>
                      <span class="value">{{ item.account }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__name') }}</span>
                      <span class="value">{{ item.name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__status') }}</span>
                      <span class="value status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__creator') }}</span>
                      <span class="value">{{ item.creator }}</span>
                    </div>
                    <div class="operate align-items-center operate_w1">
                      <el-button class="bg-yellow button" size="mini" @click="onLoginBarcodeBtnClick(item)">{{ $t("__loginBarcode") }}</el-button>
                      <el-button class="bg-yellow button" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="no-result">{{ $t("__noInformation") }}</div>
              </template>
              <pagination
                :page-size="pageSize"
                :page-sizes="pageSizes"
                :total="totalCount"
                :current-page.sync="currentPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
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
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'DealerManagement',
  components: { EditDialog, LoginBarcodeDialog, BackTop, Pagination },
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
      selectOption: {},
      searchExpand: false
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
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.closeDialogEven()
        this.$nextTick(() => {
          this.onSearchBtnClick(1);
          this.addSelectFilter()
        })
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.addSelectFilter()
      this.setHeaderStyle()
      this.onSearchBtnClick(1);
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__dealerManagement'), false, () => { }])
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1);
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.status)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.searchItems.status)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page);
    },
    onSubmit() {
      this.setDataLoading(true);
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
      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }

      this.closeDialogEven();
      this.closeLoading();
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false);
      this.$refs.editDialog.setDialogLoading(false);
      this.setDataLoading(false);
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
      this.$refs.editDialog.setDialogLoading(true);
      dealerEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      });
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
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
</style>
