<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option table">
                <span class="prefix-label" />
                <div class="comp selected-filter custom">
                  <el-select
                    v-model="searchForm.table_id"
                    class="d-flex"
                    multiple
                    :popper-append-to-body="false"
                    :collapse-tags="tableIdCollapse"
                    :placeholder="$t('__tableId')"
                    :popper-class="'custom-dropdown w-auto'"
                  >
                    <el-option
                      v-for="item in selectOption.tables"
                      :key="item.key"
                      :label="item.nickname"
                      :value="item.key"
                    />
                  </el-select>
                </div>
                <span class="suffix-label" />
              </div>
              <div class="option betarea">
                <span class="prefix-label" />
                <div class="comp selected-filter custom">
                  <el-select
                    v-model="searchForm.live_bet_area_id"
                    class="d-flex"
                    multiple
                    :popper-append-to-body="false"
                    :collapse-tags="liveBetAreaIdCollapse"
                    :placeholder="$t('__liveBetAreaId')"
                    :popper-class="'custom-dropdown w-auto'"
                  >
                    <el-option
                      v-for="item in selectOption.liveBetArea"
                      :key="item.key"
                      :label="item.nickname"
                      :value="item.key"
                    />
                  </el-select>
                </div>
                <span class="suffix-label" />
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
                  <el-input v-model="searchForm.bet_min" type="number" class="input_size" :placeholder="$t('__betMin')" />
                </div>
                <div class="option">
                  <el-input v-model="searchForm.bet_max" type="number" class="input_size" :placeholder="$t('__betMax')" />
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <el-input v-model="searchForm.total_bet_max" type="number" class="input_size" :placeholder="$t('__totalBetMax')" />
                  <span class="zeroMeansNoLimit mt-2">{{ `${$t('__totalBetMax')}${$t('__zeroMeansNoLimit')}` }}</span>
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
              :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
            >
              <div class="left">
                <div class="item">
                  <span class="title">ID</span>
                  <span class="value">{{ item.id }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__tableId') }}</span>
                  <span class="value">{{ item.table_id }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__liveBetAreaId') }}</span>
                  <span class="value">{{ item.live_bet_area_id }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__totalBetMax') }}</span>
                  <span class="value" :class="{'text-red': item.total_bet_max === '0.00'}">{{ item.totalBetMaxLabel }}</span>
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="title">{{ $t('__betMin') }}</span>
                  <span class="value">{{ item.bet_min }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__betMax') }}</span>
                  <span class="value">{{ item.bet_max }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
        :title="$stringFormat(`${$t('__revise')}${$t('__gameArea')} - {0}`, [selectForm.table_id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        :tables="searchItems.tables"
        :live-bet-area="searchItems.liveBetArea"
        :is-edit="true"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />
    </template>
    <template v-else>
      -
    </template>
  </div>
</template>

<script>
import { gameAreaSearch, gameAreaCreate, gameAreaEdit, gameAreaDelete } from '@/api/backstageManagement/gameAreaManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'

export default {
  name: 'GameAreaManagement',
  components: { EditDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      curDialogIndex: 0,
      searchExpand: false,
      selectOption: {}
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
      if (this.searchForm.table_id && this.searchForm.table_id.length > 0) {
        this.searchFormOpen = true;
      }
    },
    'searchForm.live_bet_area_id'() {
      if (this.searchForm.live_bet_area_id && this.searchForm.live_bet_area_id.length > 0) {
        this.searchFormOpen = true;
      }
    }
  },
  created() {
    this.pageSizeCount = 1
    this.$nextTick(() => {
      this.onSearchBtnClick(1);
      this.addSelectFilter()
      this.setHeaderStyle()
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameAreaManagement'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option table', () => {
        this.searchForm.table_id = JSON.parse(JSON.stringify(this.searchItems.tables)).map(item => item.key)
      }, () => {
        this.searchForm.table_id = []
      }, () => {
        this.selectOption.tables = JSON.parse(JSON.stringify(this.searchItems.tables)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option betarea', () => {
        this.searchForm.live_bet_area_id = JSON.parse(JSON.stringify(this.searchItems.liveBetArea)).map(item => item.key)
      }, () => {
        this.searchForm.live_bet_area_id = []
      }, () => {
        this.selectOption.liveBetArea = JSON.parse(JSON.stringify(this.searchItems.liveBetArea)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.setDataLoading(true)
      gameAreaSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems))
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
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
      this.setDataLoading(false)
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameAreaManagement'), false, () => { }])
    },
    onCreateBtnClick() {
      this.selectForm = {}
      this.selectForm.table_id = this.searchItems.tables[0].key
      this.selectForm.live_bet_area_id = this.searchItems.liveBetArea[0].key
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__gameArea')}`, true, () => {
        this.closeDialogEven()
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__gameArea')}`, true, () => {
        this.closeDialogEven()
      }])
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      data.table_id = undefined
      data.live_bet_area_id = undefined
      gameAreaEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      gameAreaDelete(item.id).then((res) => {
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
.zeroMeansNoLimit {
  color: #f00;
}
</style>
