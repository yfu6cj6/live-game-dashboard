<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-input v-model="searchForm.id" type="number" placeholder="ID" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.area" :placeholder="$t('__code')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple filterable :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.activated" multiple filterable :collapse-tags="activatedCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in activated" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
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
              <el-input v-model="searchForm.id" type="number" placeholder="ID" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.area" :placeholder="$t('__code')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.currency" multiple filterable :collapse-tags="currencyCollapse" :placeholder="$t('__currency')">
                <el-option v-for="item in currency" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.activated" multiple filterable :collapse-tags="activatedCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in activated" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
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
            <div class="wrap">
              <template v-if="device === 'mobile'">
                <div class="left">
                  <div class="item">
                    <span class="header">ID</span>
                    <span>{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__name') }}</span>
                    <span>{{ item.area_name }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__code') }}</span>
                    <span>{{ item.area }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__odds') }}</span>
                    <span>{{ item.odds }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__status') }}</span>
                    <span class="status" :class="{'statusOpen': item.activated === '1' }">
                      {{ item.activatedLabel }}
                    </span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="header">{{ $t('__currency') }}</span>
                    <span>{{ item.currency }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__betMin') }}</span>
                    <span>{{ item.bet_min }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__betMax') }}</span>
                    <span>{{ item.bet_max }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="left">
                  <div class="item id">
                    <span class="header">ID</span>
                    <span>{{ item.id }}</span>
                  </div>
                  <div class="item areaName">
                    <span class="header">{{ $t('__name') }}</span>
                    <span>{{ item.area_name }}</span>
                  </div>
                  <div class="item area">
                    <span class="header">{{ $t('__code') }}</span>
                    <span>{{ item.area }}</span>
                  </div>
                  <div class="item odds">
                    <span class="header">{{ $t('__odds') }}</span>
                    <span>{{ item.odds }}</span>
                  </div>
                  <div class="item activatedLabel">
                    <span class="header">{{ $t('__status') }}</span>
                    <span class="status" :class="{'statusOpen': item.activated === '1' }">
                      {{ item.activatedLabel }}
                    </span>
                  </div>
                  <div class="item currency">
                    <span class="header">{{ $t('__currency') }}</span>
                    <span>{{ item.currency }}</span>
                  </div>
                  <div class="item bet_min">
                    <span class="header">{{ $t('__betMin') }}</span>
                    <span>{{ item.bet_min }}</span>
                  </div>
                  <div class="item bet_max">
                    <span class="header">{{ $t('__betMax') }}</span>
                    <span>{{ item.bet_max }}</span>
                  </div>
                  <div class="operate">
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
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';

export default {
  name: 'LiveBetAreaManagement',
  components: { EditDialog },
  mixins: [common, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      curDialogIndex: 0,
      currency: [],
      activated: []
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
    'searchForm.currency'() {
      this.resizeHandler();
    },
    'searchForm.activated'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const currencyHeight = this.currencyCollapse ? 32 : ((this.searchForm.currency && this.searchForm.currency.length) * 32);
      const activatedHeight = this.activatedCollapse ? 32 : ((this.searchForm.activated && this.searchForm.activated.length) * 32);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(170 + currencyHeight + activatedHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `${(102 + currencyHeight + activatedHeight)}px` : formHeight;
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
      liveBetAreaSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.currency = res.searchItems.currency
      this.activated = res.searchItems.activated
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const activatedLabel = this.activated.find(active => active.key === element.activated)
        if (activatedLabel) {
          element.activatedLabel = activatedLabel.nickname
        }
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
.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          .left {
            width: 50%;
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
            .left {
              display: flex;
              justify-content: space-evenly;
              width: 100%;
            }
            .id {
              width: 30px;
            }
            .areaName {
              width: 110px;
            }
            .area {
              width: 180px;
            }
            .odds {
              width: 60px;
            }
            .activatedLabel {
              width: 60px;
            }
            .currency {
              width: 60px;
            }
            .bet_min {
              width: 110px;
            }
            .bet_max {
              width: 110px;
            }
          }
          .operate {
            width: 160px;
          }
        }
      }
    }
  }
}
</style>