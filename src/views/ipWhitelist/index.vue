<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="tableStyle">
        <div class="bg-black">
          <div class="d-flex searchFrame">
            <div class="d-flex pad_frame wrap">
              <div v-if="!isAgentSubAccount" class="addCtrl">
                <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" @click="onCreateBtnClick()" />
              </div>
              <div class="pad_frame_2">
                <div class="d-flex searchItemBox">
                  <div class="searchItem pad_frame">
                    <div class="input_filter">
                      <el-input v-model="searchForm.account" class="input_size" :placeholder="$t('__agentOrSubAccount')" />
                    </div>
                  </div>
                  <div class="searchItem pad_frame">
                    <div class="input_filter">
                      <el-input v-model="searchForm.ip" class="input_size" placeholder="IP" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex ctrlBtn searchBtn">
                <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(1)" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
          >
            <div class="dataContent">
              <div class="d-flex base">
                <div class="left">
                  <div class="field">
                    <span class="title">{{ $t('__agentOrSubAccount') }}</span>
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
                </div>
                <div :class="{'moreopen': !item.open, 'moreclose': item.open}" @click.stop="remarkExpand(item)">
                  <svg-icon v-if="item.open" class="icon" icon-class="up" />
                  <svg-icon v-else class="icon" icon-class="more" />
                </div>
              </div>
              <div v-if="item.open" class="expandInfo">
                <div class="left">
                  <div class="field">
                    <span class="title">{{ $t('__updateDate') }}</span>
                    <span class="news">{{ item.updated_at }}</span>
                  </div>
                </div>
                <div v-if="!isAgentSubAccount" class="right">
                  <div class="adminCtrl">
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                  <div class="adminCtrl">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  </div>
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
        </div>
        <div v-else class="noInformation">{{ $t("__noInformation") }}</div>

        <editDialog
          ref="createDialog"
          :title="`${$t('__create')}${$t('__agentOrSubAccount')}`"
          :visible="curDialogIndex === dialogEnum.create"
          :confirm="$t('__confirm')"
          :form="selectForm"
          @close="closeDialogEven"
          @confirm="createDialogConfirmEven"
        />

        <editDialog
          ref="editDialog"
          :title="$stringFormat(`${$t('__edit')}${$t('__agentOrSubAccount')} - ID:{0}`, [selectForm.id])"
          :visible="curDialogIndex === dialogEnum.edit"
          :confirm="$t('__revise')"
          :form="selectForm"
          @close="closeDialogEven"
          @confirm="editDialogConfirmEven"
        />
      </div>
    </template>
    <template v-else>
      <div class="comp common-list ip-white-list">
        <div class="agent-pop-up-panel" style="display: none;" />
        <div class="w-100">
          <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
            <backTop ref="backTop" />
            <div id="scroll-inner" class="scroll-inner on native hasPage">
              <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
                <div class="filter-bar bg-black pt-3">
                  <div class="filter-outer">
                    <div class="filters flex-wrap">
                      <div class="filter-inner">
                        <div class="filter-options">
                          <div class="options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="input-filter">
                                  <div class="el-input">
                                    <input v-model="searchForm.account" type="text" autocomplete="off" :placeholder="$t('__agentOrSubAccount')" class="el-input__inner">
                                  </div>
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <div class="options">
                            <div>
                              <div class="option">
                                <span class="prefix-label" />
                                <div class="input-filter">
                                  <div class="el-input">
                                    <input v-model="searchForm.ip" type="text" autocomplete="off" placeholder="IP" class="el-input__inner">
                                  </div>
                                </div>
                                <span class="suffix-label" />
                              </div>
                            </div>
                          </div>
                          <button type="button" class="el-button bg-yellow filter-search mr-4 el-button--default" @click.stop="onSearchBtnClick(1)">
                            <span>{{ $t("__search") }}</span>
                          </button>
                          <div class="d-flex align-items-center ml-2 clickable" @click="onCreateBtnClick()">
                            <div>
                              <svg-icon class="icon fas mr-2 yellow" icon-class="add" style="height: 2rem; width: 2rem;" />
                            </div>
                            <span class="label text-yellow text-link text-underline">{{ $t('__createIpWhitelist') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="report-list" class="common-list flex-nowrap report-list flex-fill bg-new-dark-white has-index">
                  <template v-if="tableData.length > 0">
                    <div class="w-100">
                      <div class="agent-group">
                        <div
                          v-for="(item, index) in tableData"
                          :key="index"
                          class="w-100 items report-list-item-row"
                          :class="{'high-light': item.tap === true}"
                          @click.stop="tapRow(item)"
                        >
                          <div class="agent-list-basic list-row align-items-center">
                            <span>
                              <span class="index" style="font-size:17px!important;margin-top:-8.5px!important">1</span>
                            </span>
                            <div class="list-item d-flex align-items-start align-selfs-center align-items-center" style="padding-top: 1rem; padding-bottom: 1rem; width: 140px; flex-wrap: wrap;">
                              <span class="label" style="width: 100%; display: block;">{{ $t('__agentOrSubAccount') }}</span>
                              <span class="value d-flex flex-wrap text-golden mt-2">
                                <div class="fas gold mr-1">
                                  <svg-icon class="fas gold" icon-class="user" style="height: 1.5rem; width: 1.5rem;" />
                                </div>
                                <span>{{ item.account }}</span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start align-selfs-center align-items-center" style="padding-top: 1rem; padding-bottom: 1rem; width: 130px; flex-wrap: wrap;">
                              <span class="value">
                                <span>
                                  <div class="two-row-items text-left">
                                    <div class="items-label mb-0">IP</div>
                                    <div class="items-value mt-2 font-weight-bold">{{ item.ip }}</div>
                                  </div>
                                </span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start align-selfs-center align-items-center" style="padding-top: 1rem; padding-bottom: 1rem; width: 200px; flex-wrap: wrap;">
                              <span class="value">
                                <span>
                                  <div class="two-row-items text-left">
                                    <div class="items-label mb-0">{{ $t('__updateDate') }}</div>
                                    <div class="items-value mt-2 font-weight-bold">{{ item.updated_at }}</div>
                                  </div>
                                </span>
                              </span>
                            </div>
                            <div class="list-item d-flex align-items-start align-selfs-center align-items-center mr-5 clickable" style="padding-top: 0.4rem; padding-bottom: 1rem; width: auto; flex-wrap: wrap;">
                              <span class="value">
                                <button type="button" class="el-button bg-red filter-search mr-4 el-button--default" @click.stop="onDeleteBtnClick(item)">
                                  <span>{{ $t("__delete") }}</span>
                                </button>
                              </span>
                            </div> <div class="list-item d-flex align-items-start align-selfs-center align-items-center clickable" style="padding-top: 0.5rem; padding-bottom: 1rem; width: auto; flex-wrap: wrap;">
                              <span class="value">
                                <button type="button" class="el-button bg-yellow filter-search mr-4 el-button--default" @click.stop="onEditBtnClick(item)">
                                  <span>{{ $t("__edit") }}</span>
                                </button>
                              </span>
                            </div>
                          </div>
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
                    <div class="no-result">{{ $t('__noInformation') }}</div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <editDialog
          ref="createDialog"
          :title="`${$t('__create')}${$t('__agentOrSubAccount')}`"
          :visible="curDialogIndex === dialogEnum.create"
          :confirm="$t('__confirm')"
          :form="selectForm"
          @close="closeDialogEven"
          @confirm="createDialogConfirmEven"
        />

        <editDialog
          ref="editDialog"
          :title="$stringFormat(`${$t('__edit')}${$t('__agentOrSubAccount')} - ID:{0}`, [selectForm.id])"
          :visible="curDialogIndex === dialogEnum.edit"
          :confirm="$t('__revise')"
          :form="selectForm"
          @close="closeDialogEven"
          @confirm="editDialogConfirmEven"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { whitelistSearch, whitelistCreate, whitelistEdit, whitelistDelete } from '@/api/ipWhitelist';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog';
import { mapGetters } from 'vuex'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'IpWhitelist',
  components: { EditDialog, BackTop, Pagination },
  mixins: [handlePageChange, common, viewCommon],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      searchForm: {},
      selectForm: {},
      curDialogIndex: 0,
      searchH: 0,
      topH: 0
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount'
    ])
  },
  created() {
    this.onSearchBtnClick(1)
    this.setHeaderStyle()
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__loginIpWhitelist'), false, () => { }])
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    tapRow(row) {
      row.tap = !row.tap
      this.tableData = Object.assign([], this.tableData)
    },
    handleRespone(res) {
      this.allDataByClient = res
      this.totalCount = res.length
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      this.handlePageChangeByClient(this.currentPage)
      this.tableData.forEach(element => {
        element.tap = false
        element.open = open.includes(element.id)
      })

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
    onSubmit() {
      this.setDataLoading(true)
      whitelistSearch(this.searchForm).then((res) => {
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
        this.setDataLoading(true)
        whitelistDelete(item.id).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
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
#app.mobile {
  .tableStyle {
    overflow: auto;
    max-height: 100%;
    .more_btn_space {
      padding: 1.5rem;
      text-align: center;
      background-color: #fff;
    }
    .search_more {
      width: 100%;
      height: 4.5rem;
      .search_more_btn {
        padding-bottom: 0.01667rem;
        border-bottom: 1px solid #343a40;
      }
    }
  }
  .searchFrame {
    padding-top: 1.5rem;
    border-bottom: 0.25rem solid #f9c901;
    flex-flow: wrap;
    .addCtrl {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pad_frame {
      padding: 0 0.83333rem 0.41667rem 0.83333rem;
    }
    .pad_frame_2 {
      padding: 0 0.83333rem 0 0.83333rem;
    }
    .searchItemBox {
      width: 22.16667rem;
      justify-content: space-between;
    }
    .searchIcon {
      fill: #000 !important;
      height: 1.5rem;
      width: 1.5rem
    }
    .frame {
      padding-bottom: 0;
      border-bottom: 0;
    }
    .input_filter {
      height: 2.66667rem;
      line-height: 2.66667rem;
      width: 100%;
    }
    .ctrlBtn {
      justify-content: center;
      align-items: center;
      width: 3.1rem;
      height: 2.8rem;
    }
    .searchBtn {
      border-radius: 0.16667rem;
      background-color: #f9c901;
    }
    .addBtn {
      width: 4rem;
      height: 2.8rem;
    }
    .searchItem {
      width: 10.84583rem;
      padding-right: 0;
      padding-left: 0;
    }
    .searchIcon {
      fill: #000 !important;
    }
    .wrap {
      flex-flow: wrap;
    }
  }

  .dataContent {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.625rem 1.16667rem 0.625rem 1.16667rem;
    .base {
      width: 100%;
      display: flex;
      flex-direction: row;
      .left {
        width: 50%;
        display: flex;
        padding-top: 1rem;
        padding-bottom: 1rem;
        .spcolor {
          color: #ce9600;
        }
        .accountnews {
          display: flex;
          flex-direction: row;
          margin-top: 0.5rem;
          .icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.25rem;
            color: #ce9600;
          }
          .news {
            margin-top: 0rem;
          }
        }
      }
      .right {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
  }
  .field {
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
    }
    .news {
      font-weight: bold;
      word-break: break-all;
      margin-top: 0.5rem;
      color: #2b3c43;
    }
  }

  .expandInfo {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    .news {
      margin-top: 0.5rem;
    }
    .left,
    .right {
      width: 50%;
    }
    .right {
      display: flex;
      .adminCtrl {
        width: 50%;
      }
    }
  }

  .even-row {
    background-color: #fff;
  }

  .odd-row {
    background-color: #f4f4f4;
  }

  .moreopen {
    position: absolute;
    top: 0.83333rem;
    right: 1.3rem;
    .icon {
      fill: #a3a3a3;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .moreclose {
    position: absolute;
    top: 8.33333rem;
    right: 1.33rem;
    .icon {
      fill: #a3a3a3;
      width: 2.333rem;
      height: 2.333rem;
    }
  }
  @media (min-width: 992px) {
    .tableStyle {
      overflow: auto;
      max-height: 100%;
    }
    .searchFrame {
      .searchItemBox {
        width: auto;
        justify-content: space-between;
        .d-flex.pad_frame {
          padding-left: 0;
        }
      }
      .searchItem {
        width: 11rem;
        margin-right: 1.25rem;
      }
      .addBtn {
        width: 7.5rem;
        height: 2.8rem;
      }
    }
  }
}

</style>
