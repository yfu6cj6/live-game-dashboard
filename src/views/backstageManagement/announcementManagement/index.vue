<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-input v-model="searchForm.title" :placeholder="$t('__announcementTitle')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.content" :placeholder="$t('__announcementContent')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.type" multiple :collapse-tags="typeCollapse" :placeholder="$t('__announcementType')">
                <el-option v-for="item in methodType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.is_marquee" multiple :collapse-tags="isMarqueeCollapse" :placeholder="$t('__marquee')">
                <el-option v-for="item in announcementMarqueeStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.announcementedAt"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__announcementDate')}(${$t('__start')})`"
                :end-placeholder="`${$t('__announcementDate')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.maintainedAt"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__maintainDate')}(${$t('__start')})`"
                :end-placeholder="`${$t('__maintainDate')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
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
              <el-input v-model="searchForm.title" :placeholder="$t('__announcementTitle')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.content" :placeholder="$t('__announcementContent')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.type" multiple filterable :collapse-tags="typeCollapse" :placeholder="$t('__announcementType')">
                <el-option v-for="item in methodType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.is_marquee" multiple filterable :collapse-tags="isMarqueeCollapse" :placeholder="$t('__marquee')">
                <el-option v-for="item in announcementMarqueeStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.announcementedAt"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__announcementDate')}(${$t('__start')})`"
                :end-placeholder="`${$t('__announcementDate')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.maintainedAt"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__maintainDate')}(${$t('__start')})`"
                :end-placeholder="`${$t('__maintainDate')}(${$t('__end')})`"
                :picker-options="pickerOptions"
              />
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
            </p>
            <p class="optionItem">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick(searchForm, 1)">
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
                <div class="left" @click="remarkExpand(item)">
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click.stop="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                    <el-button class="bg-red" size="mini" @click.stop="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                  </div>
                  <div class="item">
                    <span class="header">ID</span>
                    <span class="content">{{ item.id }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__marquee') }}</span>
                    <span class="status content" :class="{'statusOpen': item.is_marquee === '1' }">{{ item.marquee }}</span>
                  </div>
                  <div class="item">
                    <span class="header">{{ $t('__announcementType') }}</span>
                    <span class="content">{{ item.typeNickname }}</span>
                  </div>
                  <div class="item col">
                    <span class="header">{{ $t('__announcementTitle') }}</span>
                    <span class="content">{{ item.title }}</span>
                  </div>
                  <div class="item">
                    <div class="expand" @click.stop="remarkExpand(item)">
                      <svg-icon v-if="item.open" icon-class="up" />
                      <svg-icon v-else icon-class="more" />
                    </div>
                  </div>
                </div>
                <div class="right" @click="remarkExpand(item)">
                  <div class="item col">
                    <span class="header">{{ `${$t('__announcementDate')}(${$t('__start')})` }}</span>
                    <span class="content">{{ item.announcement_started_at }}</span>
                  </div>
                  <div class="item col">
                    <span class="header">{{ `${$t('__announcementDate')}(${$t('__end')})` }}</span>
                    <span class="content">{{ item.announcement_ended_at }}</span>
                  </div>
                  <div class="item col">
                    <span class="header">{{ `${$t('__maintainDate')}(${$t('__start')})` }}</span>
                    <span class="content">{{ item.maintain_started_at }}</span>
                  </div>
                  <div class="item col">
                    <span class="header">{{ `${$t('__maintainDate')}(${$t('__end')})` }}</span>
                    <span class="content">{{ item.maintain_ended_at }}</span>
                  </div>
                </div>
              </div>
              <div v-if="item.open" @click="remarkExpand(item)">
                <div class="item col">
                  <span class="header">{{ $t('__content') }}</span>
                  <span class="content">{{ item.content }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="base">
                <div class="item remark">
                  <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                  <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                </div>
                <div class="item id">
                  <span class="header">ID</span>
                  <span>{{ item.id }}</span>
                </div>
                <div class="item type">
                  <span class="header">{{ $t('__announcementType') }}</span>
                  <span>{{ item.typeNickname }}</span>
                </div>
                <div class="item marquee">
                  <span class="header">{{ $t('__marquee') }}</span>
                  <span class="status" :class="{'statusOpen': item.is_marquee === '1' }">{{ item.marquee }}</span>
                </div>
                <div class="item title">
                  <span class="header">{{ $t('__announcementTitle') }}</span>
                  <span>{{ item.title }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__announcementDate')}(${$t('__start')})` }}</span>
                  <span>{{ item.announcement_started_at }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__announcementDate')}(${$t('__end')})` }}</span>
                  <span>{{ item.announcement_ended_at }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__maintainDate')}(${$t('__start')})` }}</span>
                  <span>{{ item.maintain_started_at }}</span>
                </div>
                <div class="item">
                  <span class="header">{{ `${$t('__maintainDate')}(${$t('__end')})` }}</span>
                  <span>{{ item.maintain_ended_at }}</span>
                </div>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click.stop="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                  <el-button class="bg-red" size="mini" @click.stop="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                </div>
              </div>
              <div v-if="item.open">
                <div class="item">
                  <span class="header">{{ $t('__content') }}</span>
                  <span>
                    {{ item.content }}
                  </span>
                </div>
              </div>
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
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__announcement')} - ID:{0}`, [selectForm.id])"
      :visible="curDialogIndex === dialogEnum.edit"
      :confirm="$t('__revise')"
      :picker-options="pickerOptions"
      :form="selectForm"
      :method-type="methodType"
      :announcement-marquee-status-type="announcementMarqueeStatusType"
      @close="closeDialogEven"
      @confirm="editDialogConfirmEven"
    />

    <editDialog
      ref="createDialog"
      :title="`${$t('__create')}${$t('__announcement')}`"
      :visible="curDialogIndex === dialogEnum.create"
      :confirm="$t('__confirm')"
      :form="selectForm"
      :picker-options="pickerOptions"
      :method-type="methodType"
      :announcement-marquee-status-type="announcementMarqueeStatusType"
      @close="closeDialogEven"
      @confirm="createDialogConfirmEven"
    />
  </div>
</template>

<script>
import { announcementSearch, announcementCreate, announcementEdit, announcementDelete } from '@/api/backstageManagement/announcementManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import { mapGetters } from 'vuex'
import { getFullDate, getNextDate } from '@/utils/transDate'

export default {
  name: 'AnnouncementManagement',
  components: { EditDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('__nextWeek'),
          onClick(picker) {
            picker.$emit('pick', getNextDate(7))
          }
        }, {
          text: this.$t('__nextMonth'),
          onClick(picker) {
            picker.$emit('pick', getNextDate(30))
          }
        }, {
          text: this.$t('__nextThreeMonths'),
          onClick(picker) {
            picker.$emit('pick', getNextDate(90))
          }
        }]
      },
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      methodType: [],
      curDialogIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'announcementMarqueeStatusType'
    ]),
    typeCollapse() {
      return this.searchForm.type && this.searchForm.type.length > this.selectCollapseCount
    },
    isMarqueeCollapse() {
      return this.searchForm.is_marquee && this.searchForm.is_marquee.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchForm.announcementedAt': function() {
      this.$nextTick(() => {
        this.onSearchBtnClick(this.searchForm, 1)
      })
    },
    'searchForm.maintainedAt': function() {
      this.$nextTick(() => {
        this.onSearchBtnClick(this.searchForm, 1)
      })
    },
    'searchForm.type'() {
      this.resizeHandler();
    },
    'searchForm.is_marquee'() {
      this.resizeHandler();
    }
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
    handleRequest(data) {
      if (data.announcementedAt) {
        for (let i = 0, max = data.announcementedAt.length; i < max; i++) {
          data.announcementedAt[i] = getFullDate(data.announcementedAt[i])
        }
      }
      if (data.maintainedAt) {
        for (let i = 0, max = data.maintainedAt.length; i < max; i++) {
          data.maintainedAt[i] = getFullDate(data.maintainedAt[i])
        }
      }

      if (data.content) {
        data.contents = data.content
      }
    },
    handleRespone(res) {
      this.methodType = res.methodType
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.marquee = element.is_marquee === '1' ? 'V' : 'X'
        const typeNickname = this.methodType.find(type => type.key === element.type)
        element.typeNickname = typeNickname ? typeNickname.nickname : element.type
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
    onSubmit() {
      this.dataLoading = true
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      announcementSearch(data).then((res) => {
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
      this.selectForm.is_marquee = this.announcementMarqueeStatusType[1].key
      this.selectForm.type = this.methodType[0].key
      this.curDialogIndex = this.dialogEnum.create
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      this.handleRequest(data)
      announcementCreate(data).then((res) => {
        this.handleRespone(res)
        this.$store.dispatch('backstageManagement/setAnnouncement', res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onEditBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.selectForm.announcementedAt = [getFullDate(this.selectForm.announcement_started_at), getFullDate(this.selectForm.announcement_ended_at)]
      this.selectForm.maintainedAt = [getFullDate(this.selectForm.maintain_started_at), getFullDate(this.selectForm.maintain_ended_at)]
      this.curDialogIndex = this.dialogEnum.edit
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true)
        this.handleRequest(data)
        announcementEdit(data).then((res) => {
          this.handleRespone(res)
          this.$store.dispatch('backstageManagement/setAnnouncement', res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onDeleteBtnClick(item) {
      this.confirmMsg(this.$stringFormat(`${this.$t('__confirmDeletion')}?`, [`"ID: ${item.id}"`]), () => {
        this.dataLoading = true
        announcementDelete(item.id).then((res) => {
          this.handleRespone(res)
          this.$store.dispatch('backstageManagement/setAnnouncement', res)
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
        display: flex;
        flex-direction: column;
        position: relative;
        .base {
          display: flex;
          flex-direction: row;
          .left,
          .right {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .right {
            .item {
              .header {
                width: 100px;
                min-width: 100px;
              }
            }
          }
          .operate {
            justify-content: start;
          }
          .expand {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        }
        .item {
          .header {
            width: 80px;
            min-width: 80px;
          }
          &.col {
            flex-direction: column;
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
          display: flex;
          flex-direction: column;
          .base {
            width: 100%;
            flex-direction: row;
            .item {
              width: 250px;
              min-width: 250px;
              &.remark {
                width: 40px;
                min-width: 40px;
              }
              &.id {
                width: 80px;
                min-width: 80px;
              }
              &.type {
                width: 150px;
                min-width: 150px;
              }
              &.marquee {
                width: 100px;
                min-width: 100px;
              }
              &.title {
                width: 180px;
                min-width: 180px;
              }
              .header {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
