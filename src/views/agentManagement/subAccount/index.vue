<template>
  <div>
    <el-table class="agentManagement-subAccountTable" :data="tableData" border stripe :max-height="viewHeight">
      <af-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item :label="$t('__remark')">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </af-table-column>
      <af-table-column prop="agentNickname" :label="$t('__mainAccount')" align="center" />
      <el-table-column align="center" :min-width="fullNameWidth">
        <template slot-scope="scope">
          <span class="scope-content">{{ scope.row.fullName }}</span>
          <br>
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-setting" @click="onEditBtnClick(scope.row)" />
          <el-button v-if="!isAgentSubAccount" class="iconButton" size="mini" icon="el-icon-unlock" @click="onModPasswordBtnClick(scope.row)" />
        </template>
        <template #header>
          <span>{{ $t('__subAccount') }}</span>
          <el-popover
            v-model="popover"
            placement="right"
            :visible-arrow="false"
            @show="showPopover"
          >
            <span class="fullNameSearchTitle">{{ $t('__subAccount') }}</span>
            <input ref="fullNameSearchInput" v-model="searchForm.account" :placeholder="$t('__enterKeys')" @keyup.enter.exact="onFullNameSearchBtnClick">
            <el-button class="bg-yellow" style="margin-left: 10px;" size="mini" @click="onFullNameSearchBtnClick">{{ $t("__search") }}</el-button>
            <el-button class="bg-gray" size="mini" @click="onFullNameResetBtnClick">{{ $t("__reset") }}</el-button>
            <el-button slot="reference" class="search" size="mini">
              <svg-icon class="icon" icon-class="search" />
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <af-table-column :label="$t('__accountStatus')" align="center">
        <template slot-scope="scope">
          <span :class="{'lock': scope.row.status === '0', 'enable': scope.row.status === '1'}">
            {{ scope.row.statusLabel }}
          </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('__role')" align="center" :width="100">
        <template slot-scope="scope">
          <span
            v-for="(item, index) in scope.row.rolesNickname"
            :key="index"
            :class="{'role-admin':scope.row.rolesNickname[index].key==='AgentSubAccountAdmin', 'role-visitor':scope.row.rolesNickname[index].key==='AgentSubAccount'}"
          >
            {{ item.nickname + ((index + 1 === scope.row.rolesNickname.length) ? '' : '、') }}
          </span>
        </template>
      </af-table-column>
      <af-table-column prop="creator" :label="$t('__creator')" align="center" />
      <af-table-column prop="created_at" :label="$t('__createdAt')" align="center" />
      <af-table-column prop="lastLoginAt" :label="$t('__lastLoginAt')" align="center" />
      <af-table-column prop="lastLoginIp" :label="$t('__lastLoginIP')" align="center" />
      <af-table-column v-if="!isAgentSubAccount" :label="$t('__operate')" align="center" :width="180">
        <template slot-scope="scope">
          <div class="checkboxGroup">
            <el-checkbox
              v-model="scope.row.lockLogin"
              class="red-tick agentManagement-subAccountCheckbox"
              :label="$t('__lockLogin')"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.lockLogin, scope.row)"
            />
            <el-checkbox
              v-model="scope.row.allPermission"
              class="red-tick agentManagement-subAccountCheckbox"
              :label="$t('__allPermission')"
              @mousedown.native="onOperateCheckboxClick(dialogEnum.effectAgentLine, scope.row)"
            />
          </div>
          <div>
            <el-button v-if="!scope.row.allPermission" class="bg-yellow" size="mini" @click="onSubAgentDistribute(scope.row)">{{ $t('__subAgentDistribute') }}</el-button>
          </div>
        </template>
      </af-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next, jumper, sizes"
      class="subAccount-pagination"
      :total="totalCount"
      background
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page.sync="currentPage"
      @size-change="handleSizeChangeByClient"
      @current-change="handlePageChangeByClient"
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

    <operateDialog
      ref="lockLoginDialog"
      :visible="curDialogIndex === dialogEnum.lockLogin"
      :content="$stringFormat($t('__subAccountLockLoginMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <operateDialog
      ref="effectAgentLineDialog"
      :visible="curDialogIndex === dialogEnum.effectAgentLine"
      :content="$stringFormat($t('__subAccountEffectAgentLineMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <subAgentDistributeDialog
      ref="subAgentDistributeDialog"
      :title="$t('__subAgentDistribute')"
      :visible="curDialogIndex === dialogEnum.subAgentDistribute"
      :sub-agents="subAgent"
      :confirm="$t('__confirm')"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="onSubmitSetHasAgents"
    />

    <passwordTipDialog
      :title="$t('__tip')"
      :visible="curDialogIndex === dialogEnum.passwordTip"
      :confirm="$t('__confirm')"
      :form="editForm"
      @close="closeDialogEven"
    />
  </div>
