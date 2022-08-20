<template>
  <div v-loading="dataLoading" class="agent flex-column flex-fill">
    <div class="agent-container bg-white flex-column flex-fill tree-close">
      <div class="agent-container-inner flex-column flex-fill">
        <div class="agent-content flex-column flex-fill">
          <div class="scroll-wrap flex-column flex-fill">
            <div class="scroll-inner flex-column flex-fill off">
              <div class="scroll-view flex-column flex-fill">
                <div class="agent-summary">
                  <div class="floatNav">
                    <div class="fas ml-auto gray-deep">
                      <svg id="圖層_1" data-name="圖層 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 63" style="height: 1.83333rem; width: 1.83333rem;"><title>tree</title><rect y="2.49" width="31.87" height="15.94" /><rect x="37.1" y="23.65" width="25.9" height="8.96" /><rect x="34.11" y="9.71" width="1.99" height="36.85" transform="translate(6.97 63.25) rotate(-90)" /><rect x="37.1" y="37.6" width="25.9" height="8.96" /><rect x="34.11" y="23.65" width="1.99" height="36.85" transform="translate(-6.97 77.19) rotate(-90)" /><rect x="37.1" y="51.55" width="25.9" height="8.96" /><rect x="32.12" y="37.6" width="1.99" height="36.85" transform="translate(-22.91 89.15) rotate(-90)" /><rect x="14.69" y="18.42" width="2.49" height="36.85" transform="translate(31.87 73.7) rotate(180)" /></svg>
                    </div>
                  </div>
                  <div id="agentInfo">
                    <div class="breadcrumb-container">
                      <div id="breadcrumb">
                        <div v-if="agentInfo.parent && agentInfo.parent.nickname !== ''" class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-ios">
                          <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                            <div class="swiper-slide" style="margin-right: 10px;">
                              <router-link :to="`/agentManagement/agentManagement/${agentInfo.parent.id}`">
                                <span class="text-underline text-gray">{{ agentInfo.parent.nickname }}</span>
                              </router-link>
                              <span class="breadcrumb-separator">/</span>
                            </div>
                            <div class="swiper-slide" style="margin-right: 10px;">
                              <span class="active">{{ agentInfo.account }}</span>
                            </div>
                          </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-wrap">
                      <div class="info-item">
                        <label>{{ `${$t('__agent')}: ` }}</label>
                        <span>
                          <span>{{ agentInfo.account }}</span>
                          <span>{{ `[${$t('__agent')}]` }}</span>
                        </span>
                      </div>
                      <div class="info-item">
                        <label>{{ `${$t('__balance')}:` }}</label>
                        <span>{{ agentInfo.balance }}</span>
                      </div>
                      <div class="info-item">
                        <label>{{ `${$t('__currency')}:` }}</label>
                        <span>{{ agentInfo.currency }}</span>
                      </div>
                    </div>
                    <div class="animate-box">
                      <div v-if="agentInfo.open" class="d-flex flex-wrap">
                        <div class="info-item">
                          <label>{{ `${$t('__rate')}: ` }}</label>
                          <span>{{ `${agentInfo.live_commission_rate}% ` }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__rollingRate')}: ` }}</label>
                          <span>{{ `${agentInfo.live_rolling_rate}% ` }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__accountStatus')}: ` }}</label>
                          <span :class="{'text-success':agentInfo.status === '1', 'text-danger':agentInfo.status !== '1'}">{{ $t(agentInfo.accountStatus) }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__betStatus')}: ` }}</label>
                          <span :class="{'text-success':agentInfo.bet_status === '1', 'text-danger':agentInfo.bet_status !== '1'}">{{ $t(agentInfo.betStatus) }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__weeklyLossSettlement')}: ` }}</label>
                          <span :class="{'text-success':agentInfo.weekly_loss_settlement === '1', 'text-danger':agentInfo.weekly_loss_settlement !== '1'}">{{ $t(agentInfo.weeklyLossSettlement) }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__giftEffect')}: ` }}</label>
                          <span :class="{'text-success':agentInfo.gift_status === '1', 'text-danger':agentInfo.gift_status !== '1'}">{{ $t(agentInfo.giftStatus) }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__directAgentCount')}: ` }}</label>
                          <span>{{ agentInfo.directAgentCount }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__directPlayerCount')}: ` }}</label>
                          <span>{{ agentInfo.directPlayerCount }}</span>
                        </div>
                        <div class="info-item" style="height: 0px;">
                          <button class="el-button bg-yellow el-button--default" style="margin-top: -1rem;" @click.stop="onTotalPlayerBtnClick()">{{ `${$t('__totalPlayerCount')}: ` }} {{ agentInfo.totalPlayerCount }}</button>
                        </div>
                        <div class="info-item info-item d-flex">
                          <label>{{ `${$t('__handicapLimit')}: ` }}</label>
                          <span class="value handicap text-yellow text-link" @click.stop="onLimitBtnClick()">
                            <span class="h-t">{{ agentInfo.handicaps_info }}</span>
                          </span>
                          <span class="ml-2">
                            <div class="fas yellow">
                              <img src="@/assets/agentManagement/updown.png" alt="" style="height: 1.16667rem; width: 1.16667rem;">
                            </div>
                          </span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__createdAt')}: ` }}</label>
                          <span>{{ agentInfo.created_at }}</span>
                        </div>
                        <div class="info-item">
                          <label>{{ `${$t('__lastLoginAt')}: ` }}</label>
                          <span>{{ agentInfo.lastLoginAt }}</span>
                        </div>
                        <div class="info-item">
                          <router-link :to="`/winLossReport/winLossReport/${agentInfo.id}`">
                            <button class="el-button bg-yellow el-button--default">{{ $t('__winLossReport') }}</button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex expand-outter">
                      <div class="fas ml-auto icon-expand gray-deep" :class="{'d-none': agentInfo.open}" @click.stop="expandAgentInfo">
                        <svg-icon icon-class="more" style="height: 2rem; width: 2rem;" />
                      </div>
                      <div class="fas ml-auto icon-expand gray-deep" :class="{'d-none': !agentInfo.open}" @click.stop="expandAgentInfo">
                        <svg-icon icon-class="up" style="height: 2rem; width: 2rem;" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-100">
                  <div class="el-tab-pane">
                    <div class="list-container">
                      <div class="common-list">
                        <div class="agent-page-bar-container">
                          <div class="agent-page-tab deep el-tabs">
                            <div class="el-tabs__header">
                              <div class="swiper-container el-tabs__nav w-100 swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-ios">
                                <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
                                  <div class="swiper-slide">
                                    <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.agent, 'clickable': curTableIndex !== tableEnum.agent}" @click.stop="onTableBtnClick(tableEnum.agent, searchString.agent)">
                                      <div class="tab-item strong">{{ $t('__agent') }}</div>
                                    </div>
                                  </div>
                                  <div class="swiper-slide">
                                    <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.member, 'clickable': curTableIndex !== tableEnum.member}" @click.stop="onTableBtnClick(tableEnum.member, searchString.member)">
                                      <div class="tab-item strong">{{ $t('__member') }}</div>
                                    </div>
                                  </div>
                                  <div class="swiper-slide">
                                    <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.subAccount, 'clickable': curTableIndex !== tableEnum.subAccount}" @click.stop="onTableBtnClick(tableEnum.subAccount, searchString.subAccount)">
                                      <div class="tab-item strong">{{ $t('__subAccount') }}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="clearfix" />
                          </div>
                          <div class="filter-container pb-0">
                            <form>
                              <div class="flex-wrap filter-wrap el-row el-row--flex">
                                <div v-if="!isAgentSubAccount" class="filter-item add-agent" @click.stop="onAddSubBtnClick()">
                                  <div>
                                    <svg-icon class="icon fas yellow" icon-class="add" style="height: 2rem; width: 2rem;" />
                                  </div>
                                </div>
                                <template v-if="curTableIndex === tableEnum.agent">
                                  <div class="filter-item search">
                                    <div class="comp d-flex search-filter">
                                      <input v-model="searchString.agent" class="el-input">
                                    </div>
                                  </div>
                                  <div class="filter-item button">
                                    <button type="button" class="el-button el-button--default" @click.stop="onTableBtnClick(tableEnum.agent, searchString.agent)">
                                      <span>
                                        <div class="black">
                                          <svg-icon icon-class="search" style="height: 1.5rem; width: 1.5rem;" />
                                        </div>
                                      </span>
                                    </button>
                                  </div>
                                </template>
                                <template v-if="curTableIndex === tableEnum.member">
                                  <div class="filter-item search">
                                    <div class="comp d-flex search-filter">
                                      <input v-model="searchString.member" class="el-input">
                                    </div>
                                  </div>
                                  <div class="filter-item button">
                                    <button type="button" class="el-button el-button--default" @click.stop="onTableBtnClick(tableEnum.member, searchString.member)">
                                      <span>
                                        <div class="black">
                                          <svg-icon icon-class="search" style="height: 1.5rem; width: 1.5rem;" />
                                        </div>
                                      </span>
                                    </button>
                                  </div>
                                </template>
                                <template v-if="curTableIndex === tableEnum.subAccount">
                                  <div class="filter-item search">
                                    <div class="comp d-flex search-filter">
                                      <input v-model="searchString.subAccount" class="el-input">
                                    </div>
                                  </div>
                                  <div class="filter-item button">
                                    <button type="button" class="el-button el-button--default" @click.stop="onTableBtnClick(tableEnum.subAccount, searchString.subAccount)">
                                      <span>
                                        <div class="black">
                                          <svg-icon icon-class="search" style="height: 1.5rem; width: 1.5rem;" />
                                        </div>
                                      </span>
                                    </button>
                                  </div>
                                </template>
                              </div>
                            </form>
                            <!-- <div /> 彈跳飾窗 -->
                          </div>
                          <!-- <div class="filter-sort-wrap">
                          </div> -->
                        </div>
                        <agent
                          v-show="curTableIndex === tableEnum.agent"
                          ref="agent"
                          @serverResponse="handleRespone"
                          @setDataLoading="setDataLoading"
                        />
                        <member
                          v-show="curTableIndex === tableEnum.member"
                          ref="member"
                          @serverResponse="handleRespone"
                          @setDataLoading="setDataLoading"
                        />

                        <subAccount
                          v-show="curTableIndex === tableEnum.subAccount"
                          ref="subAccount"
                          @serverResponse="handleRespone"
                          @setDataLoading="setDataLoading"
                        />

                        <limitDialog
                          :title="$t('__handicapLimit')"
                          :visible="curDialogIndex === dialogEnum.limit"
                          :form="agentInfo"
                          :agent-name="account"
                          @close="closeDialogEven"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style="display: none;" />
                <div style="display: none;" />
                <div style="display: none;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { agentTotalPlayerCount, agentSearch } from '@/api/agentManagement/agent'
import { agentTotalPlayerCount } from '@/api/agentManagement/agent'
import viewCommon from '@/mixin/viewCommon';
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import Agent from './agent/index'
import SubAccount from './subAccount/index'
import Member from './member/index'
import LimitDialog from '@/views/agentManagement/limitDialog'

export default {
  name: 'AgentManagement',
  components: { Agent, SubAccount, Member, LimitDialog },
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
      curTableIndex: 0,
      curDialogIndex: 0,
      searchString: {
        agent: '',
        member: '',
        subAccount: ''
      },
      tempSearchString: {
        agent: '',
        member: '',
        subAccount: ''
      },
      account: ''
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType',
      'isAgentSubAccount',
      'agentSearchKey',
      'agentSearchValue',
      'agent_id'
    ]),
    agentInfoBalance() {
      return this.agentInfo.id === 1 ? 'oo' : numberFormat(this.agentInfo.balance)
    }
  },
  watch: {
    agentSearchKey: {
      handler() {
        this.searchData()
      },
      immediate: true
    },
    agentSearchValue: {
      handler() {
        this.searchData()
      },
      immediate: true
    }
  },
  mounted() {
    this.formClassName = ['agentInfoFormData', 'agentInfoForm']
    if (this.tempRoute.params?.id !== undefined) {
      this.agentInfo.id = parseInt(this.tempRoute.params.id)
      this.$router.name = this.$stringFormat(this.tempRoute.name, [`${this.agentId}`])
    }
    this.setHeaderStyle()
    if (this.agentInfo.id === this.agent_id) {
      this.searchString.agent = this.tempSearchString.agent
      this.searchString.member = this.tempSearchString.member
      this.searchString.subAccount = this.tempSearchString.subAccount
    }
    switch (this.curTableIndex) {
      case this.tableEnum.agent: {
        this.$nextTick(() => {
          this.onTableBtnClick(this.tableEnum.agent, this.searchString.agent)
        })
        break
      }
      case this.tableEnum.member: {
        this.$nextTick(() => {
          this.onTableBtnClick(this.tableEnum.member, this.searchString.member)
        })
        break
      }
    }
  },
  activated() {
    this.setHeaderStyle()
  },
  methods: {
    searchData() {
      if (this.agentSearchKey === 'member') {
        this.curTableIndex = this.tableEnum.member
        this.tempSearchString.member = this.agentSearchValue
        if (this.agentInfo.id === this.agent_id) {
          this.searchString.member = this.tempSearchString.member
          this.$nextTick(() => {
            this.onTableBtnClick(this.tableEnum.member, this.searchString.member)
          })
        }
      } else {
        this.curTableIndex = this.tableEnum.agent
        this.tempSearchString.agent = this.agentSearchValue
        if (this.agentInfo.id === this.agent_id) {
          this.searchString.agent = this.tempSearchString.agent
          this.$nextTick(() => {
            this.onTableBtnClick(this.tableEnum.agent, this.searchString.agent)
          })
        }
      }
    },
    setHeaderStyle() {
      let viewTitle = ''
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          viewTitle = this.$t('__agentManagement')
          break
        }
        case this.tableEnum.member: {
          viewTitle = this.$t('__memberManagement')
          break
        }
        case this.tableEnum.subAccount: {
          viewTitle = this.$t('__subAccountManagement')
          break
        }
      }
      this.$store.dispatch('common/setHeaderStyle', [viewTitle, false, () => { }])
    },
    expandAgentInfo() {
      this.$nextTick(() => {
        this.agentInfo.open = !this.agentInfo.open;
        this.agentInfo = JSON.parse(JSON.stringify(this.agentInfo))
      })
    },
    setTagsViewTitle() {
      const title = this.$t(this.tempRoute.meta.title)
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.agentInfo.fullName}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
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

      var limit = ''
      for (var i = 0; i < this.agentInfo.handicaps.length; i++) {
        limit += this.agentInfo.handicaps[i].nickname
        if (i < this.agentInfo.handicaps.length - 1) {
          limit += ','
        }
      }
      this.agentInfo.handicaps_info = limit;

      this.setTagsViewTitle()
      this.dataLoading = false
    },
    onLimitBtnClick() {
      this.editForm = JSON.parse(JSON.stringify(this.agentInfo))
      this.account = this.agentInfo.account
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
    onTableBtnClick(tableIndex, searchValue) {
      this.curTableIndex = tableIndex
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          this.$refs.agent.onSearch(this.agentInfo.id, searchValue)
          break
        }
        case this.tableEnum.member: {
          this.$refs.member.onSearch(this.agentInfo.id, searchValue)
          break
        }
        case this.tableEnum.subAccount: {
          this.$refs.subAccount.onSearch(this.agentInfo.id, searchValue)
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
#agentInfo {
  padding: 0.41667rem 2.70833rem 0.83333rem 3.125rem;
  border-bottom: 0.08333rem solid #e9e9e9;
  background-color: #ededed;
  .info-item {
    margin: 0.83333rem;
    font-weight: bold;
    label {
      font-weight: normal;
      margin-right: 0.41667rem;
      margin-bottom: 0;
    }
  }
  .handicap {
    position: relative;
    .h-t {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 5.83333rem;
      height: 1.16667rem;
      position: relative;
      display: block;
    }
  }
  .icon-expand {
      position: absolute;
      right: -1.66667rem;
      top: -2.08333rem;
      font-size: 1.83333rem;
      color: #4e4e4e;
  }
    .expand-outter {
    position: relative;
  }
}
#breadcrumb {
  overflow: hidden;
  position: relative;
  -ms-touch-action: none;
  touch-action: none;
  padding-top: 0.83333rem;
  padding-left: 0.83333rem;
  .swiper-container {
    height: 1.5rem;
  }
  .swiper-slide {
    width: auto !important;
    font-size: 1.16667rem;
    .active {
      font-weight: bold;
      cursor: pointer;
    }
    .breadcrumb-separator {
      margin: 0 0.41667rem;
      font-weight: 700;
      color: #c0c4cc;
    }
  }
}

