import request from '@/utils/request'

export function getDataUploadList() {
  return request({
    url: '/dataUploadList',
    method: 'get'
  })
}

export function getBanks() {
  return request({
    url: '/getBanks',
    method: 'get'
  })
}
