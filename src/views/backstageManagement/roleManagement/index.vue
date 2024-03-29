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
                  <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__nickname')" />
                </div>
                <div class="option type">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.type"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="typeCollapse"
                      :placeholder="$t('__type')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.type"
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
              class="flex-column"
              :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
            >
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
                    <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__nickname')" />
                  </div>
                  <div class="option type">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.type"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="typeCollapse"
                        :placeholder="$t('__type')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.type"
                          :key="item.key"
                          :label="item.nickname"
                          :value="item.key"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="d-flex">
                    <div>
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__role')}` }}</button>
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
                      <span class="title">{{ $t('__nickname') }}</span>
                      <span class="value">{{ item.nickname }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__type') }}</span>
                      <span class="value">{{ item.typeNickname }}</span>
                    </div>
                    <div class="operate align-items-center operate_w2">
                      <el-button class="bg-yellow" size="mini" @click="onPermissionBtnClick(item)">{{ $t("__permission") }}</el-button>
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onPasswordResetBtnClick(item)">{{ $t("__resetPassword") }}</el-button>
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
    </template>
  </div>
</template>

<script>
import { roleSearch, roleCreate, roleEdit, roleDelete, getPermissions, setPermissions } from '@/api/backstageManagement/roleManagement';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import RolePermissionDialog from './rolePermissionDialog'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'RoleManagement',
  components: { EditDialog, RolePermissionDialog, BackTop, Pagination },
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
      curDialogIndex: 0,
      searchExpand: false,
      selectOption: {
        type: []
      }
    }
  },
  computed: {
    typeCollapse() {
      return this.searchForm.type && this.searchForm.type.length > this.selectCollapseCount
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
    this.setHeaderStyle()
    this.$nextTick(() => {
      this.pageSizeCount = 1
      this.onSearchBtnClick(1)
      this.addSelectFilter();
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__roleManagement'), false, () => { }])
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option type', () => {
        this.searchForm.type = JSON.parse(JSON.stringify(this.searchTypes)).map(item => item.key)
      }, () => {
        this.searchForm.type = []
      }, () => {
        this.selectOption.type = JSON.parse(JSON.stringify(this.searchTypes)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.setDataLoading(true)
      roleSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.totalCount = res.rows.length
      this.searchTypes = res.types
      this.selectOption.type = JSON.parse(JSON.stringify(res.types))
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const typeItem = this.searchTypes.find(type => type.key === element.type)
        if (typeItem) {
          element.typeNickname = typeItem.nickname
        }
      })
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
      this.$refs.permissionDialog.setDialogLoading(false)
      this.setDataLoading(false)
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
      this.$refs.editDialog.setDialogLoading(true)
      roleEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      roleDelete(item.id).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onPermissionBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.setDataLoading(true)
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
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
