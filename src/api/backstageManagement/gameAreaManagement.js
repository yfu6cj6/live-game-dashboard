import request from '@/utils/request'

export function gameAreaSearch(data) {
  return request({
    url: '/gameTable/BetArea/search',
    method: 'post',
    data: data
  })
}

export function gameAreaCreate(data) {
  return request({
    url: '/gameTable/BetArea/create',
    method: 'post',
    data: data
  })
}

export function gameAreaEdit(data) {
  return request({
    url: '/gameTable/BetArea/edit',
    method: 'post',
    data: data
  })
}

export function gameAreaDelete(id) {
  return request({
    url: '/gameTable/BetArea/destroy/' + id,
    method: 'delete'
  })
}
