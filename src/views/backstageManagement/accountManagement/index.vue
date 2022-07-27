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
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.roles" multiple :collapse-tags="rolesCollapse" :placeholder="$t('__role')">
                <el-option v-for="item in roles" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agent" multiple :collapse-tags="agentCollapse" :placeholder="$t('__agentName')">
                <el-option v-for="item in agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple :collapse-tags="statusCollapse" :placeholder="$t('__accountStatus')">
                <el-option v-for="item in accountStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
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
              <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.nickname" :placeholder="$t('__nickname')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.roles" multiple filterable :collapse-tags="rolesCollapse" :placeholder="$t('__role')">
                <el-option v-for="item in roles" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.agent" multiple filterable :collapse-tags="agentCollapse" :placeholder="$t('__agentName')">
                <el-option v-for="item in agents" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__accountStatus')">
                <el-option v-for="item in accountStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
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
            <div class="content">
              <template v-if="device === 'mobile'">
                <div class="wrap" @click="remarkExpand(item)">
                  <div class="left">
                    <div class="item">
                      <span class="header">{{ $t('__account') }}</span>
                      <span>{{ item.account }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__nickname') }}</span>
                      <span>{{ item.nickname }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__role') }}</span>
                      <span v-for="(role, roleIndex) in item.rolesNickname" :key="roleIndex">{{ role }}</span>
                    </div>
                    <div class="item">
                      <div class="expand" @click.stop="remarkExpand(item)">
                        <svg-icon v-if="item.open" icon-class="up" />
                        <svg-icon v-else icon-class="more" />
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <div class="item">
                      <span class="header">{{ $t('__agentName') }}</span>
                      <span>{{ item.agentName }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__cityName') }}</span>
                      <span>{{ item.cityNameLabel }}</span>
                    </div>
                    <div class="item">
                      <span class="header">{{ $t('__accountStatus') }}</span>
                      <span class="status" :class="{'statusOpen': item.status === '1' }">
                        {{ item.statusLabel }}
                      </span>
                    </div>
                    <div class="operate">
                      <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                      <el-button class="bg-red" size="mini" @click="onPasswordResetBtnClick(item)">{{ $t("__resetPassword") }}</el-button>
                    </div>
                  </div>
                </div>
                <div v-if="item.open" class="wrap" @click="remarkExpand(item)">
                  <div class="item">
                    <span class="header">{{ $t('__remark') }}</span>
                    <span>
                      {{ item.remark }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="content">
                  <div class="wrap">
                    <div class="left">
                      <div class="item remark">
                        <el-button v-if="item.open" class="bg-normal" size="mini" icon="el-icon-arrow-down" @click="remarkExpand(item)" />
                        <el-button v-else class="bg-normal" size="mini" icon="el-icon-arrow-right" @click="remarkExpand(item)" />
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__account') }}</span>
                        <span>{{ item.account }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__nickname') }}</span>
                        <span>{{ item.nickname }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__role') }}</span>
                        <span v-for="(role, roleIndex) in item.rolesNickname" :key="roleIndex">{{ role }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__agentName') }}</span>
                        <span>{{ item.agentName }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__cityName') }}</span>
                        <span>{{ item.cityNameLabel }}</span>
                      </div>
                      <div class="item">
                        <span class="header">{{ $t('__accountStatus') }}</span>
                        <span class="status" :class="{'statusOpen': item.status === '1' }">
                          {{ item.statusLabel }}
                        </span>
                      </div>
                      <div class="operate">
                        <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(item)">{{ $t("__edit") }}</el-button>
                        <el-button class="bg-red" size="mini" @click="onPasswordResetBtnClick(item)">{{ $t("__resetPassword") }}</el-button>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.open" class="wrap">
                    <div class="item">
                      <span class="header">{{ $t('__remark') }}</span>
                      <span>
                        {{ item.remark }}
                      </span>
                    </div>
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
      ref="editDialog"
      :title="$stringFormat(`${$t('__edit')}${$t('__account')} - {0}`, [selectForm.account])"
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
  </div>
</template>

<script>
import { accountSearch, accountCreate, accountEdit, resetPassword } from '@/api/backstageManagement/accountManagement'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { mapGetters } from 'vuex'
import EditDialog from './editDialog'
import ResetPasswordDialog from './resetPasswordDialog'

const defaultForm = {
  roles: [],
  agent: []
}

export default {
  name: 'AccountManagement',
  components: { EditDialog, ResetPasswordDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
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
      timeZones: []
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
    'searchForm.roles'() {
      this.resizeHandler();
    },
    'searchForm.agent'() {
      this.resizeHandler();
    },
    'searchForm.status'() {
      this.resizeHandler();
    }
  },
  created() {
    this.searchForm = JSON.parse(JSON.stringify(defaultForm));
    this.onSearchBtnClick({}, 1);
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
      })
    },
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = "34px";
      const rolesLength = (this.searchForm.roles && this.searchForm.roles.length);
      const rolesHeight = this.rolesCollapse ? 64 : (rolesLength > 1 ? ((rolesLength - 1) * 34) : 0);
      const agentLength = (this.searchForm.agent && this.searchForm.agent.length);
      const agentHeight = this.agentCollapse ? 64 : (agentLength > 1 ? ((agentLength - 1) * 34) : 0);
      const statusLength = (this.searchForm.status && this.searchForm.status.length);
      const statusHeight = this.statusCollapse ? 64 : (statusLength > 1 ? ((statusLength - 1) * 34) : 0);
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `${(170 + rolesHeight + agentHeight + statusHeight)}px` : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `${(102 + ((rolesHeight > agentHeight) ? rolesHeight : agentHeight) + statusHeight)}px` : formHeight;
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
    handleRespone(res) {
      this.roles = res.roles
      this.agents = res.agents
      this.timeZones = res.timeZones
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
        const statusNickname = this.accountStatusType.find(statusType => statusType.key === element.status).nickname
        element.statusLabel = this.$t(statusNickname)
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.$refs.createDialog.setDialogLoading(false)
      this.$refs.editDialog.setDialogLoading(false)
      this.$refs.resetDialog.setDialogLoading(false)
      this.dataLoading = false
    },
    onSubmit() {
      this.dataLoading = true
      accountSearch(this.searchForm).then((res) => {
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
      this.selectForm = JSON.parse(JSON.stringify(defaultForm))
      this.selectForm.agentId = this.agents[0].key
      this.selectForm.status = this.accountStatusType[1].key
      this.selectForm.timeZone = this.timeZones[0].key
      this.curDialogIndex = this.dialogEnum.create
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
    },
    editDialogConfirmEven(data) {
      this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
        this.$refs.editDialog.setDialogLoading(true)
        accountEdit(data).then((res) => {
          this.handleRespone(res)
        }).catch(() => {
          this.closeLoading()
        })
      })
    },
    onPasswordResetBtnClick(item) {
      this.confirmMsg(`${this.$t('__confirmReset')}${this.$t('__account')}:${item.account} ${this.$t('__of')}${this.$t('__password')}?`, () => {
        this.selectForm = {}
        this.curDialogIndex = this.dialogEnum.reset
        this.$refs.resetDialog.setDialogLoading(true)
        resetPassword(item).then((res) => {
          this.selectForm = { account: item.account, password: res.password, isCreate: false }
          this.$refs.resetDialog.setDialogLoading(false)
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
        .content {
          display: flex;
          flex-direction: column;
          .wrap {
            .left,
            .right {
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
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
          .wrap + .wrap {
            margin-top: 10px;
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
          .content {
            display: flex;
            flex-direction: column;
            .wrap {
              .left {
                width: 100%;
                flex-direction: row;
                .remark {
                  width: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
