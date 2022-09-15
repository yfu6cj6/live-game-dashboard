<template>
  <div class="w-100 h-100 bg-new-dark-white">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.id" type="number" class="input_size" :placeholder="$t('__tableId')" />
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
            <div v-show="searchExpand">
              <div class="options">
                <div class="option">
                  <el-input v-model="searchForm.streaming_url" class="input_size" :placeholder="$t('__streamingUrl')" />
                </div>
                <div class="option">
                  <el-input v-model="searchForm.app_name" class="input_size" placeholder="app_name" />
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <el-input v-model="searchForm.streaming_name" class="input_size" placeholder="streaming_name" />
                </div>
                <div class="d-flex option status">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.status"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="statusCollapse"
                      :placeholder="$t('__status')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.status"
                        :key="item.key"
                        :label="item.nickname"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <el-input v-model="searchForm.description" class="input_size" :placeholder="$t('__description')" />
                </div>
              </div>
            </div>
            <div class="options d-flex mt-2">
              <div class="d-flex">
                <div class="createBtn mr-1">
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
                    <span class="title">{{ $t('__tableId') }}</span>
                    <span class="value">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__name') }}</span>
                    <span class="value">{{ item.name }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__status') }}</span>
                    <span class="value" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}">{{ item.statusLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__idleRounds') }}</span>
                    <span class="value">{{ item.idle_rounds }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="title">{{ $t('__streamingUrl') }}</span>
                    <span class="value">{{ item.streaming_url }}</span>
                  </div>
                  <div class="item">
                    <span class="title">app_name</span>
                    <span class="value">{{ item.app_name }}</span>
                  </div>
                  <div class="item">
                    <span class="title">streaming_name</span>
                    <span class="value">{{ item.streaming_name }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__description') }}</span>
                    <span class="value">{{ item.description }}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="left">
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onChipsSettingBtnClick(item)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
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
        :title="$stringFormat(`${$t('__revise')}${$t('__gameTable')} - ID:{0}`, [selectForm.id])"
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
                    <el-input v-model="searchForm.id" type="number" class="input_size" :placeholder="$t('__tableId')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.name" class="input_size" :placeholder="$t('__name')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.streaming_url" class="input_size" :placeholder="$t('__streamingUrl')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.app_name" class="input_size" placeholder="app_name" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.streaming_name" class="input_size" placeholder="streaming_name" />
                  </div>
                  <div class="d-flex option status">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.status"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="statusCollapse"
                        :placeholder="$t('__status')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.status"
                          :key="item.key"
                          :label="item.nickname"
                          :value="item.key"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.description" class="input_size" :placeholder="$t('__description')" />
                  </div>
                  <div class="d-flex">
                    <div>
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__gameTable')}` }}</button>
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
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__tableId') }}</span>
                      <span class="value">{{ item.id }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__name') }}</span>
                      <span class="value">{{ item.name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__status') }}</span>
                      <span class="value" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}">{{ item.statusLabel }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__idleRounds') }}</span>
                      <span class="value">{{ item.idle_rounds }}</span>
                    </div>
                    <div class="item justify-content-center item_w2">
                      <span class="title">{{ $t('__streamingUrl') }}</span>
                      <span class="value">{{ item.streaming_url }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">app_name</span>
                      <span class="value">{{ item.app_name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">streaming_name</span>
                      <span class="value">{{ item.streaming_name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__description') }}</span>
                      <span class="value">{{ item.description }}</span>
                    </div>
                    <div class="operate align-items-center operate_w2">
                      <el-button class="bg-yellow" size="mini" @click="onChipsSettingBtnClick(item)">{{ `${$t("__chips")}${$t("__setting")}` }}</el-button>
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
        :title="$stringFormat(`${$t('__revise')}${$t('__gameTable')} - ID:{0}`, [selectForm.id])"
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
    </template>
  </div>
</template>

<script>
import { gameTableSearch, gameTableCreate, gameTableEdit, gameTableDelete,
  gameTableChipsSearch, gameTableChipsCreate, gameTableChipsEdit, gameTableChipsDelete } from '@/api/backstageManagement/gameTableManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import ChipSettingDialog from './chipSettingDialog'
import ChipEditDialog from './chipEditDialog'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'GameTableManagement',
  components: { EditDialog, ChipSettingDialog, ChipEditDialog, BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
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
      chipEditForm: {},
      selectOption: {},
      searchExpand: false
    }
  },
  computed: {
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
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
    this.$nextTick(() => {
      this.onSearchBtnClick(1)
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameTableManagement'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.status)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.searchItems.status)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.setDataLoading(true)
      gameTableSearch(this.searchForm).then((res) => {
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
        element.statusLabel = this.searchItems.status.find(state => state.key === element.status).nickname
      })
      this.totalCount = res.rows.length
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
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    },
    onCreateBtnClick() {
      this.selectForm = { status: this.searchItems.status[0].key, idle_rounds: 3 }
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__gameTable')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameTableManagement'), false, () => { }])
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__gameTable')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__gameTableManagement'), false, () => { }])
      }])
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      data.table_id = undefined
      data.live_bet_area_id = undefined
      gameTableEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      gameTableDelete(item.id).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onChipsSettingBtnClick(item) {
      this.setDataLoading(true)
      this.selectForm = JSON.parse(JSON.stringify(item))
      gameTableChipsSearch({ table_id: this.selectForm.id }).then((res) => {
        this.chipsData = res.rows
        this.curDialogIndex = this.dialogEnum.chipsSetting
        this.setDataLoading(false)
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
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
