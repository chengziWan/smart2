import request from '@/utils/request'
export function getTree(query) {
  return request({
    url: '/menuManage/getTree',
    method: 'get',
    params: query
  })
}
export function fetchList(query) {
  return request({
    url: '/menuManage/list',
    method: 'get',
    params: query
  })
}


export function createItem(data) {
  return request({
    url: '/menuManage/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/menuManage/update',
    method: 'post',
    data
  })
}
