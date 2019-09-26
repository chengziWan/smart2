import request from '@/utils/request'

export function getDataUploadList() {
  return request({
    url: '/dataUpload/dataUploadList',
    method: 'get'
  })
}

export function getBanks() {
  return request({
    url: '/dataUpload/getBanks',
    method: 'get'
  })
}
export function createItem(data) {
  return request({
    url: '/dataUpload/create',
    method: 'post',
    data
  })
}