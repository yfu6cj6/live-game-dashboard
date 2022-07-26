<template>
  <div v-loading="dataLoading">
    <div class="view-container">
      <div>
        <div class="item">
          <span class="header">{{ $t('__agent') }}</span>
          <span>{{ agentInfo.fullName }}</span>
        </div>
        <div class="item">
          <span class="header">{{ $t('__currency') }}</span>
          <span>{{ agentInfo.currency }}</span>
        </div>
        <div class="item">
          <span class="header">{{ $t('__balance') }}</span>
          <span>{{ agentInfo.agentInfoBalance }}</span>
        </div>
        <div class="item">
          <el-button class="bg-yellow" size="mini" @click="onLimitBtnClick(agentInfo.handicaps)">
            {{ $t("_handicapLimit") }}
          </el-button>
        </div>
      </div>
    </div>

    <agent
      v-show="curTableIndex === tableEnum.agent"
      ref="agent"
      @serverResponse="handleRespone"
      @setDataLoading="setDataLoading"
    />
  </div>
</template>

<script>
import { agentTotalPlayerCount } from '@/api/agentManagement/agent'
import viewCommon from '@/mixin/viewCommon';
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import Agent from './agent/index'

export default {
  name: 'AgentManagement',
  components: { Agent },
  mixins: [viewCommon],
  data() {
    return {
      tableEnum: Object.freeze({
        'agent': 0,
        'member': 1,
        'subAccount': 2
      }),
      dialogEnum: Object.freeze({
        'none': 0,
        'limit': 1
      }),
      agentInfo: {},
      handicaps: [],
      curTableIndex: 0,
      curDialogIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType',
      'isAgentSubAccount'
    ]),
    addSubLabel() {
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          return this.$t('__addSubAgent')
        }
        case this.tableEnum.member: {
          return this.$t('__addMember')
        }
        case this.tableEnum.subAccount: {
          return this.$t('__addSubAccount')
        }
      }
      return ''
    },
    agentInfoBalance() {
      return this.agentInfo.id === 1 ? 'oo' : this.numberFormatStr(this.agentInfo.balance)
    }
  },
  mounted() {
    this.formClassName = ['agentInfoFormData', 'agentInfoForm']
    if (this.tempRoute.params?.id !== undefined) {
      this.agentInfo.id = parseInt(this.tempRoute.params.id)
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.agentId}`])
    }
    this.$nextTick(() => {
      this.onTableBtnClick(this.tableEnum.agent)
    })
  },
  methods: {
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.fullName}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    numberFormatStr(number) {
      return numberFormat(number)
    },
    setDataLoading(dataLoading) {
      this.dataLoading = dataLoading
    },
    handleRespone(res) {
      this.$store.dispatch('agentManagement/setAgentLevel', res.agentLevel)
      this.agentInfo = res.agentInfo
      this.agentInfo.currency = this.agentInfo.currency.code
      this.agentInfo.fullName = this.agentInfo.nickname + '(' + this.agentInfo.account + ')'
      this.agentInfo.accountStatus = this.accountStatusType.find(element => element.key === this.agentInfo.status).nickname
      this.agentInfo.betStatus = this.accountStatusType.find(element => element.key === this.agentInfo.bet_status).nickname
      this.agentInfo.weeklyLossSettlement = this.accountStatusType.find(element => element.key === this.agentInfo.weekly_loss_settlement).nickname
      this.agentInfo.giftStatus = this.accountStatusType.find(element => element.key === this.agentInfo.gift_status).nickname

      this.setTagsViewTitle()
      this.dataLoading = false
    },
    onLimitBtnClick(handicaps) {
      this.handicaps = JSON.parse(JSON.stringify(handicaps))
      this.curDialogIndex = this.dialogEnum.limit
    },
    onTotalPlayerBtnClick() {
      this.dataLoading = true
      agentTotalPlayerCount({ agentId: this.agentInfo.id }).then((res) => {
        this.agentInfo.totalPlayerCount = res.totalPlayerCount
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onTableBtnClick(tableEnum) {
      this.curTableIndex = tableEnum
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          this.$refs.agent.onSearch(this.agentInfo.id)
          break
        }
        case this.tableEnum.member: {
          this.$refs.member.onSearch(this.agentInfo.id)
          break
        }
        case this.tableEnum.subAccount: {
          this.$refs.subAccount.onSearch(this.agentInfo.id)
          break
        }
      }
    },
    async onAddSubBtnClick() {
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          await this.$refs.agent.create()
          break
        }
        case this.tableEnum.member: {
          await this.$refs.member.create()
          break
        }
        case this.tableEnum.subAccount: {
          await this.$refs.subAccount.create()
          break
        }
      }
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
</style>
