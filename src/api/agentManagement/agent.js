import request from '@/utils/request'

export function agentTreeSearch(data) {
  return request({
    url: '/agent/agentTree',
    method: 'post',
    data: data
  })
}

export function agentSearch(data) {
  return request({
    url: '/agent/search',
    method: 'post',
    data: data
  })
}

export function agentCreate(data) {
  return request({
    url: '/agent/create',
    method: 'post',
    data: data
  })
}

export function agentEdit(data) {
  return request({
    url: '/agent/edit',
    method: 'post',
    data: data
  })
}

export function agentCreateAccount() {
  return request({
    url: '/agent/createAccount',
    method: 'post'
  })
}

export function agentTotalPlayerCount(data) {
  return request({
    url: '/agent/totalPlayerCount',
    method: 'post',
    data: data
  })
}

export function agentCommissionRateLog(data) {
  return request({
    url: '/agent/commissionRateLog',
    method: 'post',
    data: data
  })
}

export function agentRollingRateLog(data) {
  return request({
    url: '/agent/rollingRateLog',
    method: 'post',
    data: data
  })
}

export function agentGiftRateLog(data) {
  return request({
    url: '/agent/giftRateLog',
    method: 'post',
    data: data
  })
}

export function agentGetSetBalanceInfo(data) {
  return request({
    url: '/agent/getSetBalanceInfo',
    method: 'post',
    data: data
  })
}

export function agentModPassword(data) {
  return request({
    url: '/agent/modPassword',
    method: 'post',
    data: data
  })
}

export function agentDepositBalance(data) {
  return request({
    url: '/agent/depositBalance',
    method: 'post',
    data: data
  })
}

export function agentWithdrawBalance(data) {
  return request({
    url: '/agent/withdrawBalance',
    method: 'post',
    data: data
  })
}

export function agentModTotallyDisabled(data) {
  return request({
    url: '/agent/modTotallyDisabled',
    method: 'post',
    data: data
  })
}

export function agentModStatus(data) {
  return request({
    url: '/agent/modStatus',
    method: 'post',
    data: data
  })
}

export function agentModBetStatus(data) {
  return request({
    url: '/agent/modBetStatus',
    method: 'post',
    data: data
  })
}

export function agentBalanceOneClickRecycling(data) {
  return request({
    url: '/agent/balance/oneClickRecycling',
    method: 'post',
    data: data
  })
}

export function agentWeeklyLossSettlement(data) {
  return request({
    url: '/agent/modWeeklyLossSettlement',
    method: 'post',
    data: data
  })
}

export function agentModOneClickRecycling(data) {
  return request({
    url: '/agent/modOneClickRecycling',
    method: 'post',
    data: data
  })
}

export function agentModGiftStatus(data) {
  return request({
    url: '/agent/modGiftStatus',
    method: 'post',
    data: data
  })
}
