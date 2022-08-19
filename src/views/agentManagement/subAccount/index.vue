<template>
  <div>
    <div class="agent-list">
      <div v-show="tableData.length > 0">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="list-row"
        >
          <div class="force-wrap" />
          <div class="list-item index">
            <span class="value">{{ index + 1 }}</span>
          </div>
          <div class="list-item" style="width: 70%;">
            <span class="value" style="display: flex; word-break: break-all; padding-bottom: 0.75rem;">
              <div class="fas gray-deep">
                <svg-icon icon-class="user" style="height: 1.25rem;width: 1.25rem;" />
              </div>
              <span>
                <div class="item-inner">
                  <div class="text-link text-golden pl-1 pb-1">{{ item.account }}</div>
                  <div class="tag-name">{{ `(${$t('__nickname')} : ${item.nickname})` }}</div>
                </div>
              </span>
            </span>
          </div>
          <div class="list-item state" style="width: auto; margin-left: auto;">
            <span class="value">
              <span>
                <div class="item-inner">
                  <span class="fas">
                    <svg-icon icon-class="enable" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}" style="height: 1rem;width: 1rem;" />
                  </span>
                </div>
                <div class="item-inner mt-2" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}">
                  {{ item.statusLabel }}
                </div>
              </span>
            </span>
          </div>
          <div class="force-wrap" />
          <div class="list-item" style="width: 50%; margin-left: 2.5rem; display: flex; align-items: center;">
            <span class="value" style="display: flex; align-items: center;">
              <div class="fas gray-deep pb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 63 63"
                  style="height: 1.08333rem; width: 1.08333rem;"
                >
                  <title>ppl</title>
                  <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                  <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                  <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                  <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                </svg>
              </div>
              <span>
                <span class="ml-1">{{ `${$t('__role')} : ` }}</span>
                <span
                  v-for="(rolesItem, rolesIndex) in item.rolesNickname"
                  :key="rolesIndex"
                >
                  <span :class="{'text-blue': rolesItem.key==='AgentSubAccount', 'text-red': rolesItem.key==='AgentSubAccountAdmin'}">
                    {{ rolesItem.nickname }}
                  </span>
                  <span>{{ (((rolesIndex + 1) === item.rolesNickname.length) ? '' : '、') }}</span>
                </span>
              </span>
            </span>
          </div>
          <div class="list-item ctrl">
            <div class="item-inner">
              <div v-show="!item.open" @click.stop="remarkExpand(item)">
                <svg-icon class="fas gray-deep" icon-class="more" style="height: 2rem;width: 2rem;" />
              </div>
              <div v-show="item.open" @click.stop="remarkExpand(item)">
                <svg-icon class="fas gray-deep" icon-class="up" style="height: 2rem;width: 2rem;" />
              </div>
            </div>
          </div>
          <div class="force-wrap" />
          <div v-if="item.open" class="agent-list-detail">
            <!-- <div class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <span class="value">
                <span class="solid-circle">
                  <div class="fas">
                    <svg-icon icon-class="top" class="text-black" style="height: 1.5rem;width: 1.5rem;" />
                  </div>
                </span>
              </span>
            </div> -->
            <!-- <div class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <span class="value">
                <span>
                  <span class="v-line d-block" />
                </span>
              </span>
            </div> -->
            <div v-if="!item.allPermission" class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-left: 0.5rem; margin-right: 0.5rem; margin-bottom: 0.5rem;" @click.stop="onSubAgentDistribute(item)">
              <span class="value">
                <button class="el-button bg-yellow el-button--default">
                  <span>{{ $t('__subAgentDistribute') }}</span>
                </button>
              </span>
            </div>
            <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem; align-self: center; margin-right: 2.5rem; margin-left: auto;" @click.stop="onModPasswordBtnClick(item)">
              <span class="value">
                <span class="key">
                  <div class="fas yellow">
                    <img src="@/assets/agentManagement/key.png" style="height: 1.83333rem; width: 1.83333rem;">
                  </div>
                </span>
              </span>
            </div>
            <div v-if="!isAgentSubAccount" class="list-item" style="width: auto; flex-wrap: wrap; margin-left: 0.5rem; margin-bottom: 0.5rem; align-self: center;" @click.stop="onEditBtnClick(item)">
              <span class="value">
                <span class="edit">
                  <div class="fas yellow">
                    <img src="@/assets/agentManagement/settings.png" style="height: 2rem; width: 2rem;">
                  </div>
                </span>
              </span>
            </div>
            <div class="list-item" style="width: 100%; margin-top: 1rem;">
              <span class="label" style="width: 50%;">{{ $t('__nickname') }}</span>
              <span class="value" style="width: 50%;">{{ item.nickname }}</span>
            </div>
            <div class="list-item" style="width: 100%; margin-top: 1rem;">
              <span class="label" style="width: 50%;">{{ $t('__lastLoginAt') }}</span>
              <span class="value" style="width: 50%;">{{ item.lastLoginAt }}</span>
            </div>
            <div class="list-item" style="width: 100%; margin-top: 1rem; align-items: center;">
              <span class="label" style="width: 50%;">{{ $t('__lastLoginIP') }}</span>
              <span class="value" style="width: 50%;">
                <div class="ip-detail">
                  <div class="text-yellow _item">
                    <div>{{ item.lastLoginIp }}</div>
                  </div>
                </div>
              </span>
            </div>
            <div class="list-item" style="width: 100%; margin-top: 1rem;">
              <span class="label" style="width: 50%;">{{ $t('__createdAt') }}</span>
              <span class="value" style="width: 50%;">{{ item.created_at }}</span>
            </div>
            <div class="list-item" style="width: 100%; margin-top: 1rem;">
              <span class="label" style="width: 50%;">{{ $t('__creator') }}</span>
              <span class="value" style="width: 50%;">{{ item.creator }}</span>
            </div>
            <div class="list-item flex-column" style="width: 100%; margin-top: 1rem; line-height: 1.2;">
              <span class="label" style="width: 100%;">{{ $t('__remark') }}</span>
              <span class="value" style="width: 100%;">{{ item.remark }}</span>
            </div>
            <div v-if="!isAgentSubAccount" class="list-item" style="width: 50%; margin-top: 1rem;">
              <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.lockLogin, item)">
                <span class="el-checkbox red-tick">
                  <span class="el-checkbox__input" :class="{'is-checked': item.lockLogin}">
                    <span class="el-checkbox__inner" />
                  </span>
                </span>
                <span class="label">{{ $t('__lockLogin') }}</span>
              </span>
            </div>
            <div v-if="!isAgentSubAccount" class="list-item" style="width: 50%; margin-top: 1rem;">
              <span class="value" @click.stop="onOperateCheckboxClick(dialogEnum.effectAgentLine, item)">
                <span class="el-checkbox green-tick">
                  <span class="el-checkbox__input" :class="{'is-checked': item.allPermission}">
                    <span class="el-checkbox__inner" />
                  </span>
                </span>
                <span class="label">{{ $t('__allPermission') }}</span>
              </span>
            </div>
          </div>
        </div>
        <div v-if="totalCount > pageSize" class="text-center p-3">
          <div v-if="tableData.length >= totalCount">
            <span>{{ $t("__noMoreInformation") }}</span>
          </div>
          <div v-else>
            <span class="view-more border-bottom border-dark mb-1" @click="moreInfoByClient">{{ $t('__searchMoreValue') }}</span>
          </div>
        </div>
      </div>
      <div v-show="tableData.length <= 0">
        <div class="noInformation">
          <span>{{ `${$t('__noHave')}${$t('__subAccount')}` }}</span>
        </div>
      </div>
    </div>
    <operateDialog
      ref="lockLoginDialog"
      :visible="curDialogIndex === dialogEnum.lockLogin"
      :title="$t('__subAccountLockLoginMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="effectAgentLineDialog"
      :visible="curDialogIndex === dialogEnum.effectAgentLine"
      :title="$t('__subAccountEffectAgentLineMsg')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <subAgentDistributeDialog
      ref="subAgentDistributeDialog"
      :title="`${$t('__subAgentDistribute')} ${editForm.fullName}`"
      :visible="curDialogIndex === dialogEnum.subAgentDistribute"
      :sub-agents="subAgent"
      :confirm="$t('__confirm')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="onSubmitSetHasAgents"
    />

    <modPasswordDialog
      ref="modPasswordDialog"
      :title="$t('__modPassword')"
      :visible="curDialogIndex === dialogEnum.modPassword"
      :confirm="$t('__revise')"
      :name-label="`${$t('__subAccount')}: `"
      :form="editForm"
      @close="closeDialogEven"
      @modPassword="modPassword"
    />

    <passwordTipDialog
      :title="$t('__tip')"
      :visible="curDialogIndex === dialogEnum.passwordTip"
      :confirm="$t('__confirm')"
      :form="editForm"
      @close="closeDialogEven"
    />

    <subAccountEditDialog
      ref="createDialog"
      :title="$t('__addSubAccount')"
      :visible="curDialogIndex === dialogEnum.create"
      :operation-type="1"
      :confirm="$t('__confirm')"
      :agent-info="agentInfo"
      :form="editForm"
      @close="closeDialogEven"
      @editSuccess="createDialogEditSuccess"
    />

    <subAccountEditDialog
      ref="editDialog"
      :title="$t('__editSubAccount')"
      :visible="curDialogIndex === dialogEnum.edit"
      :operation-type="2"
      :confirm="$t('__revise')"
      :agent-info="agentInfo"
      :form="editForm"
      @close="closeDialogEven"
      @editSuccess="handleRespone"
    />

  </div>
