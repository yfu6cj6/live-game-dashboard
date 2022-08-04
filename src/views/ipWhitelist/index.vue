<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
            </p>
            <p class="operateItem moreSearch">
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
              <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.ip" placeholder="IP" />
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
              <div class="base">
                <div class="left">
                  <div class="field">
                    <span class="title">{{ $t('__account') }}</span>
                    <div class="accountnews">
                      <svg-icon icon-class="user" class="icon" />
                      <span class="news spcolor">{{ item.account }}</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="field">
                    <span class="title">IP</span>
                    <span class="news">{{ item.ip }}</span>
                  </div>
                  <div class="setup">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                </div>
                <div :class="{'moreopen': !item.open, 'moreclose': item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" icon-class="up" />
                  <svg-icon v-else icon-class="more" />
                </div>
              </div>
              <div v-if="item.open" class="moreInfo" @click.stop="remarkExpand(item)">
                <div class="field">
                  <span class="title">{{ $t('__updateDate') }}</span>
                  <span class="news">{{ item.updated_at }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- <div class="item id">
                <span class="header">ID</span>
                <span>{{ item.id }}</span>
              </div>
              <div class="item">
                <span class="header">{{ $t('__account') }}</span>
                <span>{{ item.account }}</span>
              </div>
              <div class="item">
                <span class="header">IP</span>
                <span>{{ item.ip }}</span>
              </div>
              <div class="operate">
                <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
              </div> -->
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
      :title="`${$t('__create')}${$t('__account')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />

    <editDialog
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__account')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :form="selectForm"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />
  </div>
</template>

<script>
import { whitelistSearch, whitelistCreate, whitelistEdit, whitelistDelete } from '@/api/ipWhitelist';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';

export default {
  name: 'IpWhitelist',
  components: { EditDialog },
  mixins: [handlePageChange, handleSearchFormOpen, common, viewCommon],
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
      this.dataLoading = false
    },
    onSubmit() {
      this.dataLoading = true
      whitelistSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data
      this.handleCurrentChange(page)
    },
    onCreateBtnClick() {
      this.selectForm = {}
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      whitelistCreate(data).then((res) => {
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
        whitelistEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        whitelistDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
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
        .base {
          width: 100%;
          display: flex;
          flex-direction: row;
          .left {
            width: 50%;
            display: flex;
            .spcolor {
              color: #c49136;
            }
            .accountnews {
              display: flex;
              flex-direction: row;
              .icon {
                color: #c49136;
              }
            }
          }
          .right {
            width: 50%;
            display: flex;
            flex-direction: column;
          }
          .setup {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-top: 10px;
          }
        }
        .field {
          display: flex;
          flex-direction: column;
          .title {
            display: flex;
            align-items: center;
            width: 100px;
            min-width: 100px;
          }
          .news {
            font-weight: bold;
            word-break: break-all;
            color: #2b3c43;
          }
        }
        .moreInfo {
          display: flex;
          flex-direction: row;
        }
        .moreopen {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 25px;
          color: #4e4e4e;
        }
        .moreclose {
          position: absolute;
          bottom: 5px;
          right: 5px;
          font-size: 25px;
          color: #4e4e4e;
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
          .item {
            width: 450px;
            min-width: 450px;
            margin-right: 50px;
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
