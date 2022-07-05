import request from '@/utils/request'

export function memberGiftReportSearch(data) {
  return request({
    url: '/gift/report/member',
    method: 'post',
    data: data
  })
}
