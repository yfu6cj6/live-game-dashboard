<template>
  <div v-loading="dataLoading">
    <div class="view-container">
      <div class="bg-black">
        <template v-if="device === 'mobile'">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" type="number" class="input_size" placeholder="ID" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
              </div>
              <div class="createBtn">
                <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
              </div>
            </div>
            <div class="options mt-2">
              <div class="option">
                <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__nickname')" />
              </div>
              <div class="option status">
                <span class="prefix-label" />
                <div class="comp selected-filter custom">
                  <el-select
                    v-model="searchForm.type"
                    class="d-flex"
                    multiple
                    :popper-append-to-body="false"
                    :collapse-tags="typeCollapse"
                    :placeholder="$t('__status')"
                    :popper-class="'custom-dropdown w-auto'"
                  >
                    <el-option
                      v-for="item in searchTypes"
                      :key="item.key"
                      :label="item.nickname"
                      :value="item.key"
                    />
                  </el-select>
                </div>
                <span class="suffix-label" />
              </div>
              <div class="searchBtn">
                <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(1)" />
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
            class="flex-column"
            :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="d-flex">
                <div class="left">
                  <div class="item">
                    <span class="title">ID</span>
                    <span class="value">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__name') }}</span>
                    <span class="value">{{ item.name }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="title">{{ $t('__nickname') }}</span>
                    <span class="value">{{ item.nickname }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__type') }}</span>
                    <span class="value">{{ item.typeNickname }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="left">
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onPermissionBtnClick(item)">{{ $t("__permission") }}</el-button>
                  </div>
                </div>
                <div class="right">
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
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
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import RolePermissionDialog from './rolePermissionDialog'

export default {
  name: 'RoleManagement',
  components: { EditDialog, RolePermissionDialog },
  mixins: [common, viewCommon, handlePageChange],
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
    // 'searchForm.type'() {
    //   this.resizeHandler();
    // }
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__roleManagement'), false, () => { }])
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
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
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__setPermission'), true, () => {
          this.closeDialogEven()
          this.$store.dispatch('common/setHeaderStyle', [this.$t('__roleManagement'), false, () => { }])
        }])
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
        display: flex;
        flex-direction: row;
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
          .operate{
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
          flex-direction: row;
          .item {
            width: 300px;
            min-width: 300px;
            margin-right: 50px;
          }
          .operate {
            .locate {
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
