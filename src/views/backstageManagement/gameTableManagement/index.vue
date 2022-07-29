<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-input v-model="searchForm.id" type="number" :placeholder="$t('__tableId')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.streaming_url" :placeholder="$t('__streamingUrl')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.app_name" placeholder="app_name" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.streaming_name" placeholder="streaming_name" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.description" :placeholder="$t('__description')" />
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
              <el-input v-model="searchForm.id" type="number" :placeholder="$t('__tableId')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.streaming_url" :placeholder="$t('__streamingUrl')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.app_name" placeholder="app_name" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.streaming_name" placeholder="streaming_name" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.description" :placeholder="$t('__description')" />
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

              <div class="left" @click.stop="remarkExpand(item)">
                <div class="item">
                  <el-button class="bg-yellow" size="mini" @click.stop="onChipsSettingBtnClick(item)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
                  <el-button class="bg-yellow" size="mini" @click.stop="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click.stop="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__tableId') }}</span>
                  <span class="content">{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__name') }}</span>
                  <span class="content">{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__status') }}</span>
                  <span class="status content" :class="{'statusOpen': item.status === '1' }">
                    {{ item.statusLabel }}
                  </span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__idleRounds') }}</span>
                  <span class="content">{{ item.idle_rounds }}</span>
                </div>
                <div class="item col">
                  <span class="header">{{ $t('__description') }}</span>
                  <span class="content">{{ item.description }}</span>
                </div>
                <div class="item">
                  <div class="expand" @click.stop="remarkExpand(item)">
                    <svg-icon v-if="item.open" icon-class="up" />
                    <svg-icon v-else icon-class="more" />
                  </div>
                </div>
              </div>
              <div v-if="item.open" class="left" @click="remarkExpand(item)">
                <div class="item col">
                  <span class="header">{{ $t('__streamingUrl') }}</span>
                  <span class="content">{{ item.streaming_url }}</span>
                </div>
                <div class="item">
                  <span class="header">app_name</span>
                  <span class="content">{{ item.app_name }}</span>
                </div>
                <div class="item">
                  <span class="header">streaming_name</span>
                  <span class="content">{{ item.streaming_name }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="left">
                <div class="item tableId">
                  <span class="header">{{ $t('__tableId') }}</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item tableName">
                  <span class="header">{{ $t('__name') }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__idleRounds') }}</span>
                  <span>{{ item.idle_rounds }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ $t('__status') }}</span>
                  <span class="status" :class="{'statusOpen': item.activated === '1' }">
                    {{ item.statusLabel }}
                  </span>
                </div>
                <div class="item description">
                  <span class="header">{{ $t('__description') }}</span>
                  <span>{{ item.description }}</span>
                </div>
                <div class="item streaming_url">
                  <span class="header">{{ $t('__streamingUrl') }}</span>
                  <span>{{ item.streaming_url }}</span>
                </div>
                <div class="item appName">
                  <span class="header">app_name</span>
                  <span>{{ item.app_name }}</span>
                </div>
                <div class="item">
                  <span class="header">streaming_name</span>
                  <span>{{ item.streaming_name }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onChipsSettingBtnClick(item)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
      ref="createDialog"
      :title="`${$t('__create')}${$t('__gameTable')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :status="searchItems.status"
      :is-edit="false"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__gameTable')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :status="searchItems.status"
      :is-edit="true"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <chipSettingDialog
      ref="chipSettingDialog"
      :title="$stringFormat($t('__chipsSetting'), [selectForm.name])"
      :visible="curDialogIndex === dialogEnum.chipsSetting"
      :chips-data="chipsData"
      @search="chipSearch"
      @create="chipCreate"
      @edit="chipEdit"
      @delete="chipDelete"
      @close="closeDialogEven"
    />

    <chipEditDialog
      ref="chipCreateDialog"
      :title="$stringFormat($t('__createChips'), [selectForm.name])"
      :visible="curDialogIndex === dialogEnum.chipsCreate"
      :confirm="$t('__confirm')"
      :form="chipEditForm"
      @close="chipEditCloseDialogEven"
      @confirm="chipCreateDialogConfirmEven"
    />

    <chipEditDialog
      ref="chipEditDialog"
      :title="$stringFormat($t('__editChips'), [selectForm.name])"
      :visible="curDialogIndex === dialogEnum.chipsEdit"
      :confirm="$t('__revise')"
      :form="chipEditForm"
      @close="chipEditCloseDialogEven"
      @confirm="chipEditDialogConfirmEven"
    />

  </div>
</template>

<script>
import { gameTableSearch, gameTableCreate, gameTableEdit, gameTableDelete,
  gameTableChipsSearch, gameTableChipsCreate, gameTableChipsEdit, gameTableChipsDelete } from '@/api/backstageManagement/gameTableManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog'
import ChipSettingDialog from './chipSettingDialog'
import ChipEditDialog from './chipEditDialog'

export default {
  name: 'GameTableManagement',
  components: { EditDialog, ChipSettingDialog, ChipEditDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'chipsSetting': 3,
        'chipsCreate': 4,
        'chipsEdit': 5
      }),
      curDialogIndex: 0,
      chipsData: [],
      chipEditForm: {}
    }
  },
  computed: {
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchForm.status'() {
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
    onSearchBtnClick(data, page) {
      this.searchForm = data
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.dataLoading = true
      gameTableSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.searchItems = res.searchItems
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.statusLabel = this.searchItems.status.find(state => state.key === element.status).nickname
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.dataLoading = false
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    },
    onCreateBtnClick() {
      this.selectForm = { status: this.searchItems.status[0].key, idle_rounds: 3 }
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      gameTableCreate(data).then((res) => {
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
        data.table_id = undefined
        data.live_bet_area_id = undefined
        gameTableEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        gameTableDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onChipsSettingBtnClick(item) {
      this.dataLoading = true
      this.selectForm = JSON.parse(JSON.stringify(item))
      gameTableChipsSearch({ table_id: this.selectForm.id }).then((res) => {
        this.chipsData = res.rows
        this.curDialogIndex = this.dialogEnum.chipsSetting
        this.dataLoading = false
      }).catch(() => {
        this.closeLoading()
      })
    },
    chipSearch() {
      this.$refs.chipSettingDialog.setDialogLoading(true)
      gameTableChipsSearch({ table_id: this.selectForm.id }).then((res) => {
        this.chipsData = res.rows
        this.$refs.chipSettingDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.chipSettingDialog.setDialogLoading(false)
      })
    },
    chipCreate() {
      this.chipEditForm = {}
      this.curDialogIndex = this.dialogEnum.chipsCreate
    },
    chipCreateDialogConfirmEven(data) {
      this.$refs.chipCreateDialog.setDialogLoading(true)
      data.table_id = this.selectForm.id
      gameTableChipsCreate(data).then((res) => {
        this.chipsData = res.rows
        this.$refs.chipCreateDialog.setDialogLoading(false)
        this.curDialogIndex = this.dialogEnum.chipsSetting
      }).catch(() => {
        this.$refs.chipCreateDialog.setDialogLoading(false)
      })
    },
    chipEdit(item) {
      this.chipEditForm = JSON.parse(JSON.stringify(item))
      this.curDialogIndex = this.dialogEnum.chipsEdit
    },
    chipEditDialogConfirmEven(data) {
      this.$refs.chipEditDialog.setDialogLoading(true)
      data.table_id = this.selectForm.id
      gameTableChipsEdit(data).then((res) => {
        this.chipsData = res.rows
        this.$refs.chipEditDialog.setDialogLoading(false)
        this.curDialogIndex = this.dialogEnum.chipsSetting
      }).catch(() => {
        this.$refs.chipEditDialog.setDialogLoading(false)
      })
    },
    chipDelete(item) {
      this.$refs.chipSettingDialog.setDialogLoading(true)
      item.table_id = this.selectForm.id
      gameTableChipsDelete(item).then((res) => {
        this.chipsData = res.rows
        this.$refs.chipSettingDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.chipSettingDialog.setDialogLoading(false)
      })
    },
    chipEditCloseDialogEven() {
      this.curDialogIndex = this.dialogEnum.chipsSetting
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        position: relative;
        display: flex;
        flex-direction: column;
        .left {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .item {
            .header {
              width: 150px;
              min-width: 150px;
            }
            .expand {
              position: absolute;
              top: 5px;
              right: 5px;
            }
            &.col {
              flex-direction: column;
            }
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 50%;
          .item {
            .header {
              width: 30px;
              min-width: 80px;
            }
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
          .left {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content: space-between;
          }
          .item {
            width: auto;
            &.tableId {
              width: 60px;
            }
            &.tableName {
              width: 130px;
            }
            &.description {
              width: 240px;
            }
            &.streaming_url {
              width: 340px;
            }
            &.appName {
              width: 100px;
            }
          }
          .operate{
            align-items: center;
          }
        }
      }
    }
  }
}

</style>
