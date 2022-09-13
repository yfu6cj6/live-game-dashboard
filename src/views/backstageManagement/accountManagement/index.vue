<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="view-container">
        <div class="bg-black">
          <div class="yellow-border-bottom search-container">
            <div class="options">
              <div class="option">
                <el-input v-model="searchForm.account" type="text" class="input_size" :placeholder="$t('__account')" />
              </div>
              <div class="option">
                <el-input v-model="searchForm.nickname" type="text" class="input_size" :placeholder="$t('__nickname')" />
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
                <div class="option roles">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.roles"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="rolesCollapse"
                      :placeholder="$t('__role')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.roles"
                        :key="item.key"
                        :label="item.nickname"
                        :value="item.key"
                      />
                    </el-select>
                  </div>
                  <span class="suffix-label" />
                </div>
                <div class="option agents">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.agent"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="agentCollapse"
                      :placeholder="$t('__agentName')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.agent"
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
                <div class="option status">
                  <span class="prefix-label" />
                  <div class="comp selected-filter custom">
                    <el-select
                      v-model="searchForm.status"
                      class="d-flex"
                      multiple
                      :popper-append-to-body="false"
                      :collapse-tags="statusCollapse"
                      :placeholder="$t('__accountStatus')"
                      :popper-class="'custom-dropdown w-auto'"
                    >
                      <el-option
                        v-for="item in selectOption.status"
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
                <div class="left">
                  <div class="item">
                    <span class="title">{{ $t('__account') }}</span>
                    <span class="value">{{ item.account }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__nickname') }}</span>
                    <span class="value">{{ item.nickname }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__role') }}</span>
                    <span v-for="(role, roleIndex) in item.rolesNickname" :key="roleIndex" class="value">{{ role }}</span>
                  </div>
                </div>
                <div class="right">
                  <div class="item">
                    <span class="title">{{ $t('__agentName') }}</span>
                    <span class="value">{{ item.agentName }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__cityName') }}</span>
                    <span class="value">{{ item.cityNameLabel }}</span>
                  </div>
                  <div class="item">
                    <span class="title">{{ $t('__accountStatus') }}</span>
                    <span class="value">{{ item.statusLabel }}</span>
                  </div>
                  <div class="operate">
                    <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__revise") }}</el-button>
                    <el-button class="bg-red" size="mini" @click="onPasswordResetBtnClick(item)">{{ $t("__resetPassword") }}</el-button>
                  </div>
                  <div class="item">
                    <div class="expand" @click.stop="remarkExpand(item)">
                      <svg-icon v-if="item.open" icon-class="up" style="height: 2rem; width: 2rem;" />
                      <svg-icon v-else icon-class="more" style="height: 2rem; width: 2rem;" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.open">
                <div class="item remark">
                  <span class="title">{{ $t('__remark') }}</span>
                  <span class="value">{{ item.remark }}</span>
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
        :title="$stringFormat(`${$t('__revise')}${$t('__account')} - {0}`, [selectForm.account])"
        :visible="curDialogIndex === dialogEnum.edit"
        :confirm="$t('__revise')"
        :form="selectForm"
        :roles="roles"
        :agents="agents"
        :account-status-type="accountStatusType"
        :time-zones="timeZones"
        :has-password="false"
        @close="closeDialogEven"
        @confirm="editDialogConfirmEven"
      />

      <editDialog
        ref="createDialog"
        :title="`${$t('__create')}${$t('__account')}`"
        :visible="curDialogIndex === dialogEnum.create"
        :confirm="$t('__confirm')"
        :form="selectForm"
        :roles="roles"
        :agents="agents"
        :account-status-type="accountStatusType"
        :time-zones="timeZones"
        :has-password="true"
        @close="closeDialogEven"
        @confirm="createDialogConfirmEven"
      />

      <resetPasswordDialog
        ref="resetDialog"
        :title="$t('__tip')"
        :visible="curDialogIndex === dialogEnum.reset"
        :confirm="$t('__confirm')"
        :form="selectForm"
        @close="closeDialogEven"
      />
    </template>
    <template v-else>
      -
    </template>
  </div>
</template>

<script>
import { accountSearch, accountCreate, accountEdit, resetPassword } from '@/api/backstageManagement/accountManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import { mapGetters } from 'vuex'
import EditDialog from './editDialog'
import ResetPasswordDialog from './resetPasswordDialog'

const defaultForm = {
  roles: [],
  agent: [],
  status: []
}

export default {
  name: 'AccountManagement',
  components: { EditDialog, ResetPasswordDialog },
  mixins: [common, viewCommon, handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'reset': 3
      }),
      curDialogIndex: 0,
      roles: [],
      agents: [],
      timeZones: [],
      searchExpand: false,
      selectOption: JSON.parse(JSON.stringify(defaultForm))
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType'
    ]),
    rolesCollapse() {
      return this.searchForm.roles && this.searchForm.roles.length > this.selectCollapseCount
    },
    agentCollapse() {
      return this.searchForm.agent && this.searchForm.agent.length > this.selectCollapseCount
    },
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    }
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      this.pageSizeCount = 1
      this.searchForm = JSON.parse(JSON.stringify(defaultForm));
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__accountManagement'), false, () => { }])
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
    addSelectFilter() {
      this.addSelectDropDownFilter('option roles', () => {
        this.searchForm.roles = JSON.parse(JSON.stringify(this.roles)).map(item => item.key)
      }, () => {
        this.searchForm.roles = []
      }, () => {
        this.selectOption.roles = JSON.parse(JSON.stringify(this.roles)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option agents', () => {
        this.searchForm.agent = JSON.parse(JSON.stringify(this.agents)).map(item => item.key)
      }, () => {
        this.searchForm.agent = []
      }, () => {
        this.selectOption.agent = JSON.parse(JSON.stringify(this.agents)).filter(item => item.nickname.match(new RegExp(`${event.target.value}`, 'i')))
      })
      this.addSelectDropDownFilter('option status', () => {
        this.searchForm.status = JSON.parse(JSON.stringify(this.accountStatusType)).map(item => item.key)
      }, () => {
        this.searchForm.status = []
      }, () => {
        this.selectOption.status = JSON.parse(JSON.stringify(this.accountStatusType)).filter(item => this.$t(item.nickname).match(new RegExp(`${event.target.value}`, 'i')))
      })
    },
    handleRespone(res) {
      this.roles = JSON.parse(JSON.stringify(res.roles))
      this.agents = JSON.parse(JSON.stringify(res.agents))
      this.selectOption.roles = JSON.parse(JSON.stringify(res.roles))
      this.selectOption.agent = JSON.parse(JSON.stringify(res.agents))
      this.selectOption.status = JSON.parse(JSON.stringify(this.accountStatusType))
      this.timeZones = res.timeZones

      const open = this.tableData.filter(item => item.open).map(item => item.id)
      res.rows.forEach(element => {
        element.open = open.includes(element.id)
      })
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.rolesNickname = []
        element.cityNameLabel = element.time_zone.cityName
        element.roles.forEach(elRole => {
          const roleObj = this.roles.find((role) => elRole === role.key)
          if (roleObj) {
            element.rolesNickname.push(roleObj.nickname)
          }
        })
        const statusNickname = this.accountStatusType.find(statusType => statusType.key === element.status.toString()).nickname
        element.statusLabel = this.$t(statusNickname)
      })
      this.totalCount = this.allDataByClient.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.$refs.resetDialog.setDialogLoading(false)
      this.setDataLoading(false)
    },
    onSubmit() {
      this.setDataLoading(true)
      accountSearch(this.searchForm).then((res) => {
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
      this.selectForm = JSON.parse(JSON.stringify(defaultForm))
      this.selectForm.agentId = this.agents[0].key
      this.selectForm.status = this.accountStatusType[1].key
      this.selectForm.timeZone = this.timeZones[0].key
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__create')}${this.$t('__account')}`, true, () => {
        this.closeDialogEven()
      }])
    },
    createDialogConfirmEven(data) {
      this.$refs.createDialog.setDialogLoading(true)
      accountCreate(data).then((res) => {
        this.handleRespone(res)
        this.selectForm = { account: data.account, password: data.password, isCreate: true }
        this.curDialogIndex = this.dialogEnum.reset
      }).catch(() => {
        this.closeLoading()
      })
    },
    onEditBtnClick(item) {
      this.selectForm = JSON.parse(JSON.stringify(item))
      this.selectForm.agentId = this.selectForm.agent_id
      this.selectForm.timeZone = this.selectForm.time_zone.key
      this.curDialogIndex = this.dialogEnum.edit
      this.$store.dispatch('common/setHeaderStyle', [`${this.$t('__revise')}${this.$t('__account')}`, true, () => {
        this.closeDialogEven()
      }])
    },
    editDialogConfirmEven(data) {
      this.$refs.editDialog.setDialogLoading(true)
      accountEdit(data).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    onPasswordResetBtnClick(item) {
      this.selectForm = {}
      this.curDialogIndex = this.dialogEnum.reset
      this.$refs.resetDialog.setDialogLoading(true)
      resetPassword(item).then((res) => {
        this.selectForm = { account: item.account, password: res.password, isCreate: false }
        this.$refs.resetDialog.setDialogLoading(false)
      }).catch(() => {
        this.closeLoading()
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__accountManagement'), false, () => { }])
    },
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
