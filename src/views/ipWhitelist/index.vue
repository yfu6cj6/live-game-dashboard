<template>
  <div v-loading="dataLoading" class="tableStyle">
    <template v-if="device === 'mobile'">
      <div class="bg-black">
        <div class="d-flex searchFrame">
          <div class="d-flex pad_frame wrap">
            <div class="pad_frame">
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
              <svg-icon class="searchIcon" icon-class="search" @click.stop="onSearchBtnClick(searchForm, 1)" />
            </div>
            <div v-if="isAdminister" class="d-flex pad_frame">
              <el-button class="bg-yellow addBtn" size="mini" @click="onCreateBtnClick()">{{ $t("__create") }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      -
    </template>
    <div>
      <div v-if="allDataByClient.length > 0">
        <div
          v-for="(item, index) in allDataByClient"
          :key="index"
          :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
        >
          <template v-if="device === 'mobile'">
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
                <div v-if="isAdminister" class="right">
                  <div class="adminCtrl">
                    <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                  <div class="adminCtrl">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            -
          </template>
        </div>
      </div>
      <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
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

<script>
import { whitelistSearch, whitelistCreate, whitelistEdit, whitelistDelete } from '@/api/ipWhitelist';
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import EditDialog from './editDialog';
import { mapGetters } from 'vuex'

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
      curDialogIndex: 0,
      searchH: 0,
      topH: 0
    }
  },
  computed: {
    ...mapGetters([
      'isAdminister'
    ])
  },
  created() {
    this.onSearchBtnClick({}, 1)
  },
  methods: {
    remarkExpand(row) {
      const obj = this.allDataByClient.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.allDataByClient = JSON.parse(JSON.stringify(this.allDataByClient))
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
.tableStyle {
  overflow: auto;
  max-height: 100%;
}
.searchFrame {
  padding-top: 1.5rem;
  border-bottom: 0.25rem solid #f9c901;
  flex-flow: wrap;
  .pad_frame {
    padding: 0 0.83333rem 0.41667rem 0.83333rem;
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
    .setup {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 1rem;
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
</style>