.agent-page-tab {
  background: #000;
  &.el-tabs {
    .el-tabs__nav {
      max-width: 100%;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 0 !important;
    }
    .swiper-slide {
      margin-right: 0 !important;
      width: auto !important;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      .el-tabs__item {
        width: 100%;
        &.is-active {
          .tab-item {
            border-bottom: 0.25rem solid #f9c901 !important;
          }
        }
        .tab-item {
          font-size: 1.33333rem !important;
          padding-left: 2.08333rem;
          padding-right: 2.08333rem;
          line-height: 3.9rem;
          height: 3.9rem;
          border-bottom: 0.25rem solid #6e6e6e !important;
        }
      }
    }
    .swiper-slide:last-child {
      margin-right: 0 !important;
    }
    .el-tabs__item{
      width: auto;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      padding: 0;
    }
  }
}

.swiper-slide {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform,-webkit-transform;
}

#app {
  .agent-content {
    .filter-container {
      padding: 0.83333rem;
      background-color: #000;
      .filter-wrap {
        padding: 0.41667rem;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .filter-item {
          &.search {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            .search-filter {
              height: 3rem;
              background: #fff;
              border: 0.16667rem solid #f9c901;
              border-radius: 0.20833rem 0 0 0.20833rem;
              input {
                font-size: 1.16667rem;
                height: 2.83333rem;
                line-height: 1;
                padding: 0.41667rem 0.83333rem;
                border: 0 solid #f9c901;
                border-radius: 0;
              }
            }
          }
          &.button {
            width: 3.75rem;
            -webkit-box-flex: initial;
            -ms-flex: initial;
            flex: initial;
            .el-button {
              color: #000;
              height: 3rem;
              background: #f9c901;
              border: 0.16667rem solid #f9c901;
              border-radius: 0 0.20833rem 0.20833rem 0;
              padding: 0 0.83333rem;
            }
          }
          &.add-agent {
            margin-right: 0.83333rem;
            margin-top: 0.41667rem;
          }
        }
      }
    }
  }
}

.add_button {
  margin-left: 0.5333rem;
}

.text-gray {
  color: #4e4e4e;
}
</style>
