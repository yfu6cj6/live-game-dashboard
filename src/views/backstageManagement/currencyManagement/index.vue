<template>
  <div class="w-100 h-100 bg-new-dark-white">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" type="number" class="input_size" placeholder="ID" />
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
                  <el-input v-model="searchForm.code" class="input_size" :placeholder="$t('__code')" />
                </div>
                <div class="option">
                  <el-input v-model="searchForm.symbol" class="input_size" :placeholder="$t('__symbol')" />
                </div>
              </div>
            </div>
            <div class="options d-flex mt-2">
              <div class="d-flex">
                <div class="createBtn">
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
              <div class="left">
                <div class="item">
                  <span class="title">ID</span>
                  <span class="value">{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__code') }}</span>
                  <span class="value">{{ item.code }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__symbol') }}</span>
                  <span class="value">{{ item.symbol }}</span>
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="title">{{ $t('__name') }}</span>
                  <span class="value">{{ item.name }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
        :title="`${$t('__create')}${$t('__currency')}`"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />

      <editDialog
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__currency')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
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
                    <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.code" class="input_size" :placeholder="$t('__code')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.symbol" class="input_size" :placeholder="$t('__symbol')" />
                  </div>
                  <div class="d-flex">
                    <div>
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__currency')}` }}</button>
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
                  <div class="d-flex">
                    <div class="item justify-content-center item_w0">
                      <span class="title">ID</span>
                      <span class="value">{{ item.id }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__name') }}</span>
                      <span class="value">{{ item.name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__code') }}</span>
                      <span class="value">{{ item.code }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__symbol') }}</span>
                      <span class="value">{{ item.symbol }}</span>
                    </div>
                    <div class="operate align-items-center operate_w1">
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
      </div>

      <editDialog
        ref="createDialog"
        :title="`${$t('__create')}${$t('__currency')}`"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />

      <editDialog
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__currency')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />
    </template>
  </div>
</template>

<script>
import { currencySearch, currencyCreate, currencyEdit, currencyDelete } from '@/api/backstageManagement/currencyManagement';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog';
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'CurrencyManagement',
  components: { EditDialog, BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      searchForm: {},
      selectForm: {},
      curDialogIndex: 0,
      searchExpand: false
    }
  },
  computed: {
  },
  watch: {
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.closeDialogEven()
        this.$nextTick(() => {
          this.onSearchBtnClick(1);
        })
      }
    }
  },
  created() {
    this.pageSizeCount = 1
    this.onSearchBtnClick(1)
    this.setHeaderStyle()
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__currencyManagement'), false, () => { }])
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    handleRespone(res) {
      this.allDataByClient = res
      this.totalCount = res.length
      this.handlePageChangeByClient(this.currentPage)

      if (this.$refs.backTop) {
        this.$refs.backTop.backTop()
      }

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.setDataLoading(false)
    },
    onSubmit() {
      this.setDataLoading(true)
      currencySearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page)
    },
    onCreateBtnClick() {
      this.selectForm = {}
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      currencyCreate(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onEditBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.curDialogIndex = this.dialogEnum.edit
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      currencyEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      currencyDelete(item.id).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
