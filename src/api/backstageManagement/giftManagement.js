import request from '@/utils/request'

export function giftSearch(data) {
  return request({
    url: '/gift/search',
    method: 'post',
    data: data
  })
}

/**
* 圖片上傳
* @param {*} file 上傳的文件
* @param {contentType} 'form-data'
* @returns
* tmp_path: 臨時路徑
* url: 圖片地址
*/
export function giftCreate(data) {
  return request({
    url: '/gift/create',
    method: 'POST',
    data: data
  })
}

export function giftEdit(data) {
  return request({
    url: '/gift/edit',
    method: 'post',
    data: data
  })
}

export function giftSort(data) {
  return request({
    url: '/gift/sort',
    method: 'post',
    data: data
  })
}
