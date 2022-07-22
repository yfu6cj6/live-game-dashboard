<template>
  <div>
    <div v-loading="dataLoading">
      <div ref="container" class="view-container">
        <div ref="seachForm" class="view-container-seachForm" :class="{'opened': sidebar.opened}">
          <div ref="seachFormExpand" class="view-container-seachForm-item">
            <p class="view-container-seachForm-item-wrap pc">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-input v-model="searchForm.id" type="number" placeholder="ID" />
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-select v-model="searchForm.type" filterable :placeholder="$t('__type')" multiple :collapse-tags="typeCollapse">
                <el-option v-for="item in searchTypes" :key="item.key" :label="item.nickname" :value="item.key" />
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
                <div class="left">
                  <div class="item item_id">
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
                  <template v-if="device !== 'mobile'">
                    <div class="item">
                      <span class="header">{{ $t('__type') }}</span>
                      <span>{{ item.typeNickname }}</span>
                    </div>
                    <div class="operate">
                      <el-button class="bg-yellow" size="mini" @click="onPermissionBtnClick(item)">{{ $t("__permission") }}</el-button>
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                    </div>
                  </template>
                </div>
                <div v-if="device === 'mobile'" class="right">
                  <div class="item">
                    <span class="header">{{ $t('__type') }}</span>
                    <span>{{ item.typeNickname }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onPermissionBtnClick(item)">{{ $t("__permission") }}</el-button>
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
        </div>
      </div>
      <div class="view-footer" :class="{'opened': sidebar.opened}">
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
    </div>
    <editDialog
      ref="editDialog"
      :title="$t('__edit')"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :types="searchTypes"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <editDialog
      ref="createDialog"
      :title="$t('__create')"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :types="searchTypes"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <rolePermissionDialog
      ref="permissionDialog"
      :title="$t('__setPermission')"
      :visible="curDialogIndex === dialogEnum.permission"
      :confirm="$t('__confirm')"
      :form="selectForm"
      @close="closeDialogEven"
      @confirm="permissionDialogConfirmEven"
    />
  </div>
</template>

<script>
import { roleSearch, roleCreate, roleEdit, setPermissions /* roleDelete, getPermissions */ } from '@/api/backstageManagement/roleManagement';
import common from '@/mixin/common';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog'
import RolePermissionDialog from './rolePermissionDialog'

export default {
  name: 'RoleManagement',
  components: { EditDialog, RolePermissionDialog },
  mixins: [common, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'permission': 3
      }),
      searchTypes: [],
      curDialogIndex: 0
    }
  },
  computed: {
    typeCollapse() {
      return this.searchForm.type && this.searchForm.type.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchForm.type'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1)
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const typeHeight = this.typeCollapse ? 32 : ((this.searchForm.type && this.searchForm.type.length) * 32);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(136 + typeHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw <= 992) {
        formHeight = this.searchFormOpen ? `${(68 + typeHeight)}px` : formHeight;
        this.paginationPagerCount = 7;
      } else {
        formHeight = "auto";
        this.paginationPagerCount = 7;
      }

      this.$refs.seachFormExpand.style.height = `${formHeight}`;
      this.setHeight();
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.dataLoading = true
      roleSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.totalCount = res.rows.length
      this.searchTypes = res.types
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const typeItem = this.searchTypes.find(type => type.key === element.type)
        if (typeItem) {
          element.typeNickname = typeItem.nickname
        }
      })
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.$refs.permissionDialog.setDialogLoading(false)
      this.dataLoading = false
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    },
    onCreateBtnClick() {
      this.selectForm = {}
      this.selectForm.type = this.searchTypes[0].key
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      roleCreate(data).then((res) => {
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
        roleEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    permissionDialogConfirmEven(selection) {
      this.$refs.permissionDialog.setDialogLoading(true)
      const requestData = { id: this.selectForm.id, permissions: selection.map(element => { return element.name }) }
      setPermissions(requestData).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
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
          .left {
            display: flex;
            flex-direction: column;
            width: 50%;
          }
          .item {
            display: flex;
            flex-wrap: wrap;
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
              width: 100%;
              justify-content: space-between;
              align-items: center;
            }
            .item {
              flex-direction: column;
              width: 200px;
            }
            .item_id {
              width: 60px;
            }
          }
        }
      }
    }
  }
}
</style>
