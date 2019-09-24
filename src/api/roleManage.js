import request from '@/utils/request'

export function getPermission() {
  return request({
    url: '/roleManage/routes',
    method: 'get'
  })
}
export function fetchList(query) {
  return request({
    url: '/roleManage/list',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: '/roleManage/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/roleManage/update',
    method: 'post',
    data
  })
}
