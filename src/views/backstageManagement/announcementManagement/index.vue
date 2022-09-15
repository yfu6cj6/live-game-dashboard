<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="day-range pl-2 pr-2">
                <div class="date-time-picker-box">
                  <div class="picker datetimerange" @click.once="changeInitCalendarPage_announcement">
                    <el-date-picker
                      ref="datePicker"
                      v-model="searchForm.announcementedAt"
                      type="datetimerange"
                      popper-class="ams-timeslot-popper announcementData mobilePicker"
                      :clearable="false"
                      :editable="false"
                      time-arrow-control
                      :range-separator="$t('__to')"
                      :start-placeholder="`${$t('__announcementDate')}(${$t('__start')})`"
                      :end-placeholder="`${$t('__announcementDate')}(${$t('__end')})`"
                      :default-time="['00:00:00', '23:59:59']"
                      :format="'yyyy-MM-dd HH:mm'"
                      prefix-icon="''"
                      clear-icon="''"
                    />
                  </div>
                </div>
              </div>
              <a class="more-opiton text-link text-underline text-yellow align-items-center" @click.stop="onSearchExpand()">
                <div class="fas label icon d-flex align-items-center yellow">
                  <svg-icon :icon-class="searchExpand ? 'less': 'add'" style="height: 1.08333rem;width: 1.08333rem;" />
                </div>
                {{ $t('__options') }}
              </a>
            </div>
            <div class="options">
              <div class="day-range pl-2 pr-2">
                <div class="date-time-picker-box">
                  <div class="picker datetimerange" @click.once="changeInitCalendarPage_maintain">
                    <el-date-picker
                      v-model="searchForm.maintainedAt"
                      type="datetimerange"
                      popper-class="ams-timeslot-popper maintainData mobilePicker"
                      :clearable="false"
                      :editable="false"
                      time-arrow-control
                      :range-separator="$t('__to')"
                      :start-placeholder="`${$t('__maintainDate')}(${$t('__start')})`"
                      :end-placeholder="`${$t('__maintainDate')}(${$t('__end')})`"
                      :default-time="['00:00:00', '23:59:59']"
                      :format="'yyyy-MM-dd HH:mm'"
                      prefix-icon="''"
                      clear-icon="''"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-show="searchExpand === true" class="pl_pt">
              <div class="options">
                <div class="option w-4">
                  <el-input v-model="searchForm.title" type="text" class="input_size" :placeholder="$t('__announcementTitle')" />
                </div>
                <div class="option w-4">
                  <el-input v-model="searchForm.content" type="text" class="input_size" :placeholder="$t('__announcementContent')" />
                </div>
              </div>
              <div class="options">
                <div class="d-flex option type w-4">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.type"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="typeCollapse"
                      :placeholder="$t('__announcementType')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.type"
                        :key="item.key"
                        :label="$t(item.nickname)"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
                <div class="d-flex option marquee w-4">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.is_marquee"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="isMarqueeCollapse"
                      :placeholder="$t('__marquee')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.marquee"
                        :key="item.key"
                        :label="$t(item.nickname)"
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
              class="flex-column"
              :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
            >
              <div class="base">
                <div class="d-flex w-100">
                  <div class="left">
                    <div class="item">
                      <span class="title">ID</span>
                      <span class="value">{{ item.id }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ $t('__marquee') }}</span>
                      <span class="value" :class="{'text-green': item.is_marquee === '1', 'text-red': item.is_marquee === '0' }">{{ item.marquee }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ `${$t('__announcementDate')}(${$t('__start')})` }}</span>
                      <span class="value">{{ item.announcement_started_at }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ `${$t('__announcementDate')}(${$t('__end')})` }}</span>
                      <span class="value">{{ item.announcement_ended_at }}</span>
                    </div>
                  </div>
                  <div class="right">
                    <div class="item">
                      <span class="title">{{ $t('__announcementType') }}</span>
                      <span class="value">{{ item.typeNickname }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ $t('__announcementTitle') }}</span>
                      <span class="value">{{ item.title }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ `${$t('__maintainDate')}(${$t('__start')})` }}</span>
                      <span class="value">{{ item.maintain_started_at }}</span>
                    </div>
                    <div class="item">
                      <span class="title">{{ `${$t('__maintainDate')}(${$t('__end')})` }}</span>
                      <span class="value">{{ item.maintain_ended_at }}</span>
                    </div>
                    <div class="operate">
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                    </div>
                    <div class="item">
                      <div class="expand" @click.stop="remarkExpand(item)">
                        <svg-icon v-if="item.open" icon-class="up" style="height: 2rem; width: 2rem;" />
                        <svg-icon v-else icon-class="more" style="height: 2rem; width: 2rem;" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.open">
                <div class="item remark">
                  <span class="title">{{ $t('__content') }}</span>
                  <span class="value">{{ item.content }}</span>
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
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__announcement')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
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
        :method-type="methodType"
        :announcement-marquee-status-type="announcementMarqueeStatusType"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />
    </template>
    <template v-else>
      <div class="pos-r">
        <backTop
          ref="backTop"
          :inner-class="'.view-container'"
          :view-class="'.scroll_view'"
        />
        <div class="view-container bg-white" style="height: calc((100vh - 6.25rem) - 30px);">
          <div class="scroll_view">
            <div class="bg-black">
              <div class="yellow-border-bottom search-container">
                <div class="options">
                  <div class="day-range pl-2 pr-2">
                    <div class="date-time-picker-box">
                      <div class="picker datetimerange" @click.once="changeInitCalendarPage_announcement">
                        <el-date-picker
                          ref="datePicker"
                          v-model="searchForm.announcementedAt"
                          type="datetimerange"
                          popper-class="ams-timeslot-popper announcementData pcPicker"
                          :clearable="false"
                          :editable="false"
                          time-arrow-control
                          :range-separator="$t('__to')"
                          :start-placeholder="`${$t('__announcementDate')}(${$t('__start')})`"
                          :end-placeholder="`${$t('__announcementDate')}(${$t('__end')})`"
                          :default-time="['00:00:00', '23:59:59']"
                          :format="'yyyy-MM-dd HH:mm'"
                          prefix-icon="''"
                          clear-icon="''"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="day-range pl-2 pr-2">
                    <div class="date-time-picker-box">
                      <div class="picker datetimerange" @click.once="changeInitCalendarPage_maintain">
                        <el-date-picker
                          v-model="searchForm.maintainedAt"
                          type="datetimerange"
                          popper-class="ams-timeslot-popper maintainData pcPicker"
                          :clearable="false"
                          :editable="false"
                          time-arrow-control
                          :range-separator="$t('__to')"
                          :start-placeholder="`${$t('__maintainDate')}(${$t('__start')})`"
                          :end-placeholder="`${$t('__maintainDate')}(${$t('__end')})`"
                          :default-time="['00:00:00', '23:59:59']"
                          :format="'yyyy-MM-dd HH:mm'"
                          prefix-icon="''"
                          clear-icon="''"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.title" type="text" class="input_size" :placeholder="$t('__announcementTitle')" />
                  </div>
                  <div class="option">
                    <el-input v-model="searchForm.content" type="text" class="input_size" :placeholder="$t('__announcementContent')" />
                  </div>
                  <div class="d-flex option type">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.type"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="typeCollapse"
                        :placeholder="$t('__announcementType')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.type"
                          :key="item.key"
                          :label="$t(item.nickname)"
                          :value="item.key"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="d-flex option marquee">
                    <span class="prefix-label" />
                    <div class="comp selected-filter custom">
                      <el-select
                        v-model="searchForm.is_marquee"
                        class="d-flex"
                        multiple
                        :popper-append-to-body="false"
                        :collapse-tags="isMarqueeCollapse"
                        :placeholder="$t('__marquee')"
                        :popper-class="'custom-dropdown w-auto'"
                      >
                        <el-option
                          v-for="item in selectOption.marquee"
                          :key="item.key"
                          :label="$t(item.nickname)"
                          :value="item.key"
                        />
                      </el-select>
                    </div>
                    <span class="suffix-label" />
                  </div>
                  <div class="d-flex">
                    <div>
                      <button class="ml-2 el-button bg-yellow el-button--default mr-4 font-weight-bold" @click.stop="onCreateBtnClick()">{{ `${$t('__create')}${$t('__announcement')}` }}</button>
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
                  class="flex-column"
                  :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}"
                >
                  <div class="base">
                    <div class="d-flex">
                      <div class="item justify-content-center" style="width: 30px;" @click.stop="remarkExpand(item)">
                        <svg-icon v-if="item.open" class="fas yellow" icon-class="up" style="height: 2rem; width: 2rem;" />
                        <svg-icon v-else class="fas yellow" icon-class="more" style="height: 2rem; width: 2rem;" />
                      </div>
                      <div class="item justify-content-center item_w0">
                        <span class="title">ID</span>
                        <span class="value">{{ item.id }}</span>
                      </div>
                      <div class="item justify-content-center item_w1">
                        <span class="title">{{ $t('__announcementTitle') }}</span>
                        <span class="value">{{ item.title }}</span>
                      </div>
                      <div class="item justify-content-center item_w0">
                        <span class="title">{{ $t('__announcementType') }}</span>
                        <span class="value">{{ item.typeNickname }}</span>
                      </div>
                      <div class="item justify-content-center item_w0">
                        <span class="title">{{ $t('__marquee') }}</span>
                        <span class="value" :class="{'text-green': item.is_marquee === '1', 'text-red': item.is_marquee === '0' }">{{ item.marquee }}</span>
                      </div>
                      <div class="item justify-content-center item_w3">
                        <span class="title">{{ `${$t('__announcementDate')}(${$t('__start')})` }}</span>
                        <span class="value">{{ item.announcement_started_at }}</span>
                      </div>
                      <div class="item justify-content-center item_w3">
                        <span class="title">{{ `${$t('__announcementDate')}(${$t('__end')})` }}</span>
                        <span class="value">{{ item.announcement_ended_at }}</span>
                      </div>
                      <div class="item justify-content-center item_w3">
                        <span class="title">{{ `${$t('__maintainDate')}(${$t('__start')})` }}</span>
                        <span class="value">{{ item.maintain_started_at }}</span>
                      </div>
                      <div class="item justify-content-center item_w3">
                        <span class="title">{{ `${$t('__maintainDate')}(${$t('__end')})` }}</span>
                        <span class="value">{{ item.maintain_ended_at }}</span>
                      </div>
                      <div class="operate align-items-center operate_w1">
                        <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                        <el-button class="bg-red" size="mini" @click="onDeleteBtnClick(item)">{{ $t("__delete") }}</el-button>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.open">
                    <div class="item remark">
                      <span class="title">{{ $t('__content') }}</span>
                      <span class="value">{{ item.content }}</span>
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
        ref="editDialog"
        :title="$stringFormat(`${$t('__edit')}${$t('__announcement')} - ID:{0}`, [selectForm.id])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
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
        :method-type="methodType"
        :announcement-marquee-status-type="announcementMarqueeStatusType"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />
    </template>
  </div>
