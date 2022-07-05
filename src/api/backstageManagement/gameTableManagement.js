import request from '@/utils/request'

export function gameTableSearch(data) {
  return request({
    url: '/gameTable/search',
    method: 'post',
    data: data
  })
}

export function gameTableCreate(data) {
  return request({
    url: '/gameTable/create',
    method: 'post',
    data: data
  })
}

export function gameTableEdit(data) {
  return request({
    url: '/gameTable/edit',
    method: 'post',
    data: data
  })
}

export function gameTableDelete(id) {
  return request({
    url: '/gameTable/destroy/' + id,
    method: 'delete'
  })
}

export function gameTableChipsSearch(data) {
  return request({
    url: '/gameTable/chips/search',
    method: 'post',
    data: data
  })
}

export function gameTableChipsCreate(data) {
  return request({
    url: '/gameTable/chips/create',
    method: 'post',
    data: data
  })
}

export function gameTableChipsEdit(data) {
  return request({
    url: '/gameTable/chips/edit',
    method: 'post',
    data: data
  })
}

export function gameTableChipsDelete(data) {
  return request({
    url: '/gameTable/chips/destroy',
    method: 'post',
    data: data
  })
}
