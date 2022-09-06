<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="flex-column flex-fill h-100">
        <div class="agent-container bg-white flex-column flex-fill tree-close agentManagement">
          <div class="agent-container-inner flex-column flex-fill">
            <div class="agent-content flex-column flex-fill">
              <div class="scroll-wrap flex-column flex-fill">
                <div class="scroll-inner flex-column flex-fill off">
                  <div class="scroll-view flex-column flex-fill">
                    <div class="agent-summary">
                      <div class="floatNav">
                        <div class="fas ml-auto gray-deep" @click.stop="openAgentLevel">
                          <svg
                            id="圖層_1"
                            data-name="圖層 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.83333rem; width: 1.83333rem;"
                          >
                            <title>tree</title>
                            <rect y="2.49" width="31.87" height="15.94" />
                            <rect x="37.1" y="23.65" width="25.9" height="8.96" />
                            <rect x="34.11" y="9.71" width="1.99" height="36.85" transform="translate(6.97 63.25) rotate(-90)" />
                            <rect x="37.1" y="37.6" width="25.9" height="8.96" />
                            <rect x="34.11" y="23.65" width="1.99" height="36.85" transform="translate(-6.97 77.19) rotate(-90)" />
                            <rect x="37.1" y="51.55" width="25.9" height="8.96" />
                            <rect x="32.12" y="37.6" width="1.99" height="36.85" transform="translate(-22.91 89.15) rotate(-90)" />
                            <rect x="14.69" y="18.42" width="2.49" height="36.85" transform="translate(31.87 73.7) rotate(180)" />
                          </svg>
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
                                  <span class="active">{{ agentInfo.fullName }}</span>
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
                            <span>{{ agentInfoBalance }}</span>
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
                              <span>{{ `${agentInfo.liveCommissionRateLabel}% ` }}</span>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__rollingRate')}: ` }}</label>
                              <span>{{ `${agentInfo.liveRollingRateLabel}% ` }}</span>
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
                              <span>{{ agentInfo.directAgentCountLabel }}</span>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__directPlayerCount')}: ` }}</label>
                              <span>{{ agentInfo.directPlayerCountLabel }}</span>
                            </div>
                            <div class="info-item" style="height: 0px;">
                              <button class="el-button bg-yellow el-button--default" style="margin-top: -1rem;" @click.stop="onTotalPlayerBtnClick()">{{ `${$t('__totalPlayerCount')}: ${totalPlayerLabel}` }}</button>
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
                              :form="editForm"
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
    <template v-else>
      <div class="agent agentManagement">
        <div class="agent-container bg-white tree-expand">
          <div class="w-100">
            <div class="overlay-scroll-wrap scrolling float" style="height: calc((100vh - 6.25rem) - 30px);">
              <backTop ref="backTop" />
              <div id="scroll-inner" class="scroll-inner on native hasPage">
                <div class="scroll-view" style="min-width: 100%; padding-right: 0px;">
                  <div class="agent-container-inner">
                    <div class="agent-summary">
                      <div class="floatNav">
                        <div class="fas ml-auto clickable gray-deep">
                          <svg
                            id="圖層_1"
                            data-name="圖層 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 63 63"
                            style="height: 1.83333rem; width: 1.83333rem;"
                          >
                            <title>tree</title>
                            <rect y="2.49" width="31.87" height="15.94" />
                            <rect x="37.1" y="23.65" width="25.9" height="8.96" />
                            <rect x="34.11" y="9.71" width="1.99" height="36.85" transform="translate(6.97 63.25) rotate(-90)" />
                            <rect x="37.1" y="37.6" width="25.9" height="8.96" />
                            <rect x="34.11" y="23.65" width="1.99" height="36.85" transform="translate(-6.97 77.19) rotate(-90)" />
                            <rect x="37.1" y="51.55" width="25.9" height="8.96" />
                            <rect x="32.12" y="37.6" width="1.99" height="36.85" transform="translate(-22.91 89.15) rotate(-90)" />
                            <rect x="14.69" y="18.42" width="2.49" height="36.85" transform="translate(31.87 73.7) rotate(180)" />
                          </svg>
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
                                  <span class="active">{{ agentInfo.fullName }}</span>
                                </div>
                              </div>
                              <span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
                            </div>
                          </div>
                        </div>
                        <div class="d-flex flex-wrap align-items-center">
                          <div class="info-item">
                            <label>{{ `${$t('__agent')}: ` }}</label>
                            <span>
                              <span>{{ agentInfo.account }}</span>
                              <span>{{ `[${$t('__agent')}]` }}</span>
                            </span>
                          </div>
                          <div class="info-item">
                            <label>{{ `${$t('__balance')}:` }}</label>
                            <span>{{ agentInfoBalance }}</span>
                          </div>
                          <div class="info-item d-flex align-items-center">
                            <label>{{ `${$t('__handicapLimit')}: ` }}</label>
                            <span class="value handicap text-yellow text-link" @click.stop="onLimitBtnClick()">
                              <span class="h-t">{{ agentInfo.handicaps_info }}</span>
                            </span>
                            <span class="ml-2">
                              <div class="fas yellow" style="margin-bottom: 2px;">
                                <img src="@/assets/agentManagement/updown.png" alt="盘口(限红)" title="盘口(限红)" style="height: 1.16667rem; width: 1.16667rem;">
                              </div>
                            </span>
                          </div>
                          <div class="info-item">
                            <router-link :to="`/winLossReport/winLossReport/${agentInfo.id}`">
                              <button class="el-button bg-yellow el-button--default">{{ $t('__winLossReport') }}</button>
                            </router-link>
                          </div>
                        </div>
                        <div class="animate-box">
                          <div class="d-flex flex-wrap">
                            <div class="info-item">
                              <label>{{ `${$t('__rate')}: ` }}</label>
                              <span>{{ `${agentInfo.liveCommissionRateLabel}% ` }}</span>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__rollingRate')}: ` }}</label>
                              <span>{{ `${agentInfo.liveRollingRateLabel}% ` }}</span>
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
                              <label>{{ `${$t('__directAgentCount')}: ` }}</label>
                              <span>{{ agentInfo.directAgentCountLabel }}</span>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__directPlayerCount')}: ` }}</label>
                              <span>{{ agentInfo.directPlayerCountLabel }}</span>
                            </div>
                            <div class="info-item" style="height: 0px;">
                              <button class="el-button bg-yellow el-button--default" style="margin-top: -1rem;" @click.stop="onTotalPlayerBtnClick()">{{ `${$t('__totalPlayerCount')}: ${totalPlayerLabel}` }}</button>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__createdAt')}: ` }}</label>
                              <span>{{ agentInfo.created_at }}</span>
                            </div>
                            <div class="info-item">
                              <label>{{ `${$t('__lastLoginAt')}: ` }}</label>
                              <span>{{ agentInfo.lastLoginAt }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="agent-content w-100">
                      <div class="w-100">
                        <div class="el-tab-pane">
                          <div class="list-container">
                            <div class="common-list">
                              <div class="agent-page-bar-container">
                                <div class="agent-page-tab deep el-tabs">
                                  <div class="el-tabs__header">
                                    <div class="swiper-container el-tabs__nav w-100 swiper-no-swiping swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
                                      <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
                                        <div class="swiper-slide swiper-slide-active">
                                          <div class="el-tabs__item" :class="{'is-active': curTableIndex === tableEnum.agent, 'clickable': curTableIndex !== tableEnum.agent}" @click.stop="onTableBtnClick(tableEnum.agent, searchString.agent)">
                                            <div class="tab-item strong">{{ $t('__agent') }}</div>
                                          </div>
                                        </div>
                                        <div class="swiper-slide swiper-slide-next">
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
                                      <span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
                                    </div>
                                  </div>
                                  <div class="clearfix" />
                                </div>
                                <div class="agentSearchBar">
                                  <div class="flex-wrap filter-wrap el-row el-row--flex">
                                    <div v-if="!isAgentSubAccount" class="filter-item add-agent text-link" @click.stop="onAddSubBtnClick()">
                                      <div>
                                        <svg-icon class="icon fas yellow" icon-class="add" style="height: 1.66667rem; width: 1.66667rem;" />
                                      </div>
                                      <button class="ml-2 el-button bg-yellow el-button--default" @click.stop="onAddSubBtnClick()">{{ $t('__addSubAgent') }}</button>
                                    </div>
                                    <template v-if="curTableIndex === tableEnum.agent">
                                      <div class="filter-item search">
                                        <div class="comp d-flex search-filter">
                                          <input v-model="searchString.agent" class="el-input">
                                        </div>
                                      </div>
                                      <div class="filter-item button">
                                        <button type="button" class="el-button el-button--default" style="padding: 0px 8px !important; font-size: 10px;" @click.stop="onTableBtnClick(tableEnum.agent, searchString.agent)">
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
                                        <button type="button" class="el-button el-button--default" style="padding: 0px 8px !important; font-size: 10px;" @click.stop="onTableBtnClick(tableEnum.member, searchString.member)">
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
                                        <button type="button" class="el-button el-button--default" style="padding: 0px 8px !important; font-size: 10px;" @click.stop="onTableBtnClick(tableEnum.subAccount, searchString.subAccount)">
                                          <span>
                                            <div class="black">
                                              <svg-icon icon-class="search" style="height: 1.5rem; width: 1.5rem;" />
                                            </div>
                                          </span>
                                        </button>
                                      </div>
                                    </template>
                                  </div>
                                  <div class="agent-pop-up-panel" style="display: none;" />
                                </div>
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
                                :form="editForm"
                                :agent-name="account"
                                @close="closeDialogEven"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { agentTotalPlayerCount } from '@/api/agentManagement/agent'
import viewCommon from '@/mixin/viewCommon';
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import Agent from './agent/index'
import SubAccount from './subAccount/index'
import Member from './member/index'
import LimitDialog from '@/views/agentManagement/limitDialog'
import BackTop from '@/components/BackTop'
// import Pagination from '@/components/Pagination'

export default {
  name: 'AgentManagement',
  components: { Agent, SubAccount, Member, LimitDialog, BackTop },
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
      account: '',
      editForm: {},
      totalPlayerLabel: ''
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
      return this.agentInfo.id === 1 ? 'oo' : this.agentInfo.balanceLabel
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
    },
    'device': function() {
      if (this.$route.name === this.tempRoute.name) {
        this.$nextTick(() => {
          if (this.curTableIndex === this.tableEnum.agent) {
            this.onTableBtnClick(this.tableEnum.agent, this.searchString.agent)
          } else if (this.curTableIndex === this.tableEnum.member) {
            this.onTableBtnClick(this.tableEnum.member, this.searchString.member)
          } else if (this.curTableIndex === this.tableEnum.subAccount) {
            this.onTableBtnClick(this.tableEnum.subAccount, this.searchString.subAccount)
          }
        })
      }
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
    openAgentLevel() {
      this.$store.dispatch('agentManagement/agentSearch', this.agentInfo.id)
    },
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
    setDataLoading(loading) {
      this.$store.dispatch('app/setLoading', loading)
    },
    handleRespone(res) {
      this.$store.dispatch('agentManagement/setAgentLevel', [res.agentLevel, this.agentInfo.id])
      this.agentInfo = res.agentInfo
      this.agentInfo.balanceLabel = numberFormat(this.agentInfo.balance)
      this.agentInfo.liveCommissionRateLabel = numberFormat(this.agentInfo.live_commission_rate)
      this.agentInfo.liveRollingRateLabel = numberFormat(this.agentInfo.live_rolling_rate)
      this.agentInfo.directAgentCountLabel = numberFormat(this.agentInfo.directAgentCount, 0)
      this.agentInfo.directPlayerCountLabel = numberFormat(this.agentInfo.directPlayerCount, 0)
      this.agentInfo.currency = this.agentInfo.currency.code
      this.agentInfo.accountStatus = this.accountStatusType.find(element => element.key === this.agentInfo.status).nickname
      this.agentInfo.betStatus = this.accountStatusType.find(element => element.key === this.agentInfo.bet_status).nickname
      this.agentInfo.weeklyLossSettlement = this.accountStatusType.find(element => element.key === this.agentInfo.weekly_loss_settlement).nickname
      this.agentInfo.giftStatus = this.accountStatusType.find(element => element.key === this.agentInfo.gift_status).nickname
      this.agentInfo.handicaps.forEach(element => {
        element.betMinLabel = numberFormat(element.bet_min)
        element.betMaxLabel = numberFormat(element.bet_max)
      });
      if (this.agentInfo.id === this.agent_id && this.agentInfo.id > 1) {
        this.$store.dispatch('user/setUserData', ['balance', this.agentInfo.balance])
      }

      var limit = ''
      for (var i = 0, max = this.agentInfo.handicaps.length; i < max; i++) {
        limit += this.agentInfo.handicaps[i].nickname
        if (i < max - 1) {
          limit += ','
        }
      }
      this.agentInfo.handicaps_info = limit;
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          this.$refs.agent.setAgentInfo(this.agentInfo)
          break
        }
        case this.tableEnum.member: {
          this.$refs.member.setAgentInfo(this.agentInfo)
          break
        }
        case this.tableEnum.subAccount: {
          this.$refs.subAccount.setAgentInfo(this.agentInfo)
          break
        }
      }

      this.setTagsViewTitle()
      this.setDataLoading(false)
    },
    onLimitBtnClick() {
      this.editForm = JSON.parse(JSON.stringify(this.agentInfo))
      this.editForm.handicaps.forEach(element => {
        element.bet_maxLabel = numberFormat(element.bet_max)
        element.bet_minLabel = numberFormat(element.bet_min)
      });
      this.account = this.agentInfo.account
      this.curDialogIndex = this.dialogEnum.limit
      var headerBackTitle = this.$t('__agentManagement')
      if (this.curTableIndex === this.tableEnum.member) {
        headerBackTitle = this.$t('__memberManagement')
      } else if (this.curTableIndex === this.tableEnum.subAccount) {
        headerBackTitle = this.$t('__subAccountManagement')
      }
      this.$store.dispatch('common/setHeaderStyle', [headerBackTitle, true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [headerBackTitle, false, () => { }])
      }])
    },
    onTotalPlayerBtnClick() {
      this.setDataLoading(true)
      agentTotalPlayerCount({ agentId: this.agentInfo.id }).then((res) => {
        this.$nextTick(() => {
          this.totalPlayerLabel = numberFormat(res.totalPlayerCount, 0)
          console.log(this.totalPlayerLabel);
        })
        this.setDataLoading(false)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    onTableBtnClick(tableIndex, searchValue) {
      this.curTableIndex = tableIndex
      switch (this.curTableIndex) {
        case this.tableEnum.agent: {
          this.$refs.agent.onSearch(this.agentInfo.id, searchValue)
          console.log("agent");
          break
        }
        case this.tableEnum.member: {
          this.$refs.member.onSearch(this.agentInfo.id, searchValue)
          console.log("member");
          break
        }
        case this.tableEnum.subAccount: {
          this.$refs.subAccount.onSearch(this.agentInfo.id, searchValue)
          console.log("subAccount");
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

<style lang="scss">
@import "~@/styles/variables.scss";

.agentManagement {
  .text-gray {
    color: #4e4e4e;
  }
  .agent-container {
    height: 100%;
    width: 100%;
  }
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
      .breadcrumb-separator {
        margin: 0 0.41667rem;
        font-weight: 700;
        color: #c0c4cc;
      }
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
  .agent-summary {
    position: relative;
    .floatNav {
      position: absolute;
      top: 1.66667rem;
      left: 0.83333rem;
      .fas {
        width: 2.08333rem;
        font-size: 1.83333rem;
      }
    }
  }
  .agent-content {
    padding: 0;
    width: 100%;
    position: relative;
    .floatNav {
      position: absolute;
      top: 1.66667rem;
      left: 0.83333rem;
      .fas {
        width: 2.08333rem;
        font-size: 1.83333rem;
      }
    }
    .list-container {
      height: 100%;
    }
    .filter-sort-wrap {
      padding: 0 0.83333rem 0.41667rem 0.83333rem;
      background-color: #000;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
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
  .animate-box {
    overflow: hidden;
  }
}

#app.mobile .agentManagement {
  .agent-container-inner {
    background-color: #fff;
    height: -webkit-fill-available;
    min-height: 50vh;
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
  .add_button {
    margin-left: 0.5333rem;
  }
  .agent-list {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    .list-row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      padding: 0.83333rem 0.41667rem;
      margin: 0;
      background-color: #fff;
      position: relative;
      padding-right: 3.75rem;
      .agent-list-detail {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        padding: 0.83333rem 0.41667rem;
        margin: 0;
        background-color: transparent;
        position: relative;
        padding-left: 2.08333rem;
        padding-right: 0rem;
      }
      .list-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        font-size: 1.16667rem;
        .handicap {
          position: relative;
          .h-t {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 5.83333rem;
            position: relative;
            display: block;
          }
        }
        .label {
          margin-right: 0.41667rem;
        }
        .v-line {
          -ms-flex-item-align: center;
          align-self: center;
          width: 0.16667rem;
          height: 2.66667rem;
          background: #f9c901;
          margin: 0 0.625rem;
        }
        .solid-circle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-item-align: center;
          align-self: center;
          background: #f9c901;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          .fas {
            margin: auto;
          }
        }
        &.index {
          text-align: center;
          margin: 0 0.41667rem;
          font-weight: bold;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          width: 1.66667rem;
        }
        .value {
          font-weight: bold;
          word-break: break-all;
          .fas {
            max-height: 2rem;
            overflow-y: hidden;
          }
          .tag-name {
            font-weight: normal;
          }
        }
        .two-row-items {
          text-align: center;
          .items-value {
            font-weight: bold;
            margin-bottom: 0.83333rem;
          }
          .items-label {
            color: #a3a3a3;
          }
        }
        .credit {
          .items-label-icon {
            display: inline;
          }
        }
        &.share {
          text-align: center;
          -webkit-box-flex: initial;
          -ms-flex: initial;
          flex: initial;
          width: 5.83333rem;
          .items-label {
            font-size: .91667rem;
            color: #a3a3a3;
          }
        }
        &.state {
          text-align: center;
          -webkit-box-flex: initial;
          -ms-flex: initial;
          flex: initial;
          width: 3.33333rem;
          .item-inner {
            font-size: .91667rem;
            padding: 0 0.41667rem;
            .fas {
              margin-bottom: 0.66667rem;
            }
          }
        }
        &.ctrl {
          text-align: center;
          -webkit-box-flex: initial;
          -ms-flex: initial;
          flex: initial;
          position: absolute;
          right: 0;
          top: 0.41667rem;
          width: 3.33333rem;
          .item-inner {
            padding: 0 0.41667rem;
          }
        }
      }
      .force-wrap {
        width: 100%;
      }
      &:nth-child(odd) {
        background-color: #f4f4f4;
      }
      &:nth-child(even) {
        background-color: #fff;
      }
    }
    .notice {
      .el-form {
        margin: 0 auto;
        .el-form-item {
          width: 100%;
          .el-form-item__content {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            line-height: 1;
            .value-group {
              width: auto;
              display: inline-block;
              -webkit-box-flex: 1;
              -ms-flex: auto;
              flex: auto;
            }
          }
        }
        .custom-psw {
          margin-bottom: 0 !important;
          .el-input__icon {
            display: none;
          }
          .el-icon-view {
            display: inline-block;
          }
          &.is-error {
            .has-error {
              display: inline-block;
            }
          }
          &.is-success {
            .no-error {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}

#app.pc .agentManagement {

  .el-tabs__item {
    font-size: 1.33333rem;
  }

  .el-tabs {
    &.deep {
      .el-tabs__nav {
        .el-tabs__item {
          &.is-active {
            .tab-item {
              color: #f9c901;
              border-bottom: 0.16667rem solid #f9c901;
            }
          }
        }
      }
    }
  }

  .agent-container-inner {
    background-color: #fff;
    height: calc(100vh - 3.75rem - 145px);
    min-height: 50vh;
  }
  &.agent {
    width: 100%;
    height: 100%;
  }

  .agent-page-tab {
    &.el-tabs {
      width: 700px;
      .el-tabs__header {
        padding-top: 0;
      }
      .el-tabs__nav {
        max-width: 100%;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 0 !important;
        &:after {
          content: '';
          position: absolute;
          z-index: 0;
          bottom: 0;
          left: 0;
          background: transparent;
          border-bottom: 0.25rem solid #6e6e6e;
          width: 100%;
          height: 1px;
        }
      }
      .swiper-slide {
        margin-right: 0 !important;
        width: auto !important;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        .el-tabs__item {
          width: 100%;
        }
        &:last-child {
          margin-right: 0 !important;
          .tab-item:before {
            border-right: 0.08333rem solid #6e6e6e;
          }
        }
      }
      .el-tabs__item {
        width: auto;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        padding: 0;
        border-bottom: 0rem solid #a3a3a3 !important;
        .tab-item:before {
          content: '';
          position: absolute;
          top: 20%;
          right: 0;
          border-right: 0.08333rem solid #6e6e6e;
          height: 60%;
        }
        .tab-item {
          font-size: 1.25rem !important;
          padding-left: 0.83333rem;
          padding-right: 0.83333rem;
          border-bottom: 0rem solid #f9c901 !important;
        }
        &.is-active {
          .tab-item {
            border-bottom: 0.16667rem solid transparent !important;
          }
          .tab-item:after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: 0;
            background: transparent;
            border-bottom: 0.25rem solid #f9c901;
            width: calc(100%);
            height: 1px;
          }
        }
      }
    }
  }

  .agentSearchBar {
    margin-left: 0;
    padding: 0 5px 0 0.83333rem;
    background-color: #000;
    .search {
      width: 280px;
    }
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
        &.add-agent {
          margin-left: 0.83333rem;
          margin-right: 0.83333rem;
          margin-top: 0.41667rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
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
      }
    }
  }

  .agent-content {
    .filter-wrap {
      padding: 0.41667rem;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .agent-pop-up-panel {
      position: fixed;
      top: 75px;
      left: 200px;
      width: calc(100vw - 200px);
      height: calc(100vh - 75px);
      z-index: 3;
      background: rgba(0,0,0,0.5);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      line-height: 1.2;
    }
  }

  .common-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    .agent-page-bar-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: end;
      -ms-flex-align: end;
      align-items: flex-end;
      width: 100%;
      min-height: 2.5rem;
      background-color: #000;
    }
  }
}
</style>
