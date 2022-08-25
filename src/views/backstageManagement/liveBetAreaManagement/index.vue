<template>
  <div v-loading="dataLoading">
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
                  <el-input v-model="searchForm.area" type="number" class="input_size" :placeholder="$t('__value')" />
                </div>
                <div class="option options">
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
                        v-for="item in currency"
                        :key="item.key"
                        :label="item.nickname"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
              </div>
              <div class="options status">
                <div class="option options">
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
                        v-for="item in activated"
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
            <div class="options d-flex">
              <div class="d-flex">
                <div class="createBtn">
                  <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
                </div>
              </div>
              <div class="d-flex option_ctrl_right">
                <div class="searchBtn">
                  <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(searchForm, 1)" />
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
            :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
          >
            <template v-if="device === 'mobile'">
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
                <div class="operate locate_rb">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
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
  </div>
</template>

<script>
import { liveBetAreaSearch, liveBetAreaCreate, liveBetAreaEdit, liveBetAreaDelete } from '@/api/backstageManagement/liveBetAreaManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog';
import { numberFormat } from '@/utils/numberFormat';

export default {
  name: 'LiveBetAreaManagement',
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
  },
  created() {
    this.$nextTick(() => {
      this.onSearchBtnClick({}, 1);
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
      this.addSelectDropDownFilter('options currency', () => {
        this.searchForm.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).map(item => item.key)
      }, () => {
        this.searchForm.currency = []
      }, () => {
        this.selectOption.currency = JSON.parse(JSON.stringify(this.searchItems.currency)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('options status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.searchItems.status)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.searchItems.status)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchBtnClick(data, page) {
      this.pageSizeCount = 1
      this.searchForm = data
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.dataLoading = true
      liveBetAreaSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.currency = res.searchItems.currency
      this.activated = res.searchItems.activated
      this.allDataByClient = JSON.parse(JSON.stringify(res.rows))
      this.selectOption = JSON.parse(JSON.stringify(res.rows))
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
      this.dataLoading = false
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
        this.dataLoading = true
        liveBetAreaDelete(item.id).then((res) => {
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

.option_ctrl_right {
  justify-content: flex-end;
  width: 100%;
  padding: 0 0.5rem;
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          flex-direction: row;
          .item {
            width: 150px;
            min-width: 150px;
            margin-right: 40px;
          }
          .operate {
            width: auto;
            .locate {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
