<template>
  <div class="w-100 h-100 giftManagement bg-new-dark-white">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
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
              <div class="options">
                <div class="option currency d-flex">
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
              <div class="options">
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
              <div class="d-flex option_ctrl_left">
                <div class="createBtn mr-1">
                  <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
                </div>
                <el-button class="bg-yellow filter-search" @click="onSortBtnClick()">{{ $t("__sort") }}</el-button>
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
                <img :src="item.img_address" class="img" :alt="$t('__giftImage')">
              </div>
              <div class="info w-100">
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
                    <el-input v-model="searchForm.id" type="number" class="input_size" placeholder="ID" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__giftNickname')" />
                  </div>
                  <div class="option currency">
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
                  <div class="option status">
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
                  <div>
                    <button class="ml-2 el-button bg-yellow el-button--default mr-2 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__gift')}` }}</button>
                  </div>
                  <div>
                    <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onSortBtnClick()">{{ `${$t('__sort')}` }}</button>
                  </div>
                  <div class="searchBtn">
                    <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(1)" />
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
                  <div class="photo mr-5">
                    <img :src="item.img_address" class="img" :alt="$t('__giftImage')">
                  </div>
                  <div class="info w-100 d-flex">
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__giftNickname') }}</span>
                      <span class="value">{{ item.nickname }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__currency') }}</span>
                      <span class="value">{{ item.currency }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__value') }}</span>
                      <span class="value">{{ item.valueLabel }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__status') }}</span>
                      <span class="value" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
                    </div>
                    <div class="operate align-items-center operate_w0">
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
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
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'GiftManagement',
  components: { EditDialog, SortDialog, BackTop, Pagination },
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
      this.onSearchBtnClick(1);
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
      this.addSelectDropDownFilter('option currency', () => {
        this.searchForm.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).map(item => item.key)
      }, () => {
        this.searchForm.currency = []
      }, () => {
        this.selectOption.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
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
      this.setDataLoading(true)
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

      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }

      this.closeDialogEven();
      this.closeLoading();
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false);
      this.$refs.editDialog.setDialogLoading(false);
      this.setDataLoading(false)
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
      this.$refs.editDialog.setDialogLoading(true);
      giftEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      });
    },
    onSortBtnClick() {
      this.selectForm = { currency: this.searchItems.currency[0].key };
      this.curDialogIndex = this.dialogEnum.sort;
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__sort')}${this.$t('__gift')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__giftManagement'), false, () => { }])
      }])
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
.giftManagement {
  .view-container {
    .table-container {
      .photo {
        .img {
          width: 5.9rem;
          height: 5.9rem;
        }
      }
    }
  }
}

#app.mobile {
  .view-container {
    .option_ctrl_left {
      justify-content: flex-start;
      .mr-1 {
        margin-right: 1rem;
      }
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
}
</style>
