<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-select v-model="searchForm.table_id" multiple filterable :collapse-tags="tableIdCollapse" :placeholder="$t('__tableId')">
                <el-option v-for="item in searchItems.tables" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.live_bet_area_id" multiple filterable :collapse-tags="liveBetAreaIdCollapse" :placeholder="$t('__liveBetAreaId')">
                <el-option v-for="item in searchItems.liveBetArea" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.bet_min" type="number" :placeholder="$t('__betMin')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.bet_max" type="number" :placeholder="$t('__betMax')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.total_bet_max" type="number" :placeholder="$t('__totalBetMax')" />
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
            -
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
                    <span class="header">{{ $t('__tableId') }}</span>
                    <span>{{ item.table_id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__liveBetAreaId') }}</span>
                    <span>{{ item.live_bet_area_id }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="header">{{ $t('__betMin') }}</span>
                    <span>{{ item.bet_min }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__betMax') }}</span>
                    <span>{{ item.bet_max }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__totalBetMax') }}</span>
                    <span :class="{'status': item.total_bet_max === '0.00' }">
                      {{ item.totalBetMaxLabel }}
                    </span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div>
                  -
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
      :title="`${$t('__create')}${$t('__gameArea')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :tables="searchItems.tables"
      :live-bet-area="searchItems.liveBetArea"
      :is-edit="false"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__gameArea')} - {0}`, [selectForm.table_id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      :tables="searchItems.tables"
      :live-bet-area="searchItems.liveBetArea"
      :is-edit="true"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />
  </div>
</template>

<script>
import { gameAreaSearch, gameAreaCreate, gameAreaEdit, gameAreaDelete } from '@/api/backstageManagement/gameAreaManagement'
import common from '@/mixin/common';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog'

export default {
  name: 'GameAreaManagement',
  components: { EditDialog },
  mixins: [common, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      curDialogIndex: 0
    }
  },
  computed: {
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    liveBetAreaIdCollapse() {
      return this.searchForm.live_bet_area_id && this.searchForm.live_bet_area_id.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchForm.table_id'() {
      this.resizeHandler();
    },
    'searchForm.live_bet_area_id'() {
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
      const tableIdHeight = this.statusCollapse ? 32 : ((this.searchForm.table_id && this.searchForm.table_id.length) * 32);
      const liveBetAreaIdHeight = this.statusCollapse ? 32 : ((this.searchForm.live_bet_area_id && this.searchForm.live_bet_area_id.length) * 32);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(170 + tableIdHeight + liveBetAreaIdHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `${(102 + tableIdHeight + liveBetAreaIdHeight)}px` : formHeight;
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
      gameAreaSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.searchItems = res.searchItems
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.totalBetMaxLabel = element.total_bet_max === '0.00' ? this.$t('__noLimit') : element.total_bet_max
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
      this.selectForm = {}
      this.selectForm.table_id = this.searchItems.tables[0].key
      this.selectForm.live_bet_area_id = this.searchItems.liveBetArea[0].key
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      gameAreaCreate(data).then((res) => {
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
        gameAreaEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        gameAreaDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
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
          .left,
          .right {
            width: 50%;
          }
          .operate {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
