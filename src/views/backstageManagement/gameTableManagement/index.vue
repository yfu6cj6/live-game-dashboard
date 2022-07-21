<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <div ref="seachFormExpand" class="view-container-seachForm-item">
          <p class="view-container-seachForm-item-wrap pc">
            <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.id" type="number" :placeholder="$t('__tableId')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.streaming_url" :placeholder="$t('__streamingUrl')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.app_name" placeholder="app_name" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.streaming_name" placeholder="streaming_name" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-select v-model="searchForm.status" multiple filterable :collapse-tags="stateCollapse" :placeholder="$t('__status')">
              <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.description" :placeholder="$t('__description')" />
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
                <div class="item">
                  <span class="header">{{ $t('__tableId') }}</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item">
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
                <div class="item">
                  <span class="header description">{{ $t('__description') }}</span>
                  <span>{{ item.description }}</span>
                </div>
                <template v-if="device !== 'mobile'">
                  <div class="item">
                    <span class="header streamingUrl">{{ $t('__streamingUrl') }}</span>
                    <span>{{ item.streaming_url }}</span>
                  </div>
                  <div class="item">
                    <span class="header">app_name</span>
                    <span>{{ item.app_name }}</span>
                  </div>
                  <div class="item">
                    <span class="header">streaming_name</span>
                    <span>{{ item.streaming_name }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onChipsSettingBtnClick(scope.row)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </template>
              </div>
              <template v-if="device === 'mobile'">
                <div class="right">
                  <div class="item">
                    <span class="header streamingUrl">{{ $t('__streamingUrl') }}</span>
                    <span>{{ item.streaming_url }}</span>
                  </div>
                  <div class="item">
                    <span class="header">app_name</span>
                    <span>{{ item.app_name }}</span>
                  </div>
                  <div class="item">
                    <span class="header">streaming_name</span>
                    <span>{{ item.streaming_name }}</span>
                  </div>
                  <div class="item">
                    <el-button class="bg-yellow" size="mini" @click="onChipsSettingBtnClick(scope.row)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
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
  </div>
</template>

<script>
import { gameTableSearch, gameTableCreate, gameTableEdit, gameTableDelete,
  gameTableChipsSearch, gameTableChipsCreate, gameTableChipsEdit, gameTableChipsDelete } from '@/api/backstageManagement/gameTableManagement'
import common from '@/mixin/common';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog'

export default {
  name: 'GameTableManagement',
  components: { EditDialog },
  mixins: [common, handlePageChange, handleSearchFormOpen],
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
    stateCollapse() {
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
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const statusHeight = this.stateCollapse ? 32 : ((this.searchForm.status && this.searchForm.status.length) * 32);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(238 + statusHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw <= 992) {
        formHeight = this.searchFormOpen ? `${(136 + statusHeight)}px` : formHeight;
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
          flex-direction: column;
          .item {
            line-height: 20px;
          }
          .streamingUrl {
            display: block;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .view {
    &-container {
      &-table {
        &-row {
          .wrap {
            flex-direction: row;
            .left {
              width: 50%;
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
          .wrap {
            flex-direction: row;
            .left {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
            .item {
              width: auto;
            }
            .operate {
              width: 300px;
            }
            .description {
              min-width: 240px;
            }
          }
        }
      }
    }
  }
}

</style>
