import request from '@/utils/request'

export function agentWinLossReportSearch(data) {
  return request({
    url: '/agent/winLoss',
    method: 'post',
    data: data
  })
}

export function agentWinLossReportExport(data) {
  return request({
    url: '/agent/winLoss/export',
    method: 'post',
    data: data,
    timeout: 30000
  })
}

export function agentWinLossReportBetMemberCount(data) {
  return request({
    url: '/agent/winLoss/betMemberCount',
    method: 'post',
    data: data
  })
}
