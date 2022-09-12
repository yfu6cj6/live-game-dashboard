<template>
  <div class="w-100 h-100">
    <template v-if="device === 'mobile'">
      <div class="agent-list">
        <div v-if="tableData.length > 0">
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
                      <svg-icon :icon-class="item.lockLogin ? 'disable' : 'enable'" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}" style="height: 1rem;width: 1rem;" />
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
              <div class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <span class="value">
                  <span class="solid-circle">
                    <div class="fas">
                      <svg-icon icon-class="top" class="text-black" style="height: 1.5rem;width: 1.5rem;" @click.stop="agentInfoClick(item)" />
                    </div>
                  </span>
                </span>
              </div>
              <div class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <span class="value">
                  <span>
                    <span class="v-line d-block" />
                  </span>
                </span>
              </div>
              <div v-if="!item.allPermission" class="list-item align-self-center" style="width: auto; flex-wrap: wrap; margin-left: 0.5rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
                <span class="value">
                  <button class="el-button bg-yellow el-button--default" @click.stop="onSubAgentDistribute(item)">
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
                  <span class="el-checkbox red-tick">
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
        <div v-else>
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
        :account="agentInfo.account"
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

      <treeDialogMobile
        ref="treeDialog"
        :visible="curDialogIndex === dialogEnum.agentInfo"
        :tree-level="agentLevel"
        @close="closeDialogEven"
      />
    </template>
    <template v-else>
      <div class="agent-list">
        <div class="agent-list">
          <div v-if="tableData.length > 0">
            <div
              v-for="(item, index) in tableData"
              :key="index"
              class="list-row flex-column"
            >
              <div class="d-flex w-100 flex-nowrap">
                <div class="list-item flex-none index" style="align-self: center;">
                  <span class="value">{{ (index+1) }}</span>
                </div>
                <div class="list-item flex-none d-flex flex-wrap align-self-center align-items-center" style="width: auto; white-space: nowrap; flex-wrap: wrap; margin-bottom: 0.5rem;">
                  <span class="value" style="margin-right: 0.5rem;">
                    <span class="solid-circle align-self-center clickable small solid-circle align-self-center clickable" :class="`agentManagement-subAccount-${item.id}`">
                      <div class="fas black">
                        <svg-icon class="fas black" icon-class="top" style="height: 1rem; width: 1rem;" @click.stop="agentInfoClick(item)" />
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center d-flex justify-content-center mr-2" style="width: 85px; margin-left: -10px; pointer-events: none;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0" style="font-size:12px">{{ $t('__mainAccount') }}</div>
                        <div class="items-value mt-1 mb-0 font-weight-bold">{{ item.agent.nickname }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none flex-wrap align-self-center" style="width: 200px; padding-right: 3rem;">
                  <span class="value" style="display: flex; word-break: break-all;">
                    <div class="fas align-self-center gray-deep mr-1">
                      <svg-icon style="height: 1.25rem; width: 1.25rem;" icon-class="user" />
                    </div>
                    <span>
                      <div class="item-inner">
                        <div class="text-golden pl-1 pb-1">{{ item.account }}</div>
                        <div>{{ `(${$t('__nickname')} : ${item.nickname})` }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item flex-none clickable" style="width: auto; white-space: nowrap; flex-wrap: wrap; margin-left: 0.5rem; margin-bottom: 0.5rem; align-self: center; margin-right: 2rem;" @click.stop="onEditBtnClick(item)">
                  <span class="value">
                    <span class="edit">
                      <div class="fas yellow">
                        <img src="@/assets/agentManagement/settings.png" style="height: 2rem; width: 2rem;">
                      </div>
                    </span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item flex-none flex-wrap align-self-center clickable" style="width: auto; white-space: nowrap; margin-bottom: 0.5rem; margin-right: 2rem;" @click.stop="onModPasswordBtnClick(item)">
                  <span class="value">
                    <span class="key">
                      <div class="fas yellow">
                        <img src="@/assets/agentManagement/key.png" style="height: 1.83333rem; width: 1.83333rem;">
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none state" style="width: 85px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="item-inner">
                        <span class="fas green">
                          <svg-icon :icon-class="item.lockLogin ? 'disable' : 'enable'" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}" style="height: 1rem;width: 1rem;" />
                        </span>
                      </div>
                      <div class="item-inner text-green mt-2" :class="{'text-red': item.status === '0', 'text-green': item.status === '1'}">
                        {{ item.statusLabel }}
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none flex-wrap align-self-center text-center" style="width: 70px;">
                  <span class="value" style="display: flex; word-break: break-all;">
                    <div class="fas align-self-center gray-deep mr-2">
                      <svg
                        id="圖層_1"
                        data-name="圖層 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 63 63"
                        style="height: 1.25rem; width: 1.25rem;"
                      >
                        <title>ppl</title>
                        <path d="M23.14,37.4A14.77,14.77,0,1,0,7.88,23.14,14.78,14.78,0,0,0,23.14,37.4Z" />
                        <path d="M29.18,41.34H16.1A16.16,16.16,0,0,0,0,57.45V63H45.28V57.45A16.16,16.16,0,0,0,29.18,41.34Z" />
                        <path d="M43.87,0a12.77,12.77,0,0,0-11,7,18.67,18.67,0,0,1,8.26,18.2A12.79,12.79,0,1,0,43.87,0Z" />
                        <path d="M49,29.25H40.15a18.62,18.62,0,0,1-3.85,6.16,18.29,18.29,0,0,1-2.82,2.47A20.11,20.11,0,0,1,48.2,51.19H63V43.65A14.25,14.25,0,0,0,49,29.25Z" />
                      </svg>
                    </div>
                    <span>
                      <div class="two-row-items m-auto">
                        <div class="items-label mb-0" style="font-size:12px">{{ `${$t('__role')} : ` }}</div>
                        <div
                          v-for="(roleItem, roleIndex) in item.rolesNickname"
                          :key="roleIndex"
                          class="items-value mt-1 mb-0 font-weight-bold"
                        >
                          <div class="items-value mt-1 mb-0 font-weight-bold" :class="{'text-blue': roleItem.key==='AgentSubAccount', 'text-red': roleItem.key==='AgentSubAccountAdmin'}">
                            {{ roleItem.nickname }}
                          </div>
                          <div>{{ (((roleIndex + 1) === item.rolesNickname.length) ? '' : '、') }}</div>
                        </div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none align-self-center d-flex justify-content-center mr-2" style="width: 120px;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__creator') }}</div>
                        <div class="items-value mt-1 mb-0 font-weight-bold">{{ item.creator }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none" style="width: 145px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__createdAt') }}</div>
                        <div class="items-value mt-1 mb-0 font-weight-bold">{{ item.created_at }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none" style="width: 145px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__lastLoginAt') }}</div>
                        <div class="items-value mt-1 mb-0 font-weight-bold">{{ item.lastLoginAt }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div class="list-item flex-none" style="width: 145px; align-self: center;">
                  <span class="value">
                    <span>
                      <div class="two-row-items">
                        <div class="items-label mb-0">{{ $t('__lastLoginIP') }}</div>
                        <div class="items-value mt-1 mb-0 font-weight-bold text-yellow">{{ item.lastLoginIp }}</div>
                      </div>
                    </span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item flex-none align-self-center" style="width: 130px; padding: 1rem 0px;">
                  <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.lockLogin, item)">
                    <span class="el-checkbox red-tick">
                      <span class="el-checkbox__input" :class="{'is-checked': item.lockLogin}">
                        <span class="el-checkbox__inner" />
                      </span>
                    </span>
                    <span class="label">{{ $t('__lockLogin') }}</span>
                  </span>
                </div>
                <div v-if="!isAgentSubAccount" class="list-item flex-none align-self-center" style="width: 180px; padding: 1rem 0px;">
                  <span class="value clickable" @click.stop="onOperateCheckboxClick(dialogEnum.effectAgentLine, item)">
                    <span class="el-checkbox red-tick">
                      <span class="el-checkbox__input" :class="{'is-checked': item.allPermission}">
                        <span class="el-checkbox__inner" />
                      </span>
                    </span>
                    <span class="label">{{ $t('__allPermission') }}</span>
                  </span>
                </div>
                <div v-if="!item.allPermission" class="list-item flex-none align-self-center" style="width: auto; white-space: nowrap; flex-wrap: wrap; margin-right: 0.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="value" style="margin-right: 0.5rem;">
                    <button class="el-button bg-yellow el-button--default" @click.stop="onSubAgentDistribute(item)">
                      <span>{{ $t('__subAgentDistribute') }}</span>
                    </button>
                  </span>
                </div>
              </div>
              <div class="w-100">
                <div class="list-item flex-column" style="width: 100%; margin-top: 1rem; line-height: 1.2; padding-left: 2.5rem">
                  <span class="label" style="width: 100%;">{{ $t('__remark') }}</span>
                  <span class="value" style="width: 100%; font-weight: 700 !important;">{{ item.remark }}</span>
                </div>
              </div>
              <div class="force-wrap" />
            </div>
          </div>
          <div v-else class="noInformation">
            <span>{{ `${$t('__noHave')}${$t('__subAccount')}` }}</span>
          </div>
          <treeDialogPC
            ref="treeDialog"
            :visible="curDialogIndex === dialogEnum.agentInfo"
            :tree-level="agentLevel"
            :click-class-name="editForm.className"
            @close="closeDialogEven"
          />
          <div class="force-wrap" />
          <div class="w-100" style="height: 40px;" />
          <pagination
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :total="totalCount"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
        :account="agentInfo.account"
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
    </template>
  </div>
</template>

<script>
import { subAccountSearch, subAccountModPassword, subAccountModStatus,
  subAccountModEffectAgentLine, subAccountGetAgentLine,
  subAccountSetHasAgents, subAccountTreeSearch } from '@/api/agentManagement/subAccount'
import { timezoneSearch } from '@/api/backstageManagement/timeZoneManagement'
import handlePageChange from '@/mixin/handlePageChange'
import SubAccountEditDialog from './subAccountEditDialog'
import SubAgentDistributeDialog from './subAgentDistributeDialog'
import ModPasswordDialog from '@/views/agentManagement/modPasswordDialog'
import OperateDialog from '@/components/OperateDialog'
import PasswordTipDialog from '@/views/agentManagement/passwordTipDialog'
import { mapGetters } from 'vuex'
import TreeDialogMobile from '@/components/InfoDialog/treeDialog_mobile'
import TreeDialogPC from '@/components/InfoDialog/treeDialog_pc'
import Pagination from '@/components/Pagination'

const defaultForm = {
  account: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  status: '1',
  timeZone: 1,
  effectAgentLine: true,
  isAdmin: true,
  remark: '',
  userPassword: ''
}

export default {
  name: 'Member',
  components: { SubAccountEditDialog, OperateDialog, SubAgentDistributeDialog, ModPasswordDialog, PasswordTipDialog, TreeDialogMobile, TreeDialogPC, Pagination },
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
        'passwordTip': 10,
        'agentInfo': 11
      }),
      agentInfo: {},
      editForm: {},
      curDialogIndex: 0,
      subAgent: [],
      agentLevel: []
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType',
      'roles',
      'isAgentSubAccount',
      'device'
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
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAgentDistribute'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
      }])
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
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__addSubAccount'), true, () => {
        this.closeDialogEven()
        this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
      }])
    },
    // 父物件呼叫
    setAgentInfo(agentInfo) {
      this.agentInfo = agentInfo
    },
    // 父物件呼叫
    onSearch(agentId, searchStr) {
      this.$store.dispatch('common/setHeaderStyle', [this.$t('__subAccountManagement'), false, () => { }])
      this.pageSizeCount = 1
      this.currentPage = 1
      this.onSubmit(agentId, searchStr)
    },
    onSubmit(agentId, accountKeyWord) {
      this.setDataLoading(true)
      subAccountSearch({ agentId: agentId, accountKeyWord: accountKeyWord }).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.setDataLoading(false)
      })
    },
    handleRespone(res) {
      const open = this.tableData.filter(item => item.open).map(item => item.id)
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
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
        element.lastLoginIp = element.lastLoginIp === '' ? '-' : element.lastLoginIp
        element.lastLoginAt = element.lastLoginAt === '' ? '-' : element.lastLoginAt
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
    },
    agentInfoClick(rowData) {
      this.closeDialogEven()
      this.$refs.treeDialog.setDialogLoading(true)
      this.editForm = JSON.parse(JSON.stringify(rowData))
      this.editForm.className = `.agentManagement-subAccount-${this.editForm.id}`
      subAccountTreeSearch({ accountId: this.editForm.id }).then((res) => {
        this.agentLevel = res
        this.curDialogIndex = this.dialogEnum.agentInfo
        this.$refs.treeDialog.setDialogLoading(false)
      }).catch(() => {
        this.$refs.treeDialog.setDialogLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.noInformation {
  margin-top: 1rem;
  text-align: center;
}

.pc {
  .agent-list {
    position: relative;
  }
}

</style>
