import request from '@/utils/request'

export function dealerSearch(data) {
  return request({
    url: '/dealer/search',
    method: 'post',
    data: data
  })
}

export function dealerCreate(data) {
  return request({
    url: '/dealer/create',
    method: 'POST',
    data: data
  })
}

export function dealerEdit(data) {
  return request({
    url: '/dealer/edit',
    method: 'post',
    data: data
  })
}
