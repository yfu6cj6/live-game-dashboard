<template>
  <div v-loading="dataLoading" class="w-100 h-100">
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
              <a class="more-opiton text-link text-underline text-yellow align-items-center" @click.stop="onSearchExpand()">
                <div class="fas label icon d-flex align-items-center yellow">
                  <svg-icon :icon-class="searchExpand ? 'less': 'add'" style="height: 1.08333rem;width: 1.08333rem;" />
                </div>
                {{ $t('__options') }}
              </a>
            </div>
            <div v-show="searchExpand === true">
              <div class="options currency">
                <div class="option">
                  <el-input v-model="searchForm.nickname" class="input_size" :placeholder="$t('__nickname')" />
                </div>
                <div class="option">
                  <el-input v-model="searchForm.uri" class="input_size" placeholder="Uri" />
                </div>
              </div>
              <div class="options method">
                <div class="option">
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
      this.addSelectDropDownFilter('options method', () => {
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
      })

      this.allDataByClient = res.rows
      this.totalCount = res.rows.length
      this.searchMethodType = res.methodType
      this.methodType = ['None'].concat(res.methodType)
      this.selectOption.searchMethodType = JSON.parse(JSON.stringify(this.searchMethodType))
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__permissionManagement'), false, () => { }])
    }
  }
}
</script>

<style lang="scss" scoped>
.option_ctrl_right {
  justify-content: flex-end;
  width: 100%;
  padding: 0 0.5rem;
}
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
