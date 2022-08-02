<template>
  <div>
    <div v-loading="dataLoading">
      <div ref="container" class="view-container">
        <div ref="seachForm" class="view-container-seachForm">
          <template v-if="device === 'mobile'">
            <div ref="seachFormExpand" class="view-container-seachForm-option">
              <p class="optionItem">
                <el-input v-model="searchForm.id" type="number" placeholder="ID" />
              </p>
              <p class="optionItem">
                <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
              </p>
              <p class="optionItem">
                <el-input v-model="searchForm.code" :placeholder="$t('__code')" />
              </p>
              <p class="optionItem">
                <el-input v-model="searchForm.symbol" :placeholder="$t('__symbol')" />
              </p>
            </div>
            <div class="view-container-seachForm-operate">
              <p class="operateItem">
                <el-button class="bg-gray" size="mini" @click="onSearchBtnClick(searchForm, 1)">
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
                <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
              </p>
              <p class="optionItem">
                <el-input v-model="searchForm.code" :placeholder="$t('__code')" />
              </p>
              <p class="optionItem">
                <el-input v-model="searchForm.symbol" :placeholder="$t('__symbol')" />
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
          <div v-if="tableData.length > 0">
            <div
              v-for="(item, index) in tableData"
              :key="index"
              class="view-container-table-row"
              :class="{'single-row': index % 2 === 0}"
            >
              <template v-if="device === 'mobile'">
                <div class="left">
                  <div class="item">
                    <span class="header">ID</span>
                    <span class="content">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__code') }}</span>
                    <span class="content">{{ item.code }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__symbol') }}</span>
                    <span class="content">{{ item.symbol }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="header">{{ $t('__name') }}</span>
                    <span class="content">{{ item.name }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="item">
                  <span class="header">ID</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__name') }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__code') }}</span>
                  <span>{{ item.code }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__symbol') }}</span>
                  <span>{{ item.symbol }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
    </div>
  </div>
</template>

<script>
import { currencySearch, currencyCreate, currencyEdit, currencyDelete } from '@/api/backstageManagement/currencyManagement';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';

export default {
  name: 'CurrencyManagement',
  components: { EditDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      searchForm: {},
      selectForm: {},
      curDialogIndex: 0
    }
  },
  computed: {
  },
  created() {
    this.onSearchBtnClick({}, 1)
  },
  methods: {
    handleRespone(res) {
      this.allDataByClient = res
      this.totalCount = res.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.dataLoading = false
    },
    onSubmit() {
      this.dataLoading = true
      currencySearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data
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
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true)
        currencyEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        currencyDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
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
        flex-direction: row;
        .left {
          width: 50%;
        }
        .right {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .operate {
            justify-content: flex-start;
          }
        }
        .item {
          .header {
            width: 50px;
            min-width: 50px;
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
          display: flex;
          flex-direction: row;
          .item {
            width: 360px;
            min-width: 360px;
            margin-right: 30px;
          }
          .operate {
            width: 160px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
