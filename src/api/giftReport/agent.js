import request from '@/utils/request'

export function agentGiftReportSearch(data) {
  return request({
    url: '/gift/report',
    method: 'post',
    data: data
  })
}

export function agentGiftReportExport(data) {
  return request({
    url: '/gift/report/export',
    method: 'post',
    data: data,
    timeout: 30000
  })
}

export function agentGiftReportGiftMemberCount(data) {
  return request({
    url: '/gift/report/getMemberCount',
    method: 'post',
    data: data
  })
}