</template>

<script>
import { subAccountSearch, subAccountModPassword, subAccountModStatus, subAccountModEffectAgentLine, subAccountGetAgentLine, subAccountSetHasAgents } from '@/api/agentManagement/subAccount'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import handlePageChange from '@/mixin/handlePageChange'
import SubAccountEditDialog from './subAccountEditDialog'
import SubAgentDistributeDialog from './subAgentDistributeDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import OperateDialog from '@/views/agentManagement/operateDialog'
import PasswordTipDialog from '@/views/agentManagement/passwordTipDialog'
import { mapGetters } from 'vuex'

const defaultForm = {
  account: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  status: '1',
  timeZone: 1,
  effectAgentLine: false,
  isAdmin: false,
  remark: '',
  userPassword: ''
}

export default {
  name: 'Member',
  components: { SubAccountEditDialog, OperateDialog, SubAgentDistributeDialog, ModPasswordDialog, PasswordTipDialog },
  mixins: [handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2,
        'modPassword': 3,
        'lockLogin': 7,
        'effectAgentLine': 8,
        'subAgentDistribute': 9,
        'passwordTip': 10
      }),
      agentInfo: {},
      editForm: {},
      curDialogIndex: 0,
      subAgent: []
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType',
      'roles',
      'isAgentSubAccount'
    ])
  },
  methods: {
    remarkExpand(row) {
      const obj = this.tableData.find(item => item.id === row.id);
      this.$nextTick(() => {
        obj.open = !obj.open;
        this.tableData = Object.assign([], this.tableData)
      })
    },
    onSubmitSetHasAgents(data) {
      this.$refs.subAgentDistributeDialog.setDialogLoading(true)
      subAccountSetHasAgents(data).then((res) => {
        this.handleRespone(res)
        this.$refs.subAgentDistributeDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.subAgentDistributeDialog.setDialogLoading(false)
      })
    },
    onSubAgentDistribute(rowData) {
      this.curDialogIndex = this.dialogEnum.subAgentDistribute
      this.editForm = JSON.parse(JSON.stringify(rowData))
      const searchData = {
        agentId: this.agentInfo.id,
        subAccountId: rowData.id
      }
      this.$refs.subAgentDistributeDialog.setDialogLoading(true)
      subAccountGetAgentLine(searchData).then((res) => {
        this.subAgent = res.rows
        this.$nextTick(() => {
          this.$refs.subAgentDistributeDialog.setData(res.boundAgents)
          this.$refs.subAgentDistributeDialog.setDialogLoading(false)
        })
      }).catch(() => {
        this.$refs.subAgentDistributeDialog.setDialogLoading(false)
      })
    },
    operateSubmit(data) {
      switch (this.curDialogIndex) {
        case this.dialogEnum.lockLogin: {
          this.$refs.lockLoginDialog.setDialogLoading(true)
          subAccountModStatus(data).then((res) => {
            this.handleRespone(res)
            this.$refs.lockLoginDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.lockLoginDialog.setDialogLoading(false)
          })
          break
        }
        case this.dialogEnum.effectAgentLine: {
          this.$refs.effectAgentLineDialog.setDialogLoading(true)
          subAccountModEffectAgentLine(data).then((res) => {
            this.handleRespone(res)
            this.$refs.effectAgentLineDialog.setDialogLoading(false)
          }).catch(() => {
            this.$refs.effectAgentLineDialog.setDialogLoading(false)
          })
          break
        }
      }
    },
    onOperateCheckboxClick(operateType, rowData) {
      this.editForm = JSON.parse(JSON.stringify(rowData))
      switch (operateType) {
        case this.dialogEnum.lockLogin: {
          if (this.isAgentSubAccount) return
          this.curDialogIndex = this.dialogEnum.lockLogin
          break
        }
        case this.dialogEnum.effectAgentLine: {
          if (this.isAgentSubAccount) return
          this.curDialogIndex = this.dialogEnum.effectAgentLine
          break
        }
      }
    },
    // 父物件呼叫
    async create() {
      const timezone = await timezoneSearch({})
      this.$refs.createDialog.setTimeZone(timezone)
      this.editForm = JSON.parse(JSON.stringify(defaultForm))
      this.editForm.effectAgentLine = this.editForm.effectAgentLine ? '1' : '0'
      this.editForm.isAdmin = this.editForm.isAdmin ? '1' : '0'
      this.curDialogIndex = this.dialogEnum.create
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__addSubAgent'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
      }])
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.agentInfo.id = agentId
      this.onSubmit('')
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
    },
    onSearchByString(str) {
      this.pageSizeCount = 1
      this.currentPage = 1
      this.onSubmit(str)
    },
    onSubmit(accountKeyWord) {
      this.setDataLoading(true)
      subAccountSearch({ agentId: this.agentInfo.id, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    handleRespone(res) {
      this.agentInfo = res.agentInfo
      this.agentInfo.fullName = `${this.agentInfo.nickname}(${this.agentInfo.account})`

      const open = this.tableData.filter(item => item.open).map(item => item.id)
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.fullName = `${element.nickname}(${element.account})`
        const statusNickname = this.accountStatusType.find(type => type.key === element.status).nickname
        element.statusLabel = this.$t(statusNickname)
        element.agentNickname = element.agent.nickname
        element.rolesNickname = []
        element.roles.forEach(role => {
          const roleObj = this.roles.find(item => item.key === role)
          if (roleObj) {
            element.rolesNickname.push({ key: role, nickname: this.$t(roleObj.nickname) })
          }
        })
        element.lockLogin = element.status === '0'
        element.allPermission = element.effectAgentLine === '1'
        element.open = open.includes(element.id)
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.$emit('serverResponse', JSON.parse(JSON.stringify(res)))
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      this.editForm = { accountsInfo: res.accountsInfo, backendUrl: res.backendUrl, isCreate: true }
      this.curDialogIndex = this.dialogEnum.passwordTip
    },
    setDataLoading(dataLoading) {
      this.$emit('setDataLoading', dataLoading)
    },
    async onEditBtnClick(rowData) {
      this.setDataLoading(true)
      const timezone = await timezoneSearch({})
      this.$refs.editDialog.setTimeZone(timezone)

      this.editForm = JSON.parse(JSON.stringify(rowData))
      // this.editForm.effectAgentLine = this.editForm.effectAgentLine === '1'
      // this.editForm.isAdmin = this.editForm.isAdmin === '1'
      this.editForm.timeZone = this.editForm.timeZone.id
      this.curDialogIndex = this.dialogEnum.edit
      this.setDataLoading(false)
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__editSubAccount'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
      }])
    },
    onModPasswordBtnClick(rowData) {
      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.curDialogIndex = this.dialogEnum.modPassword
    },
    modPassword(data) {
      this.$refs.modPasswordDialog.setDialogLoading(true)
      subAccountModPassword(data).then((res) => {
        this.handleRespone(res)
        this.$refs.modPasswordDialog.setDialogLoading(false)
        this.editForm = { accountsInfo: [{ account: this.editForm.account, password: data.newPassword }], isCreate: false }
        this.curDialogIndex = this.dialogEnum.passwordTip
      }).catch(() => {
        this.$refs.modPasswordDialog.setDialogLoading(false)
      })
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss">
.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0,0,0,0.5);
  z-index: 3;
}
.noInformation {
  margin-top: 1rem;
  text-align: center;
}
</style>
