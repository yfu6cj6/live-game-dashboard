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
              <el-select v-model="searchForm.type" :placeholder="$t('__type')" multiple :collapse-tags="typeCollapse">
                <el-option v-for="item in searchTypes" :key="item.key" :label="item.nickname" :value="item.key" />
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
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.type" filterable :placeholder="$t('__type')" multiple :collapse-tags="typeCollapse">
                <el-option v-for="item in searchTypes" :key="item.key" :label="item.nickname" :value="item.key" />
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
                  <div class="item">
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
                </div>
                <div class="right">
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
              </template>
              <template v-else>
                <div class="left">
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
                  <div class="item type">
                    <span class="header">{{ $t('__type') }}</span>
                    <span>{{ item.typeNickname }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onPermissionBtnClick(item)">{{ $t("__permission") }}</el-button>
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </template>
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
      :title="`${$t('__create')}${$t('__role')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :types="searchTypes"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__role')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :types="searchTypes"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <rolePermissionDialog
      ref="permissionDialog"
      :title="$stringFormat(`${$t('__setPermission')} - ${$t('__name')}:{0}`, [selectForm.name])"
      :visible="curDialogIndex === dialogEnum.permission"
      :confirm="$t('__confirm')"
      :form="selectForm"
      @close="closeDialogEven"
      @confirm="permissionDialogConfirmEven"
    />
  </div>
</template>

<script>
import { roleSearch, roleCreate, roleEdit, roleDelete, getPermissions, setPermissions } from '@/api/backstageManagement/roleManagement';
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
      const typeLength = (this.searchForm.type && this.searchForm.type.length);
      const typeHeight = this.typeCollapse ? 64 : (typeLength > 1 ? ((typeLength - 1) * 34) : 0);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(136 + typeHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `${(68 + typeHeight)}px` : formHeight;
        this.paginationPagerCount = 7;
      } else {
        formHeight = "auto";
        this.paginationPagerCount = 7;
      }
      this.$nextTick(() => {
        this.$refs.seachFormExpand.style.height = `${formHeight}`;
        this.setHeight();
      });
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
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        roleDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onPermissionBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.dataLoading = true
      getPermissions(item).then((res) => {
        this.curDialogIndex = this.dialogEnum.permission
        this.$refs.permissionDialog.setData(res)
        this.closeLoading()
      }).catch(() => {
        this.closeLoading()
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
          .right{
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
              .item {
                width: 200px;
              }
              .id {
                width: 60px;
              }
              .type {
                width: 80px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
