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
                  <el-input v-model="searchForm.area" type="number" class="input_size" :placeholder="$t('__value')" />
                </div>
                <div class="d-flex option currency">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.currency"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="currencyCollapse"
                      :placeholder="$t('__currency')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.currency"
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
                <div class="d-flex option status">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.activated"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="activatedCollapse"
                      :placeholder="$t('__status')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.activated"
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
                  <span class="title">{{ $t('__name') }}</span>
                  <span class="value">{{ item.area_name }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__code') }}</span>
                  <span class="value">{{ item.area }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__odds') }}</span>
                  <span class="value">{{ item.oddsLabel }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__status') }}</span>
                  <span class="value" :class="{'text-red': item.activated === '0', 'text-green': item.activated === '1'}">{{ item.activatedLabel }}</span>
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="title">{{ $t('__currency') }}</span>
                  <span class="value">{{ item.currency }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__betMin') }}</span>
                  <span class="value">{{ item.bet_minLabel }}</span>
                </div>
                <div class="item">
                  <span class="title">{{ $t('__betMax') }}</span>
                  <span class="value">{{ item.bet_maxLabel }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
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
        :title="`${$t('__create')}${$t('__liveBetAreaId')}`"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        :currency="currency"
        :activated="activated"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />

      <editDialog
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__liveBetAreaId')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        :currency="currency"
        :activated="activated"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />
    </template>
    <template v-else>
      <div class="pos-r">
        <backTop
          ref="backTop"
          :inner-class="'.view-container'"
          :view-class="'.scroll-view'"
        />
        <div class="view-container bg-white" style="height: calc((100vh - 6.25rem) - 30px);">
          <div class="scroll-view">
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
                    <el-input v-model="searchForm.account" class="input_size" :placeholder="$t('__account')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.area" type="number" class="input_size" :placeholder="$t('__value')" />
                  </div>
                  <div class="option currency">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.currency"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="currencyCollapse"
                        :placeholder="$t('__currency')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.currency"
                          :key="item.key"
                          :label="item.nickname"
                          :value="item.key"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="option status">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.activated"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="activatedCollapse"
                        :placeholder="$t('__status')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.activated"
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
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__liveGame')}` }}</button>
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
                      <span class="title">ID</span>
                      <span class="value">{{ item.id }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__name') }}</span>
                      <span class="value">{{ item.area_name }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__code') }}</span>
                      <span class="value">{{ item.area }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__status') }}</span>
                      <span class="value" :class="{'text-red': item.activated === '0', 'text-green': item.activated === '1'}">{{ item.activatedLabel }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__currency') }}</span>
                      <span class="value">{{ item.currency }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__betMin') }}</span>
                      <span class="value">{{ item.bet_minLabel }}</span>
                    </div>
                    <div class="item justify-content-center item_w1">
                      <span class="title">{{ $t('__betMax') }}</span>
                      <span class="value">{{ item.bet_maxLabel }}</span>
                    </div>
                    <div class="operate align-items-center">
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
        ref="createDialog"
        :title="`${$t('__create')}${$t('__liveBetAreaId')}`"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        :currency="currency"
        :activated="activated"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />

      <editDialog
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__liveBetAreaId')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        :currency="currency"
        :activated="activated"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />
    </template>
  </div>
</template>

<script>
import { liveBetAreaSearch, liveBetAreaCreate, liveBetAreaEdit, liveBetAreaDelete } from '@/api/backstageManagement/liveBetAreaManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog';
import { numberFormat } from '@/utils/numberFormat';
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'LiveBetAreaManagement',
  components: { EditDialog, BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      curDialogIndex: 0,
      currency: [],
      activated: [],
      selectOption: {},
      searchExpand: false
    }
  },
  computed: {
    currencyCollapse() {
      return this.searchForm.currency && this.searchForm.currency.length > this.selectCollapseCount;
    },
    activatedCollapse() {
      return this.searchForm.activated && this.searchForm.activated.length > this.selectCollapseCount;
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
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__liveBetAreaManagement'), false, () => { }])
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option currency', () => {
        this.searchForm.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).map(item => item.key)
      }, () => {
        this.searchForm.currency = []
      }, () => {
        this.selectOption.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option status', () => {
        this.searchForm.activated = JSON.parse(JSON.stringify(this.searchItems.activated)).map(item => item.key)
      }, () => {
        this.searchForm.activated = []
      }, () => {
        this.selectOption.activated = JSON.parse(JSON.stringify(this.searchItems.activated)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(page) {
      this.pageSizeCount = 1
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.setDataLoading(true)
      liveBetAreaSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.searchItems = JSON.parse(JSON.stringify(res.searchItems));
      this.selectOption = JSON.parse(JSON.stringify(res.searchItems))
      this.currency = res.searchItems.currency
      this.activated = res.searchItems.activated
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const activatedLabel = this.activated.find(active => active.key === element.activated)
        if (activatedLabel) {
          element.activatedLabel = activatedLabel.nickname
        }
        element.bet_maxLabel = numberFormat(element.bet_max)
        element.bet_minLabel = numberFormat(element.bet_min)
        element.oddsLabel = numberFormat(element.odds)
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
    },
    onCreateBtnClick() {
      this.selectForm = { currency: this.currency[0].key, activated: this.activated[0].key }
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__liveBetAreaId')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__liveBetAreaManagement'), false, () => { }])
      }])
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      liveBetAreaCreate(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onEditBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.curDialogIndex = this.dialogEnum.edit
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__edit')}${this.$t('__liveBetAreaId')}`, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__liveBetAreaManagement'), false, () => { }])
      }])
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true)
        liveBetAreaEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.setDataLoading(true)
        liveBetAreaDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
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
