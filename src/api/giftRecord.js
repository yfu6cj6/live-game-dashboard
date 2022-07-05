import request from '@/utils/request'

export function giftRecordSearch(data) {
  return request({
    url: '/gift/record/search',
    method: 'post',
    data: data
  })
}

export function giftRecordExport(data) {
  return request({
    url: '/gift/record/export',
    method: 'post',
    data: data,
    timeout: 30000
  })
}
