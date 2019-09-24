import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/userManage/getRoles',
    method: 'get'
  })
}
export function fetchList(query) {
  return request({
    url: '/userManage/list',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: '/userManage/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/userManage/update',
    method: 'post',
    data
  })
}