</template>

<script>
import { announcementSearch, announcementCreate, announcementEdit, announcementDelete } from '@/api/backstageManagement/announcementManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import EditDialog from './editDialog'
import { mapGetters } from 'vuex'
import { getFullDate, getDayDateTime, getWeekDateTime, getMonthDateTime } from '@/utils/transDate'
import BackTop from '@/components/BackTop'
import Pagination from '@/components/Pagination'

export default {
  name: 'AnnouncementManagement',
  components: { EditDialog, BackTop, Pagination },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      dateEnum: Object.freeze({
        'none': 0,
        'yesterday': 1,
        'today': 2,
        'lastWeek': 3,
        'thisWeek': 4,
        'lastMonth': 5,
        'thisMonth': 6
      }),
      methodType: [],
      curDialogIndex: 0,
      searchExpand: false,
      selectOption: {
        type: [],
        marquee: []
      },
      maintainedMonthIndex: 0,
      maintainedDayIndex: 0,
      maintainedWeekIndex: 0,
      searchForm: {
        announcementedAt: [],
        maintainedAt: []
      }
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
    this.onSearchBtnClick(1)
    this.setHeaderStyle()
    this.$nextTick(() => {
      this.addSelectFilter()
    })
  },
  activated() {
    this.closeDialogEven()
    this.setHeaderStyle()
  },
  methods: {
    setHeaderStyle() {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__announcementManagement'), false, () => { }])
    },
    addSelectFilter() {
      this.addSelectDropDownFilter('option type', () => {
        this.searchForm.type = JSON.parse(JSON.stringify(this.methodType)).map(item => item.key)
      }, () => {
        this.searchForm.type = []
      }, () => {
        this.selectOption.type = JSON.parse(JSON.stringify(this.methodType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option marquee', () => {
        this.searchForm.is_marquee = JSON.parse(JSON.stringify(this.announcementMarqueeStatusType)).map(item => item.key)
      }, () => {
        this.searchForm.is_marquee = []
      }, () => {
        this.selectOption.marquee = JSON.parse(JSON.stringify(this.announcementMarqueeStatusType)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    onSearchExpand() {
      this.searchExpand = !this.searchExpand
    },
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
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
      this.selectOption.type = JSON.parse(JSON.stringify(this.methodType))
      this.selectOption.marquee = JSON.parse(JSON.stringify(this.announcementMarqueeStatusType))
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.marquee = element.is_marquee === '1' ? 'V' : 'X'
        const typeNickname = this.methodType.find(type => type.key === element.type)
        element.typeNickname = typeNickname ? typeNickname.nickname : element.type
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
    onSubmit() {
      this.setDataLoading(true)
      const data = JSON.parse(JSON.stringify(this.searchForm))
      this.handleRequest(data)
      announcementSearch(data).then((res) => {
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
      this.selectForm.is_marquee = this.announcementMarqueeStatusType[1].key
      this.selectForm.type = this.methodType[0].key
      this.selectForm.announcementedAt = []
      this.selectForm.maintainedAt = []
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__announcement')}`, true, () => {
        this.closeDialogEven()
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__announcement')}`, true, () => {
        this.closeDialogEven()
      }])
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      this.handleRequest(data)
      announcementEdit(data).then((res) => {
        this.handleRespone(res)
        this.$store.dispatch('backstageManagement/setAnnouncement', res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onDeleteBtnClick(item) {
      this.setDataLoading(true)
      announcementDelete(item.id).then((res) => {
        this.handleRespone(res)
        this.$store.dispatch('backstageManagement/setAnnouncement', res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
      this.setHeaderStyle()
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage_announcement() {
      this.$nextTick(() => {
        const parentEl = document.getElementsByClassName('announcementData')[0]
        if (parentEl) {
          const el = parentEl.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
          if (el) {
            el.click()
          }
        }
      })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage_announcement() {
      this.handleCalendarPage_announcement()
      this.addDateTimeOption(() => {
        this.monthIndex--;
        this.searchForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.monthIndex = 0;
        this.searchForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.monthIndex++;
        this.searchForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex--;
        this.searchForm.announcementedAt = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex = 0;
        this.searchForm.announcementedAt = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex++;
        this.searchForm.announcementedAt = getDayDateTime(this.dayIndex, true);
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex--;
        this.searchForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex = 0;
        this.searchForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex++;
        this.searchForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      })
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage_maintain() {
      this.$nextTick(() => {
        const parentEl = document.getElementsByClassName('maintainData')[0]
        if (parentEl) {
          const el = parentEl.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
          if (el) {
            el.click()
          }
        }
      })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage_maintain() {
      this.handleCalendarPage_maintain()
      this.addDateTimeOption(() => {
        this.maintainedMonthIndex--;
        this.searchForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedMonthIndex = 0;
        this.searchForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedMonthIndex++;
        this.searchForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex--;
        this.searchForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex = 0;
        this.searchForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex++;
        this.searchForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true);
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex--;
        this.searchForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex = 0;
        this.searchForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex++;
        this.searchForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      })
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>

.selected-filter {
  &.custom {
    border: 0;
  }
}

.view-container {
  .table-container {
    .base {
      width: 100%;
      display: flex;
      .right {
        position: relative;
        .expand {
          position: absolute;
          top: 0;
          right: 0;
          .svg-icon {
            fill: #a3a3a3;
            width: 2.5rem;
            height: 2.5rem;
          }
        }
      }
    }
    .remark {
      padding: 0 1rem;
    }
  }
}

#app.mobile {
  .search-container {
    .pl_pt {
      padding-left: 0.5rem;
      padding-top: 0.3rem;
    }
    .options {
      .option {
        &.w-4 {
          width: 14rem;
        }
      }
    }
  }
}

#app.pc {
  .day-range {
    width: auto;
  }
}
</style>