</template>

<script>
import { subAccountSearch, subAccountModPassword, subAccountModStatus, subAccountModEffectAgentLine, subAccountGetAgentLine, subAccountSetHasAgents } from '@/api/agentManagement/subAccount'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import handlePageChange from '@/layout/mixin/handlePageChange'
import handleTableWidth from '@/layout/mixin/handleTableWidth'
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
  components: { SubAccountEditDialog, ModPasswordDialog, OperateDialog, SubAgentDistributeDialog, PasswordTipDialog },
  mixins: [handlePageChange, handleTableWidth],
  props: {
    'viewHeight': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    }
  },
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
      subAgent: [],
      operateDialogMsgParameter: [],
      searchForm: {},
      popover: false
    }
  },
  computed: {
    ...mapGetters([
      'statusType',
      'roles',
      'isAgentSubAccount'
    ]),
    fullNameWidth() {
      return this.calculateWidth(this.$t('__subAccount'), 'fullName', 8, 10) + 'px'
    }
  },
  methods: {
    showPopover() {
      this.$nextTick(() => {
        this.$refs.fullNameSearchInput.focus()
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
          this.curDialogIndex = this.dialogEnum.lockLogin
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
        case this.dialogEnum.effectAgentLine: {
          this.curDialogIndex = this.dialogEnum.effectAgentLine
          this.operateDialogMsgParameter = [rowData.fullName]
          break
        }
      }
    },
    // 父物件呼叫
    async create() {
      const timezone = await timezoneSearch({})
      this.$refs.createDialog.setTimeZone(timezone)
      this.editForm = JSON.parse(JSON.stringify(defaultForm))
      this.curDialogIndex = this.dialogEnum.create
    },
    // 父物件呼叫
    onSearch(agentId) {
      this.agentInfo.id = agentId
      this.onFullNameResetBtnClick()
    },
    onFullNameSearchBtnClick() {
      this.popover = false
      this.currentPage = 1
      this.onSubmit(this.searchForm.account)
    },
    onSearchByString(str) {
      this.currentPage = 1
      this.onSubmit(str)
    },
    onFullNameResetBtnClick() {
      this.searchForm.account = ''
      this.onFullNameSearchBtnClick()
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

      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        element.fullName = `${element.nickname}(${element.account})`
        const statusNickname = this.statusType.find(type => type.key === element.status).nickname
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
      })
      this.totalCount = res.rows.length
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.$emit('serverResponse', JSON.parse(JSON.stringify(res)))
    },
    createDialogEditSuccess(res) {
      this.handleRespone(res)
      const data = JSON.parse(JSON.stringify(this.editForm))
      this.editForm = { account: data.account, password: data.password, isCreate: true }
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
      this.editForm.effectAgentLine = this.editForm.effectAgentLine === '1'
      this.editForm.isAdmin = this.editForm.isAdmin === '1'
      this.editForm.timeZone = this.editForm.timeZone.id
      this.curDialogIndex = this.dialogEnum.edit
      this.setDataLoading(false)
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
        this.editForm = { account: this.editForm.account, password: data.newPassword, isCreate: false }
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
.agentManagement-subAccountCheckbox {
  .el-checkbox__input+.el-checkbox__label {
    padding-left: 5px;
  }
}

.agentManagement-subAccountTable td .cell {
  line-height: 2em;
  padding: 0;
  margin: 0.1em;
}
</style>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.subAccount {
  &-pagination {
    padding: 1em;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
}

.scope-content {
  margin-right: 2px;
}

.role-admin {
  color: red;
  font-weight: bolder;
}

.role-visitor {
  color: blue;
  font-weight: bolder;
}

.lock {
  color: red;
  font-weight: bolder;
}

.enable {
  color:  green;
  font-weight: bolder;
}

.search {
  margin-left: 3px;
  padding: 4px;
  background-color: $yellow;
  border-color: $yellow;
  color: #000;
}

.search:focus,
.search:hover {
  color: #000;
}

.fullNameSearchTitle {
  color: $yellow;
  margin-right: 10px;
  font-weight: 400;
}

.iconButton {
  padding: 0;
  background: transparent;
  color: #000;
  -webkit-text-stroke: 0.5px $yellow;
  border: none;
  font-size: 16px;
  margin-left: 0;

  .icon {
    color: $yellow;
    margin-left: 5px;
  }
}

.labelButton {
  padding-left: 5px;
  padding-right: 5px;
}

.labelWithdrawButton {
  margin-left: 5px;
}

.agentManagement-subAccountCheckbox {
  width: 50%;
}

.checkboxGroup {
  text-align: left;
  padding-left: 10px;
}
</style>
