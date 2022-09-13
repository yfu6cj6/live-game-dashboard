<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.parameter" class="input_size" :placeholder="$t('__parameter')" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.remark" class="input_size" :placeholder="$t('__remark')" />
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
              <div class="d-flex">
                <div class="left">
                  <div class="item">
                    <span class="title">ID</span>
                    <span class="value">{{ item.id }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="title">{{ $t('__parameter') }}</span>
                    <span class="value">{{ item.parameter }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="item pl">
                  <span class="title">{{ $t('__parameterValue') }}</span>
                  <span class="value">{{ item.value }}</span>
                </div>
              </div>
              <div class="d-flex">
                <div class="item pl">
                  <span class="title">{{ $t('__remark') }}</span>
                  <span class="value">{{ item.remark }}</span>
                </div>
              </div>
              <div class="d-flex">
                <div class="left" />
                <div class="right">
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
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
        :title="$t('__edit')"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />

      <editDialog
        ref="createDialog"
        :title="$t('__create')"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />
    </template>
    <template v-else>
      -
    </template>
  </div>
</template>

<script>
import { sysParameterSearch, sysParameterCreate, sysParameterEdit, sysParameterDelete } from '@/api/backstageManagement/systemManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'

export default {
  name: 'SystemManagement',
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
      curDialogIndex: 0
    }
  },
  computed: {
    sortable() {
      return this.allDataByClient.length > 0
    }
  },
  created() {
    this.pageSizeCount = 1
    this.onSearchBtnClick(1)
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
      this.setDataLoading(false)
    },
    onSubmit() {
      this.setDataLoading(true)
      sysParameterSearch(this.searchForm).then((res) => {
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
      sysParameterCreate(data).then((res) => {
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
      sysParameterEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      sysParameterDelete(item.id).then((res) => {
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
.view-container {
  .search-container {
    .options {
      .option {
        width: 15rem;
      }
    }
  }
  .pl {
    padding-left: 1.16667rem;
  }
}
</style>
