<template>
  <div class="w-100 h-100">
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
                <div class="option">
                  <el-input v-model="searchForm.uri" class="input_size" placeholder="Uri" />
                </div>
              </div>
              <div class="options">
                <div class="option method">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.methodType"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="methodTypeCollapse"
                      :placeholder="$t('__method')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.searchMethodType"
                        :key="item"
                        :label="item"
                        :value="item"
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
            <dir
              v-for="(item, index) in tableData"
              :key="index"
              class="flex-column"
              :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
            >
              <div class="base">
                <div class="left">
                  <div class="item">
                    <span class="title">ID</span>
                    <span class="value">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__name') }}</span>
                    <span class="value">{{ item.name }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__nickname') }}</span>
                    <span class="value">{{ item.nickname }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="title">{{ $t('__method') }}</span>
                    <span class="value">{{ item.method }}</span>
                  </div>
                  <div class="item">
                    <span class="title">Uri</span>
                    <span class="value">{{ item.uri }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                  <div class="item">
                    <div class="expand" @click.stop="remarkExpand(item)">
                      <svg-icon v-if="item.open" icon-class="up" style="height: 2rem; width: 2rem;" />
                      <svg-icon v-else icon-class="more" style="height: 2rem; width: 2rem;" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.open" class="flex-column">
                <div class="item remark">
                  <span class="title">request_content</span>
                  <span class="value">{{ item.request_content }}</span>
                </div>
                <div class="item remark">
                  <span class="title">response_content</span>
                  <span class="value">{{ item.response_content }}</span>
                </div>
              </div>
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
        ref="editDialog"
        :title="$stringFormat(`${$t('__revise')}${$t('__permission')} - ID:{0}`, [selectForm.id])"
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
    </template>
    <template v-else>
      <div class="pos-r">
        <backTop
          ref="backTop"
          :inner-class="'.view-container'"
          :view-class="'.scroll_view'"
        />
        <div class="view-container bg-white" style="height: calc((100vh - 6.25rem) - 30px);">
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
                  <div class="option">
                    <el-input v-model="searchForm.uri" class="input_size" placeholder="Uri" />
                  </div>
                  <div class="option method">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.methodType"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="methodTypeCollapse"
                        :placeholder="$t('__method')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.searchMethodType"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="d-flex">
                    <div>
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__permission')}` }}</button>
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
                  class="flex-column"
                  :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
                >
                  <div class="base">
                    <div class="d-flex">
                      <div class="item justify-content-center" style="width: 30px;" @click.stop="remarkExpand(item)">
                        <svg-icon v-if="item.open" class="fas yellow" icon-class="up" style="height: 2rem; width: 2rem;" />
                        <svg-icon v-else class="fas yellow" icon-class="more" style="height: 2rem; width: 2rem;" />
                      </div>
                      <div class="item justify-content-center item_w0">
                        <span class="title">ID</span>
                        <span class="value">{{ item.id }}</span>
                      </div>
                      <div class="item justify-content-center item_w2">
                        <span class="title">{{ $t('__name') }}</span>
                        <span class="value">{{ item.name }}</span>
                      </div>
                      <div class="item justify-content-center item_w1">
                        <span class="title">{{ $t('__nickname') }}</span>
                        <span class="value">{{ item.nickname }}</span>
                      </div>
                      <div class="item justify-content-center item_w0">
                        <span class="title">{{ $t('__method') }}</span>
                        <span class="value">{{ item.method }}</span>
                      </div>
                      <div class="item justify-content-center item_w2">
                        <span class="title">Uri</span>
                        <span class="value">{{ item.uri }}</span>
                      </div>
                      <div class="operate align-items-center operate_w1">
                        <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                        <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.open" class="flex-column">
                    <div class="item remark">
                      <span class="title w-100">request_content</span>
                      <span class="value w-100">{{ item.request_content }}</span>
                    </div>
                    <div class="item remark">
                      <span class="title w-100">response_content</span>
                      <span class="value w-100">{{ item.response_content }}</span>
                    </div>
                  </div>
                </div>
                <pagination
                  :page-size="pageSize"
                  :page-sizes="pageSizes"
                  :total="totalCount"
                  :current-page.sync="currentPage"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </template>
              <template v-else>
                <div class="noInformation">{{ $t("__noInformation") }}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <editDialog
        ref="editDialog"
        :title="$stringFormat(`${$t('__revise')}${$t('__permission')} - ID:{0}`, [selectForm.id])"
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
    </template>
  </div>
</template>

<script>
import { permissionSearch, permissionCreate, permissionEdit, permissionDelete } from '@/api/backstageManagement/permissionManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'PermissionManagement',
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
      searchMethodType: [],
      methodType: [],
      curDialogIndex: 0,
      searchExpand: false,
      selectOption: {
        searchMethodType: []
      }
    }
  },
  computed: {
    methodTypeCollapse() {
      return this.searchForm.methodType && this.searchForm.methodType.length > this.selectCollapseCount
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
    this.pageSizeCount = 1
    this.onSearchBtnClick(1)
    this.setHeaderStyle()
    this.$nextTick(() => {
      this.addSelectFilter();
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__permissionManagement'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option method', () => {
        this.searchForm.methodType = JSON.parse(JSON.stringify(this.searchMethodType)).map(item => item)
      }, () => {
        this.searchForm.methodType = []
      }, () => {
        this.selectOption.searchMethodType = JSON.parse(JSON.stringify(this.searchMethodType)).filter(item => item.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
      })
    },
    handleRespone(res) {
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      res.rows.forEach(element => {
        element.open = open.includes(element.id)
        element.method = element.method === null || element.method === '' ? '-' : element.method
        element.uri = element.uri === null || element.uri === '' ? '-' : element.uri
        element.request_content = element.request_content === null || element.request_content === '' ? '-' : element.request_content
        element.response_content = element.response_content === null || element.response_content === '' ? '-' : element.response_content
      })

      this.allDataByClient = res.rows
      this.totalCount = res.rows.length
      this.searchMethodType = res.methodType
      this.methodType = ['None'].concat(res.methodType)
      this.selectOption.searchMethodType = JSON.parse(JSON.stringify(this.searchMethodType))
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
      permissionSearch(this.searchForm).then((res) => {
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
      this.selectForm.method = this.methodType[0]
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__permission')}`, true, () => {
        this.closeDialogEven()
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__permission')}`, true, () => {
        this.closeDialogEven()
      }])
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      if (data.method !== 'None') {
        data.methodType = data.method
      }
      permissionEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      permissionDelete(item.id).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__permissionManagement'), false, () => { }])
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  .table-container {
    .base {
      width: 100%;
      display: flex;
      .right {
        position: relative;
        .expand {
          position: absolute;
          top: 0;
          right: 0;
          .svg-icon {
            fill: #a3a3a3;
            width: 2.5rem;
            height: 2.5rem;
          }
        }
      }
    }
    .remark {
      padding: 0 1rem;
    }
  }
}
</style>
