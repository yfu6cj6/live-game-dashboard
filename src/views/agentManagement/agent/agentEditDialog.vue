<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div v-loading="dialogLoading" class="popup-page">
        <div class="w-100 pt-3 pb-3">
          <el-steps
            :active="curIndex"
            class="form-step"
            finish-status="success"
          >
            <el-step v-if="hasStep('agentInfo')" />
            <el-step v-if="hasStep('rate')" />
            <el-step v-if="hasStep('limit')" />
            <el-step v-if="hasStep('balanceConfig')" />
            <el-step v-if="hasStep('confirm')" />
          </el-steps>
          <div v-if="hasError" class="form-alert">
            <div role="alert" class="el-alert el-alert--warning is-light fade show">
              <i class="el-alert__icon el-icon-warning" />
              <div class="el-alert__content">
                <span class="el-alert__title">{{ errorTip }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-step-content flex-column flex-fill">
          <div class="parent-info">{{ `${$t('__superiorAgent')}: ${agentInfo.fullName}` }}</div>
          <div
            v-show="curIndex === stepEnum.agentInfo"
            class="flex-column flex-fill scroll-inner"
            :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`"
          >
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__agentInfo') }}</label>
              <div class="step-content">
                <div v-if="operationType === operationEnum.create" class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="d-flex align-items-center">
                      <label class="form-item-label">{{ $t('__accountGenerateMode') }}</label>
                      <el-switch
                        v-model="autoGenerateAccount"
                        :active-text="$t('__auto')"
                        :inactive-text="$t('__manual')"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="el-form-item el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step1.account.hasError,
                    'is-success': step1.account.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__account') }}</label>
                      <small class="tip">
                        {{ operationType === operationEnum.edit ? '' : `5-8${$t('__indivual')}${$t('__character')} (${$t('__includeEnglishAlphabetNumberBottomLine')})` }}
                      </small>
                    </div>
                    <div
                      class="el-input el-input--small"
                      :class="{'is-disabled': operationType === operationEnum.edit}"
                    >
                      <input
                        v-model="form.account"
                        type="text"
                        autocomplete="off"
                        :disabled="operationType===operationEnum.edit"
                        class="el-input__inner"
                        @focus="inputFocus(step1.account)"
                        @blur="passwordChange(step1.account, form.account)"
                        @change="passwordChange(step1.account, form.account)"
                      >
                      <span v-if="step1.account.hasError || step1.account.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i
                            v-if="step1.account.hasError"
                            class="el-input__icon el-input__validateIcon el-icon-error has-error"
                          />
                          <i
                            v-if="step1.account.isSuccess"
                            class="el-input__icon el-input__validateIcon el-icon-success no-error"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="el-form-item el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step1.nickname.hasError,
                    'is-success': step1.nickname.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__name') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-input el-input--small">
                      <input
                        v-model="form.nickname"
                        type="text"
                        autocomplete="off"
                        class="el-input__inner"
                        @focus="inputFocus(step1.nickname)"
                        @blur="inputChange(step1.nickname, form.nickname)"
                        @change="inputChange(step1.nickname, form.nickname)"
                      >
                      <span v-if="step1.nickname.hasError || step1.nickname.isSuccess" class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i
                            v-if="step1.nickname.hasError"
                            class="el-input__icon el-input__validateIcon el-icon-error has-error"
                          />
                          <i
                            v-if="step1.nickname.isSuccess"
                            class="el-input__icon el-input__validateIcon el-icon-success no-error"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="operationType === operationEnum.create && visible"
                  class="el-form-item custom-psw el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step1.password.hasError,
                    'is-success': step1.password.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__password') }}</label>
                      <small class="tip">
                        {{ `5-8${$t('__indivual')}${$t('__character')} (${$t('__includeEnglishAlphabetNumberBottomLine')})` }}
                      </small>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input
                        v-model="form.password"
                        :type="step1.password.type"
                        autocomplete="off"
                        class="el-input__inner"
                        @focus="inputFocus(step1.password)"
                        @blur="passwordChange(step1.password, form.password)"
                        @change="passwordChange(step1.password, form.password)"
                      >
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.password.type!=='password'}" @click="showPassword(step1.password)" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="operationType === operationEnum.create && visible"
                  class="el-form-item custom-psw el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step1.confirmPassword.hasError,
                    'is-success': step1.confirmPassword.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input
                        v-model="form.confirmPassword"
                        :type="step1.confirmPassword.type"
                        autocomplete="off"
                        class="el-input__inner"
                        @focus="inputFocus(step1.confirmPassword)"
                        @blur="confirmPasswordChange"
                        @change="confirmPasswordChange"
                      >
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i
                            class="el-input__icon el-icon-view"
                            style="cursor: pointer;"
                            :class="{'text-black': step1.confirmPassword.type!=='password'}"
                            @click="showPassword(step1.confirmPassword)"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__accountStatus') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.status" class="el-select w-100">
                      <option
                        v-for="item in accountStatusType"
                        :key="item.key"
                        :value="item.key"
                      >
                        {{ $t(item.nickname) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__timeZone') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.time_zone" class="el-select w-100">
                      <option
                        v-for="item in time_zone"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ $t(item.city_name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  v-if="showCurrency"
                  class="el-form-item el-form-item--feedback el-form-item--small"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__currency') }}</label>
                      <small class="tip" />
                    </div>
                    <select v-model="form.currency" class="el-select w-100">
                      <option
                        v-for="item in currency"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ $t(item.name) }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__remark') }}</label>
                      <small class="tip" />
                    </div>
                    <div class="el-textarea el-input--small">
                      <textarea
                        v-model="form.remark"
                        autocomplete="off"
                        class="el-textarea__inner"
                        style="min-height: 48.0625px;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            v-show="curIndex === stepEnum.rate"
            class="flex-column flex-fill scroll-inner"
            :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`"
          >
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__rate') }}</label>
              <div id="step-1" class="step-content">
                <div
                  class="el-form-item small el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step2.live_commission_rate.hasError,
                    'is-success': step2.live_commission_rate.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__commissionRate')}` }}</label>
                        <small class="tip small">
                          {{ `${$t('__range')} : 0 % - ${agentInfo.live_commission_rate} %` }}
                        </small>
                      </div>
                      <div
                        class="text-field share el-input el-input--small"
                        :class="{'is-disabled': agentInfo.live_commission_rate === 0}"
                      >
                        <input
                          v-model.number="form.live_commission_rate"
                          type="number"
                          autocomplete="off"
                          :disabled="agentInfo.live_commission_rate === 0"
                          min="0"
                          class="el-input__inner"
                          @focus="inputFocus(step2.live_commission_rate)"
                          @blur="specialInputChange('live_commission_rate')"
                          @change="specialInputChange('live_commission_rate')"
                        >
                        <span v-if="step2.live_commission_rate.hasError || step2.live_commission_rate.isSuccess" class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i
                              v-if="step2.live_commission_rate.hasError"
                              class="el-input__icon el-input__validateIcon el-icon-error has-error"
                            />
                            <i
                              v-if="step2.live_commission_rate.isSuccess"
                              class="el-input__icon el-input__validateIcon el-icon-success no-error"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="el-form-item small el-form-item--feedback el-form-item--small"
                  :class="{
                    'is-error': step2.live_rolling_rate.hasError,
                    'is-success': step2.live_rolling_rate.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__rollingRate')}` }}</label>
                        <small class="tip small">
                          {{ `${$t('__range')} : 0 % - ${agentInfo.live_rolling_rate} %` }}
                        </small>
                      </div>
                      <div
                        class="text-field share el-input el-input--small"
                        :class="{'is-disabled': agentInfo.live_rolling_rate === 0}"
                      >
                        <input
                          v-model.number="form.live_rolling_rate"
                          type="number"
                          autocomplete="off"
                          :disabled="agentInfo.live_rolling_rate === 0"
                          min="0"
                          class="el-input__inner"
                          @focus="inputFocus(step2.live_rolling_rate)"
                          @blur="specialInputChange('live_rolling_rate')"
                          @change="specialInputChange('live_rolling_rate')"
                        >
                        <span v-if="step2.live_rolling_rate.hasError || step2.live_rolling_rate.isSuccess" class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i
                              v-if="step2.live_rolling_rate.hasError"
                              class="el-input__icon el-input__validateIcon el-icon-error has-error"
                            />
                            <i
                              v-if="step2.live_rolling_rate.isSuccess"
                              class="el-input__icon el-input__validateIcon el-icon-success no-error"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            v-show="curIndex === stepEnum.limit"
            class="flex-column flex-fill scroll-inner"
            :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`"
          >
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ `${$t('__choose')}${$t('__handicapLimit')}` }}</label>
              <div class="step-content">
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="w-100 handicap-table" style="position: relative;">
                      <table class="el-table">
                        <tbody>
                          <tr class="el-table__row head">
                            <td class="ww-3">
                              <div class="cell checkbox text-center h-100">
                                <span
                                  class="el-checkbox green-tick pl-0"
                                  @click="changeAllHandicaps"
                                >
                                  <span
                                    :class="{
                                      'unchecked': !selectAllHandicaps,
                                      'is-checked': selectAllHandicaps}"
                                  >
                                    <span class="el-checkbox__inner" />
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td class="ww-5">
                              <div class="cell d-flex align-items-center justify-content-center text-black">
                                ID
                                <i
                                  :class="{
                                    'el-icon-d-caret': !step3.id.sortable,
                                    'el-icon-caret-top': step3.id.sortable && step3.id.increment,
                                    'el-icon-caret-bottom': step3.id.sortable && !step3.id.increment,
                                    'text-black': !step3.id.sortable,
                                    'text-blue': step3.id.sortable}"
                                  @click="handicapLimitSort('id')"
                                />
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell d-flex align-items-center justify-content-center">
                                {{ $t('__handicapLimit') }}
                                <i
                                  :class="{
                                    'el-icon-d-caret': !step3.nickname.sortable,
                                    'el-icon-caret-top': step3.nickname.sortable && step3.nickname.increment,
                                    'el-icon-caret-bottom': step3.nickname.sortable && !step3.nickname.increment,
                                    'text-black': !step3.nickname.sortable,
                                    'text-blue': step3.nickname.sortable}"
                                  @click="handicapLimitSort('nickname')"
                                />
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell d-flex align-items-center justify-content-end lower-limit">
                                {{ $t('__lowerLimit') }}
                                <i
                                  :class="{
                                    'el-icon-d-caret': !step3.bet_min.sortable,
                                    'el-icon-caret-top': step3.bet_min.sortable && step3.bet_min.increment,
                                    'el-icon-caret-bottom': step3.bet_min.sortable && !step3.bet_min.increment,
                                    'text-black': !step3.bet_min.sortable,
                                    'text-blue': step3.bet_min.sortable}"
                                  @click="handicapLimitSort('bet_min')"
                                />
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell d-flex align-items-center justify-content-end upper-limit">
                                {{ $t('__upperLimit') }}
                                <i
                                  :class="{
                                    'el-icon-d-caret': !step3.bet_max.sortable,
                                    'el-icon-caret-top': step3.bet_max.sortable && step3.bet_max.increment,
                                    'el-icon-caret-bottom': step3.bet_max.sortable && !step3.bet_max.increment,
                                    'text-black': !step3.bet_max.sortable,
                                    'text-blue': step3.bet_max.sortable}"
                                  @click="handicapLimitSort('bet_max')"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in handicaps"
                            :key="index"
                            class="el-table__row"
                          >
                            <td class="ww-3">
                              <div class="cell checkbox text-center h-100">
                                <span
                                  class="el-checkbox green-tick pl-0"
                                  @click="handleHandicapsChange(item)"
                                >
                                  <span
                                    class="el-checkbox__input"
                                    :class="{
                                      'unchecked': !item.exist,
                                      'is-checked': item.exist}"
                                  >
                                    <span class="el-checkbox__inner" />
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td class="ww-5">
                              <div class="cell">
                                <span class="table-item-label">{{ item.id }}</span>
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell name">
                                <span class="table-item-label yellow">{{ item.nickname }}</span>
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell lower-limit">
                                <span>{{ item.betMinLabel }}</span>
                              </div>
                            </td>
                            <td class="ww-7">
                              <div class="cell upper-limit">
                                <span>{{ item.betMaxLabel }}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            v-show="curIndex === stepEnum.balanceConfig"
            class="flex-column flex-fill scroll-inner"
            :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`"
          >
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ $t('__balanceConfig') }}</label>
              <div class="step-content">
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label w-50">{{ $t('__superiorAgent') }}</label>
                        <label class="form-item-label text-white">{{ agentBalanceInfo.parent }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label w-50">{{ $t('__balance') }}</label>
                        <label
                          class="form-item-label text-white"
                          :style="`letter-spacing: ${(agentBalanceInfo.parentId === 1) ? '-0.2' : '0'}rem`"
                        >
                          {{ (agentBalanceInfo.parentId === 1 ? 'oo' : agentBalanceInfo.parentBalanceLabel) }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label w-50">{{ $t('__agentAccount') }}</label>
                        <label class="form-item-label text-white">{{ agentBalanceInfo.agent }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label w-50">{{ $t('__balance') }}</label>
                        <label class="form-item-label text-white">{{ agentBalanceInfo.agentBalanceLabel }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="el-form-item small el-form-item--feedback el-form-item--small"
                  :class="{'is-error': step4.balance.hasError, 'is-success': step4.balance.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="form-item-inner">
                      <div class="label-group">
                        <label class="form-item-label">{{ $t('__depositBalance') }}</label>
                        <small class="tip small">
                          {{ `${$t('__range')} : 0 - ${(agentBalanceInfo.parentId === 1 ? 'oo' : agentBalanceInfo.agentBalanceLabel)}` }}
                        </small>
                      </div>
                      <div
                        class="text-field share el-input el-input--small"
                        :class="{'is-disabled': balanceDisable}"
                      >
                        <input
                          v-model.number="form.balance"
                          type="number"
                          autocomplete="off"
                          class="el-input__inner"
                          min="0"
                          :disabled="balanceDisable"
                          @focus="inputFocus(step4.balance)"
                          @blur="specialInputChange('balance')"
                          @change="specialInputChange('balance')"
                        >
                        <span v-if="step4.balance.hasError || step4.balance.isSuccess" class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i v-if="step4.balance.hasError" class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                            <i v-if="step4.balance.isSuccess" class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            v-show="curIndex === stepEnum.confirm"
            class="flex-column flex-fill scroll-inner"
            :style="`height: calc(100vh - 3.75rem - 7.5rem - 3.75rem - ${(hasError ? '3.45' : '0')}rem);`"
          >
            <form class="el-form flex-column flex-fill el-form--label-left">
              <label class="form-item-title">{{ `${$t('__confirm')}${$t('__agent')}${$t('__info')}` }}</label>
              <div class="preview">
                <div class="preview-item">
                  <div class="title">{{ $t('__agentInfo') }}</div>
                  <div class="content">
                    <div class="item">
                      <label class="preview-item-label">{{ $t('__agentAccount') }}</label>
                      <span class="preview-item-value">{{ form.account }}</span>
                    </div>
                    <div class="item">
                      <label class="preview-item-label">{{ $t('__agentNickname') }}</label>
                      <span class="preview-item-value">{{ form.nickname }}</span>
                    </div>
                    <div class="item">
                      <label class="preview-item-label">{{ $t('__password') }}</label>
                      <span class="preview-item-value">{{ form.password }}</span>
                    </div>
                    <div class="item">
                      <label class="preview-item-label">{{ $t('__timeZone') }}</label>
                      <span class="preview-item-value">{{ timeZoneCityName }}</span>
                    </div>
                    <div v-if="showCurrency" class="item">
                      <label class="preview-item-label">{{ $t('__currency') }}</label>
                      <span class="preview-item-value">{{ currencyName }}</span>
                    </div>
                    <div class="item">
                      <label class="preview-item-label">{{ $t('__balance') }}</label>
                      <span class="preview-item-value">{{ balanceStr }}</span>
                    </div>
                    <div v-if="form.remark" class="item d-block">
                      <label class="preview-item-label">{{ $t('__remark') }}</label>
                      <span class="preview-item-value ml-3" style="display: block;">{{ form.remark }}</span>
                    </div>
                  </div>
                </div>
                <div class="preview-item">
                  <div class="title">{{ $t('__rate') }}</div>
                  <div class="content">
                    <div class="item">
                      <label class="preview-item-label">{{ `${$t('__liveGame')} ${$t('__commissionRate')}` }}</label>
                      <span class="preview-item-value">
                        <span>{{ `${liveCommissionRateStr}%` }}</span>
                      </span>
                    </div>
                    <div class="item">
                      <label class="preview-item-label">{{ `${$t('__liveGame')} ${$t('__rollingRate')}` }}</label>
                      <span class="preview-item-value">
                        <span>{{ `${liveRollingRateStr}%` }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="preview-item">
                  <div class="title">{{ $t('__handicapLimit') }}</div>
                  <div class="content w-100">
                    <table class="w-100">
                      <tr>
                        <td class="handicap-item text-center preview-item-label" style="width: 3rem;">ID</td>
                        <td class="handicap-item text-center preview-item-label">{{ $t('__handicapLimit') }}</td>
                        <td class="handicap-item text-center preview-item-label">{{ $t('__lowerLimit') }}</td>
                        <td class="handicap-item text-center preview-item-label" />
                        <td class="handicap-item text-center preview-item-label">{{ $t('__upperLimit') }}</td>
                      </tr>
                      <tr
                        v-for="(item, index) in existHandicaps"
                        :key="index"
                      >
                        <td class="handicap-item" style="width: 3rem;">{{ item.id }}</td>
                        <td class="handicap-item ww-7">{{ item.nickname }}</td>
                        <td class="handicap-item">
                          <span>{{ item.betMinLabel }}</span>
                        </td>
                        <td class="handicap-item">-</td>
                        <td class="handicap-item">
                          <span>{{ item.betMaxLabel }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div
                  class="el-form-item custom-psw el-form-item--small"
                  :class="{
                    'is-error': step5.userPassword.hasError,
                    'is-success': step5.userPassword.isSuccess}"
                >
                  <div class="el-form-item__content">
                    <div class="label-group">
                      <label class="form-item-label">{{ $t('__userPassword') }}</label>
                    </div>
                    <div class="el-input el-input--small el-input--suffix">
                      <input
                        v-model="form.userPassword"
                        :type="step5.userPassword.type"
                        autocomplete="off"
                        class="el-input__inner"
                        @focus="inputFocus(step5.userPassword)"
                        @blur="inputChange(step5.userPassword, form.userPassword)"
                        @change="inputChange(step5.userPassword, form.userPassword)"
                      >
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                          <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                          <i
                            class="el-input__icon el-icon-view"
                            style="cursor: pointer;"
                            :class="{'text-black': step5.userPassword.type!=='password'}"
                            @click="showPassword(step5.userPassword)"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-100 p-3" />
              </div>
            </form>
          </div>
          <div class="step-content">
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button v-if="previousBtnVisible" type="button" class="el-button bg-gray el-button--primary" @click="onPreviousBtnClick">
                  <span>{{ $t('__previous') }}</span>
                </button>
                <button v-if="nextBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onNextBtnClick">
                  <span>{{ $t('__nextStep') }}</span>
                </button>
                <button v-if="confirmBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                  <span>{{ confirm }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" />
        <div class="popup-panel animated fadeInUp addAgentForm">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" />
          </div>
          <div class="popup-title">{{ title }}</div>
          <div class="agent-form popup-page flex-column flex-fill h-100">
            <div class="form-fixed step">
              <div class="w-100 text-left text-white mb-2">{{ `${$t('__superiorAgent')}: ` }}
                <span class="text-yellow">{{ agentInfo.fullName }}</span>
              </div>
              <el-steps
                :active="curIndex"
                class="form-step"
                finish-status="success"
                align-center
              >
                <el-step v-if="hasStep('agentInfo')" :title="$t('__agentInfo')" />
                <el-step v-if="hasStep('rate')" :title="$t('__rate')" />
                <el-step v-if="hasStep('limit')" :title="$t('__handicapLimit')" />
                <el-step v-if="hasStep('balanceConfig')" :title="$t('__balanceConfig')" />
                <el-step v-if="hasStep('confirm')" :title="$t('__confirm')" />
              </el-steps>
              <div class="w-100" style="height: 10px;" />
            </div>
            <div class="overlay-scroll-wrap">
              <div class="scroll-inner">
                <div class="scroll-view">
                  <backTop
                    v-if="curIndex === stepEnum.agentInfo"
                    :inner-class="'.form-step-content'"
                    :view-class="'.step_agentInfo'"
                    style="width: 25.5px; height: 25.5px; font-size: 20.4px; top: 10.2px;"
                  />
                  <backTop
                    v-if="curIndex === stepEnum.limit"
                    :inner-class="'.form-step-content'"
                    :view-class="'.step_limit'"
                    style="width: 25.5px; height: 25.5px; font-size: 20.4px; top: 10.2px;"
                  />
                  <div class="form-step-content" style="height: 395px; max-height: calc(100vh - 30rem); overflow: auto;">
                    <div
                      v-show="curIndex === stepEnum.agentInfo"
                      class="step_agentInfo"
                    >
                      <form class="el-form el-form--label-left">
                        <div class="step-content">
                          <div v-if="operationType === operationEnum.create" class="el-form-item el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label mr-3">{{ $t('__accountGenerateMode') }}</label>
                              </div>
                              <div class="value-group">
                                <el-switch
                                  v-model="autoGenerateAccount"
                                  :active-text="$t('__auto')"
                                  :inactive-text="$t('__manual')"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step1.account.hasError,
                              'is-success': step1.account.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__account') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small"
                                    :class="{'is-disabled': operationType === operationEnum.edit}"
                                  >
                                    <input
                                      v-model="form.account"
                                      type="text"
                                      autocomplete="off"
                                      :disabled="operationType===operationEnum.edit"
                                      class="el-input__inner"
                                      @focus="inputFocus(step1.account)"
                                      @blur="passwordChange(step1.account, form.account)"
                                      @change="passwordChange(step1.account, form.account)"
                                    >
                                    <span v-if="step1.account.hasError || step1.account.isSuccess" class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i
                                          v-if="step1.account.hasError"
                                          class="el-input__icon el-input__validateIcon el-icon-error has-error"
                                        />
                                        <i
                                          v-if="step1.account.isSuccess"
                                          class="el-input__icon el-input__validateIcon el-icon-success no-error"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip">
                                  {{ operationType === operationEnum.edit ? '' : `5-8${$t('__indivual')}${$t('__character')} (${$t('__includeEnglishAlphabetNumberBottomLine')})` }}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step1.nickname.hasError,
                              'is-success': step1.nickname.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__name') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small"
                                  >
                                    <input
                                      v-model="form.nickname"
                                      type="text"
                                      autocomplete="off"
                                      class="el-input__inner"
                                      @focus="inputFocus(step1.nickname)"
                                      @blur="inputChange(step1.nickname, form.nickname)"
                                      @change="inputChange(step1.nickname, form.nickname)"
                                    >
                                    <span v-if="step1.nickname.hasError || step1.nickname.isSuccess" class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i
                                          v-if="step1.nickname.hasError"
                                          class="el-input__icon el-input__validateIcon el-icon-error has-error"
                                        />
                                        <i
                                          v-if="step1.nickname.isSuccess"
                                          class="el-input__icon el-input__validateIcon el-icon-success no-error"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="operationType === operationEnum.create && visible"
                            class="el-form-item custom-psw el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step1.password.hasError,
                              'is-success': step1.password.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__password') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small el-input--suffix"
                                  >
                                    <input
                                      v-model="form.password"
                                      :type="step1.password.type"
                                      autocomplete="off"
                                      class="el-input__inner"
                                      @focus="inputFocus(step1.password)"
                                      @blur="passwordChange(step1.password, form.password)"
                                      @change="passwordChange(step1.password, form.password)"
                                    >
                                    <span class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                        <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                        <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': step1.password.type!=='password'}" @click="showPassword(step1.password)" />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip">
                                  {{ `5-8${$t('__indivual')}${$t('__character')} (${$t('__includeEnglishAlphabetNumberBottomLine')})` }}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="operationType === operationEnum.create && visible"
                            class="el-form-item custom-psw el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step1.confirmPassword.hasError,
                              'is-success': step1.confirmPassword.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__confirmPassword') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small el-input--suffix"
                                  >
                                    <input
                                      v-model="form.confirmPassword"
                                      :type="step1.confirmPassword.type"
                                      autocomplete="off"
                                      class="el-input__inner"
                                      @focus="inputFocus(step1.confirmPassword)"
                                      @blur="confirmPasswordChange"
                                      @change="confirmPasswordChange"
                                    >
                                    <span class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i class="el-input__icon el-input__validateIcon el-icon-error has-error" />
                                        <i class="el-input__icon el-input__validateIcon el-icon-success no-error" />
                                        <i
                                          class="el-input__icon el-icon-view"
                                          style="cursor: pointer;"
                                          :class="{'text-black': step1.confirmPassword.type!=='password'}"
                                          @click="showPassword(step1.confirmPassword)"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__accountStatus') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <select v-model="form.status" class="el-select w-100">
                                    <option
                                      v-for="item in accountStatusType"
                                      :key="item.key"
                                      :value="item.key"
                                    >
                                      {{ $t(item.nickname) }}
                                    </option>
                                  </select>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__timeZone') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <select v-model="form.time_zone" class="el-select w-100">
                                    <option
                                      v-for="item in time_zone"
                                      :key="item.id"
                                      :value="item.id"
                                    >
                                      {{ $t(item.city_name) }}
                                    </option>
                                  </select>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="showCurrency"
                            class="el-form-item el-form-item--feedback el-form-item--small"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__currency') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <select v-model="form.currency" class="el-select w-100">
                                    <option
                                      v-for="item in currency"
                                      :key="item.id"
                                      :value="item.id"
                                    >
                                      {{ $t(item.name) }}
                                    </option>
                                  </select>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group">
                                <label class="form-item-label">{{ $t('__remark') }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div class="el-textarea el-input--small">
                                    <textarea
                                      v-model="form.remark"
                                      autocomplete="off"
                                      class="el-textarea__inner"
                                      style="min-height: 48.0625px;"
                                    />
                                  </div>
                                </div>
                                <small class="tip" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      v-show="curIndex === stepEnum.rate"
                    >
                      <form class="el-form el-form--label-left">
                        <div class="step-content">
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step2.live_commission_rate.hasError,
                              'is-success': step2.live_commission_rate.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group" style="width: 200px;">
                                <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__commissionRate')}` }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small"
                                    :class="{'is-disabled': agentInfo.live_commission_rate === 0}"
                                  >
                                    <input
                                      v-model.number="form.live_commission_rate"
                                      type="number"
                                      autocomplete="off"
                                      :disabled="agentInfo.live_commission_rate === 0"
                                      min="0"
                                      class="el-input__inner"
                                      @focus="inputFocus(step2.live_commission_rate)"
                                      @blur="specialInputChange('live_commission_rate')"
                                      @change="specialInputChange('live_commission_rate')"
                                    >
                                    <span v-if="step2.live_commission_rate.hasError || step2.live_commission_rate.isSuccess" class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i
                                          v-if="step2.live_commission_rate.hasError"
                                          class="el-input__icon el-input__validateIcon el-icon-error has-error"
                                        />
                                        <i
                                          v-if="step2.live_commission_rate.isSuccess"
                                          class="el-input__icon el-input__validateIcon el-icon-success no-error"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip">
                                  {{ `${$t('__range')} : 0 % - ${agentInfo.live_commission_rate} %` }}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div
                            class="el-form-item el-form-item--feedback el-form-item--small"
                            :class="{
                              'is-error': step2.live_rolling_rate.hasError,
                              'is-success': step2.live_rolling_rate.isSuccess}"
                          >
                            <div class="el-form-item__content">
                              <div class="label-group" style="width: 200px;">
                                <label class="form-item-label">{{ `${$t('__liveGame')} ${$t('__rollingRate')}` }}</label>
                              </div>
                              <div class="value-group">
                                <div class="d-flex align-items-center">
                                  <div
                                    class="el-input el-input--small"
                                    :class="{'is-disabled': agentInfo.live_rolling_rate === 0}"
                                  >
                                    <input
                                      v-model.number="form.live_rolling_rate"
                                      type="number"
                                      autocomplete="off"
                                      :disabled="agentInfo.live_rolling_rate === 0"
                                      min="0"
                                      class="el-input__inner"
                                      @focus="inputFocus(step2.live_rolling_rate)"
                                      @blur="specialInputChange('live_rolling_rate')"
                                      @change="specialInputChange('live_rolling_rate')"
                                    >
                                    <span v-if="step2.live_rolling_rate.hasError || step2.live_rolling_rate.isSuccess" class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i
                                          v-if="step2.live_rolling_rate.hasError"
                                          class="el-input__icon el-input__validateIcon el-icon-error has-error"
                                        />
                                        <i
                                          v-if="step2.live_rolling_rate.isSuccess"
                                          class="el-input__icon el-input__validateIcon el-icon-success no-error"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <small class="tip">
                                  {{ `${$t('__range')} : 0 % - ${agentInfo.live_rolling_rate} %` }}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      v-show="curIndex === stepEnum.limit"
                      class="step_limit"
                    >
                      <form class="el-form el-form--label-left">
                        <label class="form-item-title">
                          {{ `${$t('__choose')}${$t('__handicapLimit')}` }}
                        </label>
                        <div class="step-content">
                          <div class="el-form-item small el-form-item--feedback el-form-item--small">
                            <div class="el-form-item__content">
                              <div class="w-100 handicap-table" style="position: relative;">
                                <table class="el-table">
                                  <tbody>
                                    <tr class="el-table__row head">
                                      <td class="ww-3">
                                        <div class="cell checkbox text-center h-100">
                                          <span
                                            class="el-checkbox green-tick pl-0"
                                            @click="changeAllHandicaps"
                                          >
                                            <span
                                              :class="{
                                                'unchecked': !selectAllHandicaps,
                                                'is-checked': selectAllHandicaps}"
                                            >
                                              <span class="el-checkbox__inner" />
                                            </span>
                                          </span>
                                        </div>
                                      </td>
                                      <td class="ww-5">
                                        <div class="cell d-flex align-items-center justify-content-center text-black">
                                          ID
                                          <i
                                            :class="{
                                              'el-icon-d-caret': !step3.id.sortable,
                                              'el-icon-caret-top': step3.id.sortable && step3.id.increment,
                                              'el-icon-caret-bottom': step3.id.sortable && !step3.id.increment,
                                              'text-black': !step3.id.sortable,
                                              'text-blue': step3.id.sortable}"
                                            @click="handicapLimitSort('id')"
                                          />
                                        </div>
                                      </td>
                                      <td class="ww-7">
                                        <div class="cell d-flex align-items-center justify-content-center">
                                          {{ $t('__handicapLimit') }}
                                          <i
                                            :class="{
                                              'el-icon-d-caret': !step3.nickname.sortable,
                                              'el-icon-caret-top': step3.nickname.sortable && step3.nickname.increment,
                                              'el-icon-caret-bottom': step3.nickname.sortable && !step3.nickname.increment,
                                              'text-black': !step3.nickname.sortable,
                                              'text-blue': step3.nickname.sortable}"
                                            @click="handicapLimitSort('nickname')"
                                          />
                                        </div>
                                      </td>
                                      <td class="ww-7">
                                        <div class="cell d-flex align-items-center justify-content-end lower-limit">
                                          {{ $t('__lowerLimit') }}
                                          <i
                                            :class="{
                                              'el-icon-d-caret': !step3.bet_min.sortable,
                                              'el-icon-caret-top': step3.bet_min.sortable && step3.bet_min.increment,
                                              'el-icon-caret-bottom': step3.bet_min.sortable && !step3.bet_min.increment,
                                              'text-black': !step3.bet_min.sortable,
                                              'text-blue': step3.bet_min.sortable}"
                                            @click="handicapLimitSort('bet_min')"
                                          />
                                        </div>
                                      </td>
                                      <td class="ww-3" />
                                      <td class="ww-7">
                                        <div class="cell d-flex align-items-center justify-content-end upper-limit">
                                          {{ $t('__upperLimit') }}
                                          <i
                                            :class="{
                                              'el-icon-d-caret': !step3.bet_max.sortable,
                                              'el-icon-caret-top': step3.bet_max.sortable && step3.bet_max.increment,
                                              'el-icon-caret-bottom': step3.bet_max.sortable && !step3.bet_max.increment,
                                              'text-black': !step3.bet_max.sortable,
                                              'text-blue': step3.bet_max.sortable}"
                                            @click="handicapLimitSort('bet_max')"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr
                                      v-for="(item, index) in handicaps"
                                      :key="index"
                                      class="el-table__row"
                                    >
                                      <td class="ww-3">
                                        <div class="cell checkbox text-center h-100">
                                          <span
                                            class="el-checkbox green-tick pl-0"
                                            @click="handleHandicapsChange(item)"
                                          >
                                            <span
                                              class="el-checkbox__input"
                                              :class="{
                                                'unchecked': !item.exist,
                                                'is-checked': item.exist}"
                                            >
                                              <span class="el-checkbox__inner" />
                                            </span>
                                          </span>
                                        </div>
                                      </td>
                                      <td class="ww-5">
                                        <div class="cell">
                                          <span class="table-item-label">{{ item.id }}</span>
                                        </div>
                                      </td>
                                      <td class="ww-7">
                                        <div class="cell name">
                                          <span class="table-item-label yellow">{{ item.nickname }}</span>
                                        </div>
                                      </td>
                                      <td class="ww-7">
                                        <div class="cell lower-limit">
                                          <span>{{ item.betMinLabel }}</span>
                                        </div>
                                      </td>
                                      <td class="ww-3">
                                        <div class="cell">
                                          <span>-</span>
                                        </div>
                                      </td>
                                      <td class="ww-7">
                                        <div class="cell upper-limit">
                                          <span>{{ item.betMaxLabel }}</span>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="hasError" class="form-alert p-0" style="height: 30px;">
              <div role="alert" class="el-alert el-alert--warning is-light fade show justify-content-center">
                <i class="el-alert__icon el-icon-warning" />
                <div class="el-alert__content">
                  <span class="el-alert__title">{{ errorTip }}</span>
                </div>
              </div>
            </div>
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button v-if="previousBtnVisible" type="button" class="el-button bg-gray el-button--primary" @click="onPreviousBtnClick">
                  <span>{{ $t('__previous') }}</span>
                </button>
                <button v-if="nextBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onNextBtnClick">
                  <span>{{ $t('__nextStep') }}</span>
                </button>
                <button v-if="confirmBtnVisible" type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                  <span>{{ confirm }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { agentCreateAccount, agentGetSetBalanceInfo, agentCreate, agentEdit } from '@/api/agentManagement/agent'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/utils/numberFormat'
import BackTop from '@/components/BackTop'

export default {
  name: 'AgentEditDialog',
  components: { BackTop },
  mixins: [dialogCommon, common],
  props: {
    'title': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'visible': {
      type: Boolean,
      require: true
    },
    'operationType': {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'confirm': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'stepEnum': {
      type: Object,
      require: true,
      default() {
        return Object.freeze({ 'agentInfo': 0, 'rate': 1, 'limit': 2, 'balanceConfig': 3, 'confirm': 4 })
      }
    }
  },
  data: function() {
    return {
      operationEnum: Object.freeze({ 'create': 1, 'edit': 2 }),
      autoGenerateAccount: false,
      curIndex: 0,
      time_zone: [],
      currency: [],
      agentBalanceInfo: {},
      step1: {
        account: {
          hasError: false,
          isSuccess: false
        },
        nickname: {
          hasError: false,
          isSuccess: false
        },
        password: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        },
        confirmPassword: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        }
      },
      step2: {
        live_commission_rate: {
          hasError: false,
          isSuccess: false
        },
        live_rolling_rate: {
          hasError: false,
          isSuccess: false
        }
      },
      step3: {
        id: {
          sortable: false,
          increment: true
        },
        nickname: {
          sortable: false,
          increment: true
        },
        bet_min: {
          sortable: false,
          increment: true
        },
        bet_max: {
          sortable: false,
          increment: true
        }
      },
      step4: {
        balance: {
          hasError: false,
          isSuccess: false
        }
      },
      step5: {
        userPassword: {
          hasError: false,
          isSuccess: false,
          type: 'password'
        }
      },
      handicaps: [],
      selectAllHandicaps: false,
      errorTip: '',
      hasError: false
    }
  },
  computed: {
    ...mapGetters([
      'accountStatusType',
      'sidebar'
    ]),
    previousBtnVisible() {
      return this.curIndex > this.stepEnum.agentInfo
    },
    nextBtnVisible() {
      return this.curIndex < this.stepEnum.confirm
    },
    confirmBtnVisible() {
      return this.curIndex >= this.stepEnum.confirm
    },
    showCurrency() {
      return this.operationType === this.operationEnum.create && this.agentInfo.id === 1
    },
    timeZoneCityName() {
      const timeZoneData = this.time_zone.find(timezone => this.form.time_zone === timezone.id)
      return timeZoneData ? timeZoneData.city_name : ''
    },
    currencyName() {
      const currencyData = this.currency.find(currencyItem => this.form.currency === currencyItem.id)
      return currencyData ? currencyData.name : ''
    },
    balanceStr() {
      return numberFormat(this.form.balance)
    },
    liveCommissionRateStr() {
      return numberFormat(this.form.live_commission_rate)
    },
    liveRollingRateStr() {
      return numberFormat(this.form.live_rolling_rate)
    },
    existHandicaps() {
      return this.handicaps.filter(item => item.exist)
    },
    balanceDisable() {
      if (this.agentBalanceInfo.parentId === 1) {
        return false
      }
      return Number(this.agentBalanceInfo.parentBalance) === 0
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.curIndex = this.stepEnum.agentInfo
        this.handicaps = JSON.parse(JSON.stringify(this.agentInfo.handicaps))
        this.handicaps.forEach(element => {
          element.exist = this.form.handicaps.some(handicap => handicap.id === element.id)
        })
        this.selectAllHandicaps = !(this.handicaps.some(handicap => !handicap.exist))
      } else {
        this.autoGenerateAccount = false
        this.curIndex = 0
        this.time_zone = []
        this.currency = []
        this.step1 = {
          account: {
            hasError: false,
            isSuccess: false
          },
          nickname: {
            hasError: false,
            isSuccess: false
          },
          password: {
            hasError: false,
            isSuccess: false,
            type: 'password'
          },
          confirmPassword: {
            hasError: false,
            isSuccess: false,
            type: 'password'
          }
        }
        this.step2 = {
          live_commission_rate: {
            hasError: false,
            isSuccess: false
          },
          live_rolling_rate: {
            hasError: false,
            isSuccess: false
          }
        }
        this.step3 = {
          id: {
            sortable: false,
            increment: true
          },
          nickname: {
            sortable: false,
            increment: true
          },
          bet_min: {
            sortable: false,
            increment: true
          },
          bet_max: {
            sortable: false,
            increment: true
          }
        }
        this.step4 = {
          balance: {
            hasError: false,
            isSuccess: false
          }
        }
        this.step5 = {
          userPassword: {
            hasError: false,
            isSuccess: false,
            type: 'password'
          }
        }
        this.handicaps = []
        this.selectAllHandicaps = false
        this.errorTip = ''
        this.hasError = false
      }
    },
    autoGenerateAccount() {
      if (this.autoGenerateAccount) {
        agentCreateAccount().then((res) => {
          this.form.account = res.account
          this.inputChange(this.step1.account, this.form.account)
        }).catch(() => {
          this.autoGenerateAccount = false
        })
      } else {
        this.form.account = ''
        this.inputChange(this.step1.account, this.form.account)
      }
    },
    curIndex() {
      if (this.curIndex === this.stepEnum.balanceConfig) {
        const id = this.operationType === this.operationEnum.create ? this.agentInfo.id : this.form.id
        this.dialogLoading = true
        const data = { agentId: id, actType: 'create' }
        agentGetSetBalanceInfo(data).then((res) => {
          this.agentBalanceInfo = res.rows
          this.agentBalanceInfo.agentBalanceLabel = numberFormat(this.agentBalanceInfo.agentBalance)
          this.agentBalanceInfo.parentBalanceLabel = numberFormat(this.agentBalanceInfo.parentBalance)
          this.agentBalanceInfo.agent = `${this.form.nickname}(${this.form.account})`
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      }
    }
  },
  methods: {
    changeAllHandicaps() {
      this.selectAllHandicaps = !this.selectAllHandicaps
      this.handicaps.forEach(element => {
        element.exist = this.selectAllHandicaps
      });
      this.handicaps = JSON.parse(JSON.stringify(this.handicaps))
    },
    handleHandicapsChange(item) {
      item.exist = !item.exist
      if (item.exist) {
        this.selectAllHandicaps = !(this.handicaps.some(handicap => !handicap.exist))
      } else {
        this.selectAllHandicaps = false;
      }
      this.handicaps = JSON.parse(JSON.stringify(this.handicaps))
    },
    handicapLimitSort(attributes) {
      switch (attributes) {
        case 'id': {
          this.step3.id.sortable = true
          this.step3.id.increment = !this.step3.id.increment
          this.step3.nickname.sortable = false
          this.step3.nickname.increment = true
          this.step3.bet_min.sortable = false
          this.step3.bet_min.increment = true
          this.step3.bet_max.sortable = false
          this.step3.bet_max.increment = true
          if (this.step3.id.increment) {
            this.handicaps.sort((a, b) => a.id - b.id)
          } else {
            this.handicaps.sort((a, b) => b.id - a.id)
          }
          break;
        }
        case 'nickname': {
          this.step3.id.sortable = false
          this.step3.id.increment = false
          this.step3.nickname.sortable = true
          this.step3.nickname.increment = !this.step3.nickname.increment
          this.step3.bet_min.sortable = false
          this.step3.bet_min.increment = false
          this.step3.bet_max.sortable = false
          this.step3.bet_max.increment = false
          if (this.step3.nickname.increment) {
            this.handicaps.sort((a, b) => a.nickname.localeCompare(b.nickname))
          } else {
            this.handicaps.sort((a, b) => b.nickname.localeCompare(a.nickname))
          }
          break;
        }
        case 'bet_min': {
          this.step3.id.sortable = false
          this.step3.id.increment = false
          this.step3.nickname.sortable = false
          this.step3.nickname.increment = false
          this.step3.bet_min.sortable = true
          this.step3.bet_min.increment = !this.step3.bet_min.increment
          this.step3.bet_max.sortable = false
          this.step3.bet_max.increment = false
          if (this.step3.bet_min.increment) {
            this.handicaps.sort((a, b) => Number(a.bet_min) - Number(b.bet_min))
          } else {
            this.handicaps.sort((a, b) => Number(b.bet_min) - Number(a.bet_min))
          }
          break;
        }
        case 'bet_max': {
          this.step3.id.sortable = false
          this.step3.id.increment = false
          this.step3.nickname.sortable = false
          this.step3.nickname.increment = false
          this.step3.bet_min.sortable = false
          this.step3.bet_min.increment = false
          this.step3.bet_max.sortable = true
          this.step3.bet_max.increment = !this.step3.bet_max.increment
          if (this.step3.bet_max.increment) {
            this.handicaps.sort((a, b) => Number(a.bet_max) - Number(b.bet_max))
          } else {
            this.handicaps.sort((a, b) => Number(b.bet_max) - Number(a.bet_max))
          }
          break;
        }
      }
    },
    confirmPasswordChange() {
      const check = this.form.confirmPassword && this.form.password === this.form.confirmPassword
      this.step1.confirmPassword.isSuccess = check
      this.step1.confirmPassword.hasError = !check
      return check
    },
    passwordChange(attributes, model) {
      if (model && model.length >= 5 && model.length <= 8) {
        attributes.isSuccess = true
        attributes.hasError = false
        return true
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
        return false
      }
    },
    showPassword(attributes) {
      if (attributes.type === 'password') {
        attributes.type = ''
      } else {
        attributes.type = 'password'
      }
    },
    specialInputChange(attributes) {
      switch (attributes) {
        case 'live_commission_rate': {
          // 沒有輸入
          const noValue = (!this.form.live_commission_rate && this.form.live_commission_rate !== 0)
          if (noValue || this.form.live_commission_rate < 0 || this.form.live_commission_rate > this.agentInfo.live_commission_rate) {
            this.step2.live_commission_rate.isSuccess = false
            this.step2.live_commission_rate.hasError = true
            return false
          } else {
            this.step2.live_commission_rate.isSuccess = true
            this.step2.live_commission_rate.hasError = false
            return true
          }
        }
        case 'live_rolling_rate': {
          // 沒有輸入
          const noValue = (!this.form.live_rolling_rate && this.form.live_rolling_rate !== 0)
          if (noValue || this.form.live_rolling_rate < 0 || this.form.live_rolling_rate > this.agentInfo.live_rolling_rate) {
            this.step2.live_rolling_rate.isSuccess = false
            this.step2.live_rolling_rate.hasError = true
            return false
          } else {
            this.step2.live_rolling_rate.isSuccess = true
            this.step2.live_rolling_rate.hasError = false
            return true
          }
        }
        case 'balance': {
          // 沒有輸入
          const noValue = (!this.form.balance && this.form.balance !== 0)
          if (noValue || this.form.balance < 0 || (this.agentBalanceInfo.parentId !== 1 && Number(this.form.balance) > Number(this.agentBalanceInfo.parentBalance))) {
            this.step4.balance.isSuccess = false
            this.step4.balance.hasError = true
            return false
          } else {
            this.step4.balance.isSuccess = true
            this.step4.balance.hasError = false
            return true
          }
        }
      }
    },
    inputChange(attributes, model) {
      if (model || model === 0) {
        attributes.isSuccess = true
        attributes.hasError = false
        return true
      } else {
        attributes.isSuccess = false
        attributes.hasError = true
        return false
      }
    },
    inputFocus(attributes) {
      attributes.hasError = false
    },
    hasStep(step) {
      for (const stepKey in this.stepEnum) {
        if (step === stepKey) {
          return true
        }
      }
      return false
    },
    onNextBtnClick() {
      let success = true
      if (this.curIndex === this.stepEnum.agentInfo) {
        if (!this.inputChange(this.step1.nickname, this.form.nickname)) {
          success = false
        }
        if (this.operationType === this.operationEnum.create && this.visible) {
          if (!this.passwordChange(this.step1.account, this.form.account)) {
            success = false
          }
          if (!this.passwordChange(this.step1.password, this.form.password)) {
            success = false
          }
          if (!this.confirmPasswordChange()) {
            success = false
          }
        }
        if (!success) {
          this.errorTip = this.$t('__pleaseCheckFormContent')
        }
      } else if (this.curIndex === this.stepEnum.rate) {
        if (!this.specialInputChange('live_commission_rate')) {
          success = false
        }
        if (!this.specialInputChange('live_rolling_rate')) {
          success = false
        }
        if (!success) {
          this.errorTip = this.$t('__pleaseEnterCorrectValue')
        }
      } else if (this.curIndex === this.stepEnum.limit) {
        success = this.handicaps.some(handicap => handicap.exist)
        if (!success) {
          this.errorTip = `${this.$t('__choose')}${this.$t('__handicapLimit')}`
        }
      } else if (this.curIndex === this.stepEnum.balanceConfig) {
        if (!this.specialInputChange('balance')) {
          success = false
        }
        if (!success) {
          this.errorTip = this.$t('__pleaseEnterCorrectValue')
        }
      }

      if (success) {
        this.hasError = false
        this.curIndex++
      } else {
        this.hasError = true
      }
    },
    onPreviousBtnClick() {
      this.curIndex--
      this.hasError = false
    },
    onSubmit() {
      if (this.inputChange(this.step5.userPassword, this.form.userPassword)) {
        const data = JSON.parse(JSON.stringify(this.form))
        data.handicaps = this.existHandicaps.map(item => item.id)
        if (this.operationType === this.operationEnum.create) {
          data.parent = this.agentInfo.id
          this.dialogLoading = true
          agentCreate(data).then((res) => {
            this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
            this.dialogLoading = false
          }).catch(() => {
            this.dialogLoading = false
          })
        } else if (this.operationType === this.operationEnum.edit) {
          this.confirmMsg(`${this.$t('__confirmChanges')}?`, () => {
            this.dialogLoading = true
            agentEdit(data).then((res) => {
              this.$emit('editSuccess', JSON.parse(JSON.stringify(res)))
              this.dialogLoading = false
            }).catch(() => {
              this.dialogLoading = false
            })
          })
        }
      } else {
        this.hasError = true
        this.errorTip = this.$t('__pleaseEnterUserPassword')
      }
    },
    setTimeZone(data) {
      this.time_zone = data
    },
    setCurrency(data) {
      this.currency = data
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-page {
  #step-1 {
    &.step-content {
      padding: 0 1.66667rem;
      position: relative;
      z-index: 0;
      .form-item-inner {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 0;
        .label-group {
          display: block;
          margin: 0.83333rem 0;
          width: 60%;
          -webkit-box-flex: 0;
          -ms-flex: none;
          flex: none;
          .tip {
            margin-left: 0;
            width: 100%;
            margin-top: 0.41667rem;
            font-size: .91667rem;
          }
          label {
            width: 100%;
          }
        }
        .el-input__inner {
          text-align: center;
        }
      }
    }
  }
  .step-content {
    .is-disabled {
      .el-input__inner {
        color: #6e6e6e;
      }
    }
    .handicap-table {
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      .el-table {
        font-size: 1rem;
        line-height: 1rem;
        tbody {
          tr {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            &:nth-child(odd) {
              background: #e9e9e9;
            }
            td {
              padding-top: 1rem;
              padding-bottom: 1rem;
              .lower-limit,
              .upper-limit {
                text-align: right !important;
              }
            }
            .ww-3 {
              width: 2.5rem;
            }
            .ww-5 {
              width: 4.16667rem;
            }
            .ww-7 {
              padding-right: 0.83333rem;
              width: 5.83333rem;
            }
          }
        }
        td {
          border: 0;
        }
        .cell {
          word-break: break-word;
          overflow: visible;
          white-space: normal;
          overflow-x: visible;
          font-size: 1rem;
          line-height: 1.66667rem;
          height: 1.66667rem;
          text-align: center;
          color: #000;
          padding: 0;
          .el-checkbox {
            padding-left: 0.41667rem;
            padding-top: 0.41667rem;
            .unchecked {
              .el-checkbox__inner {
                &:after {
                  border: 0.16667rem solid transparent;
                }
              }
            }
          }
          .yellow {
            color: #ce9600;
          }
        }
      }
    }
  }
  .preview-item {
    color: #fff;
    padding: 0;
    .title {
      padding: 0.83333rem 1.66667rem 0.41667rem 1.66667rem;
      border-bottom: 0.08333rem solid #f9c901;
      color: #f9c901;
    }
    .content {
      padding: 0.83333rem 1.66667rem 0 1.66667rem;
      font-size: 1rem;
      .item {
        padding: 0.41667rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .preview-item-label {
          color: #f9c901;
        }
        .preview-item-value {
          margin-left: auto;
          word-break: break-all;
        }
      }
      table {
        td {
          font-size: .91667rem;
          padding: 0.41667rem;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
