import request from '@/utils/request'

export function gameResultSearch(data) {
  return request({
    url: '/game/result/search',
    method: 'post',
    data: data
  })
}

export function gameResultGetPlaybackUrl(data) {
  return request({
    url: '/game/result/getPlaybackUrl',
    method: 'post',
    data: data
  })
}

export function gameResultGetScoreCards(data) {
  return request({
    url: '/game/result/getScoreCards',
    method: 'post',
    data: data
  })
}

export function gameRoundInvalid(data) {
  return request({
    url: '/game/result/getScoreCards',
    method: 'post',
    data: data
  })
}
