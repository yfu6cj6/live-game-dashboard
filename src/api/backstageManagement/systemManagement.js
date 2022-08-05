import request from '@/utils/request'

export function sysParameterSearch(data) {
  return request({
    url: '/sysParameter/search',
    method: 'post',
    data: data
  })
}

export function sysParameterCreate(data) {
  return request({
    url: '/sysParameter/create',
    method: 'post',
    data: data
  })
}

export function sysParameterEdit(data) {
  return request({
    url: '/sysParameter/edit',
    method: 'post',
    data: data
  })
}

export function sysParameterDelete(id) {
  return request({
    url: '/sysParameter/destroy/' + id,
    method: 'delete'
  })
}
