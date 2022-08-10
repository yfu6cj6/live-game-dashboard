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
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.uri" placeholder="Uri" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.methodType" multiple :collapse-tags="methodTypeCollapse" :placeholder="$t('__method')">
                <el-option v-for="item in searchMethodType" :key="item" :label="item" :value="item" />
              </el-select>
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
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.uri" placeholder="Uri" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.methodType" multiple filterable :collapse-tags="methodTypeCollapse" :placeholder="$t('__method')">
                <el-option v-for="item in searchMethodType" :key="item" :label="item" :value="item" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick(searchForm, 1)">
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
              <div class="left" @click="remarkExpand(item)">
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click.stop="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click.stop="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                </div>
                <div class="item">
                  <span class="header">ID</span>
                  <span class="content">{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__name') }}</span>
                  <span class="content">{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__nickname') }}</span>
                  <span class="content">{{ item.nickname }}</span>
                </div>
                <div class="item">
                  <span class="header">Uri</span>
                  <span class="content">{{ item.uri }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__method') }}</span>
                  <span class="content">{{ item.method }}</span>
                </div>
                <div class="expand" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" icon-class="up" />
                  <svg-icon v-else icon-class="more" />
                </div>
              </div>
              <div v-if="item.open" class="expandContent" @click="remarkExpand(item)">
                <div class="item col">
                  <span class="header expandHeader">request_content</span>
                  <span class="content">
                    {{ item.request_content }}
                  </span>
                </div>
                <div class="item col">
                  <span class="header expandHeader">response_content</span>
                  <span class="content">
                    {{ item.response_content }}
                  </span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="base">
                <div class="item remark">
                  <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                  <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                </div>
                <div class="item id">
                  <span class="header">ID</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__name') }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__nickname') }}</span>
                  <span>{{ item.nickname }}</span>
                </div>
                <div class="item">
                  <span class="header">Uri</span>
                  <span>{{ item.uri }}</span>
                </div>
                <div class="item method">
                  <span class="header">{{ $t('__method') }}</span>
                  <span>{{ item.method }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click.stop="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click.stop="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                </div>
              </div>
              <div v-if="item.open">
                <div class="item col">
                  <span class="header expandHeader">request_content</span>
                  <span>{{ item.request_content }}</span>
                </div>
                <div class="item col">
                  <span class="header expandHeader">response_content</span>
                  <span>{{ item.response_content }}</span>
                </div>
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
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__permission')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :method-type="methodType"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <editDialog
      ref="createDialog"
      :title="`${$t('__create')}${$t('__permission')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :method-type="methodType"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

  </div>
</template>

<script>
import { permissionSearch, permissionCreate, permissionEdit, permissionDelete } from '@/api/backstageManagement/permissionManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'

export default {
  name: 'PermissionManagement',
  components: { EditDialog },
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
      searchMethodType: [],
      methodType: [],
      curDialogIndex: 0
    }
  },
  computed: {
    methodTypeCollapse() {
      return this.searchForm.methodType && this.searchForm.methodType.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchForm.methodType'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1)
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    handleRespone(res) {
      this.allDataByClient = res.rows
      this.totalCount = res.rows.length
      this.searchMethodType = res.methodType
      this.methodType = ['None'].concat(res.methodType)
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
      permissionSearch(this.searchForm).then((res) => {
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
      this.selectForm.method = this.methodType[0]
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      if (data.method !== 'None') {
        data.methodType = data.method
      }
      permissionCreate(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onEditBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      if (!this.selectForm.method) {
        this.selectForm.method = this.methodType[0]
      }
      this.curDialogIndex = this.dialogEnum.edit
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true)
        if (data.method !== 'None') {
          data.methodType = data.method
        }
        permissionEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        permissionDelete(item.id).then((res) => {
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
        flex-direction: column;
        position: relative;
        .left {
          width: 100%;
          display: flex;
          flex-direction: column;
          .operate {
            justify-content: flex-start;
          }
          .expand {
            position: absolute;
            top: 5px;
            right: 5px;
          }
          .item{
            .header {
              width: 50px;
              min-width: 50px;
            }
            .expandHeader {
              width: 150px;
              min-width: 150px;
            }
            &.col {
              flex-direction: column;
            }
          }
        }
        .left + .expandContent {
          margin-top: 5px;
        }
        .operate + .item {
          margin-top: 5px;
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
        .base {
          display: flex;
          flex-direction: row;
          .item {
            width: 420px;
            min-width: 420px;
            margin-right: 15px;
            &.remark {
              width: 40px;
              min-width: 40px;
            }
            &.id{
              width: 70px;
              min-width: 70px;
            }
            &.method{
              width: 100px;
              min-width: 100px;
            }
          }
        }
      }
    }
  }
}
}
</style>
